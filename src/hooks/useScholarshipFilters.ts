"use client";

import { useState } from "react";
import { SCHOLARSHIPS } from "@/constants/scholarships";
import { useToggleIds } from "./useToggleIds";

export function useScholarshipFilters() {
  const { ids: savedIds, toggle: toggleSaved } = useToggleIds([2, 5]);
  const [filterCountry, setFilterCountry] = useState("All");
  const [filterCat, setFilterCat] = useState("All");

  const filteredScholarships = SCHOLARSHIPS.filter(s =>
    (filterCountry === "All" || s.country === filterCountry) &&
    (filterCat === "All" || s.category === filterCat)
  );

  return { savedIds, toggleSaved, filterCountry, setFilterCountry, filterCat, setFilterCat, filteredScholarships };
}
