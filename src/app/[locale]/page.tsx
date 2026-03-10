import HeroSection from "@/components/sections/home/HeroSection";
import TrustedBySection from "@/components/sections/home/TrustedBySection";
import LogosSection from "@/components/sections/home/LogosSection";
import FeaturedPropertiesSection from "@/components/sections/home/FeaturedPropertiesSection";
import OfficeSpotlightSection from "@/components/sections/home/OfficeSpotlightSection";
import PeaceOfMindSection from "@/components/sections/home/PeaceOfMindSection";
import WorkspaceInquirySection from "@/components/sections/home/WorkspaceInquirySection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <TrustedBySection />
      <LogosSection />
      <FeaturedPropertiesSection />
      <OfficeSpotlightSection />
      <PeaceOfMindSection />
      <WorkspaceInquirySection />
    </main>
  );
}
