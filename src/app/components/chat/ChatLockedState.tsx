"use client";

import { motion } from "motion/react";
import { Lock } from "lucide-react";
import { serif } from "@/styles/typography";

export function ChatLockedState() {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
      <div className="w-16 h-16 rounded-2xl bg-[#8B2626]/10 flex items-center justify-center mx-auto mb-4"><Lock size={28} className="text-[#8B2626]" /></div>
      <h3 className="font-bold text-[#333333] text-xl mb-2" style={serif}>Sign in to Chat with AI</h3>
      <p className="text-[#666666] text-sm max-w-xs mx-auto">Create a free account to access your personal AI admission counselor.</p>
    </motion.div>
  );
}
