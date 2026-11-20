import type { MetadataRoute } from "next";
import { COMPANY } from "@/data/company";
import { SERVICES } from "@/data/services";

const abs = (path: string) => `${COMPANY.domain}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: { route: string; priority: number; freq: "weekly" | "monthly" | "yearly"; images?: string[] }[] = [
    {
      route: "",
      priority: 1,
      freq: "weekly",
      images: [
        "/images/hero/hero-desktop-crew-blue.webp",
        "/images/hero/hero-desktop-crew-red.webp",
        "/images/team/pak-arab-crew-lineup.webp",
        "/images/team/pak-arab-supervisor-briefing.webp",
        "/images/services/manpower-briefing.webp",
      ],
    },
    { route: "/services", priority: 0.9, freq: "monthly" },
    { route: "/industries", priority: 0.8, freq: "monthly" },
    { route: "/about", priority: 0.8, freq: "monthly" },
    { route: "/clients", priority: 0.7, freq: "monthly" },
    { route: "/quality", priority: 0.7, freq: "monthly" },
    { route: "/careers", priority: 0.7, freq: "monthly" },
    { route: "/contact", priority: 0.8, freq: "monthly" },
    { route: "/privacy-policy", priority: 0.2, freq: "yearly" },
  ];

  const staticEntries: MetadataRoute.Sitemap = pages.map((p) => ({
    url: abs(p.route),
    lastModified: now,
    changeFrequency: p.freq,
    priority: p.priority,
    ...(p.images ? { images: p.images.map(abs) } : {}),
  }));

  const serviceEntries: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: abs(`/services/${service.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
    images: [abs(service.image)],
  }));

  return [...staticEntries, ...serviceEntries];
}
