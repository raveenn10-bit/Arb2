"use client";

/** Huge outlined/solid crimson words that drift and skew with scroll velocity. */
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WORDS = ["Oil & Gas", "MEP", "Civil", "Shutdown", "Onshore", "Offshore", "Abu Dhabi", "7 Emirates"];

export function KineticMarquee() {
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = track.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const loop = gsap.to(el, { xPercent: -50, ease: "none", duration: 38, repeat: -1 });
    const skew = gsap.quickTo(el, "skewX", { duration: 0.4, ease: "power3" });
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const v = self.getVelocity();
        loop.timeScale(1 + Math.min(Math.abs(v) / 600, 4) * (v < 0 ? -1 : 1));
        skew(gsap.utils.clamp(-8, 8, v / -260));
      },
    });
    return () => {
      loop.kill();
      st.kill();
    };
  }, []);
  const row = [...WORDS, ...WORDS];
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-navy-950 py-6 sm:py-8" aria-hidden="true">
      <div ref={track} className="flex w-max items-center gap-10 whitespace-nowrap will-change-transform">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className={`font-display text-5xl font-extrabold uppercase tracking-tight sm:text-7xl lg:text-8xl ${i % 2 ? "text-outline-crimson" : "text-mist"}`}>{w}</span>
            <span className="h-3 w-3 rotate-45 bg-brand shadow-[0_0_24px_rgba(255,45,67,0.8)]" />
          </span>
        ))}
      </div>
    </div>
  );
}
