import { Link } from '@/lib/router-compat';
import { ArrowRight, ShieldX, CheckCircle, Building2, Globe, TrendingUp, CreditCard, ShoppingCart, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";

const ExampleOutputPreview = () => {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.15 });

  return (
    <section ref={ref} className="section-padding bg-secondary/30">
      <div className="section-container max-w-3xl mx-auto">
        <div className={`text-center mb-12 reveal ${isInView ? "visible" : ""}`}>
          <p className="text-sm font-medium text-muted-foreground mb-3 tracking-wide">
            Example Engine Output
          </p>
          <h2 className="heading-lg text-foreground">
            What Your Risk Profile Looks Like
          </h2>
        </div>

        <div className={`reveal stagger-1 ${isInView ? "visible" : ""}`}>
          {/* Section 1 — Business Profile */}
          <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-6 mb-6">
            <h3 className="text-sm font-bold text-foreground mb-4">Your Business Profile</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {[
                { icon: ShoppingCart, label: "Sales Channel", value: "Online" },
                { icon: Building2, label: "Business Type", value: "SaaS / Subscription" },
                { icon: Tag, label: "Industry", value: "Software" },
                { icon: TrendingUp, label: "Monthly Volume", value: "£120k/month" },
                { icon: CreditCard, label: "Avg. Transaction", value: "£85" },
                { icon: Globe, label: "Location", value: "United Kingdom" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5">
                    <item.icon className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">{item.label}</div>
                    <div className="text-sm font-medium text-foreground">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-primary/15">
              <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide mb-2">Priorities</div>
              <div className="flex flex-wrap gap-2">
                {["Low fees", "Recurring billing", "Fast settlement"].map((p) => (
                  <span key={p} className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Risk Alignment Score */}
          <div className="flex justify-center mb-5">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-primary/10 border border-primary/20">
              <div className="text-3xl font-bold text-primary">91%</div>
              <div className="text-left">
                <div className="text-sm font-semibold text-foreground">Risk Alignment</div>
                <div className="text-xs text-muted-foreground">Match confidence score</div>
              </div>
            </div>
          </div>

          {/* Section 2 — Recommended Provider */}
          <div className="rounded-xl border border-border/60 bg-card p-5 mb-5">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Recommended Provider</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">Checkout.com</h3>
            <p className="text-muted-foreground text-sm mb-3">Strong risk fit for subscription SaaS at scale-up volume.</p>
            <ul className="space-y-1.5">
              {[
                "Interchange++ pricing at this volume tier",
                "Native recurring billing support",
                "Low funds-hold risk for established SaaS",
              ].map((r, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3 — Not Suited */}
          <div className="rounded-xl border-2 border-destructive/20 bg-destructive/5 p-5 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <ShieldX className="w-5 h-5 text-destructive" />
              <span className="text-sm font-bold text-destructive uppercase tracking-wider">Not Suited for This Profile</span>
            </div>
            <div className="space-y-3">
              {[
                { name: "Square", reason: "No subscription billing support at this volume" },
                { name: "SumUp", reason: "Volume cap well below £120k/month threshold" },
              ].map((item) => (
                <div key={item.name} className="flex items-start gap-3 px-4 py-3 rounded-lg bg-background border border-destructive/15">
                  <ShieldX className="w-4 h-4 text-destructive/70 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm font-semibold text-foreground">{item.name}</span>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <Button variant="hero" size="xl" asChild>
              <Link to="/assessment">
                Run My Risk Profile
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <p className="mt-3 text-xs text-muted-foreground">Takes 2 minutes. Human-reviewed guidance.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExampleOutputPreview;
