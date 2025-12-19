import { useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { initializeSessionTracking } from "@/hooks/useEnrichmentData";

// Eager load the homepage for best FCP
import Index from "./pages/Index";

// Lazy load other routes for code splitting
const Quiz = lazy(() => import("./pages/Quiz"));
const Recommendation = lazy(() => import("./pages/Recommendation"));
const BestPaymentProcessorUK = lazy(() => import("./pages/BestPaymentProcessorUK"));
const StripeVsSquareVsPaypal = lazy(() => import("./pages/StripeVsSquareVsPaypal"));
const BestPaymentApiUK = lazy(() => import("./pages/BestPaymentApiUK"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Initialize session tracking on app load
initializeSessionTracking();

// Minimal loading fallback to avoid layout shift
const PageLoader = () => (
  <div className="min-h-screen bg-background" />
);

// Component to handle scroll-to-hash on navigation
const ScrollToHash = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      // Small delay to ensure DOM is ready after navigation
      setTimeout(() => {
        const element = document.getElementById(hash.slice(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else if (pathname === "/") {
      // Scroll to top when navigating to homepage without hash
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [hash, pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToHash />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/recommendation" element={<Recommendation />} />
            <Route path="/best-payment-processor-uk" element={<BestPaymentProcessorUK />} />
            <Route path="/stripe-vs-square-vs-paypal-uk" element={<StripeVsSquareVsPaypal />} />
            <Route path="/best-payment-api-uk" element={<BestPaymentApiUK />} />
            <Route path="/about" element={<About />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
