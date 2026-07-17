import { NextResponse } from "next/server";
import { HTTP_STATUS } from "@/constants/http-status.constants";
import type { ApiErrorResponse, ApiSuccessResponse, PaginationMeta } from "@/types/api.types";

interface SuccessOptions {
  status?: number;
  message?: string;
  meta?: PaginationMeta;
}

export function successResponse<T>(data: T, options: SuccessOptions = {}): NextResponse {
  const { status = HTTP_STATUS.OK, message = "Request successful", meta } = options;
  const body: ApiSuccessResponse<T> = { success: true, data, message, ...(meta ? { meta } : {}) };
  return NextResponse.json(body, { status });
}

interface ErrorOptions {
  code?: string;
  details?: unknown;
}

export function errorResponse(message: string, status: number, options: ErrorOptions = {}): NextResponse {
  const { code, details } = options;
  const body: ApiErrorResponse = {
    success: false,
    data: null,
    message,
    error: { code, ...(details !== undefined ? { details } : {}) },
  };
  return NextResponse.json(body, { status });
}
