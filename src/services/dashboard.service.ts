import { DASHBOARD_STATS, DASHBOARD_APPLICATIONS } from "@/constants/dashboard";
import type { DashboardStat, Application } from "@/types/dashboard.types";

export async function getDashboardStats(): Promise<DashboardStat[]> {
  return DASHBOARD_STATS;
}

export async function getApplications(): Promise<Application[]> {
  return DASHBOARD_APPLICATIONS;
}

export function getDashboardStatsSync(): DashboardStat[] {
  return DASHBOARD_STATS;
}

export function getApplicationsSync(): Application[] {
  return DASHBOARD_APPLICATIONS;
}
