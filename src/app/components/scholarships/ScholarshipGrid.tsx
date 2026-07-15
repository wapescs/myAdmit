"use client";

import { ScholarshipCard } from "./ScholarshipCard";
import type { Scholarship } from "@/types/scholarship.types";

export function ScholarshipGrid({
  scholarships, savedIds, onToggleSave, isAnonymous,
}: {
  scholarships: Scholarship[];
  savedIds: number[];
  onToggleSave: (id: number) => void;
  isAnonymous: boolean;
}) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {scholarships.map((s, i) => (
        <ScholarshipCard
          key={s.id}
          scholarship={s}
          saved={savedIds.includes(s.id)}
          onToggleSave={() => onToggleSave(s.id)}
          isAnonymous={isAnonymous}
          delay={i * 0.07}
        />
      ))}
    </div>
  );
}
