import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BOOKING_URL } from "@/lib/booking";

/**
 * The only two calls to action articles use: "Write to us" (/contact) and
 * "Book a call" (the Google booking calendar). Three placements, each with
 * fixed copy, so every article says the same thing:
 *
 * - WriteToUsLine: subtle line after the first section
 * - TalkItThroughBox: the box with both buttons
 * - SecondOpinionLine: closing line
 *
 * Every link carries data-cta and data-placement for the GA4 listener
 * (CtaTracking).
 */

export type CtaPlacement = "inline" | "mid" | "end";

const textLink = "text-primary font-medium hover:underline";

export const WriteToUsLine = ({ className = "" }: { className?: string }) => (
  <p className={className}>
    Not sure which option fits?{" "}
    <Link href="/contact" data-cta="write" data-placement="inline" className={textLink}>
      Write to us
    </Link>{" "}
    and tell us how you take payments.
  </p>
);

interface TalkItThroughBoxProps {
  placement?: CtaPlacement;
  /** "inverted" for use on a solid primary-colour band. */
  tone?: "default" | "inverted";
}

export const TalkItThroughBox = ({ placement = "mid", tone = "default" }: TalkItThroughBoxProps) => {
  const inverted = tone === "inverted";
  return (
    <div className="text-center">
      <h2 className={`text-2xl md:text-3xl font-semibold mb-4 ${inverted ? "text-primary-foreground" : "text-foreground"}`}>
        Talk it through with us
      </h2>
      <p className={`text-lg max-w-2xl mx-auto mb-8 ${inverted ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
        Tell us your volume, sales model and country. We will tell you which providers fit.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button
          size="lg"
          variant={inverted ? "secondary" : "default"}
          className={inverted ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90" : ""}
          asChild
        >
          <Link href="/contact" data-cta="write" data-placement={placement}>
            Write to us
            <ArrowRight className="w-5 h-5" />
          </Link>
        </Button>
        <Button
          size="lg"
          variant="outline"
          className={inverted ? "border-primary-foreground/60 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" : ""}
          asChild
        >
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-cta="call" data-placement={placement}>
            Book a call
          </a>
        </Button>
      </div>
    </div>
  );
};

export const SecondOpinionLine = ({ className = "" }: { className?: string }) => (
  <p className={className}>
    If you want a second opinion before you apply,{" "}
    <Link href="/contact" data-cta="write" data-placement="end" className={textLink}>
      write to us
    </Link>{" "}
    or{" "}
    <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-cta="call" data-placement="end" className={textLink}>
      book a short call
    </a>
    .
  </p>
);
