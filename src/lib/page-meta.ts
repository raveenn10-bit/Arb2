import type { Metadata } from "next";
import { COMPANY } from "@/data/company";

const OG_IMAGE = {
  url: "/images/brand/og-cover.jpg",
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt: "Pak Arab Manpower Supply LLC — skilled industrial manpower, Abu Dhabi, UAE",
};

/** Consistent per-page metadata: title, meta description, canonical, Open Graph & Twitter. */
export function pageMeta({
  title,
  description,
  path,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_AE",
      siteName: COMPANY.name,
      url: path,
      title: `${title} | Pak Arab Manpower`,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Pak Arab Manpower`,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
