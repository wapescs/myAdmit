"use client";

import type { ReactNode } from "react";
import { useAccess } from "@/lib/access/AccessProvider";
import type { AccessTier } from "@/lib/access/types";
import { GateOverlay } from "./GateOverlay";

interface FeatureGateProps {
  /** Minimum tier required to see this content unblurred. */
  requires: Exclude<AccessTier, "anonymous">;
  /** Used in the overlay copy, e.g. "AI Advisor" or "Book a Session". */
  featureName?: string;
  children: ReactNode;
}

// The one-line wrapper for gating any feature. See ACCESS_CONTROL.md for
// how to add a new gated feature.
export function FeatureGate({ requires, featureName, children }: FeatureGateProps) {
  const { tier, isEntitled, openLoginModal, openUpgradeModal } = useAccess();

  if (isEntitled(requires)) {
    return <>{children}</>;
  }

  const kind = tier === "anonymous" ? "login" : "upgrade";

  return (
    <div className="relative">
      <div aria-hidden="true" className="pointer-events-none blur-sm select-none">
        {children}
      </div>
      <GateOverlay kind={kind} featureName={featureName} onAction={kind === "login" ? openLoginModal : openUpgradeModal} />
    </div>
  );
}
