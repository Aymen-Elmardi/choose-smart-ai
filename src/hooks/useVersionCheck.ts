import { useEffect, useRef, lazy, ComponentType } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

const VERSION_CHECK_KEY = "__app_version__";
const VERSION_CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes

/**
 * Hook that checks for app version mismatches on navigation.
 * If a new version is detected, prompts the user to refresh.
 */
export function useVersionCheck() {
  const { pathname } = useLocation();
  const lastCheckRef = useRef<number>(0);
  const toastShownRef = useRef<boolean>(false);

  useEffect(() => {
    const now = Date.now();
    
    // Throttle checks to avoid excessive requests
    if (now - lastCheckRef.current < VERSION_CHECK_INTERVAL) {
      return;
    }
    lastCheckRef.current = now;

    // Check version on navigation
    const checkVersion = async () => {
      try {
        const response = await fetch(`/version.json?t=${now}`, {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
          },
        });

        if (!response.ok) {
          // version.json doesn't exist yet, skip check
          return;
        }

        const data = await response.json();
        const serverVersion = data.version;
        const storedVersion = sessionStorage.getItem(VERSION_CHECK_KEY);

        if (!storedVersion) {
          // First visit, store the version
          sessionStorage.setItem(VERSION_CHECK_KEY, serverVersion);
          return;
        }

        if (storedVersion !== serverVersion && !toastShownRef.current) {
          toastShownRef.current = true;
          toast.info("A new version is available", {
            description: "Click to refresh and get the latest updates.",
            duration: Infinity,
            action: {
              label: "Refresh",
              onClick: () => {
                sessionStorage.setItem(VERSION_CHECK_KEY, serverVersion);
                window.location.reload();
              },
            },
          });
        }
      } catch {
        // Network error or parsing error, silently ignore
      }
    };

    checkVersion();
  }, [pathname]);
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
