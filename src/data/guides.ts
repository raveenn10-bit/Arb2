import type { FaqItem } from "@/data/faq";

export interface GuideSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface Guide {
  slug: string;
  title: string;
  /** <title> tag (keyword-first, <= 60 chars) */
  seoTitle: string;
  description: string;
  keywords: string[];
  published: string; // ISO date
  updated: string; // ISO date
  readMinutes: number;
  image: string;
  imageAlt: string;
  /** One-paragraph direct answer shown first (answer-engine friendly) */
  summary: string;
  sections: GuideSection[];
  faqs: FaqItem[];
  sources?: { label: string; url: string }[];
  relatedServices: string[];
}

export const GUIDES: Guide[] = [
  {
    slug: "how-to-choose-oil-and-gas-manpower-supplier-abu-dhabi",
    title: "How to Choose an Oil & Gas Manpower Supplier in Abu Dhabi",
    seoTitle: "How to Choose an Oil & Gas Manpower Supplier",
    description:
      "A practical checklist for EPC contractors and plant operators choosing an oil and gas manpower supply company in Abu Dhabi: compliance, trades, mobilisation speed and support.",
    keywords: [
      "oil and gas manpower supplier Abu Dhabi",
      "oil and gas manpower supply UAE",
      "ADNOC manpower supplier",
      "shutdown manpower Abu Dhabi",
    ],
    published: "2026-11-20",
    updated: "2026-11-20",
    readMinutes: 5,
    image: "/images/hero/hero-desktop-scaffold-weld.webp",
    imageAlt: "Pak Arab Manpower Supply scaffolder and welder working at a UAE refinery",
    summary:
      "Choose an oil and gas manpower supplier in Abu Dhabi that can prove ADNOC-compliant, CICPA-eligible workers, covers the exact trades your scope needs, mobilises within days rather than weeks, and handles inductions, payroll and transport for the crew it supplies.",
    sections: [
      {
        heading: "1. Check compliance before anything else",
        paragraphs: [
          "Oil and gas sites in Abu Dhabi are restricted, high-risk environments. A supplier whose workers cannot pass site access or safety requirements will cost you days at the gate, however good the price looks.",
          "Ask every supplier how its workforce meets ADNOC requirements and whether its people are eligible for CICPA site passes. Confirm which management systems the company works under, for example ISO 9001 (quality), ISO 14001 (environment) and ISO 45001 (occupational health and safety).",
        ],
      },
      {
        heading: "2. Match the trades to your scope",
        paragraphs: [
          "A good supplier can name the trades it actually deploys, not just say \"skilled and unskilled labour\". For mechanical and piping scopes, check that it can supply the specific roles you need.",
        ],
        bullets: [
          "Multi welders (GTAW/SMAW) and SMAW welders",
          "Piping and structural fitters and fabricators",
          "Riggers, scaffolders and man-lift operators",
          "Industrial electricians and instrument technicians",
          "Painters (brush and spray), sand blasters and helpers",
        ],
      },
      {
        heading: "3. Ask how fast they can mobilise",
        paragraphs: [
          "Shutdowns, turnarounds and maintenance windows are fixed. Ask for a realistic mobilisation time for your headcount. Pak Arab Manpower Supply LLC, for example, typically deploys within 24–72 hours depending on trades, headcount and site access.",
        ],
      },
      {
        heading: "4. Look beyond headcount: workforce support",
        paragraphs: [
          "Supplying people is only half the job. The supplier should also manage site inductions, training coordination, payroll, benefits administration and compliance for the workers it deploys, so your site team is not doing HR.",
          "Transport matters too. Shift-aligned crew transport keeps people arriving on time for every shift, especially on remote plant sites.",
        ],
      },
      {
        heading: "5. Check track record and coverage",
        paragraphs: [
          "Ask which energy, EPC and industrial companies the supplier has worked with, and whether it can support projects outside Abu Dhabi. A supplier covering all seven emirates can follow your project portfolio as it grows.",
        ],
      },
    ],
    faqs: [
      {
        id: "g1-1",
        question: "What should I ask an oil and gas manpower supplier in Abu Dhabi?",
        answer:
          "Ask how its workers meet ADNOC requirements and CICPA pass eligibility, which ISO frameworks it works under, which exact trades it supplies, how fast it can mobilise your headcount, and whether it handles inductions, payroll and transport.",
      },
      {
        id: "g1-2",
        question: "How quickly can oil and gas manpower be mobilised in Abu Dhabi?",
        answer:
          "It depends on the trades, headcount and site access requirements. Pak Arab Manpower Supply LLC typically mobilises within 24–72 hours.",
      },
    ],
    relatedServices: ["oil-and-gas", "manpower-supply", "workforce-support"],
  },
  {
    slug: "cicpa-pass-manpower-abu-dhabi",
    title: "CICPA Passes and Contract Manpower in Abu Dhabi: What Clients Should Know",
    seoTitle: "CICPA Pass & Contract Manpower in Abu Dhabi",
    description:
      "What a CICPA pass is, why it matters when you bring contract manpower onto critical infrastructure sites in Abu Dhabi, and how to plan for it when hiring a manpower supplier.",
    keywords: [
      "CICPA pass manpower",
      "CICPA eligible workers Abu Dhabi",
      "manpower for ADNOC sites",
      "critical infrastructure site access Abu Dhabi",
    ],
    published: "2026-11-20",
    updated: "2026-11-20",
    readMinutes: 4,
    image: "/images/team/pak-arab-supervisor-briefing.webp",
    imageAlt: "Pak Arab Manpower Supply site supervisor briefing a crew at a UAE plant",
    summary:
      "A CICPA pass is a permit from Abu Dhabi's Critical Infrastructure and Coastal Protection Authority that lets authorised personnel enter and work in areas designated as critical infrastructure. If your project is on such a site, plan pass applications into your manpower timeline and choose a supplier whose workers are CICPA-eligible.",
    sections: [
      {
        heading: "What is CICPA?",
        paragraphs: [
          "Abu Dhabi established the Critical Infrastructure and Coastal Protection Authority (CICPA) to protect facilities that support the emirate's essential operations, including maritime zones connected to energy production and transport.",
        ],
      },
      {
        heading: "What does a CICPA pass allow?",
        paragraphs: [
          "A CICPA security pass allows authorised personnel to enter and work within areas designated as critical. Employers register the relevant staff when their operations require access to these locations, whether the work is onshore, offshore, on land or at sea.",
          "Passes are issued per person, and passes can also be issued for vehicles, vessels and specific activities. Each pass is obtained separately, and some temporary permits exist for short-term work with the right documentation.",
        ],
      },
      {
        heading: "Why it matters when you hire contract manpower",
        paragraphs: [
          "If a worker cannot get site access, they cannot start, and your mobilisation plan slips. Delays usually come from incomplete submissions or unclear classifications, so access needs to be planned early rather than after the crew arrives.",
        ],
        bullets: [
          "Confirm early whether your site and activity require CICPA access",
          "Choose a supplier whose workforce is CICPA-eligible",
          "Build pass processing time into your mobilisation schedule",
          "Include vehicles and transport in the access plan if crews are bussed to site",
        ],
      },
      {
        heading: "How Pak Arab Manpower Supply helps",
        paragraphs: [
          "Our Oil & Gas, MEP and Civil workforce is ADNOC-compliant and CICPA-eligible, and we coordinate mobilisation, inductions and crew transport so that people arrive ready for restricted industrial sites in Abu Dhabi.",
        ],
      },
    ],
    faqs: [
      {
        id: "g2-1",
        question: "What is a CICPA pass?",
        answer:
          "A permit from Abu Dhabi's Critical Infrastructure and Coastal Protection Authority that allows authorised personnel to enter and work in areas designated as critical infrastructure, onshore or offshore.",
      },
      {
        id: "g2-2",
        question: "Are Pak Arab Manpower workers CICPA-eligible?",
        answer:
          "Yes. Our Oil & Gas, MEP and Civil workforce is ADNOC-compliant and CICPA-eligible for deployment to restricted industrial sites in Abu Dhabi.",
      },
    ],
    sources: [{ label: "Sovereign Group: CICPA passes (Abu Dhabi)", url: "https://www.sovereigngroup.com/abu-dhabi/cicpa-passes/" }],
    relatedServices: ["oil-and-gas", "workforce-support", "travel-transportation"],
  },
  {
    slug: "manpower-supply-vs-recruitment-agency-uae",
    title: "Manpower Supply vs Recruitment Agency in the UAE: Which Do You Need?",
    seoTitle: "Manpower Supply vs Recruitment Agency in the UAE",
    description:
      "The difference between a manpower supply company and a recruitment agency in the UAE, and when contractors should use each for construction, MEP and oil and gas projects.",
    keywords: [
      "manpower supply vs recruitment agency",
      "manpower supply company UAE",
      "labour supply company Abu Dhabi",
      "contract manpower UAE",
    ],
    published: "2026-11-20",
    updated: "2026-11-20",
    readMinutes: 4,
    image: "/images/team/pak-arab-crew-lineup.webp",
    imageAlt: "Pak Arab Manpower Supply crew in branded coveralls at a UAE refinery",
    summary:
      "A recruitment agency finds people for you to hire onto your own payroll. A manpower supply company deploys its own workers to your project for a set period and handles their payroll, inductions and logistics. For project-based crews, shutdowns and fluctuating headcount, manpower supply is usually the faster, more flexible option.",
    sections: [
      {
        heading: "What a recruitment agency does",
        paragraphs: [
          "A recruitment agency sources and screens candidates, then hands them over to you. Once hired, the worker is your employee: you handle contracts, payroll and ongoing HR. This suits permanent roles you want to keep long term.",
        ],
      },
      {
        heading: "What a manpower supply company does",
        paragraphs: [
          "A manpower supply company deploys trained workers to your project while they stay under the supplier's management. The supplier looks after payroll, benefits, inductions, compliance and often transport, and you scale the crew up or down as the work changes.",
        ],
      },
      {
        heading: "When to choose manpower supply",
        paragraphs: ["Manpower supply is usually the better fit when:"],
        bullets: [
          "The work is project-based, such as construction phases, shutdowns or turnarounds",
          "Headcount changes week to week",
          "You need trade crews (welders, fitters, riggers, masons) mobilised within days",
          "You want one partner to handle payroll, inductions and transport",
        ],
      },
      {
        heading: "When to use a recruitment agency",
        paragraphs: [
          "Use a recruitment agency for permanent positions you want on your own payroll, typically management, specialist office roles or long-term staff you will develop internally.",
        ],
      },
    ],
    faqs: [
      {
        id: "g3-1",
        question: "What is the difference between manpower supply and recruitment?",
        answer:
          "Recruitment finds candidates for you to employ directly. Manpower supply deploys the supplier's own workers to your project and the supplier manages their payroll, inductions and logistics.",
      },
      {
        id: "g3-2",
        question: "Is manpower supply better for construction projects?",
        answer:
          "For project-based work with changing headcount, yes. Manpower supply lets contractors scale trade crews up or down quickly without adding permanent employees.",
      },
    ],
    relatedServices: ["manpower-supply", "civil-construction", "workforce-support"],
  },
];

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);
