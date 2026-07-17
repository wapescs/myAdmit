import { readIntEnv } from "@/utils/env.util";

export const cacheConfig = {
  ttlSeconds: readIntEnv("CACHE_TTL_SECONDS", 60),
};
