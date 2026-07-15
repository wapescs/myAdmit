import { AIAdvisorShowcase } from "./AIAdvisorShowcase";
import { AIAdvisorFeatureList } from "./AIAdvisorFeatureList";

export function AIAdvisorSection() {
  return (
    <section className="py-24">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AIAdvisorShowcase />
          <AIAdvisorFeatureList />
        </div>
      </div>
    </section>
  );
}
