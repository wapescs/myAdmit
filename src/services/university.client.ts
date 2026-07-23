import { mapToUniversityDetailCore } from "./university.mapper";
import { mergeCosmetic } from "./university.cosmetic";
import type { ApiResponse, UniversityDetail } from "@/types/university";
import type { UniversityDetailDto } from "@/features/universities/dto/university.dto";

/**
 * Client-safe: fetches /api/universities/[id] over real HTTP from the
 * browser. Unlike the listing page (server-rendered, calls the controller
 * in-process — see university.service.ts), the university detail page
 * fetches client-side, so this genuinely needs the network round trip.
 */
export async function fetchUniversityById(id: string): Promise<UniversityDetail> {
  const res = await fetch(`/api/universities/${encodeURIComponent(id)}`);
  const json = (await res.json()) as ApiResponse<UniversityDetailDto>;

  if (!json.success) {
    throw new Error(json.message || "Something went wrong while contacting the server.");
  }
  if (!res.ok) {
    throw new Error(json.message || "Something went wrong while contacting the server.");
  }

  return mergeCosmetic(mapToUniversityDetailCore(json.data));
}
