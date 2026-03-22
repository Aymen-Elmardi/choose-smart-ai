import { useState, useRef, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CreditCard, Check, ArrowRight, Loader2, Mail, ShieldX, AlertTriangle, CheckCircle, Building2, Globe, CreditCard as CardIcon, TrendingUp, ShoppingCart, Tag, Calendar, ChevronDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { fetchServerRecommendation } from "@/lib/quizRecommendationService";
import type { QuizAnswers, Provider } from "@/types/quiz";
import { initializeSessionTracking } from "@/lib/sessionTracking";

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
  const [guidanceSubmitted, setGuidanceSubmitted] = useState(false);
  const [guidanceEmail, setGuidanceEmail] = useState("");
  const [showFullForm, setShowFullForm] = useState(false);
  const { toast } = useToast();

  const [primary, setPrimary] = useState<Provider | null>(null);
  const [avoid, setAvoid] = useState<EliminatedProvider[]>([]);
  const [resultsLoaded, setResultsLoaded] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    notes: "",
    websiteUrl: "",
    currentProvider: "",
    painPoints: "",
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
      setAvoid(result.avoid.filter(p => CURATED_PROVIDERS.includes(p.name)));
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

  const handleGuidanceSubmit = async () => {
    if (!formData.fullName.trim()) {
      toast({ title: "Please enter your name", variant: "destructive" });
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({ title: "Please enter a valid email address", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    setGuidanceEmail(formData.email);

    const firstName = formData.fullName.trim().split(/\s+/)[0] || formData.fullName;

    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      businessName: formData.companyName,
      notes: "",
      websiteUrl: "",
      currentProvider: "",
      painPoints: "",
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
    } finally {
      setIsSubmitting(false);
      setGuidanceSubmitted(true);
    }
  };

  const handleFullFormSubmit = async () => {
    setIsSubmitting(true);
    setBackgroundError(null);

    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({ event: "advisory_form_submit" });

    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      businessName: formData.companyName,
      notes: formData.notes,
      websiteUrl: formData.websiteUrl,
      currentProvider: formData.currentProvider,
      painPoints: formData.painPoints,
      businessType: answers.businessType,
      monthlyVolume: answers.monthlyVolume,
      avgTransaction: answers.avgTransaction,
      region: answers.location,
      salesChannel: answers.salesChannel,
      priorities: answers.priorities,
      features: answers.features,
      market: market,
      recommendedProvider: primary?.name || "Advisory Review",
      logicPath: "tiered-engine-detailed",
    };

    try {
      const { data, error } = await supabase.functions.invoke("send-lead-email", { body: payload });
      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || "Failed to send");
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting details:", error);
      setBackgroundError("Something went wrong. Please try again.");
      setTimeout(() => setBackgroundError(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Resolve display values from raw answers
  
  const displaySalesChannel = (rawAnswers?.salesChannel || answers.salesChannel) || "—";
  const displayBusinessType = (rawAnswers?.businessType || answers.businessType) || "—";
  const displayIndustry = rawAnswers?.industry || "—";
  const displayVolume = (rawAnswers?.monthlyVolume || answers.monthlyVolume) || "—";
  const displayAvgTx = (rawAnswers?.avgTransaction || answers.avgTransaction) || "—";
  const displayLocation = (rawAnswers?.location || answers.location) || "—";
  const displayPriorities = rawAnswers?.priorities || answers.priorities || [];
  const displayDelivery = rawAnswers?.deliveryTimeline || null;
  const displayRestriction = rawAnswers?.previousRestriction || null;

  const providerName = primary?.name || "the right provider";

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
          /* ── FINAL CONFIRMATION (after full form submit) ── */
          <Card className="border border-primary/30 bg-primary/5 animate-fade-up">
            <CardContent className="p-8 md:p-10">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  Thanks! Our founder will review your profile and email you within 24 hours.
                </h3>
                <p className="text-muted-foreground text-lg max-w-lg mx-auto">
                  Personalized guidance and a warm introduction to {providerName} are on the way.
                </p>
              </div>

              <div className="bg-background rounded-xl border border-border p-5 mb-6 text-left">
                <p className="text-sm font-medium text-foreground mb-3">
                  You'll receive an email at <span className="text-primary font-semibold">{guidanceEmail || formData.email}</span> with:
                </p>
                <ul className="space-y-2">
                  {[
                    "Your full risk analysis",
                    `Why ${providerName} is a fit for your business`,
                    `Direct introduction to ${providerName}'s partnership team`,
                    "Next steps to get approved",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-center gap-2 mb-6">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-500 ${
                  isConfirmationSent ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                }`}>
                  {isConfirmationSent ? <Mail className="w-4 h-4" /> : <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{isConfirmationSent ? "Confirmation sent to your email" : "Sending confirmation..."}</span>
                </div>
              </div>

              {/* Calendly CTA */}
              <div className="text-center pt-4 border-t border-border">
                <a
                  href="https://calendly.com/hello-chosepayments/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                >
                  <Calendar className="w-4 h-4" />
                  Prefer to talk? Book a 30-minute call
                </a>
              </div>

              {backgroundError && (
                <p className="mt-4 text-sm text-muted-foreground animate-fade-in text-center">{backgroundError}</p>
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

                {/* Risk Alignment Score */}
                {primary.matchScore && (
                  <div className="flex justify-center mb-6">
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-primary/10 border border-primary/20">
                      <div className="text-3xl font-bold text-primary">
                        {Math.min(Math.round((primary.matchScore / 130) * 100), 99)}%
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-semibold text-foreground">Risk Alignment</div>
                        <div className="text-xs text-muted-foreground">Match confidence score</div>
                      </div>
                    </div>
                  </div>
                )}

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

            {/* ── STEP 1: Lightweight Guidance Capture ── */}
            {resultsLoaded && !guidanceSubmitted && (
              <div className="animate-fade-up animation-delay-100">
                <Card className="border-2 border-primary/40 bg-primary/5 shadow-md">
                  <CardContent className="p-6 md:p-8">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        Get personalized guidance on your next steps
                      </h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        We'll review your profile and email you within 24 hours with tailored advice.
                      </p>
                    </div>
                    <div className="space-y-4 max-w-md mx-auto">
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
                    </div>
                    <div className="mt-6 text-center">
                      <Button variant="hero" size="xl" onClick={handleGuidanceSubmit} disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            Get Personalized Guidance
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </Button>
                      <p className="mt-3 text-sm text-muted-foreground">
                        Free. No commitment. Your risk profile is included automatically.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* ── STEP 2: Guidance Confirmation + Secondary Full Form ── */}
            {resultsLoaded && guidanceSubmitted && (
              <div className="space-y-6 animate-fade-up animation-delay-100">
                {/* Confirmation card */}
                <Card className="border border-primary/30 bg-primary/5">
                  <CardContent className="p-6 md:p-8">
                    <div className="text-center mb-5">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-3">
                        <Check className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        Thanks! Our founder will review your profile and email you within 24 hours.
                      </h3>
                      <p className="text-muted-foreground max-w-lg mx-auto">
                        Personalized guidance and a warm introduction to {providerName} are on the way.
                      </p>
                    </div>

                    <div className="bg-background rounded-xl border border-border p-5 mb-5 text-left">
                      <p className="text-sm font-medium text-foreground mb-3">
                        You'll receive an email at <span className="text-primary font-semibold">{guidanceEmail}</span> with:
                      </p>
                      <ul className="space-y-2">
                        {[
                          "Your full risk analysis",
                          `Why ${providerName} is a fit for your business`,
                          `Direct introduction to ${providerName}'s partnership team`,
                          "Next steps to get approved",
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                            <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                      <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-500 ${
                        isConfirmationSent ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                      }`}>
                        {isConfirmationSent ? <Mail className="w-4 h-4" /> : <Loader2 className="w-4 h-4 animate-spin" />}
                        <span>{isConfirmationSent ? "Confirmation sent to your email" : "Sending confirmation..."}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Secondary: Full introduction form (collapsible) */}
                <Card className="border border-border/60 bg-card">
                  <CardContent className="p-6 md:p-8">
                    <button
                      onClick={() => setShowFullForm(!showFullForm)}
                      className="w-full flex items-center justify-between text-left"
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          Want to speed things up?
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Share more details for a faster, more targeted introduction.
                        </p>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${showFullForm ? "rotate-180" : ""}`} />
                    </button>

                    {showFullForm && (
                      <div className="mt-6 space-y-5 animate-fade-up">
                        <div className="space-y-2">
                          <Label htmlFor="websiteUrl" className="text-sm font-medium text-foreground">
                            Website URL
                          </Label>
                          <Input
                            id="websiteUrl"
                            type="url"
                            autoComplete="url"
                            placeholder="https://yoursite.com"
                            value={formData.websiteUrl}
                            onChange={(e) => handleInputChange("websiteUrl", e.target.value)}
                            className="h-14 text-base px-4 rounded-xl border-border/60 focus:border-primary focus:ring-primary/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="currentProvider" className="text-sm font-medium text-foreground">
                            Current Payment Provider
                          </Label>
                          <Select
                            value={formData.currentProvider}
                            onValueChange={(value) => handleInputChange("currentProvider", value)}
                          >
                            <SelectTrigger className="h-14 text-base px-4 rounded-xl border-border/60 focus:border-primary focus:ring-primary/20">
                              <SelectValue placeholder="Select your current provider" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">None / New business</SelectItem>
                              <SelectItem value="Stripe">Stripe</SelectItem>
                              <SelectItem value="PayPal">PayPal</SelectItem>
                              <SelectItem value="Square">Square</SelectItem>
                              <SelectItem value="Adyen">Adyen</SelectItem>
                              <SelectItem value="Checkout.com">Checkout.com</SelectItem>
                              <SelectItem value="Braintree">Braintree</SelectItem>
                              <SelectItem value="SumUp">SumUp</SelectItem>
                              <SelectItem value="Worldpay">Worldpay</SelectItem>
                              <SelectItem value="Fiserv (Clover)">Fiserv (Clover)</SelectItem>
                              <SelectItem value="Shift4">Shift4</SelectItem>
                              <SelectItem value="Authorize.Net">Authorize.Net</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="painPoints" className="text-sm font-medium text-foreground">
                            Specific Pain Points
                          </Label>
                          <Textarea
                            id="painPoints"
                            placeholder="e.g. High chargebacks, poor support, account frozen"
                            value={formData.painPoints}
                            onChange={(e) => handleInputChange("painPoints", e.target.value)}
                            className="min-h-[80px] text-base px-4 py-3 rounded-xl border-border/60 focus:border-primary focus:ring-primary/20 resize-none"
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
                            className="min-h-[80px] text-base px-4 py-3 rounded-xl border-border/60 focus:border-primary focus:ring-primary/20 resize-none"
                          />
                        </div>
                        <div className="text-center pt-2">
                          <Button variant="hero" size="lg" onClick={handleFullFormSubmit} disabled={isSubmitting}>
                            {isSubmitting ? (
                              <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Submitting...
                              </>
                            ) : (
                              <>
                                Request Introduction
                                <ArrowRight className="w-5 h-5" />
                              </>
                            )}
                          </Button>
                          {backgroundError && (
                            <p className="mt-3 text-sm text-destructive">{backgroundError}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Retake + Calendly */}
            <div className="text-center mt-10 animate-fade-up animation-delay-200 space-y-4">
              <div>
                <p className="text-muted-foreground mb-4">Need to change your answers?</p>
                <a href="/assessment?start=true" className="text-primary font-medium hover:underline">
                  Retake assessment →
                </a>
              </div>
              <div className="pt-2">
                <a
                  href="https://calendly.com/hello-chosepayments/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                  <Calendar className="w-4 h-4" />
                  Prefer to talk? Book a 30-minute call
                </a>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Recommendation;
