import { NextResponse } from "next/server";
import { HTTP_STATUS } from "@/constants/http-status.constants";
import type { ApiResponse } from "@/types/api.types";

export function successResponse<T>(data: T, status: number = HTTP_STATUS.OK) {
  const body: ApiResponse<T> = { success: true, data };
  return NextResponse.json(body, { status });
}

export function errorResponse(message: string, status: number, code?: string) {
  const body: ApiResponse<never> = { success: false, error: { message, code } };
  return NextResponse.json(body, { status });
}
