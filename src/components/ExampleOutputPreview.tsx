import { Link } from "react-router-dom";
import { ArrowRight, Shield, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";

const ExampleOutputPreview = () => {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.15 });

  return (
    <section ref={ref} className="section-padding bg-secondary/30">
      <div className="section-container max-w-4xl mx-auto">
        <div className={`text-center mb-12 reveal ${isInView ? "visible" : ""}`}>
          <p className="text-sm font-medium text-muted-foreground mb-3 tracking-wide">
            Example Engine Output
          </p>
          <h2 className="heading-lg text-foreground">
            What Your Risk Profile Looks Like
          </h2>
        </div>

        <div className={`reveal stagger-1 ${isInView ? "visible" : ""}`}>
          {/* Profile card */}
          <div className="rounded-xl border border-border bg-card p-5 mb-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">Business Profile</div>
            <div className="flex flex-wrap gap-2">
              {["UK", "SaaS", "£120k/month", "Subscription model"].map(tag => (
                <span key={tag} className="px-2.5 py-1 rounded-full bg-secondary text-xs text-muted-foreground font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Result card */}
          <div className="rounded-xl border-2 border-primary/20 bg-card overflow-hidden">
            {/* Risk indicators */}
            <div className="flex border-b border-border divide-x divide-border">
              <div className="flex-1 p-4 text-center">
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Risk Confidence</div>
                <div className="text-sm font-bold text-primary">High</div>
              </div>
              <div className="flex-1 p-4 text-center">
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Funds Hold Risk</div>
                <div className="text-sm font-bold" style={{ color: "hsl(142 71% 45%)" }}>Low</div>
              </div>
            </div>

            {/* Best Fit */}
            <div className="p-5 border-b border-border">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-xs uppercase tracking-wider font-bold text-primary">Best Fit</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">1</span>
                <div>
                  <div className="font-semibold text-foreground">Checkout.com</div>
                  <div className="text-sm text-muted-foreground">Strong risk fit • Enterprise volume • Subscription billing</div>
                </div>
              </div>
            </div>

            {/* Acceptable */}
            <div className="p-5 border-b border-border">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs uppercase tracking-wider font-bold text-muted-foreground">Acceptable</span>
              </div>
              <div className="space-y-2">
                {["Stripe", "Adyen"].map((name, i) => (
                  <div key={name} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-secondary text-muted-foreground flex items-center justify-center text-xs font-bold">{i + 2}</span>
                    <span className="text-sm font-medium text-foreground">{name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Avoid */}
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="w-4 h-4" style={{ color: "hsl(0 84% 60%)" }} />
                <span className="text-xs uppercase tracking-wider font-bold" style={{ color: "hsl(0 84% 60%)" }}>Avoid for This Profile</span>
              </div>
              <div className="space-y-1.5">
                {[
                  { name: "Square", reason: "No subscription billing" },
                  { name: "SumUp", reason: "Volume below threshold" },
                ].map(item => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground line-through">{item.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "hsl(0 84% 60% / 0.1)", color: "hsl(0 84% 50%)" }}>
                      {item.reason}
                    </span>
                  </div>
                ))}
              </div>
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
            <p className="mt-3 text-xs text-muted-foreground">Takes 2 minutes • Human-reviewed guidance</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExampleOutputPreview;
