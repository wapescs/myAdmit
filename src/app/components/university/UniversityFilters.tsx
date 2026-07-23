"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ALL_COUNTRIES = "all";
const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "country-asc", label: "Country (A-Z)" },
  { value: "country-desc", label: "Country (Z-A)" },
];

export function UniversityFilters({ availableCountries }: { availableCountries: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const country = searchParams.get("country") ?? "";
  const sortBy = searchParams.get("sortBy") === "country" ? "country" : "name";
  const sortOrder = searchParams.get("sortOrder") === "desc" ? "desc" : "asc";

  const [searchDraft, setSearchDraft] = useState(search);
  useEffect(() => setSearchDraft(search), [search]);

  const updateParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const next = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value) next.set(key, value);
        else next.delete(key);
      });
      next.set("page", "1"); // any filter change resets pagination
      router.push(`/universities?${next.toString()}`);
    },
    [router, searchParams]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchDraft !== search) updateParams({ search: searchDraft });
    }, 350);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDraft]);

  return (
    <div className="flex flex-wrap gap-3 items-center justify-between mb-8">
      <div className="relative flex-1 min-w-[220px] max-w-md">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#999] pointer-events-none" />
        <input
          value={searchDraft}
          onChange={e => setSearchDraft(e.target.value)}
          placeholder="Search universities..."
          className="w-full pl-10 pr-4 py-2.5 bg-[#FAF6EE] dark:bg-[#2E1A12] border border-[#E8DDD0] dark:border-white/10 rounded-xl text-[#333333] dark:text-[#F5EDE0] placeholder-[#999] focus:outline-none focus:border-[#8B2626]/50 focus:ring-2 focus:ring-[#8B2626]/10 text-sm transition-all"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Select value={country || ALL_COUNTRIES} onValueChange={v => { if (v) updateParams({ country: v === ALL_COUNTRIES ? "" : v }); }}>
          <SelectTrigger size="sm">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_COUNTRIES}>All Countries</SelectItem>
            {availableCountries.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>

        <Select
          value={`${sortBy}-${sortOrder}`}
          onValueChange={v => {
            if (!v) return;
            const [nextSortBy, nextSortOrder] = v.split("-");
            updateParams({ sortBy: nextSortBy, sortOrder: nextSortOrder });
          }}
        >
          <SelectTrigger size="sm">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
