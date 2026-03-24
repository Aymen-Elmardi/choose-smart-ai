

# Increase Font Sizes to Match Enterprise Payment Sites

## Analysis
Checkout.com and Adyen both use larger typography than ChosePayments currently does:
- **Body text**: ~18px base (vs current 16px default)
- **Subheadings**: Noticeably larger section titles
- **Nav links**: ~16px (vs current 14px / `text-sm`)
- **Hero subtitles**: ~20-22px (vs current 18-20px)

## Changes

### 1. Global base font size (`src/index.css`)
- Set `html` font-size to `17px` on mobile, `18px` on desktop via a simple media query. This scales everything proportionally since Tailwind's `text-*` classes use `rem`.

### 2. Heading scale (`src/index.css`)
- `.heading-xl`: Bump from `text-4xl md:text-5xl lg:text-6xl` to `text-5xl md:text-6xl lg:text-7xl`
- `.heading-lg`: Bump from `text-3xl md:text-4xl` to `text-4xl md:text-5xl`
- `.heading-md`: Bump from `text-xl md:text-2xl` to `text-2xl md:text-3xl`

### 3. Navigation (`src/components/Header.tsx`)
- Nav links: Change from `text-sm` to `text-base`
- "Partner With Us" link: Change from `text-sm` to `text-base`

### 4. Hero section body text (`src/components/HeroSection.tsx`)
- Subtext: Bump from `text-lg md:text-xl` to `text-xl md:text-2xl`

### 5. No content or layout changes
Only font sizing is affected. All spacing, colors, and functionality remain unchanged.

### Files
- **Edit**: `src/index.css` (base font size + heading classes)
- **Edit**: `src/components/Header.tsx` (nav link sizes)
- **Edit**: `src/components/HeroSection.tsx` (hero body text)

