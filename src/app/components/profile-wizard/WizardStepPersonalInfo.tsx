"use client";

import { serif } from "@/styles/typography";
import { WizardFormField } from "./WizardFormField";
import { PERSONAL_INFO_FIELDS } from "@/constants/profileWizard";

const INPUT_CLASS = "w-full px-4 py-3 bg-[#FAF6EE] dark:bg-[#2E1A12] border border-[#E8DDD0] dark:border-white/10 rounded-xl text-sm text-[#333333] dark:text-[#F5EDE0] focus:outline-none focus:border-[#8B2626]/50 focus:ring-2 focus:ring-[#8B2626]/8 transition-all";

export function WizardStepPersonalInfo() {
  return (
    <div>
      <h2 className="text-xl font-bold text-[#333333] dark:text-[#F5EDE0] mb-5" style={serif}>Personal Information</h2>
      <div className="grid grid-cols-2 gap-4">
        {PERSONAL_INFO_FIELDS.map(([label, value], i) => (
          <WizardFormField
            key={label}
            label={label}
            defaultValue={value}
            inputClassName={INPUT_CLASS}
            wrapperClassName={i >= 2 ? "col-span-2 md:col-span-1" : ""}
          />
        ))}
      </div>
    </div>
  );
}
