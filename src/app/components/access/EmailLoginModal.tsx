"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Btn } from "@/app/components/common/Btn";
import { OtpEntry } from "./OtpEntry";
import { useAccess } from "@/lib/access/AccessProvider";
import { serif } from "@/styles/typography";

type Step = "choose" | "otp";

export function EmailLoginModal() {
  const { isLoginModalOpen, closeLoginModal, loginWithGoogle, sendEmailOtp, verifyEmailOtp } = useAccess();
  const [step, setStep] = useState<Step>("choose");
  const [email, setEmail] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);

  function handleOpenChange(open: boolean) {
    if (!open) {
      closeLoginModal();
      setStep("choose");
      setEmail("");
      setGoogleLoading(false);
    }
  }

  async function handleGoogle() {
    setGoogleLoading(true);
    await loginWithGoogle();
    handleOpenChange(false);
  }

  async function handleSendOtp() {
    await sendEmailOtp(email);
    setStep("otp");
  }

  return (
    <Dialog open={isLoginModalOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle style={serif}>Sign in to MyAdmit</DialogTitle>
          <DialogDescription>Create a free account to unlock the full platform.</DialogDescription>
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
            <Btn variant="secondary" onClick={handleSendOtp} disabled={!email.includes("@")} className="w-full">
              Continue with Email
            </Btn>
          </div>
        )}

        {step === "otp" && (
          <OtpEntry
            destination={email}
            verify={(code) => verifyEmailOtp(email, code)}
            onVerified={() => handleOpenChange(false)}
            resend={() => sendEmailOtp(email)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
