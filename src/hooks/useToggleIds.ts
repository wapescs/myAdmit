"use client";

import { useState } from "react";

export function useToggleIds(initial: number[] = []) {
  const [ids, setIds] = useState<number[]>(initial);

  const toggle = (id: number) => {
    setIds(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };

  return { ids, toggle };
}
