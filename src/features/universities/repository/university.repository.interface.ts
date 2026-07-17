import type { UniversityDetailRecord, UniversityRecord } from "../types/university.types";

export type UniversitySortField = "name" | "country";
export type SortOrder = "asc" | "desc";

export interface FindAllOptions {
  page: number;
  limit: number;
  search?: string;
  country?: string;
  sortBy: UniversitySortField;
  sortOrder: SortOrder;
}

export interface FindAllResult<T> {
  items: T[];
  total: number;
}

// Consumers (the service layer) must depend only on this contract, never on
// a concrete implementation. See ./index.ts for the active-implementation
// swap point (JSON now, MongoDB later).
//
// findAll() takes the full filter/sort/pagination request and returns only
// the requested page plus the total *matching* count. This boundary is
// shaped so a MongoDB implementation can push filtering to a find() query,
// sorting to .sort(), and pagination to .skip()/.limit() — all at the
// database layer, using indexes — without the service layer or anything
// above it changing. The current (JSON) implementation can't do that (see
// university.json-repository.ts for why), but the interface already
// assumes a database that can.
export interface IUniversityRepository {
  findAll(options: FindAllOptions): Promise<FindAllResult<UniversityRecord>>;
  findById(id: string): Promise<UniversityRecord | null>;
  findDetailByUniversityId(universityId: string): Promise<UniversityDetailRecord | null>;
}
