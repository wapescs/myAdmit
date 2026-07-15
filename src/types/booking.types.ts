import type { LucideIcon } from "lucide-react";

export interface Counselor {
  name: string;
  spec: string;
  langs: string[];
  rating: number;
  sessions: number;
  img: string;
}

export interface SessionModeOption {
  label: string;
  icon: LucideIcon;
}
