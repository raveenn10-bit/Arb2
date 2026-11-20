"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ArrowRight, ShieldCheck, Layers, CheckCircle2, Globe } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin);

const HERO_SLIDES = [
  {
    desktopSrc: "/images/hero/hero-desktop-crew-blue.webp",
    mobileSrc: "/images/hero/hero-mobile-crew-blue.webp",
    alt: "Pak Arab Manpower Supply crew in branded blue coveralls and hard hats at a UAE oil and gas facility",
    caption: "ADNOC & CICPA Compliant Workforce · UAE",
  },
  {
    desktopSrc: "/images/hero/hero-desktop-crew-red.webp",
    mobileSrc: "/images/hero/hero-mobile-crew-red.webp",
    alt: "Pak Arab Manpower Supply site supervisors in red coveralls reviewing work plans at a refinery at sunset",
    caption: "Oil & Gas Site Supervision & Work Planning · UAE",
  },
  {
    desktopSrc: "/images/hero/hero-desktop-scaffold-weld.webp",
    mobileSrc: "/images/hero/hero-mobile-3.jpg",
    alt: "Civil & Structural Steel Engineering Crew in the UAE",
    caption: "Civil & Structural Steel Engineering · UAE",
    // desktop shows a different photo from mobile on this slide
    desktopAlt: "Pak Arab Manpower Supply scaffolder in a safety harness and welder at work on a UAE refinery site",
    desktopCaption: "Scaffolding & Welding Crews · UAE",
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

  const [paused, setPaused] = useState(false);

  // Auto-advance every 6s; paused on hover, keyboard focus and touch, when the tab is hidden,
  // and never for visitors who prefer reduced motion (WCAG 2.2.2).
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => {
      if (!document.hidden) setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [paused]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const splits: SplitText[] = [];
    const ctx = gsap.context(() => {
      // Headline: character-by-character masked rise
      section.querySelectorAll<HTMLElement>(".hero-title").forEach((title) => {
        const split = SplitText.create(title, {
          type: "words,chars",
          mask: "words",
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.chars, {
              yPercent: 120,
              opacity: 0,
              rotate: 6,
              duration: 0.9,
              stagger: 0.022,
              ease: "expo.out",
              delay: 0.25,
            });
          },
        });
        splits.push(split);
      });

      // Kicker labels decode in
      section.querySelectorAll<HTMLElement>(".hero-kicker").forEach((el) => {
        el.style.minWidth = `${el.offsetWidth}px`;
        gsap.to(el, {
          duration: 1.3,
          delay: 0.4,
          scrambleText: {
            text: (el.textContent ?? "").trim(),
            chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            speed: 0.5,
            revealDelay: 0.3,
          },
        });
      });

      // Desktop supporting content
      gsap.from(".hero-stagger", {
        y: 28,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        delay: 0.6,
        ease: "power3.out",
        clearProps: "transform,opacity",
      });

      // Mobile supporting content
      gsap.from(".hero-m > *:not(h1)", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.09,
        delay: 0.5,
        ease: "power3.out",
        clearProps: "transform,opacity",
      });

      // Slide-progress pills breathe in
      gsap.from(".hero-pill", {
        scale: 0.6,
        opacity: 0,
        duration: 0.6,
        stagger: 0.06,
        delay: 0.9,
        ease: "back.out(2)",
        clearProps: "transform,opacity",
      });

      // Hero content drifts up & fades as you scroll past
      gsap.to(".hero-content", {
        yPercent: -18,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
      });
    }, section);

    return () => {
      splits.forEach((s) => s.revert());
      ctx.revert();
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setPaused(true);
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
    setPaused(false);
  };

  return (
    <section
      ref={sectionRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false);
      }}
      aria-roledescription="carousel"
      aria-label="Pak Arab Manpower Supply highlights"
      className="relative bg-navy-900 text-white overflow-hidden"
    >
      {/* =========================================================
          MOBILE-ONLY 9:16 VERTICAL HERO DESIGN (md:hidden)
         ========================================================= */}
      <div className="md:hidden relative w-full aspect-[9/16] max-h-[calc(100svh-4rem-3.5rem-env(safe-area-inset-bottom))] min-h-[32rem] flex flex-col justify-between overflow-hidden bg-navy-950">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="flex w-full h-full transition-transform duration-700 ease-out will-change-transform"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {HERO_SLIDES.map((slide, idx) => (
              <div key={slide.mobileSrc} className="min-w-full h-full relative shrink-0 select-none overflow-hidden">
                <Image
                  src={slide.mobileSrc}
                  alt={slide.alt}
                  fill
                  priority={idx === 0}
                  sizes="100vw"
                  className={`object-cover object-top transition-transform duration-[4500ms] ease-out ${activeSlide === idx ? "scale-100" : "scale-110"}`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent via-45% to-navy-950/95 pointer-events-none" />

        <div className="relative z-10 px-4 pt-4 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-[0.625rem] font-bold uppercase tracking-[0.12em] text-white bg-black/55 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full shadow-sm">
            <span className="h-2 w-2 rounded-full bg-brand animate-pulse" />
            <span className="truncate max-w-[11rem] min-[375px]:max-w-none">{HERO_SLIDES[activeSlide].caption}</span>
          </span>
          <div className="flex items-center gap-0.5 bg-black/45 backdrop-blur-md px-1.5 py-0.5 rounded-full border border-white/15">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.mobileSrc}
                type="button"
                onClick={() => setActiveSlide(idx)}
                aria-label={`Mobile Slide ${idx + 1}: ${slide.caption}`}
                aria-current={activeSlide === idx ? "true" : undefined}
              className="hero-pill group inline-flex h-6 min-w-6 items-center justify-center"
            >
              <span
                className={`block h-2 rounded-full transition-all duration-300 ${
                  activeSlide === idx ? "w-7 bg-brand" : "w-2 bg-white/45 group-hover:bg-white/70"
                }`}
              />
            </button>
            ))}
          </div>
        </div>

        <div className="hero-m hero-content relative z-10 px-4 pb-5 pt-6 min-[375px]:pt-10 space-y-3 min-[375px]:space-y-3.5">
          <div className="inline-flex items-center gap-2">
            <span className="h-[2px] w-6 bg-brand" />
            <span className="hero-kicker whitespace-nowrap text-[0.625rem] font-bold uppercase tracking-[0.12em] min-[375px]:tracking-[0.18em] text-white/90">
              MANPOWER SUPPLY · ABU DHABI
            </span>
          </div>

          <h1 className="hero-title font-display text-[1.75rem] min-[375px]:text-3xl font-bold leading-[1.06] tracking-tight text-white drop-shadow-sm">
            Powering Industries.
            <span className="block text-brand mt-0.5">Delivering Skilled Workforce.</span>
          </h1>

          <p className="text-xs text-white/85 leading-relaxed">
            ICV-certified supplier of Oil &amp; Gas, MEP and Civil workforce for short- and long-term
            projects across all 7 Emirates.
          </p>

          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <Link
              href="/contact#request-form"
              className="flex items-center justify-center rounded-lg bg-brand px-3.5 py-3 text-xs font-bold text-white shadow-md"
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

          <div className="pt-2.5 border-t border-white/15 grid grid-cols-2 gap-y-1.5 gap-x-3 text-[0.6875rem] font-medium text-white/90">
            <div className="flex items-center gap-1.5">
              <span className="text-brand">●</span> Skilled Workforce
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-brand">●</span> Onshore &amp; Offshore
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-brand">●</span> ISO &amp; ICV Certified
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-brand">●</span> Short &amp; Long-Term Contracts
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
              <div key={slide.desktopSrc} className="min-w-full h-full relative shrink-0 select-none overflow-hidden">
                <Image
                  src={slide.desktopSrc}
                  alt={("desktopAlt" in slide && slide.desktopAlt) || slide.alt}
                  fill
                  priority={idx === 0}
                  quality={90}
                  sizes="100vw"
                  className={`object-cover object-center transition-transform duration-[4500ms] ease-out ${activeSlide === idx ? "scale-100" : "scale-110"}`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-900/80 to-navy-900/45 pointer-events-none" />

        <div className="container-wide relative z-10 py-20">
          <div className="hero-content max-w-3xl">
            <div className="hero-stagger mb-7 inline-flex items-center gap-3 lg:mb-9">
              <span className="h-[2px] w-10 bg-brand" />
              <span className="hero-kicker text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-white/90">
                MANPOWER SUPPLY COMPANY · ABU DHABI, UAE
              </span>
            </div>

            <div role="heading" aria-level={1} className="hero-title font-display text-4xl sm:text-5xl lg:text-[4rem] font-bold leading-[1.12] tracking-tight">
              Powering Industries.
              <span className="block mt-2 lg:mt-3 text-brand">Delivering Skilled Workforce.</span>
            </div>

            <p className="hero-stagger mt-7 lg:mt-9 text-base sm:text-lg text-white/85 max-w-2xl leading-[1.75]">
              Reliable manpower solutions for oil and gas, construction, mechanical, electrical and
              industrial projects across the United Arab Emirates.
            </p>

            <div className="hero-stagger mt-9 lg:mt-11 flex flex-wrap gap-4">
              <Link
                href="/contact#request-form"
                className="inline-flex items-center gap-2 rounded-md bg-brand px-6 py-3.5 text-sm sm:text-base font-bold text-white hover:bg-brand-dark transition-colors"
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

            <div className="hero-stagger mt-10 lg:mt-12 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2" aria-label="Choose slide">
                {HERO_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.desktopSrc}
                    type="button"
                    onClick={() => setActiveSlide(idx)}
                    aria-label={`Slide ${idx + 1}: ${slide.caption}`}
                    aria-current={activeSlide === idx ? "true" : undefined}
                  className="hero-pill group inline-flex h-6 min-w-6 items-center justify-center"
                >
                  <span
                    className={`block h-2 rounded-full transition-all duration-300 ${
                      activeSlide === idx ? "w-8 bg-brand" : "w-2.5 bg-white/40 group-hover:bg-white/70"
                    }`}
                  />
                </button>
                ))}
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80 bg-black/35 backdrop-blur-sm border border-white/15 px-3 py-1 rounded-full">
                {(() => {
                  const sl = HERO_SLIDES[activeSlide];
                  return ("desktopCaption" in sl && sl.desktopCaption) || sl.caption;
                })()}
              </span>
            </div>

            <div className="hero-stagger mt-6 pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs sm:text-sm font-medium text-white/90">
              {TRUST_INDICATORS.map(({ label, icon: Icon }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-brand shrink-0" />
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
