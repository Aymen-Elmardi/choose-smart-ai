import { Check, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface MatchScoreCardProps {
  matchScore: number;
  providerName: string;
  matchDrivers: string[];
}

const MatchScoreCard = ({ matchScore, providerName, matchDrivers }: MatchScoreCardProps) => {
  // Determine score color based on percentage
  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-emerald-600";
    if (score >= 70) return "text-primary";
    return "text-amber-600";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 85) return "bg-emerald-50";
    if (score >= 70) return "bg-primary/10";
    return "bg-amber-50";
  };

  const getProgressColor = (score: number) => {
    if (score >= 85) return "bg-emerald-500";
    if (score >= 70) return "bg-primary";
    return "bg-amber-500";
  };

  return (
    <Card className="border-2 border-primary/20 shadow-elegant animate-fade-up">
      <CardContent className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          {/* Match Score Circle */}
          <div className={`flex-shrink-0 w-28 h-28 mx-auto md:mx-0 rounded-full ${getScoreBgColor(matchScore)} flex flex-col items-center justify-center`}>
            <div className="flex items-baseline">
              <span className={`text-4xl font-bold ${getScoreColor(matchScore)}`}>
                {matchScore}
              </span>
              <span className={`text-xl font-medium ${getScoreColor(matchScore)}`}>%</span>
            </div>
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide mt-1">
              Match Score
            </span>
          </div>

          {/* Match Details */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Primary Match</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">{providerName}</h3>
            
            {/* Progress Bar */}
            <div className="w-full bg-muted rounded-full h-2 mb-4">
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out ${getProgressColor(matchScore)}`}
                style={{ width: `${matchScore}%` }}
              />
            </div>

            {/* Key Match Drivers */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Key Match Drivers
              </span>
              <ul className="space-y-1.5">
                {matchDrivers.slice(0, 3).map((driver, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{driver}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchScoreCard;
