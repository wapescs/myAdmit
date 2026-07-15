"use client";

import { CHAT_CONVERSATIONS } from "@/constants/chat";

export function ChatConversationList() {
  return (
    <div className="space-y-1 flex-1 overflow-y-auto">
      {CHAT_CONVERSATIONS.map((c, i) => (
        <button key={i} className={`w-full text-left px-3 py-3 rounded-xl transition-all ${c.active ? "bg-[#8B2626]/8 border border-[#8B2626]/20" : "hover:bg-[#FAF6EE] dark:hover:bg-[#2E1A12]"}`}>
          <div className={`text-sm font-medium truncate ${c.active ? "text-[#8B2626]" : "text-[#333333] dark:text-[#F5EDE0]"}`}>{c.title}</div>
          <div className="text-xs text-[#999] mt-0.5">{c.date}</div>
        </button>
      ))}
    </div>
  );
}
