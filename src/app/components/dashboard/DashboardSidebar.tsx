"use client";

import { LogOut } from "lucide-react";
import { DashboardProfileSummary } from "./DashboardProfileSummary";
import { DashboardProfileProgress } from "./DashboardProfileProgress";
import { DashboardNav } from "./DashboardNav";

export function DashboardSidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-[#241410] border-r border-[#E8DDD0] dark:border-white/8 pt-6 pb-6 px-4">
      <DashboardProfileSummary />
      <DashboardProfileProgress />
      <DashboardNav />
      <button className="flex items-center gap-2 px-3 py-2.5 text-sm text-[#666666] hover:text-[#D32F2F] transition-colors"><LogOut size={15} />Sign Out</button>
    </aside>
  );
}
