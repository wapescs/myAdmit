import { serif } from "@/styles/typography";
import type { University } from "@/types/university";

/**
 * Basic identity info for a university card. Real API records mostly only
 * have name/country/website/campus location — description is a mock-only
 * cosmetic field, so it's rendered only when present rather than showing a
 * placeholder for the ~90% of universities that don't have one.
 */
export function UniversityInfoCard({ uni }: { uni: University }) {
  return (
    <div>
      <h3 className="font-bold text-[#333333] dark:text-[#F5EDE0] text-base leading-snug mb-1 line-clamp-1" style={serif}>
        {uni.name}
      </h3>
      {uni.description && (
        <p className="text-[#666666] text-xs leading-relaxed line-clamp-2">{uni.description}</p>
      )}
    </div>
  );
}
