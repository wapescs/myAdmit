"use client";

import { Heart, MapPin } from "lucide-react";
import { serif } from "@/styles/typography";
import { UNIVERSITY_DETAIL_LOCATION } from "@/constants/universityDetail";
import type { University } from "@/types/university.types";

export function UniversityDetailHero({
  university, saved, onToggleSave,
}: {
  university: University;
  saved: boolean;
  onToggleSave: () => void;
}) {
  return (
    <div className="relative h-72 md:h-96 overflow-hidden bg-[#333333]">
      <img src={university.image} alt={university.name} className="w-full h-full object-cover opacity-75" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
      <div className="absolute bottom-6 left-5 right-5 max-w-[1280px] mx-auto">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex gap-2 mb-3">
              <span className="px-3 py-1 bg-[#8B2626] text-white text-xs font-bold rounded-lg">#{university.ranking} World</span>
              <span className="px-3 py-1 bg-white/20 text-white text-xs rounded-lg backdrop-blur-sm">{university.flag} {university.country}</span>
              <span className="px-3 py-1 bg-white/20 text-white text-xs rounded-lg backdrop-blur-sm">{university.type}</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-white" style={serif}>{university.name}</h1>
            <p className="text-white/65 text-sm mt-1 flex items-center gap-1"><MapPin size={12} />{UNIVERSITY_DETAIL_LOCATION}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={onToggleSave} className={`p-3 rounded-xl backdrop-blur-sm transition-all ${saved ? "bg-[#8B2626] text-white" : "bg-white/20 text-white hover:bg-white/30"}`}>
              <Heart size={17} fill={saved ? "currentColor" : "none"} />
            </button>
            <button className="px-5 py-2.5 bg-[#8B2626] text-white font-bold rounded-xl hover:bg-[#6E1E1E] transition-all text-sm">Apply Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
