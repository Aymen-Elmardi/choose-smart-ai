import { CheckCircle } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const deliverables = [
  {
    title: "Personalized Risk & Pricing Report",
    description: "Tailored to your business type, volume, and industry",
  },
  {
    title: "Top 3 Provider Matches",
    description: "Ranked by fit, not by who pays us the most",
  },
  {
    title: "Fee Comparison for Your Volume",
    description: "See exactly what you'd pay with each provider",
  },
  {
    title: "Integration Requirements Checklist",
    description: "Know what you need before you commit",
  },
  {
    title: "Direct Provider Contact",
    description: "No middlemen, no sales calls from us",
  },
];

const SuccessPreviewSection = () => {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.15 });

  return (
    <section className="section-padding bg-background" ref={ref}>
      <div className="section-container">
        <div className={`text-center max-w-3xl mx-auto mb-12 reveal ${isInView ? "visible" : ""}`}>
        <h2 className="heading-lg text-foreground">
            Your Free Report Includes
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            In 60 seconds, you'll receive everything you need to make a confident decision.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="space-y-4">
            {deliverables.map((item, index) => (
              <div
                key={item.title}
                className={`flex items-start gap-4 p-4 rounded-xl bg-secondary/50 reveal stagger-${index + 1} ${isInView ? "visible" : ""}`}
              >
                <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className={`text-center mt-10 text-sm text-muted-foreground reveal stagger-4 ${isInView ? "visible" : ""}`}>
          Completely free. No signup required. No spam.
        </p>
      </div>
    </section>
  );
};

export default SuccessPreviewSection;
