'use client'

import React from "react";
import { Button } from "@/components/ui/button";

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
  error?: unknown;
};

/**
 * Catches runtime errors (including lazy chunk load failures) and renders a recovery UI
 * instead of leaving users on a blank screen.
 */
export default class AppErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: unknown): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: unknown) {
    // Best-effort auto-recovery for transient Vite/asset chunk mismatches.
    const message =
      typeof error === "object" && error && "message" in error
        ? String((error as any).message)
        : String(error);

    const isChunkError =
      message.includes("Failed to fetch dynamically imported module") ||
      message.includes("ChunkLoadError") ||
      message.includes("Loading chunk") ||
      message.includes("Importing a module script failed");

    if (isChunkError) {
      const key = "__cp_chunk_reload_once__";
      const alreadyTried = sessionStorage.getItem(key) === "1";
      if (!alreadyTried) {
        sessionStorage.setItem(key, "1");
        window.location.reload();
      }
    }

    // Keep existing global error capture behavior; also log here for visibility.
    // eslint-disable-next-line no-console
    console.error("AppErrorBoundary caught error:", error);
  }

  private handleReload = () => {
    sessionStorage.removeItem("__cp_chunk_reload_once__");
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
        <section className="w-full max-w-lg rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm">
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight">We couldn’t load this page</h1>
          <p className="mt-2 text-sm md:text-base text-muted-foreground">
            This is usually temporary (for example, after an update). Please refresh to try again.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button onClick={this.handleReload} variant="hero" size="lg">
              Refresh
            </Button>
            <Button
              onClick={() => (window.location.href = "/")}
              variant="outline"
              size="lg"
            >
              Go to homepage
            </Button>
          </div>
        </section>
      </main>
    );
  }
}
