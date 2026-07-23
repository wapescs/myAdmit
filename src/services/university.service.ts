import { listUniversities } from "@/features/universities/controller/university.controller";
import type { UniversityRecord } from "@/features/universities/types/university.types";
import { mapToUniversityCore } from "./university.mapper";
import { mergeCosmetic } from "./university.cosmetic";
import type { UniversitiesListResult, UniversitiesQueryParams } from "@/types/university";

/**
 * Server-only: this calls the university feature's controller functions
 * in-process rather than fetching our own /api/universities routes over
 * HTTP. The listing page renders server-side, so there's no reason to
 * round-trip through the network to reach code running in the same server
 * process. Never import this from a "use client" component: it pulls in
 * the backend's file-reading repository layer.
 *
 * The detail page fetches client-side instead (see
 * src/services/university.client.ts) — a real network call, since the
 * browser has no in-process shortcut to backend code.
 */

function buildSearchParams(params: UniversitiesQueryParams): URLSearchParams {
  const search = new URLSearchParams();
  if (params.page) search.set("page", String(params.page));
  if (params.limit) search.set("limit", String(params.limit));
  if (params.search) search.set("search", params.search);
  if (params.country) search.set("country", params.country);
  if (params.sortBy) search.set("sortBy", params.sortBy);
  if (params.sortOrder) search.set("sortOrder", params.sortOrder);
  return search;
}

export async function getUniversities(params: UniversitiesQueryParams = {}): Promise<UniversitiesListResult> {
  const { result } = await listUniversities(buildSearchParams(params));
  return {
    items: result.items.map(item => mergeCosmetic(mapToUniversityCore(item as UniversityRecord))),
    meta: result.meta,
  };
}
