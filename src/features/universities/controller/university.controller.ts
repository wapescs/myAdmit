import * as universityService from "../service/university.service";
import {
  listUniversitiesQuerySchema,
  universityDetailQuerySchema,
  universityIdParamSchema,
} from "../validators/university.validators";
import { pickFields, pickFieldsFromList } from "@/utils/pick-fields.util";
import { ApiError } from "@/utils/api-error";
import { HTTP_STATUS } from "@/constants/http-status.constants";
import type { PaginatedResult } from "@/types/api.types";
import type { UniversityDetailDto, UniversityListItemDto } from "../dto/university.dto";

// Framework-agnostic: no NextResponse/NextRequest here. Route handlers under
// app/api/** call these functions and translate the result into an HTTP
// response, keeping this layer testable independent of Next.js.

export interface ListUniversitiesResult {
  result: PaginatedResult<Partial<UniversityListItemDto>>;
  message: string;
}

export async function listUniversities(searchParams: URLSearchParams): Promise<ListUniversitiesResult> {
  const query = listUniversitiesQuerySchema.parse(Object.fromEntries(searchParams));
  const { items, meta } = await universityService.list(query);

  // Field selection happens AFTER DTO mapping, never inside the
  // repository/service — it's a presentation concern about what the client
  // gets back, not a query-planning concern about what gets fetched.
  const selectedItems = query.fields ? pickFieldsFromList(items, query.fields) : items;

  return {
    result: { items: selectedItems, meta },
    message:
      meta.totalRecords === 0
        ? "No universities matched the given filters"
        : `Retrieved ${selectedItems.length} of ${meta.totalRecords} universities`,
  };
}

export interface GetUniversityByIdResult {
  result: Partial<UniversityDetailDto>;
  message: string;
}

export async function getUniversityById(
  rawId: string,
  searchParams: URLSearchParams
): Promise<GetUniversityByIdResult> {
  const id = universityIdParamSchema.parse(rawId);
  const { fields } = universityDetailQuerySchema.parse(Object.fromEntries(searchParams));

  const found = await universityService.getById(id);
  if (!found) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, `University not found: ${id}`);
  }

  const result = fields ? pickFields(found, fields) : found;
  return { result, message: "University retrieved successfully" };
}
