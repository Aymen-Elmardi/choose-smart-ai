import Header from "@/components/Header";
import HeroSectionUS from "@/components/HeroSectionUS";
import ProviderLogosSection from "@/components/ProviderLogosSection";
import ProblemSection from "@/components/ProblemSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ValuePropsSection from "@/components/ValuePropsSection";
import ExamplesSection from "@/components/ExamplesSection";
import CTASectionUS from "@/components/CTASectionUS";
import Footer from "@/components/Footer";

const IndexUS = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSectionUS />
        <ProviderLogosSection />
        <ProblemSection />
        <HowItWorksSection />
        <ValuePropsSection />
        <ExamplesSection />
        <CTASectionUS />
      </main>
      <Footer />
    </div>
  );
};

export default IndexUS;
