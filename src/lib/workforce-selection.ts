"use client";

import { useSyncExternalStore } from "react";

/**
 * Shared workforce selection ("enquiry basket").
 * Persists in sessionStorage so selections survive normal navigation between pages,
 * and are cleared automatically when the browser tab is closed. Nothing leaves the browser.
 */

export interface SelectedRole {
  id: string;
  title: string;
  environment: string;
  qty: number;
}

const KEY = "pak-arab:workforce-selection";
export const MAX_QTY = 999;

let items: SelectedRole[] = [];
let loaded = false;
const listeners = new Set<() => void>();
const EMPTY: SelectedRole[] = [];

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.sessionStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as SelectedRole[]) : [];
    if (Array.isArray(parsed)) {
      items = parsed
        .filter((r) => r && typeof r.id === "string" && typeof r.title === "string")
        .map((r) => ({ ...r, qty: clampQty(r.qty) }));
    }
  } catch {
    items = [];
  }
}

function persist() {
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    /* storage unavailable (private mode): selection still works for this page */
  }
}

function emit() {
  persist();
  listeners.forEach((l) => l());
}

export function clampQty(n: unknown): number {
  const v = Math.round(Number(n));
  if (!Number.isFinite(v) || v < 1) return 1;
  return Math.min(v, MAX_QTY);
}

export const selection = {
  add(role: Omit<SelectedRole, "qty">, qty = 1) {
    load();
    const existing = items.find((i) => i.id === role.id);
    items = existing
      ? items.map((i) => (i.id === role.id ? { ...i, qty: clampQty(qty) } : i))
      : [...items, { ...role, qty: clampQty(qty) }];
    emit();
  },
  setQty(id: string, qty: number) {
    load();
    items = items.map((i) => (i.id === id ? { ...i, qty: clampQty(qty) } : i));
    emit();
  },
  remove(id: string) {
    load();
    items = items.filter((i) => i.id !== id);
    emit();
  },
  clear() {
    load();
    items = [];
    emit();
  },
};

function subscribe(cb: () => void) {
  load();
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      loaded = false;
      load();
      cb();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

/** React hook: current selection (empty during server render and first hydration pass). */
export function useWorkforceSelection(): SelectedRole[] {
  return useSyncExternalStore(
    subscribe,
    () => {
      load();
      return items;
    },
    () => EMPTY,
  );
}

export function totalWorkers(list: SelectedRole[]): number {
  return list.reduce((sum, r) => sum + r.qty, 0);
}

/** Plain-text lines describing the selection, for the WhatsApp message. */
export function selectionLines(list: SelectedRole[]): string[] {
  return list.map((r, i) => `${i + 1}. ${r.title} (${r.environment}) × ${r.qty}`);
}
