"use client";

import { AlertCircle } from "lucide-react";

export function ChatLimitBanner() {
  return (
    <div className="mb-3 p-3 bg-[#F9A825]/8 border border-[#F9A825]/25 rounded-xl flex items-center gap-2">
      <AlertCircle size={15} className="text-[#F9A825] flex-shrink-0" />
      <div className="text-sm text-[#333333]">Daily limit reached. <button className="text-[#8B2626] font-semibold underline">Upgrade for unlimited access.</button></div>
    </div>
  );
}
