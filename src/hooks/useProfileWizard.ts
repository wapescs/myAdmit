"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserState } from "@/app/providers/UserStateProvider";

const TOTAL_STEPS = 6;

export function useProfileWizard() {
  const [step, setStep] = useState(1);
  const { setUserState } = useUserState();
  const router = useRouter();

  const goBack = () => setStep(s => Math.max(1, s - 1));

  const goNext = () => {
    if (step === TOTAL_STEPS) {
      setUserState("complete");
      router.push("/dashboard");
    } else {
      setStep(s => s + 1);
    }
  };

  return { step, totalSteps: TOTAL_STEPS, goBack, goNext };
}
