import { DashboardPage } from "@/app/components/dashboard/DashboardPage";
import { FeatureGate } from "@/app/components/access/FeatureGate";

export default function Page() {
  return (
    <FeatureGate requires="email" featureName="Dashboard">
      <DashboardPage />
    </FeatureGate>
  );
}
