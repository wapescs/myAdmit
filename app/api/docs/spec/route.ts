import { NextResponse } from "next/server";
import { getApiDocs } from "@/config/swagger.config";

export async function GET() {
  return NextResponse.json(getApiDocs());
}
