"use client";

import { createRef, useMemo, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  ArrowRight,
  Bot,
  FileText,
  GraduationCap,
  Home as HomeIcon,
  Lock,
  Shield,
  Sparkles,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Btn } from "@/app/components/common/Btn";
import { Pill } from "@/app/components/common/Pill";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { DotPattern } from "@/components/ui/dot-pattern";
import { NumberTicker } from "@/components/ui/number-ticker";
import { useUserState } from "@/app/providers/UserStateProvider";
import { useTheme } from "@/app/providers/ThemeProvider";
import { HERO_STATS } from "@/constants/home";
import { serif } from "@/styles/typography";
import { COLORS } from "@/styles/theme";

type HubNode = {
  label: string;
  icon: LucideIcon;
  /** Tailwind position classes within the 460px hub square (desktop only). */
  position: string;
  /** Curvature of this node's connecting beam back to the center. */
  curvature: number;
  floatDelay: number;
  floatDir: 1 | -1;
};

const HUB_NODES: HubNode[] = [
  { label: "Universities", icon: GraduationCap, position: "top-[4%] left-[2%]", curvature: 60, floatDelay: 0, floatDir: 1 },
  { label: "Scholarships", icon: Wallet, position: "top-0 right-0", curvature: -60, floatDelay: 0.6, floatDir: -1 },
  { label: "SOP Review", icon: FileText, position: "top-1/2 left-0 -translate-y-1/2", curvature: 30, floatDelay: 1.1, floatDir: 1 },
  { label: "AI Counselor", icon: Bot, position: "top-1/2 right-0 -translate-y-1/2", curvature: -30, floatDelay: 0.3, floatDir: -1 },
  { label: "Visa Guidance", icon: Shield, position: "bottom-[6%] left-[6%]", curvature: -50, floatDelay: 0.9, floatDir: 1 },
  { label: "Accommodation", icon: HomeIcon, position: "bottom-[2%] right-[2%]", curvature: 50, floatDelay: 1.4, floatDir: -1 },
];

/** "10K+" -> { number: 10, suffix: "K+" }, so the leading digits can count up while the label stays intact. */
function parseStat(value: string) {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return { number: 0, suffix: value };
  return { number: Number(match[1]), suffix: match[2] };
}

function HubCenterNode({ size }: { size: "sm" | "lg" }) {
  const box = size === "lg" ? "h-36 w-36" : "h-24 w-24";
  const iconSize = size === "lg" ? 26 : 20;
  const textSize = size === "lg" ? "text-[11px]" : "text-[9px]";

  return (
    <div className={`relative ${box}`}>
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.15, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full bg-gradient-to-br from-[#8B2626] to-[#CFA56A] blur-2xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`relative flex ${box} flex-col items-center justify-center gap-1 rounded-full bg-gradient-to-br from-[#8B2626] to-[#B94141] text-center shadow-2xl ring-4 ring-white/80 dark:ring-[#1A0E0A]`}
      >
        <Bot size={iconSize} className="text-white" />
        <span className={`px-3 ${textSize} font-bold leading-tight text-white`}>
          AI Admission
          <br />
          Engine
        </span>
      </motion.div>
    </div>
  );
}

function HubNodeCard({ node, index }: { node: HubNode; index: number }) {
  const Icon = node.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1, y: [0, node.floatDir * -10, 0] }}
      whileHover={{ scale: 1.06 }}
      transition={{
        opacity: { duration: 0.5, delay: 0.4 + index * 0.08 },
        scale: { duration: 0.5, delay: 0.4 + index * 0.08 },
        y: { duration: 3.6 + index * 0.3, repeat: Infinity, ease: "easeInOut", delay: 1 + node.floatDelay },
      }}
      className="group relative w-[168px] rounded-2xl border border-white/60 bg-white/70 p-3.5 shadow-lg backdrop-blur-xl transition-shadow duration-300 hover:shadow-xl hover:border-[#8B2626]/30 dark:border-white/10 dark:bg-[#241410]/70"
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-[#8B2626]/10 to-[#CFA56A]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative z-10 flex items-center gap-2.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#8B2626]/10 to-[#CFA56A]/10">
          <Icon size={17} className="text-[#8B2626]" />
        </div>
        <span className="text-sm font-semibold text-[#333333] dark:text-[#F5EDE0]">{node.label}</span>
      </div>
    </motion.div>
  );
}

export function HeroSection() {
  const { userState } = useUserState();
  const { isDark } = useTheme();
  const router = useRouter();
  const headingBeamRef = useRef<HTMLDivElement>(null);
  const headingBeamStartRef = useRef<HTMLDivElement>(null);
  const headingBeamEndRef = useRef<HTMLDivElement>(null);

  // AnimatedBeam only recalculates its path on mount/resize, not on every
  // animation frame — so each spoke's ref sits on a static wrapper (the beam
  // anchor) while the floating card animates purely visually inside it.
  // Otherwise the beam would visibly lag behind the bobbing card.
  const hubRef = useRef<HTMLDivElement>(null);
  const hubCenterRef = useRef<HTMLDivElement>(null);
  const hubNodeRefs = useMemo(
    () => HUB_NODES.map(() => createRef<HTMLDivElement>()),
    [],
  );

  return (
    <section className="relative pt-28 lg:pt-36 pb-16 lg:pb-24 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-48 -right-48 w-[500px] h-[500px] rounded-full bg-[#8B2626]/6 blur-3xl" />
        <div className="absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-[#CFA56A]/8 blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 rounded-full bg-[#8B2626]/4 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(139,38,38,0.07),transparent)]" />
        <DotPattern width={22} height={22} cr={1} className="fill-[#8B2626]/50 opacity-[0.12] dark:fill-white/40 dark:opacity-[0.06]" />
        {/* Decorative grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke={COLORS.crimson} strokeWidth="1" /></pattern></defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-[1280px] mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* LEFT: copy, CTAs, stats */}
          <div className="text-center lg:text-left">
            <div ref={headingBeamRef} className="relative w-full pb-4">
              <div ref={headingBeamStartRef} className="absolute left-0 bottom-0 h-px w-px" />
              <div ref={headingBeamEndRef} className="absolute right-0 bottom-0 h-px w-px" />
              <AnimatedBeam
                containerRef={headingBeamRef}
                fromRef={headingBeamStartRef}
                toRef={headingBeamEndRef}
                curvature={0}
                duration={2.2}
                delay={0.4}
                pathWidth={2.5}
                pathColor={isDark ? "#F5EDE0" : COLORS.crimson}
                pathOpacity={isDark ? 0.3 : 0.22}
                gradientStartColor={COLORS.crimson}
                gradientStopColor={COLORS.gold}
              />

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative flex justify-center lg:justify-start">
                <Pill variant="crimson"><Sparkles size={12} />AI-Powered Admission Counseling</Pill>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.1 }}
                className="relative mt-6 text-[2.6rem] md:text-6xl lg:text-[3.75rem] font-bold text-[#333333] dark:text-[#F5EDE0] leading-[1.1] tracking-tight"
                style={serif}
              >
                Find Your Dream<br />
                <span className="text-[#8B2626]">University Abroad</span><br />
                <span className="text-[2rem] md:text-4xl lg:text-[2.5rem] text-[#888]">with AI-Powered Guidance</span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.22 }}
              className="mt-6 text-lg md:text-xl text-[#666666] max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Navigate your international education journey with personalized AI counseling,
              expert guidance, and access to 500+ universities across 50+ countries.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.34 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.div whileHover={{ scale: 1.035 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                <Link href="/universities">
                  <Btn size="lg">
                    Find Universities <ArrowRight size={18} />
                  </Btn>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.035 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                <Btn size="lg" variant="secondary" onClick={() => userState !== "anonymous" && router.push("/chat")}>
                  {userState === "anonymous" && <Lock size={15} className="text-[#999]" />}
                  <Bot size={18} className="text-[#8B2626]" />
                  Talk to AI Counselor
                </Btn>
              </motion.div>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.46 }}
              className="mt-14 flex flex-wrap justify-center lg:justify-start gap-10 md:gap-14"
            >
              {HERO_STATS.map((s, i) => {
                const { number, suffix } = parseStat(s.value);
                return (
                  <div key={s.label} className="text-center lg:text-left">
                    <div className="flex items-baseline justify-center lg:justify-start gap-0.5 text-3xl md:text-4xl font-bold text-[#8B2626]" style={serif}>
                      <NumberTicker value={number} delay={0.6 + i * 0.12} />
                      <span>{suffix}</span>
                    </div>
                    <div className="text-sm text-[#666666] mt-1">{s.label}</div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* RIGHT: AI Study Abroad Hub — desktop */}
          <div className="relative mt-16 lg:mt-0 hidden lg:block">
            <div ref={hubRef} className="relative mx-auto h-[440px] w-full max-w-[460px]">
              <div ref={hubCenterRef} className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                <HubCenterNode size="lg" />
              </div>

              {HUB_NODES.map((node, i) => (
                <div key={node.label} ref={hubNodeRefs[i]} className={`absolute z-10 ${node.position}`}>
                  <HubNodeCard node={node} index={i} />
                </div>
              ))}

              {HUB_NODES.map((node, i) => (
                <AnimatedBeam
                  key={node.label}
                  containerRef={hubRef}
                  fromRef={hubCenterRef}
                  toRef={hubNodeRefs[i]}
                  curvature={node.curvature}
                  duration={4.5}
                  delay={0.8 + i * 0.15}
                  pathWidth={1.75}
                  pathColor={isDark ? "#F5EDE0" : COLORS.crimson}
                  pathOpacity={isDark ? 0.15 : 0.12}
                  gradientStartColor={COLORS.crimson}
                  gradientStopColor={COLORS.gold}
                />
              ))}
            </div>
          </div>

          {/* AI Study Abroad Hub — tablet/mobile (simplified, no beams) */}
          <div className="mt-14 flex flex-col items-center lg:hidden">
            <HubCenterNode size="sm" />
            <div className="mt-8 grid w-full grid-cols-2 justify-items-center gap-4 sm:grid-cols-3">
              {HUB_NODES.map((node, i) => (
                <HubNodeCard key={node.label} node={node} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
