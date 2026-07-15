import type { ReactNode } from "react";

type PillVariant = "crimson" | "gold" | "green" | "muted";

const styles: Record<PillVariant, string> = {
  crimson: "bg-[#8B2626]/8 text-[#8B2626] border-[#8B2626]/20",
  gold: "bg-[#CFA56A]/10 text-[#CFA56A] border-[#CFA56A]/20",
  green: "bg-[#2E7D32]/10 text-[#2E7D32] border-[#2E7D32]/20",
  muted: "bg-[#EDE8DF] text-[#666666] border-[#E8DDD0]",
};

export function Pill({ children, variant = "crimson" }: { children: ReactNode; variant?: PillVariant }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${styles[variant]}`}>
      {children}
    </span>
  );
}
