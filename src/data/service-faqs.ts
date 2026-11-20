import type { FaqItem } from "@/data/faq";

/** Service-specific FAQs (shown on each service page + FAQPage schema). Facts only from the site. */
export const SERVICE_FAQS: Record<string, FaqItem[]> = {
  "manpower-supply": [
    { id: "ms-1", question: "How fast can you supply manpower in Abu Dhabi?", answer: "Pak Arab Manpower Supply LLC typically mobilises vetted workers within 24–72 hours, depending on the trades, headcount and site access requirements of the project." },
    { id: "ms-2", question: "Do you supply both skilled and unskilled workers?", answer: "Yes. We supply skilled tradesmen such as welders, fitters, riggers, electricians and masons, as well as general helpers and site support staff, for short- and long-term contracts." },
    { id: "ms-3", question: "Which emirates do you cover?", answer: "We are based in Shabiya-12, Mussafah, Abu Dhabi, and supply manpower to projects across all seven emirates: Abu Dhabi, Dubai, Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah and Fujairah." },
  ],
  "workforce-support": [
    { id: "ws-1", question: "What does workforce support include?", answer: "Site inductions, training coordination, payroll, benefits administration and compliance coordination for the personnel we deploy, so your team can focus on the project." },
    { id: "ws-2", question: "Can you manage payroll for supplied workers?", answer: "Yes. Payroll and benefits administration for supplied personnel can be handled by Pak Arab Manpower Supply LLC as part of the workforce support service." },
    { id: "ws-3", question: "Do your workers receive safety inductions?", answer: "Yes. Workers receive site safety inductions and workforce readiness preparation aligned with the client's site safety and quality standards before deployment." },
  ],
  "oil-and-gas": [
    { id: "og-1", question: "Is your oil and gas workforce ADNOC compliant?", answer: "Yes. Our Oil & Gas workforce is ADNOC-compliant and CICPA-eligible, supporting deployment to energy-sector and restricted industrial sites in Abu Dhabi." },
    { id: "og-2", question: "Which oil and gas trades do you supply?", answer: "Multi welders (GTAW/SMAW), pipe and structural fitters, fabricators, riggers, scaffolders, industrial electricians, instrument technicians, painters and man-lift operators, for onshore and offshore work." },
    { id: "og-3", question: "Can you provide crews for shutdowns and turnarounds?", answer: "Yes. We mobilise trade crews for plant shutdowns, turnarounds and maintenance campaigns, typically within 24–72 hours depending on headcount and site access." },
  ],
  "civil-construction": [
    { id: "cc-1", question: "Which construction trades can you supply?", answer: "Masons, ceramic masons, shuttering and finishing carpenters, steel fixers, plumbers, HVAC technicians, domestic electricians, equipment operators, drivers and general helpers." },
    { id: "cc-2", question: "Do you supply construction labour for short-term projects?", answer: "Yes. Construction manpower is available on short-term and long-term contracts, and crew sizes can be scaled up or down as the project schedule changes." },
    { id: "cc-3", question: "Do you supply manpower for construction projects in Dubai?", answer: "Yes. Alongside Abu Dhabi, we supply civil and construction manpower to projects across all seven UAE emirates, including Dubai." },
  ],
  "mechanical-electrical": [
    { id: "me-1", question: "Which mechanical and electrical trades do you supply?", answer: "Pipe and structural fitters, fabricators, multi welders, industrial electricians, instrument technicians and domestic electricians for industrial and building projects." },
    { id: "me-2", question: "Do you supply MEP manpower for onshore and offshore sites?", answer: "Yes. Our Onshore & Offshore MEP division supplies mechanical, electrical and instrumentation crews for both onshore plants and offshore facilities." },
    { id: "me-3", question: "How do I request electricians or fitters?", answer: "Use the Manpower Request form or WhatsApp +971 55 384 2555 with the trades, headcount, project location and start date, and our team will confirm availability." },
  ],
  "travel-transportation": [
    { id: "tt-1", question: "Do you provide transport for supplied workers?", answer: "Yes. We arrange daily site commuting and shift-aligned crew transport for the workforce we deploy, using our staff transportation." },
    { id: "tt-2", question: "Can transport follow shift patterns?", answer: "Yes. Crew movement is planned around the project's shift schedule so teams arrive on site on time for each shift." },
    { id: "tt-3", question: "Is transportation available outside Abu Dhabi?", answer: "Workforce transportation supports our deployments across the UAE. Share your site location when requesting manpower and we will confirm the transport plan." },
  ],
};
