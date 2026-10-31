'use client'

import { useEffect, useRef } from "react";
import Link from 'next/link';

const PROCESSORS = [
  "Stripe", "Square", "PayPal", "Authorize.Net", "Clover", "Adyen", "Payline", "QuantumPay",
];

type Stat = { value: number; prefix?: string; suffix?: string; label: string };

const STATS: Stat[] = [
  { value: 50, suffix: "+", label: "US processors we compare" },
  { value: 5, suffix: " questions", label: "to your first match" },
  { value: 0, prefix: "$", label: "cost to you" },
];

const CpHero = () => {
  const statsRef = useRef<HTMLDivElement>(null);

  // Count each stat up once, when the row first scrolls into view.
  useEffect(() => {
    const row = statsRef.current;
    if (!row) return;
    const nums = Array.from(row.querySelectorAll<HTMLElement>("[data-count]"));
    if (!nums.length) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const settle = (el: HTMLElement) => {
      el.textContent = `${el.dataset.prefix ?? ""}${el.dataset.count}${el.dataset.suffix ?? ""}`;
    };

    if (reduced || typeof IntersectionObserver === "undefined") {
      nums.forEach(settle);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          io.unobserve(el);

          const target = Number(el.dataset.count ?? 0);
          const prefix = el.dataset.prefix ?? "";
          const suffix = el.dataset.suffix ?? "";
          const step = Math.max(1, Math.round(target / 40));
          let cur = 0;
          const tick = () => {
            cur += step;
            if (cur >= target) {
              settle(el);
              return;
            }
            el.textContent = `${prefix}${cur}${suffix}`;
            requestAnimationFrame(tick);
          };
          tick();
        });
      },
      { threshold: 0.5 }
    );

    nums.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <section className="cp-hero">
      <div className="cp-hero-grid" aria-hidden="true" />
      <div className="cp-wrap cp-hero-inner">
        <div className="cp-eyebrow">
          <span className="cp-dot" aria-hidden="true" /> Independent payment advisory for US businesses
        </div>

        <h1 className="cp-hero-h1">
          Find the right <em>payment processor</em> for your business
        </h1>

        <p className="cp-hero-sub">
          Switching, comparing, or just rejected? We match you with the processor built for your
          business type, your volume and your risk profile. Free, and we negotiate your rates for you.
        </p>

        <div className="cp-hero-ctas">
          <Link href="/assessment" className="cp-btn cp-btn-primary">
            Find my processor <span className="cp-arrow" aria-hidden="true">→</span>
          </Link>
          <Link href="/contact" className="cp-btn cp-btn-ghost">Write to us</Link>
          <p className="cp-stat-label w-full -mt-2">5 questions. About 30 seconds.</p>
        </div>

        <div className="cp-hero-stats" ref={statsRef}>
          {STATS.map((s) => (
            <div key={s.label}>
              <div
                className="cp-stat-num"
                data-count={s.value}
                data-prefix={s.prefix ?? ""}
                data-suffix={s.suffix ?? ""}
              >
                {/* Server-rendered final value, so the number is correct with JS off. */}
                {`${s.prefix ?? ""}${s.value}${s.suffix ?? ""}`}
              </div>
              <div className="cp-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="cp-logo-strip">
        <p className="cp-stat-label text-center mb-5">We compare processors including</p>
        <div className="cp-marquee">
          <div className="cp-marquee-track" aria-hidden="true">
            {[...PROCESSORS, ...PROCESSORS].map((name, i) => (
              <span key={`${name}-${i}`}>{name}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CpHero;
