import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import OverviewSection from "@/components/OverviewSection";
import LocationSection from "@/components/LocationSection";
import AmenitiesSection from "@/components/AmenitiesSection";
import PromotionsSection from "@/components/PromotionsSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <OverviewSection />
        <LocationSection />
        <AmenitiesSection />
        <PromotionsSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingCTA />
      {/* Spacer for mobile floating CTA */}
      <div className="h-20 lg:hidden" />
    </div>
  );
}
