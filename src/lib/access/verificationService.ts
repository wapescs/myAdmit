// Interface only. UI must depend on this contract, never on mock/ or a
// specific provider directly. Swap the implementation in index.ts.
export interface VerificationService {
  sendPhoneOtp(phone: string): Promise<void>;
  verifyPhoneOtp(phone: string, code: string): Promise<boolean>;
}
