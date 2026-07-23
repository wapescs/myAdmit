"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { BookOpen, GraduationCap, Sparkles, Globe2, MessageCircleQuestion, Bot } from "lucide-react";
import Link from "next/link";
import { sans } from "@/styles/typography";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/app/components/ui/accordion";
import { cleanLabel, formatPrimitive, hasRenderableContent, isPlainObject } from "@/utils/dynamic-fields.util";
import type { UniversityDetail, CountrySpecificData } from "@/types/university";

function Tile({
  span = 1, icon: Icon, title, children,
}: {
  span?: 1 | 2;
  icon: typeof BookOpen;
  title: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className={`bg-white dark:bg-[#1F1310] rounded-[28px] border border-[#E8DDD0] dark:border-white/8 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_16px_40px_rgba(139,38,38,0.08)] transition-shadow ${span === 2 ? "md:col-span-2" : ""}`}
    >
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#8B2626] to-[#C4443D] flex items-center justify-center shrink-0">
          <Icon size={16} className="text-white" />
        </div>
        <h2 className="font-extrabold text-[#333333] dark:text-[#F5EDE0] text-base" style={sans}>{title}</h2>
      </div>
      {children}
    </motion.div>
  );
}

function FieldRow({ label, value }: { label: string; value: unknown }) {
  if (isPlainObject(value)) {
    const subEntries = Object.entries(value).filter(([, v]) => hasRenderableContent(v));
    if (subEntries.length === 0) return null;
    return (
      <div>
        <div className="text-[10px] font-bold text-[#8B2626] uppercase tracking-wide mb-1.5">{cleanLabel(label)}</div>
        <div className="pl-3 border-l-2 border-[#E8DDD0] dark:border-white/10 space-y-1.5 mb-3">
          {subEntries.map(([k, v]) => <FieldRow key={k} label={k} value={v} />)}
        </div>
      </div>
    );
  }

  const formatted = formatPrimitive(value);
  if (formatted === null) return null;

  return (
    <div className="flex items-start justify-between gap-4 py-1.5">
      <span className="text-xs text-[#666666] shrink-0">{cleanLabel(label)}</span>
      <span className="text-xs font-semibold text-[#333333] dark:text-[#F5EDE0] text-right whitespace-pre-line">{formatted}</span>
    </div>
  );
}

export function ModernBentoGrid({ university }: { university: UniversityDetail }) {
  const universityShortName = university.shortName ?? university.name;
  const programs = university.programs ?? [];
  const academic = university.academicRequirements;
  const academicRows: [string, string][] = [
    academic?.ug && ["Undergraduate", academic.ug],
    academic?.pg && ["Postgraduate", academic.pg],
    academic?.acceptedBacklogs && ["Accepted Backlogs", academic.acceptedBacklogs],
  ].filter((r): r is [string, string] => Boolean(r));

  const countries = Object.entries(university.countrySpecificData ?? {}).filter(
    ([, data]: [string, CountrySpecificData]) => Object.values(data).some(hasRenderableContent)
  );

  const faqs = university.faqs ?? [];

  return (
    <div className="max-w-[1280px] mx-auto px-5 lg:px-8 -mt-10 lg:-mt-14 relative pb-24">
      <div className="grid md:grid-cols-2 gap-5">
        {university.description && (
          <Tile span={2} icon={Sparkles} title={`About ${universityShortName}`}>
            <p className="text-sm text-[#666666] leading-relaxed">{university.description}</p>
          </Tile>
        )}

        {academicRows.length > 0 && (
          <Tile span={academicRows.length > 1 ? 2 : 1} icon={GraduationCap} title="Academic Requirements">
            <div className="space-y-4">
              {academicRows.map(([label, value]) => (
                <div key={label}>
                  <div className="text-[10px] font-bold text-[#8B2626] uppercase tracking-wide mb-1">{label}</div>
                  <p className="text-sm text-[#333333] dark:text-[#F5EDE0] leading-relaxed whitespace-pre-line line-clamp-4">{value}</p>
                </div>
              ))}
            </div>
          </Tile>
        )}

        {programs.length > 0 && (
          <Tile icon={BookOpen} title="Top Programs">
            <div className="flex flex-wrap gap-2">
              {programs.map(p => (
                <span key={p} className="px-3 py-1.5 rounded-full bg-[#FAF6EE] dark:bg-[#2E1A12] border border-[#E8DDD0] dark:border-white/8 text-xs font-medium text-[#333333] dark:text-[#F5EDE0]">
                  {p}
                </span>
              ))}
            </div>
          </Tile>
        )}

        {countries.map(([country, data]) => (
          <Tile key={country} icon={Globe2} title={`${country} Requirements`}>
            <div className="space-y-1">
              {Object.entries(data)
                .filter(([, v]) => hasRenderableContent(v))
                .map(([key, value]) => <FieldRow key={key} label={key} value={value} />)}
            </div>
          </Tile>
        ))}

        {faqs.length > 0 && (
          <Tile span={2} icon={MessageCircleQuestion} title="Frequently Asked Questions">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={`${i}-${faq.question}`} value={`faq-${i}`} className="border-[#E8DDD0] dark:border-white/8">
                  <AccordionTrigger className="text-sm font-semibold text-[#333333] dark:text-[#F5EDE0] hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-[#666666] leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Tile>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
          className="rounded-[28px] bg-gradient-to-br from-[#8B2626] to-[#5C1717] p-6 text-white flex flex-col justify-between"
        >
          <div>
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center mb-4">
              <Bot size={16} />
            </div>
            <h2 className="font-extrabold text-base mb-2" style={sans}>Ask AI about {universityShortName}</h2>
            <p className="text-white/70 text-sm leading-relaxed mb-5">Get instant, personalized answers about admissions, programs, and your chances.</p>
          </div>
          <Link href="/chat" className="inline-flex items-center justify-center py-3 bg-white/15 border border-white/25 rounded-2xl font-semibold text-sm hover:bg-white/25 transition-all">
            Start Chat
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
