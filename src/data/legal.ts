/**
 * Dates shown on the legal pages. Update both values whenever the Privacy Policy or Terms change.
 * Display format: "21 November 2026" (en-GB, UAE convention).
 */
export const LEGAL_DATES = {
  privacy: { effective: "2026-11-21", updated: "2026-11-21" },
  terms: { effective: "2026-11-21", updated: "2026-11-21" },
} as const;

export function formatLegalDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Official third-party privacy notices referenced in the Privacy Policy */
export const THIRD_PARTY_POLICIES = {
  whatsapp: "https://www.whatsapp.com/legal/privacy-policy",
  vercel: "https://vercel.com/legal/privacy-policy",
  google: "https://policies.google.com/privacy",
} as const;

/** Official UAE legislation references */
export const UAE_LAW_LINKS = {
  pdpl: "https://uaelegislation.gov.ae/en/legislations/1972",
  labour: "https://uaelegislation.gov.ae/en/legislations/1541",
  electronic: "https://uaelegislation.gov.ae/en/legislations/1539",
  mohre: "https://www.mohre.gov.ae",
  uaeGov: "https://u.ae",
} as const;
