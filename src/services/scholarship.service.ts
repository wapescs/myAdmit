import { SCHOLARSHIPS } from "@/constants/scholarships";
import type { Scholarship } from "@/types/scholarship.types";

export async function getScholarships(): Promise<Scholarship[]> {
  return SCHOLARSHIPS;
}

export function getScholarshipsSync(): Scholarship[] {
  return SCHOLARSHIPS;
}
