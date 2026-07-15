"use client";

import { Filter } from "lucide-react";
import { SCHOLARSHIP_COUNTRY_FILTERS, SCHOLARSHIP_CATEGORY_FILTERS } from "@/constants/scholarships";

export function ScholarshipFilterBar({
  filterCountry, onFilterCountry, filterCat, onFilterCat,
}: {
  filterCountry: string;
  onFilterCountry: (c: string) => void;
  filterCat: string;
  onFilterCat: (c: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-8 bg-white dark:bg-[#241410] p-4 rounded-[20px] border border-[#E8DDD0] dark:border-white/8 shadow-sm items-center">
      <div className="flex items-center gap-2 text-sm text-[#666666] font-semibold mr-2"><Filter size={15} />Filter:</div>
      {SCHOLARSHIP_COUNTRY_FILTERS.map(c => (
        <button key={c} onClick={() => onFilterCountry(c)} className={`px-3 py-1.5 text-xs rounded-full border transition-all font-medium ${filterCountry === c ? "bg-[#8B2626] text-white border-[#8B2626]" : "border-[#E8DDD0] text-[#666666] hover:border-[#8B2626]/40"}`}>{c}</button>
      ))}
      <div className="w-px h-6 bg-[#E8DDD0] hidden md:block" />
      {SCHOLARSHIP_CATEGORY_FILTERS.map(c => (
        <button key={c} onClick={() => onFilterCat(c)} className={`px-3 py-1.5 text-xs rounded-full border transition-all font-medium ${filterCat === c ? "bg-[#CFA56A] text-white border-[#CFA56A]" : "border-[#E8DDD0] text-[#666666] hover:border-[#CFA56A]/40"}`}>{c}</button>
      ))}
    </div>
  );
}
