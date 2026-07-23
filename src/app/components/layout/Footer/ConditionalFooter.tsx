"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

const FOOTER_ROUTES = ["/", "/universities", "/scholarships"];

export function ConditionalFooter() {
  const pathname = usePathname();
  const showFooter = FOOTER_ROUTES.includes(pathname) || pathname.startsWith("/university/");
  return showFooter ? <Footer /> : null;
}
