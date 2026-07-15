import { ProfileWizardPage } from "@/app/components/profile-wizard/ProfileWizardPage";
import { FeatureGate } from "@/app/components/access/FeatureGate";

export default function Page() {
  return (
    <FeatureGate requires="email" featureName="Profile">
      <ProfileWizardPage />
    </FeatureGate>
  );
}
