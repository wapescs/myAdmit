"use client";

import { motion } from "motion/react";
import { HelpCircle } from "lucide-react";
import { serif } from "@/styles/typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import type { FAQItem } from "@/types/university";

/**
 * FAQ data isn't returned by the university API yet (reserved for a future
 * backend field) — this component is intentionally dumb: it just renders
 * whatever `faqs` it's given, and renders nothing at all when there's
 * nothing to show, so the detail page keeps working with or without it.
 */
export function UniversityFAQ({ faqs }: { faqs?: FAQItem[] }) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-[#241410] rounded-[24px] p-6 border border-[#E8DDD0] dark:border-white/8"
    >
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-lg bg-[#8B2626]/10 flex items-center justify-center">
          <HelpCircle size={16} className="text-[#8B2626]" />
        </div>
        <h2 className="font-bold text-[#333333] dark:text-[#F5EDE0] text-xl" style={serif}>
          Frequently Asked Questions
        </h2>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, i) => (
          <AccordionItem
            key={`${i}-${faq.question}`}
            value={`faq-${i}`}
            className="border-[#E8DDD0] dark:border-white/8"
          >
            <AccordionTrigger className="text-sm font-semibold text-[#333333] dark:text-[#F5EDE0] hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-[#666666] leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.div>
  );
}
