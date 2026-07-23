"use client";

import Link from "next/link";
import { Heart, MapPin, Globe, Sparkles } from "lucide-react";
import { serif } from "@/styles/typography";
import type { UniversityDetail } from "@/types/university";

export function UniversityDetailHero({
  university, saved, onToggleSave,
}: {
  university: UniversityDetail;
  saved: boolean;
  onToggleSave: () => void;
}) {
  const location = university.campusLocations ?? university.country;

  return (
    <div className="relative h-72 md:h-96 overflow-hidden bg-[#333333]">
      {university.image ? (
        <img src={university.image} alt={university.name} className="w-full h-full object-cover opacity-75" />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-[#333333]">
          <Globe size={48} className="text-white/30" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
      <div className="absolute top-4 right-4 md:top-6 md:right-6">
        <Link
          href={`/university/${university.id}/modern`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white text-xs font-semibold hover:bg-white/25 transition-all"
        >
          <Sparkles size={12} /> Try new design
        </Link>
      </div>
      <div className="absolute bottom-6 left-5 right-5 max-w-[1280px] mx-auto">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex gap-2 mb-3">
              {university.ranking && (
                <span className="px-3 py-1 bg-[#8B2626] text-white text-xs font-bold rounded-lg">#{university.ranking} World</span>
              )}
              <span className="px-3 py-1 bg-white/20 text-white text-xs rounded-lg backdrop-blur-sm">{university.flag} {university.country}</span>
              {university.type && (
                <span className="px-3 py-1 bg-white/20 text-white text-xs rounded-lg backdrop-blur-sm">{university.type}</span>
              )}
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-white" style={serif}>{university.name}</h1>
            <p className="text-white/65 text-sm mt-1 flex items-center gap-1"><MapPin size={12} />{location}</p>
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
