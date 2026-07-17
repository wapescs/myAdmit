import type { NextRequest } from "next/server";
import { withApiHandler } from "@/api-middleware/with-api-handler";
import { successResponse } from "@/utils/api-response.util";
import { computeEtag, isNotModified, applyCacheHeaders, notModifiedResponse } from "@/utils/cache.util";
import { getUniversityById } from "@/features/universities/controller/university.controller";

/**
 * @swagger
 * /api/universities/{id}:
 *   get:
 *     summary: Get a single university with merged country-specific details
 *     tags: [Universities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *       - in: query
 *         name: fields
 *         description: Comma-separated allow-list of top-level response fields
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: University detail
 *       304:
 *         description: Not modified (ETag match)
 *       404:
 *         description: University not found
 *       429:
 *         description: Rate limit exceeded
 */
export const GET = withApiHandler(async (request: NextRequest, { params }: { params: { id: string } }) => {
  const { result, message } = await getUniversityById(params.id, request.nextUrl.searchParams);

  const etag = computeEtag(result);
  if (isNotModified(request, etag)) {
    return notModifiedResponse(etag);
  }

  const response = successResponse(result, { message });
  return applyCacheHeaders(response, etag);
});
