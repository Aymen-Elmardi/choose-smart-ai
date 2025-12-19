import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Quiz from "./pages/Quiz";
import Recommendation from "./pages/Recommendation";
import BestPaymentProcessorUK from "./pages/BestPaymentProcessorUK";
import StripeVsSquareVsPaypal from "./pages/StripeVsSquareVsPaypal";
import BestPaymentApiUK from "./pages/BestPaymentApiUK";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { initializeSessionTracking } from "@/hooks/useEnrichmentData";

const queryClient = new QueryClient();

// Initialize session tracking on app load
initializeSessionTracking();

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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
