"use client";

import { useUserState } from "@/app/providers/UserStateProvider";

export function ChatProfileBanner() {
  const { userState } = useUserState();
  if (userState === "complete") return null;

  return (
    <div className="mb-4 p-3 bg-[#8B2626]/8 border border-[#8B2626]/20 rounded-xl">
      <div className="text-xs font-bold text-[#8B2626] mb-0.5">Complete your profile</div>
      <div className="text-xs text-[#666666]">Unlock personalized AI recommendations</div>
    </div>
  );
}
