import { MapPin } from "lucide-react";
import type { University } from "@/types/university";

/**
 * There's no separate city/state field in the data — only country and a
 * loose "campus location" string (e.g. "Adelaide, Mawson Lakes"). This
 * shows whichever of those is actually present rather than fabricating a
 * city/state split the data doesn't have.
 */
export function UniversityLocationCard({ uni }: { uni: University }) {
  return (
    <div className="bg-[#FAF6EE] dark:bg-[#2E1A12] rounded-xl p-2.5">
      <div className="flex items-center gap-1 text-[10px] text-[#999] mb-0.5">
        <MapPin size={10} />
        Location
      </div>
      <div className="text-xs font-bold text-[#333333] dark:text-[#F5EDE0] line-clamp-1">
        {uni.campusLocations ?? uni.country}
      </div>
    </div>
  );
}
