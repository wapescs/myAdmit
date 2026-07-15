"use client";

import { serif } from "@/styles/typography";
import { WizardFormField } from "./WizardFormField";
import { EDUCATION_FIELDS } from "@/constants/profileWizard";

const INPUT_CLASS = "w-full px-4 py-3 bg-[#FAF6EE] dark:bg-[#2E1A12] border border-[#E8DDD0] dark:border-white/10 rounded-xl text-sm text-[#333333] dark:text-[#F5EDE0] focus:outline-none focus:border-[#8B2626]/50 transition-all";

export function WizardStepEducation() {
  return (
    <div>
      <h2 className="text-xl font-bold text-[#333333] dark:text-[#F5EDE0] mb-5" style={serif}>Educational Background</h2>
      <div className="space-y-4">
        {EDUCATION_FIELDS.map(([label, value]) => (
          <WizardFormField key={label} label={label} defaultValue={value} inputClassName={INPUT_CLASS} />
        ))}
      </div>
    </div>
  );
}
