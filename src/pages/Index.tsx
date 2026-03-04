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
    title: "Why Your Payment Provider Is Holding Your Money | ChosePayments",
    description:
      "Funds withheld? Reserve imposed? Fees higher than promised? Understand what payment providers are actually doing, clearly explained.",
    ogType: "website",
    keywords: [
      "payment provider holding money",
      "merchant account problems",
      "payment funds held",
      "payment reserve explained",
      "payment fees explained",
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
