import { readListEnv } from "@/utils/env.util";

export const corsConfig = {
  allowedOrigins: readListEnv("CORS_ALLOWED_ORIGINS"),
};
