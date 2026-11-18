"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ShieldCheck, Layers, CheckCircle2, Globe } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const HERO_SLIDES = [
  {
    desktopSrc: "/images/hero/hero-main.webp",
    mobileSrc: "/images/hero/hero-mobile-1.jpg",
    alt: "UAE industrial engineering workforce at sunset",
    caption: "ADNOC & CICPA Compliant Workforce · UAE",
  },
  {
    desktopSrc: "/images/hero/hero-oil-gas-mep.jpg",
    mobileSrc: "/images/hero/hero-mobile-2.jpg",
    alt: "Oil & Gas MEP & Pipefitting Crew in Abu Dhabi",
    caption: "Oil & Gas MEP & Pipefitting Crew · Abu Dhabi",
  },
  {
    desktopSrc: "/images/hero/hero-civil-construction.jpg",
    mobileSrc: "/images/hero/hero-mobile-3.jpg",
    alt: "Civil & Structural Steel Engineering Crew in the UAE",
    caption: "Civil & Structural Steel Engineering · UAE",
  },
  {
    desktopSrc: "/images/hero/hero-offshore-shutdown.jpg",
    mobileSrc: "/images/hero/hero-mobile-4.jpg",
    alt: "Offshore & Plant Turnaround Welding & HV Crew",
    caption: "Offshore & Plant Turnaround Welding & HV Crew",
  },
];

const TRUST_INDICATORS = [
  { label: "Skilled Workforce", icon: CheckCircle2 },
  { label: "Onshore & Offshore", icon: Layers },
  { label: "Quality-Focused Operations", icon: ShieldCheck },
  { label: "UAE Industry Support", icon: Globe },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-stagger", {
        y: 28,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform,opacity",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      touchStartX.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || e.changedTouches.length === 0) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 35) {
      if (diff > 0) {
        setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
      } else {
        setActiveSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
      }
    }
    touchStartX.current = null;
  };

  return (
    <section
      ref={sectionRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative bg-[#111315] text-white overflow-hidden"
    >
      {/* =========================================================
          MOBILE-ONLY 9:16 VERTICAL HERO DESIGN (md:hidden)
         ========================================================= */}
      <div className="md:hidden relative w-full aspect-[9/16] max-h-[92vh] min-h-[620px] flex flex-col justify-between overflow-hidden bg-[#0A0B0D]">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="flex w-full h-full transition-transform duration-700 ease-out will-change-transform"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {HERO_SLIDES.map((slide, idx) => (
              <div key={slide.mobileSrc} className="min-w-full h-full relative shrink-0 select-none">
                <Image
                  src={slide.mobileSrc}
                  alt={slide.alt}
                  fill
                  priority={idx === 0}
                  sizes="100vw"
                  className="object-cover object-top"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent via-45% to-[#0A0B0D]/95 pointer-events-none" />

        <div className="relative z-10 px-4 pt-4 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white bg-black/55 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#D40820] animate-pulse" />
            <span>{HERO_SLIDES[activeSlide].caption}</span>
          </span>
          <div className="flex items-center gap-1.5 bg-black/45 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/15">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.mobileSrc}
                type="button"
                onClick={() => setActiveSlide(idx)}
                aria-label={`Mobile Slide ${idx + 1}: ${slide.caption}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeSlide === idx ? "w-7 bg-[#D40820]" : "w-2 bg-white/45"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 px-4 pb-5 pt-10 space-y-3.5">
          <div className="inline-flex items-center gap-2">
            <span className="h-[2px] w-6 bg-[#D40820]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/90">
              UAE INDUSTRIAL WORKFORCE PARTNER
            </span>
          </div>

          <h1 className="font-display text-3xl font-bold leading-[1.06] tracking-tight text-white drop-shadow-sm">
            Powering Industries.
            <span className="block text-[#D40820] mt-0.5">Delivering Skilled Workforce.</span>
          </h1>

          <p className="text-xs text-white/85 leading-relaxed">
            ADNOC-compliant, CICPA-eligible Oil &amp; Gas, MEP, and Civil workforce deployed within
            24–72 hours across all 7 Emirates.
          </p>

          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <Link
              href="/contact#request-form"
              className="flex items-center justify-center rounded-lg bg-[#D40820] px-3.5 py-3 text-xs font-bold text-white shadow-md"
            >
              Request Manpower →
            </Link>
            <a
              href="https://wa.me/971553842555"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-lg border border-white/25 bg-white/10 backdrop-blur-md px-3.5 py-3 text-xs font-semibold text-white"
            >
              WhatsApp Desk
            </a>
          </div>

          <div className="pt-2.5 border-t border-white/15 grid grid-cols-2 gap-y-1.5 gap-x-3 text-[11px] font-medium text-white/90">
            <div className="flex items-center gap-1.5">
              <span className="text-[#D40820]">●</span> Skilled Workforce
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#D40820]">●</span> Onshore &amp; Offshore
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#D40820]">●</span> ISO &amp; ICV Certified
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#D40820]">●</span> 24–72h Mobilization
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          DESKTOP 16:9 WIDESCREEN HERO DESIGN (hidden md:flex)
         ========================================================= */}
      <div className="hidden md:flex relative min-h-[82vh] items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="flex w-full h-full transition-transform duration-700 ease-out will-change-transform"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {HERO_SLIDES.map((slide, idx) => (
              <div key={slide.desktopSrc} className="min-w-full h-full relative shrink-0 select-none">
                <Image
                  src={slide.desktopSrc}
                  alt={slide.alt}
                  fill
                  priority={idx === 0}
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-[#111315]/95 via-[#111315]/80 to-[#111315]/45 pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 py-20 w-full">
          <div className="max-w-3xl space-y-6">
            <div className="hero-stagger inline-flex items-center gap-3">
              <span className="h-[2px] w-10 bg-[#D40820]" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-white/90">
                INDUSTRIAL WORKFORCE SOLUTIONS · UAE
              </span>
            </div>

            <h1 className="hero-stagger font-display text-4xl sm:text-5xl lg:text-[64px] font-bold leading-[1.03] tracking-tight">
              Powering Industries.
              <span className="block mt-1 text-[#D40820]">Delivering Skilled Workforce.</span>
            </h1>

            <p className="hero-stagger text-base sm:text-lg text-white/85 max-w-2xl leading-relaxed">
              Reliable manpower solutions for oil and gas, construction, mechanical, electrical and
              industrial projects across the United Arab Emirates.
            </p>

            <div className="hero-stagger flex flex-wrap gap-4 pt-2">
              <Link
                href="/contact#request-form"
                className="inline-flex items-center gap-2 rounded-md bg-[#D40820] px-6 py-3.5 text-sm sm:text-base font-bold text-white hover:bg-[#A40E21] transition-colors"
              >
                Request Manpower
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/5 px-6 py-3.5 text-sm sm:text-base font-semibold text-white hover:bg-white/15 transition-colors"
              >
                Explore Our Services
              </Link>
            </div>

            <div className="hero-stagger pt-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2" role="tablist" aria-label="Hero Workforce Slides">
                {HERO_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.desktopSrc}
                    type="button"
                    onClick={() => setActiveSlide(idx)}
                    aria-label={`Slide ${idx + 1}: ${slide.caption}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeSlide === idx ? "w-8 bg-[#D40820]" : "w-2.5 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80 bg-black/35 backdrop-blur-sm border border-white/15 px-3 py-1 rounded-full">
                {HERO_SLIDES[activeSlide].caption}
              </span>
            </div>

            <div className="hero-stagger pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs sm:text-sm font-medium text-white/90">
              {TRUST_INDICATORS.map(({ label, icon: Icon }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-[#D40820] shrink-0" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
