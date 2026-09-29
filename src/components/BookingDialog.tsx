'use client'

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Loader2, X } from "lucide-react";
import { BOOKING_URL, BOOKING_EMBED_URL } from "@/lib/booking";
import { trackEvent } from "@/lib/analytics";

/**
 * Opens the Google booking calendar in an on-site panel instead of a new tab.
 *
 * Every "Book a call" CTA links to BOOKING_URL, so rather than wiring each one
 * up, a capture-phase listener catches plain left-clicks on those links.
 * Cmd/Ctrl/Shift/middle clicks fall through to the browser and still open the
 * booking page in a new tab.
 */
const BookingDialog = () => {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.("a");
      if (link?.getAttribute("href") !== BOOKING_URL || link.hasAttribute("data-booking-fallback")) return;
      e.preventDefault();
      setLoaded(false);
      setOpen(true);
      trackEvent("booking_open", { page_path: window.location.pathname });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Close on route change (e.g. a link inside the page behind the overlay).
  useEffect(() => setOpen(false), [pathname]);

  // The Crisp chat bubble sits above everything (near-max z-index) and would
  // cover the panel's footer on mobile, so hide it while the panel is open.
  useEffect(() => {
    if (!open) return;
    const crisp = (window as unknown as { $crisp?: unknown[][] }).$crisp;
    crisp?.push(["do", "chat:hide"]);
    return () => {
      crisp?.push(["do", "chat:show"]);
    };
  }, [open]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Portal>
        {/* Above the fixed site header (z-index 100). */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className="fixed left-1/2 top-1/2 z-[1001] flex h-[100dvh] w-full -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden bg-white shadow-2xl focus:outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:h-[min(860px,92vh)] sm:max-w-[1000px] sm:rounded-2xl sm:border"
          style={{ fontFamily: "var(--cp-font-body)", borderColor: "var(--cp-border)" }}
        >
          <div className="border-b px-5 py-4 pr-14 sm:px-6" style={{ borderColor: "var(--cp-border)" }}>
            <DialogPrimitive.Title
              className="text-lg font-semibold"
              style={{ fontFamily: "var(--cp-font-display)", color: "var(--cp-text)" }}
            >
              Book a free 15-minute call
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className="mt-1 text-sm" style={{ color: "var(--cp-text-2)" }}>
              No sales pitch. We&apos;ll look at your business type and what you&apos;re really paying.
            </DialogPrimitive.Description>
          </div>

          <div className="relative flex-1">
            {!loaded && (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-sm"
                style={{ color: "var(--cp-text-3)" }}
              >
                <Loader2 className="h-6 w-6 animate-spin" style={{ color: "var(--cp-sage-bright)" }} />
                Loading available times…
              </div>
            )}
            <iframe
              src={BOOKING_EMBED_URL}
              title="Book a call with ChosePayments"
              onLoad={() => setLoaded(true)}
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>

          <div className="border-t px-5 py-2.5 text-xs sm:px-6" style={{ borderColor: "var(--cp-border)", color: "var(--cp-text-3)" }}>
            Calendar not loading?{" "}
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-booking-fallback className="underline hover:no-underline">
              Open the booking page
            </a>
          </div>

          <DialogPrimitive.Close
            className="absolute right-3 top-3 rounded-full p-2 opacity-70 transition hover:bg-black/5 hover:opacity-100 focus:outline-none focus-visible:ring-2"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default BookingDialog;
