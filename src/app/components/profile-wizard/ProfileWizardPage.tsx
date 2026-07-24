"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/app/components/ui/dialog";
import { WizardProgressHeader } from "./WizardProgressHeader";
import { WizardStepRenderer } from "./WizardStepRenderer";
import { WizardNavigationFooter } from "./WizardNavigationFooter";
import { OptionalPhoneVerifyStep } from "@/app/components/access/OptionalPhoneVerifyStep";
import { useProfileWizard } from "@/hooks/useProfileWizard";
import { serif } from "@/styles/typography";

export function ProfileWizardPage() {
  const { step, totalSteps, goBack, goNext, isPhoneStepOpen, handlePhoneStepDone } = useProfileWizard();

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#FAF6EE] dark:bg-[#1A0E0A]">
      <div className="max-w-2xl mx-auto px-5">
        <WizardProgressHeader step={step} totalSteps={totalSteps} />
        <WizardStepRenderer step={step} />
        <WizardNavigationFooter step={step} totalSteps={totalSteps} onBack={goBack} onNext={goNext} />
      </div>

      <Dialog open={isPhoneStepOpen} onOpenChange={(open) => { if (!open) handlePhoneStepDone(); }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle style={serif}>One last thing</DialogTitle>
            <DialogDescription>Optional — verify your phone now, or do it later.</DialogDescription>
          </DialogHeader>
          <OptionalPhoneVerifyStep onDone={handlePhoneStepDone} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
