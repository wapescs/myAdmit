import { Marquee } from "@/components/ui/marquee";
import { TestimonialCard } from "./TestimonialCard";
import { TESTIMONIALS } from "@/constants/testimonials";
import { serif } from "@/styles/typography";

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-white dark:bg-[#1F1208] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-sm font-semibold text-[#8B2626] mb-2 uppercase tracking-wider">Success Stories</div>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#333333] dark:text-[#F5EDE0]" style={serif}>Students Who Made It Abroad</h2>
        </div>
      </div>

      <div className="relative flex flex-col gap-6">
        <Marquee pauseOnHover className="[--duration:45s] [--gap:1.5rem]">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </Marquee>

        <Marquee reverse pauseOnHover className="hidden md:flex [--duration:50s] [--gap:1.5rem]">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </Marquee>

        {/* Edge fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent dark:from-[#1F1208] sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent dark:from-[#1F1208] sm:w-32" />
      </div>
    </section>
  );
}
