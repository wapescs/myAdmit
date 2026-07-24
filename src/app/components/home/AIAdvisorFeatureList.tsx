"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import { Lock, Sparkles } from "lucide-react";
import { Btn } from "@/app/components/common/Btn";
import { AnimatedList } from "@/components/ui/animated-list";
import { ShineBorder } from "@/components/ui/shine-border";
import { useUserState } from "@/app/providers/UserStateProvider";
import { AI_ADVISOR_FEATURES } from "@/constants/home";
import { serif } from "@/styles/typography";
import { cn } from "@/lib/utils";

function MagneticButton({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.4);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.96 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

export function AIAdvisorFeatureList() {
  const { userState } = useUserState();

  return (
    <motion.div initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
      <div className="text-sm font-semibold text-[#8B2626] mb-2 uppercase tracking-wider">AI-Powered</div>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#333333] dark:text-[#F5EDE0] mb-4" style={serif}>
        Meet Your Personal AI<br />Admission Counselor
      </h2>
      <p className="text-[#666666] mb-8 leading-relaxed">
        Our AI has helped 10,000+ students navigate the complex international admissions process with personalized, data-driven guidance available 24/7.
      </p>

      {/* Interactive bento grid */}
      <AnimatedList
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-flow-dense gap-3.5 mb-8"
        itemDelay={0.08}
      >
        {AI_ADVISOR_FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            whileHover={{ y: -5, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
            className={cn(
              "group relative overflow-hidden rounded-2xl border border-[#E8DDD0] bg-white/60 p-4 shadow-sm backdrop-blur-sm transition-shadow duration-300 hover:border-[#8B2626]/30 hover:shadow-xl dark:border-white/10 dark:bg-[#241410]/60",
              i === 0 && "sm:col-span-2",
            )}
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <ShineBorder borderWidth={1.5} duration={3.5} shineColor="#8B2626" />
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-[#8B2626]/[0.06] via-transparent to-[#CFA56A]/[0.08] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative z-10 flex gap-3.5">
              <motion.div
                whileHover={{ rotate: 8, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 12 }}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#8B2626]/10 to-[#CFA56A]/10 shadow-inner"
              >
                <f.icon size={18} className="text-[#8B2626]" />
              </motion.div>
              <div>
                <div className="text-sm font-bold text-[#333333] dark:text-[#F5EDE0]">{f.title}</div>
                <div className="text-xs text-[#666666] dark:text-neutral-400 mt-0.5">{f.desc}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatedList>

      <div className="flex flex-wrap gap-3">
        <MagneticButton>
          <Link href="/chat">
            <Btn size="lg">
              <Sparkles size={17} /> Start AI Chat
              {userState === "anonymous" && <Lock size={13} />}
            </Btn>
          </Link>
        </MagneticButton>
        <MagneticButton>
          <Btn size="lg" variant="secondary">Watch Demo</Btn>
        </MagneticButton>
      </div>
    </motion.div>
  );
}
