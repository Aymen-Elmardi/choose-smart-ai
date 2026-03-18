import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DiagnosticBlock from "@/components/DiagnosticBlock";
import { useCanonical } from "@/hooks/useCanonical";
import { useSEO } from "@/hooks/useSEO";

// Lazy-load below-fold sections
const ExampleOutputPreview = lazy(() => import("@/components/ExampleOutputPreview"));
const HowItWorksSection = lazy(() => import("@/components/HowItWorksSection"));
const HowPaymentsWorkSection = lazy(() => import("@/components/HowPaymentsWorkSection"));
const HardTruthSection = lazy(() => import("@/components/HardTruthSection"));
const InsightsPreviewSection = lazy(() => import("@/components/InsightsPreviewSection"));
const ValuePropsSection = lazy(() => import("@/components/ValuePropsSection"));
const CTASection = lazy(() => import("@/components/CTASection"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  useCanonical();

  useSEO({
    title: "Find the Payment Processor That Won't Freeze Your Account | ChosePayments",
    description:
      "Independent matching for high-growth merchants. We align your risk profile with the right provider's appetite — before you apply. Free. No sales calls.",
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
          <HowItWorksSection />
          <HowPaymentsWorkSection />
          <HardTruthSection />
          <ValuePropsSection />
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
