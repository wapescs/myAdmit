"use client";

import { CounselorCard } from "./CounselorCard";
import { COUNSELORS } from "@/constants/booking";
import { serif } from "@/styles/typography";

export function CounselorSelector({
  selectedIndex, onSelect,
}: {
  selectedIndex: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div>
      <h2 className="font-bold text-[#333333] dark:text-[#F5EDE0] text-lg mb-4" style={serif}>Select Counselor</h2>
      <div className="space-y-3">
        {COUNSELORS.map((c, i) => (
          <CounselorCard key={c.name} counselor={c} selected={selectedIndex === i} onSelect={() => onSelect(i)} />
        ))}
      </div>
    </div>
  );
}
