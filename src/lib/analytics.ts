// GA4 event tracking.
//
// The site loads gtag.js directly (app/layout.tsx), not Google Tag Manager.
// gtag.js only acts on `gtag(...)` calls: a GTM-style
// `dataLayer.push({ event: "..." })` sits in the dataLayer and is never sent,
// which is why the earlier assessment events never reached GA.

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Sends a GA4 event.
 *
 * The gtag-init script is loaded afterInteractive, so an event fired from a
 * mount effect can run before `window.gtag` exists. Those wait briefly for it
 * rather than being queued ahead of the `config` call, which would leave them
 * with no destination.
 */
export const trackEvent = (name: string, params: GtagParams = {}) => {
  if (typeof window === "undefined") return;

  let attempts = 0;
  const send = () => {
    if (typeof window.gtag === "function") {
      window.gtag("event", name, params);
    } else if (attempts++ < 50) {
      window.setTimeout(send, 200);
    }
  };
  send();
};
