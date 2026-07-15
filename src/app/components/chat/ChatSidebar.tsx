"use client";

import { Plus } from "lucide-react";
import { ChatProfileBanner } from "./ChatProfileBanner";
import { ChatConversationList } from "./ChatConversationList";
import { ChatUsageCard } from "./ChatUsageCard";
import { serif } from "@/styles/typography";

export function ChatSidebar({ dailyCount }: { dailyCount: number }) {
  return (
    <aside className="hidden md:flex flex-col w-72 bg-white dark:bg-[#241410] border-r border-[#E8DDD0] dark:border-white/8 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-[#333333] dark:text-[#F5EDE0]" style={serif}>Conversations</h3>
        <button className="p-1.5 rounded-lg hover:bg-[#FAF6EE] text-[#666666]"><Plus size={16} /></button>
      </div>
      <ChatProfileBanner />
      <ChatConversationList />
      <ChatUsageCard dailyCount={dailyCount} />
    </aside>
  );
}
