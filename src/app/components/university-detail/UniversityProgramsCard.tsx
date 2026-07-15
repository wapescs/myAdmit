"use client";

import { CheckCircle } from "lucide-react";
import { serif } from "@/styles/typography";

export function UniversityProgramsCard({ programs }: { programs: string[] }) {
  return (
    <div className="bg-white dark:bg-[#241410] rounded-[24px] p-6 border border-[#E8DDD0] dark:border-white/8">
      <h2 className="font-bold text-[#333333] dark:text-[#F5EDE0] text-xl mb-4" style={serif}>Top Programs</h2>
      <div className="grid grid-cols-2 gap-3">
        {programs.map(p => (
          <div key={p} className="flex items-center gap-2.5 p-3 bg-[#FAF6EE] dark:bg-[#2E1A12] rounded-xl border border-[#E8DDD0]">
            <CheckCircle size={15} className="text-[#2E7D32] flex-shrink-0" /><span className="text-sm text-[#333333] dark:text-[#F5EDE0] font-medium">{p}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
