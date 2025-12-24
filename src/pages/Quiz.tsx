import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { CreditCard, ArrowRight, ArrowLeft, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { markQuizStart } from "@/hooks/useEnrichmentData";
import type { Market } from "@/lib/recommendationLogic";

// Types - aligned with engine expectations
interface QuizAnswers {
  // Core engine fields
  salesChannel: string;
  businessType: string;
  priorities: string[];
  location: string;
  monthlyVolume: string;
  avgTransaction: string;
  features: string[];
  // Derived flags for engine
  needsOnline: boolean;
  needsInPerson: boolean;
  needsMarketplace: boolean;
  terminalType: string;
  // Lead capture fields
  industry: string;
  buyingIntent: string;
  contactTime: string;
}

const INITIAL_ANSWERS: QuizAnswers = {
  salesChannel: "",
  businessType: "",
  priorities: [],
  location: "",
  monthlyVolume: "",
  avgTransaction: "",
  features: [],
  needsOnline: false,
  needsInPerson: false,
  needsMarketplace: false,
  terminalType: "",
  industry: "",
  buyingIntent: "",
  contactTime: "",
};

// Industry options for dropdown - neutral naming, maps to engine risk keys
const INDUSTRY_OPTIONS = [
  { label: "E-commerce / Online Retail", value: "ecommerce" },
  { label: "Retail / Physical Store", value: "retail" },
  { label: "Food & Beverage", value: "food-beverage" },
  { label: "Hospitality / Hotels", value: "hospitality" },
  { label: "Professional Services", value: "professional-services" },
  { label: "SaaS / Software", value: "saas" },
  { label: "Travel & Tourism", value: "travel" },
  { label: "Subscription Business", value: "subscription" },
  { label: "Health & Wellness", value: "nutraceuticals" },
  { label: "Fashion & Apparel", value: "fashion" },
  { label: "Digital Products / Services", value: "digital-goods" },
  { label: "Marketplace / Platform", value: "marketplace" },
  { label: "Mobile Vendor / Market Stall", value: "mobile-vendor" },
  { label: "Franchise", value: "franchise" },
  { label: "Delivery Services", value: "delivery" },
  { label: "Other", value: "ecommerce" },
];

// Question definitions
type Question = {
  id: string;
  question: string;
  subtext?: string;
  options?: string[];
  multiSelect?: boolean;
  maxSelect?: number;
  type?: "dropdown";
  dropdownOptions?: { label: string; value: string }[];
};

// Build questions dynamically based on answers
const getQuestions = (answers: QuizAnswers): Question[] => {
  const questions: Question[] = [];

  // Q1: Sales Channel (always)
  questions.push({
    id: "salesChannel",
    question: "How will you accept payments?",
    options: [
      "Online only",
      "In person only",
      "Online and in person",
      "Marketplace or platform",
    ],
  });

  // Q2: Terminal Type (only if needsInPerson)
  if (answers.needsInPerson) {
    questions.push({
      id: "terminalType",
      question: "Do you need a card terminal?",
      options: [
        "Fixed terminal (countertop)",
        "Portable terminal (SIM or Wi-Fi)",
        "Not sure yet",
      ],
    });
  }

  // Q3: Business Type (always)
  questions.push({
    id: "businessType",
    question: "Which best describes your business?",
    options: [
      "Solo business",
      "Multi-location business",
      "Franchise",
      "Marketplace or platform",
    ],
  });

  // Q4: Monthly Volume (always)
  questions.push({
    id: "monthlyVolume",
    question: "Roughly how much do you expect to process per month?",
    options: [
      "Just getting started",
      "Under £10k",
      "£10k–£50k",
      "£50k+",
    ],
  });

  // Q5: Average Transaction Value (always)
  questions.push({
    id: "avgTransaction",
    question: "What's your typical transaction size?",
    options: [
      "Under £20",
      "£20–£100",
      "£100–£500",
      "£500+",
    ],
  });

  // Q6: Priorities (always, max 2)
  questions.push({
    id: "priorities",
    question: "What matters most to you right now?",
    subtext: "Select up to 2",
    multiSelect: true,
    maxSelect: 2,
    options: [
      "Lower fees",
      "Reliability",
      "Ability to scale",
      "Support during setup",
    ],
  });

  // Q6: Industry (dropdown, always)
  questions.push({
    id: "industry",
    question: "What industry best describes your business?",
    type: "dropdown",
    dropdownOptions: INDUSTRY_OPTIONS,
  });

  // Q7: Buying Intent (always)
  questions.push({
    id: "buyingIntent",
    question: "When are you looking to move forward?",
    options: [
      "Ready to move now",
      "In the next 1–3 months",
      "Just exploring options",
    ],
  });

  // Q8: Business Location (always)
  questions.push({
    id: "location",
    question: "Where is your business based?",
    options: ["UK", "EU", "UK and EU"],
  });

  // Q9: Best Time to Contact (always)
  questions.push({
    id: "contactTime",
    question: "When is the best time to contact you?",
    options: getContactTimeOptions(answers.location),
  });

  return questions;
};

// Localized contact time options based on location
const getContactTimeOptions = (location: string): string[] => {
  if (location === "EU") {
    return [
      "Morning (9:00–12:00 CET)",
      "Afternoon (12:00–17:00 CET)",
      "Evening (after 17:00 CET)",
    ];
  }
  // Default UK times
  return [
    "Morning (9am–12pm)",
    "Afternoon (12pm–5pm)",
    "Evening (after 5pm)",
  ];
};

// Map salesChannel selection to engine flags
const mapSalesChannelToFlags = (
  option: string
): { needsOnline: boolean; needsInPerson: boolean; needsMarketplace: boolean } => {
  switch (option) {
    case "Online only":
      return { needsOnline: true, needsInPerson: false, needsMarketplace: false };
    case "In person only":
      return { needsOnline: false, needsInPerson: true, needsMarketplace: false };
    case "Online and in person":
      return { needsOnline: true, needsInPerson: true, needsMarketplace: false };
    case "Marketplace or platform":
      return { needsOnline: false, needsInPerson: false, needsMarketplace: true };
    default:
      return { needsOnline: false, needsInPerson: false, needsMarketplace: false };
  }
};

// Map terminal type selection to engine value
const mapTerminalType = (option: string): string => {
  switch (option) {
    case "Fixed terminal (countertop)":
      return "wired";
    case "Portable terminal (SIM or Wi-Fi)":
      return "portable-sim";
    case "Not sure yet":
      return "unknown";
    default:
      return "";
  }
};

// Map monthly volume to engine format
const mapMonthlyVolume = (option: string): string => {
  switch (option) {
    case "Just getting started":
      return "< £5k";
    case "Under £10k":
      return "£5k–20k";
    case "£10k–£50k":
      return "£20k–50k";
    case "£50k+":
      return "£50k–100k";
    default:
      return "< £5k";
  }
};

// Map priorities to engine format
const mapPriority = (priority: string): string => {
  switch (priority) {
    case "Lower fees":
      return "Keeping fees low";
    case "Reliability":
      return "Reliability";
    case "Ability to scale":
      return "Ability to scale";
    case "Support during setup":
      return "Easy setup";
    default:
      return priority;
  }
};

// Map business type to engine format
const mapBusinessType = (businessType: string): string => {
  switch (businessType) {
    case "Solo business":
      return "Online business";
    case "Multi-location business":
      return "Physical business";
    case "Franchise":
      return "Other / mixed";
    case "Marketplace or platform":
      return "Marketplace / platform";
    default:
      return "Other / mixed";
  }
};

// Map average transaction to engine format
const mapAvgTransaction = (option: string): string => {
  switch (option) {
    case "Under £20":
      return "< £30";
    case "£20–£100":
      return "£30–100";
    case "£100–£500":
      return "£100–500";
    case "£500+":
      return "£500+";
    default:
      return "£30–100";
  }
};

const getQuestionCount = (answers: QuizAnswers) => {
  return getQuestions(answers).length;
};

const Quiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const shouldStartDirectly = searchParams.get("start") === "true";
  const [currentStep, setCurrentStep] = useState(shouldStartDirectly ? 1 : 0);
  const [answers, setAnswers] = useState<QuizAnswers>(INITIAL_ANSWERS);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Detect market based on referrer path (if coming from /us page)
  const [market] = useState<Market>(() => {
    const referrer = document.referrer;
    const isFromUS = referrer.includes("/us") || location.state?.market === "US";
    return isFromUS ? "US" : "UK";
  });

  // Scroll to top and mark quiz start when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    markQuizStart();
  }, []);

  // Update SEO metadata based on location selection
  useEffect(() => {
    const isEU = answers.location === "EU";
    
    // Update title
    document.title = isEU
      ? "Find the Right Payment Provider for Your EU Business"
      : "Find the Right Payment Provider for Your UK Business";
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      "content",
      isEU
        ? "Answer a few quick questions and get a payment provider recommendation tailored to how businesses operate across the EU. No cost, no commitment."
        : "Answer a few quick questions and get a payment provider recommendation tailored to how UK businesses operate. No cost, no commitment."
    );

    // Cleanup: restore original title on unmount
    return () => {
      document.title = "ChosePayments - Find the Best Payment Provider in 60 Seconds";
    };
  }, [answers.location]);

  const questionCount = getQuestionCount(answers);
  const totalSteps = questionCount + 1; // Welcome + questions
  const progress = (currentStep / (totalSteps - 1)) * 100;

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
      if (option === "Marketplace or platform") {
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

    // For single-select questions, auto-advance
    if (!multiSelect) {
      const questions = getQuestions(updatedAnswers);
      const currentQuestionIndex = questions.findIndex((q) => q.id === questionId);
      const isLastQuestion = currentQuestionIndex === questions.length - 1;

      if (isLastQuestion) {
        // OPTIMISTIC: Navigate immediately, save in background
        navigate("/recommendation?fromQuiz=true");
        // Prepare engine-compatible answers
        const engineAnswers = prepareEngineAnswers(updatedAnswers);
        sessionStorage.setItem("quizAnswers", JSON.stringify(engineAnswers));
        sessionStorage.setItem("quizMarket", market);
      } else {
        // OPTIMISTIC: Advance immediately
        setCurrentStep((prev) => prev + 1);
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
      navigate("/recommendation?fromQuiz=true");
      const engineAnswers = prepareEngineAnswers(updatedAnswers);
      sessionStorage.setItem("quizAnswers", JSON.stringify(engineAnswers));
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
      location: ans.location === "UK and EU" ? "UK & EU" : ans.location,
      monthlyVolume: mapMonthlyVolume(ans.monthlyVolume),
      avgTransaction: mapAvgTransaction(ans.avgTransaction),
      features: [], // Not collecting features in this flow
      // Additional metadata for lead capture
      industry: ans.industry,
      buyingIntent: ans.buyingIntent,
      contactTime: ans.contactTime,
      terminalType: ans.terminalType,
    };
  };

  const handleNext = () => {
    if (currentStep === 0) {
      setCurrentStep(1);
    } else if (currentStep <= questionCount) {
      const questions = getQuestions(answers);
      const question = questions[currentStep - 1];
      if (question?.multiSelect) {
        const isLastQuestion = currentStep === questionCount;
        if (isLastQuestion) {
          navigate("/recommendation?fromQuiz=true");
          const engineAnswers = prepareEngineAnswers(answers);
          sessionStorage.setItem("quizAnswers", JSON.stringify(engineAnswers));
          sessionStorage.setItem("quizMarket", market);
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
  const questions = getQuestions(answers);
  const question = questions[currentStep - 1];

  if (!question) {
    // Safety: redirect if question not found
    navigate("/quiz?start=true", { replace: true });
    return null;
  }

  const currentAnswer = answers[question.id as keyof QuizAnswers];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <QuizHeader progress={progress} showBack onBack={handleBack} />
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full animate-fade-up" key={currentStep}>
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
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">ChosePayments</span>
          </a>
        )}

        <a
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
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
