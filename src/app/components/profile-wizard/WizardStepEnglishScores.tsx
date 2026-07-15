"use client";

import { serif } from "@/styles/typography";
import { WizardFormField } from "./WizardFormField";
import { ENGLISH_TEST_TYPES, ENGLISH_SCORE_FIELDS } from "@/constants/profileWizard";

const INPUT_CLASS = "w-full px-4 py-3 bg-[#FAF6EE] dark:bg-[#2E1A12] border border-[#E8DDD0] dark:border-white/10 rounded-xl text-sm focus:outline-none focus:border-[#8B2626]/50 transition-all";

export function WizardStepEnglishScores() {
  return (
    <div>
      <h2 className="text-xl font-bold text-[#333333] dark:text-[#F5EDE0] mb-5" style={serif}>English Proficiency</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-[#333333] dark:text-[#F5EDE0] mb-1.5">Test Type</label>
          <select className="w-full px-4 py-3 bg-[#FAF6EE] dark:bg-[#2E1A12] border border-[#E8DDD0] dark:border-white/10 rounded-xl text-sm focus:outline-none">
            {ENGLISH_TEST_TYPES.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {ENGLISH_SCORE_FIELDS.map(([label, value]) => (
            <WizardFormField key={label} label={label} defaultValue={value} inputClassName={INPUT_CLASS} />
          ))}
        </div>
      </div>
    </div>
  );
}
