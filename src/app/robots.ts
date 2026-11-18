import type { MetadataRoute } from "next";
import { COMPANY } from "@/data/company";

// AI answer engines & search crawlers we explicitly welcome (AI search visibility)
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Bingbot",
  "DuckAssistBot",
  "Amazonbot",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/_next/data/"] },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: `${COMPANY.domain}/sitemap.xml`,
  };
}
