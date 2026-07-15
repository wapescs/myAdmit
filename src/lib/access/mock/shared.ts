// Shared mock helpers. Not part of any service interface — safe to change
// freely without touching UI code.
export const MOCK_OTP_CODE = "123456";
export const MOCK_LATENCY_MS = 500;

export function mockDelay(ms: number = MOCK_LATENCY_MS): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
