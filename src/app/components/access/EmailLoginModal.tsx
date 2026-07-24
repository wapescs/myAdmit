"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Btn } from "@/app/components/common/Btn";
import { OtpEntry } from "./OtpEntry";
import { OptionalPhoneVerifyStep } from "./OptionalPhoneVerifyStep";
import { useAccess } from "@/lib/access/AccessProvider";
import { serif } from "@/styles/typography";

type Step = "choose" | "otp" | "phone";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const STEP_COPY: Record<Step, { title: string; description: string }> = {
  choose: { title: "Sign in to MyAdmit", description: "Create a free account to unlock the full platform." },
  otp: { title: "Sign in to MyAdmit", description: "Create a free account to unlock the full platform." },
  phone: { title: "One last thing", description: "Optional — verify your phone now, or do it later." },
};

export function EmailLoginModal() {
  const { isLoginModalOpen, closeLoginModal, loginWithGoogle, sendEmailOtp, verifyEmailOtp } = useAccess();
  const [step, setStep] = useState<Step>("choose");
  const [email, setEmail] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);

  function handleOpenChange(open: boolean) {
    if (!open) {
      closeLoginModal();
      setStep("choose");
      setEmail("");
      setGoogleLoading(false);
      setEmailLoading(false);
    }
  }

  async function handleGoogle() {
    setGoogleLoading(true);
    await loginWithGoogle();
    setGoogleLoading(false);
    setStep("phone");
  }

  async function handleSendOtp() {
    setEmailLoading(true);
    await sendEmailOtp(email);
    setEmailLoading(false);
    setStep("otp");
  }

  const { title, description } = STEP_COPY[step];

  return (
    <Dialog open={isLoginModalOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle style={serif}>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {step === "choose" && (
          <div className="space-y-3">
            <Btn onClick={handleGoogle} disabled={googleLoading} className="w-full">
              {googleLoading ? "Signing in..." : "Continue with Google"}
            </Btn>

            <div className="flex items-center gap-3 text-xs text-[#666666]">
              <div className="flex-1 h-px bg-[#E8DDD0]" />
              OR
              <div className="flex-1 h-px bg-[#E8DDD0]" />
            </div>

            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Btn
              variant="secondary"
              onClick={handleSendOtp}
              disabled={!EMAIL_PATTERN.test(email) || emailLoading}
              className="w-full"
            >
              {emailLoading ? "Sending..." : "Continue with Email"}
            </Btn>
          </div>
        )}

        {step === "otp" && (
          <OtpEntry
            destination={email}
            verify={(code) => verifyEmailOtp(email, code)}
            onVerified={() => setStep("phone")}
            resend={() => sendEmailOtp(email)}
          />
        )}

        {step === "phone" && <OptionalPhoneVerifyStep onDone={() => handleOpenChange(false)} />}
      </DialogContent>
    </Dialog>
  );
}
