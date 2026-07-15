import { GraduationCap } from "lucide-react";
import { serif } from "@/styles/typography";
import { FOOTER_SOCIAL_ICONS } from "@/constants/navigation";

export function FooterBrand() {
  return (
    <div>
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-9 h-9 rounded-xl bg-[#8B2626] flex items-center justify-center"><GraduationCap size={17} className="text-white" /></div>
        <span className="text-xl font-bold" style={serif}>MyAdmit</span>
      </div>
      <p className="text-white/55 text-sm leading-relaxed mb-6">
        AI-powered abroad education counseling platform helping students achieve their international university dreams.
      </p>
      <div className="flex gap-2">
        {FOOTER_SOCIAL_ICONS.map((Icon, i) => (
          <button key={i} type="button" className="w-8 h-8 rounded-xl bg-white/8 flex items-center justify-center hover:bg-[#8B2626] transition-all"><Icon size={13} /></button>
        ))}
      </div>
    </div>
  );
}
