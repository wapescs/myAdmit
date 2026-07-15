"use client";

import { motion } from "motion/react";
import { Bot } from "lucide-react";
import { serif } from "@/styles/typography";

export function AIAdvisorShowcase() {
  return (
    <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
      <div className="bg-gradient-to-br from-[#8B2626] to-[#5C1717] rounded-[32px] p-8 text-white relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/8" />
        <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-[#CFA56A]/15" />
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-6"><Bot size={28} /></div>
          <h3 className="text-2xl font-bold mb-5" style={serif}>Your AI Admission Counselor</h3>
          <div className="space-y-3">
            <div className="bg-white/10 rounded-xl p-3.5 text-sm">
              <div className="text-white/50 text-xs mb-1">You asked</div>
              <div>"What universities should I apply to with 85% marks and 7.0 IELTS?"</div>
            </div>
            <div className="bg-white rounded-xl p-3.5 text-sm text-[#333333]">
              <div className="text-[#8B2626] text-xs font-bold mb-1">MyAdmit AI</div>
              <div>Based on your profile, I recommend University of Toronto (safe), University of Melbourne (match), and University of Edinburgh (reach)...</div>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-6 pt-5 border-t border-white/15">
            <div className="flex -space-x-2">
              {["🧑", "👩", "👨"].map((e, i) => (
                <div key={i} className="w-7 h-7 rounded-full bg-[#CFA56A] border-2 border-[#8B2626] flex items-center justify-center text-xs">{e}</div>
              ))}
            </div>
            <div className="text-sm text-white/70">10,000+ students counseled</div>
          </div>
        </div>
      </div>
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-5 top-10 bg-white rounded-2xl p-4 shadow-xl border border-[#E8DDD0] w-44">
        <div className="text-[10px] text-[#999] mb-0.5">Acceptance Probability</div>
        <div className="text-2xl font-bold text-[#2E7D32]" style={serif}>78%</div>
        <div className="text-xs text-[#333333]">University of Toronto</div>
      </motion.div>
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        className="absolute -left-5 bottom-16 bg-white rounded-2xl p-4 shadow-xl border border-[#E8DDD0] w-44">
        <div className="text-[10px] text-[#999] mb-0.5">Scholarship Found</div>
        <div className="text-2xl font-bold text-[#CFA56A]" style={serif}>$24K</div>
        <div className="text-xs text-[#333333]">Available for you</div>
      </motion.div>
    </motion.div>
  );
}
