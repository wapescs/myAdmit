"use client";

import { Bot, Upload } from "lucide-react";

export function ChatHeader() {
  return (
    <div className="bg-white dark:bg-[#241410] border-b border-[#E8DDD0] dark:border-white/8 px-5 py-3.5 flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl bg-[#8B2626] flex items-center justify-center flex-shrink-0"><Bot size={17} className="text-white" /></div>
      <div>
        <div className="font-bold text-sm text-[#333333] dark:text-[#F5EDE0]">MyAdmit AI Counselor</div>
        <div className="text-xs text-[#2E7D32] flex items-center gap-1"><div className="w-1.5 h-1.5 bg-[#2E7D32] rounded-full" />Online</div>
      </div>
      <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#666666] border border-[#E8DDD0] rounded-xl hover:bg-[#FAF6EE]">
        <Upload size={12} />Upload Docs
      </button>
    </div>
  );
}
