"use client";

import { useEffect, useState } from "react";

export function useScrollPosition(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, [threshold]);

  return scrolled;
}
