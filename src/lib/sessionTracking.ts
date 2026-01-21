// Session storage management for enrichment tracking
// Keys and initialization functions extracted for clarity

import { getUtmParams } from "./deviceDetection";

/**
 * Session storage keys for tracking data
 */
export const STORAGE_KEYS = {
  FIRST_VISIT: "cp_firstVisitTimestamp",
  QUIZ_START: "cp_quizStartTimestamp",
  LANDING_PAGE: "cp_landingPageUrl",
  UTM_PARAMS: "cp_utmParams",
  JS_ERRORS: "cp_jsErrors",
  QUIZ_DROPOFFS: "cp_quizDropOffPoints",
} as const;

/**
 * Initialize session tracking on first page load.
 * Sets up first visit timestamp, landing page URL, UTM params, and error listener.
 */
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
  window.addEventListener("error", (event) => {
    const errors = JSON.parse(sessionStorage.getItem(STORAGE_KEYS.JS_ERRORS) || "[]");
    const errorMsg = `${event.message} at ${event.filename}:${event.lineno}`;
    if (errors.length < 10 && !errors.includes(errorMsg)) {
      errors.push(errorMsg);
      sessionStorage.setItem(STORAGE_KEYS.JS_ERRORS, JSON.stringify(errors));
    }
  });
};

/**
 * Mark the start of the quiz for timing calculations
 */
export const markQuizStart = () => {
  if (!sessionStorage.getItem(STORAGE_KEYS.QUIZ_START)) {
    sessionStorage.setItem(STORAGE_KEYS.QUIZ_START, new Date().toISOString());
  }
};

/**
 * Track a quiz drop-off point for analytics
 */
export const trackQuizDropOff = (questionId: string) => {
  const dropoffs = JSON.parse(sessionStorage.getItem(STORAGE_KEYS.QUIZ_DROPOFFS) || "[]");
  if (!dropoffs.includes(questionId)) {
    dropoffs.push(questionId);
    sessionStorage.setItem(STORAGE_KEYS.QUIZ_DROPOFFS, JSON.stringify(dropoffs));
  }
};

/**
 * Get stored session timing data
 */
export const getSessionTimingData = () => {
  const firstVisit = sessionStorage.getItem(STORAGE_KEYS.FIRST_VISIT);
  const quizStart = sessionStorage.getItem(STORAGE_KEYS.QUIZ_START);
  const now = Date.now();
  
  return {
    sessionDuration: firstVisit 
      ? Math.round((now - new Date(firstVisit).getTime()) / 1000) 
      : 0,
    timeToCompleteQuiz: quizStart 
      ? Math.round((now - new Date(quizStart).getTime()) / 1000) 
      : 0,
  };
};

/**
 * Get stored UTM params from session
 */
export const getStoredUtmParams = () => {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEYS.UTM_PARAMS) || "{}");
  } catch {
    return {};
  }
};

/**
 * Get stored JS errors from session
 */
export const getStoredJsErrors = (): string[] => {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEYS.JS_ERRORS) || "[]");
  } catch {
    return [];
  }
};

/**
 * Get stored quiz drop-off points
 */
export const getStoredQuizDropoffs = (): string[] => {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEYS.QUIZ_DROPOFFS) || "[]");
  } catch {
    return [];
  }
};
