import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import { useCanonical } from "@/hooks/useCanonical";
import { useSEO } from "@/hooks/useSEO";

// Lazy-load below-fold sections to reduce initial JS bundle (~50+ KiB saving)
const SuccessPreviewSection = lazy(() => import("@/components/SuccessPreviewSection"));
const WhyDifferentSection = lazy(() => import("@/components/WhyDifferentSection"));
const ProblemSection = lazy(() => import("@/components/ProblemSection"));
const HowItWorksSection = lazy(() => import("@/components/HowItWorksSection"));
const ValuePropsSection = lazy(() => import("@/components/ValuePropsSection"));
const ExamplesSection = lazy(() => import("@/components/ExamplesSection"));
const InsightsPreviewSection = lazy(() => import("@/components/InsightsPreviewSection"));
const CTASection = lazy(() => import("@/components/CTASection"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  useCanonical();

  useSEO({
    title: "Payment Strategy Review for High-Volume Merchants | ChosePayments",
    description:
      "Fixed-scope payment infrastructure audit for merchants processing £1M+. Fee benchmarking, acceptance optimisation, risk profiling, and architecture recommendations.",
    ogType: "website",
    keywords: [
      "payment strategy review",
      "payment infrastructure audit",
      "enterprise payment consulting",
      "payment fee optimisation",
      "payment advisory UK",
    ],
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <Suspense fallback={null}>
          <SuccessPreviewSection />
          <WhyDifferentSection />
          <ProblemSection />
          <HowItWorksSection />
          <ValuePropsSection />
          <ExamplesSection />
          <InsightsPreviewSection />
          <CTASection />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
