"use client";

import Link from "next/link";
import { Bot } from "lucide-react";
import { serif } from "@/styles/typography";

export function UniversityAskAICard({ universityShortName }: { universityShortName: string }) {
  return (
    <div className="bg-gradient-to-br from-[#8B2626] to-[#5C1717] rounded-[24px] p-6 text-white">
      <div className="flex items-center gap-2.5 mb-3"><Bot size={18} /><h3 className="font-bold" style={serif}>Ask AI about {universityShortName}</h3></div>
      <p className="text-white/65 text-sm mb-4">Instant answers about programs, requirements, and your admission chances.</p>
      <Link href="/chat" className="w-full py-2.5 bg-white/15 border border-white/25 text-white font-semibold rounded-xl hover:bg-white/25 transition-all text-sm flex items-center justify-center">Start Chat</Link>
    </div>
  );
}
