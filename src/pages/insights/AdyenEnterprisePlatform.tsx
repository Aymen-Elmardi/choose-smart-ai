import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import FAQSchema from "@/components/FAQSchema";
import InsightsBreadcrumb from "@/components/InsightsBreadcrumb";
import { ArrowRight, CheckCircle2, Building2, Shield, Globe, Users } from "lucide-react";

const AdyenEnterprisePlatform = () => {
  useSEO({
    title: "Adyen: The Single Platform That Rewrote Enterprise Payments | ChosePayments",
    description: "Discover why Adyen's single-platform approach to payments is the choice of enterprise brands. Learn about Interchange++ pricing, dedicated Integration Engineers, and omnichannel capabilities."
  });

  const faqItems = [
    {
      question: "What is Adyen's single platform advantage?",
      answer: "Adyen built a unified platform that acts as the gateway, acquirer, and risk engine across nearly every major market. This eliminates the need for separate providers and contracts, leading to higher authorization rates, true omnichannel capabilities, and simplified reconciliation."
    },
    {
      question: "What is Interchange++ pricing?",
      answer: "Interchange++ is Adyen's transparent pricing model that shows merchants the exact cost breakdown: the card scheme fee, the interchange fee, and Adyen's fixed margin. This replaces opaque 'blended rates' and gives enterprise merchants precise cost control for financial planning."
    },
    {
      question: "How does Adyen's integration support work?",
      answer: "When you onboard with Adyen, you're assigned a dedicated Integration Engineer—a technical expert who understands your tech stack, regulatory environment, and business model. They guide you through implementation to ensure it's optimized for your specific needs."
    },
    {
      question: "Why do major banks like Barclays use Adyen's technology?",
      answer: "Adyen provides white-label solutions to global banks because their technology is robust enough for financial institutions to put their own brand on it. This partnership validates Adyen's security, stability, and regulatory compliance at the highest level."
    },
    {
      question: "Is Adyen right for my business?",
      answer: "Adyen is built for scale and complexity. It's ideal for businesses with true global reach, complex omnichannel needs, and high transaction volumes. Smaller businesses may find it more powerful than they need, which is why an objective assessment of your operational maturity is recommended."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <FAQSchema faqs={faqItems} />
      
      <main className="pt-32 pb-24">
        <article className="section-container max-w-4xl mx-auto">
          <InsightsBreadcrumb 
            category={{ name: "Provider Deep Dives", slug: "providers" }} 
            currentTitle="Adyen Enterprise Platform" 
          />

          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                Provider Deep Dive
              </span>
              <span className="text-sm text-muted-foreground">10 min read</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
              Adyen: The Single Platform That Rewrote the Enterprise Payments Playbook
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              For those of us who have spent years navigating the fragmented, opaque world of payment processing, Adyen is not just a provider; it is a paradigm shift. They didn't just build a better payment gateway; they built a single, unified platform that seamlessly handles everything from acquiring to risk management.
            </p>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <section className="mb-12">
              <p className="text-lg text-muted-foreground leading-relaxed">
                When a business reaches a certain scale—one that demands true global reach, complex omnichannel solutions, and absolute transparency—Adyen is often the only name on the shortlist. They have fundamentally simplified global commerce for the world's largest brands.
              </p>
            </section>

            {/* Single Platform Advantage */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Globe className="w-8 h-8 text-primary" />
                The Single Platform Advantage: Thought of Everything
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                The genius of Adyen lies in its unified approach. Before Adyen, a global merchant typically needed separate providers for their payment gateway, their acquiring bank relationships in different regions, and their fraud/risk tools. This created a tangled web of contracts, reconciliation nightmares, and unnecessary latency.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Adyen solved this by building a single, proprietary platform that acts as the gateway, the acquirer, and the risk engine across nearly every major market.
              </p>

              {/* Key Benefits */}
              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Higher Authorization Rates
                  </h3>
                  <p className="text-muted-foreground">
                    Because Adyen controls the entire transaction flow, they can provide richer data to the card issuer, leading to better decision-making and fewer false declines. This translates directly to more successful transactions and higher revenue.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    True Omnichannel
                  </h3>
                  <p className="text-muted-foreground">
                    Whether a transaction happens online, in-app, or in-store via a Point-of-Sale (POS) terminal, it all flows through the same system. This provides a single view of the customer and simplifies reconciliation across all channels.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Interchange++ Transparency
                  </h3>
                  <p className="text-muted-foreground">
                    For high-volume merchants, Adyen's commitment to Interchange++ pricing is a game-changer. It strips away the opaque "blended rates" favored by many competitors, showing the merchant the exact cost of the card scheme, the interchange fee, and Adyen's fixed margin. This level of cost control is essential for enterprise-level financial planning.
                  </p>
                </div>
              </div>
            </section>

            {/* Integration Engineer Section */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Users className="w-8 h-8 text-primary" />
                The Integration Engineer: A True Partner
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                The most telling sign of Adyen's commitment to its clients is the quality of its support, particularly during the critical integration phase.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                When you onboard with Adyen, you are not handed a generic API document and left to fend for yourself. You are assigned a <strong className="text-foreground">dedicated Integration Engineer</strong>—a technical expert who knows the Adyen platform like the back of their hand.
              </p>
              
              <div className="p-6 rounded-xl bg-primary/5 border border-primary/20 mb-6">
                <p className="text-lg text-foreground leading-relaxed">
                  This engineer is not a sales representative; they are a technical partner. They understand the nuances of your tech stack, your specific regulatory environment, and your business model.
                </p>
              </div>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                They guide you through the process, ensuring that the implementation is not just functional, but optimized for your specific needs—whether that means fine-tuning your local payment methods in Asia or structuring your data flow for maximum risk efficiency. This high-touch, expert-led approach is what separates a successful, stable integration from a rushed, fragile one.
              </p>
            </section>

            {/* Industry Achievements */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Building2 className="w-8 h-8 text-primary" />
                A Testament to Trust: Industry Achievements
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Adyen's success is a direct reflection of the trust placed in them by the most demanding players in the financial world. Their technology is so robust and reliable that they have been chosen to power the payment infrastructure for major financial institutions.
              </p>
              
              <div className="p-6 rounded-xl bg-card border border-border mb-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  The fact that Adyen provides white-label solutions to global banks, such as their partnership with Barclays to power their payment gateway services, is the ultimate compliment. It means that one of the world's oldest and most respected financial institutions trusts Adyen's technology enough to put their own brand on it.
                </p>
              </div>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                This achievement speaks volumes about Adyen's security, stability, and regulatory compliance. Adyen is not just a payment processor; they are a critical piece of the global financial infrastructure, a position earned through years of relentless focus on technical excellence and merchant success.
              </p>
            </section>

            {/* ChosePayments Perspective */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Shield className="w-8 h-8 text-primary" />
                The ChosePayments Perspective
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Adyen is an exceptional platform, but it is built for scale and complexity. It is a powerful tool that requires a business to have its operational house in order.
              </p>
              
              <div className="p-6 rounded-xl bg-primary/5 border border-primary/20 mb-6">
                <p className="text-lg text-foreground leading-relaxed font-medium">
                  The question is not whether Adyen is a good provider—it is—but whether your business is at the stage where it can fully leverage and benefit from its enterprise-grade capabilities.
                </p>
              </div>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                To ensure you are ready for a platform of Adyen's caliber, you need an objective assessment of your operational maturity, global needs, and risk profile.
              </p>
            </section>

            {/* FAQ Section */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {faqItems.map((faq, index) => (
                  <div key={index} className="p-6 rounded-xl bg-card border border-border">
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA Section */}
            <section className="p-8 md:p-12 rounded-2xl bg-muted/30 border border-border text-center">
              <h2 className="text-2xl font-bold text-foreground mb-3">
                Ready to find the right payment provider for your stage?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Take our short assessment to get personalized recommendations based on your business model, volume, and operational needs.
              </p>
              <Link
                to="/assessment?start=true"
                replace
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
              >
                Take the assessment <ArrowRight className="w-4 h-4" />
              </Link>
            </section>
          </div>

          {/* Related Articles */}
          <section className="mt-16 pt-12 border-t border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">Related Reading</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Link
                to="/insights/what-is-an-acquirer"
                className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors group"
              >
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                  What Is an Acquirer and Why Your Payment Provider Needs One
                </h3>
                <p className="text-sm text-muted-foreground">
                  Understand the acquiring relationship that makes Adyen's single-platform approach possible.
                </p>
              </Link>
              <Link
                to="/insights/payment-provider-vs-acquirer-vs-bank"
                className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors group"
              >
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                  Payment Provider vs Acquirer vs Bank: What Happens to Your Money
                </h3>
                <p className="text-sm text-muted-foreground">
                  Learn how the payment ecosystem works and why vertical integration matters.
                </p>
              </Link>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default AdyenEnterprisePlatform;
