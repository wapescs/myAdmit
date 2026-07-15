"use client";

import { AnimatePresence, motion } from "motion/react";
import { WizardStepPersonalInfo } from "./WizardStepPersonalInfo";
import { WizardStepEducation } from "./WizardStepEducation";
import { WizardStepBudgetCountry } from "./WizardStepBudgetCountry";
import { WizardStepEnglishScores } from "./WizardStepEnglishScores";
import { WizardStepCareerGoals } from "./WizardStepCareerGoals";
import { WizardStepReview } from "./WizardStepReview";

const STEPS = [
  WizardStepPersonalInfo,
  WizardStepEducation,
  WizardStepBudgetCountry,
  WizardStepEnglishScores,
  WizardStepCareerGoals,
  WizardStepReview,
];

export function WizardStepRenderer({ step }: { step: number }) {
  const StepComponent = STEPS[step - 1];

  return (
    <AnimatePresence mode="wait">
      <motion.div key={step} initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -22 }}
        className="bg-white dark:bg-[#241410] rounded-[24px] border border-[#E8DDD0] dark:border-white/8 p-7 shadow-sm">
        <StepComponent />
      </motion.div>
    </AnimatePresence>
  );
}
