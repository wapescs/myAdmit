"use client";

import type { CSSProperties } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

export function BorderBeam({
  className,
  size = 140,
  duration = 8,
  delay = 0,
  colorFrom = "#8B2626",
  colorTo = "#CFA56A",
}: {
  className?: string;
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]">
      <motion.div
        className={cn(
          "absolute aspect-square bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent",
          className,
        )}
        style={
          {
            width: size,
            offsetPath: `rect(0 auto auto 0 round ${size}px)`,
            "--color-from": colorFrom,
            "--color-to": colorTo,
          } as CSSProperties
        }
        animate={{ offsetDistance: ["0%", "100%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration, delay: -delay }}
      />
    </div>
  );
}
