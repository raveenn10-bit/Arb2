"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { COMPANY } from "@/data/company";

// www.google.com directly (maps.google.com 301-redirects, which crawlers report as a redirection error)
const EMBED = `https://www.google.com/maps?q=${encodeURIComponent(COMPANY.office.mapsEmbedQuery)}&z=16&output=embed`;

/**
 * Click-to-load Google map ("facade"): no third-party iframe until a visitor asks for it.
 * Googlebot never loads Google's embed resources (no blocked/redirect warnings) and the page loads faster.
 */
export function MapFrame({ tone = "mono", className = "" }: { tone?: "mono" | "dark" | "none"; className?: string }) {
  const [active, setActive] = useState(false);
  const filter =
    tone === "mono"
      ? "[filter:grayscale(1)_contrast(1.05)_brightness(1.02)]"
      : tone === "dark"
        ? "[filter:invert(0.92)_hue-rotate(180deg)_grayscale(0.6)_contrast(0.95)]"
        : "";

  if (active) {
    return (
      <iframe
        title="Pak Arab Manpower Supply LLC office location, Shabiya-12, Mussafah, Abu Dhabi"
        src={EMBED}
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className={`h-full min-h-[20rem] w-full border-0 ${filter} ${className}`}
      />
    );
  }

  const dark = tone === "dark";
  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      aria-label="Load interactive Google map of the Pak Arab Manpower office"
      className={`group relative flex h-full min-h-[20rem] w-full flex-col items-center justify-center gap-4 overflow-hidden text-center ${
        dark ? "bg-navy-950 text-white" : "bg-mist text-navy-900"
      } ${className}`}
    >
      {/* map-like grid backdrop */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 [background-size:2.5rem_2.5rem] ${
          dark
            ? "opacity-[0.12] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)]"
            : "opacity-[0.5] [background-image:linear-gradient(to_right,#dfe3e8_1px,transparent_1px),linear-gradient(to_bottom,#dfe3e8_1px,transparent_1px)]"
        }`}
      />
      <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-lg shadow-brand/30 transition-transform group-hover:scale-110">
        <MapPin className="h-7 w-7" aria-hidden="true" />
      </span>
      <span className="relative max-w-xs px-4 text-sm font-semibold">
        Building C-06, Shabiya-12, Mussafah, Abu Dhabi
      </span>
      <span className="relative inline-flex items-center rounded-full border border-current/20 px-4 py-2 text-xs font-bold uppercase tracking-wider opacity-90 group-hover:opacity-100">
        Tap to load map
      </span>
    </button>
  );
}
