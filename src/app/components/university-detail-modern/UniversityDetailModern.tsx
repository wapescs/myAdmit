"use client";

import { motion } from "motion/react";
import { AlertCircle } from "lucide-react";
import { ModernHero } from "./ModernHero";
import { ModernBentoGrid } from "./ModernBentoGrid";
import { Alert, AlertTitle, AlertDescription } from "@/app/components/ui/alert";
import { useUniversityDetail } from "@/hooks/useUniversityDetail";
import { useUniversity } from "@/hooks/useUniversity";

function ShimmerTile({ className = "" }: { className?: string }) {
  return <div className={`rounded-[28px] bg-[#1F1310]/60 animate-pulse ${className}`} />;
}

export function UniversityDetailModern({ id }: { id: string }) {
  const { saved, toggleSaved } = useUniversityDetail();
  const { university, isLoading, error, refetch } = useUniversity(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B0A10]">
        <div className="pt-28 pb-24 lg:pt-36 lg:pb-32 max-w-[1280px] mx-auto px-5 lg:px-8">
          <div className="h-6 w-40 bg-white/10 rounded-full animate-pulse mb-10" />
          <div className="h-8 w-48 bg-white/10 rounded-full animate-pulse mb-6" />
          <div className="h-16 w-3/4 bg-white/10 rounded-2xl animate-pulse mb-4" />
          <div className="h-16 w-1/2 bg-white/10 rounded-2xl animate-pulse mb-8" />
          <div className="flex gap-3">
            <div className="h-12 w-32 bg-white/10 rounded-2xl animate-pulse" />
            <div className="h-12 w-28 bg-white/10 rounded-2xl animate-pulse" />
          </div>
        </div>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-8 -mt-10 lg:-mt-14 relative pb-24">
          <div className="grid md:grid-cols-2 gap-5">
            <ShimmerTile className="h-40 md:col-span-2" />
            <ShimmerTile className="h-56" />
            <ShimmerTile className="h-56" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !university) {
    return (
      <div className="min-h-screen bg-[#0B0A10] flex items-center justify-center px-5">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Alert variant="destructive" className="max-w-md bg-white/5 border-white/10 backdrop-blur-xl">
            <AlertCircle className="text-white" />
            <AlertTitle className="text-white">Couldn&apos;t load this university</AlertTitle>
            <AlertDescription className="text-white/60">
              <p>{error ?? "University not found."}</p>
              <button onClick={refetch} className="mt-2 text-sm font-semibold underline text-white">
                Try again
              </button>
            </AlertDescription>
          </Alert>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6EE] dark:bg-[#1A0E0A]">
      <ModernHero university={university} saved={saved} onToggleSave={toggleSaved} />
      <ModernBentoGrid university={university} />
    </div>
  );
}
