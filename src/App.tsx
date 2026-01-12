import { useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

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

// Insights blog pages - eager loaded for SEO
import Insights from "./pages/Insights";
import PaymentRisk from "./pages/insights/PaymentRisk";
import Guides from "./pages/insights/Guides";
import CaseStudies from "./pages/insights/CaseStudies";
import ProofOfBusinessActivity from "./pages/insights/ProofOfBusinessActivity";
import SalesIncrease from "./pages/insights/SalesIncrease";
import MarketplaceSellerInfo from "./pages/insights/MarketplaceSellerInfo";
import SourceOfFunds from "./pages/insights/SourceOfFunds";
import IndustryVerification from "./pages/insights/IndustryVerification";
import InternationalSales from "./pages/insights/InternationalSales";
import ContractsInvoices from "./pages/insights/ContractsInvoices";
import WhyStripeFreezes from "./pages/insights/WhyStripeFreezes";
import WhyAccountsFlaggedAfterGrowth from "./pages/insights/WhyAccountsFlaggedAfterGrowth";
import WhyAccountsFrozenWithoutWarning from "./pages/insights/WhyAccountsFrozenWithoutWarning";
import WhyMarketplacesGetScrutiny from "./pages/insights/WhyMarketplacesGetScrutiny";
import WhyProvidersReUnderwrite from "./pages/insights/WhyProvidersReUnderwrite";
import WhySomeBusinessesNeverApproved from "./pages/insights/WhySomeBusinessesNeverApproved";
import WhyPaymentProvidersAskForDirectorDocuments from "./pages/insights/WhyPaymentProvidersAskForDirectorDocuments";
import WhyPaymentProvidersAskForSourceOfFunds from "./pages/insights/WhyPaymentProvidersAskForSourceOfFunds";
import WhyPaymentAccountsGetFlaggedAfterGrowth from "./pages/insights/WhyPaymentAccountsGetFlaggedAfterGrowth";
import WhyProvidersReUnderwriteExistingAccounts from "./pages/insights/WhyProvidersReUnderwriteExistingAccounts";
import WhyPaymentAccountsGetFlaggedWithoutChanges from "./pages/insights/WhyPaymentAccountsGetFlaggedWithoutChanges";
import VisaMastercardControl from "./pages/insights/VisaMastercardControl";
import WhatIsAnAcquirer from "./pages/insights/WhatIsAnAcquirer";
import PaymentProviderVsAcquirerVsBank from "./pages/insights/PaymentProviderVsAcquirerVsBank";
import WhyCardApprovalSpeedAffectsCheckoutAbandonment from "./pages/insights/WhyCardApprovalSpeedAffectsCheckoutAbandonment";
import SameDaySettlementAndInstantPayouts from "./pages/insights/SameDaySettlementAndInstantPayouts";
import WhatToDoWhenProviderAsksForDocuments from "./pages/insights/WhatToDoWhenProviderAsksForDocuments";

// Lazy load quiz flow - ensures quiz logic is code-split from SEO pages
// Quiz pages self-initialize session tracking when loaded
const Quiz = lazy(() => import("./pages/Quiz"));
const Recommendation = lazy(() => import("./pages/Recommendation"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Minimal loading fallback to avoid layout shift
const PageLoader = () => (
  <div className="min-h-screen bg-background" />
);

// Component to handle scroll-to-top and scroll-to-hash on navigation
const ScrollToTop = () => {
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
    } else {
      // Scroll to top when navigating to any page without hash
      window.scrollTo({ top: 0, behavior: "instant" });
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
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Homepage routes */}
            <Route path="/" element={<Index />} />
            <Route path="/us" element={<IndexUS />} />
            
            {/* Quiz routes - lazy loaded to isolate quiz logic from SEO bundle */}
            <Route path="/assessment" element={<Quiz />} />
            <Route path="/recommendation" element={<Recommendation />} />
            
            {/* SEO Content Pages */}
            <Route path="/best-payment-processor-uk" element={<BestPaymentProcessorUK />} />
            <Route path="/stripe-vs-square-vs-paypal-uk" element={<StripeVsSquareVsPaypal />} />
            <Route path="/best-payment-api-uk" element={<BestPaymentApiUK />} />
            <Route path="/about" element={<About />} />
            <Route path="/payment-provider-hidden-fees" element={<HiddenFees />} />
            <Route path="/switch-payment-provider" element={<SwitchProvider />} />
            <Route path="/best-payment-provider-small-business" element={<SmallBusiness />} />
            <Route path="/stripe-alternatives-marketplace" element={<StripeAlternatives />} />
            <Route path="/payment-provider-support" element={<SupportMatters />} />
            <Route path="/marketplace-payment-provider" element={<MarketplacePlatforms />} />
            <Route path="/choose-payment-provider" element={<ChooseProvider />} />
            
            {/* Insights Blog */}
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/payment-risk" element={<PaymentRisk />} />
            <Route path="/insights/guides" element={<Guides />} />
            <Route path="/insights/case-studies" element={<CaseStudies />} />
            <Route path="/insights/proof-of-business-activity" element={<ProofOfBusinessActivity />} />
            <Route path="/insights/sales-increase" element={<SalesIncrease />} />
            <Route path="/insights/marketplace-seller-info" element={<MarketplaceSellerInfo />} />
            <Route path="/insights/source-of-funds" element={<SourceOfFunds />} />
            <Route path="/insights/industry-verification" element={<IndustryVerification />} />
            <Route path="/insights/international-sales" element={<InternationalSales />} />
            <Route path="/insights/contracts-invoices" element={<ContractsInvoices />} />
            <Route path="/insights/why-stripe-freezes-accounts-uk" element={<WhyStripeFreezes />} />
            <Route path="/insights/why-accounts-get-flagged-after-growth" element={<WhyAccountsFlaggedAfterGrowth />} />
            <Route path="/insights/why-payment-accounts-get-frozen-without-warning" element={<WhyAccountsFrozenWithoutWarning />} />
            <Route path="/insights/why-marketplaces-get-extra-scrutiny" element={<WhyMarketplacesGetScrutiny />} />
            <Route path="/insights/why-providers-re-underwrite-accounts" element={<WhyProvidersReUnderwrite />} />
            <Route path="/insights/why-some-businesses-never-get-approved" element={<WhySomeBusinessesNeverApproved />} />
            <Route path="/insights/why-payment-providers-ask-for-director-documents" element={<WhyPaymentProvidersAskForDirectorDocuments />} />
            <Route path="/insights/why-payment-providers-ask-for-source-of-funds" element={<WhyPaymentProvidersAskForSourceOfFunds />} />
            <Route path="/insights/why-payment-accounts-get-flagged-after-growth" element={<WhyPaymentAccountsGetFlaggedAfterGrowth />} />
            <Route path="/insights/why-providers-re-underwrite-existing-accounts" element={<WhyProvidersReUnderwriteExistingAccounts />} />
            <Route path="/insights/why-payment-accounts-get-flagged-without-changes" element={<WhyPaymentAccountsGetFlaggedWithoutChanges />} />
            <Route path="/insights/visa-mastercard-control-card-payments" element={<VisaMastercardControl />} />
            <Route path="/insights/what-is-an-acquirer" element={<WhatIsAnAcquirer />} />
            <Route path="/insights/payment-provider-vs-acquirer-vs-bank" element={<PaymentProviderVsAcquirerVsBank />} />
            <Route path="/insights/why-card-approval-speed-affects-checkout-abandonment" element={<WhyCardApprovalSpeedAffectsCheckoutAbandonment />} />
            <Route path="/insights/same-day-settlement-and-instant-payouts" element={<SameDaySettlementAndInstantPayouts />} />
            <Route path="/insights/what-to-do-when-provider-asks-for-documents" element={<WhatToDoWhenProviderAsksForDocuments />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
