// Logo mark and browser icons, in one place so a seasonal logo is a single
// switch. Set SEASONAL_LOGO to null to go back to the everyday logo.
//
// Seasonal files live under their own folder with new names: favicon.ico and
// apple-touch-icon.png are cached for a year (public/_headers), so overwriting
// them would neither reach returning visitors nor go away after the season.
//
// favicon.png is not part of this: it is the logo in the Organization and
// Article JSON-LD, and stays the everyday mark.

interface LogoSet {
  mark: { src: string; width: number; height: number };
  icons: {
    png32: string;
    png16: string;
    ico: string;
    apple: string;
  };
}

const EVERYDAY: LogoSet = {
  mark: { src: "/logo-mark.png", width: 176, height: 192 },
  icons: {
    png32: "/favicon-32x32.png",
    png16: "/favicon-16x16.png",
    ico: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

const HALLOWEEN_2026: LogoSet = {
  mark: { src: "/halloween-2026/logo-mark.webp", width: 104, height: 104 },
  icons: {
    png32: "/halloween-2026/favicon-32x32.png",
    png16: "/halloween-2026/favicon-16x16.png",
    ico: "/halloween-2026/favicon.ico",
    apple: "/halloween-2026/apple-touch-icon.png",
  },
};

/** Halloween 2026 logo. Set to null after the season. */
const SEASONAL_LOGO: LogoSet | null = HALLOWEEN_2026;

export const LOGO: LogoSet = SEASONAL_LOGO ?? EVERYDAY;

/** True while a seasonal logo is active (square mark, rounded corners). */
export const IS_SEASONAL_LOGO = SEASONAL_LOGO !== null;
