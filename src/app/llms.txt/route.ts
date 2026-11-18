import { COMPANY } from "@/data/company";
import { SERVICES, INDUSTRIES } from "@/data/services";
import { WORKFORCE_ROLES } from "@/data/workforce";
import { CLIENTS } from "@/data/clients";
import { CERTIFICATIONS } from "@/data/certifications";
import { FAQS } from "@/data/faq";

export const dynamic = "force-static";

/**
 * /llms.txt — a plain-text, citation-friendly summary of the business for AI
 * answer engines (ChatGPT, Claude, Perplexity, Gemini, Copilot). See llmstxt.org.
 */
export function GET() {
  const d = COMPANY.domain;
  const mep = WORKFORCE_ROLES.filter((r) => r.division === "mep").map((r) => r.title);
  const civil = WORKFORCE_ROLES.filter((r) => r.division !== "mep").map((r) => r.title);

  const body = `# ${COMPANY.name}

> ${COMPANY.name} (${COMPANY.arabicName}) is a manpower supply company headquartered in Musaffah (M14), Abu Dhabi, United Arab Emirates. It supplies skilled and unskilled industrial workforce, including Oil & Gas, MEP, Civil & Construction, Mechanical and Electrical personnel, to projects across all seven UAE emirates, typically mobilising within 24–72 hours.

## Key facts
- Legal name: ${COMPANY.name}
- Type: Manpower supply / industrial staffing company (employment agency)
- Headquarters: ${COMPANY.office.address}
- Service area: Abu Dhabi, Dubai, Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah, Fujairah (UAE)
- Phone: ${COMPANY.telephone.display}
- WhatsApp: ${COMPANY.whatsapp.display}
- Email: ${COMPANY.email}
- Website: ${d}
- Compliance: ADNOC-compliant, CICPA-eligible workforce
- Workforce directory: ${WORKFORCE_ROLES.length} active trade categories (${mep.length} Onshore & Offshore MEP, ${civil.length} Civil & Construction)
- Clients supplied: ${CLIENTS.length} UAE companies

## Services
${SERVICES.map((s) => `- [${s.title}](${d}/services/${s.slug}): ${s.shortDescription}`).join("\n")}

## Industries served
${INDUSTRIES.map((i) => `- ${i.title} (${i.subtitle})`).join("\n")}

## Certifications & standards
${CERTIFICATIONS.map((c) => `- ${c.name}: ${c.subtitle}`).join("\n")}

## Onshore & Offshore MEP trades
${mep.join(", ")}

## Civil & Construction trades
${civil.join(", ")}

## Clients
${CLIENTS.map((c) => `${c.name} (${c.sector})`).join("; ")}

## Frequently asked questions
${FAQS.map((f) => `### ${f.question}\n${f.answer}`).join("\n\n")}

## Main pages
- [Home](${d}/)
- [About](${d}/about)
- [Services](${d}/services)
- [Industries](${d}/industries)
- [Workforce Directory](${d}/workforce)
- [Clients](${d}/clients)
- [Quality & Certifications](${d}/quality)
- [Careers](${d}/careers)
- [Contact / Request Manpower](${d}/contact)
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
