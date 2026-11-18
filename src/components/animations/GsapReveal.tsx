"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GsapRevealProps {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
  bidirectional?: boolean;
}

export function GsapReveal({
  children,
  className = "",
  y = 28,
  delay = 0,
  duration = 0.65,
  bidirectional = true,
}: GsapRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: bidirectional
              ? "play reverse play reverse"
              : "play none none none",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [y, delay, duration, bidirectional]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
