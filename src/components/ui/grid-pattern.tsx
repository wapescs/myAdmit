"use client";

import { useId } from "react";
import type { SVGProps } from "react";

import { cn } from "@/lib/utils";

interface GridPatternProps extends SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  className?: string;
}

export function GridPattern({ width = 40, height = 40, className, ...props }: GridPatternProps) {
  const id = useId();

  return (
    <svg aria-hidden="true" className={cn("pointer-events-none absolute inset-0 h-full w-full", className)} {...props}>
      <defs>
        <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse" x={-1} y={-1}>
          <path d={`M ${width} 0 L 0 0 0 ${height}`} fill="none" strokeWidth={1} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
    </svg>
  );
}
