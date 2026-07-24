"use client";

import { useState } from "react";
import { CalendarClock, ShieldCheck, Sparkles } from "lucide-react";
import { Btn } from "@/app/components/common/Btn";
import { OtpEntry } from "./OtpEntry";
import { PhoneNumberField } from "./PhoneNumberField";
import { useAccess } from "@/lib/access/AccessProvider";
import { EMPTY_PHONE_VALUE, isValidPhoneValue, toE164, type PhoneFieldValue } from "@/constants/phoneCountryCodes";

const BENEFITS = [
  { icon: CalendarClock, text: "Skip this step later when you unlock full access or book a counseling session." },
  { icon: ShieldCheck, text: "Keep your account more secure and easier to recover." },
  { icon: Sparkles, text: "A faster, smoother experience across the platform." },
];

// Shared by EmailLoginModal (right after login) and the profile wizard's last
// step. Verifying here only marks phone as verified — it does not by itself
// grant full access; see AccessProvider/useUpgradeFlow for that gate.
export function OptionalPhoneVerifyStep({ onDone }: { onDone: () => void }) {
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

  return (
    <div className="space-y-4">
      <div className="space-y-2 rounded-xl bg-[#FAF6EE] dark:bg-[#2E1A12] p-3.5">
        {BENEFITS.map((b) => (
          <div key={b.text} className="flex items-start gap-2 text-xs text-[#666666] dark:text-neutral-400">
            <b.icon size={14} className="mt-0.5 shrink-0 text-[#8B2626]" />
            {b.text}
          </div>
        ))}
      </div>

      {otpSent ? (
        <OtpEntry
          destination={toE164(phone)}
          verify={(code) => verifyPhoneOtp(toE164(phone), code)}
          onVerified={onDone}
          resend={() => sendPhoneOtp(toE164(phone))}
        />
      ) : (
        <div className="space-y-3">
          <PhoneNumberField value={phone} onChange={setPhone} disabled={sending} />
          <Btn onClick={handleSendOtp} disabled={!isValidPhoneValue(phone) || sending} className="w-full">
            {sending ? "Sending..." : "Verify Phone"}
          </Btn>
        </div>
      )}

      <button
        type="button"
        onClick={onDone}
        className="text-xs text-[#666666] hover:text-[#8B2626] underline w-full text-center"
      >
        Skip for now
      </button>
    </div>
  );
}
