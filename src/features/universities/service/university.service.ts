import { universityRepository } from "../repository";
import { toDetailDto, toListItemDto } from "../mapper/university.mapper";
import type { ListUniversitiesQuery } from "../validators/university.validators";
import type { PaginatedResult } from "@/types/api.types";
import type { UniversityDetailDto, UniversityListItemDto } from "../dto/university.dto";
import type { UniversityRecord } from "../types/university.types";

export async function list(query: ListUniversitiesQuery): Promise<PaginatedResult<UniversityListItemDto>> {
  const all = await universityRepository.findAll();

  const filtered = all.filter((u) => {
    const matchesCountry = query.country ? u.Country.toLowerCase() === query.country.toLowerCase() : true;
    const matchesSearch = query.search ? u.canonical_name.toLowerCase().includes(query.search.toLowerCase()) : true;
    return matchesCountry && matchesSearch;
  });

  const sortField: keyof Pick<UniversityRecord, "canonical_name" | "Country"> =
    query.sortBy === "country" ? "Country" : "canonical_name";

  const sorted = [...filtered].sort((a, b) => {
    const comparison = a[sortField].localeCompare(b[sortField]);
    return query.sortOrder === "desc" ? -comparison : comparison;
  });

  const start = (query.page - 1) * query.limit;
  const pageItems = sorted.slice(start, start + query.limit);

  return {
    items: pageItems.map(toListItemDto),
    meta: {
      page: query.page,
      limit: query.limit,
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / query.limit) || 1,
    },
  };
}

export async function getById(id: string): Promise<UniversityDetailDto | null> {
  const base = await universityRepository.findById(id);
  if (!base) return null;
  const detail = await universityRepository.findDetailByUniversityId(id);
  return toDetailDto(base, detail);
}
