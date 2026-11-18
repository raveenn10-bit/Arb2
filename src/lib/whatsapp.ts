import { COMPANY } from "@/data/company";

export function buildWhatsAppUrl(message: string): string {
  const cleanText = message.trim();
  return `${COMPANY.whatsapp.url}?text=${encodeURIComponent(cleanText)}`;
}

export function buildQuickEnquiryUrl(topic: string): string {
  return buildWhatsAppUrl(
    `Hello Pak Arab Manpower Supply LLC,\n\nI would like to enquire about: ${topic}.\nPlease share how we can discuss our project requirements.`
  );
}
