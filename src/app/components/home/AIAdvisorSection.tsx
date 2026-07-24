import { AIAdvisorShowcase } from "./AIAdvisorShowcase";
import { AIAdvisorFeatureList } from "./AIAdvisorFeatureList";
import { DotPattern } from "@/components/ui/dot-pattern";

export function AIAdvisorSection() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 -left-40 h-96 w-96 rounded-full bg-[#8B2626]/8 blur-[110px]" />
        <div className="absolute bottom-0 -right-40 h-96 w-96 rounded-full bg-[#CFA56A]/10 blur-[110px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(139,38,38,0.05),transparent)]" />
        <DotPattern width={24} height={24} cr={1} className="fill-[#8B2626]/40 opacity-[0.1] dark:fill-white/30 dark:opacity-[0.05]" />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <AIAdvisorShowcase />
          <AIAdvisorFeatureList />
        </div>
      </div>
    </section>
  );
}
