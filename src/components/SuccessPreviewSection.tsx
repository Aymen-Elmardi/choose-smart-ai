import { CheckCircle } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const deliverables = [
  {
    title: "Infrastructure and Redundancy Assessment",
    description: "Audit your gateway, processor, and acquirer setup for single points of failure",
  },
  {
    title: "Fee Analysis and Negotiation Strategy",
    description: "Benchmark your rates against industry data and identify savings opportunities",
  },
  {
    title: "Risk Profiling and Compliance Review",
    description: "Evaluate PCI, SCA, and fraud exposure across your payment stack",
  },
  {
    title: "Acceptance Rate Optimisation",
    description: "Identify checkout friction, decline patterns, and authorisation improvements",
  },
  {
    title: "Architecture Recommendations",
    description: "Provider mix, routing strategy, and scalability guidance tailored to your business model",
  },
];

const SuccessPreviewSection = () => {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.15 });

  return (
    <section className="section-padding bg-background" ref={ref}>
      <div className="section-container">
        <div className={`text-center max-w-3xl mx-auto mb-12 reveal ${isInView ? "visible" : ""}`}>
          <h2 className="heading-lg text-foreground">
            What the Payment Strategy Review Includes
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            A fixed-scope, fee-based engagement designed for established merchants.
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
