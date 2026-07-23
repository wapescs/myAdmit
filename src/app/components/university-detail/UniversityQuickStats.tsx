"use client";

import { DollarSign, TrendingUp, BookOpen, Award } from "lucide-react";
import type { UniversityDetail } from "@/types/university";

export function UniversityQuickStats({ university }: { university: UniversityDetail }) {
  const stats = [
    { label: "Annual Tuition", value: university.tuition ?? "Not available", icon: DollarSign },
    { label: "Acceptance Rate", value: university.acceptanceRate ?? "Not available", icon: TrendingUp },
    { label: "IELTS Required", value: university.ieltsRequired ?? "Not available", icon: BookOpen },
    { label: "Scholarships", value: university.scholarships ? "Available" : "Not available", icon: Award },
  ];

  return (
    <div className="bg-white dark:bg-[#241410] border-b border-[#E8DDD0] dark:border-white/8">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8 py-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(s => (
            <div key={s.label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#8B2626]/10 flex items-center justify-center"><s.icon size={17} className="text-[#8B2626]" /></div>
              <div><div className="text-xs text-[#666666]">{s.label}</div><div className="font-bold text-[#333333] dark:text-[#F5EDE0] text-sm">{s.value}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
