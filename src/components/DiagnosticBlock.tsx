import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const problems = [
  { id: "funds-held", label: "My funds are on hold", slug: "why-payment-accounts-get-frozen-without-warning" },
  { id: "reserve-imposed", label: "A reserve was imposed", slug: "scheme-rules-reserves-monitoring" },
  { id: "fees-higher", label: "My fees are higher than expected", slug: "crisis/hidden-fee-crisis" },
  { id: "chargeback-lost", label: "I lost a chargeback I thought I would win", slug: "chargebacks-what-they-are-and-how-to-avoid-them" },
  { id: "payout-mismatch", label: "My payout doesn't match my sales", slug: "payment-provider-vs-acquirer-vs-bank" },
];

const DiagnosticBlock = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    if (selected.length === 0) return;
    // Navigate to the first selected problem's article
    const first = problems.find((p) => p.id === selected[0]);
    if (first) {
      navigate(`/insights/${first.slug}`);
    }
  };

  return (
    <section id="diagnostic" className="border-t border-border bg-secondary/30">
      <div className="section-container py-16 md:py-20">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight text-center mb-10">
            What's Happening to You Right Now?
          </h2>
          <div className="space-y-3">
            {problems.map((problem) => {
              const isSelected = selected.includes(problem.id);
              return (
                <button
                  key={problem.id}
                  onClick={() => toggle(problem.id)}
                  className={`w-full text-left px-5 py-4 rounded-lg border transition-colors text-sm font-medium ${
                    isSelected
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-background text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  <span className="mr-3 inline-block w-4 text-center">
                    {isSelected ? "✓" : "☐"}
                  </span>
                  {problem.label}
                </button>
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <Button
              variant="hero"
              size="lg"
              onClick={handleSubmit}
              disabled={selected.length === 0}
            >
              Show Me What This Means
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiagnosticBlock;
