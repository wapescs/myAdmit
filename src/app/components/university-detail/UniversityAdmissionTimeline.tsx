"use client";

import { serif } from "@/styles/typography";
import { UNIVERSITY_ADMISSION_TIMELINE } from "@/constants/universityDetail";

export function UniversityAdmissionTimeline() {
  return (
    <div className="bg-white dark:bg-[#241410] rounded-[24px] p-6 border border-[#E8DDD0] dark:border-white/8">
      <h3 className="font-bold text-[#333333] dark:text-[#F5EDE0] mb-4" style={serif}>Admission Timeline</h3>
      <div className="space-y-0">
        {UNIVERSITY_ADMISSION_TIMELINE.map(([mo, ev]) => (
          <div key={mo + ev} className="flex gap-3 py-2.5 border-b border-[#E8DDD0] dark:border-white/8 last:border-b-0">
            <div className="w-9 h-9 rounded-lg bg-[#8B2626]/10 flex items-center justify-center flex-shrink-0"><span className="text-[10px] font-bold text-[#8B2626]">{mo}</span></div>
            <div className="flex-1 flex items-center"><span className="text-sm text-[#333333] dark:text-[#F5EDE0]">{ev}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}
