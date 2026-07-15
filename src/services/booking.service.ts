import { COUNSELORS } from "@/constants/booking";
import type { Counselor } from "@/types/booking.types";

export async function getCounselors(): Promise<Counselor[]> {
  return COUNSELORS;
}

export function getCounselorsSync(): Counselor[] {
  return COUNSELORS;
}
