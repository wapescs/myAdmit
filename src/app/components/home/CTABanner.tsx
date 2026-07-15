"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { Pill } from "@/app/components/common/Pill";
import { serif } from "@/styles/typography";

export function CTABanner() {
  return (
    <section className="py-20">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-gradient-to-br from-[#8B2626] via-[#6E1E1E] to-[#4A1010] rounded-[32px] p-12 md:p-16 text-white text-center relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/6" />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-[#CFA56A]/12" />
          </div>
          <div className="relative">
            <Pill variant="gold"><Sparkles size={12} />Limited spots available</Pill>
            <h2 className="mt-5 text-3xl md:text-5xl font-bold" style={serif}>Start Your Journey Today</h2>
            <p className="mt-4 text-white/75 text-lg max-w-xl mx-auto">
              Join 10,000+ students who've achieved their dream of studying abroad with MyAdmit's expert AI guidance.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/profile" className="px-8 py-4 bg-white text-[#8B2626] font-bold rounded-xl hover:bg-[#FAF6EE] transition-all text-sm">
                Create Free Profile
              </Link>
              <Link href="/booking" className="px-8 py-4 bg-white/10 border border-white/25 text-white font-semibold rounded-xl hover:bg-white/20 transition-all text-sm">
                Book a Counselor
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
