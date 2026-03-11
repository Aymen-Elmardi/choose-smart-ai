import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Ban, ShieldAlert, Receipt, Scale, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

const problems = [
  { id: "funds-held", label: "Funds on hold", icon: Ban, slug: "why-payment-accounts-get-frozen-without-warning" },
  { id: "reserve-imposed", label: "Reserve imposed", icon: ShieldAlert, slug: "scheme-rules-reserves-monitoring" },
  { id: "fees-higher", label: "Unexpected fees", icon: Receipt, slug: "crisis/hidden-fee-crisis" },
  { id: "chargeback-lost", label: "Lost a chargeback", icon: Scale, slug: "chargebacks-what-they-are-and-how-to-avoid-them" },
  { id: "payout-mismatch", label: "Payout mismatch", icon: Wallet, slug: "payment-provider-vs-acquirer-vs-bank" },
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
    <section id="diagnostic" className="border-t border-border bg-secondary/30">
      <div className="section-container py-16 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight text-center mb-3">
            What's Happening to You Right Now?
          </h2>
          <p className="text-muted-foreground text-center mb-10 text-sm max-w-lg mx-auto">
            Select any issues you're experiencing. We'll show you exactly what's going on and what to do about it.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {problems.map((problem) => {
              const isSelected = selected.includes(problem.id);
              const Icon = problem.icon;
              return (
                <button
                  key={problem.id}
                  onClick={() => toggle(problem.id)}
                  className={cn(
                    "flex flex-col items-center gap-3 p-5 rounded-xl border-2 transition-all duration-200 text-center",
                    "hover:border-primary/40 hover:bg-primary/5",
                    isSelected
                      ? "border-primary bg-primary/10 shadow-sm"
                      : "border-border bg-card"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                    isSelected ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                  )}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={cn(
                    "text-sm font-medium leading-tight",
                    isSelected ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {problem.label}
                  </span>
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
