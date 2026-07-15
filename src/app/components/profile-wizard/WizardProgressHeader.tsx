"use client";

import { serif } from "@/styles/typography";
import { WIZARD_STEP_LABELS } from "@/constants/profileWizard";

export function WizardProgressHeader({ step, totalSteps }: { step: number; totalSteps: number }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-2xl font-bold text-[#333333] dark:text-[#F5EDE0]" style={serif}>Complete Your Profile</h1>
        <span className="text-sm text-[#666666]">Step {step} of {totalSteps}</span>
      </div>
      <div className="flex gap-1.5 mb-4">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div key={i} className={`h-2 flex-1 rounded-full transition-all duration-300 ${i < step ? "bg-[#8B2626]" : "bg-[#E8DDD0]"}`} />
        ))}
      </div>
      <div className="flex gap-2 flex-wrap">
        {WIZARD_STEP_LABELS.map((l, i) => (
          <span key={l} className={`text-xs px-2.5 py-1 rounded-full font-medium ${i + 1 === step ? "bg-[#8B2626] text-white" : i + 1 < step ? "bg-[#2E7D32]/10 text-[#2E7D32]" : "bg-[#E8DDD0] text-[#666666]"}`}>
            {i + 1 < step ? "✓ " : ""}{l}
          </span>
        ))}
      </div>
    </div>
  );
}
