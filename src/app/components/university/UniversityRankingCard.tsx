import { Trophy } from "lucide-react";
import type { University } from "@/types/university";

/**
 * Ranking source/year aren't fields this app's data has anywhere (real API
 * records have no ranking data at all; the mock cosmetic match only ever
 * carries a bare number) — rendering fabricated source/year text would
 * violate "don't display undefined values" just as much as showing
 * "undefined" would. Renders nothing when there's no ranking to show.
 */
export function UniversityRankingCard({ uni }: { uni: University }) {
  if (!uni.ranking) return null;

  return (
    <div className="bg-[#FAF6EE] dark:bg-[#2E1A12] rounded-xl p-2.5">
      <div className="flex items-center gap-1 text-[10px] text-[#999] mb-0.5">
        <Trophy size={10} />
        World Ranking
      </div>
      <div className="text-xs font-bold text-[#333333] dark:text-[#F5EDE0]">#{uni.ranking}</div>
    </div>
  );
}
