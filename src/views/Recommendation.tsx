'use client'
import { useState, useRef, useEffect } from "react";
import { LOGO, IS_SEASONAL_LOGO } from "@/lib/brand";
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Check, ArrowRight, Loader2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import type { QuizAnswers } from "@/types/quiz";
import { initializeSessionTracking } from "@/lib/sessionTracking";
import { trackEvent } from "@/lib/analytics";
import { BOOKING_URL } from "@/lib/booking";

// The recommendation is calculated by the submit-assessment edge function once
// the visitor has given a name and email, and is emailed to them. It is never
// fetched or rendered here.

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
      // Industry + segmentation are needed by the engine and results templates
      industry: typeof parsed.industry === "string" ? parsed.industry : undefined,
      platform: typeof parsed.platform === "string" ? parsed.platform : undefined,
      segment: parsed.segment,
      volumeTier: parsed.volumeTier,
    };
  } catch {
    return null;
  }
};

const readRawAnswers = (): Record<string, unknown> | null => {
  try {
    const raw = sessionStorage.getItem("quizAnswersRaw");
    if (!raw) return null;
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return null;
  }
};

// The 5-question US assessment no longer asks for transaction size or
// location, and "Paying out sellers" sets a feature rather than a priority.
const isQuizComplete = (a: QuizAnswers) =>
  Boolean(a.salesChannel && a.businessType && a.monthlyVolume && a.location && (a.priorities?.length || a.features?.length));

// Optional, for the savings estimate in the results email. Names match
// FLAT_RATE_PROCESSORS in supabase/functions/submit-assessment/results.ts.
const CURRENT_PROCESSOR_OPTIONS = [
  "Stripe",
  "Square",
  "PayPal",
  "Shopify Payments",
  "Clover / Fiserv",
  "Authorize.net",
  "Another processor",
  "Not taking payments yet",
];

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

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FieldErrors {
  fullName?: string;
  email?: string;
}

// Mirrors the server-side checks in submit-assessment.
const validate = (fullName: string, email: string): FieldErrors => {
  const errors: FieldErrors = {};
  const name = fullName.trim();
  if (!name) errors.fullName = "Name is required.";
  else if (name.length < 2 || /^[0-9]+$/.test(name)) errors.fullName = "Please enter your name.";
  const mail = email.trim();
  if (!mail) errors.email = "Email is required.";
  else if (!EMAIL_PATTERN.test(mail) || mail.length > 254) errors.email = "Please enter a valid email address.";
  return errors;
};

const Recommendation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const startedFromQuizRef = useRef(searchParams.get("fromQuiz") === "true");
  const [showLoader, setShowLoader] = useState(() => startedFromQuizRef.current);
  const [answers] = useState<QuizAnswers | null>(() => readStoredAnswers());
  const [rawAnswers] = useState<Record<string, unknown> | null>(() => readRawAnswers());
  const [market] = useState<Market>(() => readStoredMarket());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [currentProcessor, setCurrentProcessor] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState(false);

  const quizComplete = answers ? isQuizComplete(answers) : false;

  useEffect(() => {
    initializeSessionTracking();
    if (!answers || !quizComplete) {
      router.replace("/assessment?start=true");
    }
  }, [answers, quizComplete, router]);

  useEffect(() => {
    if (!startedFromQuizRef.current) {
      setShowLoader(false);
      return;
    }
    // Drop ?fromQuiz so a refresh or a shared link does not replay the loader.
    // router and pathname are both stable, so this effect runs once rather than
    // re-firing after the navigation it performs.
    const next = new URLSearchParams(window.location.search);
    next.delete("fromQuiz");
    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    const timer = setTimeout(() => setShowLoader(false), 1200);
    return () => clearTimeout(timer);
  }, [router, pathname]);

  if (!answers || !quizComplete) return null;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isSubmitting) return;

    setTouched(true);
    const fieldErrors = validate(fullName, email);
    setErrors(fieldErrors);
    if (fieldErrors.fullName || fieldErrors.email) return;

    setIsSubmitting(true);
    trackEvent("advisory_form_submit");

    try {
      const { data, error } = await supabase.functions.invoke("submit-assessment", {
        body: {
          fullName: fullName.trim(),
          email: email.trim(),
          market,
          answers,
          raw: { ...(rawAnswers ?? {}), currentProcessor },
          _honeypot: honeypot,
        },
      });
      if (error || !data?.success) {
        console.error("Assessment submission failed:", error ?? data?.error);
      }
    } catch (err) {
      // The visitor sees the thank-you screen regardless; failures are logged
      // server-side and here.
      console.error("Assessment submission failed:", err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo(0, 0);
    }
  };

  // Re-validate as the visitor types once they have tried to submit, so an
  // error clears as soon as it is fixed.
  const updateField = (field: "fullName" | "email", value: string) => {
    if (field === "fullName") setFullName(value);
    else setEmail(value);
    if (touched) {
      setErrors(validate(field === "fullName" ? value : fullName, field === "email" ? value : email));
    }
  };

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

  const inputClass = "h-14 text-base px-4 rounded-xl border-border/60 focus:border-primary focus:ring-primary/20";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="flex items-center gap-2" aria-label="ChosePayments home">
              <img src={LOGO.mark.src} alt="" width={LOGO.mark.width} height={LOGO.mark.height} className={`h-7 w-auto${IS_SEASONAL_LOGO ? " rounded-md" : ""}`} />
              <span className="cp-logotype">Chose<em>Payments</em></span>
            </a>
            <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Back to Home
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        {isSubmitted ? (
          /* ── THANK YOU ── */
          <Card className="border border-primary/30 bg-primary/5 animate-fade-up">
            <CardContent className="p-8 md:p-10">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold text-foreground mb-3 max-w-lg mx-auto">
                  Thank you for completing the assessment. We'll email your results within the next 5 minutes.
                </h2>
              </div>

              <div className="text-center pt-6 mt-6 border-t border-border">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                >
                  <Calendar className="w-4 h-4" />
                  Prefer to talk? Book a 15-minute call
                </a>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="text-center mb-8 animate-fade-up">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Your assessment is complete
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Tell us where to send your results. You'll get your recommended provider and the reasoning behind it by email.
              </p>
            </div>

            {/* ── Name + email capture ── */}
            <div className="animate-fade-up animation-delay-100">
              <Card className="border-2 border-primary/40 bg-primary/5 shadow-md">
                <CardContent className="p-6 md:p-8">
                  <form onSubmit={handleSubmit} noValidate>
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
                          value={fullName}
                          onChange={(e) => updateField("fullName", e.target.value)}
                          aria-invalid={!!errors.fullName}
                          aria-describedby={errors.fullName ? "fullName-error" : undefined}
                          className={cn(inputClass, errors.fullName && "border-destructive focus:border-destructive")}
                          required
                        />
                        {errors.fullName && (
                          <p id="fullName-error" className="text-sm text-destructive">{errors.fullName}</p>
                        )}
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
                          value={email}
                          onChange={(e) => updateField("email", e.target.value)}
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "email-error" : undefined}
                          className={cn(inputClass, errors.email && "border-destructive focus:border-destructive")}
                          required
                        />
                        {errors.email && (
                          <p id="email-error" className="text-sm text-destructive">{errors.email}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currentProcessor" className="text-sm font-medium text-foreground">
                          Who processes your payments now? <span className="font-normal text-muted-foreground">(optional)</span>
                        </Label>
                        <select
                          id="currentProcessor"
                          value={currentProcessor}
                          onChange={(e) => setCurrentProcessor(e.target.value)}
                          className={cn(inputClass, "w-full border bg-background text-foreground")}
                        >
                          <option value="">Choose one</option>
                          {CURRENT_PROCESSOR_OPTIONS.map((name) => (
                            <option key={name} value={name}>{name}</option>
                          ))}
                        </select>
                        <p className="text-sm text-muted-foreground">Add it to get an estimate of what you could save.</p>
                      </div>
                      {/* Honeypot: hidden from people, filled in by bots. */}
                      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
                        <label htmlFor="company-website">Company website</label>
                        <input
                          id="company-website"
                          type="text"
                          tabIndex={-1}
                          autoComplete="off"
                          value={honeypot}
                          onChange={(e) => setHoneypot(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mt-6 text-center">
                      <Button type="submit" variant="hero" size="xl" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Email my results
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </Button>
                      <p className="mt-3 text-sm text-muted-foreground">
                        Free. No commitment.
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Retake + booking */}
            <div className="text-center mt-10 animate-fade-up animation-delay-200 space-y-4">
              <div>
                <p className="text-muted-foreground mb-4">Need to change your answers?</p>
                <a href="/assessment?start=true" className="text-primary font-medium hover:underline">
                  Retake assessment →
                </a>
              </div>
              <div className="pt-2">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                  <Calendar className="w-4 h-4" />
                  Prefer to talk? Book a 15-minute call
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
