"use client";

import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardStats } from "./DashboardStats";
import { ApplicationsList } from "./ApplicationsList";
import { DashboardAIBanner } from "./DashboardAIBanner";
import { serif } from "@/styles/typography";

export function DashboardPage() {
  return (
    
    <div className="flex min-h-screen pt-16 lg:pt-20 bg-[#FAF6EE] dark:bg-[#1A0E0A]">
      <DashboardSidebar />
      <div className="flex-1 p-5 lg:p-8 overflow-auto">
      <h1>Dashboard (DEV)</h1> 
        <div className="max-w-5xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#333333] dark:text-[#F5EDE0]" style={serif}>Good morning, Arjun 👋</h1>
            <p className="text-[#666666] mt-1">Here's your admission journey overview</p>
          </div>
          <DashboardStats />
          {/* <ApplicationsList /> */}
          <DashboardAIBanner />
        </div>
      </div>
    </div>
  );
}
