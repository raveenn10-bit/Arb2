"use client";

import { useEffect } from "react";

type Gtag = (cmd: "event", name: string, params?: Record<string, unknown>) => void;

/**
 * GA4 conversion events (no-ops until NEXT_PUBLIC_GA_ID loads gtag):
 *  - whatsapp_click  any link to wa.me / api.whatsapp.com
 *  - phone_call      tel: links
 *  - email_click     mailto: links
 *  - generate_lead   manpower / careers enquiry sent to WhatsApp (form CTA links carry data-conversion="lead")
 * Mark these as key events in GA4 to see which pages bring enquiries.
 */
export function ConversionTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      const gtag = (window as unknown as { gtag?: Gtag }).gtag;
      if (!a || !gtag) return;
      const href = a.getAttribute("href") || "";
      const base = { page_path: location.pathname, link_text: (a.textContent || "").trim().slice(0, 60) };
      if (a.dataset.conversion === "lead") gtag("event", "generate_lead", { ...base, method: "whatsapp_form" });
      else if (/wa\.me|whatsapp\.com/i.test(href)) gtag("event", "whatsapp_click", base);
      else if (href.startsWith("tel:")) gtag("event", "phone_call", base);
      else if (href.startsWith("mailto:")) gtag("event", "email_click", base);
    };
    const onLead = (e: Event) => {
      const gtag = (window as unknown as { gtag?: Gtag }).gtag;
      gtag?.("event", "generate_lead", { page_path: location.pathname, method: (e as CustomEvent).detail ?? "form" });
    };
    document.addEventListener("click", onClick, { capture: true });
    window.addEventListener("pak:lead", onLead);
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      window.removeEventListener("pak:lead", onLead);
    };
  }, []);
  return null;
}
