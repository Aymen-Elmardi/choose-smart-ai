

# Fix: Limit "Not Suited" providers to curated list

## Problem
The server-side recommendation engine (`quiz-recommendation` edge function) has 21 providers in its `PROVIDER_REGISTRY`, but your actual curated provider list is smaller. The "Not Suited for Your Business" section shows providers like Klarna, Mollie, GoCardless, Trust Payments, etc. that shouldn't appear.

## Solution
Filter the `avoid` list on the client side in `Recommendation.tsx` to only show providers that match your curated set. This is the simplest, least-risky fix.

## Curated provider list (from your recommendation logic)
UK: Stripe, Square, PayPal, Adyen, Datman, SumUp, Braintree, Shift4
US: Stripe, Square, Datman, Fiserv (Clover), Authorize.Net, Shift4

## Change

### `src/pages/Recommendation.tsx`
- Add a `CURATED_PROVIDERS` constant with the names above
- After receiving `avoid` from the server, filter it: `avoid.filter(p => CURATED_PROVIDERS.includes(p.name))`
- This ensures only recognized providers appear in the "Not Suited" section

Single file, ~5 lines added.

