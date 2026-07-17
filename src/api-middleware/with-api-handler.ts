import { randomUUID } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { ZodError } from "zod";
import { ApiError } from "@/utils/api-error";
import { errorResponse } from "@/utils/api-response.util";
import { HTTP_STATUS } from "@/constants/http-status.constants";
import { logRequest } from "@/utils/logger";
import { checkRateLimit, type RateLimitTier } from "./rate-limiter";

type RouteHandler<Ctx = unknown> = (request: NextRequest, context: Ctx) => Promise<NextResponse>;

interface WithApiHandlerOptions {
  /** Set to false for endpoints that must never be rate-limited (health checks). Default true. */
  rateLimit?: boolean;
  tier?: RateLimitTier;
}

interface MappedError {
  status: number;
  message: string;
  code?: string;
  details?: unknown;
  /** Message safe to write to the server log; distinct from `message` for 500s (client message stays generic). */
  logMessage: string;
}

function mapError(err: unknown): MappedError {
  if (err instanceof ApiError) {
    return { status: err.status, message: err.message, code: err.code, logMessage: err.message };
  }
  if (err instanceof ZodError) {
    const message = err.issues.map((issue) => issue.message).join(", ");
    return {
      status: HTTP_STATUS.BAD_REQUEST,
      message,
      code: "VALIDATION_ERROR",
      details: err.issues.map((issue) => ({ path: issue.path.join("."), message: issue.message })),
      logMessage: message,
    };
  }
  // Never leak internals (stack traces, driver error text, etc.) to clients —
  // the client-facing message stays generic; the real message is only for
  // the server-side request log.
  const logMessage = err instanceof Error ? err.message : "Unknown error";
  return { status: HTTP_STATUS.INTERNAL_SERVER_ERROR, message: "Internal server error", code: "INTERNAL_ERROR", logMessage };
}

export function withApiHandler<Ctx = unknown>(
  handler: RouteHandler<Ctx>,
  options: WithApiHandlerOptions = {}
): RouteHandler<Ctx> {
  const { rateLimit = true, tier = "anonymous" } = options;

  return async (request, context) => {
    const requestId = randomUUID();
    const start = Date.now();
    const route = request.nextUrl.pathname;

    const rate = rateLimit ? checkRateLimit(request, tier) : null;

    let response: NextResponse;
    let logError: string | undefined;

    if (rate && !rate.allowed) {
      response = errorResponse("Too many requests", HTTP_STATUS.TOO_MANY_REQUESTS, { code: "RATE_LIMITED" });
      logError = "rate_limited";
    } else {
      try {
        response = await handler(request, context);
      } catch (err) {
        const mapped = mapError(err);
        response = errorResponse(mapped.message, mapped.status, { code: mapped.code, details: mapped.details });
        logError = mapped.logMessage;
      }
    }

    if (rate) {
      response.headers.set("X-RateLimit-Limit", String(rate.limit));
      response.headers.set("X-RateLimit-Remaining", String(rate.allowed ? rate.remaining : 0));
      response.headers.set("X-RateLimit-Reset", String(Math.ceil(rate.resetAt / 1000)));
      if (!rate.allowed) {
        response.headers.set("Retry-After", String(Math.max(Math.ceil((rate.resetAt - Date.now()) / 1000), 1)));
      }
    }
    response.headers.set("X-Request-Id", requestId);

    logRequest({
      requestId,
      method: request.method,
      route,
      status: response.status,
      durationMs: Date.now() - start,
      ...(logError ? { error: logError } : {}),
    });

    return response;
  };
}
