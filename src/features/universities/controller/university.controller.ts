import * as universityService from "../service/university.service";
import { listUniversitiesQuerySchema, universityIdParamSchema } from "../validators/university.validators";
import { ApiError } from "@/utils/api-error";
import { HTTP_STATUS } from "@/constants/http-status.constants";

// Framework-agnostic: no NextResponse/NextRequest here. Route handlers under
// app/api/** call these functions and translate the result into an HTTP
// response, keeping this layer testable independent of Next.js.

export async function listUniversities(searchParams: URLSearchParams) {
  const query = listUniversitiesQuerySchema.parse(Object.fromEntries(searchParams));
  return universityService.list(query);
}

export async function getUniversityById(rawId: string) {
  const id = universityIdParamSchema.parse(rawId);
  const result = await universityService.getById(id);
  if (!result) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, `University not found: ${id}`);
  }
  return result;
}
