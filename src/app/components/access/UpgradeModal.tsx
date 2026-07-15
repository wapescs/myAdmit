"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/app/components/ui/dialog";
import { useAccess } from "@/lib/access/AccessProvider";
import { useUpgradeFlow } from "./useUpgradeFlow";
import { UpgradeStepPhone } from "./UpgradeStepPhone";
import { UpgradeStepQualification } from "./UpgradeStepQualification";
import { serif } from "@/styles/typography";

export function UpgradeModal() {
  const { isUpgradeModalOpen, closeUpgradeModal } = useAccess();
  const { step, goToQualification, reset } = useUpgradeFlow();

  function handleOpenChange(open: boolean) {
    if (!open) {
      closeUpgradeModal();
      reset();
    }
  }

  return (
    <Dialog open={isUpgradeModalOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle style={serif}>{step === "phone" ? "Verify Your Phone" : "A Few Qualification Details"}</DialogTitle>
          <DialogDescription>
            {step === "phone"
              ? "Step 1 of 2 — required to unlock AI Advisor and Counseling."
              : "Step 2 of 2 — this powers your eligibility insights."}
          </DialogDescription>
        </DialogHeader>

        {step === "phone" && <UpgradeStepPhone onVerified={goToQualification} />}
        {step === "qualification" && <UpgradeStepQualification onComplete={() => handleOpenChange(false)} />}
      </DialogContent>
    </Dialog>
  );
}
