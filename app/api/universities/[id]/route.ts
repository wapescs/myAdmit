import type { NextRequest } from "next/server";
import { withErrorHandling } from "@/api-middleware/with-error-handling";
import { successResponse } from "@/utils/api-response.util";
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
 *     responses:
 *       200:
 *         description: University detail
 *       404:
 *         description: University not found
 */
export const GET = withErrorHandling(async (_request: NextRequest, { params }: { params: { id: string } }) => {
  const result = await getUniversityById(params.id);
  return successResponse(result);
});
