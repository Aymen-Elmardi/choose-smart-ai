import { Link } from '@/lib/router-compat';
import { ArrowRight } from "lucide-react";

interface InlineAssessmentCTAProps {
  context: string;
  cta?: string;
}

const InlineAssessmentCTA = ({
  context,
  cta = "Get your risk profile",
}: InlineAssessmentCTAProps) => {
  return (
    <div className="not-prose my-10 bg-primary/5 border border-primary/15 rounded-lg p-5 md:p-6">
      <p className="text-foreground font-medium mb-3">{context}</p>
      <Link
        to="/assessment"
        className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
      >
        {cta} <ArrowRight className="h-4 w-4" />
      </Link>
      <p className="text-muted-foreground text-sm mt-2">
        2 minutes. Free. No sales calls.
      </p>
    </div>
  );
};

export default InlineAssessmentCTA;
