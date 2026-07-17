import type { NextRequest } from "next/server";
import { ZodError } from "zod";
import { ApiError } from "@/utils/api-error";
import { errorResponse } from "@/utils/api-response.util";
import { HTTP_STATUS } from "@/constants/http-status.constants";

type RouteHandler<Ctx = unknown> = (request: NextRequest, context: Ctx) => Promise<Response>;

// Wraps a Next.js route handler so every route under app/api/** returns a
// consistent ApiResponse envelope on failure instead of an unhandled 500
// with a leaked stack trace. Route files stay thin: they only pull request
// bits, delegate to a feature controller, and export the wrapped result.
export function withErrorHandling<Ctx = unknown>(handler: RouteHandler<Ctx>): RouteHandler<Ctx> {
  return async (request, context) => {
    try {
      return await handler(request, context);
    } catch (err) {
      if (err instanceof ApiError) {
        return errorResponse(err.message, err.status, err.code);
      }
      if (err instanceof ZodError) {
        return errorResponse(err.issues.map((issue) => issue.message).join(", "), HTTP_STATUS.BAD_REQUEST, "VALIDATION_ERROR");
      }
      console.error(err);
      return errorResponse("Internal server error", HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
  };
}
