import { useState, useRef, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CreditCard, Check, MessageCircle, ArrowRight, Loader2, CheckCircle2, Mail, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import LeadCaptureForm, { LeadCaptureFormRef } from "@/components/LeadCaptureForm";
import MatchScoreCard from "@/components/MatchScoreCard";
import { supabase } from "@/integrations/supabase/client";
import QuizLoadingTransition from "@/components/QuizLoadingTransition";
import { getRecommendation, calculateMatchScore, type QuizAnswers, type Provider, type Market } from "@/lib/recommendationLogic";
import { fetchServerRecommendation } from "@/lib/quizRecommendationService";
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
      // Additional fields
      industry: typeof parsed.industry === "string" ? parsed.industry : "",
      contactTime: typeof parsed.contactTime === "string" ? parsed.contactTime : "",
      terminalType: typeof parsed.terminalType === "string" ? parsed.terminalType : "",
      // NEW: Risk-critical fields
      riskProfile: typeof parsed.riskProfile === "string" ? parsed.riskProfile : "",
      deliveryTimeline: typeof parsed.deliveryTimeline === "string" ? parsed.deliveryTimeline : "",
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
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const startedFromQuizRef = useRef(searchParams.get("fromQuiz") === "true");
  const [showLoader, setShowLoader] = useState(() => startedFromQuizRef.current);
  const [answers] = useState<QuizAnswers | null>(() => readStoredAnswers());
  const [market] = useState<Market>(() => readStoredMarket());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isProviderNotified, setIsProviderNotified] = useState(false);
  const [isConfirmationSent, setIsConfirmationSent] = useState(false);
  const [isReportGenerated, setIsReportGenerated] = useState(false);
  const [reportUrl, setReportUrl] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState<Provider | null>(null);
  const [alternatives, setAlternatives] = useState<Provider[]>([]);
  const [matchScore, setMatchScore] = useState<number>(85);
  const [isLoadingRecommendation, setIsLoadingRecommendation] = useState(true);
  const [backgroundError, setBackgroundError] = useState<string | null>(null);
  const formRef = useRef<LeadCaptureFormRef>(null);
  const { toast } = useToast();

  const quizComplete = answers ? isQuizComplete(answers) : false;

  // Initialize session tracking and redirect to quiz if not completed
  useEffect(() => {
    initializeSessionTracking();
    if (!answers || !quizComplete) {
      navigate("/assessment?start=true", { replace: true });
    }
  }, [answers, quizComplete, navigate]);

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
        // Calculate match score
        const score = primary.matchScore || calculateMatchScore(primary, answers);
        setMatchScore(score);
      } else if (!fromServer) {
        // Fallback to client-side logic if server is unavailable
        const clientRec = getRecommendation(answers, market);
        setRecommendation(clientRec);
        if (clientRec) {
          const score = clientRec.matchScore || calculateMatchScore(clientRec, answers);
          setMatchScore(score);
        }
      }
    } catch (err) {
      console.error("Recommendation fetch error:", err);
      // Fallback to client-side logic
      const clientRec = getRecommendation(answers, market);
      setRecommendation(clientRec);
      if (clientRec) {
        const score = clientRec.matchScore || calculateMatchScore(clientRec, answers);
        setMatchScore(score);
      }
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

  const showNoMatch = !!answers && quizComplete && !recommendation && !isLoadingRecommendation;

  // Don't render anything while redirecting
  if (!answers || !quizComplete) {
    return null;
  }

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

    setIsSubmitting(true);

    const formData = formRef.current.getFormData();
    
    // STEP 1: Generate PDF Report
    let generatedReportUrl = "";
    let reportHtml = "";
    try {
      const reportPayload = {
        // User Contact Details
        fullName: formData.fullName,
        email: formData.email,
        businessName: formData.businessName,
        
        // All 11 Assessment Answers
        salesChannel: answers.salesChannel || "",
        terminalType: answers.terminalType || "",
        businessType: answers.businessType || "",
        monthlyVolume: answers.monthlyVolume || "",
        avgTransaction: answers.avgTransaction || "",
        priorities: answers.priorities || [],
        riskProfile: answers.riskProfile || "",
        deliveryTimeline: answers.deliveryTimeline || "",
        industry: answers.industry || "",
        location: answers.location || "",
        contactTime: answers.contactTime || "",
        
        // Recommendation Context
        recommendedProvider: recommendation?.name || "",
        matchScore: matchScore,
        matchDrivers: recommendation?.reasons || [],
        alternativeProviders: alternatives.map(alt => alt.name),
        
        // Meta
        market: market,
      };

      const { data: reportData, error: reportError } = await supabase.functions.invoke("generate-payment-report", {
        body: reportPayload,
      });

      if (!reportError && reportData?.success) {
        // The report HTML is returned as base64 - we can use it for download
        if (reportData.reportHtml) {
          reportHtml = reportData.reportHtml;
          // Create a data URL for the HTML report that can be downloaded/printed as PDF
          const decodedHtml = atob(reportData.reportHtml);
          const blob = new Blob([decodedHtml], { type: 'text/html' });
          generatedReportUrl = URL.createObjectURL(blob);
          setReportUrl(generatedReportUrl);
          setIsReportGenerated(true);
          formRef.current.setReportUrl(generatedReportUrl);
        }
      }
    } catch (reportErr) {
      console.error("Report generation error:", reportErr);
      // Continue without report - not a blocker
    }

    // OPTIMISTIC: Show success immediately, send data in background
    setIsSubmitted(true);
    setBackgroundError(null);

    // Extract first name from full name
    const firstName = formData.fullName.trim().split(/\s+/)[0] || formData.fullName;

    // STEP 2: Send lead data to CRM with comprehensive payload
    const payload = {
      ...formData,
      reasons: recommendation?.reasons || [],
      recurring: formData.recurringBilling,
      market: market,
      // Include match score and report URL
      matchScore: matchScore,
      matchDrivers: recommendation?.reasons || [],
      alternativeProviders: alternatives.map(alt => alt.name),
      reportUrl: generatedReportUrl,
      // Include all 11 quiz answers
      riskProfile: answers.riskProfile || "",
      deliveryTimeline: answers.deliveryTimeline || "",
      industry: answers.industry || "",
      contactTime: answers.contactTime || "",
      terminalType: answers.terminalType || "",
    };

    try {
      // Send lead email to provider
      const { data, error } = await supabase.functions.invoke("send-lead-email", {
        body: payload,
      });

      if (error) throw error;

      if (!data?.success) {
        throw new Error(data?.error || "Failed to send email");
      }

      // Mark provider as notified
      setIsProviderNotified(true);

      // STEP 3: Send confirmation email to user with report link
      try {
        const { data: confirmData, error: confirmError } = await supabase.functions.invoke("send-confirmation-email", {
          body: {
            email: formData.email,
            firstName: firstName,
            reportUrl: generatedReportUrl,
            providerName: recommendation?.name || "our team",
            matchScore: matchScore,
          },
        });

        if (!confirmError && confirmData?.success) {
          setIsConfirmationSent(true);
        }
      } catch (confirmErr) {
        // Don't fail the whole flow if confirmation email fails
        console.error("Confirmation email error:", confirmErr);
      }
    } catch (error) {
      console.error("Error submitting lead:", error);
      // Show calm inline message for background errors
      setBackgroundError("We're just double-checking your details. One moment.");
      // Clear the error after a few seconds
      setTimeout(() => setBackgroundError(null), 5000);
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

        {/* Recommendation Flow */}
        {recommendation && (
          <>
            {isSubmitted ? (
              /* Post-submit: Show confirmation with report download */
              <Card className="border border-primary/30 bg-primary/5 animate-fade-up animation-delay-100">
                <CardContent className="p-8 md:p-10 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Check className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3">
                    Your report is on its way!
                  </h3>
                  <p className="text-muted-foreground text-lg max-w-md mx-auto mb-6">
                    Check your inbox for your personalized payment report. {recommendation.name} will be in touch shortly to discuss next steps.
                  </p>
                  
                  {/* Report Download Button */}
                  {reportUrl && (
                    <div className="mb-6">
                      <Button 
                        variant="outline" 
                        size="lg"
                        onClick={() => window.open(reportUrl, '_blank')}
                        className="gap-2"
                      >
                        <Download className="w-5 h-5" />
                        Download Your Report
                      </Button>
                    </div>
                  )}
                  
                  {/* Verification Indicators */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-500 ${
                      isReportGenerated 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {isReportGenerated ? (
                        <FileText className="w-4 h-4" />
                      ) : (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      )}
                      <span>{isReportGenerated ? 'Report generated' : 'Generating report...'}</span>
                    </div>
                    
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-500 ${
                      isProviderNotified 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {isProviderNotified ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      )}
                      <span>{isProviderNotified ? `${recommendation.name} notified` : 'Notifying provider...'}</span>
                    </div>
                    
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
                      <span>{isConfirmationSent ? 'Confirmation sent' : 'Sending confirmation...'}</span>
                    </div>
                  </div>
                  
                  {/* Expected contact timeframe */}
                  <p className="mt-6 text-sm text-muted-foreground">
                    Expect a call from {recommendation.name} within 24-48 hours
                  </p>
                  
                  {backgroundError && (
                    <p className="mt-4 text-sm text-muted-foreground animate-fade-in">
                      {backgroundError}
                    </p>
                  )}
                </CardContent>
              </Card>
            ) : (
              /* Pre-submit: Show match score card and form */
              <>
                {/* Report Ready Header */}
                <div className="text-center mb-8 animate-fade-up">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                    Your Personalized Payment Risk & Pricing Report is Ready
                  </h1>
                  <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                    Based on your 11 assessment answers, we've generated a detailed report including your risk profile, pricing estimates, and match score.
                  </p>
                </div>

                {/* Match Score Card */}
                <div className="mb-8 animate-fade-up animation-delay-100">
                  <MatchScoreCard 
                    matchScore={matchScore}
                    providerName={recommendation.name}
                    matchDrivers={recommendation.reasons}
                  />
                </div>

                {/* Provider Details */}
                <Card className="border border-border/50 mb-8 animate-fade-up animation-delay-150">
                  <CardContent className="p-6 md:p-8">
                    <p className="text-muted-foreground text-center">
                      {recommendation.description}
                    </p>
                  </CardContent>
                </Card>

                {/* Lead Capture Form - Report Gate */}
                <div className="animate-fade-up animation-delay-200">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Enter your details to receive your report
                    </h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Your personalized PDF report will be sent to your email within 60 seconds. We'll also share your details with <strong>{recommendation.name}</strong> so they can reach out to discuss your specific needs.
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
                        matchScore={matchScore}
                        alternativeProviders={alternatives.map(alt => alt.name)}
                      />

                      {/* Disclosure Notice */}
                      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground flex items-start gap-2">
                          <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>By submitting, you agree that we may share your details with your matched provider to help you get started faster.</span>
                        </p>
                      </div>

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
                              Generating Report...
                            </>
                          ) : (
                            <>
                              Send My Report
                              <ArrowRight className="w-5 h-5" />
                            </>
                          )}
                        </Button>
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
              /* Post-submit: Show confirmation */
              <Card className="border border-primary/30 bg-primary/5 animate-fade-up animation-delay-100">
                <CardContent className="p-8 md:p-10 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Check className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3">
                    We've received your details
                  </h3>
                  <p className="text-muted-foreground text-lg max-w-md mx-auto mb-6">
                    One of our payment experts will review your requirements and be in touch within 24 hours.
                  </p>
                  
                  {/* Verification Indicators */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-500 ${
                      isProviderNotified 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {isProviderNotified ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      )}
                      <span>{isProviderNotified ? 'Expert notified' : 'Notifying expert...'}</span>
                    </div>
                    
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
                      <span>{isConfirmationSent ? 'Confirmation sent' : 'Sending confirmation...'}</span>
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
                      Share your details and one of our experts will reach out to discuss your specific requirements.
                    </p>
                  </div>

                  <Card className="border border-border/50">
                    <CardContent className="p-6 md:p-8">
                      <LeadCaptureForm
                        ref={formRef}
                        quizAnswers={answers}
                        recommendedProvider={null}
                        logicPath="fallback"
                        matchScore={0}
                        alternativeProviders={[]}
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
                          We'll share your details along with the context from your answers.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </>
        )}

        {/* Retake Quiz CTA - only show after loading completes and not submitted */}
        {!isLoadingRecommendation && !isSubmitted && (
          <div className="text-center mt-10 animate-fade-up animation-delay-200">
            <p className="text-muted-foreground mb-4">Not what you expected?</p>
            <a
              href="/assessment?start=true"
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
