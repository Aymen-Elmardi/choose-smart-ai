// Which page a lead started on, and which page they were reading before they
// opened /contact. Kept in sessionStorage so it survives client-side
// navigation and is gone when the tab closes.

import { STORAGE_KEYS } from "./sessionTracking";

const PREVIOUS_PAGE_KEY = "cp_previousPagePath";

const read = (key: string) => {
  try {
    return sessionStorage.getItem(key) || "";
  } catch {
    return "";
  }
};

const write = (key: string, value: string) => {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    // Storage blocked (private mode, disabled cookies): attribution is lost,
    // the page still works.
  }
};

/** Call on every page view. The first one in a session is the landing page. */
export const recordPageView = (pathname: string) => {
  if (!read(STORAGE_KEYS.LANDING_PAGE)) {
    write(STORAGE_KEYS.LANDING_PAGE, window.location.href);
  }
  if (pathname !== "/contact") {
    write(PREVIOUS_PAGE_KEY, pathname);
  }
};

export const getLeadAttribution = () => ({
  /** Full first-touch URL, including any UTM or click-id query string. */
  landingPage: read(STORAGE_KEYS.LANDING_PAGE),
  /** Path of the last page viewed before /contact. */
  previousPage: read(PREVIOUS_PAGE_KEY),
});
