"use client";

import { ChevronDown } from "lucide-react";
import { UNIVERSITIES } from "@/constants/universities";

export function ComparisonUniversitySelector({
  selectedIndexes, onChangeSlot,
}: {
  selectedIndexes: number[];
  onChangeSlot: (slot: number, uniIndex: number) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {[0, 1, 2].map(slot => (
        <div key={slot} className="relative">
          <select value={selectedIndexes[slot]} onChange={e => onChangeSlot(slot, +e.target.value)}
            className="w-full px-4 py-3 bg-white dark:bg-[#241410] border border-[#E8DDD0] dark:border-white/8 rounded-xl text-sm text-[#333333] dark:text-[#F5EDE0] focus:outline-none focus:border-[#8B2626]/50 appearance-none cursor-pointer">
            {UNIVERSITIES.map((u, i) => <option key={u.id} value={i}>{u.shortName} — {u.country}</option>)}
          </select>
          <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] pointer-events-none" />
        </div>
      ))}
    </div>
  );
}
