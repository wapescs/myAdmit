"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserState } from "@/app/providers/UserStateProvider";
import { useAccess } from "@/lib/access/AccessProvider";

const TOTAL_STEPS = 6;

export function useProfileWizard() {
  const [step, setStep] = useState(1);
  const [isPhoneStepOpen, setPhoneStepOpen] = useState(false);
  const { userState, setUserState } = useUserState();
  const { profile } = useAccess();
  const router = useRouter();

  const goBack = () => setStep(s => Math.max(1, s - 1));

  // This wizard is only ever reached behind FeatureGate requires="email", so
  // userState here is never actually "anonymous" today — this guard is
  // defensive, not a real branch. Deliberately never sets "complete": that
  // tier is only earned via the real qualification flow (saveQualification),
  // not this generic wizard. See ACCESS_CONTROL.md §6 for the bug this fixes.
  function completeWizard() {
    if (userState === "anonymous") setUserState("logged-in");
    router.push("/dashboard");
  }

  const goNext = () => {
    if (step === TOTAL_STEPS) {
      if (profile.phoneVerified) {
        completeWizard();
      } else {
        setPhoneStepOpen(true);
      }
    } else {
      setStep(s => s + 1);
    }
  };

  function handlePhoneStepDone() {
    setPhoneStepOpen(false);
    completeWizard();
  }

  return { step, totalSteps: TOTAL_STEPS, goBack, goNext, isPhoneStepOpen, handlePhoneStepDone };
}
