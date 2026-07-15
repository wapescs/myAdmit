"use client";

import { BOOKING_SESSION_FEE } from "@/constants/booking";

export function BookingSummaryCard({
  counselorName, selDate, selTime,
}: {
  counselorName: string;
  selDate: number;
  selTime: string;
}) {
  const rows: [string, string][] = [
    ["Counselor", counselorName],
    ["Date", `July ${selDate}, 2025`],
    ["Time", `${selTime} IST`],
    ["Duration", "60 minutes"],
  ];

  return (
    <div>
      <div className="p-4 bg-[#FAF6EE] dark:bg-[#2E1A12] rounded-xl border border-[#E8DDD0] mb-4 space-y-2.5">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between text-sm">
            <span className="text-[#666666]">{k}</span><span className="font-semibold text-[#333333] dark:text-[#F5EDE0]">{v}</span>
          </div>
        ))}
        <div className="flex justify-between text-sm pt-2 border-t border-[#E8DDD0] dark:border-white/10">
          <span className="font-bold text-[#333333] dark:text-[#F5EDE0]">Session Fee</span>
          <span className="font-bold text-[#333333] dark:text-[#F5EDE0]">{BOOKING_SESSION_FEE}</span>
        </div>
      </div>
      <button className="w-full py-4 bg-[#8B2626] text-white font-bold rounded-xl hover:bg-[#6E1E1E] transition-all">Confirm &amp; Pay {BOOKING_SESSION_FEE}</button>
      <p className="text-xs text-center text-[#999] mt-2">Secure payment · Instant confirmation · Free rescheduling</p>
    </div>
  );
}
