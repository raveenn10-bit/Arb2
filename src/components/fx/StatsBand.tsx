"use client";

/** Count-up figures built only from real site data (no invented numbers). */
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function StatsBand({ stats }: { stats: { value: number; suffix?: string; label: string }[] }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const nums = el.querySelectorAll<HTMLElement>("[data-count]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      nums.forEach((n) => {
        const end = Number(n.dataset.count);
        const obj = { v: 0 };
        n.textContent = "0";
        gsap.to(obj, {
          v: end,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => (n.textContent = String(Math.round(obj.v))),
        });
      });
      gsap.from(el.querySelectorAll("[data-stat]"), {
        rotateX: -70,
        y: 40,
        opacity: 0,
        transformOrigin: "50% 100%",
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={root} className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 [perspective:900px] lg:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} data-stat className="relative bg-navy-900 px-5 py-8 sm:px-8 sm:py-10">
          <div className="font-display text-5xl font-extrabold tabular-nums text-white sm:text-6xl">
            <span data-count={s.value}>{s.value}</span>
            {s.suffix && <span className="text-brand-light">{s.suffix}</span>}
          </div>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-white/60">{s.label}</p>
          <span className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand/25 blur-3xl" aria-hidden="true" />
        </div>
      ))}
    </div>
  );
}
