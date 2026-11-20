export interface ServiceItem {
  slug: string;
  number: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  image: string;
  imageAlt: string;
  iconName: string;
  waTopic: string;
}

export const SERVICES: ServiceItem[] = [
  {
    slug: "manpower-supply",
    number: "01",
    title: "Manpower Supply",
    shortDescription:
      "Reliable workforce sourcing and skilled manpower supply aligned with client requirements across the UAE.",
    fullDescription:
      "Pak Arab Manpower Supply LLC connects industrial and commercial clients with vetted, skilled, and dedicated personnel across engineering, technical, and general trades. Our recruitment and screening workflow ensures every candidate matches your project's operational, safety, and productivity standards.",
    highlights: [
      "Vetted technical and non-technical personnel",
      "Short-term and long-term project staffing",
      "Trade-specific screening and induction",
      "Support across Abu Dhabi and the wider UAE",
    ],
    image: "/images/services/manpower-briefing.webp",
    imageAlt: "Project coordinator briefing skilled industrial workforce in Abu Dhabi",
    iconName: "Users",
    waTopic: "Manpower Supply",
  },
  {
    slug: "workforce-support",
    number: "02",
    title: "Workforce Support & Process",
    shortDescription:
      "Flexible staffing, induction, training, payroll, benefits, and compliance coordination to streamline site operations.",
    fullDescription:
      "Through our structured Process & Benefits framework, we help clients reduce administrative overhead while maintaining workforce stability. From thorough inductions and regular training to payroll, benefits administration, and compliance support, our coordination team keeps your workforce focused on delivery.",
    highlights: [
      "Flexible workforce scaling as project needs evolve",
      "Payroll, benefits, and compliance administration",
      "Regular safety inductions and readiness training",
      "Dedicated operational and site coordination",
    ],
    image: "/images/services/quality-hse-inspection.webp",
    imageAlt: "Workforce coordination and safety compliance inspection at an industrial facility",
    iconName: "ClipboardCheck",
    waTopic: "Workforce Support & Process",
  },
  {
    slug: "oil-and-gas",
    number: "03",
    title: "Oil & Gas",
    shortDescription:
      "Onshore and offshore technical and non-technical manpower solutions for UAE energy and petrochemical projects.",
    fullDescription:
      "We supply experienced technical and non-technical personnel for onshore and offshore oil and gas operations across the UAE. Our teams support piping, structural fabrication, multi-process welding, rigging, scaffolding, and industrial electrical/instrumentation scopes under strict HSE protocols.",
    highlights: [
      "Onshore and offshore project staffing",
      "Certified GTAW / SMAW welders and fabricators",
      "Riggers, scaffolders, and man-lift operators",
      "Alignment with UAE energy sector HSE standards",
    ],
    image: "/images/services/oil-and-gas.webp",
    imageAlt: "Engineers inspecting equipment on an offshore oil and gas platform in the UAE",
    iconName: "Flame",
    waTopic: "Oil & Gas Manpower",
  },
  {
    slug: "civil-construction",
    number: "04",
    title: "Civil & Construction",
    shortDescription:
      "Professional construction workforce and skilled tradesmen supporting infrastructure and commercial builds.",
    fullDescription:
      "As the UAE continues to advance major infrastructure and commercial developments, Pak Arab Manpower Supply LLC supports contractors with disciplined civil tradesmen—from steel fixers, shuttering and finishing carpenters, and masons to heavy equipment operators, drivers, and civil supervisors.",
    highlights: [
      "Steel fixers, bar benders, and shuttering carpenters",
      "Block, plaster, ceramic, interlock, and concrete masons",
      "Forklift, hoist, and heavy/light duty operators",
      "Civil foremen, chargehands, and site supervisors",
    ],
    image: "/images/services/civil-construction.webp",
    imageAlt: "Civil construction engineers and tradesmen reviewing structural blueprints in Abu Dhabi",
    iconName: "HardHat",
    waTopic: "Civil & Construction Manpower",
  },
  {
    slug: "mechanical-electrical",
    number: "05",
    title: "Mechanical & Electrical",
    shortDescription:
      "Technical personnel for mechanical, piping, HVAC, electrical, and industrial MEP engineering requirements.",
    fullDescription:
      "Our Mechanical and Electrical division supplies qualified technicians, fitters, fabricators, HVAC specialists, and industrial electricians for complex industrial plants and commercial MEP installations. Every technician is selected for hands-on competence and adherence to site safety.",
    highlights: [
      "Pipe fitters, fabricators, and multi welders",
      "Industrial and domestic electricians",
      "Instrument technicians, HVAC technicians, and ductmen",
      "Plumbers, riggers, and man-lift operators",
    ],
    image: "/images/services/mechanical-welding.webp",
    imageAlt: "Certified pipe welder and mechanical fitter working on stainless steel industrial piping",
    iconName: "Wrench",
    waTopic: "Mechanical & Electrical Manpower",
  },
  {
    slug: "travel-transportation",
    number: "06",
    title: "Travel & Transportation",
    shortDescription:
      "Coordinated workforce travel and staff transportation support for smooth mobilization to and from project sites.",
    fullDescription:
      "Pak Arab Manpower Supply LLC provides structured workforce travel and transportation coordination to support reliable daily site attendance and project mobilization across Abu Dhabi and the UAE. We align transport logistics with client shift schedules and site access requirements.",
    highlights: [
      "Coordinated daily site commuting support",
      "Shift-aligned workforce mobilization logistics",
      "Point-to-point coordination for project teams",
      "Integrated with overall workforce deployment",
    ],
    image: "/images/team/pak-arab-crew-bus.webp",
    imageAlt: "Pak Arab Manpower Supply crew in navy coveralls boarding a branded company staff bus",
    iconName: "Bus",
    waTopic: "Travel & Transportation Support",
  },
];

export interface IndustryItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const INDUSTRIES: IndustryItem[] = [
  {
    id: "oil-gas",
    title: "Oil & Gas",
    subtitle: "Upstream, Midstream & Downstream",
    description: "Technical and non-technical workforce for refineries, petrochemical plants, and pipeline projects.",
    image: "/images/hero/uae-industrial-hero.webp",
    imageAlt: "UAE oil and gas refinery infrastructure at sunset",
  },
  {
    id: "civil-construction",
    title: "Civil & Construction",
    subtitle: "Infrastructure & Commercial",
    description: "Skilled masons, carpenters, steel fixers, and civil supervisors for large-scale developments.",
    image: "/images/industries/civil-sector.webp",
    imageAlt: "High-rise civil construction workforce in Abu Dhabi",
  },
  {
    id: "mechanical-engineering",
    title: "Mechanical Engineering",
    subtitle: "Fabrication, Piping & Welding",
    description: "Certified multi-welders, structural fabricators, and pipe fitters for heavy industrial builds.",
    image: "/images/industries/mechanical-engineering.webp",
    imageAlt: "Mechanical engineering piping and welding operations",
  },
  {
    id: "electrical-engineering",
    title: "Electrical Engineering",
    subtitle: "Power, Switchgear & Instrumentation",
    description: "Industrial electricians and instrument technicians supporting power distribution and control systems.",
    image: "/images/industries/electrical-engineering.webp",
    imageAlt: "Electrical engineers inspecting industrial switchgear and PLC panels",
  },
  {
    id: "industrial-mep",
    title: "Industrial & MEP",
    subtitle: "Mechanical, Electrical & Plumbing",
    description: "Integrated MEP trades including HVAC technicians, ductmen, plumbers, and scaffolders.",
    image: "/images/services/quality-hse-inspection.webp",
    imageAlt: "Industrial MEP quality and safety inspection",
  },
  {
    id: "onshore-operations",
    title: "Onshore Operations",
    subtitle: "Industrial Zones & Field Facilities",
    description: "Sustained onshore workforce deployment across Musaffah, ICAD, KIZAD, and Ruwais industrial hubs.",
    image: "/images/workforce/workforce-coordination.webp",
    imageAlt: "Onshore industrial workforce coordination briefing",
  },
  {
    id: "offshore-operations",
    title: "Offshore Operations",
    subtitle: "Marine & Offshore Platforms",
    description: "Safety-compliant technical crews supporting offshore platforms, fabrication yards, and marine works.",
    image: "/images/industries/offshore-operations.webp",
    imageAlt: "Offshore platform engineering team in the Arabian Gulf",
  },
];
