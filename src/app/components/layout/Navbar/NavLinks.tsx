"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/constants/navigation";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex items-center gap-1">
      {NAV_LINKS.map(n => (
        <Link
          key={n.href}
          href={n.href}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${pathname === n.href ? "text-[#8B2626] bg-[#8B2626]/8" : "text-[#666666] hover:text-[#333333] hover:bg-black/5"}`}
        >
          {n.label}
        </Link>
      ))}
    </nav>
  );
}
