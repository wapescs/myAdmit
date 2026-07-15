import type { University } from "@/types/university.types";

export const COMPARISON_ROWS: { label: string; getValue: (u: University) => string }[] = [
  { label: "Global Ranking", getValue: u => `#${u.ranking}` },
  { label: "Country", getValue: u => `${u.flag} ${u.country}` },
  { label: "Annual Tuition", getValue: u => u.tuition },
  { label: "Acceptance Rate", getValue: u => u.acceptanceRate },
  { label: "IELTS Required", getValue: u => u.ieltsRequired },
  { label: "Scholarships", getValue: u => (u.scholarships ? "✓ Available" : "✗ None") },
  { label: "University Type", getValue: u => u.type },
  { label: "Top Programs", getValue: u => u.programs.slice(0, 2).join(", ") },
];
