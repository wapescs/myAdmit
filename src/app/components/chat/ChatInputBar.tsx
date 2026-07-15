"use client";

import { Send } from "lucide-react";
import { ChatLimitBanner } from "./ChatLimitBanner";

export function ChatInputBar({
  input, onChangeInput, onSend, isLocked, isLimited,
}: {
  input: string;
  onChangeInput: (v: string) => void;
  onSend: () => void;
  isLocked: boolean;
  isLimited: boolean;
}) {
  return (
    <div className="bg-white dark:bg-[#241410] border-t border-[#E8DDD0] dark:border-white/8 px-4 md:px-8 py-4">
      {isLimited && <ChatLimitBanner />}
      <div className="flex gap-3">
        <div className="flex-1 flex items-center gap-2 bg-[#FAF6EE] dark:bg-[#2E1A12] border border-[#E8DDD0] dark:border-white/10 rounded-2xl px-4 py-3 focus-within:border-[#8B2626]/50 focus-within:ring-2 focus-within:ring-[#8B2626]/10 transition-all">
          <input
            value={input} onChange={e => onChangeInput(e.target.value)} onKeyDown={e => e.key === "Enter" && onSend()}
            disabled={isLocked || isLimited}
            placeholder={isLocked ? "Sign in to chat…" : isLimited ? "Daily limit reached…" : "Ask about universities, scholarships, visas…"}
            className="flex-1 bg-transparent text-sm text-[#333333] dark:text-[#F5EDE0] placeholder-[#999] focus:outline-none"
          />
        </div>
        <button onClick={onSend} disabled={!input.trim() || isLocked || isLimited}
          className="w-12 h-12 bg-[#8B2626] text-white rounded-2xl flex items-center justify-center hover:bg-[#6E1E1E] transition-all disabled:opacity-35 disabled:cursor-not-allowed">
          <Send size={17} />
        </button>
      </div>
      <p className="text-[10px] text-center text-[#999] mt-2">MyAdmit AI may make mistakes. Verify important information with official sources.</p>
    </div>
  );
}
