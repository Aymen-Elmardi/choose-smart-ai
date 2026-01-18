import { useEffect, useState } from "react";
import { Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InsightTransitionProps {
  text: string;
  onContinue: () => void;
  autoAdvanceDelay?: number; // milliseconds, if provided will auto-advance
}

const InsightTransition = ({ 
  text, 
  onContinue, 
  autoAdvanceDelay = 4000 
}: InsightTransitionProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + (100 / (autoAdvanceDelay / 50));
      });
    }, 50);

    // Auto-advance after delay
    const timer = setTimeout(() => {
      onContinue();
    }, autoAdvanceDelay);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onContinue, autoAdvanceDelay]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress bar at top */}
      <div className="h-1 bg-muted">
        <div
          className="h-full bg-primary transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-lg animate-fade-up">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
              <Lightbulb className="w-8 h-8 text-amber-600" />
            </div>
          </div>

          {/* Label */}
          <p className="text-sm font-semibold text-amber-600 uppercase tracking-wide mb-3">
            Expert Tip
          </p>

          {/* Insight text */}
          <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed mb-8">
            {text}
          </p>

          {/* Continue button */}
          <Button
            variant="outline"
            size="lg"
            onClick={onContinue}
            className="text-muted-foreground hover:text-foreground"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InsightTransition;
