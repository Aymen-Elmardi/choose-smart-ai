import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import { AlertTriangle } from "lucide-react";

/**
 * In-app server/unavailable page. Shown at /500 for manual navigation and testing.
 * Runtime chunk/load failures are handled by AppErrorBoundary.
 */
const ServerError = () => {
  useSEO({
    title: "Something Went Wrong | ChosePayments",
    description: "We could not load this page. Please try again or return to the homepage.",
    noIndex: true,
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-24">
        <section className="w-full max-w-lg rounded-xl border border-border bg-card p-8 md:p-10 shadow-sm text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-destructive/10 text-destructive mb-6">
            <AlertTriangle className="w-7 h-7" aria-hidden />
          </div>
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">Error</p>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">We couldn&apos;t complete that request</h1>
          <p className="text-muted-foreground mb-8">
            Something went wrong on our side or the connection dropped. Wait a moment and try again, or head back to the homepage.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="hero" size="lg" onClick={() => window.location.reload()}>
              Try again
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/">Back to homepage</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServerError;
