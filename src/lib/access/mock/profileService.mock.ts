import type { ProfileService } from "../profileService";
import type { QualificationDetails, UserProfile } from "../types";
import { mockDelay } from "./shared";

// In-memory only — resets on reload, same as the rest of the MVP mock state.
let storedQualification: QualificationDetails | null = null;

export const mockProfileService: ProfileService = {
  async saveQualification(details: QualificationDetails) {
    await mockDelay();
    storedQualification = details;
  },

  async getProfile() {
    await mockDelay();
    if (!storedQualification) return null;
    return {
      email: null,
      phone: null,
      phoneVerified: false,
      qualification: storedQualification,
    } satisfies UserProfile;
  },
};
