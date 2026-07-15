"use client";

import { useState } from "react";
import { UNIVERSITIES } from "@/constants/universities";

export function useComparisonSelection() {
  const [selectedIndexes, setSelectedIndexes] = useState([0, 1, 2]);

  const updateSlot = (slot: number, uniIndex: number) => {
    setSelectedIndexes(prev => {
      const next = [...prev];
      next[slot] = uniIndex;
      return next;
    });
  };

  const selectedUniversities = selectedIndexes.map(i => UNIVERSITIES[i]);

  return { selectedIndexes, updateSlot, selectedUniversities };
}
