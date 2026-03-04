import { useState } from "react";

const stages = [
  {
    id: "input",
    label: "Quiz Answers In",
    detail: "Channel, business type, volume, priorities, features, industry",
    color: "hsl(var(--primary))",
    bgColor: "hsl(var(--primary) / 0.1)",
  },
  {
    id: "eliminate",
    label: "Stage 1: Eliminate",
    detail: "Hard disqualifiers — payment type, region, volume, exclusions, risk appetite",
    color: "hsl(0 84% 60%)",
    bgColor: "hsl(0 84% 60% / 0.1)",
  },
  {
    id: "score",
    label: "Stage 2: Score",
    detail: "Multi-axis points — risk fit, volume alignment, priority match, feature fit",
    color: "hsl(38 92% 50%)",
    bgColor: "hsl(38 92% 50% / 0.1)",
  },
  {
    id: "rank",
    label: "Stage 3: Rank",
    detail: "Sort by total score → Top 1 primary + 2 alternatives",
    color: "hsl(142 71% 45%)",
    bgColor: "hsl(142 71% 45% / 0.1)",
  },
];

const ScoringFlowchart = () => {
  const [activeStage, setActiveStage] = useState<string | null>(null);

  return (
    <section className="py-16 md:py-24">
      <div className="section-container max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">
          The Pipeline
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Every recommendation passes through three stages. 21 providers enter. 3 come out.
        </p>

        <div className="flex flex-col items-center gap-0">
          {stages.map((stage, i) => (
            <div key={stage.id} className="flex flex-col items-center w-full max-w-md">
              {/* Stage box */}
              <div
                className="w-full border-2 rounded-xl p-5 md:p-6 cursor-pointer transition-all duration-200 hover:shadow-md"
                style={{
                  borderColor: activeStage === stage.id ? stage.color : "hsl(var(--border))",
                  backgroundColor: activeStage === stage.id ? stage.bgColor : "hsl(var(--card))",
                }}
                onMouseEnter={() => setActiveStage(stage.id)}
                onMouseLeave={() => setActiveStage(null)}
              >
                <div className="font-semibold text-foreground text-sm md:text-base mb-1">
                  {stage.label}
                </div>
                <div className="text-muted-foreground text-xs md:text-sm">
                  {stage.detail}
                </div>
              </div>

              {/* Arrow connector */}
              {i < stages.length - 1 && (
                <div className="flex flex-col items-center py-1">
                  <div className="w-px h-6 bg-border" />
                  <svg width="12" height="8" viewBox="0 0 12 8" className="text-muted-foreground">
                    <path d="M6 8L0 0h12z" fill="currentColor" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Provider count callout */}
        <div className="mt-10 flex justify-center gap-6 md:gap-10 text-center">
          <div>
            <div className="text-2xl font-bold text-foreground">21</div>
            <div className="text-xs text-muted-foreground">Providers In</div>
          </div>
          <div className="text-muted-foreground self-center">→</div>
          <div>
            <div className="text-2xl font-bold" style={{ color: "hsl(0 84% 60%)" }}>~8–15</div>
            <div className="text-xs text-muted-foreground">Survive Elimination</div>
          </div>
          <div className="text-muted-foreground self-center">→</div>
          <div>
            <div className="text-2xl font-bold" style={{ color: "hsl(142 71% 45%)" }}>3</div>
            <div className="text-xs text-muted-foreground">Recommended</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScoringFlowchart;
