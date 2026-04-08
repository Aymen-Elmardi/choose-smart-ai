import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { CreditCard, ArrowRight, ArrowLeft, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import InsightTransition from "@/components/InsightTransition";

// Import from modular quiz architecture
import type { QuizAnswers, Market } from "@/types/quiz";
import { INITIAL_QUIZ_ANSWERS } from "@/types/quiz";
import {
  getQuestions,
  getQuestionCount,
} from "@/lib/quiz/quizQuestions";
import {
  mapSalesChannelToFlags,
  mapTerminalType,
  mapMonthlyVolume,
  mapPriority,
  mapBusinessType,
  mapAvgTransaction,
} from "@/lib/quiz/quizAnswerMappers";
import { getActiveMicroInsight } from "@/lib/quiz/quizMicroInsights";
import { initializeSessionTracking, markQuizStart } from "@/lib/sessionTracking";

const Quiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Always start at Question 1 (no intro screen)
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswers>(INITIAL_QUIZ_ANSWERS);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // Insight transition state
  const [showInsightTransition, setShowInsightTransition] = useState(false);
  const [pendingInsightText, setPendingInsightText] = useState<string | null>(null);
  const [pendingAdvance, setPendingAdvance] = useState<(() => void) | null>(null);

  // Detect market based on referrer path (if coming from /us page)
  const [market] = useState<Market>(() => {
    const referrer = document.referrer;
    const isFromUS = referrer.includes("/us") || location.state?.market === "US";
    return isFromUS ? "US" : "UK";
  });

  // Track whether assessment_start has already been pushed
  const assessmentStartFired = useRef(false);

  // Initialize session tracking and mark quiz start when component mounts
  useEffect(() => {
    initializeSessionTracking();
    window.scrollTo(0, 0);
    markQuizStart();

    // Push assessment_start event once
    if (!assessmentStartFired.current) {
      assessmentStartFired.current = true;
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({ event: "assessment_start" });
    }
  }, []);

  // Update SEO metadata
  useEffect(() => {
    document.title = "Payment Advisory Assessment | ChosePayments";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      "content",
      "Complete a short assessment and receive independent payment advice tailored to your business. No automated recommendations. Human-reviewed guidance."
    );

    return () => {
      document.title = "ChosePayments - Independent Payment Advisory";
    };
  }, []);

  const questionCount = getQuestionCount(answers);
  // Progress: questions only (no welcome step)
  const progress = (currentStep / questionCount) * 100;

  const handleOptionSelect = (
    questionId: string,
    option: string,
    multiSelect?: boolean,
    maxSelect?: number
  ) => {
    let updatedAnswers = { ...answers };

    // Handle sales channel with explicit flag mapping
    if (questionId === "salesChannel") {
      const flags = mapSalesChannelToFlags(option);
      updatedAnswers = {
        ...updatedAnswers,
        salesChannel: option,
        needsOnline: flags.needsOnline,
        needsInPerson: flags.needsInPerson,
        needsMarketplace: flags.needsMarketplace,
        // Reset terminal type if in-person is not needed
        terminalType: flags.needsInPerson ? updatedAnswers.terminalType : "",
      };
    }
    // Handle terminal type mapping
    else if (questionId === "terminalType") {
      updatedAnswers.terminalType = mapTerminalType(option);
    }
    // Handle business type - set marketplace flag if applicable
    else if (questionId === "businessType") {
      updatedAnswers.businessType = option;
      if (option === "Marketplace or platform" || option === "Platform") {
        updatedAnswers.needsMarketplace = true;
      }
    }
    // Handle multi-select with max limit
    else if (multiSelect) {
      const currentValues = answers[questionId as keyof QuizAnswers] as string[];
      let newValues: string[];

      if (currentValues.includes(option)) {
        newValues = currentValues.filter((v) => v !== option);
      } else {
        // Enforce max selection limit
        if (maxSelect && currentValues.length >= maxSelect) {
          // Replace oldest selection
          newValues = [...currentValues.slice(1), option];
        } else {
          newValues = [...currentValues, option];
        }
      }
      (updatedAnswers as any)[questionId] = newValues;
    }
    // Handle all other single-select options
    else {
      (updatedAnswers as any)[questionId] = option;
    }

    setAnswers(updatedAnswers);

    // For single-select questions, auto-advance (with insight transition if applicable)
    if (!multiSelect) {
      // Check if this answer triggers a micro-insight
      const insightText = getActiveMicroInsight(questionId, option);

      const advanceToNext = () => {
        // Recalculate questions based on the updated answers to ensure correct navigation
        const questions = getQuestions(updatedAnswers);
        const currentQuestionIndex = questions.findIndex((q) => q.id === questionId);
        const isLastQuestion = currentQuestionIndex === questions.length - 1;
        
        if (isLastQuestion) {
          // Push assessment_complete event
           (window as any).dataLayer = (window as any).dataLayer || [];
           (window as any).dataLayer.push({ event: "assessment_complete" });
          // OPTIMISTIC: Navigate immediately, save in background
          navigate("/recommendation?fromQuiz=true");
          // Prepare engine-compatible answers
          const engineAnswers = prepareEngineAnswers(updatedAnswers);
          sessionStorage.setItem("quizAnswers", JSON.stringify(engineAnswers));
          sessionStorage.setItem("quizAnswersRaw", JSON.stringify(updatedAnswers));
          sessionStorage.setItem("quizMarket", market);
        } else {
          // Find the next question index in the updated question list
          const nextQuestionIndex = currentQuestionIndex + 1;
          // Set step to the next question's position (1-indexed)
          setCurrentStep(nextQuestionIndex + 1);
        }
      };

      if (insightText) {
        // Show insight transition screen instead of inline delay
        setPendingInsightText(insightText);
        setPendingAdvance(() => advanceToNext);
        setShowInsightTransition(true);
      } else {
        advanceToNext();
      }
    }
  };

  const handleDropdownSelect = (questionId: string, value: string) => {
    const updatedAnswers = { ...answers, [questionId]: value };
    setAnswers(updatedAnswers);
    setDropdownOpen(false);

    // Auto-advance after dropdown selection
    const questions = getQuestions(updatedAnswers);
    const currentQuestionIndex = questions.findIndex((q) => q.id === questionId);
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    if (isLastQuestion) {
          (window as any).dataLayer = (window as any).dataLayer || [];
          (window as any).dataLayer.push({ event: "assessment_complete" });
          navigate("/recommendation?fromQuiz=true");
          const engineAnswers = prepareEngineAnswers(updatedAnswers);
          sessionStorage.setItem("quizAnswers", JSON.stringify(engineAnswers));
          sessionStorage.setItem("quizAnswersRaw", JSON.stringify(updatedAnswers));
          sessionStorage.setItem("quizMarket", market);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  // Prepare answers for the engine (map to expected format)
  const prepareEngineAnswers = (ans: QuizAnswers) => {
    // Map salesChannel to engine format
    let engineSalesChannel = ans.salesChannel;
    if (ans.salesChannel === "In person only") {
      engineSalesChannel = "In person";
    } else if (ans.salesChannel === "Online and in person") {
      engineSalesChannel = "Both online and in person";
    } else if (ans.salesChannel === "Marketplace or platform") {
      engineSalesChannel = "Through a marketplace or platform";
    }

    return {
      salesChannel: engineSalesChannel,
      businessType: mapBusinessType(ans.businessType),
      priorities: ans.priorities.map(mapPriority),
      location: ans.location,
      monthlyVolume: mapMonthlyVolume(ans.monthlyVolume),
      avgTransaction: mapAvgTransaction(ans.avgTransaction),
      features: [], // Not collecting features in this flow
      // Additional metadata for lead capture
      industry: ans.industry,
      deliveryTimeline: ans.deliveryTimeline,
      buyingIntent: ans.buyingIntent,
      contactTime: ans.contactTime,
      terminalType: ans.terminalType,
      previousRestriction: ans.previousRestriction,
    };
  };

  const handleNext = () => {
    if (currentStep <= questionCount) {
      const questions = getQuestions(answers);
      const question = questions[currentStep - 1];
      if (question?.multiSelect) {
        const isLastQuestion = currentStep === questionCount;
        if (isLastQuestion) {
          (window as any).dataLayer = (window as any).dataLayer || [];
          (window as any).dataLayer.push({ event: "assessment_complete" });
          navigate("/recommendation?fromQuiz=true");
          const engineAnswers = prepareEngineAnswers(answers);
          sessionStorage.setItem("quizAnswers", JSON.stringify(engineAnswers));
          sessionStorage.setItem("quizAnswersRaw", JSON.stringify(answers));
          sessionStorage.setItem("quizMarket", market);
        } else {
          setCurrentStep((prev) => prev + 1);
        }
      }
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      // On first question, navigate to homepage (never exit to external referrer)
      navigate("/", { replace: true });
    } else if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const canProceed = () => {
    if (currentStep > questionCount) return true;

    const questions = getQuestions(answers);
    const question = questions[currentStep - 1];
    const answer = answers[question.id as keyof QuizAnswers];

    if (question.multiSelect) {
      return (answer as string[]).length > 0;
    }
    if (question.type === "dropdown") {
      return !!answer;
    }
    return !!answer;
  };

  // Handle insight transition continue
  const handleInsightContinue = useCallback(() => {
    setShowInsightTransition(false);
    if (pendingAdvance) {
      pendingAdvance();
      setPendingAdvance(null);
    }
    setPendingInsightText(null);
  }, [pendingAdvance]);

  // Question Screens
  const questions = getQuestions(answers);
  const question = questions[currentStep - 1];

  if (!question) {
    // Safety: redirect if question not found
    navigate("/assessment?start=true", { replace: true });
    return null;
  }

  const currentAnswer = answers[question.id as keyof QuizAnswers];

  // Show insight transition screen if active
  if (showInsightTransition && pendingInsightText) {
    return (
      <InsightTransition
        text={pendingInsightText}
        onContinue={handleInsightContinue}
        autoAdvanceDelay={4000}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <QuizHeader progress={progress} showBack onBack={handleBack} />
      <div className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-2xl w-full animate-fade-up" key={currentStep}>
            {currentStep === 1 && (
              <div className="text-center mb-10">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3 leading-[1.35]">
                  We designed this to understand your business
                </h1>
                <p className="text-muted-foreground max-w-md mx-auto text-base">
                  A short set of questions so we can match you to the right provider. Takes less than 2 minutes.
                </p>
              </div>
            )}
            <div className="text-center mb-8">
              <p className="text-sm text-muted-foreground mb-2">
                Question {currentStep} of {questionCount}
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {question.question}
              </h2>
              {question.subtext && (
                <p className="text-muted-foreground mt-2">{question.subtext}</p>
              )}
            </div>

            {/* Dropdown question type */}
            {question.type === "dropdown" && question.dropdownOptions && (
              <div className="max-w-md mx-auto">
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={cn(
                      "w-full p-4 rounded-xl border-2 text-left transition-all duration-200",
                      "hover:border-primary/50 hover:bg-primary/5",
                      "flex items-center justify-between",
                      currentAnswer
                        ? "border-primary bg-primary/10"
                        : "border-border bg-card"
                    )}
                  >
                    <span className={cn(
                      "font-medium",
                      currentAnswer ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {currentAnswer
                        ? question.dropdownOptions.find((o) => o.value === currentAnswer)?.label
                        : "Select an industry..."}
                    </span>
                    <ChevronDown className={cn(
                      "w-5 h-5 transition-transform",
                      dropdownOpen && "rotate-180"
                    )} />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-card border border-border rounded-xl shadow-lg max-h-64 overflow-y-auto">
                      {question.dropdownOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleDropdownSelect(question.id, option.value)}
                          className={cn(
                            "w-full p-3 text-left hover:bg-primary/5 transition-colors",
                            "first:rounded-t-xl last:rounded-b-xl",
                            currentAnswer === option.value && "bg-primary/10"
                          )}
                        >
                          <span className="font-medium text-foreground">{option.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Regular options */}
            {!question.type && question.options && (
              <div className="grid gap-3 sm:grid-cols-2">
                {question.options.map((option) => {
                  const isSelected = question.multiSelect
                    ? (currentAnswer as string[]).includes(option)
                    : currentAnswer === option;

                  return (
                    <button
                      key={option}
                      onClick={() =>
                        handleOptionSelect(
                          question.id,
                          option,
                          question.multiSelect,
                          question.maxSelect
                        )
                      }
                      className={cn(
                        "p-4 rounded-xl border-2 text-left transition-all duration-200",
                        "hover:border-primary/50 hover:bg-primary/5",
                        isSelected
                          ? "border-primary bg-primary/10 shadow-sm"
                          : "border-border bg-card"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                            isSelected
                              ? "border-primary bg-primary"
                              : "border-muted-foreground/30"
                          )}
                        >
                          {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                        </div>
                        <span className="font-medium text-foreground">{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {question.multiSelect && (
              <div className="mt-8 text-center">
                <Button
                  variant="hero"
                  size="lg"
                  onClick={handleNext}
                  disabled={!canProceed()}
                >
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            )}
          </div>
      </div>
    </div>
  );
};

// Header component with progress
const QuizHeader = ({
  progress,
  showBack,
  onBack,
}: {
  progress: number;
  showBack?: boolean;
  onBack?: () => void;
}) => (
  <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex items-center justify-between h-16">
        {showBack ? (
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        ) : (
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">ChosePayments</span>
          </Link>
        )}

        <Link
          to="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Exit
        </Link>
      </div>
    </div>

    <div className="h-1 bg-muted">
      <div
        className="h-full bg-primary transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  </header>
);

export default Quiz;
