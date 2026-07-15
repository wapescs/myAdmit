"use client";

import { serif } from "@/styles/typography";

export function UniversityAboutCard({ universityShortName, aboutText }: { universityShortName: string; aboutText: string }) {
  return (
    <div className="bg-white dark:bg-[#241410] rounded-[24px] p-6 border border-[#E8DDD0] dark:border-white/8">
      <h2 className="font-bold text-[#333333] dark:text-[#F5EDE0] text-xl mb-4" style={serif}>About {universityShortName}</h2>
      <p className="text-[#666666] leading-relaxed text-sm">{aboutText}</p>
    </div>
  );
}
