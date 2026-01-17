import { Lightbulb } from "lucide-react";

interface MicroInsightProps {
  text: string;
}

const MicroInsight = ({ text }: MicroInsightProps) => {
  return (
    <div className="mt-6 max-w-md mx-auto animate-fade-up">
      <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
          <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-amber-800 dark:text-amber-300 mb-0.5">
            Expert Tip
          </p>
          <p className="text-sm text-amber-700 dark:text-amber-400/90 leading-relaxed">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MicroInsight;
