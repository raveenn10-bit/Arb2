"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface MobileAutoTrackProps {
  children: ReactNode;
  desktopGridClass: string;
  speedPxPerSec?: number;
}

/**
 * On mobile (< 768px), automatically scrolls horizontal cards smoothly from left to right
 * at a steady normal speed using a float accumulator (preventing integer scrollLeft rounding)
 * and without CSS scroll-snap interference. Pauses on touch/hover.
 */
export function MobileAutoTrack({
  children,
  desktopGridClass,
  speedPxPerSec = 55,
}: MobileAutoTrackProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let rafId = 0;
    let lastTime = performance.now();
    let floatPos = el.scrollLeft;

    const step = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (!paused && window.innerWidth < 768 && el.scrollWidth > el.clientWidth) {
        floatPos += speedPxPerSec * dt;
        if (floatPos >= el.scrollWidth - el.clientWidth - 1) {
          floatPos = 0;
        }
        el.scrollLeft = floatPos;
      } else {
        floatPos = el.scrollLeft;
      }
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [paused, speedPxPerSec]);

  return (
    <div
      ref={trackRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setTimeout(() => setPaused(false), 1800)}
      className={`flex md:grid gap-4 overflow-x-auto md:overflow-visible pb-2 md:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${desktopGridClass}`}
    >
      {children}
    </div>
  );
}
