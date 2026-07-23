"use client";

import { serif } from "@/styles/typography";
import type { AcademicRequirements } from "@/types/university";

const LABELS: [keyof AcademicRequirements, string][] = [
  ["ug", "Undergraduate"],
  ["pg", "Postgraduate"],
  ["acceptedBacklogs", "Accepted Backlogs"],
];

export function UniversityAdmissionRequirements({ academicRequirements }: { academicRequirements?: AcademicRequirements }) {
  const rows = LABELS.filter(([key]) => academicRequirements?.[key]);

  return (
    <div className="bg-white dark:bg-[#241410] rounded-[24px] p-6 border border-[#E8DDD0] dark:border-white/8">
      <h2 className="font-bold text-[#333333] dark:text-[#F5EDE0] text-xl mb-4" style={serif}>Admission Requirements</h2>
      {rows.length > 0 ? (
        <div className="space-y-4">
          {rows.map(([key, label]) => (
            <div key={key}>
              <div className="text-xs font-semibold text-[#8B2626] uppercase tracking-wide mb-1">{label}</div>
              <p className="text-sm text-[#333333] dark:text-[#F5EDE0] leading-relaxed whitespace-pre-line">{academicRequirements?.[key]}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-[#666666]">Admission requirements aren&apos;t available for this university yet.</p>
      )}
    </div>
  );
}
