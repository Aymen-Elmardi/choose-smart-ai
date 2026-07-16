'use client'
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
const SocialProofSection = lazy(() => import("@/components/SocialProofSection"));
const InsightsPreviewSection = lazy(() => import("@/components/InsightsPreviewSection"));
const ValuePropsSection = lazy(() => import("@/components/ValuePropsSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const ContactCTASection = lazy(() => import("@/components/ContactCTASection"));
const CTASection = lazy(() => import("@/components/CTASection"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  useCanonical();

  useSEO({
    title: "ChosePayments: Free Payment Processor Matching for US and UK Businesses",
    description:
      "Stop overpaying. Stop getting frozen. ChosePayments matches your business to the right payment processor for free. US, UK and EU coverage across all industries.",
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
          <SocialProofSection />
          <ValuePropsSection />
          <InsightsPreviewSection />
          <FAQSection />
          <ContactCTASection />
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
