import type { MetadataRoute } from "next";
import { COMPANY } from "@/data/company";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: COMPANY.name,
    short_name: COMPANY.shortName,
    description: "Industrial manpower supply in Abu Dhabi and across the UAE.",
    start_url: "/",
    display: "standalone",
    background_color: "#F5F2ED",
    theme_color: "#0B0B0B",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
