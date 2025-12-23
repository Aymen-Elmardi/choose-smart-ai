import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProviderLogosSection from "@/components/ProviderLogosSection";
import ProblemSection from "@/components/ProblemSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ValuePropsSection from "@/components/ValuePropsSection";
import ExamplesSection from "@/components/ExamplesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const IndexUS = () => {
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

export default IndexUS;
