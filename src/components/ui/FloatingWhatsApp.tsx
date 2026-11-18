"use client";

import Image from "next/image";
import { COMPANY } from "@/data/company";

export function FloatingWhatsApp() {
  const defaultMsg = encodeURIComponent(
    "Hello Pak Arab Manpower Supply LLC, we would like to discuss a manpower requirement."
  );

  return (
    <a
      href={`${COMPANY.contact.whatsappUrl}?text=${defaultMsg}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Pak Arab Manpower on WhatsApp (+971 55 384 2555)"
      className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-[0_10px_28px_rgba(37,211,102,0.42)] transition-transform duration-200 hover:scale-110 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-[#25D366]/35 animate-ping"
      />
      <Image
        src="/images/whatsapp-icon.png"
        alt="WhatsApp Pak Arab Manpower"
        width={56}
        height={56}
        className="relative h-14 w-14 rounded-full object-contain"
        priority
      />
    </a>
  );
}
