"use client";

import { serif } from "@/styles/typography";
import { BUDGET_OPTIONS } from "@/constants/profileWizard";
import { COUNTRIES } from "@/constants/countries";

export function WizardStepBudgetCountry() {
  return (
    <div>
      <h2 className="text-xl font-bold text-[#333333] dark:text-[#F5EDE0] mb-5" style={serif}>Budget & Preferences</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-[#333333] dark:text-[#F5EDE0] mb-2">Annual Budget</label>
          <div className="grid grid-cols-3 gap-2">
            {BUDGET_OPTIONS.map((b, i) => (
              <button key={b} className={`py-2.5 text-xs rounded-xl border font-semibold transition-all ${i === 0 ? "border-[#8B2626] bg-[#8B2626]/8 text-[#8B2626]" : "border-[#E8DDD0] text-[#666666] hover:border-[#8B2626]/40"}`}>{b}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-[#333333] dark:text-[#F5EDE0] mb-2">Preferred Countries</label>
          <div className="grid grid-cols-4 gap-2">
            {COUNTRIES.map((c, i) => (
              <button key={c.name} className={`flex flex-col items-center gap-1 py-3 text-xs border-2 rounded-xl transition-all ${i === 0 ? "border-[#8B2626] bg-[#8B2626]/5" : "border-[#E8DDD0] hover:border-[#8B2626]/40"}`}>
                <span className="text-xl">{c.flag}</span><span className="font-medium">{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
