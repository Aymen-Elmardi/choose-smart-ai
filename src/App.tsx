import { useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { initializeSessionTracking } from "@/hooks/useEnrichmentData";

// Eager load the homepage for best FCP
import Index from "./pages/Index";
import IndexUS from "./pages/IndexUS";

// Eager load SEO pages for Googlebot crawlability (no session/state dependencies)
import HiddenFees from "./pages/HiddenFees";
import SwitchProvider from "./pages/SwitchProvider";
import SmallBusiness from "./pages/SmallBusiness";
import StripeAlternatives from "./pages/StripeAlternatives";
import SupportMatters from "./pages/SupportMatters";
import MarketplacePlatforms from "./pages/MarketplacePlatforms";
import ChooseProvider from "./pages/ChooseProvider";
import BestPaymentProcessorUK from "./pages/BestPaymentProcessorUK";
import StripeVsSquareVsPaypal from "./pages/StripeVsSquareVsPaypal";
import BestPaymentApiUK from "./pages/BestPaymentApiUK";
import About from "./pages/About";

// Lazy load quiz flow (requires client-side state)
const Quiz = lazy(() => import("./pages/Quiz"));
const Recommendation = lazy(() => import("./pages/Recommendation"));
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
            <Route path="/us" element={<IndexUS />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/recommendation" element={<Recommendation />} />
            <Route path="/best-payment-processor-uk" element={<BestPaymentProcessorUK />} />
            <Route path="/stripe-vs-square-vs-paypal-uk" element={<StripeVsSquareVsPaypal />} />
            <Route path="/best-payment-api-uk" element={<BestPaymentApiUK />} />
            <Route path="/about" element={<About />} />
            {/* SEO Landing Pages */}
            <Route path="/payment-provider-hidden-fees" element={<HiddenFees />} />
            <Route path="/switch-payment-provider" element={<SwitchProvider />} />
            <Route path="/best-payment-provider-small-business" element={<SmallBusiness />} />
            <Route path="/stripe-alternatives-marketplace" element={<StripeAlternatives />} />
            <Route path="/payment-provider-support" element={<SupportMatters />} />
            <Route path="/marketplace-payment-provider" element={<MarketplacePlatforms />} />
            <Route path="/choose-payment-provider" element={<ChooseProvider />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
