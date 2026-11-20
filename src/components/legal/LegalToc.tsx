"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ArrowUp } from "lucide-react";

export interface TocItem {
  id: string;
  title: string;
}

/** Tracks which numbered section is currently being read (topmost section past the header). */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const onScroll = () => {
      const offset = 140;
      let current = els[0].id;
      for (const el of els) {
        if (el.getBoundingClientRect().top - offset <= 0) current = el.id;
        else break;
      }
      // at the very bottom, mark the last section
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = els[els.length - 1].id;
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);
  return active;
}

/** Desktop: sticky contents list with active indicator. */
export function LegalTocDesktop({ items }: { items: TocItem[] }) {
  const active = useActiveSection(items.map((i) => i.id));
  return (
    <nav aria-label="Contents" className="legal-no-print sticky top-28 max-h-[calc(100svh-8rem)] overflow-y-auto pr-2">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-slate">On this page</p>
      <ol className="space-y-0.5 border-l border-line">
        {items.map((item, idx) => {
          const isActive = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`-ml-px flex gap-2 border-l-2 py-1.5 pl-3 pr-1 text-[0.8125rem] leading-snug transition-colors ${
                  isActive
                    ? "border-brand font-semibold text-navy-900"
                    : "border-transparent text-slate hover:border-line hover:text-navy-900"
                }`}
              >
                <span className="w-5 shrink-0 tabular-nums text-slate/80">{idx + 1}.</span>
                <span>{item.title}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Mobile / tablet: collapsible contents list. */
export function LegalTocMobile({ items }: { items: TocItem[] }) {
  const [open, setOpen] = useState(false);
  return (
    <nav aria-label="Contents" className="legal-no-print rounded-lg border border-line bg-mist/60">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="legal-toc-mobile"
        onClick={() => setOpen((o) => !o)}
        className="flex min-h-12 w-full items-center justify-between gap-3 px-4 text-left text-sm font-semibold text-navy-900"
      >
        <span>Contents ({items.length} sections)</span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      {open && (
        <ol id="legal-toc-mobile" className="space-y-0.5 border-t border-line px-2 py-2">
          {items.map((item, idx) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center gap-2 rounded-md px-2 text-sm text-navy-900 hover:bg-white"
              >
                <span className="w-6 shrink-0 tabular-nums text-slate">{idx + 1}.</span>
                <span>{item.title}</span>
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
}

/** Small back-to-top button that appears after scrolling (stacked above the floating WhatsApp button). */
export function LegalBackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <a
      href="#top"
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      aria-hidden={show ? undefined : true}
      className={`legal-no-print fixed bottom-[calc(5.25rem+env(safe-area-inset-bottom))] right-[1.375rem] z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white text-navy-900 shadow-md transition-[opacity,transform] duration-200 hover:border-navy-900 md:bottom-[5.5rem] md:right-[1.625rem] ${
        show ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-2"
      }`}
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </a>
  );
}
