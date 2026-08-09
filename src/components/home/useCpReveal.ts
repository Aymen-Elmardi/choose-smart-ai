'use client'

import { useEffect } from "react";

/**
 * Scroll-reveal for the 2026 design: watches every `.cp-reveal` in the page and
 * adds `.cp-in` as it enters the viewport, staggered in threes to match the
 * prototype. Elements are unobserved once revealed, so this never re-runs on
 * scroll-back.
 *
 * Two things it has to cope with:
 *  - Most sections are lazy-loaded, so they mount *after* this effect first
 *    runs. A MutationObserver picks those up as they appear.
 *  - Without IntersectionObserver (or under reduced motion) everything is shown
 *    immediately rather than left permanently invisible.
 *
 * Queries the DOM rather than taking refs because the sections are plain markup
 * ported from the prototype, each with several independently revealing children.
 */
export function useCpReveal() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const showAll = reduced || typeof IntersectionObserver === "undefined";

    const reveal = (el: Element) => el.classList.add("cp-in");

    if (showAll) {
      const showExisting = () =>
        document.querySelectorAll(".cp-reveal").forEach(reveal);
      showExisting();
      const mo = new MutationObserver(showExisting);
      mo.observe(document.body, { childList: true, subtree: true });
      return () => mo.disconnect();
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          window.setTimeout(() => reveal(el), (i % 3) * 90);
          io.unobserve(el);
        });
      },
      { threshold: 0.15 }
    );

    const seen = new WeakSet<Element>();
    const observeAll = () => {
      document.querySelectorAll(".cp-reveal").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        io.observe(el);
      });
    };

    observeAll();
    // Catch sections that mount later (lazy chunks resolving).
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, []);
}
