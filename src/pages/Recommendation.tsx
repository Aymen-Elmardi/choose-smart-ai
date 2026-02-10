import { useState, useRef, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CreditCard, Check, ArrowRight, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { QuizAnswers } from "@/types/quiz";
import { initializeSessionTracking } from "@/hooks/useEnrichmentData";

const readStoredAnswers = (): QuizAnswers | null => {
  try {
    const raw = sessionStorage.getItem("quizAnswers");
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<QuizAnswers>;

    return {
      salesChannel: typeof parsed.salesChannel === "string" ? parsed.salesChannel : "",
      businessType: typeof parsed.businessType === "string" ? parsed.businessType : "",
      priorities: Array.isArray(parsed.priorities)
        ? parsed.priorities.filter((p): p is string => typeof p === "string")
        : [],
      location: typeof parsed.location === "string" ? parsed.location : "",
      monthlyVolume: typeof parsed.monthlyVolume === "string" ? parsed.monthlyVolume : "",
      avgTransaction: typeof parsed.avgTransaction === "string" ? parsed.avgTransaction : "",
      features: Array.isArray(parsed.features)
        ? parsed.features.filter((f): f is string => typeof f === "string")
        : [],
    };
  } catch {
    return null;
  }
};

const isQuizComplete = (a: QuizAnswers) =>
  Boolean(
    a.salesChannel &&
      a.businessType &&
      a.monthlyVolume &&
      a.avgTransaction &&
      a.location &&
      a.priorities?.length
  );

type Market = "UK" | "US";

const readStoredMarket = (): Market => {
  try {
    const raw = sessionStorage.getItem("quizMarket");
    if (raw === "US") return "US";
    return "UK";
  } catch {
    return "UK";
  }
};

const Recommendation = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const startedFromQuizRef = useRef(searchParams.get("fromQuiz") === "true");
  const [showLoader, setShowLoader] = useState(() => startedFromQuizRef.current);
  const [answers] = useState<QuizAnswers | null>(() => readStoredAnswers());
  const [market] = useState<Market>(() => readStoredMarket());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isConfirmationSent, setIsConfirmationSent] = useState(false);
  const [backgroundError, setBackgroundError] = useState<string | null>(null);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    notes: "",
  });

  const quizComplete = answers ? isQuizComplete(answers) : false;

  // Initialize session tracking and redirect to quiz if not completed
  useEffect(() => {
    initializeSessionTracking();
    if (!answers || !quizComplete) {
      navigate("/assessment?start=true", { replace: true });
    }
  }, [answers, quizComplete, navigate]);

  // Handle the loading transition from quiz
  useEffect(() => {
    if (!startedFromQuizRef.current) {
      setShowLoader(false);
      return;
    }

    // Remove the query param to clean up URL
    const newParams = new URLSearchParams(window.location.search);
    newParams.delete("fromQuiz");
    setSearchParams(newParams, { replace: true });

    // Brief loader for smooth transition
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [setSearchParams]);

  // Ensure the loader exits immediately after a successful submission
  useEffect(() => {
    if (isSubmitted) setShowLoader(false);
  }, [isSubmitted]);

  // Don't render anything while redirecting
  if (!answers || !quizComplete) {
    return null;
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    // Validate
    if (!formData.fullName.trim()) {
      toast({ title: "Please enter your name", variant: "destructive" });
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({ title: "Please enter a valid email address", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    // OPTIMISTIC: Show success immediately
    setIsSubmitted(true);
    setBackgroundError(null);

    const firstName = formData.fullName.trim().split(/\s+/)[0] || formData.fullName;

    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      businessName: formData.companyName,
      notes: formData.notes,
      // Quiz context
      businessType: answers.businessType,
      monthlyVolume: answers.monthlyVolume,
      avgTransaction: answers.avgTransaction,
      region: answers.location,
      salesChannel: answers.salesChannel,
      priorities: answers.priorities,
      features: answers.features,
      market: market,
      recommendedProvider: "Advisory Review",
      logicPath: "advisory",
    };

    try {
      const { data, error } = await supabase.functions.invoke("send-lead-email", {
        body: payload,
      });

      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || "Failed to send");

      // Send confirmation email
      try {
        const { data: confirmData, error: confirmError } = await supabase.functions.invoke("send-confirmation-email", {
          body: { email: formData.email, firstName },
        });
        if (!confirmError && confirmData?.success) {
          setIsConfirmationSent(true);
        }
      } catch (confirmErr) {
        console.error("Confirmation email error:", confirmErr);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      setBackgroundError("We're just confirming your details. One moment.");
      setTimeout(() => setBackgroundError(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading transition when coming from quiz
  if (showLoader) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center max-w-md animate-fade-up">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-2 border-muted"></div>
              <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Thank you for completing the assessment
          </h2>
          <p className="text-muted-foreground text-lg mb-4">
            Preparing your application
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">ChosePayments</span>
            </a>
            <a
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Back to Home
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-8 md:py-20">

        {isSubmitted ? (
          /* Post-submit confirmation */
          <Card className="border border-primary/30 bg-primary/5 animate-fade-up">
            <CardContent className="p-8 md:p-10 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-3">
                Thanks. Your assessment has been received.
              </h3>
              <p className="text-muted-foreground text-lg max-w-md mx-auto mb-6">
                We now have enough context to review your situation properly.
                If this looks like a case we can help with, we'll follow up with next steps.
              </p>
              
              {/* Confirmation indicator */}
              <div className="flex items-center justify-center gap-2 mt-6">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-500 ${
                  isConfirmationSent 
                    ? 'bg-primary/10 text-primary' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {isConfirmationSent ? (
                    <Mail className="w-4 h-4" />
                  ) : (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  )}
                  <span>{isConfirmationSent ? 'Confirmation sent to your email' : 'Sending confirmation...'}</span>
                </div>
              </div>
              
              {backgroundError && (
                <p className="mt-4 text-sm text-muted-foreground animate-fade-in">
                  {backgroundError}
                </p>
              )}
            </CardContent>
          </Card>
        ) : (
          /* Pre-submit: Assessment complete message + application form */
          <>
            {/* Context message */}
            <div className="text-center mb-10 animate-fade-up">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Thanks for completing the assessment.
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
                Based on your answers, we'll review your situation and come back with independent guidance on which payment options are most likely to work for your business.
              </p>
              <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
                Please leave your details below so we can follow up.
              </p>
            </div>

            {/* Application Form */}
            <Card className="border border-border/50 animate-fade-up animation-delay-100">
              <CardContent className="p-6 md:p-8">
                <div className="space-y-5">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium text-foreground">
                      Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      autoComplete="name"
                      placeholder="Your full name"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      className="h-14 text-base px-4 rounded-xl border-border/60 focus:border-primary focus:ring-primary/20"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="h-14 text-base px-4 rounded-xl border-border/60 focus:border-primary focus:ring-primary/20"
                      required
                    />
                  </div>

                  {/* Company Name */}
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-sm font-medium text-foreground">
                      Company Name
                    </Label>
                    <Input
                      id="companyName"
                      type="text"
                      autoComplete="organization"
                      placeholder="Your company name"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange("companyName", e.target.value)}
                      className="h-14 text-base px-4 rounded-xl border-border/60 focus:border-primary focus:ring-primary/20"
                    />
                  </div>

                  {/* Notes */}
                  <div className="space-y-2">
                    <Label htmlFor="notes" className="text-sm font-medium text-foreground">
                      Anything else we should know?
                    </Label>
                    <Textarea
                      id="notes"
                      placeholder="Optional. Add any context that might help us advise you better."
                      value={formData.notes}
                      onChange={(e) => handleInputChange("notes", e.target.value)}
                      className="min-h-[100px] text-base px-4 py-3 rounded-xl border-border/60 focus:border-primary focus:ring-primary/20 resize-none"
                    />
                  </div>
                </div>

                {/* Submit CTA */}
                <div className="mt-8 text-center">
                  <Button 
                    variant="hero" 
                    size="xl" 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit My Assessment
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </Button>
                  <p className="mt-3 text-sm text-muted-foreground max-w-md mx-auto">
                    Your answers from the assessment will be included so we have full context.
                  </p>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Retake assessment link - only pre-submit */}
        {!isSubmitted && (
          <div className="text-center mt-10 animate-fade-up animation-delay-200">
            <p className="text-muted-foreground mb-4">Need to change your answers?</p>
            <a
              href="/assessment?start=true"
              className="text-primary font-medium hover:underline"
            >
              Retake assessment →
            </a>
          </div>
        )}
      </main>
    </div>
  );
};

export default Recommendation;
