export interface CountryDialCode {
  iso: string;
  name: string;
  dial: string;
  flag: string;
}

// Curated for a study-abroad audience — India first as the default origin country.
export const COUNTRY_DIAL_CODES: CountryDialCode[] = [
  { iso: "IN", name: "India", dial: "+91", flag: "🇮🇳" },
  { iso: "US", name: "United States", dial: "+1", flag: "🇺🇸" },
  { iso: "CA", name: "Canada", dial: "+1", flag: "🇨🇦" },
  { iso: "GB", name: "United Kingdom", dial: "+44", flag: "🇬🇧" },
  { iso: "AU", name: "Australia", dial: "+61", flag: "🇦🇺" },
  { iso: "DE", name: "Germany", dial: "+49", flag: "🇩🇪" },
  { iso: "IE", name: "Ireland", dial: "+353", flag: "🇮🇪" },
  { iso: "NZ", name: "New Zealand", dial: "+64", flag: "🇳🇿" },
  { iso: "AE", name: "United Arab Emirates", dial: "+971", flag: "🇦🇪" },
  { iso: "SG", name: "Singapore", dial: "+65", flag: "🇸🇬" },
  { iso: "FR", name: "France", dial: "+33", flag: "🇫🇷" },
];

export const DEFAULT_COUNTRY_ISO = "IN";

/** Applied uniformly across every country — see plan notes on this simplification. */
export const MAX_PHONE_DIGITS = 10;

export interface PhoneFieldValue {
  iso: string;
  digits: string;
}

export const EMPTY_PHONE_VALUE: PhoneFieldValue = { iso: DEFAULT_COUNTRY_ISO, digits: "" };

export function getCountryByIso(iso: string): CountryDialCode {
  return COUNTRY_DIAL_CODES.find((c) => c.iso === iso) ?? COUNTRY_DIAL_CODES[0];
}

/** Strips everything but digits and caps at MAX_PHONE_DIGITS — the single enforcement point for the phone input. */
export function sanitizeDigits(raw: string): string {
  return raw.replace(/\D/g, "").slice(0, MAX_PHONE_DIGITS);
}

export function isValidPhoneValue(value: PhoneFieldValue): boolean {
  return value.digits.length === MAX_PHONE_DIGITS;
}

export function toE164(value: PhoneFieldValue): string {
  return `${getCountryByIso(value.iso).dial}${value.digits}`;
}
