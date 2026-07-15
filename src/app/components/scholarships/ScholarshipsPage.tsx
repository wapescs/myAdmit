"use client";

import { ScholarshipFilterBar } from "./ScholarshipFilterBar";
import { ScholarshipGrid } from "./ScholarshipGrid";
import { useScholarshipFilters } from "@/hooks/useScholarshipFilters";
import { useUserState } from "@/app/providers/UserStateProvider";
import { serif } from "@/styles/typography";

export function ScholarshipsPage() {
  const { userState } = useUserState();
  const { savedIds, toggleSaved, filterCountry, setFilterCountry, filterCat, setFilterCat, filteredScholarships } = useScholarshipFilters();

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#FAF6EE] dark:bg-[#1A0E0A]">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8">
        <div className="mb-10">
          <div className="text-sm font-semibold text-[#8B2626] mb-2 uppercase tracking-wider">Funding</div>
          <h1 className="text-3xl lg:text-4xl font-bold text-[#333333] dark:text-[#F5EDE0] mb-2" style={serif}>Scholarship Explorer</h1>
          <p className="text-[#666666]">Discover scholarships worth millions — filtered for your profile</p>
        </div>
        <ScholarshipFilterBar filterCountry={filterCountry} onFilterCountry={setFilterCountry} filterCat={filterCat} onFilterCat={setFilterCat} />
        <ScholarshipGrid scholarships={filteredScholarships} savedIds={savedIds} onToggleSave={toggleSaved} isAnonymous={userState === "anonymous"} />
      </div>
    </div>
  );
}
