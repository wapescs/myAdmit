"use client";

import { ProcessStepItem } from "./ProcessStepItem";
import { PROCESS_STEPS } from "@/constants/processSteps";
import { serif } from "@/styles/typography";

export function ProcessSection() {
  return (
    <section className="py-24">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-sm font-semibold text-[#8B2626] mb-2 uppercase tracking-wider">How It Works</div>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#333333] dark:text-[#F5EDE0]" style={serif}>Your Journey to Studying Abroad</h2>
          <p className="text-[#666666] mt-3 max-w-lg mx-auto">From profile creation to landing abroad — we guide you through every step</p>
        </div>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#8B2626] via-[#CFA56A] to-[#8B2626]/20" />
          <div className="space-y-6">
            {PROCESS_STEPS.map((step, i) => (
              <ProcessStepItem key={step.step} step={step} delay={i * 0.09} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
