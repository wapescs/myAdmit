"use client";

import { User } from "lucide-react";
import { useUserState } from "@/app/providers/UserStateProvider";

export function DashboardProfileSummary() {
  const { userState } = useUserState();

  return (
    <div className="flex items-center gap-3 px-3 mb-5">
      <div className="w-10 h-10 rounded-full bg-[#8B2626] flex items-center justify-center"><User size={17} className="text-white" /></div>
      <div>
        <div className="font-bold text-sm text-[#333333] dark:text-[#F5EDE0]">Arjun Mehta</div>
        <div className="text-xs text-[#666666]">{userState === "complete" ? "Profile Complete ✓" : "Profile Incomplete"}</div>
      </div>
    </div>
  );
}
