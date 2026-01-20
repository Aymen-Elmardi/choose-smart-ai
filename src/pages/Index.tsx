import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProviderLogosSection from "@/components/ProviderLogosSection";
import ProblemSection from "@/components/ProblemSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ValuePropsSection from "@/components/ValuePropsSection";
import ExamplesSection from "@/components/ExamplesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { useCanonical } from "@/hooks/useCanonical";
import { useSEO } from "@/hooks/useSEO";

const Index = () => {
  useCanonical();
  
  useSEO({
    title: "Find the Best UK Payment Provider in 60 Seconds | ChosePayments",
    description: "Compare Stripe, PayPal, Square and 20+ UK payment providers. Get a free, personalized recommendation based on your business type. No cost, no obligation.",
    ogType: "website",
    keywords: ["payment provider UK", "payment processor comparison", "best payment gateway UK", "Stripe alternatives UK", "business payment solutions"],
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ProviderLogosSection />
        <ProblemSection />
        <HowItWorksSection />
        <ValuePropsSection />
        <ExamplesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
