import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SuccessPreviewSection from "@/components/SuccessPreviewSection";
import ProblemSection from "@/components/ProblemSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ValuePropsSection from "@/components/ValuePropsSection";
import SocialProofSection from "@/components/SocialProofSection";
import ExamplesSection from "@/components/ExamplesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { useCanonical } from "@/hooks/useCanonical";
import { useSEO } from "@/hooks/useSEO";

const Index = () => {
  useCanonical();
  
  useSEO({
    title: "Payment Provider Risk Assessment | Independent Advisory | ChosePayments",
    description: "Understand your payment provider fit before you commit. Independent risk assessment for UK businesses — not a comparison site. Expert guidance in 60 seconds.",
    ogType: "website",
    keywords: ["payment provider assessment", "payment risk fit", "independent payment advisory UK", "payment provider guidance", "business payment strategy"],
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <SuccessPreviewSection />
        <ProblemSection />
        <HowItWorksSection />
        <ValuePropsSection />
        <SocialProofSection />
        <ExamplesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
