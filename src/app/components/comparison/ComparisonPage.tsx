"use client";

import { ComparisonUniversitySelector } from "./ComparisonUniversitySelector";
import { ComparisonTable } from "./ComparisonTable";
import { useComparisonSelection } from "@/hooks/useComparisonSelection";
import { serif } from "@/styles/typography";

export function ComparisonPage() {
  const { selectedIndexes, updateSlot, selectedUniversities } = useComparisonSelection();

  return (
    // <div className="min-h-screen pt-28 pb-20 bg-[#FAF6EE] dark:bg-[#1A0E0A]">
    //   <div className="max-w-[1280px] mx-auto px-5 lg:px-8">
    //     <div className="mb-8">
    //       <div className="text-sm font-semibold text-[#8B2626] mb-2 uppercase tracking-wider">Side-by-Side</div>
    //       <h1 className="text-3xl lg:text-4xl font-bold text-[#333333] dark:text-[#F5EDE0] mb-2" style={serif}>Compare Universities</h1>
    //       <p className="text-[#666666]">Make informed decisions with detailed comparisons</p>
    //     </div>
        
    //     {/* <ComparisonUniversitySelector selectedIndexes={selectedIndexes} onChangeSlot={updateSlot} /> */}
    //     {/* <ComparisonTable universities={selectedUniversities} /> */}
    //   </div>
    // </div>

    <div className="min-h-screen pt-28 pb-20 bg-[#FAF6EE] dark:bg-[#1A0E0A]">
  <div className="max-w-[1280px] mx-auto px-5 lg:px-8">
    <div className="mb-8">
      {/* <div className="text-sm font-semibold text-[#8B2626] mb-2 uppercase tracking-wider">Side-by-Side</div> */}
      <h1 className="text-3xl lg:text-4xl font-bold text-[#333333] dark:text-[#F5EDE0] mb-2" style={serif}> Universities</h1>
      <p className="text-[#666666]">Make informed decisions with detailed comparisons</p>
    </div>

    {/* Dev placeholder — comparison feature coming soon, no data yet */}
    <div className="rounded-2xl border border-dashed border-[#8B2626]/30 bg-white/50 dark:bg-[#2A1810]/50 p-8 lg:p-12">
      <div className="flex flex-col items-center text-center mb-10">
        <div className="w-14 h-14 rounded-full bg-[#8B2626]/10 flex items-center justify-center mb-4">
          <svg className="w-7 h-7 text-[#8B2626]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3v18M14.25 3v18M4.5 3h15a.75.75 0 01.75.75v16.5a.75.75 0 01-.75.75h-15a.75.75 0 01-.75-.75V3.75A.75.75 0 014.5 3z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-[#333333] dark:text-[#F5EDE0] mb-2" style={serif}>
          listing universities comming soon
        </h2>
        <p className="text-[#666666] dark:text-[#C9BBA8] max-w-md">
           Data isn't loaded yet, but here's a preview of what the list will look like.
        </p>
      </div>

      {/* Static sample list — illustrative only, not functional */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          "Stanford University",
          "University of Oxford",
          "National University of Singapore",
          "University of Toronto",
          "ETH Zurich",
          "University of Melbourne",
        ].map((name) => (
          <div
            key={name}
            className="rounded-xl border border-[#8B2626]/15 bg-[#FAF6EE] dark:bg-[#1A0E0A] p-5 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-[#8B2626]/10 flex items-center justify-center shrink-0">
              <span className="text-[#8B2626] font-bold text-sm">
                {name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
              </span>
            </div>
            <span className="text-sm font-medium text-[#333333] dark:text-[#F5EDE0]">{name}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <span className="inline-block text-xs font-semibold text-[#8B2626] uppercase tracking-wider bg-[#8B2626]/10 px-3 py-1.5 rounded-full">
          In Development
        </span>
      </div>
    </div>
  </div>
</div>
  );
}
