import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Types
interface QuizAnswers {
  businessType: string;
  salesChannel: string;
  monthlyVolume: string;
  avgTransaction: string;
  international: string;
  recurring: string;
  priorities: string[];
  location: string;
  fullName: string;
  businessName: string;
  email: string;
}

const INITIAL_ANSWERS: QuizAnswers = {
  businessType: "",
  salesChannel: "",
  monthlyVolume: "",
  avgTransaction: "",
  international: "",
  recurring: "",
  priorities: [],
  location: "",
  fullName: "",
  businessName: "",
  email: "",
};

// Question data
const QUESTIONS = [
  {
    id: "businessType",
    question: "What type of business do you run?",
    options: [
      "Ecommerce",
      "Restaurant or Café",
      "Retail Shop",
      "Subscription Business",
      "Professional Services",
      "Marketplace",
      "Other",
    ],
  },
  {
    id: "salesChannel",
    question: "Where do you sell?",
    options: ["Online only", "In-person only", "Both online and in-person"],
  },
  {
    id: "monthlyVolume",
    question: "What's your monthly card volume?",
    options: ["< £5k", "£5k–20k", "£20k–50k", "£50k–100k", "£100k+"],
  },
  {
    id: "avgTransaction",
    question: "What's your average transaction size?",
    options: ["< £10", "£10–30", "£30–100", "£100+"],
  },
  {
    id: "international",
    question: "Do you accept international customers?",
    options: ["Yes", "No", "Not sure"],
  },
  {
    id: "recurring",
    question: "Do you need recurring payments?",
    options: ["Yes", "No", "Possibly later"],
  },
  {
    id: "priorities",
    question: "What matters most to you?",
    subtext: "Select all that apply",
    multiSelect: true,
    options: [
      "Lowest fees",
      "Easy setup",
      "Fast payouts",
      "Developer-friendly",
      "High acceptance rates",
      "Online + in-person support",
      "Global reach",
    ],
  },
  {
    id: "location",
    question: "Where is your business located?",
    options: ["UK", "EU", "US", "Other"],
  },
];

const TOTAL_STEPS = QUESTIONS.length + 1; // Welcome + questions (lead capture moved to recommendation page)

const Quiz = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>(INITIAL_ANSWERS);

  const progress = ((currentStep) / (TOTAL_STEPS - 1)) * 100;

  const handleOptionSelect = (questionId: string, option: string, multiSelect?: boolean) => {
    const updatedAnswers = { ...answers };
    
    if (multiSelect) {
      const currentValues = answers[questionId as keyof QuizAnswers] as string[];
      const newValues = currentValues.includes(option)
        ? currentValues.filter((v) => v !== option)
        : [...currentValues, option];
      updatedAnswers[questionId as keyof QuizAnswers] = newValues as any;
      setAnswers(updatedAnswers);
    } else {
      updatedAnswers[questionId as keyof QuizAnswers] = option as any;
      setAnswers(updatedAnswers);
      
      // Check if this is the last question
      if (currentStep === QUESTIONS.length) {
        // Last question - save synchronously and navigate immediately
        console.log("Saving quiz answers:", updatedAnswers);
        sessionStorage.setItem("quizAnswers", JSON.stringify(updatedAnswers));
        navigate("/recommendation");
      } else {
        // Auto-advance with visual feedback delay
        setTimeout(() => {
          setCurrentStep((prev) => prev + 1);
        }, 300);
      }
    }
  };

  const handleNext = () => {
    if (currentStep === 0) {
      setCurrentStep(1);
    } else if (currentStep <= QUESTIONS.length) {
      const question = QUESTIONS[currentStep - 1];
      if (question.multiSelect) {
        // Check if this is the last question
        if (currentStep === QUESTIONS.length) {
          // Save and navigate to recommendation
          sessionStorage.setItem("quizAnswers", JSON.stringify(answers));
          navigate("/recommendation");
        } else {
          setCurrentStep((prev) => prev + 1);
        }
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const canProceed = () => {
    if (currentStep === 0) return true;
    if (currentStep > QUESTIONS.length) return true;
    
    const question = QUESTIONS[currentStep - 1];
    const answer = answers[question.id as keyof QuizAnswers];
    
    if (question.multiSelect) {
      return (answer as string[]).length > 0;
    }
    return !!answer;
  };

  // Welcome Screen
  if (currentStep === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <QuizHeader progress={0} />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-lg text-center animate-fade-up">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CreditCard className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Let's Find the Best Payment Provider for Your Business
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Answer a few quick questions so we can recommend the perfect fit.
            </p>
            <Button variant="hero" size="xl" onClick={handleNext}>
              Start Quiz
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Question Screens
  const question = QUESTIONS[currentStep - 1];
  const currentAnswer = answers[question.id as keyof QuizAnswers];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <QuizHeader progress={progress} showBack onBack={handleBack} />
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full animate-fade-up" key={currentStep}>
          <div className="text-center mb-8">
            <p className="text-sm text-muted-foreground mb-2">
              Question {currentStep} of {QUESTIONS.length}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {question.question}
            </h2>
            {question.subtext && (
              <p className="text-muted-foreground mt-2">{question.subtext}</p>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {question.options.map((option) => {
              const isSelected = question.multiSelect
                ? (currentAnswer as string[]).includes(option)
                : currentAnswer === option;

              return (
                <button
                  key={option}
                  onClick={() => handleOptionSelect(question.id, option, question.multiSelect)}
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
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">ChosePayments</span>
          </a>
        )}
        
        <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Exit
        </a>
      </div>
    </div>
    
    {/* Progress bar */}
    <div className="h-1 bg-muted">
      <div
        className="h-full bg-primary transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  </header>
);

export default Quiz;
