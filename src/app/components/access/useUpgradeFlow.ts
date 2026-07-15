"use client";

import { useState } from "react";
import { useAccess } from "@/lib/access/AccessProvider";

export type UpgradeStep = "phone" | "qualification";

// Isolates the step orchestration so "skip phone if already verified" is a
// single obvious conditional, not state scattered across components.
export function useUpgradeFlow() {
  const { profile } = useAccess();
  const [manualStep, setManualStep] = useState<UpgradeStep | null>(null);

  const step: UpgradeStep = manualStep ?? (profile.phoneVerified ? "qualification" : "phone");

  function goToQualification() {
    setManualStep("qualification");
  }

  function reset() {
    setManualStep(null);
  }

  return { step, goToQualification, reset };
}
