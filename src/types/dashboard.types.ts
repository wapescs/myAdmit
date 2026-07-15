import type { LucideIcon } from "lucide-react";

export interface DashboardStat {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

export interface Application {
  uni: string;
  prog: string;
  status: string;
  deadline: string;
  flag: string;
  pct: number;
}

export interface DashboardNavItem {
  label: string;
  icon: LucideIcon;
  href?: string;
}
