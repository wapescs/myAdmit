"use client";

import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { serif } from "@/styles/typography";

export function StatCard({
  icon: Icon, label, value, colorClass, delay = 0,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  colorClass: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
      className="bg-white dark:bg-[#241410] rounded-[20px] p-5 border border-[#E8DDD0] dark:border-white/8 hover:shadow-md transition-all"
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${colorClass}`}><Icon size={19} /></div>
      <div className="text-2xl font-bold text-[#333333] dark:text-[#F5EDE0]" style={serif}>{value}</div>
      <div className="text-xs text-[#666666] mt-0.5">{label}</div>
    </motion.div>
  );
}
