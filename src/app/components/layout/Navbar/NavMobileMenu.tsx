"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { NAV_LINKS } from "@/constants/navigation";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { useUserState } from "@/app/providers/UserStateProvider";
import { useTheme } from "@/app/providers/ThemeProvider";
import { useAccess } from "@/lib/access/AccessProvider";

export function NavMobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const { userState } = useUserState();
  const { openLoginModal } = useAccess();
  const { isDark, toggleTheme } = useTheme();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-white dark:bg-[#1A0E0A] border-t border-[#E8DDD0] dark:border-white/10 overflow-hidden"
        >
          <div className="px-5 py-4 space-y-1">
            {NAV_LINKS.map(n => (
              <Link key={n.href} href={n.href} onClick={onClose}
                className={`block w-full text-left px-4 py-3 rounded-xl font-medium text-sm transition-all ${pathname === n.href ? "bg-[#8B2626]/8 text-[#8B2626]" : "text-[#333333] hover:bg-[#FAF6EE]"}`}>
                {n.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-[#E8DDD0] dark:border-white/10 flex flex-col gap-2">
              <AnimatedThemeToggler
                theme={isDark ? "dark" : "light"}
                onThemeChange={toggleTheme}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-[#333333] dark:text-[#F5EDE0] border border-[#E8DDD0] dark:border-white/10 rounded-xl hover:bg-[#FAF6EE] dark:hover:bg-white/5 transition-all [&_svg]:w-[16px] [&_svg]:h-[16px]"
              />
              {userState === "anonymous" ? (
                <>
                  <button onClick={() => { openLoginModal(); onClose(); }} className="w-full py-3 text-sm font-semibold text-[#333333] border border-[#E8DDD0] rounded-xl hover:bg-[#FAF6EE]">Login</button>
                  <Link href="/booking" onClick={onClose} className="w-full py-3 text-sm font-semibold text-white bg-[#8B2626] rounded-xl hover:bg-[#6E1E1E] text-center">Book Counseling</Link>
                </>
              ) : (
                <Link href="/dashboard" onClick={onClose} className="w-full py-3 text-sm font-semibold text-white bg-[#8B2626] rounded-xl text-center">My Dashboard</Link>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
