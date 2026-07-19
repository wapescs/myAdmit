"use client";

import { motion } from "motion/react";
import { serif } from "@/styles/typography";
import type { ProcessStep } from "@/types/process.types";

export function ProcessStepItem({
  step,
  delay = 0,
}: {
  step: ProcessStep;
  delay?: number;
}) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative flex gap-5 lg:gap-7"
    >
      {/* Step Circle */}
      <motion.div
        whileHover={{ scale: 1.12, rotate: 6 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="relative z-10 flex h-14 w-14 lg:h-16 lg:w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#8B2626] to-[#D87D4A] text-white shadow-xl ring-[6px] ring-[#FAF6EE] dark:ring-[#1A0E0A]"
      >
        <span className="text-base lg:text-lg font-bold" style={serif}>
          {step.step}
        </span>

        {/* Glow */}
        <div className="absolute inset-0 -z-10 rounded-full bg-[#8B2626]/40 blur-xl" />
      </motion.div>

      {/* Card */}
      <motion.div
        whileHover={{ y: -8, scale: 1.015 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="group relative flex-1 mb-2 overflow-hidden rounded-[28px] border border-[#E8DDD0]/80 bg-white/60 p-6 lg:p-8 shadow-md backdrop-blur-2xl transition-shadow duration-300 hover:shadow-2xl hover:border-[#8B2626]/40 dark:border-white/10 dark:bg-[#241410]/60"
      >
        {/* Border glow on hover */}
        <div className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 ring-1 ring-inset ring-[#8B2626]/30" />

        {/* Gradient hover wash */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-[#8B2626]/[0.06] via-transparent to-[#D87D4A]/[0.08]" />

        {/* Decorative gradient blob */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-[#8B2626]/10 to-[#CFA56A]/10 blur-2xl transition-transform duration-500 group-hover:scale-125" />

        <div className="relative z-10 flex items-start gap-5">
          {/* Icon */}
          <motion.div
            whileHover={{ rotate: 10, scale: 1.15 }}
            transition={{ type: "spring", stiffness: 300, damping: 12 }}
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8B2626]/10 to-[#D87D4A]/10 shadow-inner"
          >
            <Icon size={26} className="text-[#8B2626]" />
          </motion.div>

          <div className="flex-1 pt-1">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#8B2626]/70 mb-1.5">
              Step {String(step.step).padStart(2, "0")}
            </div>
            <h3
              style={serif}
              className="mb-2 text-xl lg:text-2xl font-bold text-[#2D2D2D] dark:text-[#FAF6EE]"
            >
              {step.title}
            </h3>
            <p className="leading-7 text-[#666666] dark:text-neutral-300">
              {step.desc}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
