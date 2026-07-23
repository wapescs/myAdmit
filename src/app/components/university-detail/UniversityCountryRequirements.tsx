"use client";

import { Globe2 } from "lucide-react";
import { serif } from "@/styles/typography";
import { cleanLabel, formatPrimitive, hasRenderableContent, isPlainObject } from "@/utils/dynamic-fields.util";
import type { CountrySpecificData } from "@/types/university";

/**
 * Different countries carry entirely different fields here (see the
 * CountrySpecificData doc comment in src/types/university.ts) — Dubai has
 * offer-turnaround/English-requirement/payment fields, Australia has
 * application-process/document fields, and neither set overlaps. Rather
 * than assume a shape, this renders whatever keys+values a given country's
 * data actually has, generically and recursively.
 */

function FieldRow({ label, value }: { label: string; value: unknown }) {
  if (isPlainObject(value)) {
    const subEntries = Object.entries(value).filter(([, v]) => hasRenderableContent(v));
    if (subEntries.length === 0) return null;
    return (
      <div>
        <div className="text-[11px] font-semibold text-[#8B2626] uppercase tracking-wide mb-1.5">{cleanLabel(label)}</div>
        <div className="pl-3 border-l-2 border-[#E8DDD0] dark:border-white/10 space-y-1.5">
          {subEntries.map(([k, v]) => <FieldRow key={k} label={k} value={v} />)}
        </div>
      </div>
    );
  }

  const formatted = formatPrimitive(value);
  if (formatted === null) return null;

  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-xs text-[#666666] shrink-0">{cleanLabel(label)}</span>
      <span className="text-xs font-medium text-[#333333] dark:text-[#F5EDE0] text-right whitespace-pre-line">{formatted}</span>
    </div>
  );
}

function CountryBlock({ country, data }: { country: string; data: CountrySpecificData }) {
  const entries = Object.entries(data).filter(([, value]) => hasRenderableContent(value));
  if (entries.length === 0) return null;

  return (
    <div className="rounded-2xl border border-[#E8DDD0] dark:border-white/8 p-4">
      <div className="flex items-center gap-2 mb-3">
        <Globe2 size={15} className="text-[#8B2626]" />
        <h3 className="font-bold text-[#333333] dark:text-[#F5EDE0] text-sm">{country}</h3>
      </div>
      <div className="space-y-3">
        {entries.map(([key, value]) => <FieldRow key={key} label={key} value={value} />)}
      </div>
    </div>
  );
}

export function UniversityCountryRequirements({
  countrySpecificData,
}: {
  countrySpecificData?: Record<string, CountrySpecificData>;
}) {
  const countries = Object.entries(countrySpecificData ?? {}).filter(
    ([, data]) => Object.values(data).some(hasRenderableContent)
  );
  if (countries.length === 0) return null;

  return (
    <div className="bg-white dark:bg-[#241410] rounded-[24px] p-6 border border-[#E8DDD0] dark:border-white/8">
      <h2 className="font-bold text-[#333333] dark:text-[#F5EDE0] text-xl mb-4" style={serif}>Country-Specific Requirements</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {countries.map(([country, data]) => <CountryBlock key={country} country={country} data={data} />)}
      </div>
    </div>
  );
}
