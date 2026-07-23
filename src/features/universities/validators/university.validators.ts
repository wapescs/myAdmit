import { z } from "zod";
import { paginationConfig } from "@/config/pagination.config";

function parseFieldsParam(raw: string | undefined): string[] | undefined {
  if (!raw) return undefined;
  const parts = raw
    .split(",")
    .map((f) => f.trim())
    .filter(Boolean);
  return parts.length > 0 ? parts : undefined;
}

// Not restricted to a fixed set of known keys — the response has no rigid
// schema, so any field name present on a record can be requested. Unknown
// field names are simply absent from the result (see pickFields), not an
// error.
const flexibleFieldsSchema = z
  .string()
  .trim()
  .optional()
  .transform(parseFieldsParam)
  .pipe(z.array(z.string().min(1)).optional());

export const listUniversitiesQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(paginationConfig.defaultPage),
  limit: z.coerce.number().int().min(1).max(paginationConfig.maxLimit).default(paginationConfig.defaultLimit),
  search: z.string().trim().min(1).optional(),
  country: z.string().trim().min(1).optional(),
  sortBy: z.enum(["name", "country"]).default("name"),
  sortOrder: z.enum(["asc", "desc"]).default("asc"),
  fields: flexibleFieldsSchema,
});

export type ListUniversitiesQuery = z.infer<typeof listUniversitiesQuerySchema>;

export const universityDetailQuerySchema = z.object({
  fields: flexibleFieldsSchema,
});

export type UniversityDetailQuery = z.infer<typeof universityDetailQuerySchema>;

export const universityIdParamSchema = z.string().trim().min(1, "University id is required");
