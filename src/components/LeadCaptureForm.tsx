import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEnrichmentData, EnrichmentData } from "@/hooks/useEnrichmentData";

interface QuizAnswers {
  salesChannel: string;
  businessType: string;
  priorities: string[];
  location: string;
  monthlyVolume: string;
  avgTransaction: string;
  features: string[];
  // Additional fields from quiz
  industry?: string;
  contactTime?: string;
  terminalType?: string;
  // NEW: Risk-critical fields
  riskProfile?: string;
  deliveryTimeline?: string;
}

export interface LeadFormData {
  // Visible fields
  fullName: string;
  email: string;
  phone: string;
  businessWebsite: string;
  businessName: string;
  // Hidden fields from quiz (11 answers total)
  businessType: string;
  monthlyVolume: string;
  avgTransaction: string;
  region: string;
  salesChannel: string;
  recurringBilling: string;
  international: string;
  priorities: string[];
  industry: string;
  contactTime: string;
  terminalType: string;
  // NEW: Risk-critical fields
  riskProfile: string;
  deliveryTimeline: string;
  // Recommendation context
  recommendedProvider: string;
  logicPath: string;
  matchScore: number;
  matchDrivers: string[];
  alternativeProviders: string[];
  // Report reference
  reportUrl: string;
  // Enrichment data (hidden)
  enrichment: EnrichmentData | null;
}

interface LeadCaptureFormProps {
  quizAnswers: QuizAnswers | null;
  recommendedProvider: string | null;
  recommendationReasons?: string[];
  logicPath?: string;
  matchScore?: number;
  alternativeProviders?: string[];
}

export interface LeadCaptureFormRef {
  getFormData: () => LeadFormData;
  validate: () => { isValid: boolean; errors: string[] };
  setReportUrl: (url: string) => void;
}

const LeadCaptureForm = forwardRef<LeadCaptureFormRef, LeadCaptureFormProps>(
  ({ quizAnswers, recommendedProvider, recommendationReasons, logicPath = "standard", matchScore = 0, alternativeProviders = [] }, ref) => {
    const { enrichmentData, updateFormSignals, refreshTimingData } = useEnrichmentData();
    
    const [formData, setFormData] = useState<LeadFormData>({
      fullName: "",
      email: "",
      phone: "",
      businessWebsite: "",
      businessName: "",
      // Hidden fields - derive recurring/international from features array
      businessType: quizAnswers?.businessType || "",
      monthlyVolume: quizAnswers?.monthlyVolume || "",
      avgTransaction: quizAnswers?.avgTransaction || "",
      region: quizAnswers?.location || "",
      salesChannel: quizAnswers?.salesChannel || "",
      recurringBilling: quizAnswers?.features?.includes("Subscriptions / recurring billing") ? "Yes" : "No",
      international: quizAnswers?.features?.includes("International customers") ? "Yes" : "No",
      priorities: quizAnswers?.priorities || [],
      industry: quizAnswers?.industry || "",
      contactTime: quizAnswers?.contactTime || "",
      terminalType: quizAnswers?.terminalType || "",
      // NEW: Risk-critical fields
      riskProfile: quizAnswers?.riskProfile || "",
      deliveryTimeline: quizAnswers?.deliveryTimeline || "",
      // Recommendation context
      recommendedProvider: recommendedProvider || "",
      logicPath: logicPath,
      matchScore: matchScore,
      matchDrivers: recommendationReasons || [],
      alternativeProviders: alternativeProviders,
      // Report reference
      reportUrl: "",
      // Enrichment data
      enrichment: null,
    });

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const websiteRef = useRef<HTMLInputElement>(null);
    const businessNameRef = useRef<HTMLInputElement>(null);

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      getFormData: () => ({
        ...formData,
        enrichment: enrichmentData,
      }),
      validate: () => {
        const errors: string[] = [];
        if (!formData.fullName.trim()) errors.push("Full name is required");
        if (!formData.email.trim()) errors.push("Email is required");
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          errors.push("Please enter a valid email address");
        }
        return { isValid: errors.length === 0, errors };
      },
      setReportUrl: (url: string) => {
        setFormData(prev => ({ ...prev, reportUrl: url }));
      },
    }));

    // NOTE: No auto-focus on page load (prevents scroll jumps + mobile keyboard opening).
    // Fields only receive focus when the user taps/clicks them.

    // Update hidden fields when quiz answers change
    useEffect(() => {
      if (quizAnswers) {
        setFormData(prev => ({
          ...prev,
          businessType: quizAnswers.businessType,
          monthlyVolume: quizAnswers.monthlyVolume,
          avgTransaction: quizAnswers.avgTransaction,
          region: quizAnswers.location,
          salesChannel: quizAnswers.salesChannel,
          recurringBilling: quizAnswers.features?.includes("Subscriptions / recurring billing") ? "Yes" : "No",
          international: quizAnswers.features?.includes("International customers") ? "Yes" : "No",
          priorities: quizAnswers.priorities,
          industry: quizAnswers.industry || "",
          contactTime: quizAnswers.contactTime || "",
          terminalType: quizAnswers.terminalType || "",
          riskProfile: quizAnswers.riskProfile || "",
          deliveryTimeline: quizAnswers.deliveryTimeline || "",
          recommendedProvider: recommendedProvider || "",
          logicPath: logicPath,
          matchScore: matchScore,
          matchDrivers: recommendationReasons || [],
          alternativeProviders: alternativeProviders,
        }));
      }
    }, [quizAnswers, recommendedProvider, logicPath, matchScore, recommendationReasons, alternativeProviders]);

    // Update enrichment data continuously
    useEffect(() => {
      refreshTimingData();
      setFormData(prev => ({
        ...prev,
        enrichment: enrichmentData,
      }));
    }, [enrichmentData, refreshTimingData]);

    // Update form behavior signals when optional fields change
    useEffect(() => {
      updateFormSignals(formData.phone, formData.businessWebsite, formData.businessName);
    }, [formData.phone, formData.businessWebsite, formData.businessName, updateFormSignals]);

    // Extract business name from website URL
    const extractBusinessName = (url: string): string => {
      try {
        const cleanUrl = url.startsWith("http") ? url : `https://${url}`;
        const hostname = new URL(cleanUrl).hostname;
        const domain = hostname.replace(/^www\./, "").split(".")[0];
        return domain.charAt(0).toUpperCase() + domain.slice(1);
      } catch {
        return "";
      }
    };

    const handleInputChange = (field: keyof LeadFormData, value: string) => {
      setFormData(prev => {
        const updated = { ...prev, [field]: value };
        
        // Auto-fill business name from website if business name is empty
        if (field === "businessWebsite" && value && !prev.businessName) {
          const extractedName = extractBusinessName(value);
          if (extractedName) {
            updated.businessName = extractedName;
          }
        }
        
        return updated;
      });
    };

    const handleKeyDown = (
      e: React.KeyboardEvent<HTMLInputElement>,
      nextRef: React.RefObject<HTMLInputElement> | null
    ) => {
      if (e.key === "Enter" && nextRef?.current) {
        e.preventDefault();
        nextRef.current.focus();
      }
    };

    return (
      <TooltipProvider>
        <div className="space-y-5">
          {/* Full Name - Required */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm font-medium text-foreground">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              ref={nameRef}
              id="fullName"
              type="text"
              inputMode="text"
              autoComplete="name"
              placeholder="Your full name"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, emailRef)}
              className="h-14 text-base px-4 rounded-xl border-border/60 focus:border-primary focus:ring-primary/20"
              required
            />
          </div>

          {/* Email - Required */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-foreground">
              Email Address <span className="text-destructive">*</span>
            </Label>
            <Input
              ref={emailRef}
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="yourname@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, phoneRef)}
              className="h-14 text-base px-4 rounded-xl border-border/60 focus:border-primary focus:ring-primary/20"
              required
            />
          </div>

          {/* Phone - Optional with Tooltip */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                Phone Number
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button type="button" className="text-muted-foreground hover:text-foreground transition-colors">
                    <HelpCircle className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[280px] text-sm">
                  <p>Adding your phone number helps the recommended provider contact you faster, but it's completely optional. We only share your details with the provider matched to your quiz results.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              ref={phoneRef}
              id="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+44 7XXX XXXXXX"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, websiteRef)}
              className="h-14 text-base px-4 rounded-xl border-border/60 focus:border-primary focus:ring-primary/20"
            />
            <p className="text-xs text-muted-foreground">
              Optional, but improves support response time.
            </p>
          </div>

          {/* Business Website - Optional */}
          <div className="space-y-2">
            <Label htmlFor="businessWebsite" className="text-sm font-medium text-foreground">
              Business Website
            </Label>
            <Input
              ref={websiteRef}
              id="businessWebsite"
              type="url"
              inputMode="url"
              autoComplete="url"
              placeholder="https://yourbusiness.com"
              value={formData.businessWebsite}
              onChange={(e) => handleInputChange("businessWebsite", e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, businessNameRef)}
              className="h-14 text-base px-4 rounded-xl border-border/60 focus:border-primary focus:ring-primary/20"
            />
          </div>

          {/* Business Name - Optional */}
          <div className="space-y-2">
            <Label htmlFor="businessName" className="text-sm font-medium text-foreground">
              Business Name
            </Label>
            <Input
              ref={businessNameRef}
              id="businessName"
              type="text"
              inputMode="text"
              autoComplete="organization"
              placeholder="Your business name"
              value={formData.businessName}
              onChange={(e) => handleInputChange("businessName", e.target.value)}
              className="h-14 text-base px-4 rounded-xl border-border/60 focus:border-primary focus:ring-primary/20"
            />
          </div>
        </div>
      </TooltipProvider>
    );
  }
);

LeadCaptureForm.displayName = "LeadCaptureForm";

export default LeadCaptureForm;
