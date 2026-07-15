"use client";

import Link from "next/link";
import { useUserState } from "@/app/providers/UserStateProvider";

export function DashboardProfileProgress() {
  const { userState } = useUserState();
  if (userState === "complete") return null;

  return (
    <div className="mb-4 mx-3 p-3 bg-[#FAF6EE] dark:bg-[#2E1A12] rounded-xl border border-[#E8DDD0]">
      <div className="flex justify-between text-xs mb-1.5">
        <span className="font-semibold text-[#333333] dark:text-[#F5EDE0]">Profile</span>
        <span className="font-bold text-[#8B2626]">60%</span>
      </div>
      <div className="h-1.5 bg-[#E8DDD0] rounded-full mb-2"><div className="h-full bg-[#8B2626] rounded-full w-[60%]" /></div>
      <Link href="/profile" className="text-xs text-[#8B2626] font-semibold">Complete profile →</Link>
    </div>
  );
}
