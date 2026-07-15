"use client";

import { motion } from "motion/react";
import { Calendar, CheckCircle, ExternalLink, Bookmark, Lock } from "lucide-react";
import { serif } from "@/styles/typography";
import type { Scholarship } from "@/types/scholarship.types";

export function ScholarshipCard({
  scholarship, saved, onToggleSave, isAnonymous, delay = 0,
}: {
  scholarship: Scholarship;
  saved: boolean;
  onToggleSave: () => void;
  isAnonymous: boolean;
  delay?: number;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
      className="bg-white dark:bg-[#241410] rounded-[20px] p-6 border border-[#E8DDD0] dark:border-white/8 hover:shadow-lg hover:-translate-y-1 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{scholarship.flag}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${scholarship.category === "Government" ? "bg-blue-50 text-blue-600" : scholarship.category === "Academic" ? "bg-purple-50 text-purple-600" : "bg-[#CFA56A]/10 text-[#CFA56A]"}`}>{scholarship.category}</span>
        </div>
        <button onClick={onToggleSave}
          className={`p-2 rounded-full transition-all ${saved ? "text-[#8B2626] bg-[#8B2626]/10" : "text-[#999] hover:bg-[#FAF6EE]"}`}>
          <Bookmark size={15} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
      <h3 className="font-bold text-[#333333] dark:text-[#F5EDE0] text-base mb-1" style={serif}>{scholarship.name}</h3>
      <div className="text-xl font-bold text-[#2E7D32] mb-3" style={serif}>{scholarship.amount}</div>
      <div className="space-y-1.5 mb-4">
        <div className="flex items-center gap-2 text-xs text-[#666666]">
          <Calendar size={11} className="text-[#CFA56A] flex-shrink-0" />
          Deadline: <span className="font-semibold text-[#333333] dark:text-[#F5EDE0]">{scholarship.deadline}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#666666]">
          <CheckCircle size={11} className="text-[#CFA56A] flex-shrink-0" />{scholarship.eligibility}
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {scholarship.coverage.map(c => (
          <span key={c} className="text-xs px-2 py-0.5 bg-[#FAF6EE] dark:bg-[#2E1A12] text-[#666666] rounded-md border border-[#E8DDD0]">{c}</span>
        ))}
      </div>
      <div className="flex gap-2">
        <button className="flex-1 py-2.5 text-xs font-bold text-white bg-[#8B2626] rounded-xl hover:bg-[#6E1E1E] transition-all">Apply Now</button>
        <button className="px-3 py-2.5 text-[#666666] border border-[#E8DDD0] rounded-xl hover:bg-[#FAF6EE] transition-all"><ExternalLink size={13} /></button>
      </div>
      {isAnonymous && (
        <div className="mt-2 flex items-center gap-1.5 text-xs text-[#999]"><Lock size={10} />Sign in to track this scholarship</div>
      )}
    </motion.div>
  );
}
