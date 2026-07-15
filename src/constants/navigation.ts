import { Twitter, Linkedin, Instagram, Facebook, Youtube } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { NavLink } from "@/types/navigation.types";

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Universities", href: "/comparison" },
  { label: "Scholarships (DEV)", href: "/scholarships" }, // TODO: Remove this after development
  { label: "AI Advisor", href: "/chat" },
  { label: "Counseling", href: "/booking" },
];

export const FOOTER_PLATFORM_LINKS: NavLink[] = [
  { label: "Universities", href: "/comparison" },
  { label: "Scholarships", href: "/scholarships" },
  { label: "AI Advisor", href: "/chat" },
  { label: "Book Counseling", href: "/booking" },
  { label: "Dashboard", href: "/dashboard" },
];

export const FOOTER_SOCIAL_ICONS: LucideIcon[] = [Twitter, Linkedin, Instagram, Facebook, Youtube];

export const FOOTER_LEGAL_LINKS = ["Privacy Policy", "Terms of Service", "Cookie Policy"];
