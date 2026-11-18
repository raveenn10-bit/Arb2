import { COMPANY } from "@/data/company";
import { SERVICES, INDUSTRIES } from "@/data/services";
import { FAQS } from "@/data/faq";

const ORG_ID = `${COMPANY.domain}/#organization`;
const SITE_ID = `${COMPANY.domain}/#website`;

const EMIRATES = ["Abu Dhabi", "Dubai", "Sharjah", "Ajman", "Umm Al Quwain", "Ras Al Khaimah", "Fujairah"];

const ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "Office No. A03, Wurth Gulf Building, Plot No. 42, M14, Musaffah",
  addressLocality: "Abu Dhabi",
  addressRegion: "Abu Dhabi",
  addressCountry: "AE",
};

/**
 * One linked JSON-LD graph for every page: the business (EmploymentAgency is a
 * LocalBusiness subtype, so it qualifies for local results) + the WebSite entity.
 */
export function getSiteSchemaGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["EmploymentAgency", "Organization"],
        "@id": ORG_ID,
        name: COMPANY.name,
        legalName: COMPANY.name,
        alternateName: [COMPANY.shortName, COMPANY.arabicName, "Pak Arab Manpower Supply"],
        slogan: COMPANY.tagline,
        description:
          "Abu Dhabi-based manpower supply company providing skilled and unskilled industrial workforce for Oil & Gas, MEP, Civil & Construction, Mechanical and Electrical projects across all seven UAE emirates.",
        url: COMPANY.domain,
        logo: {
          "@type": "ImageObject",
          url: `${COMPANY.domain}/images/brand/pak-arab-logo.png`,
          width: 1300,
          height: 1440,
        },
        image: [
          `${COMPANY.domain}/images/brand/og-cover.jpg`,
          `${COMPANY.domain}/images/team/pak-arab-crew-blue-hd.webp`,
          `${COMPANY.domain}/images/team/pak-arab-crew-red-hd.webp`,
        ],
        email: COMPANY.email,
        telephone: COMPANY.telephone.display,
        address: ADDRESS,
        hasMap: COMPANY.office.mapsUrl,
        areaServed: EMIRATES.map((name) => ({ "@type": "AdministrativeArea", name: `${name}, United Arab Emirates` })),
        knowsAbout: [
          "Manpower supply",
          "Industrial staffing",
          "Oil and gas manpower",
          "MEP manpower",
          "Civil and construction labour supply",
          "Mechanical and electrical technicians",
          "Shutdown and turnaround manpower",
          "Onshore and offshore workforce",
          "Workforce transportation",
        ],
        hasCredential: [
          { "@type": "EducationalOccupationalCredential", credentialCategory: "certification", name: "ISO 9001 Quality Management" },
          { "@type": "EducationalOccupationalCredential", credentialCategory: "certification", name: "ISO 14001 Environmental Management" },
          { "@type": "EducationalOccupationalCredential", credentialCategory: "certification", name: "ISO 45001 Occupational Health & Safety" },
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: COMPANY.whatsapp.display,
            contactType: "customer service",
            areaServed: "AE",
            availableLanguage: ["English", "Arabic"],
          },
          {
            "@type": "ContactPoint",
            telephone: COMPANY.telephone.display,
            contactType: "sales",
            areaServed: "AE",
            availableLanguage: ["English", "Arabic"],
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Manpower Supply Services",
          itemListElement: SERVICES.map((sv) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: sv.title,
              description: sv.shortDescription,
              url: `${COMPANY.domain}/services/${sv.slug}`,
            },
          })),
        },
        makesOffer: INDUSTRIES.map((ind) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: `${ind.title} manpower supply`, serviceType: ind.subtitle },
          areaServed: "AE",
        })),
      },
      {
        "@type": "WebSite",
        "@id": SITE_ID,
        url: COMPANY.domain,
        name: COMPANY.name,
        alternateName: COMPANY.shortName,
        inLanguage: "en-AE",
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

export function getFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function getWebPageSchema(opts: { path: string; name: string; description: string; type?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": opts.type ?? "WebPage",
    "@id": `${COMPANY.domain}${opts.path}#webpage`,
    url: `${COMPANY.domain}${opts.path}`,
    name: opts.name,
    description: opts.description,
    inLanguage: "en-AE",
    isPartOf: { "@id": SITE_ID },
    about: { "@id": ORG_ID },
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: `${COMPANY.domain}${item.url}`,
    })),
  };
}

export function getServiceSchema(title: string, description: string, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description,
    url: `${COMPANY.domain}/services/${slug}`,
    serviceType: title,
    provider: { "@id": ORG_ID, "@type": "EmploymentAgency", name: COMPANY.name, url: COMPANY.domain },
    areaServed: EMIRATES.map((name) => ({ "@type": "AdministrativeArea", name: `${name}, United Arab Emirates` })),
    availableChannel: {
      "@type": "ServiceChannel",
      servicePhone: { "@type": "ContactPoint", telephone: COMPANY.whatsapp.display },
      serviceUrl: `${COMPANY.domain}/contact`,
    },
  };
}
