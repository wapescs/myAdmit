"use client";

import type { Application } from "@/types/dashboard.types";

const STATUS_STYLES: Record<string, string> = {
  Submitted: "bg-[#2E7D32]/10 text-[#2E7D32]",
  "In Progress": "bg-[#CFA56A]/10 text-[#CFA56A]",
};

export function ApplicationRow({ app }: { app: Application }) {
  const statusClass = STATUS_STYLES[app.status] ?? "bg-[#F9A825]/10 text-[#F9A825]";

  return (
    <div className="flex items-center gap-4 px-6 py-4 hover:bg-[#FAF6EE] dark:hover:bg-[#2E1A12] transition-all">
      <span className="text-2xl">{app.flag}</span>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-[#333333] dark:text-[#F5EDE0] text-sm">{app.uni}</div>
        <div className="text-xs text-[#666666]">{app.prog}</div>
      </div>
      <span className={`hidden md:inline-flex text-xs px-2.5 py-1 rounded-full font-semibold ${statusClass}`}>
        {app.status}
      </span>
      <div className="hidden lg:flex flex-col items-end gap-1.5 w-36">
        <div className="text-xs text-[#666666]">Deadline: {app.deadline}</div>
        <div className="w-full h-1.5 bg-[#E8DDD0] rounded-full">
          <div className={`h-full rounded-full ${app.pct === 100 ? "bg-[#2E7D32]" : "bg-[#8B2626]"}`} style={{ width: `${app.pct}%` }} />
        </div>
      </div>
      <div className="text-xs font-bold text-[#333333] dark:text-[#F5EDE0] w-8 text-right">{app.pct}%</div>
    </div>
  );
}
