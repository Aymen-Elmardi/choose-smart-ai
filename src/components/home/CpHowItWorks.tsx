'use client'

import { useEffect, useRef } from "react";
import Link from 'next/link';

const STEPS = [
  {
    num: "01",
    title: "Answer 5 quick questions",
    body: "Your business type, monthly volume, current processor and what's going wrong. It takes about 30 seconds.",
  },
  {
    num: "02",
    title: "We compare processors for you",
    body: "We check your answers against 50+ US processors and narrow it to the two or three that fit. Then we walk you through the real costs on a free 15-minute call.",
  },
  {
    num: "03",
    title: "We negotiate and help you switch",
    body: "We negotiate your rates, help with the application, and make sure the new account is ready before you move a single payment.",
  },
];

const CpHowItWorks = () => {
  const rowRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numRefs = useRef<(HTMLDivElement | null)[]>([]);
  const seg12Ref = useRef<HTMLDivElement>(null);
  const seg23Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = rowRef.current;
    const seg12 = seg12Ref.current;
    const seg23 = seg23Ref.current;
    if (!row || !seg12 || !seg23) return;

    // Measure the real circle positions and pin each segment between them.
    // Kept as a measured layout (rather than percentage CSS) deliberately:
    // the percentage approach did not render reliably across breakpoints.
    const positionSegs = () => {
      const [n1, n2, n3] = numRefs.current;
      if (window.innerWidth <= 900 || !n1 || !n2 || !n3) return;
      const rowRect = row.getBoundingClientRect();
      const c1 = n1.getBoundingClientRect();
      const c2 = n2.getBoundingClientRect();
      const c3 = n3.getBoundingClientRect();
      const cy = c1.top - rowRect.top + c1.height / 2 - 1;

      seg12.style.top = `${cy}px`;
      seg12.style.left = `${c1.right - rowRect.left}px`;
      seg12.style.setProperty("--cp-seg-full", `${Math.max(0, c2.left - c1.right)}px`);

      seg23.style.top = `${cy}px`;
      seg23.style.left = `${c2.right - rowRect.left}px`;
      seg23.style.setProperty("--cp-seg-full", `${Math.max(0, c3.left - c2.right)}px`);
    };

    positionSegs();
    window.addEventListener("resize", positionSegs);
    window.addEventListener("load", positionSegs);
    // Web fonts change the circle metrics, so re-measure once they land.
    if (document.fonts?.ready) document.fonts.ready.then(positionSegs).catch(() => {});

    const bounce = (el: HTMLElement | null) => {
      if (!el) return;
      el.classList.remove("cp-bounce");
      void el.offsetWidth; // force reflow so the animation can restart
      el.classList.add("cp-bounce");
    };

    const timers: number[] = [];
    let played = false;

    const play = () => {
      if (played) return;
      played = true;
      timers.push(
        window.setTimeout(() => {
          positionSegs();
          stepRefs.current[0]?.classList.add("cp-active");
          bounce(numRefs.current[0]);
          seg12.classList.add("cp-grow");

          timers.push(
            window.setTimeout(() => {
              stepRefs.current[1]?.classList.add("cp-active");
              bounce(numRefs.current[1]);
              seg23.classList.add("cp-grow");
            }, 850)
          );
          timers.push(
            window.setTimeout(() => {
              stepRefs.current[2]?.classList.add("cp-active");
              bounce(numRefs.current[2]);
            }, 1650)
          );
        }, 350)
      );
    };

    let io: IntersectionObserver | undefined;
    if (typeof IntersectionObserver === "undefined") {
      play();
    } else {
      io = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && play()),
        { threshold: 0.15 }
      );
      io.observe(row);
    }

    return () => {
      window.removeEventListener("resize", positionSegs);
      window.removeEventListener("load", positionSegs);
      timers.forEach(clearTimeout);
      io?.disconnect();
    };
  }, []);

  return (
    <section id="how" className="cp-section">
      <div className="cp-wrap">
        <div className="cp-section-head cp-reveal">
          <span className="cp-section-tag">The process</span>
          <h2>How we find your payment processor</h2>
        </div>

        <div className="cp-steps" ref={rowRef}>
          <div className="cp-line-seg" ref={seg12Ref} aria-hidden="true" />
          <div className="cp-line-seg" ref={seg23Ref} aria-hidden="true" />
          {STEPS.map((step, i) => (
            <div
              className="cp-step cp-reveal"
              key={step.num}
              ref={(el) => { stepRefs.current[i] = el; }}
            >
              <div className="cp-step-num" ref={(el) => { numRefs.current[i] = el; }}>
                {step.num}
              </div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          ))}
        </div>

        <div className="cp-how-cta cp-reveal">
          <Link href="/assessment" className="cp-btn cp-btn-primary">
            Find my processor
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CpHowItWorks;
