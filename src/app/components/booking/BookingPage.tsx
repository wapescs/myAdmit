"use client";

import { CounselorSelector } from "./CounselorSelector";
import { BookingCalendar } from "./BookingCalendar";
import { BookingTimeSlots } from "./BookingTimeSlots";
import { BookingSessionMode } from "./BookingSessionMode";
import { BookingSummaryCard } from "./BookingSummaryCard";
import { useBookingForm } from "@/hooks/useBookingForm";
import { COUNSELORS } from "@/constants/booking";
import { serif } from "@/styles/typography";

export function BookingPage() {
  const { selDate, setSelDate, selTime, setSelTime, selCounselor, setSelCounselor } = useBookingForm();

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#FAF6EE] dark:bg-[#1A0E0A]">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8">
        <div className="mb-10">
          <div className="text-sm font-semibold text-[#8B2626] mb-2 uppercase tracking-wider">Expert Guidance</div>
          <h1 className="text-3xl lg:text-4xl font-bold text-[#333333] dark:text-[#F5EDE0] mb-2" style={serif}>Book a Counseling Session</h1>
          <p className="text-[#666666]">Connect with certified education counselors for personalized guidance</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <CounselorSelector selectedIndex={selCounselor} onSelect={setSelCounselor} />
          <div className="lg:col-span-2 space-y-5">
            <BookingCalendar selDate={selDate} onSelectDate={setSelDate} />
            <BookingTimeSlots selTime={selTime} onSelectTime={setSelTime} />
            <div className="bg-white dark:bg-[#241410] rounded-[24px] p-6 border border-[#E8DDD0] dark:border-white/8">
              <BookingSessionMode />
              <BookingSummaryCard counselorName={COUNSELORS[selCounselor].name} selDate={selDate} selTime={selTime} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
