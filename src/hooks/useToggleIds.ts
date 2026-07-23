"use client";

import { useState } from "react";

export function useToggleIds<T = number>(initial: T[] = []) {
  const [ids, setIds] = useState<T[]>(initial);

  const toggle = (id: T) => {
    setIds(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };

  return { ids, toggle };
}
