"use client";

import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Flame, Cable, Building2, Wrench } from "lucide-react";
import type { SceneInputs } from "./IndustrialSiteScene";

gsap.registerPlugin(ScrollTrigger);

const IndustrialSiteScene = dynamic(() => import("./IndustrialSiteScene"), { ssr: false });

const STEPS = [
  {
    icon: Flame,
    kicker: "Zone 01",
    title: "Oil & Gas",
    text: "ADNOC-compliant, CICPA-eligible crews for upstream, midstream and downstream sites: operators, riggers, fitters and HSE support.",
    href: "/services/oil-and-gas",
  },
  {
    icon: Cable,
    kicker: "Zone 02",
    title: "Mechanical & Electrical",
    text: "Pipe fitters, welders, electricians, duct men and technicians for MEP installation, testing and commissioning.",
    href: "/services/mechanical-electrical",
  },
  {
    icon: Building2,
    kicker: "Zone 03",
    title: "Civil & Construction",
    text: "Masons, steel fixers, carpenters, scaffolders and general labour for infrastructure and commercial projects.",
    href: "/services/civil-construction",
  },
  {
    icon: Wrench,
    kicker: "Zone 04",
    title: "Shutdown & Turnaround",
    text: "Fast-mobilised teams for planned shutdowns and maintenance windows, short-term or long-term, across all seven Emirates.",
    href: "/services/manpower-supply",
  },
];

/** If WebGL fails, keep the story readable on a styled backdrop */
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed)
      return <div className="h-full w-full bg-[radial-gradient(circle_at_50%_60%,#3a0a10_0%,#0b0b0b_60%)]" aria-hidden="true" />;
    return this.props.children;
  }
}

export function SiteStory3D() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = root.current;
    if (!el) return;
    // mount the WebGL scene only when the section gets close, and pause it when off-screen
    const io = new IntersectionObserver(
      ([e]) => {
        setInView(e.isIntersecting);
        if (e.isIntersecting) setMounted(true);
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(el);

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        progress.current = self.progress;
        const scaled = self.progress * (STEPS.length + 0.35) - 0.35;
        setActive(Math.max(0, Math.min(STEPS.length - 1, Math.round(scaled))));
      },
    });

    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      io.disconnect();
      st.kill();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const inputs: SceneInputs = { progress, pointer, reducedMotion: reduced };

  return (
    <section ref={root} aria-labelledby="site-story-h" className="relative bg-navy-900 text-white" style={{ height: `${STEPS.length * 100 + 60}svh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* 3D canvas */}
        <div className="absolute inset-0" aria-hidden="true">
          {mounted && (
            <SceneBoundary>
              <IndustrialSiteScene inputs={inputs} active={inView} />
            </SceneBoundary>
          )}
        </div>
        {/* legibility gradients */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-900/80 via-transparent to-navy-900/90" />
        <div className="pointer-events-none absolute inset-0 hidden lg:block bg-gradient-to-r from-transparent via-transparent to-navy-900/85" />

        <div className="container-wide relative z-10 flex h-full flex-col justify-between pb-8 pt-24 lg:pt-28">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">One partner · every site</p>
            <h2 id="site-story-h" className="mt-3 font-display text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              Workforce for every zone of your project.
            </h2>
          </div>

          {/* step cards */}
          <div className="relative lg:ml-auto lg:w-[26rem]">
            <ol className="relative">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                const on = i === active;
                return (
                  <li
                    key={s.title}
                    aria-hidden={on ? undefined : true}
                    className={`transition-all duration-500 ease-out ${on ? "relative opacity-100 translate-y-0" : "pointer-events-none absolute inset-x-0 bottom-0 opacity-0 translate-y-6"}`}
                  >
                    <div className="rounded-2xl border border-white/12 bg-black/55 p-6 shadow-[0_30px_80px_-30px_rgba(139,13,26,0.8)] backdrop-blur-xl sm:p-7">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-white shadow-[0_0_30px_rgba(255,45,67,0.45)]">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-white/60">{s.kicker}</span>
                      </div>
                      <h3 className="mt-4 font-display text-2xl font-extrabold">{s.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/75">{s.text}</p>
                      <Link
                        href={s.href}
                        tabIndex={on ? 0 : -1}
                        className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-white hover:text-brand"
                      >
                        Explore {s.title} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ol>
            {/* progress ticks */}
            <div className="mt-4 flex gap-2" aria-hidden="true">
              {STEPS.map((s, i) => (
                <span key={s.title} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i <= active ? "bg-brand-light" : "bg-white/15"}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
