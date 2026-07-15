import { Bookmark, FileText, Calendar, Award, LayoutDashboard, Bot, Upload, CreditCard, User, Settings } from "lucide-react";
import type { DashboardStat, Application, DashboardNavItem } from "@/types/dashboard.types";

export const DASHBOARD_STATS: DashboardStat[] = [
  { label: "Saved Universities", value: "12", icon: Bookmark, color: "bg-[#8B2626]/10 text-[#8B2626]" },
  { label: "Applications", value: "3", icon: FileText, color: "bg-[#CFA56A]/10 text-[#CFA56A]" },
  { label: "Upcoming Deadlines", value: "5", icon: Calendar, color: "bg-[#F9A825]/10 text-[#F9A825]" },
  { label: "Scholarships Found", value: "8", icon: Award, color: "bg-[#2E7D32]/10 text-[#2E7D32]" },
];

export const DASHBOARD_APPLICATIONS: Application[] = [
  { uni: "University of Toronto", prog: "MBA", status: "In Progress", deadline: "Jan 15", flag: "🇨🇦", pct: 65 },
  { uni: "TU Munich", prog: "M.Sc. CS", status: "Documents Pending", deadline: "Dec 1", flag: "🇩🇪", pct: 30 },
  { uni: "University of Melbourne", prog: "M.Eng", status: "Submitted", deadline: "Nov 30", flag: "🇦🇺", pct: 100 },
];

export const DASHBOARD_NAV_ITEMS: DashboardNavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Saved Universities", icon: Bookmark },
  { label: "Applications", icon: FileText },
  { label: "Scholarships", icon: Award, href: "/scholarships" },
  { label: "AI Advisor", icon: Bot, href: "/chat" },
  { label: "Documents", icon: Upload },
  { label: "Counseling", icon: Calendar, href: "/booking" },
  { label: "Payments", icon: CreditCard },
  { label: "Profile", icon: User, href: "/profile" },
  { label: "Settings", icon: Settings },
];
