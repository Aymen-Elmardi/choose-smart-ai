'use client'

import { useEffect, useRef } from "react";

/**
 * The fixed decorative layers behind the 2026 homepage: the two-blob gradient
 * wash, the fine noise overlay, and the cursor-following glow.
 *
 * The glow is driven imperatively via a ref + rAF rather than React state so
 * mouse movement never triggers a re-render of the page tree. It stays hidden
 * on touch devices and under prefers-reduced-motion (see globals.css).
 */
const CpAmbient = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Pointer-coarse devices have no meaningful cursor to follow.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      glow.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      glow.style.opacity = "1";
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onLeave = () => {
      glow.style.opacity = "0";
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div className="cp-ambient" aria-hidden="true" />
      <div className="cp-noise" aria-hidden="true" />
      <div className="cp-glow" ref={glowRef} aria-hidden="true" />
    </>
  );
};

export default CpAmbient;
