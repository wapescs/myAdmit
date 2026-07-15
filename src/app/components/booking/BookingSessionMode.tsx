"use client";

import { SESSION_MODES } from "@/constants/booking";
import { serif } from "@/styles/typography";

export function BookingSessionMode() {
  return (
    <div>
      <h2 className="font-bold text-[#333333] dark:text-[#F5EDE0] mb-4" style={serif}>Session Mode</h2>
      <div className="grid grid-cols-3 gap-3 mb-5">
        {SESSION_MODES.map((mode, i) => (
          <button key={mode.label} className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${i === 0 ? "border-[#8B2626] bg-[#8B2626]/5" : "border-[#E8DDD0] hover:border-[#8B2626]/40"}`}>
            <mode.icon size={19} className={i === 0 ? "text-[#8B2626]" : "text-[#666666]"} />
            <span className="text-xs font-semibold text-[#333333] dark:text-[#F5EDE0]">{mode.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
