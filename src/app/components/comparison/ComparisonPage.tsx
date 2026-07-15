"use client";

import { ComparisonUniversitySelector } from "./ComparisonUniversitySelector";
import { ComparisonTable } from "./ComparisonTable";
import { useComparisonSelection } from "@/hooks/useComparisonSelection";
import { serif } from "@/styles/typography";

export function ComparisonPage() {
  const { selectedIndexes, updateSlot, selectedUniversities } = useComparisonSelection();

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#FAF6EE] dark:bg-[#1A0E0A]">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8">
        <div className="mb-8">
          <div className="text-sm font-semibold text-[#8B2626] mb-2 uppercase tracking-wider">Side-by-Side</div>
          <h1 className="text-3xl lg:text-4xl font-bold text-[#333333] dark:text-[#F5EDE0] mb-2" style={serif}>Compare Universities</h1>
          <p className="text-[#666666]">Make informed decisions with detailed comparisons</p>
        </div>
        <ComparisonUniversitySelector selectedIndexes={selectedIndexes} onChangeSlot={updateSlot} />
        <ComparisonTable universities={selectedUniversities} />
      </div>
    </div>
  );
}
