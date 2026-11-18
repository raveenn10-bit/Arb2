"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ClipboardList, Trash2, X, ArrowRight } from "lucide-react";
import { QtyStepper } from "./QtyStepper";
import { selection, totalWorkers, useWorkforceSelection } from "@/lib/workforce-selection";

/**
 * Sticky "selected workforce" summary, available on every page once a role is added.
 * Opens an accessible drawer to adjust quantities, remove roles, clear all, or continue to the request form.
 * Hidden on /contact, where the request form shows the same selection inline.
 */
export function SelectionTray() {
  const list = useWorkforceSelection();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const total = totalWorkers(list);
  const hidden = pathname === "/contact" || list.length === 0;

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = panelRef.current?.querySelector<HTMLElement>("button, a, input");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>("button:not([disabled]), a, input");
        if (!f.length) return;
        const a = f[0];
        const z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) {
          e.preventDefault();
          z.focus();
        } else if (!e.shiftKey && document.activeElement === z) {
          e.preventDefault();
          a.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    const trigger = triggerRef.current;
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (list.length === 0) setOpen(false);
  }, [list.length]);

  if (hidden) return null;

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-[calc(4rem+env(safe-area-inset-bottom))] z-40 flex justify-center px-3 md:bottom-6 md:justify-start md:px-6">
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
          className="pointer-events-auto flex min-h-12 items-center gap-3 rounded-full bg-navy-900 py-2 pr-2 pl-4 text-white shadow-[0_12px_32px_-8px_rgba(7,21,38,0.55)] ring-1 ring-white/10"
        >
          <ClipboardList className="h-5 w-5 text-brand" aria-hidden="true" />
          <span className="text-sm font-semibold" aria-live="polite">
            {list.length} role{list.length > 1 ? "s" : ""} · {total} worker{total > 1 ? "s" : ""}
          </span>
          <span className="rounded-full bg-brand px-3.5 py-1.5 text-xs font-bold tracking-wide uppercase">Review</span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-[60] flex items-end justify-center bg-navy-950/60 backdrop-blur-sm md:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && setOpen(false)}
          >
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="tray-title"
              initial={reduce ? { opacity: 0 } : { y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { y: 40, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex max-h-[85svh] w-full max-w-lg flex-col rounded-t-2xl bg-white shadow-2xl md:rounded-2xl"
              style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <div>
                  <h2 id="tray-title" className="text-lg font-bold text-navy-900">
                    Selected workforce
                  </h2>
                  <p className="text-sm text-slate">
                    {list.length} role{list.length > 1 ? "s" : ""} · {total} worker{total > 1 ? "s" : ""} in total
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close selected workforce"
                  className="inline-flex size-11 items-center justify-center rounded-md text-navy-900 hover:bg-mist"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
                {list.map((r) => (
                  <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 py-3.5">
                    <div className="min-w-0">
                      <p className="font-semibold text-navy-900">{r.title}</p>
                      <p className="text-xs text-slate">{r.environment}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <QtyStepper id={`tray-${r.id}`} value={r.qty} onChange={(n) => selection.setQty(r.id, n)} label={r.title} />
                      <button
                        type="button"
                        onClick={() => selection.remove(r.id)}
                        aria-label={`Remove ${r.title}`}
                        className="inline-flex size-11 items-center justify-center rounded-md text-slate hover:bg-brand/10 hover:text-brand-dark"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-2 border-t border-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => selection.clear()}
                  className="min-h-11 rounded-md px-3 text-sm font-semibold text-slate underline-offset-4 hover:text-brand-dark hover:underline"
                >
                  Clear all
                </button>
                <Link
                  href="/contact#request-form"
                  onClick={() => setOpen(false)}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-brand px-5 text-sm font-bold text-white hover:bg-brand-dark"
                >
                  Complete request
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
