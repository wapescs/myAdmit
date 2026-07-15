import type { ReactNode } from "react";

type BtnVariant = "primary" | "secondary" | "ghost";
type BtnSize = "sm" | "md" | "lg";

const sizes: Record<BtnSize, string> = {
  sm: "px-4 py-2 text-xs rounded-xl",
  md: "px-5 py-2.5 text-sm rounded-xl",
  lg: "px-7 py-3.5 text-base rounded-xl",
};

const variants: Record<BtnVariant, string> = {
  primary: "bg-[#8B2626] text-white hover:bg-[#6E1E1E] shadow-sm hover:shadow-md hover:-translate-y-px",
  secondary: "bg-white text-[#333333] border border-[#E8DDD0] hover:border-[#8B2626]/30 hover:bg-[#FAF6EE]",
  ghost: "text-[#666666] hover:text-[#333333] hover:bg-black/5",
};

export function Btn({
  children, variant = "primary", size = "md", className = "", onClick, disabled,
}: {
  children: ReactNode;
  variant?: BtnVariant;
  size?: BtnSize;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  const base = "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed";
  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
