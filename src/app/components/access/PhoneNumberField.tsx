"use client";

import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COUNTRY_DIAL_CODES, sanitizeDigits, type PhoneFieldValue } from "@/constants/phoneCountryCodes";

export function PhoneNumberField({
  value,
  onChange,
  disabled,
}: {
  value: PhoneFieldValue;
  onChange: (value: PhoneFieldValue) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex gap-2">
      <Select
        value={value.iso}
        onValueChange={(iso) => {
          if (iso) onChange({ ...value, iso });
        }}
        disabled={disabled}
      >
        <SelectTrigger className="w-[110px] shrink-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {COUNTRY_DIAL_CODES.map((c) => (
            <SelectItem key={c.iso} value={c.iso}>
              {c.flag} {c.dial}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="tel"
        inputMode="numeric"
        placeholder="98765 43210"
        value={value.digits}
        onChange={(e) => onChange({ ...value, digits: sanitizeDigits(e.target.value) })}
        disabled={disabled}
        className="flex-1"
      />
    </div>
  );
}
