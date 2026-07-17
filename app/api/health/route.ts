import { NextResponse } from "next/server";

// Liveness probe: intentionally NOT wrapped in withApiHandler. Monitoring
// probes (uptime checks, k8s/Vercel liveness pings) should never be
// rate-limited or generate a structured log line per hit — that would
// either falsely 429 a healthy monitor or flood the logs.
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ status: "ok", timestamp: new Date().toISOString() }, { status: 200 });
}
