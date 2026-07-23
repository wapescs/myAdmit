import { UniversityDetailModern } from "@/app/components/university-detail-modern/UniversityDetailModern";
import { FeatureGate } from "@/app/components/access/FeatureGate";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <FeatureGate requires="email" featureName="University Details">
      <UniversityDetailModern id={params.id} />
    </FeatureGate>
  );
}
