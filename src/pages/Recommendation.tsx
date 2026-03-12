import { useState, useRef, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CreditCard, Check, ArrowRight, Loader2, Mail, ShieldX, AlertTriangle, CheckCircle, Building2, Globe, CreditCard as CardIcon, TrendingUp, ShoppingCart, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { fetchServerRecommendation } from "@/lib/quizRecommendationService";
import type { QuizAnswers, Provider } from "@/types/quiz";
import { initializeSessionTracking } from "@/hooks/useEnrichmentData";
import { cn } from "@/lib/utils";

interface EliminatedProvider {
  name: string;
  reason: string;
}

interface RawQuizAnswers {
  salesChannel?: string;
  businessType?: string;
  industry?: string;
  monthlyVolume?: string;
  avgTransaction?: string;
  location?: string;
  priorities?: string[];
  deliveryTimeline?: string;
  previousRestriction?: string;
  terminalType?: string;
  buyingIntent?: string;
  contactTime?: string;
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

const readRawAnswers = (): RawQuizAnswers | null => {
  try {
    const raw = sessionStorage.getItem("quizAnswersRaw");
    if (!raw) return null;
    return JSON.parse(raw) as RawQuizAnswers;
  } catch {
    return null;
  }
};

const isQuizComplete = (a: QuizAnswers) =>
  Boolean(a.salesChannel && a.businessType && a.monthlyVolume && a.avgTransaction && a.location && a.priorities?.length);

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


// Business profile detail item
const ProfileItem = ({ label, value, icon: Icon }: { label: string; value: string; icon: React.ElementType }) => (
  <div className="flex items-start gap-3">
    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5">
      <Icon className="w-4 h-4 text-muted-foreground" />
    </div>
    <div className="min-w-0">
      <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{label}</div>
      <div className="text-sm font-medium text-foreground truncate">{value}</div>
    </div>
  </div>
);

const Recommendation = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const startedFromQuizRef = useRef(searchParams.get("fromQuiz") === "true");
  const [showLoader, setShowLoader] = useState(() => startedFromQuizRef.current);
  const [answers] = useState<QuizAnswers | null>(() => readStoredAnswers());
  const [rawAnswers] = useState<RawQuizAnswers | null>(() => readRawAnswers());
  const [market] = useState<Market>(() => readStoredMarket());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isConfirmationSent, setIsConfirmationSent] = useState(false);
  const [backgroundError, setBackgroundError] = useState<string | null>(null);
  const { toast } = useToast();

  const [primary, setPrimary] = useState<Provider | null>(null);
  const [alternatives, setAlternatives] = useState<Provider[]>([]);
  const [avoid, setAvoid] = useState<EliminatedProvider[]>([]);
  const [riskConfidence, setRiskConfidence] = useState<"high" | "medium" | "low">("low");
  const [reserveProbability, setReserveProbability] = useState<"low" | "moderate" | "elevated">("low");
  const [resultsLoaded, setResultsLoaded] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    notes: "",
  });

  const quizComplete = answers ? isQuizComplete(answers) : false;

  useEffect(() => {
    initializeSessionTracking();
    if (!answers || !quizComplete) {
      navigate("/assessment?start=true", { replace: true });
    }
  }, [answers, quizComplete, navigate]);

  useEffect(() => {
    if (!answers || !quizComplete) return;
    fetchServerRecommendation(answers).then((result) => {
      const CURATED_PROVIDERS = [
        "Stripe", "Square", "PayPal", "Adyen", "Datman", "SumUp",
        "Braintree", "Shift4", "Fiserv (Clover)", "Authorize.Net"
      ];
      setPrimary(result.primary);
      setAlternatives(result.alternatives);
      setAvoid(result.avoid.filter(p => CURATED_PROVIDERS.includes(p.name)));
      setRiskConfidence(result.riskConfidence);
      setReserveProbability(result.reserveProbability);
      setResultsLoaded(true);
    });
  }, [answers, quizComplete]);

  useEffect(() => {
    if (!startedFromQuizRef.current) {
      setShowLoader(false);
      return;
    }
    const newParams = new URLSearchParams(window.location.search);
    newParams.delete("fromQuiz");
    setSearchParams(newParams, { replace: true });
    const timer = setTimeout(() => setShowLoader(false), 1200);
    return () => clearTimeout(timer);
  }, [setSearchParams]);

  useEffect(() => {
    if (isSubmitted) setShowLoader(false);
  }, [isSubmitted]);

  if (!answers || !quizComplete) return null;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.fullName.trim()) {
      toast({ title: "Please enter your name", variant: "destructive" });
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({ title: "Please enter a valid email address", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({ event: "advisory_form_submit" });
    setIsSubmitted(true);
    setBackgroundError(null);

    const firstName = formData.fullName.trim().split(/\s+/)[0] || formData.fullName;

    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      businessName: formData.companyName,
      notes: formData.notes,
      businessType: answers.businessType,
      monthlyVolume: answers.monthlyVolume,
      avgTransaction: answers.avgTransaction,
      region: answers.location,
      salesChannel: answers.salesChannel,
      priorities: answers.priorities,
      features: answers.features,
      market: market,
      recommendedProvider: primary?.name || "Advisory Review",
      logicPath: "tiered-engine",
    };

    try {
      const { data, error } = await supabase.functions.invoke("send-lead-email", { body: payload });
      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || "Failed to send");

      try {
        const { data: confirmData, error: confirmError } = await supabase.functions.invoke("send-confirmation-email", {
          body: { email: formData.email, firstName },
        });
        if (!confirmError && confirmData?.success) setIsConfirmationSent(true);
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

  // Resolve display values from raw answers
  const profileData = rawAnswers || answers;
  const displaySalesChannel = (rawAnswers?.salesChannel || answers.salesChannel) || "—";
  const displayBusinessType = (rawAnswers?.businessType || answers.businessType) || "—";
  const displayIndustry = rawAnswers?.industry || "—";
  const displayVolume = (rawAnswers?.monthlyVolume || answers.monthlyVolume) || "—";
  const displayAvgTx = (rawAnswers?.avgTransaction || answers.avgTransaction) || "—";
  const displayLocation = (rawAnswers?.location || answers.location) || "—";
  const displayPriorities = rawAnswers?.priorities || answers.priorities || [];
  const displayDelivery = rawAnswers?.deliveryTimeline || null;
  const displayRestriction = rawAnswers?.previousRestriction || null;

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
            Calculating your risk profile
          </h2>
          <p className="text-muted-foreground text-lg mb-4">
            Scoring providers against your business signals
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
            <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Back to Home
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        {isSubmitted ? (
          <Card className="border border-primary/30 bg-primary/5 animate-fade-up">
            <CardContent className="p-8 md:p-10 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-3">
                Thanks. Your details have been received.
              </h3>
              <p className="text-muted-foreground text-lg max-w-md mx-auto mb-6">
                We now have your risk profile and contact information. If this looks like a case we can help with, we'll follow up with next steps.
              </p>
              <div className="flex items-center justify-center gap-2 mt-6">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-500 ${
                  isConfirmationSent ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                }`}>
                  {isConfirmationSent ? <Mail className="w-4 h-4" /> : <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{isConfirmationSent ? "Confirmation sent to your email" : "Sending confirmation..."}</span>
                </div>
              </div>
              {backgroundError && (
                <p className="mt-4 text-sm text-muted-foreground animate-fade-in">{backgroundError}</p>
              )}
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Results */}
            {resultsLoaded && primary ? (
              <div className="animate-fade-up">
                {/* Header */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    Your Risk Profile Results
                  </h2>
                  <p className="text-muted-foreground max-w-xl mx-auto">
                    Based on your business profile, here's how providers align with your risk signals.
                  </p>
                </div>

                {/* Section 1 — Business Profile (HIGHLIGHTED) */}
                <Card className="border-2 border-primary/30 bg-primary/5 mb-8 shadow-sm">
                  <CardContent className="p-6 md:p-8">
                    <h3 className="text-lg font-bold text-foreground mb-5">Your Business Profile</h3>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                      <ProfileItem icon={ShoppingCart} label="Sales Channel" value={displaySalesChannel} />
                      <ProfileItem icon={Building2} label="Business Type" value={displayBusinessType} />
                      {displayIndustry !== "—" && (
                        <ProfileItem icon={Tag} label="Industry" value={displayIndustry} />
                      )}
                      <ProfileItem icon={TrendingUp} label="Monthly Volume" value={displayVolume} />
                      <ProfileItem icon={CardIcon} label="Avg. Transaction" value={displayAvgTx} />
                      <ProfileItem icon={Globe} label="Location" value={displayLocation} />
                    </div>
                    {displayPriorities.length > 0 && (
                      <div className="mt-5 pt-5 border-t border-primary/15">
                        <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-2">Priorities</div>
                        <div className="flex flex-wrap gap-2">
                          {displayPriorities.map((p) => (
                            <span key={p} className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {(displayDelivery || displayRestriction) && (
                      <div className="mt-5 pt-5 border-t border-primary/15 grid grid-cols-2 gap-x-6 gap-y-3">
                        {displayDelivery && (
                          <div>
                            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Delivery Timeline</div>
                            <div className="text-sm font-medium text-foreground">{displayDelivery}</div>
                          </div>
                        )}
                        {displayRestriction && (
                          <div>
                            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Previous Restrictions</div>
                            <div className="text-sm font-medium text-foreground">{displayRestriction}</div>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Section 2 — Recommended Provider (SUBDUED) */}
                <Card className="border border-border/60 bg-card mb-6">
                  <CardContent className="p-5 md:p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Recommended Provider</span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{primary.name}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{primary.description}</p>
                    {primary.reasons?.length > 0 && (
                      <ul className="space-y-1.5">
                        {primary.reasons.map((r, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <Check className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>

                {/* Section 3 — Providers to Avoid (HIGHLIGHTED) */}
                {avoid.length > 0 && (
                  <Card className="border-2 border-destructive/20 bg-destructive/5 mb-8">
                    <CardContent className="p-5 md:p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <AlertTriangle className="w-5 h-5 text-destructive" />
                        <span className="text-sm font-bold text-destructive uppercase tracking-wider">Providers to Avoid</span>
                      </div>
                      <div className="space-y-3">
                        {avoid.slice(0, 2).map((p) => (
                          <div key={p.name} className="flex items-start gap-3 px-4 py-3 rounded-lg bg-background border border-destructive/15">
                            <ShieldX className="w-4 h-4 text-destructive/70 shrink-0 mt-0.5" />
                            <div>
                              <span className="text-sm font-semibold text-foreground">{p.name}</span>
                              <p className="text-xs text-muted-foreground mt-0.5">{p.reason}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : resultsLoaded && !primary ? (
              <div className="text-center mb-12 animate-fade-up">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Assessment Complete
                </h2>
                <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                  We couldn't generate an automated match for your profile. Leave your details below and our team will review your situation manually.
                </p>
              </div>
            ) : (
              <div className="text-center mb-12">
                <div className="flex justify-center mb-4">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
                <p className="text-muted-foreground">Calculating your risk profile...</p>
              </div>
            )}

            {/* Contact Form */}
            <div className="animate-fade-up animation-delay-100">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Want us to follow up with next steps?
                </h3>
                <p className="text-muted-foreground">
                  Leave your details and we'll review your profile in detail.
                </p>
              </div>

              <Card className="border border-border/50">
                <CardContent className="p-6 md:p-8">
                  <div className="space-y-5">
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
                  <div className="mt-8 text-center">
                    <Button variant="hero" size="xl" onClick={handleSubmit} disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit My Details
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </Button>
                    <p className="mt-3 text-sm text-muted-foreground max-w-md mx-auto">
                      Your assessment answers and risk profile will be included so we have full context.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Retake */}
            <div className="text-center mt-10 animate-fade-up animation-delay-200">
              <p className="text-muted-foreground mb-4">Need to change your answers?</p>
              <a href="/assessment?start=true" className="text-primary font-medium hover:underline">
                Retake assessment →
              </a>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Recommendation;
