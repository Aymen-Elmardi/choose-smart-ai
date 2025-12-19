import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="section-container">
          <article className="max-w-2xl mx-auto space-y-12">
            
            <header>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                About ChosePayments
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Most businesses do not actively choose their payment provider. They default to one.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Usually this happens because a developer recommends it, a sales page looks simple, or it feels like the fastest option at the time. That decision often works early on, but it can quietly become expensive or limiting as the business grows.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                ChosePayments exists to sit before that decision.
              </p>
            </header>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Why we built this
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We are a group of people with hands-on experience across payment processing, fintech, and merchant operations.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Across different roles and companies, we kept seeing the same pattern. Businesses were paying more than they should, or using payment setups that did not truly fit how they sell. Not because they made poor choices, but because payments are opaque, fragmented, and difficult to evaluate objectively.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Important decisions were being made by default, not by design.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Our approach
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We focus on understanding a business before recommending anything.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                That means looking at how you sell or plan to sell, what matters to you right now, and where you are heading next.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                From there, we highlight payment options that fit your situation, rather than what is most popular, most aggressive, or easiest to sell.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                What this is and is not
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                ChosePayments is an independent tool built to reduce confusion around payments and help businesses make calmer, more informed decisions.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                It is not a sales funnel pretending to be advice, and it is not a one-size-fits-all comparison table.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                If you already know exactly what you need, speaking directly to a provider may be the right next step. If you are unsure or early in the process, we aim to give you clarity before the cost of getting it wrong compounds.
              </p>
            </section>

            <footer className="pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Built with input from people who have worked inside payment providers, fintech companies, and merchant operations.
              </p>
            </footer>

          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
