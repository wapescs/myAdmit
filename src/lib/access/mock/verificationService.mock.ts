import type { VerificationService } from "../verificationService";
import { MOCK_OTP_CODE, mockDelay } from "./shared";

export const mockVerificationService: VerificationService = {
  async sendPhoneOtp(_phone: string) {
    await mockDelay();
  },

  async verifyPhoneOtp(_phone: string, code: string) {
    await mockDelay();
    return code === MOCK_OTP_CODE;
  },
};
