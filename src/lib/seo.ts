import { COMPANY } from "@/data/company";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.name,
    alternateName: COMPANY.arabicName,
    url: COMPANY.domain,
    logo: `${COMPANY.domain}/images/brand/pak-arab-logo.png`,
    email: COMPANY.email,
    telephone: COMPANY.telephone.display,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Office No. A03, Wurth Gulf Building, Plot No. 42, M14",
      addressLocality: "Abu Dhabi",
      addressCountry: "AE",
    },
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
  };
}

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: COMPANY.name,
    image: `${COMPANY.domain}/images/brand/og-cover.jpg`,
    url: COMPANY.domain,
    telephone: COMPANY.telephone.display,
    email: COMPANY.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Office No. A03, Wurth Gulf Building, Plot No. 42, M14",
      addressLocality: "Abu Dhabi",
      addressRegion: "Abu Dhabi",
      addressCountry: "AE",
    },
    areaServed: {
      "@type": "Country",
      name: "United Arab Emirates",
    },
    hasMap: COMPANY.office.mapsUrl,
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
    provider: {
      "@type": "Organization",
      name: COMPANY.name,
      url: COMPANY.domain,
    },
    areaServed: {
      "@type": "Country",
      name: "United Arab Emirates",
    },
  };
}
