"use client";

import { useState } from "react";

export function useUniversityDetail() {
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState("Overview");

  return { saved, toggleSaved: () => setSaved(s => !s), tab, setTab };
}
