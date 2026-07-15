import { TESTIMONIALS } from "@/constants/testimonials";
import type { Testimonial } from "@/types/testimonial.types";

export async function getTestimonials(): Promise<Testimonial[]> {
  return TESTIMONIALS;
}

export function getTestimonialsSync(): Testimonial[] {
  return TESTIMONIALS;
}
