import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";

// Lazy load các section below-the-fold để giảm initial bundle size
const OverviewSection = lazy(() => import("@/components/OverviewSection"));
const LocationSection = lazy(() => import("@/components/LocationSection"));
const AmenitiesSection = lazy(() => import("@/components/AmenitiesSection"));
const PromotionsSection = lazy(() => import("@/components/PromotionsSection"));
const InvestmentCalculatorSection = lazy(() => import("@/components/InvestmentCalculatorSection"));
const VR360Section = lazy(() => import("@/components/VR360Section"));
const GallerySection = lazy(() => import("@/components/GallerySection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));
const FloatingCTA = lazy(() => import("@/components/FloatingCTA"));

// Skeleton placeholder nhẹ khi section đang load
function SectionSkeleton() {
  return <div className="py-20 lg:py-28 bg-ivory animate-pulse" style={{ minHeight: "200px" }} />;
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero load ngay - above the fold */}
        <HeroSection />
        {/* Các section dưới fold - lazy load */}
        <Suspense fallback={<SectionSkeleton />}>
          <OverviewSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <LocationSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <AmenitiesSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <PromotionsSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <InvestmentCalculatorSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <VR360Section />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <GallerySection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <ContactSection />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <Suspense fallback={null}>
        <FloatingCTA />
      </Suspense>
      {/* Spacer for mobile floating CTA */}
      <div className="h-20 lg:hidden" />
    </div>
  );
}
