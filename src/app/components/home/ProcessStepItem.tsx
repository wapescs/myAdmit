"use client";

import { motion } from "motion/react";
import { serif } from "@/styles/typography";
import type { ProcessStep } from "@/types/process.types";

export function ProcessStepItem({ step, delay = 0 }: { step: ProcessStep; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay }}
      className="flex gap-5 relative pl-14">
      <div className="absolute left-0 w-12 h-12 rounded-full bg-[#8B2626] flex items-center justify-center text-white font-bold text-sm shadow-lg ring-4 ring-[#FAF6EE] dark:ring-[#1A0E0A]">
        {step.step}
      </div>
      <div className="flex-1 bg-white dark:bg-[#241410] rounded-[20px] p-5 border border-[#E8DDD0] dark:border-white/8 hover:border-[#8B2626]/30 hover:shadow-md transition-all">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-lg bg-[#8B2626]/10 flex items-center justify-center"><step.icon size={14} className="text-[#8B2626]" /></div>
          <h3 className="font-bold text-[#333333] dark:text-[#F5EDE0]" style={serif}>{step.title}</h3>
        </div>
        <p className="text-[#666666] text-sm">{step.desc}</p>
      </div>
    </motion.div>
  );
}
