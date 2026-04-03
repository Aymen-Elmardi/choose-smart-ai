'use client'
// Enrichment data hook - collects analytics data for lead quality scoring
import { useEffect, useState, useCallback } from "react";
import type { EnrichmentData } from "@/types/quiz";
import {
  getDeviceType,
  getOperatingSystem,
  getBrowserName,
  getScreenResolution,
  getUtmParams,
  getNetworkSpeed,
  fetchGeoLocation,
} from "@/lib/deviceDetection";
import {
  STORAGE_KEYS,
  getSessionTimingData,
  getStoredUtmParams,
  getStoredJsErrors,
  getStoredQuizDropoffs,
} from "@/lib/sessionTracking";

// Re-export session tracking functions for convenience
export { initializeSessionTracking, markQuizStart, trackQuizDropOff } from "@/lib/sessionTracking";
export type { EnrichmentData } from "@/types/quiz";

/**
 * Hook to collect and manage enrichment data during the user session.
 * Provides form signals update and timing refresh capabilities.
 */
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
    ...getStoredUtmParams(),
    landingPageUrl: sessionStorage.getItem(STORAGE_KEYS.LANDING_PAGE) || window.location.href,
    firstVisitTimestamp: sessionStorage.getItem(STORAGE_KEYS.FIRST_VISIT) || new Date().toISOString(),
    sessionDuration: 0,
    
    // Quiz behavior
    timeToCompleteQuiz: 0,
    quizDropOffPoints: getStoredQuizDropoffs(),
    scrollDepthBeforeForm: 0,
    viewedRecommendationCard: true, // They're on the recommendation page
    
    // Form behavior (will be updated)
    optionalPhoneProvided: false,
    optionalBusinessWebsiteProvided: false,
    optionalBusinessNameProvided: false,
    skippedOptionalFields: true,
    
    // Technical
    networkSpeedEstimate: getNetworkSpeed(),
    jsErrors: getStoredJsErrors(),
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
    const timing = getSessionTimingData();
    setEnrichmentData((prev) => ({
      ...prev,
      sessionDuration: timing.sessionDuration,
      timeToCompleteQuiz: timing.timeToCompleteQuiz,
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
    const timing = getSessionTimingData();
    setEnrichmentData((prev) => ({
      ...prev,
      sessionDuration: timing.sessionDuration,
      timeToCompleteQuiz: timing.timeToCompleteQuiz,
      jsErrors: getStoredJsErrors(),
    }));
  }, []);

  return {
    enrichmentData,
    updateFormSignals,
    refreshTimingData,
  };
};
