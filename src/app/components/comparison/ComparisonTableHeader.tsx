"use client";

import { serif } from "@/styles/typography";
import type { University } from "@/types/university.types";

export function ComparisonTableHeader({ universities }: { universities: University[] }) {
  return (
    <div className="grid grid-cols-4 border-b border-[#E8DDD0] dark:border-white/8">
      <div className="p-5 border-r border-[#E8DDD0] dark:border-white/8 flex items-center">
        <span className="text-xs font-bold text-[#666666] uppercase tracking-wider">Criteria</span>
      </div>
      {universities.map(u => (
        <div key={u.id} className="p-4 text-center border-r border-[#E8DDD0] dark:border-white/8 last:border-r-0">
          <img src={u.image} alt={u.name} className="w-full h-20 object-cover rounded-xl mb-2.5 bg-[#EDE8DF]" />
          <div className="font-bold text-[#333333] dark:text-[#F5EDE0] text-sm leading-tight" style={serif}>{u.shortName}</div>
          <div className="text-xs text-[#666666] mt-0.5">{u.flag} {u.country}</div>
        </div>
      ))}
    </div>
  );
}
