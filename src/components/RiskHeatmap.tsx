'use client'
import { useState, useMemo } from "react";
import { PROVIDER_REGISTRY, ALL_INDUSTRIES, type RiskLevel } from "@/lib/scoringData";

const riskColors: Record<RiskLevel | "none", { bg: string; text: string; label: string }> = {
  green: { bg: "hsl(142 71% 45% / 0.2)", text: "hsl(142 71% 35%)", label: "Accepted" },
  amber: { bg: "hsl(38 92% 50% / 0.2)", text: "hsl(38 92% 40%)", label: "Review" },
  red: { bg: "hsl(0 84% 60% / 0.15)", text: "hsl(0 84% 50%)", label: "Rejected" },
  none: { bg: "transparent", text: "hsl(var(--muted-foreground))", label: "N/A" },
};

const industryLabels: Record<string, string> = {
  "ecommerce": "E-commerce",
  "saas": "SaaS",
  "marketplace": "Marketplace",
  "retail": "Retail",
  "hospitality": "Hospitality",
  "food-beverage": "Food & Bev",
  "professional-services": "Prof. Services",
  "travel": "Travel",
  "subscription": "Subscription",
  "subscription-box": "Sub Box",
  "digital-goods": "Digital Goods",
  "fashion": "Fashion",
  "mobile-vendor": "Mobile Vendor",
  "market-stall": "Market Stall",
  "franchise": "Franchise",
  "delivery": "Delivery",
  "platform": "Platform",
  "utilities": "Utilities",
  "membership": "Membership",
  "gaming": "Gaming",
  "nutraceuticals": "Nutraceuticals",
  "cbd": "CBD",
  "crypto": "Crypto",
  "gambling": "Gambling",
  "adult": "Adult",
};

const RiskHeatmap = () => {
  const [filterRisk, setFilterRisk] = useState<RiskLevel | "all">("all");

  // Only show industries that have at least some data
  const relevantIndustries = useMemo(() => {
    return ALL_INDUSTRIES.filter(ind =>
      PROVIDER_REGISTRY.some(p => p.riskAppetite[ind])
    );
  }, []);

  const getRisk = (providerId: string, industry: string): RiskLevel | "none" => {
    const provider = PROVIDER_REGISTRY.find(p => p.id === providerId);
    if (!provider) return "none";
    if (provider.exclusions.includes(industry)) return "red";
    return provider.riskAppetite[industry] || "none";
  };

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="section-container max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">
          Risk Appetite Heatmap
        </h2>
        <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
          How each provider rates every industry category. Green = accepted. Amber = additional review. Red = rejected.
        </p>

        {/* Legend + filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {(["all", "green", "amber", "red"] as const).map(level => (
            <button
              key={level}
              onClick={() => setFilterRisk(level)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                filterRisk === level
                  ? "bg-foreground text-background border-foreground"
                  : "bg-card text-muted-foreground border-border hover:bg-secondary"
              }`}
            >
              {level === "all" ? "Show All" : riskColors[level].label}
            </button>
          ))}
        </div>

        {/* Scrollable table */}
        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-2 md:p-3 font-semibold text-foreground sticky left-0 bg-card z-10 min-w-[120px]">
                  Provider
                </th>
                {relevantIndustries.map(ind => (
                  <th
                    key={ind}
                    className="p-2 text-center font-medium text-muted-foreground min-w-[70px]"
                    style={{ writingMode: "vertical-lr", textOrientation: "mixed", height: 100 }}
                  >
                    {industryLabels[ind] || ind}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PROVIDER_REGISTRY.map(provider => (
                <tr key={provider.id} className="border-b border-border/50 hover:bg-secondary/30">
                  <td className="p-2 md:p-3 font-medium text-foreground sticky left-0 bg-card z-10">
                    {provider.name}
                  </td>
                  {relevantIndustries.map(ind => {
                    const risk = getRisk(provider.id, ind);
                    const style = riskColors[risk];
                    const dimmed = filterRisk !== "all" && risk !== filterRisk;

                    return (
                      <td
                        key={ind}
                        className="p-1 text-center"
                        style={{ opacity: dimmed ? 0.15 : 1 }}
                      >
                        <div
                          className="w-6 h-6 rounded mx-auto flex items-center justify-center text-[9px] font-bold"
                          style={{ backgroundColor: style.bg, color: style.text }}
                          title={`${provider.name} → ${industryLabels[ind] || ind}: ${style.label}`}
                        >
                          {risk === "green" ? "✓" : risk === "amber" ? "~" : risk === "red" ? "✕" : "·"}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-4">
          Scroll horizontally to see all industries. Hover over cells for details.
        </p>
      </div>
    </section>
  );
};

export default RiskHeatmap;
