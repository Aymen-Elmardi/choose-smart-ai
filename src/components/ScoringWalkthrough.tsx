import { useState, useMemo } from "react";
import { PROVIDER_REGISTRY, SAMPLE_WALKTHROUGH, type ProviderConfig } from "@/lib/scoringData";

interface ScoredProvider {
  provider: ProviderConfig;
  score: number;
  reasons: string[];
  eliminated: boolean;
  eliminationReason?: string;
}

const runElimination = (providers: ProviderConfig[]): ScoredProvider[] => {
  const answers = SAMPLE_WALKTHROUGH.answers;
  const requiredTypes = ["online", "marketplace"] as const;
  const volume = 35000; // 20k-50k midpoint

  return providers.map(p => {
    // Check payment types
    if (!requiredTypes.every(t => p.paymentTypes.includes(t as any))) {
      return { provider: p, score: 0, reasons: [], eliminated: true, eliminationReason: "Missing marketplace payment type" };
    }
    // Check region
    if (!p.regions.includes("UK") && !p.regions.includes("both")) {
      return { provider: p, score: 0, reasons: [], eliminated: true, eliminationReason: "Region mismatch (UK required)" };
    }
    // Check volume
    if (volume < p.minimumMonthlyVolume) {
      return { provider: p, score: 0, reasons: [], eliminated: true, eliminationReason: `Volume below minimum (£${p.minimumMonthlyVolume.toLocaleString()})` };
    }
    // Check exclusions
    if (p.exclusions.includes(answers.industry)) {
      return { provider: p, score: 0, reasons: [], eliminated: true, eliminationReason: "Industry excluded" };
    }
    if (p.riskAppetite[answers.industry] === "red") {
      return { provider: p, score: 0, reasons: [], eliminated: true, eliminationReason: "Red risk appetite" };
    }
    // Check marketplace
    if (!p.marketplaceCapability) {
      return { provider: p, score: 0, reasons: [], eliminated: true, eliminationReason: "No marketplace capability" };
    }

    // Score
    let score = 50;
    const reasons: string[] = [];

    const risk = p.riskAppetite[answers.industry];
    if (risk === "green") { score += 20; reasons.push("Risk fit: +20 (green)"); }
    else if (risk === "amber") { score += 5; reasons.push("Risk fit: +5 (amber)"); }

    if (p.strengths.includes("transparent-pricing")) { score += 10; reasons.push("Priority: low-fees +10"); }
    if (p.strengths.includes("international")) { score += 10; reasons.push("Priority: international +10"); }
    if (p.splitPaymentsSupport) { score += 15; reasons.push("Feature: split payments +15"); }

    return { provider: p, score, reasons, eliminated: false };
  });
};

const ScoringWalkthrough = () => {
  const [step, setStep] = useState<0 | 1 | 2>(0);

  const results = useMemo(() => runElimination(PROVIDER_REGISTRY), []);
  const eliminated = results.filter(r => r.eliminated);
  const survivors = results.filter(r => !r.eliminated).sort((a, b) => b.score - a.score);

  return (
    <section className="py-16 md:py-24">
      <div className="section-container max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">
          Example Walkthrough
        </h2>
        <p className="text-muted-foreground text-center mb-3 max-w-2xl mx-auto">
          Watch the engine process a real profile step by step.
        </p>

        {/* Profile card */}
        <div className="bg-card border border-border rounded-xl p-5 max-w-lg mx-auto mb-10">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">Sample Profile</div>
          <div className="text-sm text-foreground font-medium">{SAMPLE_WALKTHROUGH.label}</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {["online", "marketplace", "UK", "£20k-50k", "split-payments", "low-fees", "international"].map(tag => (
              <span key={tag} className="px-2.5 py-1 rounded-full bg-secondary text-xs text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Step tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {(["Eliminate", "Score", "Rank"] as const).map((label, i) => (
            <button
              key={label}
              onClick={() => setStep(i as 0 | 1 | 2)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                step === i
                  ? "bg-foreground text-background"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              }`}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>

        {/* Step content */}
        {step === 0 && (
          <div>
            <p className="text-sm text-muted-foreground mb-6 text-center">
              <span className="font-semibold text-foreground">{eliminated.length}</span> providers eliminated,{" "}
              <span className="font-semibold text-foreground">{survivors.length}</span> survive.
            </p>
            <div className="grid gap-2 max-w-2xl mx-auto">
              {eliminated.map(r => (
                <div
                  key={r.provider.id}
                  className="flex items-center justify-between px-4 py-2.5 rounded-lg border border-border bg-card"
                >
                  <span className="text-sm text-muted-foreground line-through">{r.provider.name}</span>
                  <span className="text-xs px-2.5 py-1 rounded-full" style={{ backgroundColor: "hsl(0 84% 60% / 0.1)", color: "hsl(0 84% 50%)" }}>
                    {r.eliminationReason}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-3 max-w-2xl mx-auto">
            {survivors.map(r => (
              <div
                key={r.provider.id}
                className="px-4 py-3 rounded-lg border border-border bg-card"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{r.provider.name}</span>
                  <span className="text-sm font-bold text-foreground">{r.score} pts</span>
                </div>
                {/* Score bar */}
                <div className="w-full h-2 rounded-full bg-secondary mb-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(100, (r.score / 95) * 100)}%`,
                      backgroundColor: "hsl(var(--primary))",
                    }}
                  />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {r.reasons.map((reason, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                      {reason}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="max-w-2xl mx-auto space-y-4">
            {survivors.slice(0, 3).map((r, i) => (
              <div
                key={r.provider.id}
                className={`px-5 py-4 rounded-xl border-2 ${
                  i === 0 ? "border-primary bg-primary/5" : "border-border bg-card"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      i === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="font-semibold text-foreground">{r.provider.name}</span>
                  <span className="ml-auto font-bold text-foreground">{r.score} pts</span>
                </div>
                <p className="text-sm text-muted-foreground">{r.provider.description}</p>
                {i === 0 && (
                  <div className="mt-2 text-xs font-medium" style={{ color: "hsl(var(--primary))" }}>
                    ★ Primary Recommendation
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ScoringWalkthrough;
