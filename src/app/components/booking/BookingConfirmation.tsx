"use client";

import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { serif } from "@/styles/typography";

export function BookingConfirmation() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto bg-white dark:bg-[#241410] rounded-[24px] p-10 border border-[#E8DDD0] dark:border-white/8 text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-[#8B2626]/10 flex items-center justify-center mx-auto mb-4">
        <CheckCircle2 size={28} className="text-[#8B2626]" />
      </div>
      <h2 className="font-bold text-[#333333] dark:text-[#F5EDE0] text-xl mb-2" style={serif}>Booking Received!</h2>
      <p className="text-[#666666] text-sm max-w-xs mx-auto">We have recorded your information. Our counselor will reach you shortly.</p>
    </motion.div>
  );
}
