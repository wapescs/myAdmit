import { readIntEnv } from "@/utils/env.util";

export const rateLimitConfig = {
  // "anonymous" is the only tier actually enforced today — there is no
  // authentication system in this project yet. "authenticated" exists so
  // that wiring real auth later (API keys / JWT — currently a documented
  // future item) only means passing a different tier into checkRateLimit(),
  // not redesigning the limiter.
  anonymous: {
    windowMs: readIntEnv("RATE_LIMIT_ANONYMOUS_WINDOW_MS", 60_000),
    max: readIntEnv("RATE_LIMIT_ANONYMOUS_MAX", 60),
  },
  authenticated: {
    windowMs: readIntEnv("RATE_LIMIT_AUTHENTICATED_WINDOW_MS", 60_000),
    max: readIntEnv("RATE_LIMIT_AUTHENTICATED_MAX", 300),
  },
};
