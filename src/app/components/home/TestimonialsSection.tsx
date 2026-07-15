import { TestimonialCard } from "./TestimonialCard";
import { TESTIMONIALS } from "@/constants/testimonials";
import { serif } from "@/styles/typography";

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-white dark:bg-[#1F1208]">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-sm font-semibold text-[#8B2626] mb-2 uppercase tracking-wider">Success Stories</div>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#333333] dark:text-[#F5EDE0]" style={serif}>Students Who Made It Abroad</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} delay={i * 0.14} />
          ))}
        </div>
      </div>
    </section>
  );
}
