"use client";

import { UniversityDetailHero } from "./UniversityDetailHero";
import { UniversityQuickStats } from "./UniversityQuickStats";
import { UniversityTabs } from "./UniversityTabs";
import { UniversityAboutCard } from "./UniversityAboutCard";
import { UniversityProgramsCard } from "./UniversityProgramsCard";
import { UniversityAdmissionRequirements } from "./UniversityAdmissionRequirements";
import { UniversityBookingSidebar } from "./UniversityBookingSidebar";
import { useUniversityDetail } from "@/hooks/useUniversityDetail";
import { UNIVERSITY_ABOUT_TEXT, UNIVERSITY_TOP_PROGRAMS } from "@/constants/universityDetail";
import type { University } from "@/types/university.types";

/**
 * The original app only ever rendered MIT's detail page, with real hand-written
 * "About"/"Top Programs" copy. Now that routing resolves any university by id, that
 * copy would misname other universities if reused verbatim — so MIT (id 1) keeps the
 * original text exactly, while every other university falls back to its own real data
 * (`description`/`programs`) instead of a false MIT-specific paragraph/list.
 */
export function UniversityDetailPage({ university }: { university: University }) {
  const { saved, toggleSaved, tab, setTab } = useUniversityDetail();
  const isMit = university.id === 1;
  const aboutText = isMit ? UNIVERSITY_ABOUT_TEXT : university.description;
  const programs = isMit ? UNIVERSITY_TOP_PROGRAMS : university.programs;

  return (
    <div className="min-h-screen bg-[#FAF6EE] dark:bg-[#1A0E0A] pt-16 lg:pt-20">
      <UniversityDetailHero university={university} saved={saved} onToggleSave={toggleSaved} />
      <UniversityQuickStats university={university} />
      <UniversityTabs tab={tab} onChangeTab={setTab} />
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-5">
            <UniversityAboutCard universityShortName={university.shortName} aboutText={aboutText} />
            <UniversityProgramsCard programs={programs} />
            <UniversityAdmissionRequirements />
          </div>
          <UniversityBookingSidebar universityShortName={university.shortName} />
        </div>
      </div>
    </div>
  );
}
