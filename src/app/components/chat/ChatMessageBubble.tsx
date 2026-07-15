"use client";

import { motion } from "motion/react";
import { Bot } from "lucide-react";
import type { Message } from "@/types/chat.types";

export function ChatMessageBubble({ message }: { message: Message }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}>
      {message.role === "assistant" && (
        <div className="w-8 h-8 rounded-xl bg-[#8B2626] flex items-center justify-center flex-shrink-0 mt-0.5"><Bot size={15} className="text-white" /></div>
      )}
      <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${message.role === "user" ? "bg-[#8B2626] text-white rounded-tr-sm" : "bg-white dark:bg-[#241410] border border-[#E8DDD0] dark:border-white/8 text-[#333333] dark:text-[#F5EDE0] rounded-tl-sm"}`}>
        <div className="text-sm leading-relaxed whitespace-pre-line">{message.content}</div>
        <div className={`text-[10px] mt-1.5 ${message.role === "user" ? "text-white/55" : "text-[#999]"}`}>
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
    </motion.div>
  );
}
