import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DiagnosticBlock from "@/components/DiagnosticBlock";
import { useCanonical } from "@/hooks/useCanonical";
import { useSEO } from "@/hooks/useSEO";

// Lazy-load below-fold sections
const ExampleOutputPreview = lazy(() => import("@/components/ExampleOutputPreview"));
const HowPaymentsWorkSection = lazy(() => import("@/components/HowPaymentsWorkSection"));
const HardTruthSection = lazy(() => import("@/components/HardTruthSection"));
const InsightsPreviewSection = lazy(() => import("@/components/InsightsPreviewSection"));
const CTASection = lazy(() => import("@/components/CTASection"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  useCanonical();

  useSEO({
    title: "Choose the Right Payment Provider for Your Risk Profile | ChosePayments",
    description:
      "Most merchants choose payment providers based on price. Our engine matches providers to your actual risk profile — industry, volume, and business model.",
    ogType: "website",
    keywords: [
      "payment provider risk profile",
      "best payment processor for my business",
      "payment provider matching",
      "merchant risk assessment",
      "payment provider fit",
    ],
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <DiagnosticBlock />
        <Suspense fallback={null}>
          <ExampleOutputPreview />
          <HowPaymentsWorkSection />
          <HardTruthSection />
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
