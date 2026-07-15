import { HeroSection } from "./HeroSection";
import { SearchSection } from "./SearchSection";
import { FeaturedUniversities } from "./FeaturedUniversities";
import { CountriesSection } from "./CountriesSection";
import { AIAdvisorSection } from "./AIAdvisorSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { ProcessSection } from "./ProcessSection";
import { CTABanner } from "./CTABanner";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <SearchSection />
      <FeaturedUniversities />
      <CountriesSection />
      <AIAdvisorSection />
      <TestimonialsSection />
      <ProcessSection />
      <CTABanner />
    </>
  );
}
