import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Question } from "@/types/quiz";

interface QuizSidebarProps {
  questions: Question[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

const QuizSidebar = ({ questions, currentStep, onStepClick }: QuizSidebarProps) => {
  return (
    <aside className="w-72 shrink-0 border-r border-border bg-card py-10 px-5 overflow-y-auto">
      {/* Header */}
      <div className="mb-8 px-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/70">
          Your progress
        </p>
        <div className="mt-3 h-1.5 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / questions.length) * 100}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-muted-foreground/60">
          {currentStep} of {questions.length}
        </p>
      </div>

      {/* Steps */}
      <nav className="space-y-0.5">
        {questions.map((q, idx) => {
          const stepNum = idx + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;
          const isIncomplete = stepNum > currentStep;

          return (
            <button
              key={q.id}
              onClick={() => isCompleted && onStepClick(stepNum)}
              disabled={!isCompleted}
              className={cn(
                "group w-full flex items-center gap-3.5 px-3 py-3 rounded-lg text-left text-[13px] transition-all duration-200",
                isCompleted && "cursor-pointer hover:bg-muted/80 text-muted-foreground",
                isCurrent && "bg-primary/8 text-foreground font-medium ring-1 ring-primary/15",
                isIncomplete && "cursor-default text-muted-foreground/40"
              )}
            >
              {/* Step number / status indicator */}
              <span className="shrink-0">
                {isCompleted && (
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/12 text-primary group-hover:bg-primary/20 transition-colors">
                    <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </span>
                )}
                {isCurrent && (
                  <span className="relative flex items-center justify-center w-6 h-6 rounded-full border-2 border-primary bg-primary/10">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    {/* Subtle pulse */}
                    <span className="absolute inset-0 rounded-full border-2 border-primary/20" />
                  </span>
                )}
                {isIncomplete && (
                  <span className="flex items-center justify-center w-6 h-6 rounded-full border-[1.5px] border-destructive/20 bg-destructive/5">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive/20" />
                  </span>
                )}
              </span>

              {/* Label */}
              <span className="truncate leading-snug">
                {q.question}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default QuizSidebar;
