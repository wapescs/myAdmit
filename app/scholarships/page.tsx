import { ScholarshipsPage } from "@/app/components/scholarships/ScholarshipsPage";
import { FeatureGate } from "@/app/components/access/FeatureGate";

export default function Page() {
  return (
    <FeatureGate requires="email" featureName="Scholarships">
      <ScholarshipsPage />
    </FeatureGate>
  );
}
