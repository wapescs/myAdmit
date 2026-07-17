import { readIntEnv } from "@/utils/env.util";

export const paginationConfig = {
  defaultPage: 1,
  defaultLimit: readIntEnv("PAGINATION_DEFAULT_LIMIT", 20),
  maxLimit: readIntEnv("PAGINATION_MAX_LIMIT", 100),
};
