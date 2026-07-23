"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, Heart, MapPin, Trophy, Globe, ExternalLink } from "lucide-react";
import { sans } from "@/styles/typography";
import type { UniversityDetail } from "@/types/university";

function StatChip({ icon: Icon, label, value }: { icon: typeof Trophy; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15">
      <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
        <Icon size={15} className="text-white/90" />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] text-white/50 uppercase tracking-wide">{label}</div>
        <div className="text-sm font-bold text-white truncate max-w-[160px]">{value}</div>
      </div>
    </div>
  );
}

export function ModernHero({
  university, saved, onToggleSave,
}: {
  university: UniversityDetail;
  saved: boolean;
  onToggleSave: () => void;
}) {
  const location = university.campusLocations ?? university.country;
  const websiteHref = university.websiteUrl
    ? (university.websiteUrl.startsWith("http") ? university.websiteUrl : `https://${university.websiteUrl}`)
    : null;

  const chips = [
    university.ranking && { icon: Trophy, label: "World Ranking", value: `#${university.ranking}` },
    university.tuition && { icon: Globe, label: "Annual Tuition", value: university.tuition },
    websiteHref && { icon: ExternalLink, label: "Website", value: university.websiteUrl! },
  ].filter((c): c is { icon: typeof Trophy; label: string; value: string } => Boolean(c));

  return (
    <div className="relative overflow-hidden bg-[#0B0A10] pt-28 pb-24 lg:pt-36 lg:pb-32">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-32 -left-20 w-[32rem] h-[32rem] rounded-full bg-[#8B2626] opacity-30 blur-[110px]"
          animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-10 right-0 w-[28rem] h-[28rem] rounded-full bg-[#CFA56A] opacity-20 blur-[110px]"
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 w-[26rem] h-[26rem] rounded-full bg-[#4A2E8C] opacity-20 blur-[110px]"
          animate={{ x: [0, 25, 0], y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:24px_24px]" />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <Link href={`/university/${university.id}`} className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors">
            <ArrowLeft size={15} /> Classic view
          </Link>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/80 text-xs font-semibold mb-6 backdrop-blur-xl">
            🎓 University Profile
          </span>

          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.05] mb-5 max-w-4xl"
            style={sans}
          >
            {university.name}
          </h1>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-white/70 mb-8">
            <span className="inline-flex items-center gap-1.5 text-sm">
              {university.flag && <span className="text-base">{university.flag}</span>}
              {university.country}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span className="inline-flex items-center gap-1.5 text-sm">
              <MapPin size={13} /> {location}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/booking"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#8B2626] to-[#C4443D] text-white font-bold text-sm shadow-lg shadow-[#8B2626]/30 hover:shadow-xl hover:shadow-[#8B2626]/40 hover:-translate-y-0.5 transition-all"
            >
              Apply Now
            </Link>
            <button
              onClick={onToggleSave}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl border font-semibold text-sm backdrop-blur-xl transition-all ${
                saved ? "bg-white text-[#0B0A10] border-white" : "bg-white/10 text-white border-white/20 hover:bg-white/15"
              }`}
            >
              <Heart size={15} fill={saved ? "currentColor" : "none"} />
              {saved ? "Saved" : "Save"}
            </button>
          </div>
        </motion.div>
      </div>

      {chips.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative max-w-[1280px] mx-auto px-5 lg:px-8 mt-12"
        >
          <div className="flex flex-wrap gap-3">
            {chips.map(chip => <StatChip key={chip.label} {...chip} />)}
          </div>
        </motion.div>
      )}
    </div>
  );
}
