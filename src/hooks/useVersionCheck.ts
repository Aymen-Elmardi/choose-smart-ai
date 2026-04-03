'use client'
import { useCallback, useEffect, useRef, ComponentType } from "react";
import { useLocation } from '@/lib/router-compat';

// Provided by next.config.mjs env.NEXT_PUBLIC_BUILD_TIME
const __APP_BUILD_TIME__ = process.env.NEXT_PUBLIC_BUILD_TIME;

const VERSION_CHECK_KEY = "__app_version__";
const VERSION_FORCE_RELOAD_KEY = "__cp_version_force_reload_once__";
const VERSION_CACHE_BUST_PARAM = "__v";
const VERSION_CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes

function stripCacheBustParam() {
  try {
    const url = new URL(window.location.href);
    if (!url.searchParams.has(VERSION_CACHE_BUST_PARAM)) return;
    url.searchParams.delete(VERSION_CACHE_BUST_PARAM);
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  } catch {
    // ignore
  }
}

function forceReloadWithCacheBust(serverVersion: string) {
  const url = new URL(window.location.href);
  url.searchParams.set(VERSION_CACHE_BUST_PARAM, serverVersion);
  window.location.replace(url.toString());
}

/**
 * Hook that checks for app version mismatches on navigation.
 * If a new version is detected, prompts the user to refresh.
 */
export function useVersionCheck() {
  const { pathname } = useLocation();
  const lastCheckRef = useRef<number>(0);

  const runCheck = useCallback(
    async (force = false) => {
      stripCacheBustParam();

      const now = Date.now();

      // Throttle checks to avoid excessive requests
      if (!force && now - lastCheckRef.current < VERSION_CHECK_INTERVAL) return;
      lastCheckRef.current = now;

      try {
        const response = await fetch(`/version.json?t=${now}`, {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
          },
        });

        if (!response.ok) return;

        const data = await response.json();
        const serverVersion = data.version;
        const clientVersion = __APP_BUILD_TIME__ ?? undefined;
        const storedVersion = sessionStorage.getItem(VERSION_CHECK_KEY);

        // If this tab is running a stale cached build (very common cause of
        // "mixed version" UI after publishing), force a one-time reload.
        if (clientVersion && clientVersion !== serverVersion) {
          const alreadyForced = sessionStorage.getItem(VERSION_FORCE_RELOAD_KEY) === "1";
          if (!alreadyForced) {
            sessionStorage.setItem(VERSION_FORCE_RELOAD_KEY, "1");
            sessionStorage.setItem(VERSION_CHECK_KEY, serverVersion);
            forceReloadWithCacheBust(serverVersion);
            return;
          }
        }

        if (!storedVersion) {
          sessionStorage.setItem(VERSION_CHECK_KEY, serverVersion);
          return;
        }

        if (storedVersion !== serverVersion) {
          const alreadyForced = sessionStorage.getItem(VERSION_FORCE_RELOAD_KEY) === "1";
          if (!alreadyForced) {
            sessionStorage.setItem(VERSION_FORCE_RELOAD_KEY, "1");
            // Match existing behavior: set target version then reload.
            sessionStorage.setItem(VERSION_CHECK_KEY, serverVersion);
            forceReloadWithCacheBust(serverVersion);
            return;
          }
          // Silently update stored version without notification
          sessionStorage.setItem(VERSION_CHECK_KEY, serverVersion);
        }
      } catch {
        // ignore
      }
    },
    []
  );

  useEffect(() => {
    runCheck(false);
  }, [pathname, runCheck]);

  // Also check when returning to a tab (common source of stale BFCache pages in Chrome).
  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState !== "visible") return;
      runCheck(true);
    };

    const onPageShow = () => {
      runCheck(true);
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pageshow", onPageShow);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [runCheck]);
}

/**
 * In Next.js, code splitting is handled natively via next/dynamic.
 * This shim keeps the same call-signature so App.tsx doesn't need changes.
 * App.tsx is removed as part of the migration; this export remains for
 * any remaining usage.
 */
export function lazyWithRetry<T extends ComponentType<unknown>>(
  importFn: () => Promise<{ default: T }>
): () => Promise<{ default: T }> {
  return importFn;
}
