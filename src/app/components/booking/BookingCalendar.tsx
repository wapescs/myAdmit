"use client";

import { serif } from "@/styles/typography";
import { BOOKING_CALENDAR_MONTH_LABEL, BOOKING_CALENDAR_DAYS_IN_MONTH, BOOKING_CALENDAR_LEADING_BLANKS, UNAVAILABLE_DATES } from "@/constants/booking";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function BookingCalendar({
  selDate, onSelectDate,
}: {
  selDate: number;
  onSelectDate: (day: number) => void;
}) {
  return (
    <div className="bg-white dark:bg-[#241410] rounded-[24px] p-6 border border-[#E8DDD0] dark:border-white/8">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-[#333333] dark:text-[#F5EDE0]" style={serif}>{BOOKING_CALENDAR_MONTH_LABEL}</h2>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEKDAYS.map(d => (
          <div key={d} className="text-[10px] text-center text-[#999] py-1 font-bold uppercase tracking-wider">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: BOOKING_CALENDAR_LEADING_BLANKS }, (_, i) => <div key={`blank-${i}`} />)}
        {Array.from({ length: BOOKING_CALENDAR_DAYS_IN_MONTH }, (_, i) => i + 1).map(day => (
          <button key={day} disabled={UNAVAILABLE_DATES.includes(day)} onClick={() => onSelectDate(day)}
            className={`h-9 w-full rounded-xl text-sm font-semibold transition-all ${selDate === day ? "bg-[#8B2626] text-white shadow-sm" : UNAVAILABLE_DATES.includes(day) ? "text-[#CCC] cursor-not-allowed" : "text-[#333333] dark:text-[#F5EDE0] hover:bg-[#FAF6EE] dark:hover:bg-[#2E1A12]"}`}>
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}
