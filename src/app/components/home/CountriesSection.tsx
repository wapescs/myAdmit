"use client";

import { motion } from "motion/react";
import { COUNTRIES } from "@/constants/countries";
import { serif } from "@/styles/typography";

export function CountriesSection() {
  return (
    <section className="py-24 bg-white dark:bg-[#1F1208]">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-sm font-semibold text-[#8B2626] mb-2 uppercase tracking-wider">Destinations</div>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#333333] dark:text-[#F5EDE0] mb-3" style={serif}>Study in Your Dream Country</h2>
          <p className="text-[#666666] max-w-lg mx-auto">Explore education opportunities across the world's most sought-after study destinations</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          {COUNTRIES.map((c, i) => (
            <motion.button key={c.name} initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              whileHover={{ y: -5 }}
              className="bg-[#FAF6EE] dark:bg-[#2E1A12] rounded-[20px] p-4 text-center border border-[#E8DDD0] dark:border-white/8 hover:border-[#8B2626]/40 hover:shadow-lg transition-all group">
              <div className="text-4xl mb-2">{c.flag}</div>
              <div className="font-bold text-[#333333] dark:text-[#F5EDE0] text-sm">{c.name}</div>
              <div className="text-[11px] text-[#666666] mt-0.5">{c.students}</div>
              <div className="text-[11px] text-[#8B2626] font-semibold mt-0.5">{c.topUnis} Unis</div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
