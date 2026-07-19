import { Star } from "lucide-react";
import type { Testimonial } from "@/types/testimonial.types";

const COUNTRY_NAMES: Record<string, string> = {
  "🇨🇦": "Canada",
  "🇩🇪": "Germany",
  "🇦🇺": "Australia",
  "🇺🇸": "United States",
  "🇬🇧": "United Kingdom",
};

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const country = COUNTRY_NAMES[testimonial.countryFlag];

  return (
    <figure className="group relative w-[85vw] max-w-[320px] shrink-0 overflow-hidden rounded-3xl border border-[#E8DDD0] bg-[#FAF6EE] p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#8B2626]/30 sm:w-[360px] dark:border-white/10 dark:bg-[#2E1A12]">
      {/* Decorative accent */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#8B2626]/5 blur-2xl transition-transform duration-500 group-hover:scale-125" />

      <div className="relative z-10">
        <div
          className="mb-4 flex gap-0.5"
          role="img"
          aria-label={`${testimonial.rating} out of 5 stars`}
        >
          {Array.from({ length: testimonial.rating }).map((_, j) => (
            <Star key={j} size={15} className="fill-[#CFA56A] text-[#CFA56A]" />
          ))}
        </div>

        <blockquote className="mb-6 text-sm italic leading-relaxed text-[#333333] dark:text-[#F5EDE0]">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>

        <figcaption className="flex items-center gap-3 border-t border-[#E8DDD0] pt-5 dark:border-white/10">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="h-11 w-11 shrink-0 rounded-full bg-[#EDE8DF] object-cover ring-2 ring-white dark:ring-[#241410]"
          />
          <div className="min-w-0 flex-1">
            <div className="text-sm font-bold text-[#333333] dark:text-[#F5EDE0]">
              {testimonial.name}
            </div>
            <div className="truncate text-xs text-[#666666] dark:text-neutral-400">
              {testimonial.program} · {testimonial.university}
            </div>
          </div>
          {country && (
            <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-[#8B2626]/15 bg-[#8B2626]/[0.08] px-2.5 py-1 text-[11px] font-semibold text-[#8B2626] dark:border-white/10 dark:bg-white/5">
              <span className="text-sm leading-none">{testimonial.countryFlag}</span>
              {country}
            </span>
          )}
        </figcaption>
      </div>
    </figure>
  );
}
