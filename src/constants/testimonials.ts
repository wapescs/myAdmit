import type { Testimonial } from "@/types/testimonial.types";

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1, name: "Priya Sharma", from: "India", university: "University of Toronto",
    program: "MBA", rating: 5,
    quote: "MyAdmit's AI counselor understood my profile perfectly and recommended universities I hadn't even considered. Got into my dream school with a scholarship!",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b1e3?w=100&h=100&fit=crop&auto=format",
    countryFlag: "🇨🇦",
  },
  {
    id: 2, name: "Arjun Mehta", from: "India", university: "TU Munich",
    program: "M.Sc. Computer Science", rating: 5,
    quote: "The scholarship guidance was incredible. Saved over €15,000 in tuition fees through scholarships I discovered on this platform. Highly recommend!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format",
    countryFlag: "🇩🇪",
  },
  {
    id: 3, name: "Fatima Al-Hassan", from: "Nigeria", university: "University of Melbourne",
    program: "Master of Engineering", rating: 5,
    quote: "From profile creation to visa approval, MyAdmit guided me at every single step. The counselors are world-class and genuinely care about your success.",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&auto=format",
    countryFlag: "🇦🇺",
  },
];
