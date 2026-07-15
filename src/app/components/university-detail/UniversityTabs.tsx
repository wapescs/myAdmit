"use client";

import { UNIVERSITY_DETAIL_TABS } from "@/constants/universityDetail";

export function UniversityTabs({ tab, onChangeTab }: { tab: string; onChangeTab: (t: string) => void }) {
  return (
    <div className="bg-white dark:bg-[#241410] border-b border-[#E8DDD0] dark:border-white/8 sticky top-16 lg:top-20 z-40">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8 flex gap-1 overflow-x-auto">
        {UNIVERSITY_DETAIL_TABS.map(t => (
          <button key={t} onClick={() => onChangeTab(t)} className={`px-4 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${tab === t ? "border-[#8B2626] text-[#8B2626]" : "border-transparent text-[#666666] hover:text-[#333333]"}`}>{t}</button>
        ))}
      </div>
    </div>
  );
}
