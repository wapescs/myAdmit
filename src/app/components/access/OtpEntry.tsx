"use client";

import { useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/app/components/ui/input-otp";
import { Btn } from "@/app/components/common/Btn";
import { MOCK_OTP_HINT } from "@/lib/access";

interface OtpEntryProps {
  /** Email or phone number the code was "sent" to. */
  destination: string;
  verify: (code: string) => Promise<boolean>;
  onVerified: () => void;
  resend?: () => Promise<void>;
}

export function OtpEntry({ destination, verify, onVerified, resend }: OtpEntryProps) {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "error">("idle");

  async function handleVerify() {
    setStatus("checking");
    const ok = await verify(code);
    if (ok) {
      onVerified();
    } else {
      setStatus("error");
      setCode("");
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-[#666666]">
        Enter the 6-digit code sent to <span className="font-semibold text-[#333333]">{destination}</span>
      </p>

      <InputOTP maxLength={6} value={code} onChange={setCode}>
        <InputOTPGroup>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <InputOTPSlot key={i} index={i} />
          ))}
        </InputOTPGroup>
      </InputOTP>

      {status === "error" && <p className="text-sm text-[#D32F2F]">Incorrect code. Try again.</p>}

      <p className="text-xs text-[#8B2626] bg-[#8B2626]/5 rounded-lg px-3 py-2">{MOCK_OTP_HINT}</p>

      <Btn onClick={handleVerify} disabled={code.length < 6 || status === "checking"} className="w-full">
        {status === "checking" ? "Verifying..." : "Verify"}
      </Btn>

      {resend && (
        <button
          type="button"
          onClick={() => resend()}
          className="text-xs text-[#666666] hover:text-[#8B2626] underline w-full text-center"
        >
          Resend code
        </button>
      )}
    </div>
  );
}
