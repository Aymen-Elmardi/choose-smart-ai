import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import FAQSchema from "@/components/FAQSchema";
import InsightsBreadcrumb from "@/components/InsightsBreadcrumb";
import SourcesCitation from "@/components/SourcesCitation";
import ArticleActions from "@/components/ArticleActions";
import InlineAssessmentCTA from "@/components/InlineAssessmentCTA";
import { ArrowRight, CheckCircle2, Building2, Shield, Globe, Zap, CreditCard, Code, Users } from "lucide-react";

const cashflowsSources = [
  { name: "Cashflows Official Website", url: "https://www.cashflows.com/", type: "official" as const },
  { name: "Cashflows Developer Portal", url: "https://developer.cashflows.com/", type: "official" as const },
  { name: "Cashflows Legal & Regulatory Information", url: "https://www.cashflows.com/legal/legal-regulatory-information", type: "regulatory" as const },
  { name: "Cashflows Acquiring Services", url: "https://www.cashflows.com/consumer-duty-product-information-for-acquiring-services", type: "official" as const },
  { name: "Cashflows UK Review – Compare Card Fees", url: "https://www.comparecardfees.co.uk/payment-providers/cashflows/", type: "industry" as const }
];

const CashflowsPaymentPlatform = () => {
  useSEO({
    title: "Cashflows: The UK Direct Acquirer Built for Speed, Control, and Transparency",
    description: "Cashflows is an FCA-regulated direct acquirer offering fast onboarding, same-day settlement, and modern APIs. Learn why Cashflows is one of the strongest UK payment providers.",
    keywords: [
      "cashflows payments",
      "cashflows payment gateway",
      "cashflows acquirer",
      "cashflows review",
      "cashflows uk",
      "cashflows direct acquirer",
      "cashflows settlement",
      "cashflows api",
      "cashflows merchant account",
      "uk payment provider",
    ],
  });

  const faqItems = [
    {
      question: "What is Cashflows?",
      answer: "Cashflows is an FCA-authorised electronic money institution and direct acquirer based in Cambridge, UK. They are a Principal Member of both Visa Europe and Mastercard Europe, providing card acquiring, payment gateway, payouts, and embedded payment services to merchants and platforms across the UK and Europe."
    },
    {
      question: "Is Cashflows a direct acquirer?",
      answer: "Yes, Cashflows is a direct acquirer, not an aggregator. This means they hold their own acquiring licences with Visa and Mastercard and provide merchants with their own dedicated merchant accounts. This gives businesses more control over their payment processing, faster settlement options, and more flexible commercial terms than aggregator models."
    },
    {
      question: "How fast is Cashflows settlement?",
      answer: "Cashflows offers flexible settlement options that are among the fastest in the UK market. Merchants can choose from standard three-day settlement, next-day settlement, or same-day settlement with funds transferred up to eight times per day during business hours. This level of settlement flexibility is rare among UK acquirers."
    },
    {
      question: "What payment methods does Cashflows support?",
      answer: "Cashflows supports Visa, Mastercard, and American Express card payments alongside digital wallets including Apple Pay and Google Pay. They also support selected European local payment methods, making them suitable for businesses expanding across the EEA."
    },
    {
      question: "How does Cashflows protect merchant funds?",
      answer: "Cashflows safeguards all merchant funds by placing amounts due into specially designated safeguarded accounts held with FCA-authorised Tier 1 banking institutions. This means merchant funds are ring-fenced and protected prior to settlement into the merchant's nominated bank account."
    },
    {
      question: "Is Cashflows right for my business?",
      answer: "Cashflows is particularly well suited for UK and European businesses that need fast onboarding, flexible settlement, and the control of a direct acquiring relationship. Their modern APIs make them ideal for platforms, SaaS businesses, and e-commerce merchants who want to embed payments into their products. For high-volume global enterprises, a broader assessment of your operational needs is recommended."
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
            currentTitle="Cashflows Payment Platform"
          />

          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                Provider Deep Dive
              </span>
              <span className="text-sm text-muted-foreground">9 min read</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
              Cashflows: The UK Direct Acquirer Built for Speed, Control, and Transparency
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              In a market dominated by aggregators and legacy acquiring banks, Cashflows occupies a rare and valuable position: a modern, FCA-regulated direct acquirer that gives merchants their own acquiring relationship without the red tape and rigidity of traditional banking infrastructure.
            </p>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">

            {/* Introduction */}
            <section className="mb-12">
              <p className="text-lg text-muted-foreground leading-relaxed">
                For businesses that have outgrown the simplicity of an aggregator model but don't need the complexity of a global enterprise platform, Cashflows offers something genuinely different. They combine the agility of a fintech with the regulatory standing of a licensed acquirer, and the result is a payment partner that moves at your speed rather than slowing you down.
              </p>
            </section>

            <InlineAssessmentCTA
              context="See how Cashflows compares to other providers for your business model and risk profile."
              cta="Get your risk profile"
            />

            {/* Direct Acquirer Advantage */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Building2 className="w-8 h-8 text-primary" />
                The Direct Acquirer Advantage
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                The single most important thing to understand about Cashflows is that they are a <Link to="/insights/what-is-an-acquirer" className="text-primary hover:underline">direct acquirer</Link>. They hold their own Principal Membership with both Visa Europe and Mastercard Europe. This is not a trivial distinction. It means Cashflows does not sit on top of another bank's acquiring licence; they are the acquiring institution.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                For merchants, this translates into tangible benefits that matter every single day.
              </p>

              {/* Key Benefits */}
              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Your Own Merchant Account
                  </h3>
                  <p className="text-muted-foreground">
                    Unlike aggregators that pool merchants under a shared account, Cashflows provides each business with its own dedicated merchant account. This means fewer holds, fewer freezes, and a relationship with the acquirer that is built around your business specifically, not the average risk profile of thousands of other merchants.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Direct Control Over Settlement
                  </h3>
                  <p className="text-muted-foreground">
                    Because there is no intermediary bank between Cashflows and the card schemes, settlement decisions are made by Cashflows directly. This enables them to offer same-day settlement, up to eight times per day, which is rare in the UK acquiring market.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Flexible Commercial Terms
                  </h3>
                  <p className="text-muted-foreground">
                    Direct acquirers have greater latitude in how they structure pricing and terms. Cashflows can offer bespoke arrangements that reflect your specific transaction profile, rather than forcing you into a one-size-fits-all pricing tier.
                  </p>
                </div>
              </div>
            </section>

            {/* Settlement Speed */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Zap className="w-8 h-8 text-primary" />
                Settlement Speed That Changes the Game
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Cash flow is the lifeblood of any business, and few things impact it more directly than how quickly you receive your payment revenue. This is where Cashflows truly differentiates itself from the majority of UK payment providers.
              </p>

              <div className="p-6 rounded-xl bg-primary/5 border border-primary/20 mb-6">
                <p className="text-lg text-foreground leading-relaxed">
                  Cashflows offers same-day settlement with funds transferred up to eight times per day during business hours. For businesses managing tight margins, seasonal peaks, or supplier payment deadlines, this is not a nice-to-have. It is a competitive advantage.
                </p>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                The choice is yours: standard three-day settlement, next-day settlement, or same-day. This flexibility allows businesses to match their <Link to="/insights/payout-settlement-explained" className="text-primary hover:underline">settlement cycle</Link> to their operational needs rather than being locked into a rigid payout schedule dictated by a legacy provider.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                For marketplace operators and platforms managing complex fund flows, this settlement speed combined with Cashflows' payout capabilities means you can move money to your sellers and suppliers faster, improving relationships across your entire ecosystem.
              </p>
            </section>

            {/* Regulatory Standing */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Shield className="w-8 h-8 text-primary" />
                Regulatory Standing and Fund Protection
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Cashflows is authorised by the Financial Conduct Authority under the Electronic Money Regulations 2011 for the issuing of electronic money and the provision of payment services. Their FCA Register reference is 900006. This is the highest standard of regulation for a payment institution in the UK.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                What makes this particularly reassuring is how they handle merchant funds. All amounts due to merchants are placed into specially designated safeguarded accounts held with FCA-authorised Tier 1 banking institutions. Your money is ring-fenced and protected prior to settlement.
              </p>

              <div className="p-6 rounded-xl bg-card border border-border mb-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  In a landscape where businesses have been burned by providers with opaque fund handling practices, Cashflows' approach to safeguarding is a genuine differentiator. You know where your money is, and you know it is protected by the full weight of FCA regulation.
                </p>
              </div>
            </section>

            {/* Modern API */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Code className="w-8 h-8 text-primary" />
                Modern APIs Built for Developers and Platforms
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Cashflows has invested heavily in building a modern, RESTful API that speaks the language today's development teams expect. Their Gateway API accepts JSON and provides structured endpoints for authorisation, capture, refund, settlement, and reporting. If you have worked with <Link to="/insights/stripe-payment-platform" className="text-primary hover:underline">Stripe's developer-first approach</Link>, you will find Cashflows' API philosophy familiar, though scoped to their core acquiring strengths rather than an entire financial ecosystem.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                For platforms looking to embed payments, Cashflows offers an Embedded Checkout solution that lets developers build their own payment experience while the sensitive form fields are hosted securely by Cashflows. This strikes the right balance between brand control and <Link to="/insights/pci-compliance-explained" className="text-primary hover:underline">PCI compliance</Link>.
              </p>

              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Embedded Checkout
                  </h3>
                  <p className="text-muted-foreground">
                    Build your own checkout experience while Cashflows handles the PCI-sensitive elements. This gives merchants full control over the look, feel, and flow of their payment page without the compliance overhead of hosting card data.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Recurring Billing and Card Vaulting
                  </h3>
                  <p className="text-muted-foreground">
                    Cashflows supports secure card vaulting and recurring billing out of the box, making them a natural fit for subscription businesses and SaaS platforms that rely on repeat payments.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Payouts Direct to Card
                  </h3>
                  <p className="text-muted-foreground">
                    Beyond accepting payments, Cashflows enables businesses to send money back out through digital disbursements. Whether you need to pay suppliers, reimburse customers, or distribute funds to sub-merchants, the payout API handles it with full audit trails and multi-currency support.
                  </p>
                </div>
              </div>
            </section>

            {/* Onboarding */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <CreditCard className="w-8 h-8 text-primary" />
                Fast Onboarding Without Cutting Corners
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                One of the persistent frustrations with traditional acquiring banks is the onboarding timeline. Weeks of paperwork, back-and-forth document requests, and opaque underwriting decisions. Cashflows has streamlined this process significantly.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Merchants can be approved and activated within days, not weeks. For Shopify merchants specifically, Cashflows has built an integration that allows businesses to activate card payments and digital wallets in under a minute once the KYC approval process is complete.
              </p>

              <div className="p-6 rounded-xl bg-primary/5 border border-primary/20 mb-6">
                <p className="text-lg text-foreground leading-relaxed font-medium">
                  Speed of onboarding matters. Every day a business spends waiting for payment processing approval is a day of lost revenue. Cashflows understands this and has built their processes to get merchants live as fast as responsibly possible.
                </p>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Importantly, this speed does not come at the expense of proper risk assessment. Cashflows conducts thorough KYC and underwriting, but they have invested in the technology and processes to do it efficiently. The result is fast activation backed by genuine regulatory compliance.
              </p>
            </section>

            {/* Who Is Cashflows Best For */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Users className="w-8 h-8 text-primary" />
                Who Is Cashflows Best For?
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Cashflows operates across the UK and the European Economic Area, supporting Visa, Mastercard, American Express, Apple Pay, Google Pay, and selected European local payment methods. This makes them particularly well suited for a specific profile of business:
              </p>

              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-foreground">
                    <strong>UK and European E-commerce Merchants</strong> who want a direct acquiring relationship with fast settlement, without the overhead of enterprise platforms like <Link to="/insights/adyen-enterprise-payments-platform" className="text-primary hover:underline">Adyen</Link> or <Link to="/insights/checkout-com-enterprise-platform" className="text-primary hover:underline">Checkout.com</Link>.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-foreground">
                    <strong>Platforms and Marketplaces</strong> that need embedded payment acceptance and payouts within a single regulated provider, particularly those focused on the UK and EEA rather than global operations.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-foreground">
                    <strong>Subscription and SaaS Businesses</strong> that rely on recurring billing and secure card vaulting, and value the stability of a dedicated merchant account over an aggregated model.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-foreground">
                    <strong>Businesses Expanding from UK to Europe</strong> who need a single acquiring relationship that covers both markets without managing separate providers on each side.
                  </p>
                </div>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Where Cashflows differs from the global enterprise providers is scope. They are not trying to be all things to all businesses everywhere. They are focused on doing UK and European acquiring exceptionally well, with the speed, technology, and regulatory credibility that businesses in these markets actually need. For merchants whose ambitions are primarily global from day one, a platform like <Link to="/insights/stripe-payment-platform" className="text-primary hover:underline">Stripe</Link> or <Link to="/insights/adyen-enterprise-payments-platform" className="text-primary hover:underline">Adyen</Link> may be a better starting point.
              </p>
            </section>

            {/* ChosePayments Perspective */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Shield className="w-8 h-8 text-primary" />
                The ChosePayments Perspective
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Cashflows is one of the strongest options available for UK and European businesses that want the benefits of a direct acquiring relationship without the weight and bureaucracy of a traditional acquiring bank. Their combination of regulatory credibility, settlement speed, and modern technology makes them a provider that punches well above their profile.
              </p>

              <div className="p-6 rounded-xl bg-primary/5 border border-primary/20 mb-6">
                <p className="text-lg text-foreground leading-relaxed font-medium">
                  For businesses that need fast access to their revenue, transparent fund handling, and a modern API that their developers will actually enjoy working with, Cashflows deserves serious consideration. They are the kind of provider that earns loyalty through performance, not marketing.
                </p>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                As always, the right provider depends on your specific business model, risk profile, and operational needs. If you want to understand whether Cashflows is the right fit for your business, start with an objective assessment.
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

            <SourcesCitation sources={cashflowsSources} />

            {/* Share & Like Actions */}
            <ArticleActions
              slug="cashflows-payment-platform"
              title="Cashflows: The UK Direct Acquirer Built for Speed, Control, and Transparency"
              className="mt-8 mb-12 pt-6 border-t border-border"
            />

            {/* CTA Section */}
            <section className="p-8 md:p-12 rounded-2xl bg-muted/30 border border-border text-center">
              <h2 className="text-2xl font-bold text-foreground mb-3">
                Is Cashflows the right acquirer for your business?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Our 60-second assessment matches your business model, risk profile, and operational needs to the providers that fit best, including Cashflows.
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
                  Understand why Cashflows' direct acquiring licence matters and how it differs from aggregator models.
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
                  Learn how the payment ecosystem works and where direct acquirers like Cashflows fit in.
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

export default CashflowsPaymentPlatform;
