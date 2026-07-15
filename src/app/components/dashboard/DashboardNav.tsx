"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DASHBOARD_NAV_ITEMS } from "@/constants/dashboard";

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-0.5 flex-1">
      {DASHBOARD_NAV_ITEMS.map(item => {
        const active = item.href === pathname;
        const className = `w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${active ? "bg-[#8B2626]/8 text-[#8B2626] font-semibold" : "text-[#666666] hover:bg-[#FAF6EE] dark:hover:bg-[#2E1A12] hover:text-[#333333] dark:hover:text-[#F5EDE0]"}`;
        return item.href ? (
          <Link key={item.label} href={item.href} className={className}>
            <item.icon size={15} />{item.label}
          </Link>
        ) : (
          <button key={item.label} type="button" className={className}>
            <item.icon size={15} />{item.label}
          </button>
        );
      })}
    </nav>
  );
}
