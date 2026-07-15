"use client";

import { serif } from "@/styles/typography";
import { UNIVERSITY_ADMISSION_REQUIREMENTS } from "@/constants/universityDetail";

export function UniversityAdmissionRequirements() {
  return (
    <div className="bg-white dark:bg-[#241410] rounded-[24px] p-6 border border-[#E8DDD0] dark:border-white/8">
      <h2 className="font-bold text-[#333333] dark:text-[#F5EDE0] text-xl mb-4" style={serif}>Admission Requirements</h2>
      <div className="space-y-0 divide-y divide-[#E8DDD0] dark:divide-white/8">
        {UNIVERSITY_ADMISSION_REQUIREMENTS.map(([req, val]) => (
          <div key={req} className="flex items-center justify-between py-3">
            <span className="text-sm text-[#666666]">{req}</span>
            <span className="text-sm font-bold text-[#333333] dark:text-[#F5EDE0] text-right ml-4">{val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
