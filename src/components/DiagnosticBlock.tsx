import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Ban, ShieldAlert, Receipt, Scale, Wallet, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const problems = [
  { id: "funds-held", label: "Funds on hold", icon: Ban, route: "/insights?q=frozen+hold+funds&filter=crisis" },
  { id: "reserve-imposed", label: "Reserve imposed", icon: ShieldAlert, route: "/insights?q=reserve" },
  { id: "fees-higher", label: "Unexpected fees", icon: Receipt, route: "/insights?filter=fees" },
  { id: "chargeback-lost", label: "Lost a chargeback", icon: Scale, route: "/insights?q=chargeback" },
  { id: "payout-mismatch", label: "Payout mismatch", icon: Wallet, route: "/insights?q=payout+settlement" },
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
      navigate(first.route);
    }
  };

  const ctaLabel =
    selected.length === 1
      ? `Show Me What This Means for ${problems.find((p) => p.id === selected[0])?.label}`
      : "Show Me What This Means";

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
                    "flex flex-col items-center gap-3 p-5 rounded-xl border-2 transition-all duration-200 text-center cursor-pointer",
                    "hover:border-primary/40 hover:bg-primary/5 hover:shadow-md hover:scale-[1.03]",
                    isSelected
                      ? "border-primary bg-primary/10 shadow-sm ring-2 ring-primary/20"
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
              {ctaLabel}
              <ArrowRight className="w-4 h-4" />
            </Button>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="w-3.5 h-3.5" />
              Trusted by 50+ merchants across the UK and EU
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiagnosticBlock;
