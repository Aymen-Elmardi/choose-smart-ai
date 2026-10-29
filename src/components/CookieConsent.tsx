'use client'

import { useEffect, useState } from "react";
import Link from "next/link";

// Consent for Goji (Gojiberry website visitors). The snippet in app/layout.tsx
// loads wv.js with Goji's consent stub, so nothing is tracked until
// GojiberryVisitors.init() runs here. GA4 and Clarity are not gated (yet).
const STORAGE_KEY = "cp_consent";
const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;
export const OPEN_COOKIE_SETTINGS = "cp:open-cookie-settings";

type Choice = "accepted" | "rejected";

declare global {
  interface Window {
    GojiberryVisitors?: { init: () => void; initCalled?: boolean };
  }
}

const readChoice = (): Choice | null => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!saved || Date.now() - saved.at > MAX_AGE_MS) return null;
    return saved.value === "accepted" || saved.value === "rejected" ? saved.value : null;
  } catch {
    return null;
  }
};

const saveChoice = (value: Choice) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ value, at: Date.now() }));
  } catch {
    // Storage blocked: the choice holds for this page only.
  }
};

// Goji replaces the stub's init() when wv.js loads; calling either one is safe.
const startGoji = () => {
  if (!window.GojiberryVisitors?.initCalled) window.GojiberryVisitors?.init();
};

const CookieConsent = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const choice = readChoice();
    if (choice === "accepted") startGoji();
    if (!choice) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS, reopen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, reopen);
  }, []);

  if (!open) return null;

  const choose = (value: Choice) => {
    saveChoice(value);
    setOpen(false);
    if (value === "accepted") startGoji();
    // Rejecting after an earlier accept takes effect from the next page load.
  };

  return (
    <div className="cp-consent" role="region" aria-label="Cookie consent">
      <p>
        We&apos;d like to use optional cookies to understand which businesses visit our site. They&apos;re only set if you accept.{" "}
        <Link href="/privacy#cookies">Privacy Policy</Link>
      </p>
      <div className="cp-consent-actions">
        <button type="button" className="cp-btn cp-btn-ghost" onClick={() => choose("rejected")}>
          Reject
        </button>
        <button type="button" className="cp-btn cp-btn-primary" onClick={() => choose("accepted")}>
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
