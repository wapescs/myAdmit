import Link from "next/link";
import type { FooterLinkItem } from "@/types/navigation.types";

export function FooterLinksColumn({ title, links }: { title: string; links: FooterLinkItem[] }) {
  return (
    <div>
      <h4 className="font-bold text-xs uppercase tracking-widest mb-5 text-white/45">{title}</h4>
      <ul className="space-y-3">
        {links.map(link => (
          <li key={link.label}>
            {link.href ? (
              <Link href={link.href} className="text-white/60 hover:text-white text-sm transition-colors">{link.label}</Link>
            ) : (
              <button type="button" className="text-white/60 hover:text-white text-sm transition-colors">{link.label}</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
