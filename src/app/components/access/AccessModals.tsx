import { EmailLoginModal } from "./EmailLoginModal";
import { UpgradeModal } from "./UpgradeModal";

// Mounted once in the root layout. Both modals read their open/close state
// from AccessProvider, so any FeatureGate anywhere can trigger them.
export function AccessModals() {
  return (
    <>
      <EmailLoginModal />
      <UpgradeModal />
    </>
  );
}
