import { useEffect, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import TimedPopup from "@/components/TimedPopup";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import AppErrorBoundary from "@/components/AppErrorBoundary";
import { useVersionCheck, lazyWithRetry } from "@/hooks/useVersionCheck";

// Eager load ONLY the homepage for best FCP
import Index from "./pages/Index";

// Lazy load everything else — massive bundle reduction
const IndexUS = lazyWithRetry(() => import("./pages/IndexUS"));
const Quiz = lazyWithRetry(() => import("./pages/Quiz"));
const Recommendation = lazyWithRetry(() => import("./pages/Recommendation"));
const NotFound = lazyWithRetry(() => import("./pages/NotFound"));

// SEO Content Pages - lazy loaded
const HiddenFees = lazyWithRetry(() => import("./pages/HiddenFees"));
const SwitchProvider = lazyWithRetry(() => import("./pages/SwitchProvider"));
const SmallBusiness = lazyWithRetry(() => import("./pages/SmallBusiness"));
const StripeAlternatives = lazyWithRetry(() => import("./pages/StripeAlternatives"));
const SupportMatters = lazyWithRetry(() => import("./pages/SupportMatters"));
const MarketplacePlatforms = lazyWithRetry(() => import("./pages/MarketplacePlatforms"));
const ChooseProvider = lazyWithRetry(() => import("./pages/ChooseProvider"));
const BestPaymentProcessorUK = lazyWithRetry(() => import("./pages/BestPaymentProcessorUK"));
const StripeVsSquareVsPaypal = lazyWithRetry(() => import("./pages/StripeVsSquareVsPaypal"));
const BestPaymentApiUK = lazyWithRetry(() => import("./pages/BestPaymentApiUK"));
const About = lazyWithRetry(() => import("./pages/About"));
const Privacy = lazyWithRetry(() => import("./pages/Privacy"));
const Terms = lazyWithRetry(() => import("./pages/Terms"));
const Contact = lazyWithRetry(() => import("./pages/Contact"));
const OnboardWithUs = lazyWithRetry(() => import("./pages/OnboardWithUs"));
const MerchantAccountProblems = lazyWithRetry(() => import("./pages/MerchantAccountProblems"));
const FAQ = lazyWithRetry(() => import("./pages/FAQ"));

// Insights pages - lazy loaded
const Insights = lazyWithRetry(() => import("./pages/Insights"));
const PaymentRisk = lazyWithRetry(() => import("./pages/insights/PaymentRisk"));
const Guides = lazyWithRetry(() => import("./pages/insights/Guides"));
const CaseStudies = lazyWithRetry(() => import("./pages/insights/CaseStudies"));
const ProofOfBusinessActivity = lazyWithRetry(() => import("./pages/insights/ProofOfBusinessActivity"));
const SalesIncrease = lazyWithRetry(() => import("./pages/insights/SalesIncrease"));
const MarketplaceSellerInfo = lazyWithRetry(() => import("./pages/insights/MarketplaceSellerInfo"));
const SourceOfFunds = lazyWithRetry(() => import("./pages/insights/SourceOfFunds"));
const IndustryVerification = lazyWithRetry(() => import("./pages/insights/IndustryVerification"));
const InternationalSales = lazyWithRetry(() => import("./pages/insights/InternationalSales"));
const ContractsInvoices = lazyWithRetry(() => import("./pages/insights/ContractsInvoices"));
const WhyStripeFreezes = lazyWithRetry(() => import("./pages/insights/WhyStripeFreezes"));
const WhyAccountsFlaggedAfterGrowth = lazyWithRetry(() => import("./pages/insights/WhyAccountsFlaggedAfterGrowth"));
const WhyAccountsFrozenWithoutWarning = lazyWithRetry(() => import("./pages/insights/WhyAccountsFrozenWithoutWarning"));

const WhyProvidersReUnderwrite = lazyWithRetry(() => import("./pages/insights/WhyProvidersReUnderwrite"));
const WhySomeBusinessesNeverApproved = lazyWithRetry(() => import("./pages/insights/WhySomeBusinessesNeverApproved"));
const WhyPaymentProvidersAskForDirectorDocuments = lazyWithRetry(() => import("./pages/insights/WhyPaymentProvidersAskForDirectorDocuments"));
const WhyPaymentProvidersAskForSourceOfFunds = lazyWithRetry(() => import("./pages/insights/WhyPaymentProvidersAskForSourceOfFunds"));
const WhyPaymentAccountsGetFlaggedAfterGrowth = lazyWithRetry(() => import("./pages/insights/WhyPaymentAccountsGetFlaggedAfterGrowth"));
const WhyPaymentProvidersRejectGrowingBusinesses = lazyWithRetry(() => import("./pages/insights/WhyPaymentProvidersRejectGrowingBusinesses"));
const WhyProvidersReUnderwriteExistingAccounts = lazyWithRetry(() => import("./pages/insights/WhyProvidersReUnderwriteExistingAccounts"));
const WhyPaymentAccountsGetFlaggedWithoutChanges = lazyWithRetry(() => import("./pages/insights/WhyPaymentAccountsGetFlaggedWithoutChanges"));
const VisaMastercardControl = lazyWithRetry(() => import("./pages/insights/VisaMastercardControl"));
const WhatIsAnAcquirer = lazyWithRetry(() => import("./pages/insights/WhatIsAnAcquirer"));
const PaymentProviderVsAcquirerVsBank = lazyWithRetry(() => import("./pages/insights/PaymentProviderVsAcquirerVsBank"));
const WhyCardApprovalSpeedAffectsCheckoutAbandonment = lazyWithRetry(() => import("./pages/insights/WhyCardApprovalSpeedAffectsCheckoutAbandonment"));
const SameDaySettlementAndInstantPayouts = lazyWithRetry(() => import("./pages/insights/SameDaySettlementAndInstantPayouts"));
const TRAExemption = lazyWithRetry(() => import("./pages/insights/TRAExemption"));
const WhatToDoWhenProviderAsksForDocuments = lazyWithRetry(() => import("./pages/insights/WhatToDoWhenProviderAsksForDocuments"));
const Chargebacks = lazyWithRetry(() => import("./pages/insights/Chargebacks"));
const CreditCardPaymentsExplained = lazyWithRetry(() => import("./pages/insights/CreditCardPaymentsExplained"));
const OpenBankingPaymentsUK = lazyWithRetry(() => import("./pages/insights/OpenBankingPaymentsUK"));
const ApplePayGooglePayExplained = lazyWithRetry(() => import("./pages/insights/ApplePayGooglePayExplained"));
const LowValueTransactionExemption = lazyWithRetry(() => import("./pages/insights/LowValueTransactionExemption"));
const PaymentProviderRiskModels = lazyWithRetry(() => import("./pages/insights/PaymentProviderRiskModels"));
const WalletPaymentsGuaranteedSuccess = lazyWithRetry(() => import("./pages/insights/WalletPaymentsGuaranteedSuccess"));
const PaymentAcronymsExplained = lazyWithRetry(() => import("./pages/insights/PaymentAcronymsExplained"));
const ProviderAppetiteIndex = lazyWithRetry(() => import("./pages/insights/ProviderAppetiteIndex"));

const AdyenEnterprisePlatform = lazyWithRetry(() => import("./pages/insights/AdyenEnterprisePlatform"));
const StripePaymentPlatform = lazyWithRetry(() => import("./pages/insights/StripePaymentPlatform"));
const CheckoutComEnterprisePlatform = lazyWithRetry(() => import("./pages/insights/CheckoutComEnterprisePlatform"));
const Shift4PaymentsPlatform = lazyWithRetry(() => import("./pages/insights/Shift4PaymentsPlatform"));
const Shift4VsStripe = lazyWithRetry(() => import("./pages/insights/Shift4VsStripe"));
const EnterpriseProviderComparison = lazyWithRetry(() => import("./pages/insights/EnterpriseProviderComparison"));
const FiservPaymentsPlatform = lazyWithRetry(() => import("./pages/insights/FiservPaymentsPlatform"));
const AdyenVsFirstData = lazyWithRetry(() => import("./pages/insights/AdyenVsFirstData"));
const ReferralCommissionGuide = lazyWithRetry(() => import("./pages/insights/ReferralCommissionGuide"));
const PayPalPaymentPlatform = lazyWithRetry(() => import("./pages/insights/PayPalPaymentPlatform"));
const WhyProvidersImposeReserves = lazyWithRetry(() => import("./pages/insights/WhyProvidersImposeReserves"));
const RollingVsFixedReserve = lazyWithRetry(() => import("./pages/insights/RollingVsFixedReserve"));
const PayoutSettlementExplained = lazyWithRetry(() => import("./pages/insights/PayoutSettlementExplained"));
const NetVsGrossSettlement = lazyWithRetry(() => import("./pages/insights/NetVsGrossSettlement"));
const WhatToDoWhenFundsHeld = lazyWithRetry(() => import("./pages/insights/WhatToDoWhenFundsHeld"));
const ChargebackLossRecovery = lazyWithRetry(() => import("./pages/insights/ChargebackLossRecovery"));
const MarketplacePaymentsGuide = lazyWithRetry(() => import("./pages/insights/MarketplacePaymentsGuide"));

const CrisisHiddenFeeCrisis = lazyWithRetry(() => import("./pages/insights/crisis/HiddenFeeCrisis"));
const CrisisRejectedHighRisk = lazyWithRetry(() => import("./pages/insights/crisis/RejectedHighRiskStrategy"));
const CrisisStripeAccountFrozen = lazyWithRetry(() => import("./pages/insights/crisis/StripeAccountFrozen"));

const InterchangePlusPlus = lazyWithRetry(() => import("./pages/insights/pricing/InterchangePlusPlus"));
const BlendedVsInterchange = lazyWithRetry(() => import("./pages/insights/pricing/BlendedVsInterchange"));
const CrisisIndex = lazyWithRetry(() => import("./pages/insights/CrisisIndex"));
const PricingModelsIndex = lazyWithRetry(() => import("./pages/insights/PricingModelsIndex"));

// E-commerce Guides
const HighRiskToHighGrowth = lazyWithRetry(() => import("./pages/insights/ecommerce/HighRiskToHighGrowth"));
const SubscriptionRevenue = lazyWithRetry(() => import("./pages/insights/ecommerce/SubscriptionRevenue"));
const ChargebackThresholds = lazyWithRetry(() => import("./pages/insights/ecommerce/ChargebackThresholds"));

// Provider Fit Guides
const HighChargebackProcessors = lazyWithRetry(() => import("./pages/insights/provider-fit/HighChargebackProcessors"));
const HighRiskEcommerce = lazyWithRetry(() => import("./pages/insights/provider-fit/HighRiskEcommerce"));
const SubscriptionSaaS = lazyWithRetry(() => import("./pages/insights/provider-fit/SubscriptionSaaS"));
const MCC5812Restaurants = lazyWithRetry(() => import("./pages/insights/provider-fit/MCC5812Restaurants"));
const FoodDeliveryAcquirers = lazyWithRetry(() => import("./pages/insights/provider-fit/FoodDeliveryAcquirers"));

// Landing pages
const RiskProfileMatching = lazyWithRetry(() => import("./pages/RiskProfileMatching"));

const StripeFees = lazyWithRetry(() => import("./pages/insights/StripeFees"));
const CheckoutComFees = lazyWithRetry(() => import("./pages/insights/CheckoutComFees"));
const FiservCloverFees = lazyWithRetry(() => import("./pages/insights/FiservCloverFees"));
const AdyenFees = lazyWithRetry(() => import("./pages/insights/AdyenFees"));
const PayPalFees = lazyWithRetry(() => import("./pages/insights/PayPalFees"));
const PaymentSchemeRulesExplained = lazyWithRetry(() => import("./pages/insights/PaymentSchemeRulesExplained"));
const SchemeRulesReservesMonitoring = lazyWithRetry(() => import("./pages/insights/SchemeRulesReservesMonitoring"));
const SchemeRulesByPaymentMethod = lazyWithRetry(() => import("./pages/insights/SchemeRulesByPaymentMethod"));
const InsightsGraph = lazyWithRetry(() => import("./pages/InsightsGraph"));
const ScoringLogic = lazyWithRetry(() => import("./pages/ScoringLogic"));

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
      const id = hash.slice(1);
      let attempts = 0;
      const tryScroll = () => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        } else if (attempts < 10) {
          attempts++;
          setTimeout(tryScroll, 150);
        }
      };
      setTimeout(tryScroll, 80);
    } else {
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
        <ExitIntentPopup />
        <TimedPopup />
        <AppErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Homepage - eager loaded */}
              <Route path="/" element={<Index />} />
              <Route path="/us" element={<IndexUS />} />
              
              {/* Quiz routes */}
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
              <Route path="/merchant-account-problems" element={<MerchantAccountProblems />} />
              <Route path="/faq" element={<FAQ />} />
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
              
              <Route path="/insights/why-providers-re-underwrite-accounts" element={<WhyProvidersReUnderwrite />} />
              <Route path="/insights/why-some-businesses-never-get-approved" element={<WhySomeBusinessesNeverApproved />} />
              <Route path="/insights/why-payment-providers-ask-for-director-documents" element={<WhyPaymentProvidersAskForDirectorDocuments />} />
              <Route path="/insights/why-payment-providers-ask-for-source-of-funds" element={<WhyPaymentProvidersAskForSourceOfFunds />} />
              {/* 301 Redirects for deduplicated articles */}
              <Route path="/insights/why-payment-accounts-get-flagged-after-growth" element={<Navigate to="/insights/why-accounts-get-flagged-after-growth" replace />} />
              <Route path="/insights/why-providers-re-underwrite-existing-accounts" element={<Navigate to="/insights/why-providers-re-underwrite-accounts" replace />} />
              <Route path="/insights/why-payment-accounts-get-flagged-without-changes" element={<Navigate to="/insights/why-accounts-get-flagged-after-growth" replace />} />
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
              <Route path="/insights/payment-acronyms-explained" element={<PaymentAcronymsExplained />} />
              <Route path="/insights/provider-appetite-index" element={<ProviderAppetiteIndex />} />
              
              <Route path="/insights/adyen-enterprise-payments-platform" element={<AdyenEnterprisePlatform />} />
              <Route path="/insights/stripe-payment-platform" element={<StripePaymentPlatform />} />
              <Route path="/insights/checkout-com-enterprise-platform" element={<CheckoutComEnterprisePlatform />} />
              <Route path="/insights/shift4-payments-platform" element={<Shift4PaymentsPlatform />} />
              <Route path="/insights/shift4-vs-stripe-enterprise" element={<Shift4VsStripe />} />
              <Route path="/insights/enterprise-provider-comparison" element={<EnterpriseProviderComparison />} />
              <Route path="/insights/fiserv-payments-platform" element={<FiservPaymentsPlatform />} />
              <Route path="/insights/adyen-vs-first-data" element={<AdyenVsFirstData />} />
              <Route path="/insights/referral-commission-guide" element={<ReferralCommissionGuide />} />
              <Route path="/insights/paypal-payment-platform" element={<PayPalPaymentPlatform />} />
              
              {/* Crisis Intervention */}
              <Route path="/insights/crisis" element={<CrisisIndex />} />
              <Route path="/insights/crisis/hidden-fee-crisis" element={<CrisisHiddenFeeCrisis />} />
              <Route path="/insights/crisis/rejected-high-risk-strategy" element={<CrisisRejectedHighRisk />} />
              <Route path="/insights/crisis/stripe-account-frozen" element={<CrisisStripeAccountFrozen />} />
              
              {/* Pricing Models */}
              <Route path="/insights/pricing-models" element={<PricingModelsIndex />} />
              <Route path="/insights/pricing-models/interchange-plus-plus" element={<InterchangePlusPlus />} />
              <Route path="/insights/pricing-models/blended-vs-interchange" element={<BlendedVsInterchange />} />
              
              {/* E-commerce Guides */}
              <Route path="/insights/ecommerce/high-risk-to-high-growth" element={<HighRiskToHighGrowth />} />
              <Route path="/insights/ecommerce/subscription-revenue-recurring-billing" element={<SubscriptionRevenue />} />
              <Route path="/insights/ecommerce/chargeback-thresholds-high-risk-processors" element={<ChargebackThresholds />} />
              
              {/* Provider Fit Guides */}
              <Route path="/best-payment-processors-high-chargebacks" element={<HighChargebackProcessors />} />
              <Route path="/payment-processors-high-risk-ecommerce" element={<HighRiskEcommerce />} />
              <Route path="/payment-provider-subscription-business" element={<SubscriptionSaaS />} />
              <Route path="/mcc-5812-payment-gateway-uk" element={<MCC5812Restaurants />} />
              <Route path="/best-acquirers-food-delivery" element={<FoodDeliveryAcquirers />} />
              
              {/* Landing pages */}
              <Route path="/risk-profile-matching" element={<RiskProfileMatching />} />
              
              {/* Fees & Costs articles */}
              <Route path="/insights/stripe-fees-explained" element={<StripeFees />} />
              <Route path="/insights/checkout-com-fees-explained" element={<CheckoutComFees />} />
              <Route path="/insights/fiserv-clover-pricing-explained" element={<FiservCloverFees />} />
              <Route path="/insights/adyen-pricing-explained" element={<AdyenFees />} />
              <Route path="/insights/paypal-fees-explained" element={<PayPalFees />} />
              <Route path="/insights/payment-scheme-rules-explained" element={<PaymentSchemeRulesExplained />} />
              <Route path="/insights/scheme-rules-reserves-monitoring" element={<SchemeRulesReservesMonitoring />} />
              <Route path="/insights/scheme-rules-by-payment-method" element={<SchemeRulesByPaymentMethod />} />
              <Route path="/insights/why-providers-impose-reserves" element={<WhyProvidersImposeReserves />} />
              <Route path="/insights/rolling-vs-fixed-reserve" element={<RollingVsFixedReserve />} />
              <Route path="/insights/payout-settlement-explained" element={<PayoutSettlementExplained />} />
              <Route path="/insights/net-vs-gross-settlement" element={<NetVsGrossSettlement />} />
              <Route path="/insights/what-to-do-when-funds-held" element={<WhatToDoWhenFundsHeld />} />
              <Route path="/insights/chargeback-loss-recovery" element={<ChargebackLossRecovery />} />
              <Route path="/insights/marketplace-payments-guide" element={<MarketplacePaymentsGuide />} />
              <Route path="/insights/graph" element={<InsightsGraph />} />
              <Route path="/insights/scoring-logic" element={<ScoringLogic />} />
              
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
