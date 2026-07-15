"use client";

import { ComparisonTableHeader } from "./ComparisonTableHeader";
import { ComparisonTableRow } from "./ComparisonTableRow";
import { ComparisonTableActions } from "./ComparisonTableActions";
import { COMPARISON_ROWS } from "@/constants/comparison";
import type { University } from "@/types/university.types";

export function ComparisonTable({ universities }: { universities: University[] }) {
  return (
    <div className="bg-white dark:bg-[#241410] rounded-[24px] border border-[#E8DDD0] dark:border-white/8 overflow-hidden shadow-sm">
      <ComparisonTableHeader universities={universities} />
      {COMPARISON_ROWS.map((row, i) => (
        <ComparisonTableRow key={row.label} label={row.label} getValue={row.getValue} universities={universities} index={i} />
      ))}
      <ComparisonTableActions universities={universities} />
    </div>
  );
}
