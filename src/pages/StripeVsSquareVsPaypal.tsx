import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, X } from "lucide-react";
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

const StripeVsSquareVsPaypal = () => {
  useEffect(() => {
    document.title = "Stripe vs Square vs PayPal: Which Is Right for Your Business?";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "An independent comparison of Stripe, Square and PayPal. See which payment provider fits your business and why — in plain English.");
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* SECTION 1 — Hero Section */}
        <section className="section-padding pt-24 md:pt-32">
          <div className="section-container">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-muted-foreground mb-4">
                Most businesses overpay on card fees without realising it.
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Stripe vs Square vs PayPal — Which Is Best for UK Businesses (2025/2026)?
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Stripe, Square, and PayPal are the most commonly compared payment processors in the UK — but they're designed for different types of businesses. This guide gives you a clear, unbiased breakdown based on features, fees, and real-world use cases.
              </p>
              <div className="flex flex-col items-center">
                <Button size="xl" asChild>
                  <Link to="/quiz?start=true">
                    Answer a few quick questions
                    <ArrowRight className="w-5 h-5" />
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

        {/* SECTION 2 — Quick Comparison Table */}
        <section className="section-padding">
          <div className="section-container">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Stripe vs Square vs PayPal — Quick Comparison
              </h2>
              <div className="rounded-xl border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Feature</TableHead>
                      <TableHead className="font-semibold">Stripe</TableHead>
                      <TableHead className="font-semibold">Square</TableHead>
                      <TableHead className="font-semibold">PayPal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Best For</TableCell>
                      <TableCell>Online businesses</TableCell>
                      <TableCell>In-person retail & cafés</TableCell>
                      <TableCell>Low-volume sellers</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">In-Person Payments</TableCell>
                      <TableCell>Requires hardware partners</TableCell>
                      <TableCell>Excellent POS suite</TableCell>
                      <TableCell>Limited & higher fees</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Online Payments</TableCell>
                      <TableCell>Market-leading</TableCell>
                      <TableCell>Good</TableCell>
                      <TableCell>Simple but expensive</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">International Cards</TableCell>
                      <TableCell>Excellent</TableCell>
                      <TableCell>Good</TableCell>
                      <TableCell>High cost</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Fees</TableCell>
                      <TableCell>~1.4–2.9% + 20p</TableCell>
                      <TableCell>~1.75%</TableCell>
                      <TableCell>~2.99% + fee</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Ease of Use</TableCell>
                      <TableCell>Good</TableCell>
                      <TableCell>Excellent</TableCell>
                      <TableCell>Excellent</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Customisation</TableCell>
                      <TableCell>Very high</TableCell>
                      <TableCell>Medium</TableCell>
                      <TableCell>Low</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Payouts</TableCell>
                      <TableCell>3–5 days</TableCell>
                      <TableCell>Next day</TableCell>
                      <TableCell>Instant (fees apply)</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 — Who Each Provider Is Best For */}
        <section className="section-padding bg-muted/30">
          <div className="section-container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">
                Which Provider Fits Your Business?
              </h2>
              
              <div className="space-y-10">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    Stripe — Best for Online Businesses
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Global payments</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Strong APIs</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Advanced checkout tools</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Ideal for subscriptions & marketplaces</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    Square — Best for In-Person Retail
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Best POS hardware</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Simple pricing</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Perfect for cafés, barbers, shops</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    PayPal — Best for Low-Volume or Trust-Driven Purchases
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Buyers trust PayPal</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Easy setup</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">High fees for regular use</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    When Stripe, Square, and PayPal Are NOT Good Fits
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <X className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">High-volume merchants needing enterprise pricing</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Marketplaces requiring split payments</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">High-risk industries</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Multi-merchant setups</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4 — Fees Breakdown */}
        <section className="section-padding">
          <div className="section-container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">
                Fees Comparison (2025 UK Overview)
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="text-xl font-bold text-foreground mb-4">Stripe Fees</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 1.5% + 20p (UK cards)</li>
                    <li>• 2.9% + 20p (international)</li>
                    <li>• Extra for currency conversion</li>
                  </ul>
                </div>

                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="text-xl font-bold text-foreground mb-4">Square Fees</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 1.75% (in-person)</li>
                    <li>• 2.5% (online)</li>
                  </ul>
                </div>

                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="text-xl font-bold text-foreground mb-4">PayPal Fees (UK)</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• ~2.99% + fixed fee</li>
                    <li>• Higher for international cards</li>
                    <li>• Disputes and chargebacks are expensive</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5 — Pros & Cons */}
        <section className="section-padding bg-muted/30">
          <div className="section-container">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">
                Pros and Cons
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {/* Stripe */}
                <div className="space-y-6">
                  <div className="bg-card rounded-xl p-6 border border-border">
                    <h3 className="text-lg font-bold text-foreground mb-4">Stripe Pros</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-1 shrink-0" />
                        <span className="text-muted-foreground text-sm">Most advanced online payments</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-1 shrink-0" />
                        <span className="text-muted-foreground text-sm">Global scalability</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-1 shrink-0" />
                        <span className="text-muted-foreground text-sm">Excellent developer tools</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-card rounded-xl p-6 border border-border">
                    <h3 className="text-lg font-bold text-foreground mb-4">Stripe Cons</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <X className="w-4 h-4 text-destructive mt-1 shrink-0" />
                        <span className="text-muted-foreground text-sm">Requires configuration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <X className="w-4 h-4 text-destructive mt-1 shrink-0" />
                        <span className="text-muted-foreground text-sm">Not ideal for 100% in-person businesses</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Square */}
                <div className="space-y-6">
                  <div className="bg-card rounded-xl p-6 border border-border">
                    <h3 className="text-lg font-bold text-foreground mb-4">Square Pros</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-1 shrink-0" />
                        <span className="text-muted-foreground text-sm">Best POS ecosystem</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-1 shrink-0" />
                        <span className="text-muted-foreground text-sm">Free software tools</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-1 shrink-0" />
                        <span className="text-muted-foreground text-sm">Great for small shops</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-card rounded-xl p-6 border border-border">
                    <h3 className="text-lg font-bold text-foreground mb-4">Square Cons</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <X className="w-4 h-4 text-destructive mt-1 shrink-0" />
                        <span className="text-muted-foreground text-sm">Less flexible online</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <X className="w-4 h-4 text-destructive mt-1 shrink-0" />
                        <span className="text-muted-foreground text-sm">Limited customisation</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* PayPal */}
                <div className="space-y-6">
                  <div className="bg-card rounded-xl p-6 border border-border">
                    <h3 className="text-lg font-bold text-foreground mb-4">PayPal Pros</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-1 shrink-0" />
                        <span className="text-muted-foreground text-sm">Universal trust</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-1 shrink-0" />
                        <span className="text-muted-foreground text-sm">Easy for new sellers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-1 shrink-0" />
                        <span className="text-muted-foreground text-sm">Instant acceptance</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-card rounded-xl p-6 border border-border">
                    <h3 className="text-lg font-bold text-foreground mb-4">PayPal Cons</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <X className="w-4 h-4 text-destructive mt-1 shrink-0" />
                        <span className="text-muted-foreground text-sm">Highest fees</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <X className="w-4 h-4 text-destructive mt-1 shrink-0" />
                        <span className="text-muted-foreground text-sm">Not scalable for long-term use</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6 — CTA Section */}
        <section className="section-padding">
          <div className="section-container">
            <div className="relative overflow-hidden rounded-3xl bg-primary p-10 md:p-16 text-center">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -right-1/4 w-96 h-96 rounded-full bg-primary-foreground/10 blur-3xl" />
                <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 rounded-full bg-primary-foreground/10 blur-3xl" />
              </div>
              
              <div className="relative z-10">
                <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-8">
                  Still unsure which provider fits your business? Tell us a bit about what you need and we'll match you instantly.
                </p>
                <div className="flex flex-col items-center">
                  <Button 
                    variant="secondary" 
                    size="xl" 
                    className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                    asChild
                  >
                    <Link to="/quiz?start=true">
                      Answer a few quick questions
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                  <span className="text-sm text-primary-foreground/70 mt-3">Takes under 1 minute • No spam</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7 — Final Note */}
        <section className="section-padding">
          <div className="section-container">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-muted-foreground">
                There's no single "best" provider — Stripe, Square, and PayPal each serve different business models. The right choice depends on how you sell, your volume, and your growth plans. We help you make the right decision instantly.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default StripeVsSquareVsPaypal;
