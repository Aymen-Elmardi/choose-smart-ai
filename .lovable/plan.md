

# Make "Payment Providers Don't Act Randomly" Section Bigger and More Visible

## Changes to `src/components/HowPaymentsWorkSection.tsx`

### Heading
- Upgrade from `text-xl md:text-2xl` to `heading-lg` (`text-3xl md:text-4xl font-bold`) to match the site's established heading hierarchy.

### Body text
- Increase from default `text-base` to `text-lg` for better readability at the larger scale.

### Cards
- Increase icon size from `h-5 w-5` to `h-7 w-7` with a colored background circle behind it (matching the reference image style).
- Increase card title from `text-sm` to `text-base`.
- Increase card description from `text-sm` to `text-base` (or `text-sm md:text-base`).
- Increase card padding from `p-6` to `p-7 md:p-8`.
- Add subtle shadow (`shadow-sm`) to cards for more visual weight.

### Container
- Widen from `max-w-3xl` to `max-w-4xl` to give the larger elements room.

No content or functionality changes.

