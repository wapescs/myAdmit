export interface RawPagination {
  page: number;
  limit: number;
}

// Generic infra reusable by any future feature's validator layer. Domain
// specific filters (search/country/sort, etc.) belong in that feature's
// own validators.ts, built on top of this rather than duplicating
// page/limit parsing.
export function parseQueryParams(
  searchParams: URLSearchParams,
  defaults: RawPagination = { page: 1, limit: 20 }
): RawPagination {
  const page = Number(searchParams.get("page")) || defaults.page;
  const limit = Number(searchParams.get("limit")) || defaults.limit;
  return {
    page: Math.max(1, page),
    limit: Math.min(100, Math.max(1, limit)),
  };
}
