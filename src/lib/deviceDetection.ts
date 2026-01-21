// Device detection and browser utilities
// Extracted from useEnrichmentData for reusability

import type { EnrichmentData } from "@/types/quiz";

/**
 * Detect device type from user agent
 */
export const getDeviceType = (): EnrichmentData["deviceType"] => {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) return "mobile";
  return "desktop";
};

/**
 * Detect operating system from user agent
 */
export const getOperatingSystem = (): string => {
  const ua = navigator.userAgent;
  if (ua.includes("Win")) return "Windows";
  if (ua.includes("Mac")) return "macOS";
  if (ua.includes("Linux")) return "Linux";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
  return "Unknown";
};

/**
 * Detect browser name from user agent
 */
export const getBrowserName = (): string => {
  const ua = navigator.userAgent;
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("SamsungBrowser")) return "Samsung Browser";
  if (ua.includes("Opera") || ua.includes("OPR")) return "Opera";
  if (ua.includes("Edge")) return "Edge";
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Safari")) return "Safari";
  return "Unknown";
};

/**
 * Get screen resolution
 */
export const getScreenResolution = (): string => {
  return `${window.screen.width}x${window.screen.height}`;
};

/**
 * Parse UTM parameters from current URL
 */
export const getUtmParams = (): Pick<EnrichmentData, "utmSource" | "utmMedium" | "utmCampaign" | "utmTerm" | "utmContent"> => {
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get("utm_source") || "",
    utmMedium: params.get("utm_medium") || "",
    utmCampaign: params.get("utm_campaign") || "",
    utmTerm: params.get("utm_term") || "",
    utmContent: params.get("utm_content") || "",
  };
};

/**
 * Estimate network speed using Network Information API
 */
export const getNetworkSpeed = (): EnrichmentData["networkSpeedEstimate"] => {
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  if (!connection) return "unknown";
  
  const effectiveType = connection.effectiveType;
  if (effectiveType === "4g") return "fast";
  if (effectiveType === "3g") return "average";
  return "slow";
};

/**
 * Fetch geolocation data from IP lookup service
 */
export const fetchGeoLocation = async (): Promise<{ geoCountry: string; geoRegion: string; geoCity: string }> => {
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
