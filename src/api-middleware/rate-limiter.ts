import { rateLimitConfig } from "@/config/rate-limit.config";

export type RateLimitTier = "anonymous" | "authenticated";

interface WindowEntry {
  count: number;
  windowStart: number;
}

// NOTE — in-memory, single-process only. Each serverless instance/process
// restart owns an independent bucket map, so on a multi-instance deployment
// (e.g. multiple Vercel/Lambda invocations, or multiple containers) this
// only enforces the limit *per instance*, not globally. A real
// multi-instance production rollout needs a shared store (Redis/Upstash
// with INCR+EXPIRE, or a sliding-window Lua script). This is a deliberate,
// documented Phase 1 limitation, not a bug.
const buckets = new Map<string, WindowEntry>();

let callsSinceSweep = 0;

// Opportunistic cleanup so `buckets` doesn't grow unboundedly over a
// long-lived warm instance (e.g. many distinct client IPs over days). Not a
// substitute for a real TTL store — just cheap hygiene for Phase 1.
function maybeSweep(now: number): void {
  callsSinceSweep += 1;
  if (callsSinceSweep < 1000) return;
  callsSinceSweep = 0;
  const staleAfterMs = Math.max(rateLimitConfig.anonymous.windowMs, rateLimitConfig.authenticated.windowMs) * 2;
  for (const [key, entry] of Array.from(buckets.entries())) {
    if (now - entry.windowStart >= staleAfterMs) {
      buckets.delete(key);
    }
  }
}

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

function getTierLimits(tier: RateLimitTier) {
  return tier === "authenticated" ? rateLimitConfig.authenticated : rateLimitConfig.anonymous;
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number; // epoch ms
}

export function checkRateLimit(request: Request, tier: RateLimitTier = "anonymous"): RateLimitResult {
  const now = Date.now();
  maybeSweep(now);

  const ip = getClientIp(request);
  const { windowMs, max } = getTierLimits(tier);
  const key = `${tier}:${ip}`;

  const existing = buckets.get(key);
  if (!existing || now - existing.windowStart >= windowMs) {
    buckets.set(key, { count: 1, windowStart: now });
    return { allowed: true, limit: max, remaining: max - 1, resetAt: now + windowMs };
  }

  existing.count += 1;
  const allowed = existing.count <= max;
  return {
    allowed,
    limit: max,
    remaining: Math.max(max - existing.count, 0),
    resetAt: existing.windowStart + windowMs,
  };
}
