import type { PaginationMeta } from "@/types/api.types";

interface BuildPaginationMetaInput {
  page: number;
  limit: number;
  total: number;
}

// Single source of truth for turning a (page, limit, total) triple into the
// wire pagination envelope. Any future feature with a paginated list should
// reuse this rather than reimplementing the hasNext/hasPrevious math.
export function buildPaginationMeta({ page, limit, total }: BuildPaginationMetaInput): PaginationMeta {
  const totalPages = total === 0 ? 0 : Math.ceil(total / limit);
  return {
    totalRecords: total,
    totalPages,
    currentPage: page,
    pageSize: limit,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}
