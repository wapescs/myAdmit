"use client";

import { createRef, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { Award, Bot, CheckCircle2, Search, Shield, UserCheck } from "lucide-react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { BorderBeam } from "@/components/ui/border-beam";
import { DotPattern } from "@/components/ui/dot-pattern";
import { GridPattern } from "@/components/ui/grid-pattern";
import { NumberTicker } from "@/components/ui/number-ticker";
import { TypingText } from "@/components/ui/typing-text";
import { serif } from "@/styles/typography";

const QUESTION = "What universities should I apply to with 85% marks and 7.0 IELTS?";
const ANSWER =
  "Based on your profile, I recommend University of Toronto (safe), University of Melbourne (match), and University of Edinburgh (reach)...";

const WORKFLOW_STEPS = [
  { label: "Profile analysis", icon: UserCheck },
  { label: "Searching universities", icon: Search },
  { label: "Finding scholarships", icon: Award },
  { label: "Checking visa requirements", icon: Shield },
];

// Loop: reset -> thinking -> 4 workflow steps -> generating -> answer -> repeat.
const PHASE_DURATIONS = [600, 1400, 900, 900, 900, 900, 1100, 4600];
const THINKING = 1;
const FIRST_STEP = 2;
const LAST_STEP = 5;
const GENERATING = 6;
const ANSWER_PHASE = 7;

function useWorkflowCycle() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const timer = setTimeout(
      () => setPhase((p) => (p + 1) % PHASE_DURATIONS.length),
      PHASE_DURATIONS[phase],
    );
    return () => clearTimeout(timer);
  }, [phase]);
  return phase;
}

function TypingDots({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-current"
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
        />
      ))}
    </span>
  );
}

const PARTICLES = [
  { top: "12%", left: "18%", delay: 0 },
  { top: "22%", left: "78%", delay: 1.2 },
  { top: "58%", left: "8%", delay: 0.6 },
  { top: "72%", left: "88%", delay: 1.8 },
  { top: "85%", left: "40%", delay: 0.9 },
  { top: "40%", left: "94%", delay: 2.2 },
];

export function AIAdvisorShowcase() {
  const phase = useWorkflowCycle();
  const activeStep = phase >= FIRST_STEP && phase <= LAST_STEP ? phase - FIRST_STEP : -1;
  const isThinking = phase === THINKING;
  const isGenerating = phase === GENERATING;
  const showAnswer = phase === ANSWER_PHASE;

  const beamContainerRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const stepRefs = useMemo(() => WORKFLOW_STEPS.map(() => createRef<HTMLDivElement>()), []);

  return (
    <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
      <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] bg-gradient-to-br from-[#8B2626] to-[#5C1717] p-5 sm:p-8 text-white shadow-2xl">
        <BorderBeam size={120} duration={9} colorFrom="#F0D9A8" colorTo="#8B2626" />

        {/* Layered background: glow, streak, grid + dots, particles */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/3 rounded-full bg-[#F0D9A8]/20 blur-[80px]" />
          <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-[#CFA56A]/20 blur-2xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(255,255,255,0.07),transparent)]" />
          <GridPattern width={36} height={36} className="stroke-white/[0.06] opacity-70" />
          <DotPattern width={18} height={18} cr={1} className="fill-white/20 opacity-[0.08]" />
          <motion.div
            className="absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
            animate={{ x: ["-120%", "420%"] }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
          />
          {PARTICLES.map((p, i) => (
            <motion.span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-white/40"
              style={{ top: p.top, left: p.left }}
              animate={{ y: [0, -10, 0], opacity: [0.15, 0.6, 0.15] }}
              transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
            />
          ))}
        </div>

        <div className="relative">
          {/* Header — glowing orb */}
          <div className="mb-5 sm:mb-6 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="relative flex h-11 w-11 sm:h-14 sm:w-14 shrink-0 items-center justify-center">
                <motion.div
                  animate={{
                    scale: isThinking || isGenerating ? [1, 1.35, 1] : [1, 1.15, 1],
                    opacity: isThinking || isGenerating ? [0.6, 0.2, 0.6] : [0.5, 0.15, 0.5],
                  }}
                  transition={{ duration: isThinking || isGenerating ? 1.1 : 2.4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-2xl bg-white/50 blur-md"
                />
                <div ref={orbRef} className="relative flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25">
                  <Bot size={22} className="sm:hidden" />
                  <Bot size={28} className="hidden sm:block" />
                </div>
              </div>
              <h3 className="text-lg sm:text-2xl font-bold leading-tight" style={serif}>Your AI Admission Counselor</h3>
            </div>
            <span className="hidden shrink-0 items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white/80 sm:flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Live
            </span>
          </div>

          {/* Question — persistent anchor for the loop */}
          <div className="rounded-xl bg-white/10 p-3.5 text-sm">
            <div className="mb-1 text-xs text-white/50">You asked</div>
            <div>&quot;{QUESTION}&quot;</div>
          </div>

          {/* Live workflow */}
          <div ref={beamContainerRef} className="relative mt-3 space-y-3">
            <div className="flex min-h-[34px] items-center">
              {isThinking && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3.5 py-2.5 text-white/60"
                >
                  <TypingDots />
                  <span className="text-xs">MyAdmit AI is thinking</span>
                </motion.div>
              )}
              {isGenerating && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3.5 py-2.5 text-white/60"
                >
                  <TypingDots />
                  <span className="text-xs">Generating recommendation</span>
                </motion.div>
              )}
            </div>

            {/* Workflow chips */}
            <div className="flex flex-wrap gap-2">
              {WORKFLOW_STEPS.map((step, i) => {
                const status = i < activeStep || phase > LAST_STEP ? "done" : i === activeStep ? "active" : "pending";
                return (
                  <div
                    key={step.label}
                    ref={stepRefs[i]}
                    className={`flex items-center gap-1.5 rounded-full border py-1.5 pl-2.5 pr-3 text-xs font-medium backdrop-blur-sm transition-colors duration-300 ${
                      status === "active"
                        ? "border-[#CFA56A]/50 bg-white/20 text-white shadow-[0_0_16px_rgba(207,165,106,0.35)]"
                        : status === "done"
                          ? "border-emerald-400/25 bg-white/10 text-white/80"
                          : "border-white/10 bg-white/5 text-white/35"
                    }`}
                  >
                    {status === "active" ? (
                      <motion.span animate={{ rotate: 360 }} transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}>
                        <step.icon size={12} className="text-[#F0D9A8]" />
                      </motion.span>
                    ) : (
                      <step.icon size={12} className={status === "done" ? "text-emerald-300" : "text-white/40"} />
                    )}
                    {step.label}
                    {status === "done" && <CheckCircle2 size={12} className="text-emerald-400" />}
                  </div>
                );
              })}
            </div>

            {activeStep >= 0 && (
              <AnimatedBeam
                containerRef={beamContainerRef}
                fromRef={orbRef}
                toRef={stepRefs[activeStep]}
                curvature={-30}
                duration={1.1}
                pathWidth={1.5}
                pathColor="#F5EDE0"
                pathOpacity={0.14}
                gradientStartColor="#F0D9A8"
                gradientStopColor="#8B2626"
              />
            )}

            {/* Answer */}
            <div className={`min-h-[76px] rounded-xl p-3.5 text-sm transition-colors duration-300 ${showAnswer ? "bg-white text-[#333333]" : "bg-transparent"}`}>
              {showAnswer && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="mb-1 text-xs font-bold text-[#8B2626]">MyAdmit AI</div>
                  <TypingText text={ANSWER} active={showAnswer} />
                </motion.div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center gap-3 border-t border-white/15 pt-5">
            <div className="flex -space-x-2">
              {["🧑", "👩", "👨"].map((e, i) => (
                <div key={i} className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#8B2626] bg-[#CFA56A] text-xs">{e}</div>
              ))}
            </div>
            <div className="text-sm text-white/70">
              <NumberTicker value={10000} className="font-semibold text-white" />+ students counseled
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
