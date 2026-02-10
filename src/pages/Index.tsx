import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SuccessPreviewSection from "@/components/SuccessPreviewSection";
import WhyDifferentSection from "@/components/WhyDifferentSection";
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
    title: "Independent Payment Advisory | ChosePayments",
    description:
      "Get independent payment advice for your business. We review your situation and provide honest, human-led guidance on which payment options are most likely to work.",
    ogType: "website",
    keywords: [
      "independent payment advisory",
      "payment advice UK",
      "payment provider guidance",
      "business payment strategy",
      "payment consultant",
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
        {/* <SocialProofSection /> */}
        <ExamplesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
