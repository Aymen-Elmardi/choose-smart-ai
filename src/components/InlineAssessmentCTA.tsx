import { ArrowRight } from "lucide-react";
import { BOOKING_URL } from "@/lib/booking";

interface InlineAssessmentCTAProps {
  context: string;
}

const InlineAssessmentCTA = ({ context }: InlineAssessmentCTAProps) => {
  return (
    <div className="not-prose my-10 bg-primary/5 border border-primary/15 rounded-lg p-5 md:p-6">
      <p className="text-foreground font-medium mb-3">{context}</p>
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
      >
        Book a 15-Minute Call <ArrowRight className="h-4 w-4" />
      </a>
      <p className="text-muted-foreground text-sm mt-2">
        Free. No sales pitch. No strings attached.
      </p>
    </div>
  );
};

export default InlineAssessmentCTA;
