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

const BestPaymentProcessorUK = () => {
  useCanonical();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Set SEO meta tags
    document.title = "Choosing a Payment Processor? What UK Businesses Get Wrong";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Most UK businesses pick a payment provider too quickly and regret it. See what actually matters before you commit — not just fees.");
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "Most UK businesses pick a payment provider too quickly and regret it. See what actually matters before you commit — not just fees.";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
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
                  <Link to="/assessment?start=true">
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
                      Free software tools
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
                    <Link to="/assessment?start=true">
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
