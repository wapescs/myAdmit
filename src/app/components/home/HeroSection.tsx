"use client";

import { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ArrowRight, Bot, Lock, Sparkles } from "lucide-react";
import { Btn } from "@/app/components/common/Btn";
import { Pill } from "@/app/components/common/Pill";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { useUserState } from "@/app/providers/UserStateProvider";
import { useTheme } from "@/app/providers/ThemeProvider";
import { HERO_STATS } from "@/constants/home";
import { serif } from "@/styles/typography";
import { COLORS } from "@/styles/theme";

export function HeroSection() {
  const { userState } = useUserState();
  const { isDark } = useTheme();
  const router = useRouter();
  const headingBeamRef = useRef<HTMLDivElement>(null);
  const headingBeamStartRef = useRef<HTMLDivElement>(null);
  const headingBeamEndRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative pt-28 lg:pt-40 pb-16 lg:pb-28 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-48 -right-48 w-[500px] h-[500px] rounded-full bg-[#8B2626]/6 blur-3xl" />
        <div className="absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-[#CFA56A]/8 blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 rounded-full bg-[#8B2626]/4 blur-3xl" />
        {/* Decorative grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke={COLORS.crimson} strokeWidth="1" /></pattern></defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-[1280px] mx-auto px-5 lg:px-8 text-center">
        {/* Heading beam: a bright light line that lands right under the headline,
            like a spotlight marking the page's "arrival" moment. Anchor nodes sit at
            the content column's bottom edge (0%/100% width), so the beam is fluid at
            every breakpoint with no per-screen-size overrides — nothing to overflow. */}
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

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative">
            <Pill variant="crimson"><Sparkles size={12} />AI-Powered Admission Counseling</Pill>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.1 }}
            className="relative mt-6 text-[2.6rem] md:text-6xl lg:text-[4.5rem] font-bold text-[#333333] dark:text-[#F5EDE0] leading-[1.1] tracking-tight"
            style={serif}
          >
            Find Your Dream<br />
            <span className="text-[#8B2626]">University Abroad</span><br />
            <span className="text-[2rem] md:text-4xl lg:text-5xl text-[#888]">with AI-Powered Guidance</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.22 }}
          className="mt-6 text-lg md:text-xl text-[#666666] max-w-2xl mx-auto leading-relaxed"
        >
          Navigate your international education journey with personalized AI counseling,
          expert guidance, and access to 500+ universities across 50+ countries.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.34 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/comparison">
            <Btn size="lg">
              Find Universities <ArrowRight size={18} />
            </Btn>
          </Link>
          <Btn size="lg" variant="secondary" onClick={() => userState !== "anonymous" && router.push("/chat")}>
            {userState === "anonymous" && <Lock size={15} className="text-[#999]" />}
            <Bot size={18} className="text-[#8B2626]" />
            Talk to AI Counselor
          </Btn>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.46 }}
          className="mt-14 flex flex-wrap justify-center gap-10 md:gap-20"
        >
          {HERO_STATS.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#8B2626]" style={serif}>{s.value}</div>
              <div className="text-sm text-[#666666] mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Floating university cards */}
        <div className="relative mt-16 hidden lg:block">
          <div className="absolute left-0 top-0 -translate-x-8">
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="bg-white rounded-2xl p-4 shadow-xl border border-[#E8DDD0] w-48 text-left">
              <div className="text-xs text-[#999] mb-1">Acceptance Rate</div>
              <div className="text-2xl font-bold text-[#2E7D32]" style={serif}>68%</div>
              <div className="text-xs text-[#333333] font-medium">University of Toronto</div>
            </motion.div>
          </div>
          <div className="absolute right-0 top-0 translate-x-8">
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              className="bg-white rounded-2xl p-4 shadow-xl border border-[#E8DDD0] w-48 text-left">
              <div className="text-xs text-[#999] mb-1">Scholarship Found</div>
              <div className="text-2xl font-bold text-[#CFA56A]" style={serif}>$24K</div>
              <div className="text-xs text-[#333333] font-medium">Chevening Award</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
