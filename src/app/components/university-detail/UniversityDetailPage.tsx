"use client";

import { AlertCircle } from "lucide-react";
import { UniversityDetailHero } from "./UniversityDetailHero";
import { UniversityQuickStats } from "./UniversityQuickStats";
import { UniversityTabs } from "./UniversityTabs";
import { UniversityAboutCard } from "./UniversityAboutCard";
import { UniversityProgramsCard } from "./UniversityProgramsCard";
import { UniversityAdmissionRequirements } from "./UniversityAdmissionRequirements";
import { UniversityCountryRequirements } from "./UniversityCountryRequirements";
import { UniversityBookingSidebar } from "./UniversityBookingSidebar";
import { UniversityFAQ } from "@/app/components/university/UniversityFAQ";
import { Skeleton } from "@/app/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/app/components/ui/alert";
import { useUniversityDetail } from "@/hooks/useUniversityDetail";
import { useUniversity } from "@/hooks/useUniversity";

const DEFAULT_PROGRAMS: string[] = [];

function TabEmptyState({ message }: { message: string }) {
  return (
    <div className="bg-white dark:bg-[#241410] rounded-[24px] p-6 border border-[#E8DDD0] dark:border-white/8 text-center">
      <p className="text-sm text-[#666666]">{message}</p>
    </div>
  );
}

export function UniversityDetailPage({ id }: { id: string }) {
  const { saved, toggleSaved, tab, setTab } = useUniversityDetail();
  const { university, isLoading, error, refetch } = useUniversity(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF6EE] dark:bg-[#1A0E0A] pt-16 lg:pt-20">
        <Skeleton className="h-72 md:h-96 w-full rounded-none" />
        <div className="max-w-[1280px] mx-auto px-5 lg:px-8 py-10 space-y-4">
          <Skeleton className="h-24 w-full rounded-2xl" />
          <Skeleton className="h-40 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  if (error || !university) {
    return (
      <div className="min-h-screen bg-[#FAF6EE] dark:bg-[#1A0E0A] pt-16 lg:pt-20 flex items-center justify-center px-5">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle />
          <AlertTitle>Couldn&apos;t load this university</AlertTitle>
          <AlertDescription>
            <p>{error ?? "University not found."}</p>
            <button onClick={refetch} className="mt-2 text-sm font-semibold underline">
              Try again
            </button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const universityShortName = university.shortName ?? university.name;
  const aboutText = university.description ?? "Detailed information about this university is not available yet.";
  const programs = university.programs ?? DEFAULT_PROGRAMS;

  return (
    <div className="min-h-screen bg-[#FAF6EE] dark:bg-[#1A0E0A] pt-16 lg:pt-20">
      <UniversityDetailHero university={university} saved={saved} onToggleSave={toggleSaved} />
      <UniversityQuickStats university={university} />
      <UniversityTabs tab={tab} onChangeTab={setTab} />
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-5">
            {tab === "Overview" && (
              <>
                <UniversityAboutCard universityShortName={universityShortName} aboutText={aboutText} />
                <UniversityFAQ faqs={university.faqs} />
              </>
            )}

            {tab === "Programs" && (
              programs.length > 0
                ? <UniversityProgramsCard programs={programs} />
                : <TabEmptyState message={`Program details for ${universityShortName} aren't available yet.`} />
            )}

            {tab === "Admissions" && (
              <>
                <UniversityAdmissionRequirements academicRequirements={university.academicRequirements} />
                <UniversityCountryRequirements countrySpecificData={university.countrySpecificData} />
              </>
            )}

            {tab === "Scholarships" && (
              university.scholarships
                ? <TabEmptyState message={`${universityShortName} offers scholarships — ask a counselor for details specific to your profile.`} />
                : <TabEmptyState message="Scholarship information isn't available for this university yet." />
            )}

            {tab === "Reviews" && <TabEmptyState message="No reviews yet — be the first to share your experience." />}
          </div>
          <UniversityBookingSidebar universityShortName={universityShortName} />
        </div>
      </div>
    </div>
  );
}
