import { useEffect, useRef, useState } from "react";
import { HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

interface LeadFormData {
  // Visible fields
  fullName: string;
  email: string;
  phone: string;
  businessWebsite: string;
  businessName: string;
  // Hidden fields from quiz
  businessType: string;
  monthlyVolume: string;
  avgTransaction: string;
  region: string;
  salesChannel: string;
  recurringBilling: string;
  international: string;
  priorities: string[];
  recommendedProvider: string;
  logicPath: string;
}

interface LeadCaptureFormProps {
  quizAnswers: QuizAnswers | null;
  recommendedProvider: string | null;
  logicPath?: string;
}

const LeadCaptureForm = ({ quizAnswers, recommendedProvider, logicPath = "standard" }: LeadCaptureFormProps) => {
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: "",
    email: "",
    phone: "",
    businessWebsite: "",
    businessName: "",
    // Hidden fields
    businessType: quizAnswers?.businessType || "",
    monthlyVolume: quizAnswers?.monthlyVolume || "",
    avgTransaction: quizAnswers?.avgTransaction || "",
    region: quizAnswers?.location || "",
    salesChannel: quizAnswers?.salesChannel || "",
    recurringBilling: quizAnswers?.recurring || "",
    international: quizAnswers?.international || "",
    priorities: quizAnswers?.priorities || [],
    recommendedProvider: recommendedProvider || "",
    logicPath: logicPath,
  });

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const websiteRef = useRef<HTMLInputElement>(null);
  const businessNameRef = useRef<HTMLInputElement>(null);

  // Auto-focus name field on mount
  useEffect(() => {
    nameRef.current?.focus();
  }, []);

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
        recurringBilling: quizAnswers.recurring,
        international: quizAnswers.international,
        priorities: quizAnswers.priorities,
        recommendedProvider: recommendedProvider || "",
        logicPath: logicPath,
      }));
    }
  }, [quizAnswers, recommendedProvider, logicPath]);

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
};

export default LeadCaptureForm;
