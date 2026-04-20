import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import FAQSchema from "@/components/FAQSchema";
import InsightsBreadcrumb from "@/components/InsightsBreadcrumb";
import SourcesCitation from "@/components/SourcesCitation";
import ArticleActions from "@/components/ArticleActions";
import InlineAssessmentCTA from "@/components/InlineAssessmentCTA";
import { ArrowRight, CheckCircle2, Users, ShieldCheck, Repeat, Zap, AlertTriangle } from "lucide-react";

const sources = [
  { name: "Baymard Institute – Cart Abandonment Rate Statistics", url: "https://baymard.com/lists/cart-abandonment-rate", type: "industry" as const },
  { name: "Statista – Global Digital Shopping Cart Abandonment Rate", url: "https://www.statista.com/statistics/477804/online-shopping-cart-abandonment-rate-worldwide/", type: "industry" as const },
  { name: "Stripe – 3DS Trends in Regulated Markets", url: "https://stripe.com/blog/3ds-trends-in-regulated-markets", type: "official" as const },
  { name: "Ravelin – One Fifth of Payments Sent to 3D Secure Are Lost", url: "https://www.ravelin.com/blog/one-fifth-of-payments-sent-to-3d-secure-are-lost", type: "industry" as const },
  { name: "Checkout.com – Merchant Initiated Transactions Guide", url: "https://www.checkout.com/blog/increase-payments-performance-merchant-initiated-transactions", type: "official" as const },
];

const PaymentExperienceOptimization = () => {
  useSEO({
    title: "Payment Experience Optimization: Why You Must Control the Checkout",
    description: "Your customers are not anonymous. You know their region, ticket size, and order frequency. Learn why controlling the payment experience is the single biggest lever for retention and conversion.",
    keywords: [
      "payment experience optimization",
      "checkout optimization",
      "payment conversion rate",
      "reduce cart abandonment",
      "merchant initiated transactions",
      "3ds exemption",
      "low value transaction exemption",
      "payment ux",
      "checkout conversion",
    ],
  });

  const faqItems = [
    {
      question: "Why should merchants control the payment experience?",
      answer: "Because you know your customers better than any payment provider does. You know their region, ticket size, order frequency, and whether they are first-time or returning. A generic checkout treats everyone the same. A controlled checkout treats everyone appropriately, which is the single largest lever you have over conversion and retention."
    },
    {
      question: "Do I have to apply 3DS to every transaction?",
      answer: "No. Under PSD2 and the Strong Customer Authentication framework, there are exemptions. The Low Value Transaction exemption lets you skip 3DS on transactions under €30 (with some per-card volume limits), and the Transaction Risk Analysis exemption lets low-risk transactions go through frictionlessly. If your provider applies 3DS by default to every transaction, you are paying for friction you could legally avoid."
    },
    {
      question: "What is a Merchant Initiated Transaction (MIT)?",
      answer: "An MIT is a payment initiated by you, the merchant, using a card credential the customer has previously consented to store. It does not require the customer to be present or to complete 3DS each time. For regular customers who order on a predictable cadence, MITs turn payment into a background process rather than a friction point."
    },
    {
      question: "How much is a bad payment experience actually costing me?",
      answer: "Baymard Institute estimates $260 billion in lost orders is recoverable through better checkout design in the US and EU alone. 70% of carts are abandoned globally, with 18% of shoppers citing a long or complicated checkout and 13% citing poor payment options. On mobile, abandonment climbs to 85%. These are not small numbers."
    },
    {
      question: "Can I really customise the checkout with any provider?",
      answer: "The level of control varies significantly by provider. Some force you into a hosted checkout you cannot meaningfully modify. Others give you embedded components where you control the flow, branding, and logic while they handle PCI-sensitive elements. Choosing a provider that lets you design the experience is a strategic decision, not a cosmetic one."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <FAQSchema faqs={faqItems} />

      <main className="pt-32 pb-24">
        <article className="section-container max-w-4xl mx-auto">
          <InsightsBreadcrumb
            category={{ name: "Practical Guides", slug: "guides" }}
            currentTitle="Payment Experience Optimization"
          />

          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                Practical Guide
              </span>
              <span className="text-sm text-muted-foreground">9 min read</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
              Your Customers Are Not Anonymous: Why You Must Control the Payment Experience
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              You know your customers. You know their region, their ticket size, how often they order, and whether they are new or returning. So why are you letting a generic checkout treat them all the same?
            </p>
          </header>

          <div className="prose prose-lg max-w-none">

            {/* Introduction */}
            <section className="mb-12">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                The single most underestimated lever in payments is not the rate your provider charges. It is the experience your customer goes through every time they try to pay you. And that experience, more than any other single factor, decides whether they finish the order, come back next week, or quietly disappear into someone else's checkout.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Too many businesses treat payment as the last thing to think about. They plug in whatever their provider hands them, leave the default settings, and accept the abandonment rate as the cost of doing business. That is a very expensive mindset.
              </p>
            </section>

            <InlineAssessmentCTA
              context="See which providers give you the level of checkout control your business actually needs."
              cta="Get your risk profile"
            />

            {/* The Scale of the Problem */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-primary" />
                The Scale of the Problem
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                The numbers are not subtle. Global cart abandonment sits at around <strong className="text-foreground">70%</strong>. On mobile, it climbs to <strong className="text-foreground">85%</strong>. Baymard Institute estimates that roughly <strong className="text-foreground">$260 billion</strong> in lost orders is recoverable in the US and EU alone through better checkout design.
              </p>

              <div className="p-6 rounded-xl bg-primary/5 border border-primary/20 mb-6">
                <p className="text-lg text-foreground leading-relaxed">
                  When shoppers are asked why they abandoned, the answers are painfully consistent: unexpected costs, a checkout that is too long, not enough payment methods, being forced to create an account, and authentication that feels suspicious or broken. Almost all of these are things the merchant can fix.
                </p>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                A Stripe analysis of regulated markets found that when 3DS is poorly applied, European merchants see a <strong className="text-foreground">2 to 3.5%</strong> downturn in conversion, and US merchants up to <strong className="text-foreground">15%</strong>. Ravelin has published data showing roughly one in five transactions sent to 3DS never makes it back.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                These are not isolated glitches. They are the predictable result of businesses outsourcing their most important customer moment to a provider whose default settings were designed for the average merchant, not for you.
              </p>
            </section>

            {/* You Know Your Customer */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Users className="w-8 h-8 text-primary" />
                You Know Your Customer. Your Checkout Should, Too.
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                A generic checkout is a polite way of admitting you have given up. Your payment experience should reflect everything you already know about the person in front of you.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Ask yourself a few uncomfortable questions.
              </p>

              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    If your customer is a regular, why are you asking for their full address again?
                  </h3>
                  <p className="text-muted-foreground">
                    You already have it. You already have their email, their card on file (with consent), and their order history. Asking them to type it all in again every time is not thoroughness. It is friction. Every field you make them fill in is another chance for them to change their mind.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    If the customer is regular and the order is under €30, why are you still triggering 3DS?
                  </h3>
                  <p className="text-muted-foreground">
                    Under PSD2, the Low Value Transaction exemption exists precisely for this scenario. Applying strong customer authentication to a €12 coffee subscription is not a best practice. It is a tax on your own conversion that you are paying voluntarily, and in many cases your provider is charging you for the 3DS attempt on top of it.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    If your customer orders every week or every day, why are they going through a checkout at all?
                  </h3>
                  <p className="text-muted-foreground">
                    This is what Merchant Initiated Transactions exist for. With prior consent and a stored credential, you can charge a regular customer in the background and let them focus on the order itself. A quick message, a one-click confirmation, a standing weekly order — none of these should require your best customer to re-enter their card details and pass a 3DS challenge every Tuesday.
                  </p>
                </div>
              </div>
            </section>

            {/* The Three Levers */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Zap className="w-8 h-8 text-primary" />
                The Three Levers You Actually Control
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Payment optimization is not a dark art. It comes down to three practical levers that every merchant has access to, if their provider allows it.
              </p>

              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    Authentication, applied intelligently
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    Strong Customer Authentication is not optional in Europe, but the way you apply it is. Use the{" "}
                    <Link to="/insights/low-value-transaction-exemption" className="text-primary hover:underline">Low Value Transaction exemption</Link>{" "}
                    for small tickets. Use Transaction Risk Analysis exemptions where your risk scoring supports it. Route trusted returning customers through frictionless flows. Your goal is not to skip 3DS — it is to apply it where it adds value and suppress it where it only adds cost.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Repeat className="w-5 h-5 text-primary" />
                    Data you already collect, used intelligently
                  </h3>
                  <p className="text-muted-foreground">
                    Every returning customer has a history. Address, preferred payment method, device, location, order cadence, average basket. A good checkout pre-fills what you already know and asks only for what has changed. A great checkout uses that data to route the transaction on the rails most likely to succeed — including picking the right acquirer if your provider supports smart routing.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Relationship, respected
                  </h3>
                  <p className="text-muted-foreground">
                    A first-time customer is not the same as a customer on their fifteenth order. Treating them identically is an insult to the loyal one and a missed opportunity to build trust with the new one. For the loyal customer, a stored credential and an MIT. For the new customer, a clean guest checkout with minimal fields and the payment methods they actually use in their region.
                  </p>
                </div>
              </div>
            </section>

            {/* Brand and Language */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-primary" />
                Your Checkout Is Part of Your Brand
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                The moment your customer hits checkout, something subtle happens in most businesses. The page changes. The typography shifts. The language switches to something cold and transactional. The URL goes to a different domain. For a second, the customer wonders if they are still in the right place.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                That moment of doubt is expensive. It is where trust wobbles and carts get abandoned. If the first forty-five screens of your funnel speak in your voice and the last screen speaks in the voice of a payment processor, you are losing the people you worked hardest to attract.
              </p>

              <div className="p-6 rounded-xl bg-primary/5 border border-primary/20 mb-6">
                <p className="text-lg text-foreground leading-relaxed font-medium">
                  Payment should feel like a natural part of your experience, not a handoff to a different company. That means your branding, your language, your tone, your error messages, your confirmation flow — all of it should continue to sound like you.
                </p>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                This is where your choice of provider genuinely matters. Some providers hand you a hosted page and tell you to be grateful. Others give you embedded components, full API access, and the freedom to build the checkout your customers deserve. The difference in conversion is not theoretical.
              </p>
            </section>

            {/* What to Demand From Your Provider */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-primary" />
                What to Demand From Your Provider
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                If you are serious about your customers having the best possible experience, you need a provider that treats checkout design as your job, not theirs. Here is what that looks like in practice.
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-foreground">
                    <strong>Full support for SCA exemptions</strong> — Low Value, Transaction Risk Analysis, whitelisting, and corporate card exemptions, applied programmatically at your discretion.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-foreground">
                    <strong>Native support for MIT flows</strong> — proper tokenization, credential-on-file consent management, and network tokens so your stored cards survive re-issuance.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-foreground">
                    <strong>Embedded or API-driven checkout</strong> — you own the flow, the copy, the branding, and the logic. PCI-sensitive fields hosted by the provider, everything else hosted by you.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-foreground">
                    <strong>Local payment methods by region</strong> — show the right wallet, the right bank-transfer option, the right installment product to the right customer, not a uniform global menu.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-foreground">
                    <strong>Transparent decline reasons and retry logic</strong> — so you can actually recover soft declines instead of just marking them failed and moving on.
                  </p>
                </div>
              </div>
            </section>

            {/* ChosePayments Perspective */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-primary" />
                The ChosePayments Perspective
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Every business we work with has one thing in common when we audit their checkout. There is always something left on the table. Sometimes it is a 3DS rule that is firing too aggressively. Sometimes it is a regular customer being forced through a full-card entry every week. Sometimes it is an entire market being shown a checkout that does not speak their language or offer their preferred method. The fix is rarely complicated. What is missing is usually ownership.
              </p>

              <div className="p-6 rounded-xl bg-primary/5 border border-primary/20 mb-6">
                <p className="text-lg text-foreground leading-relaxed font-medium">
                  The payment experience is yours. The customer relationship is yours. The conversion impact is yours. The provider is a partner, not the owner of the checkout. Treat it that way and you will find percentage points of conversion hiding where you least expected them.
                </p>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                If you are not sure whether your current provider gives you the level of control this requires, that is usually the answer. The right provider does not make you ask.
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

            <SourcesCitation sources={sources} />

            <ArticleActions
              slug="payment-experience-optimization"
              title="Your Customers Are Not Anonymous: Why You Must Control the Payment Experience"
              className="mt-8 mb-12 pt-6 border-t border-border"
            />

            {/* CTA Section */}
            <section className="p-8 md:p-12 rounded-2xl bg-muted/30 border border-border text-center">
              <h2 className="text-2xl font-bold text-foreground mb-3">
                Does your current provider actually let you own the checkout?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Our 60-second assessment maps your business model against the providers that give you real control over authentication, MITs, and checkout design — not just a branded page.
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
                to="/insights/low-value-transaction-exemption"
                className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors group"
              >
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                  The Low Value Transaction Exemption Explained
                </h3>
                <p className="text-sm text-muted-foreground">
                  How to legally skip 3DS on low-value transactions and stop paying for friction your customers never needed.
                </p>
              </Link>
              <Link
                to="/insights/why-card-approval-speed-affects-checkout-abandonment"
                className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors group"
              >
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                  Why Card Approval Speed Affects Checkout Abandonment
                </h3>
                <p className="text-sm text-muted-foreground">
                  The relationship between authorization latency, 3DS flows, and the customers who never come back.
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

export default PaymentExperienceOptimization;
