import { CheckCircle } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const deliverables = [
  {
    title: "Best Fit Provider",
    description: "The provider most aligned to your risk profile and business model",
  },
  {
    title: "Acceptable Alternatives",
    description: "Providers that can work but may have trade-offs for your specific situation",
  },
  {
    title: "Providers to Avoid",
    description: "And exactly why they don't fit — with clear elimination reasons",
  },
  {
    title: "Reserve Risk Indicator",
    description: "Likelihood of holds being placed on your funds based on your profile",
  },
  {
    title: "Risk Confidence Level",
    description: "How strong the match signal is based on the data you provided",
  },
];

const SuccessPreviewSection = () => {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.15 });

  return (
    <section className="section-padding bg-background" ref={ref}>
      <div className="section-container">
        <div className={`text-center max-w-3xl mx-auto mb-12 reveal ${isInView ? "visible" : ""}`}>
          <h2 className="heading-lg text-foreground">
            What Your Risk Profile Reveals
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Based on your business profile, we show you:
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
      </div>
    </section>
  );
};

export default SuccessPreviewSection;
