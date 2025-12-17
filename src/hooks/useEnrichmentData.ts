import { useEffect, useState, useCallback } from "react";

// ============= TYPE DEFINITIONS =============

export interface EnrichmentData {
  // 1. Browser + Device Information
  deviceType: "mobile" | "tablet" | "desktop" | "unknown";
  operatingSystem: string;
  browserName: string;
  screenResolution: string;

  // 2. IP-Based Location
  geoCountry: string;
  geoRegion: string;
  geoCity: string;

  // 3. Traffic Source + Session Info
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
  landingPageUrl: string;
  firstVisitTimestamp: string;
  sessionDuration: number;

  // 4. Quiz Behavior Metrics
  timeToCompleteQuiz: number;
  quizDropOffPoints: string[];
  scrollDepthBeforeForm: number;
  viewedRecommendationCard: boolean;

  // 5. Form Behavior Signals
  optionalPhoneProvided: boolean;
  optionalBusinessWebsiteProvided: boolean;
  optionalBusinessNameProvided: boolean;
  skippedOptionalFields: boolean;

  // 6. Technical Diagnostics
  networkSpeedEstimate: "slow" | "average" | "fast" | "unknown";
  jsErrors: string[];
  devicePixelRatio: number;
}

// ============= UTILITY FUNCTIONS =============

const getDeviceType = (): EnrichmentData["deviceType"] => {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) return "mobile";
  return "desktop";
};

const getOperatingSystem = (): string => {
  const ua = navigator.userAgent;
  if (ua.includes("Win")) return "Windows";
  if (ua.includes("Mac")) return "macOS";
  if (ua.includes("Linux")) return "Linux";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
  return "Unknown";
};

const getBrowserName = (): string => {
  const ua = navigator.userAgent;
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("SamsungBrowser")) return "Samsung Browser";
  if (ua.includes("Opera") || ua.includes("OPR")) return "Opera";
  if (ua.includes("Edge")) return "Edge";
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Safari")) return "Safari";
  return "Unknown";
};

const getScreenResolution = (): string => {
  return `${window.screen.width}x${window.screen.height}`;
};

const getUtmParams = (): Pick<EnrichmentData, "utmSource" | "utmMedium" | "utmCampaign" | "utmTerm" | "utmContent"> => {
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get("utm_source") || "",
    utmMedium: params.get("utm_medium") || "",
    utmCampaign: params.get("utm_campaign") || "",
    utmTerm: params.get("utm_term") || "",
    utmContent: params.get("utm_content") || "",
  };
};

const getNetworkSpeed = (): EnrichmentData["networkSpeedEstimate"] => {
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  if (!connection) return "unknown";
  
  const effectiveType = connection.effectiveType;
  if (effectiveType === "4g") return "fast";
  if (effectiveType === "3g") return "average";
  return "slow";
};

const fetchGeoLocation = async (): Promise<{ geoCountry: string; geoRegion: string; geoCity: string }> => {
  try {
    // Using ipapi.co free tier (1000 requests/day)
    const response = await fetch("https://ipapi.co/json/", { 
      signal: AbortSignal.timeout(3000) // 3 second timeout
    });
    if (!response.ok) throw new Error("Geo lookup failed");
    const data = await response.json();
    return {
      geoCountry: data.country_name || "",
      geoRegion: data.region || "",
      geoCity: data.city || "",
    };
  } catch {
    return { geoCountry: "", geoRegion: "", geoCity: "" };
  }
};

// ============= SESSION STORAGE KEYS =============

const STORAGE_KEYS = {
  FIRST_VISIT: "cp_firstVisitTimestamp",
  QUIZ_START: "cp_quizStartTimestamp",
  LANDING_PAGE: "cp_landingPageUrl",
  UTM_PARAMS: "cp_utmParams",
  JS_ERRORS: "cp_jsErrors",
  QUIZ_DROPOFFS: "cp_quizDropOffPoints",
};

// ============= INITIALIZE SESSION TRACKING =============

export const initializeSessionTracking = () => {
  // First visit timestamp
  if (!sessionStorage.getItem(STORAGE_KEYS.FIRST_VISIT)) {
    sessionStorage.setItem(STORAGE_KEYS.FIRST_VISIT, new Date().toISOString());
  }

  // Landing page URL (only set on first page)
  if (!sessionStorage.getItem(STORAGE_KEYS.LANDING_PAGE)) {
    sessionStorage.setItem(STORAGE_KEYS.LANDING_PAGE, window.location.href);
  }

  // Store UTM params if present
  const utmParams = getUtmParams();
  if (utmParams.utmSource || utmParams.utmMedium || utmParams.utmCampaign) {
    sessionStorage.setItem(STORAGE_KEYS.UTM_PARAMS, JSON.stringify(utmParams));
  }

  // Global error listener
  const existingErrors = JSON.parse(sessionStorage.getItem(STORAGE_KEYS.JS_ERRORS) || "[]");
  window.addEventListener("error", (event) => {
    const errors = JSON.parse(sessionStorage.getItem(STORAGE_KEYS.JS_ERRORS) || "[]");
    const errorMsg = `${event.message} at ${event.filename}:${event.lineno}`;
    if (errors.length < 10 && !errors.includes(errorMsg)) {
      errors.push(errorMsg);
      sessionStorage.setItem(STORAGE_KEYS.JS_ERRORS, JSON.stringify(errors));
    }
  });
};

export const markQuizStart = () => {
  if (!sessionStorage.getItem(STORAGE_KEYS.QUIZ_START)) {
    sessionStorage.setItem(STORAGE_KEYS.QUIZ_START, new Date().toISOString());
  }
};

export const trackQuizDropOff = (questionId: string) => {
  const dropoffs = JSON.parse(sessionStorage.getItem(STORAGE_KEYS.QUIZ_DROPOFFS) || "[]");
  if (!dropoffs.includes(questionId)) {
    dropoffs.push(questionId);
    sessionStorage.setItem(STORAGE_KEYS.QUIZ_DROPOFFS, JSON.stringify(dropoffs));
  }
};

// ============= MAIN HOOK =============

export const useEnrichmentData = () => {
  const [enrichmentData, setEnrichmentData] = useState<EnrichmentData>(() => ({
    // Device info (sync)
    deviceType: getDeviceType(),
    operatingSystem: getOperatingSystem(),
    browserName: getBrowserName(),
    screenResolution: getScreenResolution(),
    
    // Geo (will be fetched)
    geoCountry: "",
    geoRegion: "",
    geoCity: "",
    
    // Traffic source
    referrer: document.referrer || "direct",
    ...getUtmParams(),
    ...(JSON.parse(sessionStorage.getItem(STORAGE_KEYS.UTM_PARAMS) || "{}") as Partial<EnrichmentData>),
    landingPageUrl: sessionStorage.getItem(STORAGE_KEYS.LANDING_PAGE) || window.location.href,
    firstVisitTimestamp: sessionStorage.getItem(STORAGE_KEYS.FIRST_VISIT) || new Date().toISOString(),
    sessionDuration: 0,
    
    // Quiz behavior
    timeToCompleteQuiz: 0,
    quizDropOffPoints: JSON.parse(sessionStorage.getItem(STORAGE_KEYS.QUIZ_DROPOFFS) || "[]"),
    scrollDepthBeforeForm: 0,
    viewedRecommendationCard: true, // They're on the recommendation page
    
    // Form behavior (will be updated)
    optionalPhoneProvided: false,
    optionalBusinessWebsiteProvided: false,
    optionalBusinessNameProvided: false,
    skippedOptionalFields: true,
    
    // Technical
    networkSpeedEstimate: getNetworkSpeed(),
    jsErrors: JSON.parse(sessionStorage.getItem(STORAGE_KEYS.JS_ERRORS) || "[]"),
    devicePixelRatio: window.devicePixelRatio || 1,
  }));

  // Fetch geo data on mount
  useEffect(() => {
    fetchGeoLocation().then((geo) => {
      setEnrichmentData((prev) => ({ ...prev, ...geo }));
    });
  }, []);

  // Calculate session and quiz duration
  useEffect(() => {
    const firstVisit = sessionStorage.getItem(STORAGE_KEYS.FIRST_VISIT);
    const quizStart = sessionStorage.getItem(STORAGE_KEYS.QUIZ_START);
    
    const now = Date.now();
    const sessionDuration = firstVisit 
      ? Math.round((now - new Date(firstVisit).getTime()) / 1000) 
      : 0;
    const timeToCompleteQuiz = quizStart 
      ? Math.round((now - new Date(quizStart).getTime()) / 1000) 
      : 0;

    setEnrichmentData((prev) => ({
      ...prev,
      sessionDuration,
      timeToCompleteQuiz,
    }));
  }, []);

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      
      setEnrichmentData((prev) => ({
        ...prev,
        scrollDepthBeforeForm: Math.max(prev.scrollDepthBeforeForm, scrollPercent),
      }));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update form behavior signals
  const updateFormSignals = useCallback((phone: string, website: string, businessName: string) => {
    const optionalPhoneProvided = phone.trim().length > 0;
    const optionalBusinessWebsiteProvided = website.trim().length > 0;
    const optionalBusinessNameProvided = businessName.trim().length > 0;
    const skippedOptionalFields = !optionalPhoneProvided && !optionalBusinessWebsiteProvided && !optionalBusinessNameProvided;

    setEnrichmentData((prev) => ({
      ...prev,
      optionalPhoneProvided,
      optionalBusinessWebsiteProvided,
      optionalBusinessNameProvided,
      skippedOptionalFields,
    }));
  }, []);

  // Refresh timing data (call before form submission)
  const refreshTimingData = useCallback(() => {
    const firstVisit = sessionStorage.getItem(STORAGE_KEYS.FIRST_VISIT);
    const quizStart = sessionStorage.getItem(STORAGE_KEYS.QUIZ_START);
    const now = Date.now();

    setEnrichmentData((prev) => ({
      ...prev,
      sessionDuration: firstVisit ? Math.round((now - new Date(firstVisit).getTime()) / 1000) : prev.sessionDuration,
      timeToCompleteQuiz: quizStart ? Math.round((now - new Date(quizStart).getTime()) / 1000) : prev.timeToCompleteQuiz,
      jsErrors: JSON.parse(sessionStorage.getItem(STORAGE_KEYS.JS_ERRORS) || "[]"),
    }));
  }, []);

  return {
    enrichmentData,
    updateFormSignals,
    refreshTimingData,
  };
};
