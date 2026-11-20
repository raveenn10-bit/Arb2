"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="legal-no-print inline-flex min-h-11 items-center gap-1.5 rounded-md border border-line px-3 text-sm font-semibold text-navy-900 hover:border-navy-900"
    >
      <Printer className="h-4 w-4" aria-hidden="true" />
      Print / save as PDF
    </button>
  );
}
