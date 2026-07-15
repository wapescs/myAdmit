"use client";

import { Star } from "lucide-react";
import type { Counselor } from "@/types/booking.types";

export function CounselorCard({
  counselor, selected, onSelect,
}: {
  counselor: Counselor;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button onClick={onSelect}
      className={`w-full text-left p-4 rounded-[20px] border-2 transition-all ${selected ? "border-[#8B2626] bg-[#8B2626]/5" : "border-[#E8DDD0] bg-white dark:bg-[#241410] hover:border-[#8B2626]/40"}`}>
      <div className="flex items-center gap-3 mb-3">
        <img src={counselor.img} alt={counselor.name} className="w-11 h-11 rounded-full object-cover bg-[#EDE8DF]" />
        <div>
          <div className="font-bold text-sm text-[#333333] dark:text-[#F5EDE0]">{counselor.name}</div>
          <div className="text-xs text-[#8B2626] font-medium">{counselor.spec}</div>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1"><Star size={11} className="fill-[#CFA56A] text-[#CFA56A]" /><span className="font-bold text-[#333333] dark:text-[#F5EDE0]">{counselor.rating}</span><span className="text-[#666666]">({counselor.sessions})</span></div>
        <div className="flex gap-1">{counselor.langs.map(l => <span key={l} className="px-1.5 py-0.5 bg-[#FAF6EE] border border-[#E8DDD0] rounded text-[#666666] text-[10px]">{l}</span>)}</div>
      </div>
    </button>
  );
}
