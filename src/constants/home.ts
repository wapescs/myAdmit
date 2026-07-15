import { Target, BarChart2, Award, Shield, FileText, Globe } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const HERO_STATS = [
  { value: "500+", label: "Universities" },
  { value: "50+", label: "Countries" },
  { value: "10K+", label: "Students Helped" },
  { value: "95%", label: "Success Rate" },
];

export const AI_ADVISOR_FEATURES: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Target, title: "Personalized Recommendations", desc: "Universities matched exactly to your profile" },
  { icon: BarChart2, title: "Admission Probability", desc: "Know your chances with AI-powered prediction" },
  { icon: Award, title: "Scholarship Matching", desc: "Auto-discover scholarships you qualify for" },
  { icon: Shield, title: "Visa Guidance", desc: "Step-by-step support with document checklist" },
  { icon: FileText, title: "SOP & Essay Help", desc: "AI assistance for compelling application essays" },
  { icon: Globe, title: "24/7 Availability", desc: "Instant answers anytime, anywhere" },
];

export const SEARCH_COUNTRY_OPTIONS = ["All Countries", "USA", "Canada", "UK", "Germany", "Australia", "Ireland", "New Zealand"];
export const SEARCH_COURSE_OPTIONS = ["All Courses", "Engineering", "Business", "Medicine", "Law", "CS", "Arts"];
export const SEARCH_BUDGET_OPTIONS = ["Any Budget", "Under $20K", "$20K–$40K", "$40K–$60K", "$60K+"];
export const SEARCH_POPULAR_TAGS = ["Canada PR Route", "Germany Free Education", "UK Scholarships", "Australia PR", "IELTS Waiver"];
