import { universityRepository } from "../repository";
import { toDetailDto, toListItemDto } from "../mapper/university.mapper";
import { buildPaginationMeta } from "@/utils/pagination.util";
import type { ListUniversitiesQuery } from "../validators/university.validators";
import type { PaginatedResult } from "@/types/api.types";
import type { UniversityDetailDto, UniversityListItemDto } from "../dto/university.dto";

export async function list(query: ListUniversitiesQuery): Promise<PaginatedResult<UniversityListItemDto>> {
  const { items, total } = await universityRepository.findAll({
    page: query.page,
    limit: query.limit,
    search: query.search,
    country: query.country,
    sortBy: query.sortBy,
    sortOrder: query.sortOrder,
  });

  return {
    items: items.map(toListItemDto),
    meta: buildPaginationMeta({ page: query.page, limit: query.limit, total }),
  };
}

export async function getById(id: string): Promise<UniversityDetailDto | null> {
  const base = await universityRepository.findById(id);
  if (!base) return null;
  const detail = await universityRepository.findDetailByUniversityId(id);
  return toDetailDto(base, detail);
}
