"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin);

/**
 * Site-wide scroll animations applied to every page's <main> content.
 * Opt out on any element (and its subtree) with data-no-anim.
 *
 *  - Section headings (h2): line-by-line masked text reveal (SplitText)
 *  - Eyebrow labels: letter-spacing + fade in
 *  - Red accent rules: draw in from the left
 *  - Card grids: staggered rise-in, batched per row
 *  - Content photos: clip-path wipe reveal + gentle scroll parallax
 *  - Card icons: pop in with a slight rotation
 */
export function PageAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    const main = document.getElementById("main-content");
    if (!main) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const skip = (el: Element) => !!el.closest("[data-no-anim]");
    // first section on each page is the hero / page hero — leave it to its own animation
    const firstSection = main.querySelector("section");
    const inScope = (el: Element) => !skip(el) && !(firstSection && firstSection.contains(el));
    const all = <T extends Element>(sel: string) =>
      Array.from(main.querySelectorAll<T>(sel)).filter(inScope);

    const splits: SplitText[] = [];

    const ctx = gsap.context(() => {
      // 0. Inner-page hero banner — intro timeline on load
      const pageHero = main.querySelector<HTMLElement>("[data-page-hero]");
      if (pageHero) {
        const h1 = pageHero.querySelector<HTMLElement>("h1");
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from(pageHero.querySelectorAll("nav > span"), { opacity: 0, x: -12, duration: 0.6, stagger: 0.06 })
          .to(pageHero.querySelector("p"), {
            duration: 1.1,
            scrambleText: {
              text: pageHero.querySelector("p")?.textContent?.trim() ?? "",
              chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
              speed: 0.6,
              revealDelay: 0.25,
            },
          }, "<0.1");
        if (h1) {
          const split = SplitText.create(h1, { type: "words,chars", mask: "words" });
          splits.push(split);
          tl.from(split.chars, { yPercent: 115, opacity: 0, rotate: 8, duration: 0.9, stagger: 0.02 }, "<0.1");
        }
        tl.from(pageHero.querySelectorAll("h1 ~ p"), { opacity: 0, y: 20, duration: 0.8 }, "<0.3")
          .from(pageHero.querySelector(".page-hero-glow"), { opacity: 0, scale: 0.6, duration: 1.6, ease: "power2.out" }, 0);
        gsap.to(pageHero.querySelector(".page-hero-glow"), {
          xPercent: -15,
          yPercent: 10,
          duration: 6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      // 1. Headings — masked line reveal
      all<HTMLElement>("h2").forEach((h) => {
        const split = SplitText.create(h, {
          type: "lines,words,chars",
          mask: "lines",
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.chars, {
              yPercent: 110,
              opacity: 0,
              rotate: 4,
              duration: 0.8,
              stagger: { each: 0.016, from: "start" },
              ease: "expo.out",
              scrollTrigger: { trigger: h, start: "top 88%", once: true },
            });
          },
        });
        splits.push(split);
      });

      // 2. Eyebrow labels (small red uppercase kickers)
      all<HTMLElement>('[class*="tracking-[0.18em]"], [class*="tracking-[0.2em]"]')
        .filter((el) => el.children.length === 0 && (el.textContent ?? "").trim().length > 0)
        .forEach((el) => {
          const finalText = (el.textContent ?? "").trim();
          // lock width so the line doesn't jump while letters decode
          el.style.minWidth = `${el.offsetWidth}px`;
          gsap.to(el, {
            duration: 1.2,
            scrambleText: {
              text: finalText,
              chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
              speed: 0.5,
              revealDelay: 0.15,
            },
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
            onComplete: () => {
              el.textContent = finalText;
              el.style.minWidth = "";
            },
          });
        });

      // 1b. Card titles — light word-by-word reveal
      all<HTMLElement>("h3").forEach((h) => {
        const split = SplitText.create(h, { type: "words", mask: "words", autoSplit: true,
          onSplit(self) {
            return gsap.from(self.words, {
              yPercent: 100,
              duration: 0.7,
              stagger: 0.05,
              ease: "power3.out",
              scrollTrigger: { trigger: h, start: "top 92%", once: true },
            });
          },
        });
        splits.push(split);
      });

      // 3. Accent rules
      all<HTMLElement>('span[class*="h-[2px]"]').forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.8,
          ease: "power3.inOut",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });

      // 4. Card grids — staggered rise-in
      const gridItems = all<HTMLElement>(".grid > *").filter(
        (el) => (el.parentElement?.children.length ?? 0) >= 3
      );
      if (gridItems.length) {
        gsap.set(gridItems, { opacity: 0, y: 40 });
        ScrollTrigger.batch(gridItems, {
          start: "top 92%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.08,
              ease: "power3.out",
              clearProps: "transform",
            }),
        });
      }

      // 5. Card icons — pop in
      all<HTMLElement>('[class*="rounded-lg"][class*="bg-[#D40820]/10"]').forEach((el) => {
        gsap.from(el, {
          scale: 0.4,
          rotate: -15,
          opacity: 0,
          duration: 0.7,
          ease: "back.out(2)",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      // 6. Content photos — wipe reveal + parallax
      all<HTMLImageElement>("section img").forEach((img) => {
        const box = img.parentElement;
        if (!box || img.classList.contains("object-contain")) return;
        if (!/(relative|absolute)/.test(box.className)) return;
        // only larger photos (skip logos / icons)
        if (box.getBoundingClientRect().width < 220) return;

        gsap.fromTo(
          box,
          { clipPath: "inset(12% 8% 12% 8% round 12px)", opacity: 0.4 },
          {
            clipPath: "inset(0% 0% 0% 0% round 12px)",
            opacity: 1,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: { trigger: box, start: "top 88%", once: true },
          }
        );
        gsap.fromTo(
          img,
          { scale: 1.18, yPercent: -5 },
          {
            scale: 1.18,
            yPercent: 5,
            ease: "none",
            scrollTrigger: { trigger: box, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });
    }, main);

    // recalc positions once images / fonts settle
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = window.setTimeout(refresh, 600);

    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(t);
      splits.forEach((s) => s.revert());
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
