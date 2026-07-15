import { Globe, Users, Building } from "lucide-react";
import type { Counselor, SessionModeOption } from "@/types/booking.types";

export const COUNSELORS: Counselor[] = [
  { name: "Dr. Sarah Mitchell", spec: "USA & Canada", langs: ["English", "Hindi"], rating: 4.9, sessions: 1240, img: "https://images.unsplash.com/photo-1494790108755-2616b612b1e3?w=100&h=100&fit=crop&auto=format" },
  { name: "Prof. James Harrison", spec: "UK & Ireland", langs: ["English"], rating: 4.8, sessions: 980, img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format" },
  { name: "Dr. Anika Patel", spec: "Germany & Europe", langs: ["English", "Hindi"], rating: 4.9, sessions: 1560, img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&auto=format" },
];

export const BOOKING_TIMES = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

export const UNAVAILABLE_DATES = [1, 2, 3, 5, 10, 12, 18, 20, 25, 26, 27];

export const SESSION_MODES: SessionModeOption[] = [
  { label: "Google Meet", icon: Globe },
  { label: "Zoom", icon: Users },
  { label: "Offline", icon: Building },
];

export const BOOKING_CALENDAR_MONTH_LABEL = "July 2025";
export const BOOKING_CALENDAR_DAYS_IN_MONTH = 31;
export const BOOKING_CALENDAR_LEADING_BLANKS = 2;
export const BOOKING_SESSION_FEE = "₹2,999";
