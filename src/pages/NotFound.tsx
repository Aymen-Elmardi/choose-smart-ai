import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import { FileQuestion } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useSEO({
    title: "Page Not Found | ChosePayments",
    description: "The page you requested does not exist or has been moved.",
    noIndex: true,
  });

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-24">
        <section className="w-full max-w-lg rounded-xl border border-border bg-card p-8 md:p-10 shadow-sm text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-muted text-muted-foreground mb-6">
            <FileQuestion className="w-7 h-7" aria-hidden />
          </div>
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">404</p>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Page not found</h1>
          <p className="text-muted-foreground mb-8">
            We couldn&apos;t find a page at <span className="font-mono text-foreground break-all">{location.pathname}</span>.
            Check the URL or use the links below.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/">Back to homepage</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/insights">Browse insights</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
