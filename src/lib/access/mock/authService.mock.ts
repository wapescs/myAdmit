import type { AuthService } from "../authService";
import { MOCK_OTP_CODE, mockDelay } from "./shared";

export const mockAuthService: AuthService = {
  async signInWithGoogle() {
    await mockDelay();
    return { email: "student.mock@gmail.com" };
  },

  async sendEmailOtp(_email: string) {
    await mockDelay();
    // No real email is sent in mock mode — the OTP screen shows the fixed
    // code to the user directly.
  },

  async verifyEmailOtp(_email: string, code: string) {
    await mockDelay();
    return code === MOCK_OTP_CODE;
  },
};
