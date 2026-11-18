"use client";

import { useEffect, useRef } from "react";

export function VantaNetBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmallOrLowPower = window.innerWidth < 768 || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2);
    if (prefersReduced || isSmallOrLowPower) return;

    let vantaEffect: { destroy: () => void } | null = null;
    let cancelled = false;

    async function initVanta() {
      try {
        const THREE = await import("three");
        const VANTA = await import("vanta/dist/vanta.net.min");
        if (cancelled || !el) return;
        const Net = VANTA.default || VANTA;
        vantaEffect = Net({
          el,
          THREE,
          mouseControls: true,
          touchControls: false,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0xd40820,
          backgroundColor: 0x111315,
          points: 9.0,
          maxDistance: 21.0,
          spacing: 17.0,
          showDots: true,
        });
      } catch {
        // Static dark industrial fallback remains visible if WebGL is unavailable
      }
    }

    initVanta();

    return () => {
      cancelled = true;
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-[#111315] opacity-70"
    />
  );
}
