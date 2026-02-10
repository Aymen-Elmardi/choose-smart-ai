import { CheckCircle } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const deliverables = [
  {
    title: "Independent Situation Review",
    description: "We review your business type, volume, and risk profile with no provider bias",
  },
  {
    title: "Honest Payment Guidance",
    description: "Clear advice on which payment options are most likely to work for your business",
  },
  {
    title: "Risk and Fit Assessment",
    description: "Understand where your business sits from an underwriting perspective",
  },
  {
    title: "Practical Next Steps",
    description: "Know exactly what to do next, whether that's applying or addressing gaps first",
  },
  {
    title: "Human Follow-Up",
    description: "A real person reviews your answers and responds with tailored advice",
  },
];

const SuccessPreviewSection = () => {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.15 });

  return (
    <section className="section-padding bg-background" ref={ref}>
      <div className="section-container">
        <div className={`text-center max-w-3xl mx-auto mb-12 reveal ${isInView ? "visible" : ""}`}>
        <h2 className="heading-lg text-foreground">
            What You Get From Our Advisory
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Complete the assessment and a payments advisor will review your situation independently.
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
          Completely free. No signup required. No automated recommendations.
        </p>
      </div>
    </section>
  );
};

export default SuccessPreviewSection;
