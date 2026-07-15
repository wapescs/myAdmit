"use client";

import { useState } from "react";
import { Input } from "@/app/components/ui/input";
import { Btn } from "@/app/components/common/Btn";
import { OtpEntry } from "./OtpEntry";
import { useAccess } from "@/lib/access/AccessProvider";

export function UpgradeStepPhone({ onVerified }: { onVerified: () => void }) {
  const { sendPhoneOtp, verifyPhoneOtp } = useAccess();
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  async function handleSendOtp() {
    await sendPhoneOtp(phone);
    setOtpSent(true);
  }

  if (otpSent) {
    return (
      <OtpEntry
        destination={phone}
        verify={(code) => verifyPhoneOtp(phone, code)}
        onVerified={onVerified}
        resend={() => sendPhoneOtp(phone)}
      />
    );
  }

  return (
    <div className="space-y-3">
      <Input type="tel" placeholder="+91 98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <Btn onClick={handleSendOtp} disabled={phone.trim().length < 8} className="w-full">
        Send OTP
      </Btn>
    </div>
  );
}
