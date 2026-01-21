// Shared utilities barrel export for edge functions

// Shared utilities barrel export for edge functions
// Re-export all utilities inline to avoid module resolution issues

// ============================================================================
// CORS UTILITIES
// ============================================================================

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

export const handleCorsOptions = (): Response => {
  return new Response(null, { headers: corsHeaders });
};

export const jsonResponse = (data: unknown, status: number = 200): Response => {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
};

export const successResponse = (data: Record<string, unknown> = {}): Response => {
  return jsonResponse({ success: true, ...data }, 200);
};

export const errorResponse = (error: string, status: number = 400): Response => {
  return jsonResponse({ success: false, error }, status);
};

// ============================================================================
// RATE LIMITING
// ============================================================================

interface RateLimitRecord {
  count: number;
  timestamp: number;
}

const ipRateLimitStore = new Map<string, RateLimitRecord>();
const emailRateLimitStore = new Map<string, RateLimitRecord>();

const DEFAULT_IP_WINDOW_MS = 60 * 1000;
const DEFAULT_IP_MAX_REQUESTS = 5;
const DEFAULT_EMAIL_WINDOW_MS = 60 * 60 * 1000;
const DEFAULT_EMAIL_MAX_REQUESTS = 3;
const MAX_STORE_SIZE = 1000;

export const getClientIp = (req: Request): string => {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
};

const cleanupStore = (store: Map<string, RateLimitRecord>, windowMs: number): void => {
  if (store.size <= MAX_STORE_SIZE) return;
  const now = Date.now();
  for (const [key, value] of store.entries()) {
    if (now - value.timestamp > windowMs) {
      store.delete(key);
    }
  }
};

const checkLimit = (
  key: string,
  store: Map<string, RateLimitRecord>,
  windowMs: number,
  maxRequests: number
): boolean => {
  const now = Date.now();
  const record = store.get(key);
  cleanupStore(store, windowMs);

  if (!record || now - record.timestamp > windowMs) {
    store.set(key, { count: 1, timestamp: now });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
};

export const checkIpRateLimit = (
  clientIp: string,
  maxRequests: number = DEFAULT_IP_MAX_REQUESTS,
  windowMs: number = DEFAULT_IP_WINDOW_MS
): boolean => {
  return checkLimit(clientIp, ipRateLimitStore, windowMs, maxRequests);
};

export const checkEmailRateLimit = (
  email: string,
  maxRequests: number = DEFAULT_EMAIL_MAX_REQUESTS,
  windowMs: number = DEFAULT_EMAIL_WINDOW_MS
): boolean => {
  const normalizedEmail = email.toLowerCase().trim();
  return checkLimit(normalizedEmail, emailRateLimitStore, windowMs, maxRequests);
};

// ============================================================================
// SANITIZATION
// ============================================================================

export const escapeHtml = (str: string): string => {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/\n/g, " ")
    .replace(/\r/g, "");
};

export const sanitizeString = (value: unknown, maxLength: number = 500): string => {
  if (value === null || value === undefined || value === "") return "";
  const str = String(value).trim().slice(0, maxLength);
  return str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254 && email.length >= 5;
};

export const formatValue = (value: unknown): string => {
  if (value === null || value === undefined || value === "") return "Not provided";
  if (Array.isArray(value)) {
    if (value.length === 0) return "None";
    return value.map((v) => escapeHtml(sanitizeString(v, 200))).join(", ");
  }
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "number") return value.toString();
  return escapeHtml(sanitizeString(value, 500));
};

export const sanitizeArray = (
  arr: unknown,
  maxItems: number = 10,
  maxItemLength: number = 200
): string[] => {
  if (!Array.isArray(arr)) return [];
  return arr.slice(0, maxItems).map((item) => sanitizeString(item, maxItemLength));
};

export const isValidName = (name: string): boolean => {
  return name.length >= 2 && !/^[0-9]+$/.test(name);
};

export const extractFirstName = (fullName: string): string => {
  const trimmed = fullName.trim();
  const firstName = trimmed.split(/\s+/)[0];
  return firstName || trimmed;
};
