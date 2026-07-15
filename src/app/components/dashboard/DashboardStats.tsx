"use client";

import { StatCard } from "@/app/components/common/StatCard";
import { DASHBOARD_STATS } from "@/constants/dashboard";

export function DashboardStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {DASHBOARD_STATS.map((s, i) => (
        <StatCard key={s.label} icon={s.icon} label={s.label} value={s.value} colorClass={s.color} delay={i * 0.09} />
      ))}
    </div>
  );
}
