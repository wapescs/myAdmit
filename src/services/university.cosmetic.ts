import { UNIVERSITIES } from "@/constants/universities";
import type { University, UniversityCore } from "@/types/university";

/**
 * The real API only returns core fields (name/country/website/etc). The
 * mock UNIVERSITIES constant carries cosmetic fields (ranking, image,
 * tuition...) the UI still displays. When a real record's name matches a
 * mock entry, we merge those cosmetic fields in; otherwise they stay
 * undefined and the UI renders a graceful fallback.
 *
 * Client-safe (no backend imports) — used by both the server-side listing
 * fetch and the client-side detail fetch.
 */
function findCosmeticMatch(name: string) {
  const normalized = name.trim().toLowerCase();
  return UNIVERSITIES.find(u => u.name.trim().toLowerCase() === normalized);
}

export function mergeCosmetic<T extends UniversityCore>(core: T): T & University {
  const match = findCosmeticMatch(core.name);
  return {
    ...core,
    shortName: match?.shortName,
    flag: match?.flag,
    ranking: match?.ranking,
    image: match?.image,
    tuition: match?.tuition,
    acceptanceRate: match?.acceptanceRate,
    scholarships: match?.scholarships,
    type: match?.type,
    programs: match?.programs,
    ieltsRequired: match?.ieltsRequired,
    description: match?.description,
  };
}
