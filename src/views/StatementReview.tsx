'use client'

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useCanonical } from "@/hooks/useCanonical";
import { Upload, ShieldCheck, ArrowRight, Loader2, Check, CheckCircle2 } from "lucide-react";

// Providers cycled through in the loader while the statement is analysed.
const PROVIDERS = [
  "Stripe", "Square", "PayPal", "Worldpay", "Barclaycard", "Dojo", "SumUp",
  "Zettle", "Adyen", "Checkout.com", "Global Payments", "Elavon",
  "Takepayments", "Teya", "Tyl by NatWest", "Lloyds Cardnet",
];

interface Comparison {
  goodRate: number;
  typicalRate: number;
  monthlyOverpayGBP: number | null;
  annualOverpayGBP: number | null;
  verdict: "well-priced" | "mid-market" | "likely-overpaying";
}
interface Analysis {
  provider: string | null;
  period: string | null;
  totalCardVolumeGBP: number | null;
  totalFeesGBP: number | null;
  effectiveRatePct: number | null;
  pricingModel: string;
  confidence: "high" | "medium" | "low";
  comparison: Comparison | null;
}

const fileToBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve((r.result as string).split(",")[1] || "");
    r.onerror = reject;
    r.readAsDataURL(file);
  });
const fileToText = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve((r.result as string) || "");
    r.onerror = reject;
    r.readAsText(file);
  });

const verdictCopy: Record<Comparison["verdict"], { label: string; tone: string }> = {
  "well-priced": { label: "Your rate looks competitive", tone: "text-primary" },
  "mid-market": { label: "Your rate is around the middle of the market", tone: "text-foreground" },
  "likely-overpaying": { label: "You may be paying more than you need to", tone: "text-destructive" },
};

const StatementReview = () => {
  useCanonical();
  const [email, setEmail] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [providerIdx, setProviderIdx] = useState(0);
  const [cur, setCur] = useState("£");

  // US visitors arrive with ?us=1 (from the /us CTAs) — show $ instead of £.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get("us") === "1" || p.get("market") === "us") setCur("$");
  }, []);

  // While analysing, cycle through provider names every ~500ms.
  useEffect(() => {
    if (!submitting) return;
    setProviderIdx(0);
    const id = setInterval(() => setProviderIdx((i) => (i + 1) % PROVIDERS.length), 500);
    return () => clearInterval(id);
  }, [submitting]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Please enter a valid email.");
    if (!file) return setError("Please attach your statement (PDF or CSV).");
    if (file.size > 10 * 1024 * 1024) return setError("File is too large (max 10MB).");

    setSubmitting(true);
    try {
      const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
      const fileType = isPdf ? "pdf" : "csv";
      const body: Record<string, unknown> = { email: email.trim(), fileType, fileName: file.name };
      if (isPdf) body.fileBase64 = await fileToBase64(file);
      else body.csvText = await fileToText(file);

      const { data, error: fnError } = await supabase.functions.invoke("analyze-statement", { body });
      if (fnError || !data?.success) throw new Error(data?.error || "Something went wrong.");
      setAnalysis(data.analysis as Analysis);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-24">
        <div className="section-container max-w-2xl mx-auto">
          {submitting ? (
            <div className="text-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 max-w-xl mx-auto leading-snug">
                Analysing your rate against other statements from businesses
              </h2>
              <p className="text-muted-foreground mb-10">This usually takes a few seconds — hang tight.</p>
              <div className="flex items-center justify-center gap-2.5 text-foreground font-medium">
                <Check className="w-5 h-5 text-primary shrink-0" />
                <span>
                  Comparing with <span className="text-primary">{PROVIDERS[providerIdx]}</span>
                </span>
              </div>
            </div>
          ) : !analysis ? (
            <>
              <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  See if you're overpaying
                </h1>
                <p className="text-lg text-muted-foreground">
                  Upload your latest payment processing statement and we'll work out your all-in
                  effective rate and how it compares. Takes about a minute.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Your statement (PDF or CSV)</label>
                  <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border rounded-xl p-8 cursor-pointer hover:border-primary/40 transition-colors text-center">
                    <Upload className="w-6 h-6 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {file ? file.name : "Click to upload or drag your statement here"}
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.csv,application/pdf,text/csv"
                      className="hidden"
                      onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Your email</label>
                  <Input
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    We'll send your result here. We never share your statement.
                  </p>
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <Button type="submit" variant="hero" size="lg" className="w-full" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Analysing your statement…
                    </>
                  ) : (
                    <>
                      See if you're overpaying <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>

                <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                  <ShieldCheck className="w-3.5 h-3.5" /> Independent and confidential. Indicative guidance only.
                </p>
              </form>
            </>
          ) : (
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Your statement, reviewed</h1>

              {analysis.comparison ? (
                <div className="mb-6">
                  <p className={`text-xl font-semibold mb-2 ${verdictCopy[analysis.comparison.verdict].tone}`}>
                    {verdictCopy[analysis.comparison.verdict].label}
                  </p>
                  {analysis.comparison.verdict === "likely-overpaying" &&
                    (analysis.comparison.annualOverpayGBP != null ? (
                      <p className="text-muted-foreground">
                        Indicatively, that could be around{" "}
                        <strong className="text-foreground">
                          {cur}{analysis.comparison.annualOverpayGBP.toLocaleString()}/year
                        </strong>{" "}
                        more than a {analysis.comparison.typicalRate}% all-in rate.
                      </p>
                    ) : (
                      <p className="text-muted-foreground">
                        That's above the {analysis.comparison.typicalRate}% all-in rate we typically see, and
                        well above the {analysis.comparison.goodRate}% the sharpest-priced businesses achieve.
                      </p>
                    ))}
                  <p className="text-sm text-muted-foreground mt-3">
                    For context, well-priced businesses pay around {analysis.comparison.goodRate}–
                    {analysis.comparison.typicalRate}% all-in.
                  </p>
                </div>
              ) : (
                <p className="text-muted-foreground mb-6">
                  We couldn't confidently read every figure from this statement, so some details below
                  may be incomplete.
                </p>
              )}

              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <Stat label="Provider" value={analysis.provider} />
                <Stat label="Period" value={analysis.period} />
                <Stat label="Card volume" value={analysis.totalCardVolumeGBP != null ? `${cur}${analysis.totalCardVolumeGBP.toLocaleString()}` : null} />
                <Stat label="Total fees" value={analysis.totalFeesGBP != null ? `${cur}${analysis.totalFeesGBP.toLocaleString()}` : null} />
                <Stat label="Effective rate" value={analysis.effectiveRatePct != null ? `${analysis.effectiveRatePct}%` : null} />
                <Stat label="Pricing model" value={analysis.pricingModel} />
              </div>

              <p className="text-xs text-muted-foreground mb-6">
                These figures are read automatically from your statement and are indicative, not a
                formal quote. Confidence: {analysis.confidence}.
              </p>

              <div className="rounded-xl bg-primary/5 border border-primary/20 p-5 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">All done — we've got your statement.</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Our team will review it and reach out{email ? <> to <span className="text-foreground">{email}</span></> : null} with
                    better options for your business. Nothing more to do for now.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

const Stat = ({ label, value }: { label: string; value: string | null }) => (
  <div className="border border-border rounded-lg p-3">
    <div className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium">{label}</div>
    <div className="text-foreground font-medium">{value ?? "—"}</div>
  </div>
);

export default StatementReview;
