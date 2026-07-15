"use client";

import { motion } from "motion/react";
import { Bot } from "lucide-react";

export function ChatTypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-xl bg-[#8B2626] flex items-center justify-center flex-shrink-0"><Bot size={15} className="text-white" /></div>
      <div className="bg-white dark:bg-[#241410] border border-[#E8DDD0] rounded-2xl rounded-tl-sm px-4 py-3">
        <div className="flex gap-1 items-center h-4">
          {[0, 0.2, 0.4].map((d, i) => (
            <motion.div key={i} className="w-1.5 h-1.5 bg-[#8B2626] rounded-full"
              animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: d }} />
          ))}
        </div>
      </div>
    </div>
  );
}
