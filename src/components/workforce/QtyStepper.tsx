"use client";

import { Minus, Plus } from "lucide-react";
import { MAX_QTY, clampQty } from "@/lib/workforce-selection";

/** Accessible quantity stepper: 44px touch targets, direct typing, clamped 1–999. */
export function QtyStepper({
  id,
  value,
  onChange,
  label,
  tone = "light",
}: {
  id: string;
  value: number;
  onChange: (n: number) => void;
  label: string;
  tone?: "light" | "dark";
}) {
  const btn =
    tone === "dark"
      ? "text-white hover:bg-white/10 disabled:opacity-35"
      : "text-navy-900 hover:bg-mist disabled:opacity-35";
  return (
    <div
      role="group"
      aria-label={`Quantity for ${label}`}
      className={`inline-flex items-center rounded-md border ${tone === "dark" ? "border-white/25" : "border-line"} bg-transparent`}
    >
      <button
        type="button"
        onClick={() => onChange(clampQty(value - 1))}
        disabled={value <= 1}
        aria-label={`Decrease ${label} quantity`}
        className={`inline-flex size-11 items-center justify-center rounded-l-md transition-colors ${btn}`}
      >
        <Minus className="h-4 w-4" aria-hidden="true" />
      </button>
      <label htmlFor={id} className="sr-only">
        Number of {label}
      </label>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        min={1}
        max={MAX_QTY}
        value={value}
        onChange={(e) => onChange(clampQty(e.target.value))}
        className={`h-11 w-12 border-x text-center text-sm font-bold [appearance:textfield] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${
          tone === "dark" ? "border-white/25 bg-transparent text-white" : "border-line bg-white text-navy-900"
        }`}
      />
      <button
        type="button"
        onClick={() => onChange(clampQty(value + 1))}
        disabled={value >= MAX_QTY}
        aria-label={`Increase ${label} quantity`}
        className={`inline-flex size-11 items-center justify-center rounded-r-md transition-colors ${btn}`}
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
