"use client";

import { ApplicationRow } from "./ApplicationRow";
import { DASHBOARD_APPLICATIONS } from "@/constants/dashboard";
import { serif } from "@/styles/typography";

export function ApplicationsList() {
  return (
    <div className="bg-white dark:bg-[#241410] rounded-[24px] border border-[#E8DDD0] dark:border-white/8 mb-6 overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-[#E8DDD0] dark:border-white/8">
        <h2 className="font-bold text-[#333333] dark:text-[#F5EDE0]" style={serif}>My Applications</h2>
        <button className="text-xs text-[#8B2626] font-semibold hover:underline">View All</button>
      </div>
      <div className="divide-y divide-[#E8DDD0] dark:divide-white/8">
        {DASHBOARD_APPLICATIONS.map((app, i) => (
          <ApplicationRow key={i} app={app} />
        ))}
      </div>
    </div>
  );
}
