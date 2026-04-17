import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Loader2,
  Upload,
  X,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Upload Your Statement",
    description:
      "Download your latest statement from your payment provider's dashboard (Stripe, Worldpay, Barclaycard, etc.) in Excel format and upload it here.",
  },
  {
    number: "02",
    title: "We Analyse Your Fees",
    description:
      "Our system breaks down every charge — interchange, scheme fees, gateway fees, PCI, chargebacks — and maps your exact transaction mix.",
  },
  {
    number: "03",
    title: "Get Your Savings Report",
    description:
      "Receive a personalised comparison showing what you'd pay with alternative providers, plus the specific rates to negotiate.",
  },
];

const providerOptions = [
  "Stripe",
  "PayPal",
  "Square",
  "Adyen",
  "Checkout.com",
  "Worldpay",
  "Barclaycard",
  "Elavon",
  "Global Payments",
  "Takepayments",
  "SumUp",
  "Braintree",
  "Trust Payments",
  "Fiserv",
  "Other",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_EXTENSIONS = [".xlsx", ".xls"];

const sanitizeFileName = (name: string) =>
  name.replace(/[^a-zA-Z0-9.\-_]/g, "_");

const fileToBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // strip "data:...;base64," prefix
      const base64 = result.includes(",") ? result.split(",")[1] : result;
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

const StatementAnalysis = () => {
  useSEO({
    title: "Free Payment Statement Analysis UK — ChosePayments",
    description:
      "Upload your payment processing statement and get a free analysis showing exactly where you're overpaying. Compare fees across Stripe, Adyen, Worldpay and more.",
    keywords: [
      "payment statement analysis",
      "payment processing fees analysis",
      "compare payment fees UK",
      "payment fee calculator",
      "overpaying payment processing",
    ],
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [currentProvider, setCurrentProvider] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState<string>("");

  const validateFile = (incoming: File): string | null => {
    const lowerName = incoming.name.toLowerCase();
    const hasValidExt = ALLOWED_EXTENSIONS.some((ext) =>
      lowerName.endsWith(ext)
    );
    if (!hasValidExt) {
      return "Please upload an Excel file (.xlsx or .xls).";
    }
    if (incoming.size > MAX_FILE_SIZE) {
      return "File is larger than 5MB. Please upload a smaller file.";
    }
    return null;
  };

  const handleFileSelected = (incoming: File | null) => {
    if (!incoming) {
      setFile(null);
      setFileError(null);
      return;
    }
    const error = validateFile(incoming);
    if (error) {
      setFile(null);
      setFileError(error);
      return;
    }
    setFileError(null);
    setFile(incoming);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files?.[0] ?? null;
    handleFileSelected(droppedFile);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const resetForm = () => {
    setFile(null);
    setFileError(null);
    setCurrentProvider("");
    setFullName("");
    setEmail("");
    setSubmitError(null);
    setSubmitted(false);
    setSubmittedEmail("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const canSubmit =
    !!file &&
    !!currentProvider &&
    fullName.trim().length > 0 &&
    isValidEmail(email) &&
    !submitting;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    if (!file) {
      setFileError("Please upload your statement file.");
      return;
    }
    if (!currentProvider) {
      setSubmitError("Please select your current provider.");
      return;
    }
    if (!fullName.trim()) {
      setSubmitError("Please enter your full name.");
      return;
    }
    if (!isValidEmail(email)) {
      setSubmitError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);

    try {
      const fileBase64 = await fileToBase64(file);
      const timestamp = Date.now();
      const sanitized = sanitizeFileName(file.name);
      const filePath = `${timestamp}_${sanitized}`;

      const payload = {
        fullName: fullName.trim(),
        email: email.trim(),
        currentProvider,
        fileName: file.name,
        filePath,
        fileBase64,
        fileSize: file.size,
        fileType: file.type,
      };

      const { data, error } = await supabase.functions.invoke(
        "submit-statement-analysis",
        { body: payload }
      );

      if (error) throw error;
      if (data && data.success === false) {
        throw new Error(data.error || "Submission failed. Please try again.");
      }

      setSubmittedEmail(email.trim());
      setSubmitted(true);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 md:pt-44 md:pb-28">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 text-center">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-6">
              Free Statement Analysis
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground leading-[1.35] tracking-tight">
              Find Out If You're Overpaying
            </h1>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Upload your payment processing statement. We'll break down every fee you're being charged and show you exactly what alternative providers would cost for the same transactions.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                Takes under 2 minutes
              </span>
              <span className="hidden sm:inline text-border">•</span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                100% free, no obligation
              </span>
              <span className="hidden sm:inline text-border">•</span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                Results emailed instantly
              </span>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="border-t border-border">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-20 md:py-28">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-14">
              How It Works
            </h2>
            <div className="space-y-0">
              {steps.map((step, i) => (
                <div
                  key={step.number}
                  className={`grid md:grid-cols-[80px_1fr] gap-4 md:gap-8 py-8 ${
                    i < steps.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <span className="text-2xl font-bold text-primary/30 tracking-tight">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-1.5">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Upload Form */}
        <section className="border-t border-border bg-secondary/40">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-20 md:py-28">
            <div className="text-center mb-10">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">
                Upload Your Statement
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed max-w-lg mx-auto">
                Your file is private and only used to generate your analysis.
              </p>
            </div>

            {submitted ? (
              <Card className="border-2 border-primary/40 bg-primary/5 shadow-md">
                <CardContent className="p-8 md:p-12 text-center">
                  <div className="flex justify-center mb-6">
                    <CheckCircle2 className="w-16 h-16 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Your statement has been submitted!
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-md mx-auto mb-6">
                    We're analysing your fees now. You'll receive your personalised savings report at{" "}
                    <strong className="text-foreground">{submittedEmail}</strong>{" "}
                    within the next few minutes.
                  </p>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-primary font-medium hover:underline"
                  >
                    Submit Another
                  </button>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-2 border-primary/40 bg-primary/5 shadow-md">
                <CardContent className="p-6 md:p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* File Upload */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">
                        Statement file <span className="text-destructive">*</span>
                      </Label>
                      {file ? (
                        <div className="flex items-center justify-between gap-3 p-4 rounded-xl border-2 border-primary/30 bg-background">
                          <div className="flex items-center gap-3 min-w-0">
                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">
                                {file.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {(file.size / 1024).toFixed(1)} KB
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={handleRemoveFile}
                            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                            aria-label="Remove file"
                          >
                            <X className="w-4 h-4" />
                            <span className="hidden sm:inline">Remove</span>
                          </button>
                        </div>
                      ) : (
                        <div
                          onClick={handleBrowseClick}
                          onDrop={handleDrop}
                          onDragOver={(e) => e.preventDefault()}
                          onDragEnter={(e) => e.preventDefault()}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              handleBrowseClick();
                            }
                          }}
                          className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/60 hover:bg-background/50 transition-colors"
                        >
                          <div className="flex justify-center mb-3">
                            <Upload className="w-8 h-8 text-muted-foreground" />
                          </div>
                          <p className="text-sm font-medium text-foreground mb-1">
                            Drop your statement here or click to browse
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Excel files only (.xlsx, .xls). Maximum 5MB.
                          </p>
                        </div>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".xlsx,.xls"
                        className="hidden"
                        onChange={(e) =>
                          handleFileSelected(e.target.files?.[0] ?? null)
                        }
                      />
                      {fileError && (
                        <p className="text-sm text-destructive">{fileError}</p>
                      )}
                    </div>

                    {/* Current Provider */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="currentProvider"
                        className="text-sm font-medium text-foreground"
                      >
                        Who is your current provider?{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={currentProvider}
                        onValueChange={setCurrentProvider}
                      >
                        <SelectTrigger
                          id="currentProvider"
                          className="h-14 text-base px-4 rounded-xl border-border/60 focus:border-primary focus:ring-primary/20"
                        >
                          <SelectValue placeholder="Select your current provider" />
                        </SelectTrigger>
                        <SelectContent>
                          {providerOptions.map((provider) => (
                            <SelectItem key={provider} value={provider}>
                              {provider}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Full Name */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="fullName"
                        className="text-sm font-medium text-foreground"
                      >
                        Full name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="fullName"
                        type="text"
                        autoComplete="name"
                        placeholder="Your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="h-14 text-base px-4 rounded-xl border-border/60 focus:border-primary focus:ring-primary/20"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-sm font-medium text-foreground"
                      >
                        Email address <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-14 text-base px-4 rounded-xl border-border/60 focus:border-primary focus:ring-primary/20"
                      />
                      <p className="text-xs text-muted-foreground">
                        We'll send your analysis report to this email
                      </p>
                    </div>

                    {/* Submit Error */}
                    {submitError && (
                      <div className="p-4 rounded-xl border border-destructive/40 bg-destructive/5 text-sm text-destructive">
                        {submitError}
                      </div>
                    )}

                    {/* Submit */}
                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="hero"
                        size="xl"
                        disabled={!canSubmit}
                        className="w-full sm:w-auto"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Analysing...
                          </>
                        ) : (
                          "Analyse My Statement"
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        {/* Social Proof */}
        <section className="border-t border-border">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-20 md:py-28 text-center">
            <blockquote className="text-lg italic text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              "Most businesses we analyse are overpaying by 15-30% on payment processing fees without realising it."
            </blockquote>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="border-t border-border">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-24 md:py-32 text-center">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-3">
              Not ready to upload?
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto mb-10">
              Start with our free 2-minute assessment instead.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/assessment">
                Take the assessment <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default StatementAnalysis;
