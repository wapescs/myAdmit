import { User, Bot, Calendar, GraduationCap, FileText, Shield, Globe } from "lucide-react";
import type { ProcessStep } from "@/types/process.types";

export const PROCESS_STEPS: ProcessStep[] = [
  { step: 1, title: "Create Profile", desc: "Tell us about your academics, goals, and preferences", icon: User },
  { step: 2, title: "AI Assessment", desc: "Our AI analyzes your profile and identifies the best match universities", icon: Bot },
  { step: 3, title: "Book Counselor", desc: "Schedule a 1-on-1 session with a certified education counselor", icon: Calendar },
  { step: 4, title: "Shortlist Universities", desc: "Receive a personalized list of dream, reach, and safe universities", icon: GraduationCap },
  { step: 5, title: "Submit Applications", desc: "Get expert help crafting SOPs, LORs, and application forms", icon: FileText },
  { step: 6, title: "Visa Guidance", desc: "Complete visa documentation with expert guidance and mock interviews", icon: Shield },
  { step: 7, title: "Fly Abroad", desc: "Pre-departure briefing and alumni connect in your destination", icon: Globe },
];
