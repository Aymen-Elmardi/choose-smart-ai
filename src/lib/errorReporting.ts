'use client'

import { supabase } from "@/integrations/supabase/client";

/**
 * Sends client-side failures to the report-error edge function.
 *
 * This runs when something has already gone wrong, so every path here is
 * defensive: nothing it does may throw, and nothing it does may block the page.
 * A reporter that crashes while reporting a crash is worse than no reporter.
 */

export type ErrorKind = "boundary" | "unhandled_rejection" | "window_error";

/** Stops a crash loop turning into a flood of identical reports. */
const seen = new Set<string>();
const MAX_PER_SESSION = 10;
let sent = 0;

/**
 * Coerces anything at all into a string without trusting it.
 *
 * A thrown value is not necessarily an Error, and is not necessarily coercible:
 * a Proxy whose traps return objects makes String(value) throw "Cannot convert
 * object to primitive value" — which is exactly the failure that took pages
 * down here before. Everything is wrapped.
 */
const describe = (value: unknown): { message: string; stack?: string } => {
  try {
    if (value instanceof Error) {
      return { message: value.message || value.name || "Error", stack: value.stack };
    }
    if (typeof value === "string") return { message: value };
    if (value && typeof value === "object") {
      const maybe = value as { message?: unknown; stack?: unknown };
      const message = typeof maybe.message === "string" ? maybe.message : null;
      const stack = typeof maybe.stack === "string" ? maybe.stack : undefined;
      if (message) return { message, stack };
      return { message: JSON.stringify(value).slice(0, 500) };
    }
    return { message: String(value) };
  } catch {
    // Coercion itself failed. Say so rather than losing the report.
    return { message: "Unserialisable thrown value" };
  }
};

export const reportError = (kind: ErrorKind, value: unknown): void => {
  try {
    if (typeof window === "undefined") return;
    if (sent >= MAX_PER_SESSION) return;

    const { message, stack } = describe(value);
    const key = `${kind}:${message}`;
    if (seen.has(key)) return;
    seen.add(key);
    sent += 1;

    // Path and query only. A full href can carry fragments or tokens, and the
    // path is what identifies the broken page.
    const url = `${window.location.pathname}${window.location.search}`;

    // Fire and forget. The caller is an error handler; it must not await this
    // and must never see it reject.
    void supabase.functions
      .invoke("report-error", {
        body: {
          kind,
          message,
          stack,
          url,
          release: process.env.NEXT_PUBLIC_BUILD_TIME ?? null,
        },
      })
      .then(() => undefined)
      .catch(() => undefined);
  } catch {
    /* reporting must never be the thing that breaks the page */
  }
};

/**
 * Registers handlers for failures no React error boundary can see: rejected
 * promises and errors raised outside the render tree.
 *
 * Safe to call more than once.
 */
let installed = false;
export const installGlobalErrorReporting = (): void => {
  if (installed || typeof window === "undefined") return;
  installed = true;

  window.addEventListener("unhandledrejection", (event) => {
    reportError("unhandled_rejection", event.reason);
  });

  window.addEventListener("error", (event) => {
    // Resource load failures (img, script) also fire this with no error object;
    // they are not what this is for.
    if (event.error) reportError("window_error", event.error);
  });
};
