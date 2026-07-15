import { getUniversityById, getUniversities } from "@/services/university.service";
import { UniversityDetailPage } from "@/app/components/university-detail/UniversityDetailPage";
import { FeatureGate } from "@/app/components/access/FeatureGate";

export default async function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const university = (await getUniversityById(id)) ?? (await getUniversities())[0];

  return (
    <FeatureGate requires="email" featureName="University Details">
      <UniversityDetailPage university={university} />
    </FeatureGate>
  );
}
