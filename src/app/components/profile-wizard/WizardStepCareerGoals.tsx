"use client";

import { serif } from "@/styles/typography";
import { TARGET_INTAKE_OPTIONS, CAREER_OBJECTIVE_DEFAULT, WORK_EXPERIENCE_DEFAULT } from "@/constants/profileWizard";

export function WizardStepCareerGoals() {
  return (
    <div>
      <h2 className="text-xl font-bold text-[#333333] dark:text-[#F5EDE0] mb-5" style={serif}>Career Goals</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-[#333333] dark:text-[#F5EDE0] mb-1.5">Career Objective</label>
          <textarea rows={4} defaultValue={CAREER_OBJECTIVE_DEFAULT}
            className="w-full px-4 py-3 bg-[#FAF6EE] dark:bg-[#2E1A12] border border-[#E8DDD0] dark:border-white/10 rounded-xl text-sm focus:outline-none focus:border-[#8B2626]/50 transition-all resize-none" />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#333333] dark:text-[#F5EDE0] mb-1.5">Work Experience</label>
          <input defaultValue={WORK_EXPERIENCE_DEFAULT} className="w-full px-4 py-3 bg-[#FAF6EE] dark:bg-[#2E1A12] border border-[#E8DDD0] dark:border-white/10 rounded-xl text-sm focus:outline-none focus:border-[#8B2626]/50 transition-all" />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#333333] dark:text-[#F5EDE0] mb-2">Target Intake</label>
          <div className="grid grid-cols-3 gap-2">
            {TARGET_INTAKE_OPTIONS.map((t, i) => (
              <button key={t} className={`py-2.5 text-sm rounded-xl border-2 font-semibold transition-all ${i === 0 ? "border-[#8B2626] bg-[#8B2626]/8 text-[#8B2626]" : "border-[#E8DDD0] text-[#666666] hover:border-[#8B2626]/40"}`}>{t}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
