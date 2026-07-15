"use client";

import type { University } from "@/types/university.types";

export function ComparisonTableRow({
  label, getValue, universities, index,
}: {
  label: string;
  getValue: (u: University) => string;
  universities: University[];
  index: number;
}) {
  return (
    <div className={`grid grid-cols-4 border-b border-[#E8DDD0] dark:border-white/8 last:border-b-0 ${index % 2 === 0 ? "" : "bg-[#FAF6EE] dark:bg-[#2E1A12]/50"}`}>
      <div className="p-4 border-r border-[#E8DDD0] dark:border-white/8 flex items-center">
        <span className="text-sm text-[#666666] font-medium">{label}</span>
      </div>
      {universities.map(u => {
        const value = getValue(u);
        return (
          <div key={u.id} className="p-4 text-center border-r border-[#E8DDD0] dark:border-white/8 last:border-r-0 flex items-center justify-center">
            <span className={`text-sm font-bold ${value.includes("✓") ? "text-[#2E7D32]" : value.includes("✗") ? "text-[#D32F2F]" : "text-[#333333] dark:text-[#F5EDE0]"}`}>
              {value}
            </span>
          </div>
        );
      })}
    </div>
  );
}
