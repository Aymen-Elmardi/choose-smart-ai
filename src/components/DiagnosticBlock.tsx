import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Ban, ShieldAlert, Receipt, Scale, Wallet, Check } from "lucide-react";

const problems = [
  { id: "funds-held", label: "My funds are on hold", icon: Ban, slug: "why-payment-accounts-get-frozen-without-warning" },
  { id: "reserve-imposed", label: "A reserve was imposed", icon: ShieldAlert, slug: "scheme-rules-reserves-monitoring" },
  { id: "fees-higher", label: "My fees are higher than expected", icon: Receipt, slug: "crisis/hidden-fee-crisis" },
  { id: "chargeback-lost", label: "I lost a chargeback I thought I would win", icon: Scale, slug: "chargebacks-what-they-are-and-how-to-avoid-them" },
  { id: "payout-mismatch", label: "My payout doesn't match my sales", icon: Wallet, slug: "payment-provider-vs-acquirer-vs-bank" },
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
    const first = problems.find((p) => p.id === selected[0]);
    if (first) {
      navigate(`/insights/${first.slug}`);
    }
  };

  return (
    <section id="diagnostic" className="border-t border-border">
      <div className="section-container py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary text-center mb-4">
            Quick Diagnostic
          </p>
          <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight text-center mb-3">
            What's Happening to You Right Now?
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-10 max-w-md mx-auto">
            Select everything that applies. We'll show you exactly what's going on.
          </p>

          <div className="grid sm:grid-cols-2 gap-3">
            {problems.map((problem) => {
              const isSelected = selected.includes(problem.id);
              const Icon = problem.icon;
              return (
                <button
                  key={problem.id}
                  onClick={() => toggle(problem.id)}
                  className={`relative text-left px-5 py-5 rounded-xl border-2 transition-all duration-200 group ${
                    isSelected
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border bg-background hover:border-primary/30 hover:bg-secondary/40"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-primary/15 text-primary"
                          : "bg-secondary text-muted-foreground group-hover:text-primary/70"
                      }`}
                    >
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <span
                      className={`text-sm font-medium leading-snug pt-2 transition-colors ${
                        isSelected ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {problem.label}
                    </span>
                  </div>
                  {/* Checkmark indicator */}
                  <div
                    className={`absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? "bg-primary text-primary-foreground scale-100"
                        : "border border-border bg-background scale-90 opacity-60"
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" strokeWidth={3} />}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Button
              variant="hero"
              size="lg"
              onClick={handleSubmit}
              disabled={selected.length === 0}
              className="transition-all duration-200"
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
