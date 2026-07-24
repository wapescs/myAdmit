"use client";

import { useEffect, useState } from "react";

/** Reveals `text` one character at a time while `active` is true; resets when it goes false. */
export function TypingText({
  text,
  active,
  speedMs = 16,
  className,
}: {
  text: string;
  active: boolean;
  speedMs?: number;
  className?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }
    if (count >= text.length) return;
    const timer = setTimeout(() => setCount((c) => c + 1), speedMs);
    return () => clearTimeout(timer);
  }, [active, count, text, speedMs]);

  return (
    <span className={className}>
      {text.slice(0, count)}
      {active && count < text.length && (
        <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-current align-middle" />
      )}
    </span>
  );
}
