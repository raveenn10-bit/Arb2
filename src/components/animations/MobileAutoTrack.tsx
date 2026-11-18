"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface MobileAutoTrackProps {
  children: ReactNode;
  desktopGridClass: string;
  speedPxPerSec?: number;
}

/**
 * On mobile (< 768px), gently auto-scrolls a horizontal card row.
 * Performance: the animation loop only runs while the row is on screen and the tab is visible,
 * and track dimensions are cached instead of being read every frame.
 * Accessibility: pauses on hover, touch and keyboard focus; disabled for reduced motion.
 */
export function MobileAutoTrack({ children, desktopGridClass, speedPxPerSec = 55 }: MobileAutoTrackProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const mobile = window.matchMedia("(max-width: 767px)");

    let rafId = 0;
    let running = false;
    let visible = false;
    let paused = false;
    let resumeTimer = 0;
    let lastTime = 0;
    let floatPos = el.scrollLeft;
    let maxScroll = 0;

    const measure = () => {
      maxScroll = el.scrollWidth - el.clientWidth;
    };

    const step = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      if (!paused && maxScroll > 1) {
        floatPos += speedPxPerSec * dt;
        if (floatPos >= maxScroll - 1) floatPos = 0;
        el.scrollLeft = floatPos;
      }
      rafId = requestAnimationFrame(step);
    };

    const start = () => {
      if (running || !visible || !mobile.matches || document.hidden) return;
      running = true;
      measure();
      floatPos = el.scrollLeft;
      lastTime = performance.now();
      rafId = requestAnimationFrame(step);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };
    const sync = () => (visible && mobile.matches && !document.hidden ? start() : stop());

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    io.observe(el);

    const pause = () => {
      window.clearTimeout(resumeTimer);
      paused = true;
    };
    const resumeLater = (ms: number) => {
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => {
        floatPos = el.scrollLeft;
        paused = false;
      }, ms);
    };
    const onLeave = () => resumeLater(0);
    const onTouchEnd = () => resumeLater(1800);
    const onFocusOut = (e: FocusEvent) => {
      if (!el.contains(e.relatedTarget as Node)) resumeLater(0);
    };

    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("focusin", pause);
    el.addEventListener("focusout", onFocusOut);
    document.addEventListener("visibilitychange", sync);
    mobile.addEventListener("change", sync);
    window.addEventListener("resize", measure, { passive: true });

    return () => {
      stop();
      io.disconnect();
      window.clearTimeout(resumeTimer);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("focusin", pause);
      el.removeEventListener("focusout", onFocusOut);
      document.removeEventListener("visibilitychange", sync);
      mobile.removeEventListener("change", sync);
      window.removeEventListener("resize", measure);
    };
  }, [speedPxPerSec]);

  return (
    <div
      ref={trackRef}
      className={`flex md:grid gap-4 overflow-x-auto md:overflow-visible pb-2 md:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${desktopGridClass}`}
    >
      {children}
    </div>
  );
}
