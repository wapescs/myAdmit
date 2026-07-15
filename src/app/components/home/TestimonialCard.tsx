"use client";

import { motion } from "motion/react";
import { Star } from "lucide-react";
import type { Testimonial } from "@/types/testimonial.types";

export function TestimonialCard({ testimonial, delay = 0 }: { testimonial: Testimonial; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay }}
      className="bg-[#FAF6EE] dark:bg-[#2E1A12] rounded-[24px] p-7 border border-[#E8DDD0] dark:border-white/8 hover:shadow-lg hover:-translate-y-1 transition-all">
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, j) => (
          <Star key={j} size={14} className="fill-[#CFA56A] text-[#CFA56A]" />
        ))}
      </div>
      <p className="text-[#333333] dark:text-[#F5EDE0] text-sm leading-relaxed mb-6 italic">"{testimonial.quote}"</p>
      <div className="flex items-center gap-3 pt-4 border-t border-[#E8DDD0] dark:border-white/10">
        <img src={testimonial.image} alt={testimonial.name} className="w-10 h-10 rounded-full object-cover bg-[#EDE8DF]" />
        <div className="flex-1 min-w-0">
          <div className="font-bold text-[#333333] dark:text-[#F5EDE0] text-sm">{testimonial.name}</div>
          <div className="text-xs text-[#666666] truncate">{testimonial.program} · {testimonial.university}</div>
        </div>
        <span className="text-xl">{testimonial.countryFlag}</span>
      </div>
    </motion.div>
  );
}
