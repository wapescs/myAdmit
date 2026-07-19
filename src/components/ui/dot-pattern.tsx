"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { SVGProps } from "react";

import { cn } from "@/lib/utils";

interface DotPatternProps extends SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  cr?: number;
  className?: string;
}

export function DotPattern({
  width = 20,
  height = 20,
  cr = 1,
  className,
  ...props
}: DotPatternProps) {
  const id = useId();
  const containerRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      width={dimensions.width}
      height={dimensions.height}
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
          x={-1}
          y={-1}
        >
          <circle cx={1} cy={1} r={cr} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
