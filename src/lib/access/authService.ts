// Interface only. UI must depend on this contract, never on mock/ or a
// specific provider directly. Swap the implementation in index.ts.
export interface AuthService {
  signInWithGoogle(): Promise<{ email: string }>;
  sendEmailOtp(email: string): Promise<void>;
  verifyEmailOtp(email: string, code: string): Promise<boolean>;
}
