import { access } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { HTTP_STATUS } from "@/constants/http-status.constants";

const UNIVERSITIES_PATH = path.join(process.cwd(), "app/api/universities.json");
const UNIVERSITY_DETAILS_PATH = path.join(process.cwd(), "app/api/university_details.json");

// Readiness probe: verifies the data source(s) this feature actually
// depends on are reachable right now. Phase 1 checks that the two JSON
// files exist/are readable. Once a MongoDB repository exists for this
// feature, add a `await getDb().command({ ping: 1 })` check here too —
// readiness should reflect every backing dependency, not just the one
// active today.
export async function GET(): Promise<NextResponse> {
  try {
    await Promise.all([access(UNIVERSITIES_PATH), access(UNIVERSITY_DETAILS_PATH)]);
    return NextResponse.json({ status: "ready" }, { status: HTTP_STATUS.OK });
  } catch {
    return NextResponse.json({ status: "not_ready" }, { status: HTTP_STATUS.SERVICE_UNAVAILABLE });
  }
}
