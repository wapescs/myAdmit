import { z } from "zod";

export const listUniversitiesQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().trim().min(1).optional(),
  country: z.string().trim().min(1).optional(),
  sortBy: z.enum(["name", "country"]).default("name"),
  sortOrder: z.enum(["asc", "desc"]).default("asc"),
});

export type ListUniversitiesQuery = z.infer<typeof listUniversitiesQuerySchema>;

export const universityIdParamSchema = z.string().trim().min(1, "University id is required");
