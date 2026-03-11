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
    <aside className="w-64 shrink-0 border-r border-border bg-muted/30 py-8 px-4 overflow-y-auto">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-5 px-2">
        Progress
      </p>
      <nav className="space-y-1">
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
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-colors",
                isCompleted && "cursor-pointer hover:bg-muted/60 text-muted-foreground",
                isCurrent && "bg-primary/10 text-foreground font-semibold",
                isIncomplete && "cursor-default text-muted-foreground/60"
              )}
            >
              {/* Status indicator */}
              <span className="shrink-0">
                {isCompleted && (
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-600">
                    <Check className="w-3 h-3" strokeWidth={3} />
                  </span>
                )}
                {isCurrent && (
                  <span className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-primary bg-primary/10">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                  </span>
                )}
                {isIncomplete && (
                  <span className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-rose-300/40 bg-rose-50/60" />
                )}
              </span>

              {/* Label */}
              <span className="truncate leading-tight">
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
