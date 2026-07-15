"use client";

import { serif } from "@/styles/typography";
import { BOOKING_TIMES } from "@/constants/booking";

export function BookingTimeSlots({
  selTime, onSelectTime,
}: {
  selTime: string;
  onSelectTime: (t: string) => void;
}) {
  return (
    <div className="bg-white dark:bg-[#241410] rounded-[24px] p-6 border border-[#E8DDD0] dark:border-white/8">
      <h2 className="font-bold text-[#333333] dark:text-[#F5EDE0] mb-4" style={serif}>Available Slots</h2>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
        {BOOKING_TIMES.map(t => (
          <button key={t} onClick={() => onSelectTime(t)}
            className={`py-2.5 rounded-xl text-sm font-semibold transition-all ${selTime === t ? "bg-[#8B2626] text-white shadow-sm" : "bg-[#FAF6EE] dark:bg-[#2E1A12] border border-[#E8DDD0] dark:border-white/8 text-[#333333] dark:text-[#F5EDE0] hover:border-[#8B2626]/40"}`}>
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
