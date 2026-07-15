"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { GraduationCap, Menu, X } from "lucide-react";
import { NavLinks } from "./NavLinks";
import { NavbarActions } from "./NavbarActions";
import { NavMobileMenu } from "./NavMobileMenu";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { serif } from "@/styles/typography";

export function Navbar() {
  const [mobile, setMobile] = useState(false);
  const scrolled = useScrollPosition(24);

  return (
    <motion.header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 dark:bg-[#1A0E0A]/95 backdrop-blur-xl border-b border-[#E8DDD0] dark:border-[#E8DDD0]/10 shadow-sm" : ""}`}
      initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8 flex items-center justify-between h-16 lg:h-20">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-[#8B2626] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <GraduationCap size={18} className="text-white" />
          </div>
          <span className="text-xl font-bold text-[#333333] dark:text-[#F5EDE0] tracking-tight" style={serif}>
            My<span className="text-[#8B2626]">Admit</span>
          </span>
        </Link>

        <NavLinks />

        <NavbarActions />

        <button onClick={() => setMobile(!mobile)} className="lg:hidden p-2 rounded-xl text-[#666666] hover:bg-black/5">
          {mobile ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <NavMobileMenu open={mobile} onClose={() => setMobile(false)} />
    </motion.header>
  );
}
