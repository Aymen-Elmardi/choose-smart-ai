import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect } from "react";
import { useCanonical } from "@/hooks/useCanonical";
import { useSEO } from "@/hooks/useSEO";
import ComparisonTableSchema from "@/components/ComparisonTableSchema";
import FAQSchema from "@/components/FAQSchema";

const providers = [
  {
    name: "Stripe",
    description: "Online payment processing for UK businesses with advanced APIs and global payments",
    provider: "Stripe",
    fees: "1.4–2.9% + 20p",
    bestFor: "Online businesses",
  },
  {
    name: "Square",
    description: "Point of sale and payment processing for retail and hospitality businesses",
    provider: "Square",
    fees: "1.75%",
    bestFor: "Retail & hospitality",
  },
  {
    name: "Zettle",
    description: "Mobile payment solution for small traders and mobile businesses",
    provider: "PayPal (Zettle)",
    fees: "1.75%",
    bestFor: "Mobile traders",
  },
  {
    name: "PayPal",
    description: "Trusted online payment gateway for low-volume sellers",
    provider: "PayPal",
    fees: "2.99% + fee",
    bestFor: "Low-volume sellers",
  },
  {
    name: "Checkout.com",
    description: "Enterprise payment platform with custom pricing for high-volume online businesses",
    provider: "Checkout.com",
    fees: "Custom",
    bestFor: "High-volume online",
  },
  {
    name: "Datman",
    description: "Marketplace payment platform with split payment capabilities",
    provider: "Datman",
    fees: "Custom",
    bestFor: "Marketplaces",
  },
];

const faqs = [
  {
    question: "What is the best payment system for small businesses in the UK?",
    answer: "The best small business payment system in the UK depends on how you sell. Square or Zettle are excellent for in-person payments with simple 1.75% fees and no monthly costs. For online-only businesses, Stripe offers powerful features starting at 1.4% + 20p per transaction. The cheapest option is not always the best fit.",
  },
  {
    question: "What is the cheapest payment processor for UK businesses?",
    answer: "Square and Zettle offer the cheapest in-person rates at 1.75% with no monthly fees. For online payments, Stripe starts at 1.4% + 20p for UK cards. However, the cheapest business payment solutions in the UK are not always the right choice. Hidden fees, account freezes, and poor support can cost more than a slightly higher rate.",
  },
  {
    question: "How do I choose between Stripe and Square in the UK?",
    answer: "Choose Stripe if you primarily sell online and need advanced customisation, subscription billing, or marketplace features. Choose Square if you have a physical retail location and want an integrated POS system with hardware.",
  },
  {
    question: "What payment processor fees should UK businesses expect?",
    answer: "UK businesses typically pay 1.4-2.9% per transaction depending on the provider and card type. In-person payments are usually cheaper (1.75%) than online payments (2.5-2.9%). International cards and Amex usually incur higher fees.",
  },
  {
    question: "Can I negotiate payment processing fees in the UK?",
    answer: "Yes, once you process over £50,000-£100,000 monthly, most providers will negotiate custom rates. Enterprise providers like Checkout.com and Adyen offer bespoke pricing from the start for high-volume merchants.",
  },
  {
    question: "What is the difference between a payment processor and a merchant account?",
    answer: "Payment processors like Stripe and Square are aggregators that let you accept payments immediately using their merchant account. Traditional merchant accounts are dedicated accounts from banks, offering lower fees but requiring credit checks and longer setup.",
  },
  {
    question: "How long do payment processor payouts take in the UK?",
    answer: "Payout times vary: Square offers next-day payouts, Stripe typically takes 3-5 business days, and PayPal offers instant transfers for a fee. Traditional merchant accounts usually settle in 2-3 business days.",
  },
  {
    question: "What happens if my payment processor freezes my account?",
    answer: "Account freezes can halt your business operations. To reduce risk, choose a provider that matches your business type, maintain good chargeback ratios, and consider having a backup payment method. Our assessment helps identify providers less likely to freeze your specific business type.",
  },
];

const BestPaymentProcessorUK = () => {
  useCanonical();
  
  useSEO({
    title: "Best Payment Processor for UK Small Businesses (2025)",
    description: "Find the best small business payment system in the UK. Compare cheapest business payment solutions, fees, and which providers actually approve your business type.",
    keywords: [
      "best payment processor UK",
      "best small business payment systems",
      "best small business payment solution",
      "best payment solutions for small businesses",
      "cheapest business payment solutions uk",
      "cheap business payment solutions uk",
      "payment processor price comparison uk",
      "recommend business payment solutions in uk",
      "payment processor risk UK",
      "payment provider assessment",
      "UK business payment fit",
    ],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ComparisonTableSchema 
        items={providers}
        listName="Best Payment Processors UK 2025"
        listDescription="Comprehensive comparison of the best payment processors for UK businesses, including fees, features, and recommendations by business type."
      />
      <FAQSchema faqs={faqs} />
      <Header />
      
      <main className="flex-1">
        {/* SECTION 1 — Hero Section */}
        <section className="section-padding pt-24 md:pt-32">
          <div className="section-container">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-muted-foreground mb-4">
                The provider you pick now will affect your business for years.
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Best Payment Processor for UK Businesses (2025)
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Most businesses choose a payment provider based on a quick search or a friend's suggestion, and end up stuck with something that doesn't fit. The fees look fine until you see the extras. The setup seems easy until you need help. And switching later is more painful than it should be. This guide is here to help you slow down and get it right the first time.
              </p>
              <p className="text-base text-muted-foreground/80 mb-8 max-w-2xl mx-auto">
                Not sure which provider fits? Answer a few quick questions to narrow it down before you commit.
              </p>
              <div className="flex flex-col items-center">
                <Button size="xl" asChild>
                  <Link to="/assessment?start=true" replace>
                    Answer a few quick questions
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <span className="text-sm text-muted-foreground mt-2">Takes under 1 minute • No spam</span>
              </div>
              <p className="text-sm text-muted-foreground mt-6">
                Independent guidance. We're paid by providers — not by you.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2 — Comparison Table */}
        <section className="section-padding">
          <div className="section-container">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Top UK Payment Processors at a Glance (2025)
              </h2>
              <div className="rounded-xl border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Provider</TableHead>
                      <TableHead className="font-semibold">Best For</TableHead>
                      <TableHead className="font-semibold">Key Strength</TableHead>
                      <TableHead className="font-semibold">Typical Fees</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Stripe</TableCell>
                      <TableCell>Online businesses</TableCell>
                      <TableCell>Advanced APIs, global payments</TableCell>
                      <TableCell>~1.4–2.9% + 20p</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Square</TableCell>
                      <TableCell>Retail & hospitality</TableCell>
                      <TableCell>POS hardware, simple rates</TableCell>
                      <TableCell>~1.75%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Zettle</TableCell>
                      <TableCell>Mobile traders</TableCell>
                      <TableCell>Cheapest hardware</TableCell>
                      <TableCell>~1.75%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">PayPal</TableCell>
                      <TableCell>Low-volume</TableCell>
                      <TableCell>Instant trust with buyers</TableCell>
                      <TableCell>~2.99% + fee</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Checkout.com</TableCell>
                      <TableCell>High-volume online</TableCell>
                      <TableCell>Custom pricing</TableCell>
                      <TableCell>Custom</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Datman</TableCell>
                      <TableCell>Marketplaces</TableCell>
                      <TableCell>Split payments</TableCell>
                      <TableCell>Custom</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 — Best Provider by Business Type */}
        <section className="section-padding bg-muted/30">
          <div className="section-container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">
                Best Provider by Business Type
              </h2>
              
              <div className="grid gap-8 md:grid-cols-2">
                <div className="bg-background rounded-xl p-6 border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    For eCommerce (online only) → <span className="text-primary">Stripe</span>
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      Fast checkout
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      Global reach
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      Best success rates
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      Most integrations
                    </li>
                  </ul>
                </div>

                <div className="bg-background rounded-xl p-6 border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    For Retail & Cafés → <span className="text-primary">Square</span>
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      Great POS hardware
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      Transparent pricing
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      Staff management
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      Included software tools
                    </li>
                  </ul>
                </div>

                <div className="bg-background rounded-xl p-6 border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    For Startups & Mobile Traders → <span className="text-primary">Zettle</span>
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      Low upfront cost
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      Simple device
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      Fast activation
                    </li>
                  </ul>
                </div>

                <div className="bg-background rounded-xl p-6 border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    For Marketplaces → <span className="text-primary">Datman</span>
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      Split payments
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      Multi-merchant support
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      Weekly payouts
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      UK support
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4 — What Affects Your Payment Costs */}
        <section className="section-padding">
          <div className="section-container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                What Actually Affects Your Payment Costs?
              </h2>
              <ul className="space-y-4 text-lg text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  Card mix (debit vs credit vs international)
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  Average transaction size
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  Chargeback exposure
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  Payment channel (online vs in-person)
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  Monthly processing volume
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 5 — Common Mistakes to Avoid */}
        <section className="section-padding bg-muted/30">
          <div className="section-container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Common Mistakes to Avoid
              </h2>
              <ul className="space-y-4 text-lg text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  Choosing based solely on hardware price
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  Staying with PayPal by default
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  Ignoring surcharges
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  Never renegotiating
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  Using the wrong provider for your business type
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 6 — CTA Section */}
        <section className="section-padding">
          <div className="section-container">
            <div className="relative overflow-hidden rounded-3xl bg-primary p-10 md:p-16 text-center max-w-4xl mx-auto">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -right-1/4 w-96 h-96 rounded-full bg-primary-foreground/10 blur-3xl" />
                <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 rounded-full bg-primary-foreground/10 blur-3xl" />
              </div>
              
              <div className="relative z-10">
                <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-8">
                  Want to find the right provider for your business? Tell us a bit about what you need and we'll match you instantly.
                </p>
                <div className="flex flex-col items-center">
                  <Button 
                    variant="secondary" 
                    size="xl" 
                    className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                    asChild
                  >
                    <Link to="/assessment?start=true" replace>
                      Answer a few quick questions
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  <span className="text-sm text-primary-foreground/70 mt-3">Takes under 1 minute • No spam</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7 — How Our Recommendation Works */}
        <section className="section-padding">
          <div className="section-container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                How We Match You to the Right Provider
              </h2>
              <p className="text-lg text-muted-foreground">
                We analyse your business type, selling channels, transaction size, monthly volume, industry requirements, and contract preferences. We then match you with the most suitable provider based on real payment logic, not sponsorships.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BestPaymentProcessorUK;
