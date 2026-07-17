import { createSwaggerSpec } from "next-swagger-doc";
import { swaggerBaseSpec } from "@/docs/swagger/base-spec";

export function getApiDocs() {
  // apiFolder is relative to the project root, not src/ — route handlers
  // live under root app/api/ per this project's structure.
  return createSwaggerSpec({
    apiFolder: "app/api",
    definition: swaggerBaseSpec,
  });
}
