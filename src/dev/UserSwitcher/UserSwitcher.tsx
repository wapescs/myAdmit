"use client";

import { useAccess } from "@/lib/access/AccessProvider";
import type { AccessTier } from "@/lib/access/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TIERS: { value: AccessTier; label: string }[] = [
  { value: "anonymous", label: "Anonymous" },
  { value: "email", label: "Email (semi)" },
  { value: "full", label: "Full" },
];

// Demo-only tier switcher. Gated behind NEXT_PUBLIC_ENABLE_DEV_SWITCHER so it
// never renders unless explicitly turned on. See ACCESS_CONTROL.md for
// removal steps.
export function UserSwitcher() {
  if (process.env.NEXT_PUBLIC_ENABLE_DEV_SWITCHER !== "true") return null;
  return <UserSwitcherPanel />;
}

function UserSwitcherPanel() {
  const { tier, devSetTier } = useAccess();

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex items-center gap-2 rounded-2xl border border-[#E8DDD0] dark:border-white/10 bg-white dark:bg-[#241410] p-3 shadow-lg">
      <span className="text-xs font-semibold uppercase tracking-wide text-[#8B2626]">Dev Tier</span>
      <Select value={tier} onValueChange={(v) => devSetTier(v as AccessTier)}>
        <SelectTrigger size="sm" className="min-w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {TIERS.map((t) => (
            <SelectItem key={t.value} value={t.value}>
              {t.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
