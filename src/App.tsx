import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Quiz from "./pages/Quiz";
import Recommendation from "./pages/Recommendation";
import BestPaymentProcessorUK from "./pages/BestPaymentProcessorUK";
import StripeVsSquareVsPaypal from "./pages/StripeVsSquareVsPaypal";
import NotFound from "./pages/NotFound";
import { initializeSessionTracking } from "@/hooks/useEnrichmentData";

const queryClient = new QueryClient();

// Initialize session tracking on app load
initializeSessionTracking();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/recommendation" element={<Recommendation />} />
          <Route path="/best-payment-processor-uk" element={<BestPaymentProcessorUK />} />
          <Route path="/stripe-vs-square-vs-paypal-uk" element={<StripeVsSquareVsPaypal />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
