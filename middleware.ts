import { NextResponse, type NextRequest } from "next/server";
import { corsConfig } from "@/config/cors.config";

function applyCorsHeaders(response: NextResponse, origin: string | null): void {
  const isAllowedOrigin = origin !== null && corsConfig.allowedOrigins.includes(origin);
  if (isAllowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", origin as string);
    response.headers.set("Vary", "Origin");
  }
  response.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  response.headers.set("Access-Control-Max-Age", "86400");
}

function applySecurityHeaders(response: NextResponse): void {
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
}

export function middleware(request: NextRequest): NextResponse {
  const origin = request.headers.get("origin");

  // Preflight: short-circuit here. Route files only export GET, so without
  // this they'd fall through to Next's default 405 for OPTIONS.
  if (request.method === "OPTIONS") {
    const preflight = new NextResponse(null, { status: 204 });
    applyCorsHeaders(preflight, origin);
    return preflight;
  }

  const response = NextResponse.next();
  applyCorsHeaders(response, origin);
  applySecurityHeaders(response);
  return response;
}

export const config = {
  matcher: ["/api/:path*"],
};
