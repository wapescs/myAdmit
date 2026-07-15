"use client";

import { BookingCalendar } from "./BookingCalendar";
import { BookingTimeSlots } from "./BookingTimeSlots";
import { BookingSummaryCard } from "./BookingSummaryCard";
import { BookingConfirmation } from "./BookingConfirmation";
import { useBookingForm } from "@/hooks/useBookingForm";
import { serif } from "@/styles/typography";

export function BookingPage() {
  const { selDate, setSelDate, selTime, setSelTime, isSubmitted, submit } = useBookingForm();

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#FAF6EE] dark:bg-[#1A0E0A]">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8">
        <div className="mb-10">
          <div className="text-sm font-semibold text-[#8B2626] mb-2 uppercase tracking-wider">Expert Guidance</div>
          <h1 className="text-3xl lg:text-4xl font-bold text-[#333333] dark:text-[#F5EDE0] mb-2" style={serif}>Book a Counseling Session</h1>
          <p className="text-[#666666]">Connect with a certified education counselor over a free phone call</p>
        </div>

        {isSubmitted ? (
          <BookingConfirmation />
        ) : (
          <div className="max-w-2xl mx-auto space-y-5">
            <BookingCalendar selDate={selDate} onSelectDate={setSelDate} />
            <BookingTimeSlots selTime={selTime} onSelectTime={setSelTime} />
            <div className="bg-white dark:bg-[#241410] rounded-[24px] p-6 border border-[#E8DDD0] dark:border-white/8">
              <BookingSummaryCard selDate={selDate} selTime={selTime} onConfirm={submit} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
