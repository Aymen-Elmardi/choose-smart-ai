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

const BestPaymentProcessorUK = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Set SEO meta tags
    document.title = "Best Payment Processor for Small Businesses UK (2025 Comparison)";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "See the top UK payment processors for small businesses in 2025. Simple comparisons of Stripe, Square, Zettle, PayPal, and more — plus a quick quiz to find your best match.");
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "See the top UK payment processors for small businesses in 2025. Simple comparisons of Stripe, Square, Zettle, PayPal, and more — plus a quick quiz to find your best match.";
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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Best Payment Processor for Small Businesses in the UK (2025 Guide)
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Choosing a payment provider can be confusing — every company promises "simple fees" and "fast setup," but real costs vary based on your business type, payment volume, and how customers buy from you. This guide breaks everything down clearly, using real-world considerations instead of generic marketing claims.
              </p>
              <Button size="xl" asChild>
                <Link to="/quiz">
                  Take the Quiz — Find Your Best Match
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
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
                  Want a personalised recommendation? Answer a few simple questions and we'll match you with the right payment provider.
                </p>
                <Button 
                  variant="secondary" 
                  size="xl" 
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                  asChild
                >
                  <Link to="/quiz">
                    Take the Quiz
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7 — How Our Recommendation Works */}
        <section className="section-padding">
          <div className="section-container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                How Our Recommendation Works
              </h2>
              <p className="text-lg text-muted-foreground">
                Our quiz analyses your business type, selling channels, transaction size, monthly volume, industry requirements, and contract preferences. We then recommend the most suitable provider based on real payment logic, not sponsorships.
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
