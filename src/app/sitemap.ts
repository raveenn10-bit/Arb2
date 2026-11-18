import type { MetadataRoute } from "next";
import { COMPANY } from "@/data/company";
import { SERVICES } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/industries",
    "/workforce",
    "/quality",
    "/clients",
    "/careers",
    "/contact",
    "/privacy-policy",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${COMPANY.domain}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  const serviceEntries: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${COMPANY.domain}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [...staticEntries, ...serviceEntries];
}
