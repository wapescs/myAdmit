"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { useUserState } from "@/app/providers/UserStateProvider";
import type { UserState } from "@/types/user.types";
import { authService, verificationService, profileService } from "./index";
import {
  EMPTY_PROFILE,
  isEntitled as isEntitledRank,
  type AccessTier,
  type QualificationDetails,
  type UserProfile,
} from "./types";

// Bridges the richer access-control state (email/phone/qualification) onto
// the existing UserStateProvider so there is still exactly one tier signal
// in the app — see ACCESS_CONTROL.md for why "logged-in"/"complete" map to
// "email"/"full" instead of renaming UserState outright.
function tierFromUserState(userState: UserState): AccessTier {
  if (userState === "complete") return "full";
  if (userState === "logged-in") return "email";
  return "anonymous";
}

// A reasonable default so forcing "full" tier via the dev switcher doesn't
// leave qualification null (nothing else reads it, but it keeps the mock
// data internally consistent for anyone poking at profile in devtools).
const DEV_PLACEHOLDER_QUALIFICATION: QualificationDetails = {
  tenth: { board: "CBSE", yearOfPassing: 2019, score: 92, markScheme: "PERCENTAGE" },
  twelfth: { board: "CBSE", yearOfPassing: 2021, score: 89, markScheme: "PERCENTAGE", stream: "SCIENCE" },
  targetDegreeLevel: "UNDERGRAD",
  targetCountries: ["US"],
};

interface AccessContextValue {
  tier: AccessTier;
  profile: UserProfile;
  isEntitled: (requires: AccessTier) => boolean;

  loginWithGoogle: () => Promise<void>;
  sendEmailOtp: (email: string) => Promise<void>;
  verifyEmailOtp: (email: string, code: string) => Promise<boolean>;

  sendPhoneOtp: (phone: string) => Promise<void>;
  verifyPhoneOtp: (phone: string, code: string) => Promise<boolean>;
  saveQualification: (details: QualificationDetails) => Promise<void>;

  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;

  isUpgradeModalOpen: boolean;
  openUpgradeModal: () => void;
  closeUpgradeModal: () => void;

  /** Dev-only override. Intended caller: src/dev/UserSwitcher. */
  devSetTier: (tier: AccessTier) => void;
}

const AccessContext = createContext<AccessContextValue | null>(null);

export function AccessProvider({ children }: { children: ReactNode }) {
  const { userState, setUserState } = useUserState();
  const [profile, setProfile] = useState<UserProfile>(EMPTY_PROFILE);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isUpgradeModalOpen, setUpgradeModalOpen] = useState(false);

  const tier = tierFromUserState(userState);

  async function loginWithGoogle() {
    const { email } = await authService.signInWithGoogle();
    setProfile((p) => ({ ...p, email }));
    setUserState("logged-in");
  }

  async function sendEmailOtp(email: string) {
    await authService.sendEmailOtp(email);
  }

  async function verifyEmailOtp(email: string, code: string) {
    const verified = await authService.verifyEmailOtp(email, code);
    if (verified) {
      setProfile((p) => ({ ...p, email }));
      setUserState("logged-in");
    }
    return verified;
  }

  async function sendPhoneOtp(phone: string) {
    await verificationService.sendPhoneOtp(phone);
  }

  async function verifyPhoneOtp(phone: string, code: string) {
    const verified = await verificationService.verifyPhoneOtp(phone, code);
    if (verified) {
      setProfile((p) => ({ ...p, phone, phoneVerified: true }));
    }
    return verified;
  }

  async function saveQualification(details: QualificationDetails) {
    await profileService.saveQualification(details);
    setProfile((p) => ({ ...p, qualification: details }));
    setUserState("complete");
  }

  function devSetTier(nextTier: AccessTier) {
    if (nextTier === "anonymous") {
      setUserState("anonymous");
      setProfile(EMPTY_PROFILE);
    } else if (nextTier === "email") {
      setUserState("logged-in");
      setProfile((p) => ({
        ...EMPTY_PROFILE,
        email: p.email ?? "student.mock@gmail.com",
      }));
    } else {
      setUserState("complete");
      setProfile((p) => ({
        email: p.email ?? "student.mock@gmail.com",
        phone: p.phone ?? "+91 98765 43210",
        phoneVerified: true,
        qualification: p.qualification ?? DEV_PLACEHOLDER_QUALIFICATION,
      }));
    }
  }

  const value: AccessContextValue = {
    tier,
    profile,
    isEntitled: (requires) => isEntitledRank(tier, requires),

    loginWithGoogle,
    sendEmailOtp,
    verifyEmailOtp,

    sendPhoneOtp,
    verifyPhoneOtp,
    saveQualification,

    isLoginModalOpen,
    openLoginModal: () => setLoginModalOpen(true),
    closeLoginModal: () => setLoginModalOpen(false),

    isUpgradeModalOpen,
    openUpgradeModal: () => setUpgradeModalOpen(true),
    closeUpgradeModal: () => setUpgradeModalOpen(false),

    devSetTier,
  };

  return <AccessContext.Provider value={value}>{children}</AccessContext.Provider>;
}

export function useAccess() {
  const ctx = useContext(AccessContext);
  if (!ctx) throw new Error("useAccess must be used within AccessProvider");
  return ctx;
}
