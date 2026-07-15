"use client";

import Link from "next/link";
import { serif } from "@/styles/typography";

export function UniversityBookingCard({ universityShortName }: { universityShortName: string }) {
  return (
    <div className="bg-white dark:bg-[#241410] rounded-[24px] p-6 border border-[#E8DDD0] dark:border-white/8">
      <h3 className="font-bold text-[#333333] dark:text-[#F5EDE0] mb-3" style={serif}>Book Counseling</h3>
      <p className="text-sm text-[#666666] mb-4">Personalized {universityShortName} application guidance from certified counselors.</p>
      <Link href="/booking" className="w-full py-3 bg-[#8B2626] text-white font-bold rounded-xl hover:bg-[#6E1E1E] transition-all text-sm flex items-center justify-center">Book a Session</Link>
    </div>
  );
}
