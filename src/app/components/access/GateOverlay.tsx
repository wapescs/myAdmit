"use client";

import { Lock, Sparkles } from "lucide-react";
import { serif } from "@/styles/typography";
import { Btn } from "@/app/components/common/Btn";

interface GateOverlayProps {
  kind: "login" | "upgrade";
  featureName?: string;
  onAction: () => void;
}

export function GateOverlay({ kind, featureName, onAction }: GateOverlayProps) {
  const Icon = kind === "login" ? Lock : Sparkles;
  const title = kind === "login" ? `Sign in to unlock ${featureName ?? "this page"}` : `Unlock ${featureName ?? "this feature"}`;
  const body =
    kind === "login"
      ? "Create a free account to browse the full platform."
      : "Verify your phone and add a few qualification details to continue.";
  const cta = kind === "login" ? "Sign In" : "Complete Your Profile";

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center p-6 bg-[#FAF6EE]/70 dark:bg-[#1A0E0A]/70 backdrop-blur-[2px] rounded-[24px]">
      <div className="max-w-sm w-full text-center bg-white dark:bg-[#241410] border border-[#E8DDD0] dark:border-white/10 rounded-[24px] p-8 shadow-lg">
        <div className="w-14 h-14 rounded-2xl bg-[#8B2626]/10 flex items-center justify-center mx-auto mb-4">
          <Icon size={26} className="text-[#8B2626]" />
        </div>
        <h3 className="font-bold text-[#333333] dark:text-[#F5EDE0] text-lg mb-2" style={serif}>
          {title}
        </h3>
        <p className="text-[#666666] text-sm mb-6">{body}</p>
        <Btn onClick={onAction} className="w-full">
          {cta}
        </Btn>
      </div>
    </div>
  );
}
