"use client";

import { UNIVERSITIES } from "@/constants/universities";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ComparisonUniversitySelector({
  selectedIndexes, onChangeSlot,
}: {
  selectedIndexes: number[];
  onChangeSlot: (slot: number, uniIndex: number) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {[0, 1, 2].map(slot => (
        <Select
          key={slot}
          value={selectedIndexes[slot]}
          onValueChange={(v) => onChangeSlot(slot, v as number)}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {UNIVERSITIES.map((u, i) => (
              <SelectItem key={u.id} value={i}>
                {u.shortName} — {u.country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}
    </div>
  );
}
