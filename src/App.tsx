import { useEffect, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import AppErrorBoundary from "@/components/AppErrorBoundary";
import { useVersionCheck, lazyWithRetry } from "@/hooks/useVersionCheck";

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
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import OnboardWithUs from "./pages/OnboardWithUs";

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
import WhyPaymentProvidersRejectGrowingBusinesses from "./pages/insights/WhyPaymentProvidersRejectGrowingBusinesses";
import WhyProvidersReUnderwriteExistingAccounts from "./pages/insights/WhyProvidersReUnderwriteExistingAccounts";
import WhyPaymentAccountsGetFlaggedWithoutChanges from "./pages/insights/WhyPaymentAccountsGetFlaggedWithoutChanges";
import VisaMastercardControl from "./pages/insights/VisaMastercardControl";
import WhatIsAnAcquirer from "./pages/insights/WhatIsAnAcquirer";
import PaymentProviderVsAcquirerVsBank from "./pages/insights/PaymentProviderVsAcquirerVsBank";
import WhyCardApprovalSpeedAffectsCheckoutAbandonment from "./pages/insights/WhyCardApprovalSpeedAffectsCheckoutAbandonment";
import SameDaySettlementAndInstantPayouts from "./pages/insights/SameDaySettlementAndInstantPayouts";
import TRAExemption from "./pages/insights/TRAExemption";
import WhatToDoWhenProviderAsksForDocuments from "./pages/insights/WhatToDoWhenProviderAsksForDocuments";
import Chargebacks from "./pages/insights/Chargebacks";
import CreditCardPaymentsExplained from "./pages/insights/CreditCardPaymentsExplained";
import OpenBankingPaymentsUK from "./pages/insights/OpenBankingPaymentsUK";
import ApplePayGooglePayExplained from "./pages/insights/ApplePayGooglePayExplained";
import LowValueTransactionExemption from "./pages/insights/LowValueTransactionExemption";
import PaymentProviderRiskModels from "./pages/insights/PaymentProviderRiskModels";
import WalletPaymentsGuaranteedSuccess from "./pages/insights/WalletPaymentsGuaranteedSuccess";

import AdyenEnterprisePlatform from "./pages/insights/AdyenEnterprisePlatform";
import StripePaymentPlatform from "./pages/insights/StripePaymentPlatform";
import CheckoutComEnterprisePlatform from "./pages/insights/CheckoutComEnterprisePlatform";
import Shift4PaymentsPlatform from "./pages/insights/Shift4PaymentsPlatform";
import EnterpriseProviderComparison from "./pages/insights/EnterpriseProviderComparison";
import FiservPaymentsPlatform from "./pages/insights/FiservPaymentsPlatform";
import AdyenVsFirstData from "./pages/insights/AdyenVsFirstData";
import ReferralCommissionGuide from "./pages/insights/ReferralCommissionGuide";

// Crisis Intervention articles
import CrisisHiddenFeeCrisis from "./pages/insights/crisis/HiddenFeeCrisis";
import CrisisRejectedHighRisk from "./pages/insights/crisis/RejectedHighRiskStrategy";
import CrisisStripeAccountFrozen from "./pages/insights/crisis/StripeAccountFrozen";

// Pricing Models articles
import InterchangePlusPlus from "./pages/insights/pricing/InterchangePlusPlus";
import BlendedVsInterchange from "./pages/insights/pricing/BlendedVsInterchange";

// Fees & Costs articles
import StripeFees from "./pages/insights/StripeFees";
import CheckoutComFees from "./pages/insights/CheckoutComFees";

// Lazy load quiz flow with retry - ensures quiz logic is code-split from SEO pages
// Quiz pages self-initialize session tracking when loaded
const Quiz = lazyWithRetry(() => import("./pages/Quiz"));
const Recommendation = lazyWithRetry(() => import("./pages/Recommendation"));
const NotFound = lazyWithRetry(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Minimal loading fallback to avoid layout shift
const PageLoader = () => (
  <div className="min-h-screen bg-background" />
);

// Component to handle scroll-to-top and scroll-to-hash on navigation
const ScrollToTop = () => {
  const { hash, pathname } = useLocation();

  // Check for version updates on navigation
  useVersionCheck();

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
        <AppErrorBoundary>
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
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/onboard-with-us" element={<OnboardWithUs />} />
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
              <Route path="/insights/tra-exemption-reduces-payment-friction" element={<TRAExemption />} />
              <Route path="/insights/chargebacks-what-they-are-and-how-to-avoid-them" element={<Chargebacks />} />
              <Route path="/insights/credit-card-payments-explained" element={<CreditCardPaymentsExplained />} />
              <Route path="/insights/open-banking-payments-uk" element={<OpenBankingPaymentsUK />} />
              <Route path="/insights/apple-pay-google-pay-explained" element={<ApplePayGooglePayExplained />} />
              <Route path="/insights/low-value-transaction-exemption" element={<LowValueTransactionExemption />} />
              <Route path="/insights/payment-provider-risk-models" element={<PaymentProviderRiskModels />} />
              <Route path="/insights/wallet-payments-guaranteed-success" element={<WalletPaymentsGuaranteedSuccess />} />
              <Route path="/insights/why-payment-providers-reject-growing-businesses" element={<WhyPaymentProvidersRejectGrowingBusinesses />} />
              
              <Route path="/insights/adyen-enterprise-payments-platform" element={<AdyenEnterprisePlatform />} />
              <Route path="/insights/stripe-payment-platform" element={<StripePaymentPlatform />} />
              <Route path="/insights/checkout-com-enterprise-platform" element={<CheckoutComEnterprisePlatform />} />
              <Route path="/insights/shift4-payments-platform" element={<Shift4PaymentsPlatform />} />
              <Route path="/insights/enterprise-provider-comparison" element={<EnterpriseProviderComparison />} />
              <Route path="/insights/fiserv-payments-platform" element={<FiservPaymentsPlatform />} />
              <Route path="/insights/adyen-vs-first-data" element={<AdyenVsFirstData />} />
              <Route path="/insights/referral-commission-guide" element={<ReferralCommissionGuide />} />
              
              {/* Crisis Intervention articles */}
              <Route path="/insights/crisis/hidden-fee-crisis" element={<CrisisHiddenFeeCrisis />} />
              <Route path="/insights/crisis/rejected-high-risk-strategy" element={<CrisisRejectedHighRisk />} />
              <Route path="/insights/crisis/stripe-account-frozen" element={<CrisisStripeAccountFrozen />} />
              
              {/* Pricing Models articles */}
              <Route path="/insights/pricing-models/interchange-plus-plus" element={<InterchangePlusPlus />} />
              <Route path="/insights/pricing-models/blended-vs-interchange" element={<BlendedVsInterchange />} />
              
              {/* Fees & Costs articles */}
              <Route path="/insights/stripe-fees-explained" element={<StripeFees />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AppErrorBoundary>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
