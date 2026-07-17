"use client";

import Link from "next/link";
import { Search, Bell, User } from "lucide-react";
import { Btn } from "@/app/components/common/Btn";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { useUserState } from "@/app/providers/UserStateProvider";
import { useTheme } from "@/app/providers/ThemeProvider";
import { useAccess } from "@/lib/access/AccessProvider";

export function NavbarActions() {
  const { userState } = useUserState();
  const { openLoginModal } = useAccess();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="hidden lg:flex items-center gap-2">
      <button className="p-2 rounded-xl text-[#666666] hover:text-[#333333] hover:bg-black/5 transition-all"><Search size={18} /></button>
      {userState !== "anonymous" && (
        <button className="p-2 rounded-xl text-[#666666] hover:text-[#333333] hover:bg-black/5 transition-all relative">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#8B2626] rounded-full" />
        </button>
      )}
      <AnimatedThemeToggler
        theme={isDark ? "dark" : "light"}
        onThemeChange={toggleTheme}
        className="p-2 rounded-xl text-[#666666] hover:text-[#333333] hover:bg-black/5 transition-all [&_svg]:w-[18px] [&_svg]:h-[18px]"
      />
      {userState === "anonymous" ? (
        <>
          <button onClick={openLoginModal} className="px-4 py-2 text-sm font-medium text-[#333333] hover:text-[#8B2626] transition-colors">Login</button>
          <Link href="/booking"><Btn>Book Counseling</Btn></Link>
        </>
      ) : (
        <Link href="/dashboard" className="flex items-center gap-2 pl-1.5 pr-4 py-1.5 rounded-full bg-[#F3EDE3] hover:bg-[#EDE8DF] transition-all">
          <div className="w-7 h-7 rounded-full bg-[#8B2626] flex items-center justify-center"><User size={13} className="text-white" /></div>
          <span className="text-sm font-semibold text-[#333333]">My Account</span>
        </Link>
      )}
    </div>
  );
}
