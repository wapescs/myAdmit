import { FOOTER_LEGAL_LINKS } from "@/constants/navigation";

export function FooterBottomBar() {
  return (
    <div className="pt-8 border-t border-white/8 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="text-white/35 text-sm">© 2025 MyAdmit. All rights reserved.</div>
      <div className="flex gap-6">
        {FOOTER_LEGAL_LINKS.map(l => (
          <button key={l} type="button" className="text-white/35 text-sm hover:text-white/70 transition-colors">{l}</button>
        ))}
      </div>
    </div>
  );
}
