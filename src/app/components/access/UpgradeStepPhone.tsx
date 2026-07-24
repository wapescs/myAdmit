"use client";

import { useState } from "react";
import { Btn } from "@/app/components/common/Btn";
import { OtpEntry } from "./OtpEntry";
import { PhoneNumberField } from "./PhoneNumberField";
import { useAccess } from "@/lib/access/AccessProvider";
import { EMPTY_PHONE_VALUE, isValidPhoneValue, toE164, type PhoneFieldValue } from "@/constants/phoneCountryCodes";

export function UpgradeStepPhone({ onVerified }: { onVerified: () => void }) {
  const { sendPhoneOtp, verifyPhoneOtp } = useAccess();
  const [phone, setPhone] = useState<PhoneFieldValue>(EMPTY_PHONE_VALUE);
  const [otpSent, setOtpSent] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleSendOtp() {
    setSending(true);
    await sendPhoneOtp(toE164(phone));
    setSending(false);
    setOtpSent(true);
  }

  if (otpSent) {
    return (
      <OtpEntry
        destination={toE164(phone)}
        verify={(code) => verifyPhoneOtp(toE164(phone), code)}
        onVerified={onVerified}
        resend={() => sendPhoneOtp(toE164(phone))}
      />
    );
  }

  return (
    <div className="space-y-3">
      <PhoneNumberField value={phone} onChange={setPhone} disabled={sending} />
      <Btn onClick={handleSendOtp} disabled={!isValidPhoneValue(phone) || sending} className="w-full">
        {sending ? "Sending..." : "Send OTP"}
      </Btn>
    </div>
  );
}
