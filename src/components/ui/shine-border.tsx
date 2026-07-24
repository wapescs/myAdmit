"use client";

import type { CSSProperties } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

export function ShineBorder({
  borderWidth = 1,
  duration = 8,
  shineColor = "#CFA56A",
  className,
}: {
  borderWidth?: number;
  duration?: number;
  shineColor?: string;
  className?: string;
}) {
  return (
    <motion.div
      style={
        {
          "--border-width": `${borderWidth}px`,
          backgroundImage: `radial-gradient(transparent, transparent, ${shineColor}, transparent, transparent)`,
          backgroundSize: "300% 300%",
          WebkitMask: "linear-gradient(#000, #000) padding-box, linear-gradient(#000, #000)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "var(--border-width)",
        } as CSSProperties
      }
      className={cn("pointer-events-none absolute inset-0 size-full rounded-[inherit]", className)}
      animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
      transition={{ repeat: Infinity, repeatType: "mirror", duration, ease: "linear" }}
    />
  );
}
