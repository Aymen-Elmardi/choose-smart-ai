import { useState, useRef } from "react";
import { CreditCard, Check, MessageCircle, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import LeadCaptureForm, { LeadCaptureFormRef } from "@/components/LeadCaptureForm";
import { supabase } from "@/integrations/supabase/client";

interface QuizAnswers {
  salesChannel: string;
  businessType: string;
  priorities: string[];
  location: string;
  monthlyVolume: string;
  avgTransaction: string;
  features: string[];
}

interface Provider {
  name: string;
  description: string;
  reasons: string[];
}

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

const getRecommendation = (answers: QuizAnswers): Provider | null => {
  const {
    businessType,
    salesChannel,
    monthlyVolume,
    features,
    priorities,
    location,
  } = answers;

  // Derive feature flags from features array
  const acceptsInternational = features.includes("International customers");
  const needsRecurring = features.includes("Subscriptions / recurring billing");
  const needsSplitPayments = features.includes("Split payments");
  const hasMultipleSellers = features.includes("Multiple sellers");

  const sellsOnline =
    salesChannel === "Online only" || salesChannel === "Both online and in person";
  const sellsInPerson =
    salesChannel === "In person" || salesChannel === "Both online and in person";
  const isDeveloperFriendly = priorities.includes("Ability to scale");
  const wantsGlobalReach = priorities.includes("International payments");
  const wantsEasySetup = priorities.includes("Easy setup");
  const wantsLowestFees = priorities.includes("Keeping fees low");
  const wantsFlexibility = priorities.includes("Flexibility / future-proofing");

  const isLowVolume = monthlyVolume === "< £5k";
  const isMediumVolume =
    monthlyVolume === "£5k–20k" || monthlyVolume === "£20k–50k";
  const volumeOver20k =
    monthlyVolume === "£20k–50k" ||
    monthlyVolume === "£50k–100k" ||
    monthlyVolume === "£100k+";
  const volumeOver50k = monthlyVolume === "£50k–100k" || monthlyVolume === "£100k+";

  const isRestaurantOrRetail =
    businessType === "Physical business";
  const isMarketplace = businessType === "Marketplace / platform";
  const isSubscription = needsRecurring;
  const isEarlyStage = businessType === "Early-stage / just getting started";
  const isUK = location === "UK";
  const wantsBothChannels = salesChannel === "Both online and in person";

  // DATMAN - UK Marketplaces with high volume (simplified since no split payment option in quiz)
  if (isMarketplace && volumeOver20k && isUK && (isDeveloperFriendly || wantsLowestFees)) {
    return {
      name: "Datman",
      description:
        "Datman is ideal for UK marketplaces needing built-in revenue share and instant multi-party splitting at the point of transaction. Perfect for platforms scaling quickly and looking to earn income from every sale.",
      reasons: [
        "Your marketplace business model requires complex payment flows",
        "Your monthly volume of " + monthlyVolume + " qualifies for competitive rates",
        "UK-based with specialized marketplace payment infrastructure",
        "Built-in revenue share and split payment capabilities",
      ],
    };
  }

  // ADYEN - High volume international marketplaces
  if (isMarketplace && volumeOver50k && acceptsInternational) {
    return {
      name: "Adyen",
      description:
        "Adyen is a global payment platform built for enterprise marketplaces and platforms processing high volumes internationally.",
      reasons: [
        "Your marketplace handles international customers",
        "Your volume of " + monthlyVolume + " meets enterprise thresholds",
        "Single platform for global payment processing",
        "Advanced fraud protection and analytics",
      ],
    };
  }

  // STRIPE - Online businesses with developer needs or global reach
  if (sellsOnline && (acceptsInternational || needsRecurring || isDeveloperFriendly || wantsGlobalReach)) {
    return {
      name: "Stripe",
      description:
        "Stripe is the leading payment platform for online businesses, offering powerful APIs and seamless international payment support.",
      reasons: [
        sellsOnline ? "You sell products or services online" : "",
        acceptsInternational ? "You accept international customers" : "",
        needsRecurring ? "You need recurring billing capabilities" : "",
        isDeveloperFriendly ? "Developer-friendly tools are important to you" : "",
        wantsGlobalReach ? "Global reach is a priority for your business" : "",
      ].filter(Boolean),
    };
  }

  // SQUARE - Physical businesses or in-person focused
  if (isRestaurantOrRetail || sellsInPerson || wantsBothChannels) {
    return {
      name: "Square",
      description:
        "Square provides an all-in-one solution for businesses that sell in-person, with easy-to-use point-of-sale hardware and integrated online tools.",
      reasons: [
        isRestaurantOrRetail ? "Perfect for your physical business" : "",
        sellsInPerson ? "Optimized for in-person sales" : "",
        wantsBothChannels ? "Combined online and in-person support in one platform" : "",
        "Simple setup with no long-term contracts",
        "Integrated POS hardware and software",
      ].filter(Boolean),
    };
  }

  // SUMUP - Low volume, in-person, simplicity focused
  if (isLowVolume && sellsInPerson && wantsEasySetup) {
    return {
      name: "SumUp",
      description:
        "SumUp is perfect for small businesses processing lower volumes who want a simple, affordable card reader with no monthly fees.",
      reasons: [
        "Your monthly volume under £5k qualifies for their simple pricing",
        "Ideal for in-person transactions",
        "No monthly fees — just pay per transaction",
        "Easy setup with portable card readers",
      ],
    };
  }

  // BRAINTREE - Subscriptions or developer control
  if (isSubscription || needsRecurring || isDeveloperFriendly || (isMediumVolume && sellsOnline)) {
    return {
      name: "Braintree",
      description:
        "Braintree (a PayPal service) offers robust subscription billing and developer tools for businesses needing flexible payment solutions.",
      reasons: [
        isSubscription ? "Built for subscription-based businesses" : "",
        needsRecurring ? "Strong recurring billing infrastructure" : "",
        isDeveloperFriendly ? "Developer-friendly APIs and documentation" : "",
        sellsOnline ? "Optimized for online transactions" : "",
        "Supports PayPal, Venmo, and card payments",
      ].filter(Boolean),
    };
  }

  // PAYPAL - Early stage, trust-focused, or low-value transactions
  if (isLowVolume || wantsEasySetup || isEarlyStage || businessType === "Other / mixed") {
    return {
      name: "PayPal",
      description:
        "PayPal is trusted by millions of buyers worldwide, making it ideal for businesses that want instant credibility and easy checkout.",
      reasons: [
        "Trusted by customers worldwide for secure payments",
        "Quick and easy setup with no technical knowledge required",
        isLowVolume || isEarlyStage ? "Great for businesses just starting out" : "",
        "Buyers feel confident paying with PayPal",
      ].filter(Boolean),
    };
  }

  // No match found
  return null;
};

const Recommendation = () => {
  const [answers] = useState<QuizAnswers | null>(() => readStoredAnswers());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<LeadCaptureFormRef>(null);
  const { toast } = useToast();

  const quizComplete = answers ? isQuizComplete(answers) : false;
  const recommendation = answers && quizComplete ? getRecommendation(answers) : null;

  const showNeedsQuiz = !answers || !quizComplete;
  const showNoMatch = !!answers && quizComplete && !recommendation;

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
            Your Best Option
          </h1>
          <p className="text-lg text-muted-foreground">
            Based on your answers, here's the right provider for your business.
          </p>
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

        {/* Recommendation Card */}
        {recommendation && (
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
              {isSubmitted ? (
                <Card className="border border-primary/30 bg-primary/5">
                  <CardContent className="p-8 md:p-10 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                      <Check className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Thank you — you're all set.
                    </h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      We'll pass your details to the provider (and other suitable options) so you'll hear back within 24 hours.
                    </p>
                    <p className="text-muted-foreground max-w-md mx-auto mt-4">
                      Payment fees directly impact your profits, and we're here to help you keep more of what you earn.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <>
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
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </>
        )}

        {/* No Match Fallback */}
        {showNoMatch && (
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
              {isSubmitted ? (
                <Card className="border border-primary/30 bg-primary/5">
                  <CardContent className="p-8 md:p-10 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                      <Check className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Thank you — you're all set.
                    </h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      We'll pass your details to the provider (and other suitable options) so you'll hear back within 24 hours.
                    </p>
                    <p className="text-muted-foreground max-w-md mx-auto mt-4">
                      Payment fees directly impact your profits, and we're here to help you keep more of what you earn.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <>
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
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
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
