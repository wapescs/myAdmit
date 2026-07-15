"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useUserState } from "@/app/providers/UserStateProvider";
import { serif } from "@/styles/typography";

export function DashboardAIBanner() {
  const { userState } = useUserState();

  return (
    <div className="bg-gradient-to-r from-[#8B2626] to-[#5C1717] rounded-[24px] p-6 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center flex-shrink-0"><Sparkles size={22} /></div>
        <div>
          <div className="font-bold text-base" style={serif}>{userState === "complete" ? "8 new AI recommendations ready" : "Complete your profile for AI recommendations"}</div>
          <div className="text-white/65 text-sm">Personalized university matches based on your profile</div>
        </div>
      </div>
      <Link href="/chat" className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 bg-white text-[#8B2626] text-sm font-bold rounded-xl hover:bg-[#FAF6EE] transition-all">
        View <ArrowRight size={14} />
      </Link>
    </div>
  );
}
