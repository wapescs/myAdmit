import { FooterBrand } from "./FooterBrand";
import { FooterLinksColumn } from "./FooterLinksColumn";
import { FooterNewsletter } from "./FooterNewsletter";
import { FooterBottomBar } from "./FooterBottomBar";
import { FOOTER_PLATFORM_LINKS } from "@/constants/navigation";
import { COUNTRIES } from "@/constants/countries";
import type { FooterLinkItem } from "@/types/navigation.types";

export function Footer() {
  const destinationLinks: FooterLinkItem[] = COUNTRIES.map(c => ({ label: `${c.flag} ${c.name}` }));

  return (
    <footer className="bg-[#2A1A10] text-white py-16">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <FooterBrand />
          <FooterLinksColumn title="Platform" links={FOOTER_PLATFORM_LINKS} />
          <FooterLinksColumn title="Study Destinations" links={destinationLinks} />
          <FooterNewsletter />
        </div>
        <FooterBottomBar />
      </div>
    </footer>
  );
}
