import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCanonical } from "@/hooks/useCanonical";
import { useSEO } from "@/hooks/useSEO";

const formatGBP = (n: number) =>
  `£${n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

interface ProviderResult {
  name: string;
  monthlyFee: number;
  effectiveRate: string;
  note: string;
}

function calculate(
  monthlyVolume: number,
  avgTxn: number,
  cnpPct: number
): ProviderResult[] {
  if (monthlyVolume <= 0 || avgTxn <= 0) return [];

  const txnCount = monthlyVolume / avgTxn;
  const cnpTxns = txnCount * (cnpPct / 100);
  const cpTxns = txnCount * (1 - cnpPct / 100);
  const cnpVolume = cnpTxns * avgTxn;
  const cpVolume = cpTxns * avgTxn;

  // Stripe: 1.5% + 20p (UK cards online), 1.4% + 20p (UK cards in-person)
  // EU: 2.5% + 20p, Intl: 3.25% + 20p — calculator assumes UK cards
  const stripeCnp = cnpVolume * 0.015 + cnpTxns * 0.2;
  const stripeCp = cpVolume * 0.014 + cpTxns * 0.2;
  const stripeFee = stripeCnp + stripeCp;

  // Adyen: interchange++ — 0.95% + £0.07 processing markup
  // Plus estimated interchange: 0.3% UK debit (~70%), 0.6% UK credit (~30%) = weighted ~0.39%
  const adyenInterchange = monthlyVolume * 0.0039;
  const adyenProcessing = monthlyVolume * 0.0095 + txnCount * 0.07;
  const adyenFee = adyenInterchange + adyenProcessing;

  // Checkout.com: 0.95% + 20p
  const checkoutFee = monthlyVolume * 0.0095 + txnCount * 0.2;

  // PayPal: 1.29% + 30p (standard UK), 2.9% + 30p (intl) — calculator assumes UK
  const paypalFee = monthlyVolume * 0.0129 + txnCount * 0.3;

  // Square: 1.75% in-person, 2.5% online
  const squareCp = cpVolume * 0.0175;
  const squareCnp = cnpVolume * 0.025;
  const squareFee = squareCp + squareCnp;

  const results: ProviderResult[] = [
    {
      name: "Stripe",
      monthlyFee: stripeFee,
      effectiveRate: ((stripeFee / monthlyVolume) * 100).toFixed(2) + "%",
      note: cnpPct === 100 ? "1.5% + 20p online (UK cards)" : "1.4% + 20p in-person, 1.5% + 20p online",
    },
    {
      name: "Adyen",
      monthlyFee: adyenFee,
      effectiveRate: ((adyenFee / monthlyVolume) * 100).toFixed(2) + "%",
      note: "IC++: ~0.39% interchange + 0.95% + 7p",
    },
    {
      name: "Checkout.com",
      monthlyFee: checkoutFee,
      effectiveRate: ((checkoutFee / monthlyVolume) * 100).toFixed(2) + "%",
      note: "0.95% + 20p per transaction",
    },
    {
      name: "PayPal",
      monthlyFee: paypalFee,
      effectiveRate: ((paypalFee / monthlyVolume) * 100).toFixed(2) + "%",
      note: "1.29% + 30p standard UK rate",
    },
    {
      name: "Square",
      monthlyFee: squareFee,
      effectiveRate: ((squareFee / monthlyVolume) * 100).toFixed(2) + "%",
      note: cnpPct === 100 ? "2.5% online" : "1.75% in-person, 2.5% online",
    },
  ];

  return results.sort((a, b) => a.monthlyFee - b.monthlyFee);
}

const FeeCalculator = () => {
  useCanonical();
  useSEO({
    title: "Payment Fee Calculator UK 2026 — ChosePayments",
    description:
      "Calculate and compare payment processing fees from Stripe, Adyen, Checkout.com, PayPal and Square. See which provider is cheapest for your UK business.",
    keywords: [
      "payment fee calculator",
      "stripe fee calculator",
      "payment processing costs uk",
      "compare payment fees",
    ],
  });

  const [volume, setVolume] = useState(10000);
  const [avgTxn, setAvgTxn] = useState(50);
  const [cnpPct, setCnpPct] = useState(100);

  const results = useMemo(
    () => calculate(volume, avgTxn, cnpPct),
    [volume, avgTxn, cnpPct]
  );

  const txnCount = avgTxn > 0 ? Math.round(volume / avgTxn) : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Hero */}
          <section className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-6">
              <Calculator className="w-7 h-7" aria-hidden />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Payment Fee Calculator
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enter your business details and instantly compare estimated monthly
              fees across five major UK payment providers.
            </p>
          </section>

          {/* Inputs */}
          <Card className="mb-10">
            <CardHeader>
              <CardTitle className="text-lg">Your Business Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="volume">Monthly Card Volume (£)</Label>
                  <Input
                    id="volume"
                    type="number"
                    min={0}
                    step={1000}
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="avgTxn">Average Transaction (£)</Label>
                  <Input
                    id="avgTxn"
                    type="number"
                    min={1}
                    step={5}
                    value={avgTxn}
                    onChange={(e) => setAvgTxn(Number(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cnp">Online (Card-Not-Present) %</Label>
                  <div className="flex items-center gap-3">
                    <input
                      id="cnp"
                      type="range"
                      min={0}
                      max={100}
                      step={5}
                      value={cnpPct}
                      onChange={(e) => setCnpPct(Number(e.target.value))}
                      className="flex-1 accent-primary h-2 rounded-full cursor-pointer"
                    />
                    <span className="text-sm font-medium tabular-nums w-12 text-right">
                      {cnpPct}%
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {cnpPct}% online · {100 - cnpPct}% in-person
                  </p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mt-4">
                ≈ {txnCount.toLocaleString("en-GB")} transactions per month at{" "}
                {formatGBP(avgTxn)} average
              </p>
            </CardContent>
          </Card>

          {/* Results */}
          {results.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-4">
                Estimated Monthly Fees
              </h2>

              <div className="rounded-xl border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-8">#</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead className="text-right">Monthly Fee</TableHead>
                      <TableHead className="text-right hidden sm:table-cell">
                        Effective Rate
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Pricing Model
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((r, i) => (
                      <TableRow
                        key={r.name}
                        className={i === 0 ? "bg-green-50/60 dark:bg-green-950/20" : ""}
                      >
                        <TableCell className="font-medium text-muted-foreground">
                          {i + 1}
                        </TableCell>
                        <TableCell className="font-semibold">
                          {r.name}
                          {i === 0 && (
                            <span className="ml-2 text-xs font-medium text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/40 px-1.5 py-0.5 rounded">
                              Cheapest
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-right font-semibold tabular-nums">
                          {formatGBP(r.monthlyFee)}
                        </TableCell>
                        <TableCell className="text-right tabular-nums hidden sm:table-cell">
                          {r.effectiveRate}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground hidden md:table-cell">
                          {r.note}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {results.length >= 2 && (
                <p className="text-sm text-muted-foreground mt-3">
                  Potential monthly saving vs most expensive:{" "}
                  <span className="font-semibold text-foreground">
                    {formatGBP(
                      results[results.length - 1].monthlyFee -
                        results[0].monthlyFee
                    )}
                  </span>
                </p>
              )}
            </section>
          )}

          {/* Methodology */}
          <Card className="bg-muted/30 mb-10">
            <CardHeader>
              <CardTitle className="text-lg">How We Calculate</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground border-b">
                      <th className="pb-2 pr-4 font-medium">Provider</th>
                      <th className="pb-2 pr-4 font-medium">Online</th>
                      <th className="pb-2 font-medium">In-Person</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-medium text-foreground">Stripe</td>
                      <td className="py-2 pr-4">1.5% + 20p</td>
                      <td className="py-2">1.4% + 20p</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-medium text-foreground">Adyen</td>
                      <td className="py-2 pr-4" colSpan={2}>0.95% + 7p + interchange (~0.39%)</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-medium text-foreground">Checkout.com</td>
                      <td className="py-2 pr-4" colSpan={2}>0.95% + 20p</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-medium text-foreground">PayPal</td>
                      <td className="py-2 pr-4" colSpan={2}>1.29% + 30p</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-medium text-foreground">Square</td>
                      <td className="py-2 pr-4">2.5%</td>
                      <td className="py-2">1.75%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground">
                Standard UK domestic card rates as of April 2026. Actual fees
                vary by contract, volume tier, and card mix.
              </p>
            </CardContent>
          </Card>

          {/* Deep-dive links */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold mb-3">Read the Full Fee Breakdowns</h2>
            <ul className="grid sm:grid-cols-2 gap-2 text-sm">
              <li>
                <Link to="/insights/stripe-fees-explained" className="text-primary hover:underline">Stripe Fees Explained</Link>
              </li>
              <li>
                <Link to="/insights/adyen-pricing-explained" className="text-primary hover:underline">Adyen Pricing Explained</Link>
              </li>
              <li>
                <Link to="/insights/checkout-com-fees-explained" className="text-primary hover:underline">Checkout.com Fees Explained</Link>
              </li>
              <li>
                <Link to="/insights/paypal-fees-explained" className="text-primary hover:underline">PayPal Fees Explained</Link>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <Card className="text-center border-primary/20 bg-primary/5">
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold mb-3">
                These are estimates based on standard published rates
              </h2>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                Get a personalised recommendation based on your business
                profile, risk signals, and industry — not just listed prices.
              </p>
              <Button variant="hero" size="lg" asChild>
                <Link to="/assessment">
                  Get Your Free Recommendation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FeeCalculator;
