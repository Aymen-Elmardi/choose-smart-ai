// Canonical type definitions for the quiz and recommendation system
// This is the single source of truth - import from here everywhere

/**
 * Core quiz answers collected from the user during the assessment.
 * Used by both client-side and server-side recommendation logic.
 */
export interface QuizAnswers {
  // Core engine fields
  salesChannel: string;
  businessType: string;
  priorities: string[];
  location: string;
  monthlyVolume: string;
  avgTransaction: string;
  features: string[];
  
  // Derived flags for engine (set based on salesChannel)
  needsOnline?: boolean;
  needsInPerson?: boolean;
  needsMarketplace?: boolean;
  terminalType?: string;
  
  // Extended fields for lead capture context
  industry?: string;
  deliveryTimeline?: string;
  buyingIntent?: string;
  contactTime?: string;
  previousRestriction?: string;
}

/**
 * Initial empty state for QuizAnswers
 */
export const INITIAL_QUIZ_ANSWERS: QuizAnswers = {
  salesChannel: "",
  businessType: "",
  priorities: [],
  location: "",
  monthlyVolume: "",
  avgTransaction: "",
  features: [],
  needsOnline: false,
  needsInPerson: false,
  needsMarketplace: false,
  terminalType: "",
  industry: "",
  deliveryTimeline: "",
  buyingIntent: "",
  contactTime: "",
  previousRestriction: "",
};

/**
 * Recommended payment provider returned by the recommendation engine
 */
export interface Provider {
  name: string;
  description: string;
  reasons: string[];
  matchScore?: number;
}

/**
 * Market identifier for UK/US recommendation logic
 */
export type Market = "UK" | "US";

/**
 * Complete lead form data including visible fields, hidden quiz data, and enrichment
 */
export interface LeadFormData {
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
  
  // Enrichment data (hidden)
  enrichment: EnrichmentData | null;
}

/**
 * Enrichment data collected during the user session for lead quality scoring
 */
export interface EnrichmentData {
  // Browser + Device Information
  deviceType: "mobile" | "tablet" | "desktop" | "unknown";
  operatingSystem: string;
  browserName: string;
  screenResolution: string;

  // IP-Based Location
  geoCountry: string;
  geoRegion: string;
  geoCity: string;

  // Traffic Source + Session Info
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
  landingPageUrl: string;
  firstVisitTimestamp: string;
  sessionDuration: number;

  // Quiz Behavior Metrics
  timeToCompleteQuiz: number;
  quizDropOffPoints: string[];
  scrollDepthBeforeForm: number;
  viewedRecommendationCard: boolean;

  // Form Behavior Signals
  optionalPhoneProvided: boolean;
  optionalBusinessWebsiteProvided: boolean;
  optionalBusinessNameProvided: boolean;
  skippedOptionalFields: boolean;

  // Technical Diagnostics
  networkSpeedEstimate: "slow" | "average" | "fast" | "unknown";
  jsErrors: string[];
  devicePixelRatio: number;
}

/**
 * Question definition for the quiz flow
 */
export interface Question {
  id: string;
  question: string;
  subtext?: string;
  options?: string[];
  multiSelect?: boolean;
  maxSelect?: number;
  type?: "dropdown";
  dropdownOptions?: { label: string; value: string }[];
}

/**
 * Micro-insight configuration for contextual tips
 */
export interface MicroInsightConfig {
  questionId: string;
  triggerAnswer: string;
  text: string;
}
