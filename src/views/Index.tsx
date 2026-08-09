'use client'
import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CpAmbient from "@/components/home/CpAmbient";
import CpHero from "@/components/home/CpHero";
import { useCpReveal } from "@/components/home/useCpReveal";
import { useCanonical } from "@/hooks/useCanonical";
import { useSEO } from "@/hooks/useSEO";

// Below-fold sections stay lazy, as before.
const CpProblem = lazy(() => import("@/components/home/CpProblem"));
const CpHowItWorks = lazy(() => import("@/components/home/CpHowItWorks"));
const CpWhyUs = lazy(() => import("@/components/home/CpWhyUs"));
const CpUseCases = lazy(() => import("@/components/home/CpUseCases"));
const CpLatestInsights = lazy(() => import("@/components/home/CpLatestInsights"));
const CpFaq = lazy(() => import("@/components/home/CpFaq"));
const CpFinalCta = lazy(() => import("@/components/home/CpFinalCta"));

const Index = () => {
  useCanonical();
  useCpReveal();

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
    <div className="cp-page min-h-screen">
      <CpAmbient />
      <Header />
      <main>
        <CpHero />
        <Suspense fallback={null}>
          <CpProblem />
          <CpHowItWorks />
          <CpWhyUs />
          <CpUseCases />
          <CpLatestInsights />
          <CpFaq />
          <CpFinalCta />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
