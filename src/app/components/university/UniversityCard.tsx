"use client";

import { motion } from "motion/react";
import { Heart, Globe } from "lucide-react";
import { UniversityInfoCard } from "./UniversityInfoCard";
import { UniversityLocationCard } from "./UniversityLocationCard";
import { UniversityRankingCard } from "./UniversityRankingCard";
import type { University } from "@/types/university";

export function UniversityCard({
  uni, saved, onSave, onView,
}: {
  uni: University;
  saved: boolean;
  onSave: () => void;
  onView: () => void;
}) {
  return (
    <motion.div
      onClick={onView}
      className="bg-white dark:bg-[#241410] rounded-[20px] overflow-hidden border border-[#E8DDD0] dark:border-white/8 group cursor-pointer"
      whileHover={{ y: -5, boxShadow: "0 24px 48px rgba(139,38,38,0.09)" }}
      transition={{ duration: 0.22 }}
    >
      <div className="relative h-44 overflow-hidden bg-[#EDE8DF]">
        {uni.image ? (
          <img src={uni.image} alt={uni.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-107" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Globe size={36} className="text-[#B8AC98]" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        {uni.ranking && (
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#8B2626] text-white text-[11px] font-bold rounded-lg">#{uni.ranking} World</div>
        )}
        <button onClick={e => { e.stopPropagation(); onSave(); }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all ${saved ? "bg-[#8B2626] text-white" : "bg-white/80 text-[#666666] hover:bg-white"}`}>
          <Heart size={13} fill={saved ? "currentColor" : "none"} />
        </button>
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white">
          {uni.flag && <span className="text-lg">{uni.flag}</span>}
          <span className="text-sm font-medium">{uni.country}</span>
        </div>
        {uni.scholarships && (
          <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-[#CFA56A] text-white text-[10px] font-semibold rounded-md">Scholarships</div>
        )}
      </div>
      <div className="p-5">
        <UniversityInfoCard uni={uni} />

        <div className="grid grid-cols-2 gap-2 my-4">
          <UniversityLocationCard uni={uni} />
          <UniversityRankingCard uni={uni} />
          {uni.tuition && (
            <div className="bg-[#FAF6EE] dark:bg-[#2E1A12] rounded-xl p-2.5">
              <div className="text-[10px] text-[#999] mb-0.5">Annual Tuition</div>
              <div className="text-xs font-bold text-[#333333] dark:text-[#F5EDE0]">{uni.tuition}</div>
            </div>
          )}
          {uni.acceptanceRate && (
            <div className="bg-[#FAF6EE] dark:bg-[#2E1A12] rounded-xl p-2.5">
              <div className="text-[10px] text-[#999] mb-0.5">Acceptance</div>
              <div className="text-xs font-bold text-[#333333] dark:text-[#F5EDE0]">{uni.acceptanceRate}</div>
            </div>
          )}
        </div>

        <button onClick={e => { e.stopPropagation(); onView(); }} className="w-full py-2.5 text-xs font-bold text-white bg-[#8B2626] rounded-xl hover:bg-[#6E1E1E] transition-all">View Details</button>
      </div>
    </motion.div>
  );
}
