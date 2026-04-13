import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

  // Stripe: 1.5% + 20p (UK cards CNP), 1.4% + 20p (UK cards CP via Terminal)
  // Simplify: assume all UK cards
  const stripeCnp = cnpVolume * 0.015 + cnpTxns * 0.2;
  const stripeCp = cpVolume * 0.014 + cpTxns * 0.2;
  const stripeFee = stripeCnp + stripeCp;

  // Adyen: interchange++ model
  // Estimate interchange 0.3% (UK debit ~70%) + 0.6% (UK credit ~30%) = weighted ~0.39%
  // Scheme fees ~0.15%, Adyen markup 0.60% + £0.07/txn
  const adyenInterchange = monthlyVolume * 0.0039;
  const adyenScheme = monthlyVolume * 0.0015;
  const adyenMarkup = monthlyVolume * 0.006 + txnCount * 0.07;
  const adyenFee = adyenInterchange + adyenScheme + adyenMarkup;

  // Checkout.com: 0.95% + 20p
  const checkoutFee = monthlyVolume * 0.0095 + txnCount * 0.2;

  // PayPal: 1.29% + 30p (standard UK)
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
      note: cnpPct === 100 ? "1.5% + 20p online" : "1.4% + 20p in-person, 1.5% + 20p online",
    },
    {
      name: "Adyen",
      monthlyFee: adyenFee,
      effectiveRate: ((adyenFee / monthlyVolume) * 100).toFixed(2) + "%",
      note: "Interchange++ (est. 0.39% IC + 0.15% scheme + 0.60% markup + 7p/txn)",
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
          <section className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm mb-10">
            <h2 className="text-lg font-semibold mb-6">Your Business Details</h2>

            <div className="grid gap-6 sm:grid-cols-3">
              {/* Monthly volume */}
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

              {/* Average transaction */}
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

              {/* CNP split */}
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
          </section>

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
          <section className="rounded-xl border border-border bg-muted/30 p-6 md:p-8 mb-10">
            <h2 className="text-lg font-semibold mb-3">How We Calculate</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <strong className="text-foreground">Stripe</strong> — 1.5% + 20p
                for UK cards online, 1.4% + 20p via Stripe Terminal in-person.
                European and international card rates are higher.
              </li>
              <li>
                <strong className="text-foreground">Adyen</strong> — Interchange++
                model. We estimate weighted interchange at 0.39% (70% UK debit at
                0.3%, 30% UK credit at 0.6%), scheme fees at 0.15%, and Adyen
                markup at 0.60% + 7p per transaction.
              </li>
              <li>
                <strong className="text-foreground">Checkout.com</strong> — 0.95% +
                20p per transaction (published UK rate for standard accounts).
              </li>
              <li>
                <strong className="text-foreground">PayPal</strong> — 1.29% + 30p
                standard UK commercial rate. International and PayPal-wallet
                transactions are higher.
              </li>
              <li>
                <strong className="text-foreground">Square</strong> — 1.75% for
                in-person (card-present), 2.5% for online (card-not-present). No
                per-transaction fixed fee.
              </li>
            </ul>
            <p className="text-xs text-muted-foreground mt-4">
              All rates are based on publicly available standard pricing as of
              April 2026. Actual fees vary by contract, volume tier, and card mix.
            </p>
          </section>

          {/* CTA */}
          <section className="text-center rounded-xl border border-primary/20 bg-primary/5 p-8">
            <h2 className="text-xl font-semibold mb-3">
              These are estimates based on standard published rates
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Get a personalised recommendation based on your business profile,
              risk signals, and industry — not just listed prices.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/assessment">
                Get Your Free Recommendation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FeeCalculator;
