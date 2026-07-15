"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Search, ChevronDown, Filter } from "lucide-react";
import { Btn } from "@/app/components/common/Btn";
import { serif } from "@/styles/typography";
import { SEARCH_COUNTRY_OPTIONS, SEARCH_COURSE_OPTIONS, SEARCH_BUDGET_OPTIONS, SEARCH_POPULAR_TAGS } from "@/constants/home";

export function SearchSection() {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState(SEARCH_COUNTRY_OPTIONS[0]);
  const [course, setCourse] = useState(SEARCH_COURSE_OPTIONS[0]);
  const [budget, setBudget] = useState(SEARCH_BUDGET_OPTIONS[0]);

  const filters = [
    { label: "Country", val: country, set: setCountry, opts: SEARCH_COUNTRY_OPTIONS },
    { label: "Course", val: course, set: setCourse, opts: SEARCH_COURSE_OPTIONS },
    { label: "Budget", val: budget, set: setBudget, opts: SEARCH_BUDGET_OPTIONS },
  ];

  return (
    <section className="pb-16">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-white dark:bg-[#241410] rounded-[24px] shadow-xl border border-[#E8DDD0] dark:border-white/8 p-7 md:p-9">
          <p className="text-center text-base font-semibold text-[#333333] dark:text-[#F5EDE0] mb-6" style={serif}>
            Search from 500+ universities worldwide
          </p>
          <div className="relative mb-4">
            <Search size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999] pointer-events-none" />
            <input
              value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search universities, courses, or countries..."
              className="w-full pl-12 pr-5 py-3.5 bg-[#FAF6EE] dark:bg-[#2E1A12] border border-[#E8DDD0] dark:border-white/10 rounded-xl text-[#333333] dark:text-[#F5EDE0] placeholder-[#999] focus:outline-none focus:border-[#8B2626]/50 focus:ring-2 focus:ring-[#8B2626]/10 text-sm transition-all"
            />
          </div>
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {filters.map(f => (
                <div key={f.label} className="relative">
                  <select value={f.val} onChange={e => f.set(e.target.value)}
                    className="appearance-none pl-4 pr-8 py-2.5 bg-[#FAF6EE] dark:bg-[#2E1A12] border border-[#E8DDD0] dark:border-white/10 rounded-xl text-sm text-[#333333] dark:text-[#F5EDE0] focus:outline-none cursor-pointer">
                    {f.opts.map(o => <option key={o}>{o}</option>)}
                  </select>
                  <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#999] pointer-events-none" />
                </div>
              ))}
              <button className="flex items-center gap-1.5 pl-4 pr-3 py-2.5 bg-[#FAF6EE] dark:bg-[#2E1A12] border border-[#E8DDD0] rounded-xl text-sm text-[#333333] hover:border-[#8B2626]/40 transition-all">
                <Filter size={13} />More Filters
              </button>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2.5 text-sm text-[#666666] hover:text-[#333333] transition-colors">Reset</button>
              <Btn><Search size={15} />Search</Btn>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-[#E8DDD0] dark:border-white/8">
            <span className="text-xs text-[#999] mr-1 mt-1">Popular:</span>
            {SEARCH_POPULAR_TAGS.map(t => (
              <button key={t} className="px-3 py-1 text-xs text-[#666666] bg-[#FAF6EE] border border-[#E8DDD0] rounded-full hover:border-[#8B2626]/40 hover:text-[#8B2626] transition-all">{t}</button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
