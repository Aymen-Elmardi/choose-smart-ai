'use client'
import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CpAmbient from "@/components/home/CpAmbient";
import CpHero from "@/components/home/CpHero";
import { useCpReveal } from "@/components/home/useCpReveal";
import { useCanonical } from "@/hooks/useCanonical";

// Below-fold sections stay lazy, as before.
const CpProblem = lazy(() => import("@/components/home/CpProblem"));
const CpHowItWorks = lazy(() => import("@/components/home/CpHowItWorks"));
const CpChoose = lazy(() => import("@/components/home/CpChoose"));
const CpWhyUs = lazy(() => import("@/components/home/CpWhyUs"));
const CpUseCases = lazy(() => import("@/components/home/CpUseCases"));
const CpLatestInsights = lazy(() => import("@/components/home/CpLatestInsights"));
const CpFaq = lazy(() => import("@/components/home/CpFaq"));
const CpFinalCta = lazy(() => import("@/components/home/CpFinalCta"));

const Index = () => {
  useCanonical();
  useCpReveal();


  return (
    <div className="cp-page min-h-screen">
      <CpAmbient />
      <Header />
      <main>
        <CpHero />
        <Suspense fallback={null}>
          <CpProblem />
          <CpHowItWorks />
          <CpChoose />
          <CpWhyUs />
          <CpUseCases />
          <CpLatestInsights />
          <CpFaq />
          <CpFinalCta />
        </Suspense>
      </main>
      <Footer
        tagline="Independent payment advisory for US businesses"
        newsletter={{
          heading: "Get our payments notes",
          body: "One short email a month on fees, freezes and processor changes that affect US merchants.",
        }}
      />
    </div>
  );
};

export default Index;
