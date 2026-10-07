'use client'

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";
import { recordPageView } from "@/lib/leadAttribution";

/**
 * Site-wide GA4 tracking for the two calls to action: "Write to us" (/contact)
 * and "Book a call" (the Google booking calendar).
 *
 * One delegated listener classifies a link by where it goes, so article CTAs
 * are counted without each one being wired up. `data-cta` overrides the type
 * and `data-placement` (inline, mid, end, header, footer) says where the CTA
 * sits; links without it fall back to header/footer from their surroundings,
 * or "body".
 *
 * Renders nothing.
 */

const isBookingUrl = (url: URL) =>
  url.hostname === "calendar.app.google" ||
  (url.hostname === "calendar.google.com" && url.pathname.startsWith("/calendar/appointments"));

const ctaType = (link: HTMLAnchorElement): "write" | "call" | null => {
  const declared = link.dataset.cta;
  if (declared === "write" || declared === "call") return declared;

  let url: URL;
  try {
    url = new URL(link.href);
  } catch {
    return null;
  }
  if (isBookingUrl(url)) return "call";
  if (url.host === window.location.host && url.pathname.replace(/\/$/, "") === "/contact") return "write";
  return null;
};

const placementOf = (link: HTMLAnchorElement) => {
  if (link.dataset.placement) return link.dataset.placement;
  if (link.closest("header")) return "header";
  if (link.closest("footer")) return "footer";
  return "body";
};

const CtaTracking = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) recordPageView(pathname);
  }, [pathname]);

  useEffect(() => {
    // Capture phase, and no defaultPrevented check: BookingDialog cancels the
    // click on booking links to open its panel instead, and that is still a
    // click on the CTA. Middle clicks arrive as auxclick.
    const onClick = (e: MouseEvent) => {
      if (e.type === "auxclick" && e.button !== 1) return;
      const link = (e.target as Element | null)?.closest?.("a");
      // The "Calendar not loading?" link inside the booking panel is a retry
      // of a click already counted.
      if (!link || link.hasAttribute("data-booking-fallback")) return;

      const type = ctaType(link);
      if (!type) return;

      const params = {
        cta_type: type,
        placement: placementOf(link),
        page_path: window.location.pathname,
        page_title: document.title,
      };
      trackEvent("cta_click", params);
      if (type === "call") trackEvent("calendar_click", params);
    };

    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("auxclick", onClick, true);
    };
  }, []);

  return null;
};

export default CtaTracking;
