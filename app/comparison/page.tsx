import { ComparisonPage } from "@/app/components/comparison/ComparisonPage";
import { FeatureGate } from "@/app/components/access/FeatureGate";

export default function Page() {
  return (
    <FeatureGate requires="email" featureName="Compare Universities">
      <ComparisonPage />
    </FeatureGate>
  );
}
