"use client";

import Link from "next/link";
import type { University } from "@/types/university.types";

export function ComparisonTableActions({ universities }: { universities: University[] }) {
  return (
    <div className="grid grid-cols-4 bg-[#FAF6EE] dark:bg-[#2E1A12]/50">
      <div className="p-4 border-r border-[#E8DDD0] dark:border-white/8 flex items-center">
        <span className="text-sm text-[#666666] font-semibold">Actions</span>
      </div>
      {universities.map(u => (
        <div key={u.id} className="p-3 flex flex-col gap-2 border-r border-[#E8DDD0] last:border-r-0">
          <Link href={`/university/${u.id}`} className="py-2 text-xs font-bold text-white bg-[#8B2626] rounded-xl hover:bg-[#6E1E1E] transition-all text-center">Apply</Link>
          <button className="py-2 text-xs font-semibold text-[#666666] border border-[#E8DDD0] rounded-xl hover:bg-white transition-all">Save</button>
        </div>
      ))}
    </div>
  );
}
