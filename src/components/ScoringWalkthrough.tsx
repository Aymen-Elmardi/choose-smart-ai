import { useState, useMemo } from "react";
import { PROVIDER_REGISTRY, SAMPLE_WALKTHROUGH, type ProviderConfig } from "@/lib/scoringData";

interface EliminatedProvider {
  provider: ProviderConfig;
  reason: string;
}

interface ScoredProvider {
  provider: ProviderConfig;
  score: number;
  reasons: string[];
}

const runEngine = (providers: ProviderConfig[]) => {
  const answers = SAMPLE_WALKTHROUGH.answers;
  const requiredTypes = ["online", "marketplace"] as const;
  const volume = 35000; // 20k-50k midpoint
  const industry = answers.industry;

  const eliminated: EliminatedProvider[] = [];
  const survivors: ProviderConfig[] = [];

  // Stage 1: Hard elimination with reasons
  for (const p of providers) {
    if (!requiredTypes.every(t => p.paymentTypes.includes(t as any))) {
      eliminated.push({ provider: p, reason: "Does not support required payment type" });
      continue;
    }
    if (!p.regions.includes("UK") && !p.regions.includes("both")) {
      eliminated.push({ provider: p, reason: "Region mismatch (UK required)" });
      continue;
    }
    if (volume < p.minimumMonthlyVolume) {
      eliminated.push({ provider: p, reason: `Volume below minimum (£${p.minimumMonthlyVolume.toLocaleString()})` });
      continue;
    }
    if (p.exclusions.includes(industry)) {
      eliminated.push({ provider: p, reason: "Industry excluded" });
      continue;
    }
    if (p.riskAppetite[industry] === "red") {
      eliminated.push({ provider: p, reason: "Risk tolerance exceeded" });
      continue;
    }
    if (!p.marketplaceCapability) {
      eliminated.push({ provider: p, reason: "No marketplace capability" });
      continue;
    }
    survivors.push(p);
  }

  // Stage 2: Score (rebalanced weights)
  const scored: ScoredProvider[] = survivors.map(p => {
    let score = 50;
    const reasons: string[] = [];

    const risk = p.riskAppetite[industry];
    if (risk === "green") { score += 40; reasons.push("Risk fit: +40 (green)"); }
    else if (risk === "amber") { score += 10; reasons.push("Risk fit: +10 (amber)"); }

    // Volume: 10k-50k tier
    if (p.minimumMonthlyVolume <= 10000) { score += 10; reasons.push("Volume fit: +10"); }

    // Priorities capped at +20
    let priorityScore = 0;
    if (p.strengths.includes("transparent-pricing")) { priorityScore += 5; reasons.push("Priority: low-fees +5"); }
    if (p.strengths.includes("international")) { priorityScore += 5; reasons.push("Priority: international +5"); }
    score += Math.min(priorityScore, 20);

    if (p.splitPaymentsSupport) { score += 15; reasons.push("Feature: split payments +15"); }

    return { provider: p, score, reasons };
  });

  scored.sort((a, b) => b.score - a.score);

  // Risk confidence + reserve probability
  const bestMatch = scored[0];
  const riskConfidence = scored.length >= 5 && bestMatch?.provider.riskAppetite[industry] === "green" ? "High" : scored.length >= 3 ? "Medium" : "Low";
  const reserveProbability = bestMatch?.provider.riskAppetite[industry] === "green" ? "Low" : "Moderate";

  return { eliminated, scored, riskConfidence, reserveProbability };
};

const ScoringWalkthrough = () => {
  const [step, setStep] = useState<0 | 1 | 2>(0);

  const { eliminated, scored, riskConfidence, reserveProbability } = useMemo(() => runEngine(PROVIDER_REGISTRY), []);

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
          {(["Eliminate", "Score", "Result"] as const).map((label, i) => (
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
              <span className="font-semibold text-foreground">{scored.length}</span> survive.
            </p>
            <div className="grid gap-2 max-w-2xl mx-auto">
              {eliminated.map(r => (
                <div
                  key={r.provider.id}
                  className="flex items-center justify-between px-4 py-2.5 rounded-lg border border-border bg-card"
                >
                  <span className="text-sm text-muted-foreground line-through">{r.provider.name}</span>
                  <span className="text-xs px-2.5 py-1 rounded-full" style={{ backgroundColor: "hsl(0 84% 60% / 0.1)", color: "hsl(0 84% 50%)" }}>
                    {r.reason}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-3 max-w-2xl mx-auto">
            {scored.map(r => (
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
                      width: `${Math.min(100, (r.score / 130) * 100)}%`,
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
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Risk indicators */}
            <div className="flex gap-4">
              <div className="flex-1 rounded-lg border border-border bg-card p-4 text-center">
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Risk Confidence</div>
                <div className="text-lg font-bold text-primary">{riskConfidence}</div>
              </div>
              <div className="flex-1 rounded-lg border border-border bg-card p-4 text-center">
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Reserve Probability</div>
                <div className="text-lg font-bold" style={{ color: reserveProbability === "Low" ? "hsl(142 71% 45%)" : "hsl(38 92% 50%)" }}>{reserveProbability}</div>
              </div>
            </div>

            {/* Best Fit */}
            {scored[0] && (
              <div className="px-5 py-4 rounded-xl border-2 border-primary bg-primary/5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">1</span>
                  <span className="text-xs uppercase tracking-wider font-bold text-primary">Best Fit</span>
                  <span className="ml-auto font-bold text-foreground">{scored[0].score} pts</span>
                </div>
                <span className="font-semibold text-foreground">{scored[0].provider.name}</span>
                <p className="text-sm text-muted-foreground mt-1">{scored[0].provider.description}</p>
              </div>
            )}

            {/* Acceptable */}
            {scored.slice(1, 3).map((r, i) => (
              <div key={r.provider.id} className="px-5 py-4 rounded-xl border border-border bg-card">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-7 h-7 rounded-full bg-secondary text-muted-foreground flex items-center justify-center text-xs font-bold">{i + 2}</span>
                  <span className="text-xs uppercase tracking-wider font-bold text-muted-foreground">Acceptable</span>
                  <span className="ml-auto font-bold text-foreground">{r.score} pts</span>
                </div>
                <span className="font-semibold text-foreground">{r.provider.name}</span>
                <p className="text-sm text-muted-foreground mt-1">{r.provider.description}</p>
              </div>
            ))}

            {/* Avoid */}
            <div className="px-5 py-4 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs uppercase tracking-wider font-bold" style={{ color: "hsl(0 84% 60%)" }}>Avoid for This Profile</span>
              </div>
              <div className="space-y-2">
                {eliminated.slice(0, 4).map(r => (
                  <div key={r.provider.id} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground line-through">{r.provider.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "hsl(0 84% 60% / 0.1)", color: "hsl(0 84% 50%)" }}>
                      {r.reason}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ScoringWalkthrough;
