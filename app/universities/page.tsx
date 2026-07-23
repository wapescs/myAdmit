import { serif } from "@/styles/typography";
import { getUniversities } from "@/services/university.service";
import { UniversityGrid } from "@/app/components/university/UniversityGrid";
import { UniversityFilters } from "@/app/components/university/UniversityFilters";
import { Pagination } from "@/app/components/university/Pagination";
import { FeatureGate } from "@/app/components/access/FeatureGate";

const DEFAULT_LIMIT = 12;

export default async function UniversitiesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams.page) || 1;
  const search = typeof searchParams.search === "string" ? searchParams.search : undefined;
  const country = typeof searchParams.country === "string" ? searchParams.country : undefined;
  const sortBy = searchParams.sortBy === "country" ? "country" : "name";
  const sortOrder = searchParams.sortOrder === "desc" ? "desc" : "asc";

  const { items: universities, meta } = await getUniversities({
    page,
    limit: DEFAULT_LIMIT,
    search,
    country,
    sortBy,
    sortOrder,
  });

  const availableCountries = Array.from(new Set(universities.map(u => u.country))).sort();

  return (
    <div className="min-h-screen bg-[#FAF6EE] dark:bg-[#1A0E0A] pt-16 lg:pt-20">
      <section className="py-16">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-8">
          <div className="mb-10">
            <div className="text-sm font-semibold text-[#8B2626] mb-2 uppercase tracking-wider">Explore</div>
            <h1 className="text-3xl lg:text-4xl font-bold text-[#333333] dark:text-[#F5EDE0]" style={serif}>
              All Universities
            </h1>
            <p className="text-[#666666] mt-2">Browse and filter universities from our full catalog</p>
          </div>

          <UniversityFilters availableCountries={availableCountries} />

          {universities.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#666666] text-sm">No universities matched your filters.</p>
            </div>
          ) : (
            <>
              {page > 1 ? (
                <FeatureGate requires="email" featureName="More Universities">
                  <UniversityGrid universities={universities} />
                </FeatureGate>
              ) : (
                <UniversityGrid universities={universities} />
              )}
              <Pagination meta={meta} />
            </>
          )}
        </div>
      </section>
    </div>
  );
}
