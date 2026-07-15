"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";

export function FooterNewsletter() {
  const [email, setEmail] = useState("");

  return (
    <div>
      dev things
      <h4 className="font-bold text-xs uppercase tracking-widest mb-5 text-white/45">Newsletter (DEV)</h4>
      <p className="text-white/55 text-sm mb-4">Get the latest scholarships and admission tips in your inbox. (DEV)</p>
      <div className="flex gap-2">  
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email"
          className="flex-1 px-4 py-2.5 bg-white/8 border border-white/15 rounded-xl text-sm text-white placeholder-white/35 focus:outline-none focus:border-white/30" />
        <button className="px-4 py-2.5 bg-[#8B2626] rounded-xl hover:bg-[#6E1E1E] transition-all flex-shrink-0"><ArrowRight size={16} /></button>
      </div>
      <div className="mt-6 space-y-2">
        <div className="flex items-center gap-2 text-sm text-white/55"><CheckCircle size={13} className="text-[#CFA56A]" />Free forever plan</div>
        <div className="flex items-center gap-2 text-sm text-white/55"><CheckCircle size={13} className="text-[#CFA56A]" />No credit card required</div>
      </div>
    </div>
  );
}
