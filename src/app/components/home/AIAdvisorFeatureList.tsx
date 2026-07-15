"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Lock, Sparkles } from "lucide-react";
import { Btn } from "@/app/components/common/Btn";
import { useUserState } from "@/app/providers/UserStateProvider";
import { AI_ADVISOR_FEATURES } from "@/constants/home";
import { serif } from "@/styles/typography";

export function AIAdvisorFeatureList() {
  const { userState } = useUserState();

  return (
    <motion.div initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
      <div className="text-sm font-semibold text-[#8B2626] mb-2 uppercase tracking-wider">AI-Powered</div>
      <h2 className="text-3xl lg:text-4xl font-bold text-[#333333] dark:text-[#F5EDE0] mb-4" style={serif}>
        Meet Your Personal AI<br />Admission Counselor
      </h2>
      <p className="text-[#666666] mb-8 leading-relaxed">
        Our AI has helped 10,000+ students navigate the complex international admissions process with personalized, data-driven guidance available 24/7.
      </p>
      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        {AI_ADVISOR_FEATURES.map((f, i) => (
          <motion.div key={f.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
            className="flex gap-3 p-3.5 rounded-xl hover:bg-[#FAF6EE] dark:hover:bg-[#2E1A12] transition-all">
            <div className="w-9 h-9 rounded-xl bg-[#8B2626]/10 flex items-center justify-center flex-shrink-0"><f.icon size={17} className="text-[#8B2626]" /></div>
            <div>
              <div className="text-sm font-bold text-[#333333] dark:text-[#F5EDE0]">{f.title}</div>
              <div className="text-xs text-[#666666] mt-0.5">{f.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <Link href="/chat">
          <Btn size="lg">
            <Sparkles size={17} /> Start AI Chat
            {userState === "anonymous" && <Lock size={13} />}
          </Btn>
        </Link>
        <Btn size="lg" variant="secondary">Watch Demo</Btn>
      </div>
    </motion.div>
  );
}
