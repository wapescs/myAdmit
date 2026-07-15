// THE Supabase swap point. Everything else in the app imports services from
// here, never from ./mock or a future ./supabase directly.
//
// To swap mock -> Supabase later:
//   1. Add src/lib/access/supabase/{authService,verificationService,profileService}.ts
//      implementing the same interfaces (authService.ts, verificationService.ts,
//      profileService.ts).
//   2. Change the three imports/exports below to point at supabase/ instead of mock/.
// No UI component or hook needs to change.
import { mockAuthService } from "./mock/authService.mock";
import { mockVerificationService } from "./mock/verificationService.mock";
import { mockProfileService } from "./mock/profileService.mock";

export const authService = mockAuthService;
export const verificationService = mockVerificationService;
export const profileService = mockProfileService;

// Mock-mode-only UI hint (real OTPs must never be shown to the client).
// Delete this export as part of the Supabase swap.
export const MOCK_OTP_HINT = "Mock mode — use code 123456";

export * from "./types";
export type { AuthService } from "./authService";
export type { VerificationService } from "./verificationService";
export type { ProfileService } from "./profileService";
