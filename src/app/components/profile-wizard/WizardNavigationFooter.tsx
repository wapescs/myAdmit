"use client";

import { ArrowRight } from "lucide-react";

export function WizardNavigationFooter({
  step, totalSteps, onBack, onNext,
}: {
  step: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex gap-3 mt-5">
      {step > 1 && (
        <button onClick={onBack} className="px-6 py-3 border border-[#E8DDD0] text-[#333333] dark:text-[#F5EDE0] font-semibold rounded-xl hover:bg-white dark:hover:bg-[#241410] transition-all">Back</button>
      )}
      <button onClick={onNext}
        className="flex-1 py-3 bg-[#8B2626] text-white font-bold rounded-xl hover:bg-[#6E1E1E] transition-all flex items-center justify-center gap-2">
        {step === totalSteps ? "View My Recommendations" : "Continue"}
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
