import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScoringFlowchart from "@/components/ScoringFlowchart";
import RiskHeatmap from "@/components/RiskHeatmap";
import ScoringWalkthrough from "@/components/ScoringWalkthrough";
import { useSEO } from "@/hooks/useSEO";
import { PROVIDER_REGISTRY, SCORING_DIMENSIONS, ELIMINATION_RULES } from "@/lib/scoringData";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { useState } from "react";
import { Link } from "react-router-dom";

const ScoringLogic = () => {
  useSEO({
    title: "How We Match You to a Provider | Scoring Logic Explained | ChosePayments",
    description: "See exactly how our recommendation engine eliminates, scores, and ranks 21 payment providers. No black boxes — full transparency.",
    canonical: "/insights/scoring-logic",
  });

  const [openRule, setOpenRule] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-24">
        {/* Hero */}
        <section className="section-container max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            How We Match You to a Provider
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            The scoring logic behind every recommendation — no black boxes.
          </p>
          <p className="text-sm text-muted-foreground">
            Based on {PROVIDER_REGISTRY.length} providers, 6 scoring axes, and real elimination rules.
          </p>
        </section>

        {/* Pipeline Flowchart */}
        <ScoringFlowchart />

        {/* Hard Elimination Rules */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="section-container max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">
              Stage 1: Hard Elimination
            </h2>
            <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
              Before scoring, providers that can't serve you are removed entirely. These are binary — pass or fail.
            </p>

            <div className="grid gap-3">
              {ELIMINATION_RULES.map((rule, i) => (
                <Collapsible key={i} open={openRule === i} onOpenChange={() => setOpenRule(openRule === i ? null : i)}>
                  <CollapsibleTrigger asChild>
                    <Card className="cursor-pointer hover:shadow-sm transition-shadow">
                      <CardContent className="p-4 md:p-5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span
                              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                              style={{ backgroundColor: "hsl(0 84% 60% / 0.1)", color: "hsl(0 84% 50%)" }}
                            >
                              ✕
                            </span>
                            <span className="font-medium text-foreground text-sm md:text-base">{rule.rule}</span>
                          </div>
                          <svg
                            className={`w-4 h-4 text-muted-foreground transition-transform ${openRule === i ? "rotate-180" : ""}`}
                            fill="none" viewBox="0 0 24 24" stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </CardContent>
                    </Card>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-5 pb-4 pt-0 -mt-1 bg-card border border-t-0 border-border rounded-b-lg">
                      <p className="text-sm text-muted-foreground mb-3">{rule.description}</p>
                      <div className="bg-secondary/50 rounded-lg p-3 mb-3">
                        <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1 font-medium">Example</div>
                        <p className="text-sm text-foreground">{rule.example}</p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <span className="font-medium">Typically eliminates:</span>{" "}
                        {rule.typicallyEliminates.join(", ")}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>
        </section>

        {/* Scoring Dimensions */}
        <section className="py-16 md:py-24">
          <div className="section-container max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">
              Stage 2: Multi-Axis Scoring
            </h2>
            <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
              Every surviving provider starts at 50 points. Then we add or subtract based on how well they match your profile.
            </p>

            <div className="overflow-x-auto rounded-xl border border-border bg-card">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/30">
                    <th className="text-left p-4 font-semibold text-foreground">Dimension</th>
                    <th className="text-center p-4 font-semibold text-foreground">Max Points</th>
                    <th className="text-left p-4 font-semibold text-foreground">Logic</th>
                  </tr>
                </thead>
                <tbody>
                  {SCORING_DIMENSIONS.map((dim, i) => (
                    <tr key={i} className="border-b border-border/50">
                      <td className="p-4 font-medium text-foreground">{dim.dimension}</td>
                      <td className="p-4 text-center">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary">
                          +{dim.maxPoints}
                        </span>
                      </td>
                      <td className="p-4 text-muted-foreground">{dim.logic}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Provider Registry Matrix */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="section-container max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">
              Provider Registry
            </h2>
            <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
              All {PROVIDER_REGISTRY.length} providers in the engine. This is what the system knows about each one.
            </p>

            <div className="overflow-x-auto rounded-xl border border-border bg-card">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border bg-secondary/30">
                    <th className="text-left p-3 font-semibold text-foreground sticky left-0 bg-secondary/30 z-10 min-w-[120px]">Provider</th>
                    <th className="p-3 text-center font-semibold text-foreground min-w-[80px]">Payment Types</th>
                    <th className="p-3 text-center font-semibold text-foreground min-w-[70px]">Terminal</th>
                    <th className="p-3 text-center font-semibold text-foreground min-w-[80px]">Marketplace</th>
                    <th className="p-3 text-center font-semibold text-foreground min-w-[60px]">Regions</th>
                    <th className="p-3 text-center font-semibold text-foreground min-w-[80px]">Min Volume</th>
                    <th className="text-left p-3 font-semibold text-foreground min-w-[200px]">Key Strengths</th>
                  </tr>
                </thead>
                <tbody>
                  {PROVIDER_REGISTRY.map(p => (
                    <tr key={p.id} className="border-b border-border/50 hover:bg-secondary/20">
                      <td className="p-3 font-medium text-foreground sticky left-0 bg-card z-10">{p.name}</td>
                      <td className="p-3 text-center text-muted-foreground">
                        {p.paymentTypes.map(t => t === "in-person" ? "🏪" : t === "online" ? "🌐" : t === "marketplace" ? "🏬" : "🔄").join(" ")}
                      </td>
                      <td className="p-3 text-center text-muted-foreground">
                        {p.terminalSupport.includes("none") ? "—" : "✓"}
                      </td>
                      <td className="p-3 text-center">
                        {p.marketplaceCapability ? (
                          <span style={{ color: "hsl(142 71% 45%)" }}>✓</span>
                        ) : "—"}
                      </td>
                      <td className="p-3 text-center text-muted-foreground">{p.regions.join(", ")}</td>
                      <td className="p-3 text-center text-muted-foreground">
                        {p.minimumMonthlyVolume === 0 ? "None" : `£${(p.minimumMonthlyVolume / 1000).toFixed(0)}k`}
                      </td>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-1">
                          {p.strengths.slice(0, 4).map(s => (
                            <span key={s} className="px-2 py-0.5 rounded-full bg-secondary text-[10px] text-muted-foreground">
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Risk Heatmap */}
        <RiskHeatmap />

        {/* Example Walkthrough */}
        <ScoringWalkthrough />

        {/* CTA */}
        <section className="py-16 bg-foreground text-background">
          <div className="section-container max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              See Your Own Score
            </h2>
            <p className="text-background/70 mb-8">
              Run your business profile through the engine. Takes 2 minutes.
            </p>
            <Link
              to="/assessment"
              className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
            >
              Start Assessment
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ScoringLogic;
