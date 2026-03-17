

# Diagnostic Button Coverage Analysis

## How the search works
The filter uses simple `includes()` matching on title + description. URL `+` signs decode to spaces, so `q=frozen+hold` searches for the literal substring **"frozen hold"** — not "frozen" OR "hold". This is a problem for several buttons.

## Button-by-button breakdown

### 1. Funds on hold → `?q=frozen+hold&filter=crisis`
**Result: ~0 articles.** No crisis article contains the exact phrase "frozen hold" in its title or description. The Stripe frozen article says "Funds frozen" and "account freezes" but never "frozen hold" together. This button likely shows an empty state.

### 2. Reserve imposed → `?q=reserve&filter=risk`
**Result: 0 articles.** No risk-category article mentions "reserve" in its title or description. The scheme-rules-reserves-monitoring article covers reserves but is categorized as **compliance**, not risk.

### 3. Unexpected fees → `?filter=fees`
**Result: 5 articles.** Full coverage (Stripe, Adyen, Checkout.com, Fiserv/Clover, PayPal). This button works well.

### 4. Lost a chargeback → `?q=chargeback`
**Result: ~3 articles.** Matches the chargebacks guide, chargeback thresholds (ecommerce), and high-chargeback processors (provider-fit). Decent coverage.

### 5. Payout mismatch → `?q=acquirer+payout`
**Result: 0 articles.** Searches for "acquirer payout" as a literal phrase. No article contains this exact substring. The acquirer explainer and same-day settlement articles are close but don't match.

---

## Summary of gaps

| Button | Articles shown | Status |
|---|---|---|
| Funds on hold | ~0 | **Broken** (search string mismatch) |
| Reserve imposed | 0 | **Broken** (wrong category + no keyword match) |
| Unexpected fees | 5 | Good |
| Lost a chargeback | ~3 | Adequate |
| Payout mismatch | 0 | **Broken** (search string mismatch) |

## Two separate problems to fix

### Problem 1: Search routing is broken (code fix, no new content needed)
The `+` in URLs creates phrase searches that don't match. Routes need to be changed to use simpler queries or category filters that actually return results. For example:
- **Funds on hold** → `?q=frozen&filter=crisis` (matches "Funds frozen" in Stripe article)
- **Reserve imposed** → `?q=reserve` (drops the filter, matches scheme-rules-reserves-monitoring)
- **Payout mismatch** → `?q=payout` (matches same-day-settlement, acquirer articles)

### Problem 2: Thin content clusters (new articles needed)
Even after fixing routes:
- **Funds on hold / crisis**: Only 3 crisis articles total. Could use 1-2 more (e.g., "What to Do When Your Payment Provider Holds Funds", "Rolling Reserves Explained")
- **Reserve imposed**: Only 1 article (scheme-rules-reserves-monitoring) directly covers reserves. Needs 1-2 dedicated articles (e.g., "Why Payment Providers Impose Reserves and How to Negotiate Them", "Rolling Reserve vs Fixed Reserve: What Merchants Need to Know")
- **Payout mismatch**: Only tangential coverage. Needs 1-2 articles (e.g., "Why Your Payout Doesn't Match Your Sales: Settlement Timing Explained", "Net vs Gross Settlement: How Payment Providers Calculate Your Payout")
- **Lost a chargeback**: 3 articles is adequate but could use one more focused piece (e.g., "You Lost a Chargeback: What Happens Next and How to Respond")

### Recommended implementation
1. **First**: Fix the diagnostic routes so existing articles surface correctly
2. **Then**: Prioritize new articles for reserves (0 dedicated) and payouts (0 dedicated) since those buttons currently show nothing even with fixed search

