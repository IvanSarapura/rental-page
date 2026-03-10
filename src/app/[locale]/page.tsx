import HeroSection from "@/components/sections/home/HeroSection";
import TrustedBySection from "@/components/sections/home/TrustedBySection";
import LogosSection from "@/components/sections/home/LogosSection";
import FeaturedPropertiesSection from "@/components/sections/home/FeaturedPropertiesSection";
import HighlightsSection from "@/components/sections/home/HighlightsSection/HighlightsSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <TrustedBySection />
      <LogosSection />
      <FeaturedPropertiesSection />
      <HighlightsSection />
    </main>
  );
}
