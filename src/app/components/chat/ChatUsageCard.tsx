"use client";

import { useUserState } from "@/app/providers/UserStateProvider";

export function ChatUsageCard({ dailyCount }: { dailyCount: number }) {
  const { userState } = useUserState();
  if (userState !== "logged-in") return null;

  return (
    <div className="mt-4 p-3 bg-[#FAF6EE] dark:bg-[#2E1A12] rounded-xl border border-[#E8DDD0]">
      <div className="flex justify-between text-xs mb-2">
        <span className="font-semibold text-[#333333] dark:text-[#F5EDE0]">Daily Questions</span>
        <span className="font-bold text-[#8B2626]">{dailyCount}/3</span>
      </div>
      <div className="h-1.5 bg-[#E8DDD0] rounded-full">
        <div className="h-full bg-[#8B2626] rounded-full transition-all" style={{ width: `${(dailyCount / 3) * 100}%` }} />
      </div>
      <div className="text-xs text-[#666666] mt-1.5">Upgrade for unlimited access</div>
    </div>
  );
}
