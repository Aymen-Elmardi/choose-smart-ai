import { useEffect, useState } from "react";
import { CreditCard, Check, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface QuizAnswers {
  businessType: string;
  salesChannel: string;
  monthlyVolume: string;
  avgTransaction: string;
  international: string;
  recurring: string;
  priorities: string[];
  location: string;
}

interface Provider {
  name: string;
  description: string;
  reasons: string[];
}

const getRecommendation = (answers: QuizAnswers): Provider | null => {
  const {
    businessType,
    salesChannel,
    monthlyVolume,
    international,
    recurring,
    priorities,
    location,
  } = answers;

  const sellsOnline = salesChannel === "Online only" || salesChannel === "Both online and in-person";
  const sellsInPerson = salesChannel === "In-person only" || salesChannel === "Both online and in-person";
  const acceptsInternational = international === "Yes";
  const needsRecurring = recurring === "Yes" || recurring === "Possibly later";
  const isDeveloperFriendly = priorities.includes("Developer-friendly");
  const wantsGlobalReach = priorities.includes("Global reach");
  const wantsEasySetup = priorities.includes("Easy setup");
  const wantsLowestFees = priorities.includes("Lowest fees");
  const wantsOnlineInPerson = priorities.includes("Online + in-person support");
  
  const isLowVolume = monthlyVolume === "< £5k";
  const isMediumVolume = monthlyVolume === "£5k–20k" || monthlyVolume === "£20k–50k";
  const isHighVolume = monthlyVolume === "£50k–100k" || monthlyVolume === "£100k+";
  const volumeOver20k = monthlyVolume === "£20k–50k" || monthlyVolume === "£50k–100k" || monthlyVolume === "£100k+";
  const volumeOver50k = monthlyVolume === "£50k–100k" || monthlyVolume === "£100k+";
  
  const isRestaurantOrRetail = businessType === "Restaurant or Café" || businessType === "Retail Shop";
  const isMarketplace = businessType === "Marketplace";
  const isSubscription = businessType === "Subscription Business";
  const isEcommerce = businessType === "Ecommerce";
  const isUK = location === "UK";

  // DATMAN - UK Marketplaces with high volume (simplified since no split payment option in quiz)
  if (isMarketplace && volumeOver20k && isUK && (isDeveloperFriendly || wantsLowestFees)) {
    return {
      name: "Datman",
      description: "Datman is ideal for UK marketplaces needing built-in revenue share and instant multi-party splitting at the point of transaction. Perfect for platforms scaling quickly and looking to earn income from every sale.",
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
      description: "Adyen is a global payment platform built for enterprise marketplaces and platforms processing high volumes internationally.",
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
      description: "Stripe is the leading payment platform for online businesses, offering powerful APIs and seamless international payment support.",
      reasons: [
        sellsOnline ? "You sell products or services online" : "",
        acceptsInternational ? "You accept international customers" : "",
        needsRecurring ? "You need recurring billing capabilities" : "",
        isDeveloperFriendly ? "Developer-friendly tools are important to you" : "",
        wantsGlobalReach ? "Global reach is a priority for your business" : "",
      ].filter(Boolean),
    };
  }

  // SQUARE - Restaurants, retail, or in-person focused
  if (isRestaurantOrRetail || sellsInPerson || wantsOnlineInPerson) {
    return {
      name: "Square",
      description: "Square provides an all-in-one solution for businesses that sell in-person, with easy-to-use point-of-sale hardware and integrated online tools.",
      reasons: [
        isRestaurantOrRetail ? "Perfect for your " + businessType.toLowerCase() + " business" : "",
        sellsInPerson ? "Optimized for in-person sales" : "",
        wantsOnlineInPerson ? "Combined online and in-person support in one platform" : "",
        "Simple setup with no long-term contracts",
        "Integrated POS hardware and software",
      ].filter(Boolean),
    };
  }

  // SUMUP - Low volume, in-person, simplicity focused
  if (isLowVolume && sellsInPerson && wantsEasySetup) {
    return {
      name: "SumUp",
      description: "SumUp is perfect for small businesses processing lower volumes who want a simple, affordable card reader with no monthly fees.",
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
      description: "Braintree (a PayPal service) offers robust subscription billing and developer tools for businesses needing flexible payment solutions.",
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
  if (isLowVolume || wantsEasySetup || businessType === "Other") {
    return {
      name: "PayPal",
      description: "PayPal is trusted by millions of buyers worldwide, making it ideal for businesses that want instant credibility and easy checkout.",
      reasons: [
        "Trusted by customers worldwide for secure payments",
        "Quick and easy setup with no technical knowledge required",
        isLowVolume ? "Great for businesses just starting out" : "",
        "Buyers feel confident paying with PayPal",
      ].filter(Boolean),
    };
  }

  // No match found
  return null;
};

const Recommendation = () => {
  const [answers, setAnswers] = useState<QuizAnswers | null>(null);
  const [recommendation, setRecommendation] = useState<Provider | null>(null);
  const [noMatch, setNoMatch] = useState(false);

  useEffect(() => {
    const storedAnswers = sessionStorage.getItem("quizAnswers");
    if (storedAnswers) {
      const parsed = JSON.parse(storedAnswers) as QuizAnswers;
      setAnswers(parsed);
      const result = getRecommendation(parsed);
      if (result) {
        setRecommendation(result);
      } else {
        setNoMatch(true);
      }
    } else {
      setNoMatch(true);
    }
  }, []);

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
      <main className="max-w-3xl mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-10 animate-fade-up">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Your Recommended Payment Provider
          </h1>
          <p className="text-lg text-muted-foreground">
            Based on your answers, here's the best fit for your business.
          </p>
        </div>

        {/* Recommendation Card */}
        {recommendation && (
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

              {/* Primary CTA */}
              <div className="mt-8 text-center">
                <Button variant="hero" size="xl">
                  Connect me to this provider
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* No Match Fallback */}
        {noMatch && (
          <Card className="border-2 border-border shadow-elegant animate-fade-up animation-delay-100">
            <CardContent className="p-8 md:p-10 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted mb-4">
                <MessageCircle className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                We couldn't find an exact match
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                Based on your answers, we'd like to help you personally. Speak directly with one of our payment experts.
              </p>
              <Button variant="hero" size="xl">
                Speak to one of our experts
                <ArrowRight className="w-5 h-5" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Retake Quiz CTA */}
        <div className="text-center mt-10 animate-fade-up animation-delay-200">
          <p className="text-muted-foreground mb-4">
            Not what you expected?
          </p>
          <a 
            href="/quiz" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-medium hover:underline"
          >
            Retake the quiz →
          </a>
        </div>
      </main>
    </div>
  );
};

export default Recommendation;
