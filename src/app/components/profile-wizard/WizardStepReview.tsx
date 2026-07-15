"use client";

import { CheckCircle, Sparkles } from "lucide-react";
import { serif } from "@/styles/typography";
import { WIZARD_STEP_LABELS } from "@/constants/profileWizard";

export function WizardStepReview() {
  return (
    <div>
      <h2 className="text-xl font-bold text-[#333333] dark:text-[#F5EDE0] mb-2" style={serif}>Profile Complete! 🎉</h2>
      <p className="text-[#666666] text-sm mb-6">Your profile is ready. Our AI will generate personalized recommendations.</p>
      <div className="space-y-2.5 mb-5">
        {WIZARD_STEP_LABELS.slice(0, 5).map(l => (
          <div key={l} className="flex items-center justify-between p-3.5 bg-[#FAF6EE] dark:bg-[#2E1A12] rounded-xl border border-[#E8DDD0] dark:border-white/8">
            <span className="text-sm font-medium text-[#333333] dark:text-[#F5EDE0]">{l}</span>
            <div className="flex items-center gap-1.5"><CheckCircle size={14} className="text-[#2E7D32]" /><span className="text-xs font-bold text-[#2E7D32]">Complete</span></div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-[#8B2626]/8 border border-[#8B2626]/20 rounded-xl">
        <div className="flex items-center gap-2 mb-1.5"><Sparkles size={15} className="text-[#8B2626]" /><span className="text-sm font-bold text-[#8B2626]">AI Analysis Ready</span></div>
        <p className="text-xs text-[#666666]">Based on your profile, we've identified 12 universities with an average 68% acceptance probability and $18K in scholarship opportunities.</p>
      </div>
    </div>
  );
}
