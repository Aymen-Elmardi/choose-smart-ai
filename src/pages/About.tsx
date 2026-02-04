import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const About = () => {
  useSEO({
    title: "Independent Payment Advisory | Why ChosePayments is Different",
    description: "We're not a comparison site. ChosePayments provides expert risk assessment and strategic guidance, helping businesses avoid payment provider mismatch before it costs them.",
    keywords: ["independent payment advisory", "payment risk assessment", "payment strategy", "ChosePayments"],
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="section-container">
          <article className="max-w-2xl mx-auto space-y-12">
            
            <header>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                ChosePayments: The Missing Layer in Payment Strategy
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                ChosePayments was founded to solve a systemic issue within the payments industry: the recurring cycle of high potential businesses being matched with the wrong providers, only to face the consequences months later.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Having spent years at the intersection of payment operations, risk management, onboarding, and merchant support, I have witnessed the same patterns play out repeatedly. I have seen businesses celebrate rapid approvals only to have their funds frozen weeks later. I have seen accounts rejected without explanation and merchants blamed for operational issues that were entirely predictable from the outset, had the right questions been asked.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Most payment failures are not the result of merchant error. They are the result of a fundamental mismatch between a business's operational reality and a provider's risk appetite.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                ChosePayments exists to bridge that gap.
              </p>
            </header>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Why This Exists: Beyond the Comparison Table
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Choosing a payment provider is not a simple comparison exercise. It is a critical risk decision.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Yet, most businesses are forced to make this choice based on superficial criteria:
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed mt-4 space-y-2">
                <li>Polished marketing pages and headline pricing.</li>
                <li>Generic advice from parties who benefit financially from the referral.</li>
                <li>A lack of transparency regarding why providers approve some and reject others.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Very few resources explain the "why" behind account reviews, the mechanics of post onboarding freezes, or why switching providers can often exacerbate existing problems.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                I built ChosePayments to serve as a decision filter, not a marketplace, directory, or sales funnel. We are the objective layer between your business and the complex world of payment processing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                How ChosePayments Works: Operational Intelligence
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We utilize a targeted assessment designed to understand how your business actually operates, moving beyond surface-level marketing.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4 font-medium">
                Our analysis focuses on:
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed mt-4 space-y-2">
                <li>Transaction Dynamics: How and where payments are captured.</li>
                <li>Geographic Footprint: The location and behavior of your customer base.</li>
                <li>Structural Complexity: Business hierarchy and growth trajectories.</li>
                <li>Risk Signals: The specific indicators that providers monitor but rarely disclose.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                From this data, we identify the providers capable of supporting your business for the long term. Sometimes this leads to a clear recommendation. Other times, it results in a "not yet" or a recommendation to pivot.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                In our view, saying "no" is as valuable a service as saying "yes."
              </p>
            </section>

            {/* Independence Guarantee Callout */}
            <section className="bg-primary/5 border border-primary/20 rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Our Independence Guarantee
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p className="font-medium text-foreground">
                  No provider can pay to influence our assessments or suppress information.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="text-primary">✓</span>
                    <span>We are not a payment institution, bank, acquirer, card scheme, or processor.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary">✓</span>
                    <span>We do not process payments, hold merchant funds, or make final approval decisions.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary">✓</span>
                    <span>We say "not yet" when that's the right answer — many assessments result in no introduction.</span>
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground/80 mt-4">
                  All final underwriting and approval decisions remain with the respective payment providers and financial institutions. Our insights are grounded in real-world operational experience, intended to inform and guide, not to replace professional legal or financial counsel.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Our Business Model: Aligned Incentives
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                ChosePayments is compensated through introductory fees from payment providers when a business establishes a successful commercial relationship through our introduction.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Crucially, this model does not influence:
              </p>
              <ol className="list-decimal list-inside text-muted-foreground leading-relaxed mt-4 space-y-2">
                <li>Which providers we consider for your business.</li>
                <li>How we assess suitability.</li>
                <li>Whether an introduction is made at all.</li>
              </ol>
              <p className="text-muted-foreground leading-relaxed mt-4">
                In fact, many of our assessments result in no introduction. We do not charge businesses to use our platform because our incentives are aligned with sustainable outcomes. Providers value well matched, long term clients, and businesses benefit from fewer disruptions, reduced reviews, and a stable processing environment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                The Expertise Behind the Platform
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                I built ChosePayments after years of working deep within the payments ecosystem. This platform is the distillation of practical, hands on experience, not theoretical models. I have seen where the friction points are, and I built this to help you avoid them.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                For a detailed look at my professional background, you can connect with me on{" "}
                <a 
                  href="https://www.linkedin.com/in/aymen-elmardi-3a15b6b2/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  LinkedIn
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                What ChosePayments Is, and What It Is Not
              </h2>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-muted/50 rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-4">ChosePayments IS</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>A strategic decision support layer</li>
                    <li>A proactive risk filter</li>
                    <li>A roadmap to avoid predictable failures</li>
                  </ul>
                </div>
                <div className="bg-muted/50 rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-4">ChosePayments IS NOT</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>A generic comparison table</li>
                    <li>A high volume lead marketplace</li>
                    <li>A guarantee of account approval</li>
                  </ul>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mt-6">
                If the right answer for your business is to wait, simplify your operations, or change direction, that is exactly the answer we will provide.
              </p>
            </section>

          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
