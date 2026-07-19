"use client";

import { createRef, useMemo, useRef } from "react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { PROCESS_STEPS } from "@/constants/processSteps";
import { serif } from "@/styles/typography";

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hubAnchorRef = useRef<HTMLDivElement>(null);
  const stepAnchorRefs = useMemo(
    () => PROCESS_STEPS.map(() => createRef<HTMLDivElement>()),
    []
  );
  const mid = (PROCESS_STEPS.length - 1) / 2;

  return (
    <section className="relative overflow-hidden py-28">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-[#8B2626]/10 blur-[100px]" />
        <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-[#CFA56A]/15 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.4] dark:opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(139,38,38,0.15) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="max-w-[1280px] mx-auto px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="text-sm font-semibold text-[#8B2626] mb-2 uppercase tracking-wider">
            How It Works
          </div>
          <h2
            className="text-3xl lg:text-5xl font-bold text-[#333333] dark:text-[#F5EDE0]"
            style={serif}
          >
            Your Journey to Study Abroad
          </h2>
          <p className="text-[#666666] dark:text-neutral-400 mt-4 max-w-xl mx-auto text-base lg:text-lg">
            From your first profile to boarding your flight, we guide you through
            every milestone with AI and expert counselors.
          </p>
        </motion.div>

        <div
          ref={containerRef}
          className="relative flex flex-col gap-12 lg:grid lg:grid-cols-[360px_1fr] lg:items-center lg:gap-20"
        >
          {/* Hub card — the platform */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 mx-auto w-full max-w-sm lg:sticky lg:top-32"
          >
            <div className="absolute inset-0 -z-10 rounded-[32px] bg-gradient-to-br from-[#8B2626]/25 to-[#CFA56A]/25 blur-2xl" />

            <div className="relative overflow-hidden rounded-[32px] border border-[#E8DDD0]/80 bg-white/70 p-8 lg:p-10 shadow-xl backdrop-blur-2xl dark:border-white/10 dark:bg-[#241410]/70">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-[#8B2626]/15 to-[#D87D4A]/15 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-gradient-to-br from-[#CFA56A]/15 to-transparent blur-2xl" />

              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 300, damping: 12 }}
                  className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8B2626] to-[#D87D4A] shadow-lg shadow-[#8B2626]/30"
                >
                  <Sparkles size={26} className="text-white" aria-hidden="true" />
                </motion.div>

                <h3
                  style={serif}
                  className="mb-3 text-2xl lg:text-3xl font-bold text-[#2D2D2D] dark:text-[#FAF6EE]"
                >
                  AI Study Abroad Assistant
                </h3>

                <p className="leading-7 text-[#666666] dark:text-neutral-300">
                  Your complete study abroad journey, powered by AI and expert
                  counselors.
                </p>
              </div>

              {/* Beam anchor — right edge, vertical center */}
              <div
                ref={hubAnchorRef}
                className="absolute right-0 top-1/2 h-px w-px"
              />
            </div>
          </motion.div>

          {/* Journey step cards */}
          <div className="flex flex-col gap-5">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: 32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  whileHover={{ y: -6, scale: 1.015 }}
                  transition={{
                    opacity: { duration: 0.5, delay: i * 0.1 },
                    x: { duration: 0.5, delay: i * 0.1 },
                    y: { type: "spring", stiffness: 260, damping: 20 },
                    scale: { type: "spring", stiffness: 260, damping: 20 },
                  }}
                  className="group relative overflow-hidden rounded-2xl lg:rounded-3xl border border-[#E8DDD0]/80 bg-white/60 px-5 py-4 lg:px-6 lg:py-5 shadow-md backdrop-blur-xl transition-shadow duration-300 hover:shadow-xl hover:border-[#8B2626]/40 dark:border-white/10 dark:bg-[#241410]/60"
                >
                  {/* Gradient hover wash */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl lg:rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-r from-[#8B2626]/[0.06] via-transparent to-[#D87D4A]/[0.08]" />

                  {/* Border glow on hover */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl lg:rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ring-1 ring-inset ring-[#8B2626]/30" />

                  <div className="relative z-10 flex items-start gap-4">
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 300, damping: 12 }}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#8B2626]/10 to-[#D87D4A]/10 shadow-inner"
                    >
                      <Icon size={20} className="text-[#8B2626]" aria-hidden="true" />
                    </motion.div>

                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2.5">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#8B2626] to-[#D87D4A] text-[10px] font-bold text-white">
                          {step.step}
                        </span>
                        <h4
                          style={serif}
                          className="text-lg font-bold text-[#2D2D2D] dark:text-[#FAF6EE]"
                        >
                          {step.title}
                        </h4>
                      </div>
                      <p className="text-sm leading-6 text-[#666666] dark:text-neutral-300">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Beam anchor — left edge, vertical center */}
                  <div
                    ref={stepAnchorRefs[i]}
                    className="absolute left-0 top-1/2 h-px w-px"
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Animated curved connections — desktop only */}
          <div className="hidden lg:contents">
            {PROCESS_STEPS.map((step, i) => (
              <AnimatedBeam
                key={step.step}
                containerRef={containerRef}
                fromRef={hubAnchorRef}
                toRef={stepAnchorRefs[i]}
                curvature={(i - mid) * -40}
                duration={5}
                delay={i * 0.2}
                pathColor="#8B2626"
                pathOpacity={0.15}
                pathWidth={2}
                gradientStartColor="#8B2626"
                gradientStopColor="#CFA56A"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
