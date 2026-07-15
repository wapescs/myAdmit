import type { QualificationDetails, UserProfile } from "./types";

// Interface only. UI must depend on this contract, never on mock/ or a
// specific provider directly. Swap the implementation in index.ts.
export interface ProfileService {
  saveQualification(details: QualificationDetails): Promise<void>;
  getProfile(): Promise<UserProfile | null>;
}
