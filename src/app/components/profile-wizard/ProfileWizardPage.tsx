"use client";

import { WizardProgressHeader } from "./WizardProgressHeader";
import { WizardStepRenderer } from "./WizardStepRenderer";
import { WizardNavigationFooter } from "./WizardNavigationFooter";
import { useProfileWizard } from "@/hooks/useProfileWizard";

export function ProfileWizardPage() {
  const { step, totalSteps, goBack, goNext } = useProfileWizard();

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#FAF6EE] dark:bg-[#1A0E0A]">
      <div className="max-w-2xl mx-auto px-5">
        <WizardProgressHeader step={step} totalSteps={totalSteps} />
        <WizardStepRenderer step={step} />
        <WizardNavigationFooter step={step} totalSteps={totalSteps} onBack={goBack} onNext={goNext} />
      </div>
    </div>
  );
}
