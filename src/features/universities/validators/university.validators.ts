import { z } from "zod";
import { paginationConfig } from "@/config/pagination.config";

const LIST_FIELDS = ["id", "name", "country", "websiteUrl", "campusLocations"] as const;
const DETAIL_FIELDS = [...LIST_FIELDS, "academicRequirements", "countrySpecificData"] as const;

export type ListFieldKey = (typeof LIST_FIELDS)[number];
export type DetailFieldKey = (typeof DETAIL_FIELDS)[number];

function parseFieldsParam(raw: string | undefined): string[] | undefined {
  if (!raw) return undefined;
  const parts = raw
    .split(",")
    .map((f) => f.trim())
    .filter(Boolean);
  return parts.length > 0 ? parts : undefined;
}

const listFieldsSchema = z
  .string()
  .trim()
  .optional()
  .transform(parseFieldsParam)
  .pipe(z.array(z.enum([...LIST_FIELDS])).optional());

const detailFieldsSchema = z
  .string()
  .trim()
  .optional()
  .transform(parseFieldsParam)
  .pipe(z.array(z.enum([...DETAIL_FIELDS])).optional());

export const listUniversitiesQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(paginationConfig.defaultPage),
  limit: z.coerce.number().int().min(1).max(paginationConfig.maxLimit).default(paginationConfig.defaultLimit),
  search: z.string().trim().min(1).optional(),
  country: z.string().trim().min(1).optional(),
  sortBy: z.enum(["name", "country"]).default("name"),
  sortOrder: z.enum(["asc", "desc"]).default("asc"),
  fields: listFieldsSchema,
});

export type ListUniversitiesQuery = z.infer<typeof listUniversitiesQuerySchema>;

export const universityDetailQuerySchema = z.object({
  fields: detailFieldsSchema,
});

export type UniversityDetailQuery = z.infer<typeof universityDetailQuerySchema>;

export const universityIdParamSchema = z.string().trim().min(1, "University id is required");

export { LIST_FIELDS, DETAIL_FIELDS };
