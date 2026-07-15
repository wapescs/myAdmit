"use client";

import { SUGGESTED_PROMPTS } from "@/constants/chat";

export function ChatSuggestedPrompts({ onSelectPrompt }: { onSelectPrompt: (prompt: string) => void }) {
  return (
    <div className="px-4 md:px-8 pb-3">
      <div className="text-xs text-[#999] mb-2">Suggested questions:</div>
      <div className="flex flex-wrap gap-2">
        {SUGGESTED_PROMPTS.map(p => (
          <button key={p} onClick={() => onSelectPrompt(p)} className="px-3 py-1.5 text-xs text-[#666666] bg-white border border-[#E8DDD0] rounded-full hover:border-[#8B2626]/40 hover:text-[#8B2626] transition-all">{p}</button>
        ))}
      </div>
    </div>
  );
}
