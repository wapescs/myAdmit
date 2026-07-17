import type { NextRequest } from "next/server";
import { withApiHandler } from "@/api-middleware/with-api-handler";
import { successResponse } from "@/utils/api-response.util";
import { computeEtag, isNotModified, applyCacheHeaders, notModifiedResponse } from "@/utils/cache.util";
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
 *         schema: { type: integer, default: 20, maximum: 100 }
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
 *       - in: query
 *         name: fields
 *         description: Comma-separated allow-list of top-level response fields (id, name, country, websiteUrl, campusLocations)
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Paginated list of universities
 *       304:
 *         description: Not modified (ETag match)
 *       400:
 *         description: Invalid query parameters
 *       429:
 *         description: Rate limit exceeded
 */
export const GET = withApiHandler(async (request: NextRequest) => {
  const { result, message } = await listUniversities(request.nextUrl.searchParams);

  const etag = computeEtag(result);
  if (isNotModified(request, etag)) {
    return notModifiedResponse(etag);
  }

  const response = successResponse(result.items, { message, meta: result.meta });
  return applyCacheHeaders(response, etag);
});
