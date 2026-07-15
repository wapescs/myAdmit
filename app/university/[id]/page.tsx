import { getUniversityById, getUniversities } from "@/services/university.service";
import { UniversityDetailPage } from "@/app/components/university-detail/UniversityDetailPage";

export default async function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const university = (await getUniversityById(id)) ?? (await getUniversities())[0];

  return <UniversityDetailPage university={university} />;
}
