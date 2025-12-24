import { useState, useRef, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { CreditCard, Check, MessageCircle, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import LeadCaptureForm, { LeadCaptureFormRef } from "@/components/LeadCaptureForm";
import { supabase } from "@/integrations/supabase/client";
import QuizLoadingTransition from "@/components/QuizLoadingTransition";
import { getRecommendation, type QuizAnswers, type Provider, type Market } from "@/lib/recommendationLogic";
import { fetchServerRecommendation } from "@/lib/quizRecommendationService";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const startedFromQuizRef = useRef(searchParams.get("fromQuiz") === "true");
  const [showLoader, setShowLoader] = useState(() => startedFromQuizRef.current);
  const [answers] = useState<QuizAnswers | null>(() => readStoredAnswers());
  const [market] = useState<Market>(() => readStoredMarket());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [recommendation, setRecommendation] = useState<Provider | null>(null);
  const [alternatives, setAlternatives] = useState<Provider[]>([]);
  const [isLoadingRecommendation, setIsLoadingRecommendation] = useState(true);
  const formRef = useRef<LeadCaptureFormRef>(null);
  const { toast } = useToast();

  const quizComplete = answers ? isQuizComplete(answers) : false;

  // Fetch recommendation from server
  const fetchRecommendation = useCallback(async () => {
    if (!answers || !quizComplete) {
      setIsLoadingRecommendation(false);
      return;
    }

    try {
      const { primary, alternatives: alts, fromServer } = await fetchServerRecommendation(answers);
      
      if (primary) {
        setRecommendation(primary);
        setAlternatives(alts);
      } else if (!fromServer) {
        // Fallback to client-side logic if server is unavailable
        const clientRec = getRecommendation(answers, market);
        setRecommendation(clientRec);
      }
    } catch (err) {
      console.error("Recommendation fetch error:", err);
      // Fallback to client-side logic
      const clientRec = getRecommendation(answers, market);
      setRecommendation(clientRec);
    } finally {
      setIsLoadingRecommendation(false);
    }
  }, [answers, quizComplete, market]);

  // Handle the loading transition from quiz
  useEffect(() => {
    if (!startedFromQuizRef.current) {
      // Not from quiz - fetch immediately
      fetchRecommendation();
      return;
    }

    // Remove the query param to clean up URL
    const newParams = new URLSearchParams(window.location.search);
    newParams.delete("fromQuiz");
    setSearchParams(newParams, { replace: true });

    // Fetch recommendation while showing loader
    fetchRecommendation();

    // Show loader for 2 seconds then fade to content
    const timer = window.setTimeout(() => {
      setShowLoader(false);
    }, 2000);

    // Hard fallback so the loader can never loop indefinitely
    const hardFallback = window.setTimeout(() => {
      setShowLoader(false);
    }, 3000);

    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(hardFallback);
    };
  }, [setSearchParams, fetchRecommendation]);

  // Ensure the loader exits immediately after a successful submission
  useEffect(() => {
    if (isSubmitted) setShowLoader(false);
  }, [isSubmitted]);

  const showNeedsQuiz = !answers || !quizComplete;
  const showNoMatch = !!answers && quizComplete && !recommendation && !isLoadingRecommendation;

  const handleSubmit = async () => {
    if (!formRef.current) return;

    const validation = formRef.current.validate();
    if (!validation.isValid) {
      toast({
        title: "Please fill in required fields",
        description: validation.errors.join(". "),
        variant: "destructive",
      });
      return;
    }

    const formData = formRef.current.getFormData();
    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        reasons: recommendation?.reasons || [],
        recurring: formData.recurringBilling,
        market: market,
      };

      const { data, error } = await supabase.functions.invoke("send-lead-email", {
        body: payload,
      });

      if (error) throw error;

      if (data?.success) {
        setIsSubmitted(true);
      } else {
        throw new Error(data?.error || "Failed to send email");
      }
    } catch (error) {
      console.error("Error submitting lead:", error);
      toast({
        title: "Something went wrong",
        description: "Something went wrong while sending your details. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading transition when coming from quiz
  if (showLoader) {
    return <QuizLoadingTransition />;
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
        <div className="text-center mb-8 md:mb-10 animate-fade-up">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            We've got what we need
          </h1>
        </div>

        {/* If user lands here without completing the quiz */}
        {showNeedsQuiz && (
          <Card className="border border-border shadow-elegant animate-fade-up animation-delay-100">
            <CardContent className="p-8 md:p-10 text-center">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
                Please answer a few questions first
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Your best option is generated from your answers.
              </p>
              <Button asChild variant="hero" size="lg">
                <a href="/quiz?start=true">Answer a few quick questions</a>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Recommendation Flow */}
        {recommendation && (
          <>
            {isSubmitted ? (
              /* Post-submit: Only show confirmation - no provider branding */
              <Card className="border border-primary/30 bg-primary/5 animate-fade-up animation-delay-100">
                <CardContent className="p-8 md:p-10 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Check className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3">
                    We've identified the right option for your business.
                  </h3>
                  <p className="text-muted-foreground text-lg max-w-md mx-auto">
                    Based on your answers, we're preparing an introduction to a suitable payment provider. We'll be in touch within 24 hours.
                  </p>
                </CardContent>
              </Card>
            ) : (
              /* Pre-submit: Show provider details and form */
              <>
                <Card className="border-2 border-primary/20 shadow-elegant animate-fade-up animation-delay-100">
                  <CardContent className="p-8 md:p-10">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
                        <CreditCard className="w-8 h-8 text-primary" />
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                        {recommendation.name}
                      </h2>
                      <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                        {recommendation.description}
                      </p>
                    </div>

                    <div className="bg-muted/50 rounded-xl p-6 md:p-8">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                        Why {recommendation.name} is right for you
                      </h3>
                      <ul className="space-y-3">
                        {recommendation.reasons.map((reason, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                              <Check className="w-3 h-3 text-primary" />
                            </div>
                            <span className="text-foreground">{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Lead Capture Form - Below Recommendation */}
                <div className="mt-10 animate-fade-up animation-delay-150">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Get connected to {recommendation.name}
                    </h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      If you'd like us to connect you to this provider, just share your contact details below. We already have your business information from your answers.
                    </p>
                  </div>

                  <Card className="border border-border/50">
                    <CardContent className="p-6 md:p-8">
                      <LeadCaptureForm
                        ref={formRef}
                        quizAnswers={answers}
                        recommendedProvider={recommendation.name}
                        recommendationReasons={recommendation.reasons}
                        logicPath="recommendation"
                      />

                      {/* Primary CTA */}
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
                              Sending...
                            </>
                          ) : (
                            <>
                              Connect me to this provider
                              <ArrowRight className="w-5 h-5" />
                            </>
                          )}
                        </Button>
                        <p className="mt-3 text-sm text-muted-foreground max-w-md mx-auto">
                          We'll share your details along with the context from your answers, so the provider can respond more accurately.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </>
        )}

        {/* No Match Fallback Flow */}
        {showNoMatch && (
          <>
            {isSubmitted ? (
              /* Post-submit: Only show confirmation - no provider branding */
              <Card className="border border-primary/30 bg-primary/5 animate-fade-up animation-delay-100">
                <CardContent className="p-8 md:p-10 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Check className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3">
                    We've identified the right option for your business.
                  </h3>
                  <p className="text-muted-foreground text-lg max-w-md mx-auto">
                    Based on your answers, we're preparing an introduction to a suitable payment provider. We'll be in touch within 24 hours.
                  </p>
                </CardContent>
              </Card>
            ) : (
              /* Pre-submit: Show fallback message and form */
              <>
                <Card className="border-2 border-border shadow-elegant animate-fade-up animation-delay-100">
                  <CardContent className="p-8 md:p-10">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted mb-4">
                        <MessageCircle className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                        We couldn't find an exact match
                      </h2>
                      <p className="text-muted-foreground text-lg max-w-md mx-auto">
                        Based on your answers, we'd like to help you personally. Speak directly with one of our payment experts.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Lead Capture Form - Below Fallback Message */}
                <div className="mt-10 animate-fade-up animation-delay-150">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Let us help you find the right fit
                    </h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      If you'd like us to connect you with a payment expert, just share your contact details below. We already have your business information from your answers.
                    </p>
                  </div>

                  <Card className="border border-border/50">
                    <CardContent className="p-6 md:p-8">
                      <LeadCaptureForm
                        ref={formRef}
                        quizAnswers={answers}
                        recommendedProvider={null}
                        logicPath="fallback"
                      />

                      {/* Fallback CTA */}
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
                              Sending...
                            </>
                          ) : (
                            <>
                              Speak to one of our experts
                              <ArrowRight className="w-5 h-5" />
                            </>
                          )}
                        </Button>
                        <p className="mt-3 text-sm text-muted-foreground max-w-md mx-auto">
                          We'll share your details along with the context from your answers, so the provider can respond more accurately.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </>
        )}

        {/* Retake Quiz CTA */}
        {!showNeedsQuiz && (
          <div className="text-center mt-10 animate-fade-up animation-delay-200">
            <p className="text-muted-foreground mb-4">Not what you expected?</p>
            <a
              href="/quiz?start=true"
              className="text-primary font-medium hover:underline"
            >
              Answer again →
            </a>
          </div>
        )}
      </main>
    </div>
  );
};

export default Recommendation;
