import { useCallback, useEffect, useRef, lazy, ComponentType } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

// Provided by Vite `define` (vite.config.ts). Kept local to this module to avoid
// TS moduleDetection quirks.
declare const __APP_BUILD_TIME__: string;

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
  const toastShownRef = useRef<boolean>(false);

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
        const clientVersion =
          typeof __APP_BUILD_TIME__ !== "undefined" ? __APP_BUILD_TIME__ : undefined;
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

          if (!toastShownRef.current) {
            toastShownRef.current = true;
            toast.info("A new version is available", {
              description: "Refresh to get the latest updates.",
              duration: Infinity,
              action: {
                label: "Refresh",
                onClick: () => {
                  sessionStorage.setItem(VERSION_CHECK_KEY, serverVersion);
                  forceReloadWithCacheBust(serverVersion);
                },
              },
            });
          }
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
 * Wraps a lazy import with automatic retry on chunk load failure.
 * Forces a cache-busting reload if the import fails.
 */
export function lazyWithRetry<T extends ComponentType<unknown>>(
  importFn: () => Promise<{ default: T }>
) {
  return lazy(async () => {
    try {
      return await importFn();
    } catch (error) {
      // Check if this is a chunk load error
      const message = error instanceof Error ? error.message : String(error);
      const isChunkError =
        message.includes("Failed to fetch dynamically imported module") ||
        message.includes("ChunkLoadError") ||
        message.includes("Loading chunk") ||
        message.includes("Importing a module script failed");

      if (isChunkError) {
        const key = "__chunk_retry_attempted__";
        const alreadyTried = sessionStorage.getItem(key) === "1";
        
        if (!alreadyTried) {
          sessionStorage.setItem(key, "1");
          // Force reload without cache
          window.location.reload();
          // Return a never-resolving promise while reload happens
          return new Promise(() => {});
        }
      }
      
      throw error;
    }
  });
}
