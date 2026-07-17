import type { NextRequest } from "next/server";
import { withErrorHandling } from "@/api-middleware/with-error-handling";
import { successResponse } from "@/utils/api-response.util";
import { listUniversities } from "@/features/universities/controller/university.controller";

/**
 * @swagger
 * /api/universities:
 *   get:
 *     summary: List universities
 *     tags: [Universities]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *       - in: query
 *         name: country
 *         schema: { type: string }
 *       - in: query
 *         name: sortBy
 *         schema: { type: string, enum: [name, country] }
 *       - in: query
 *         name: sortOrder
 *         schema: { type: string, enum: [asc, desc] }
 *     responses:
 *       200:
 *         description: Paginated list of universities
 */
export const GET = withErrorHandling(async (request: NextRequest) => {
  const result = await listUniversities(request.nextUrl.searchParams);
  return successResponse(result);
});
