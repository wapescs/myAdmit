import { createHash } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { cacheConfig } from "@/config/cache.config";

// ETag is computed from the response *data payload only* (the DTO/items the
// route is about to send back), not the full envelope — the envelope also
// carries a per-request X-Request-Id, and hashing that in would make the
// ETag different on every single request, defeating the point of caching.
//
// This file uses node:crypto, so it must only ever be imported from route
// handlers (Node.js runtime by default in Next.js App Router) — never from
// the root middleware.ts, which runs on the Edge runtime.
export function computeEtag(payload: unknown): string {
  const hash = createHash("sha1").update(JSON.stringify(payload)).digest("hex");
  return `"${hash}"`;
}

export function isNotModified(request: NextRequest, etag: string): boolean {
  const ifNoneMatch = request.headers.get("if-none-match");
  if (!ifNoneMatch) return false;
  return ifNoneMatch
    .split(",")
    .map((tag) => tag.trim())
    .includes(etag);
}

export function applyCacheHeaders(response: NextResponse, etag: string): NextResponse {
  response.headers.set("ETag", etag);
  response.headers.set("Cache-Control", `public, max-age=${cacheConfig.ttlSeconds}, must-revalidate`);
  return response;
}

export function notModifiedResponse(etag: string): NextResponse {
  const response = new NextResponse(null, { status: 304 });
  return applyCacheHeaders(response, etag);
}
