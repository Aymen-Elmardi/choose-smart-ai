import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SuccessPreviewSection from "@/components/SuccessPreviewSection";
import WhyDifferentSection from "@/components/WhyDifferentSection";
import ProblemSection from "@/components/ProblemSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ValuePropsSection from "@/components/ValuePropsSection";
import ExamplesSection from "@/components/ExamplesSection";
import InsightsPreviewSection from "@/components/InsightsPreviewSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { useCanonical } from "@/hooks/useCanonical";
import { useSEO } from "@/hooks/useSEO";

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
        <SuccessPreviewSection />
        <WhyDifferentSection />
        <ProblemSection />
        <HowItWorksSection />
        <ValuePropsSection />
        <ExamplesSection />
        <InsightsPreviewSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
