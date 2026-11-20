export const COMPANY = {
  name: "Pak Arab Manpower Supply LLC",
  shortName: "Pak Arab Manpower",
  /** Brand name Google should show as the site name on every search result (client requirement) */
  siteName: "PAK ARAB MANPOWER SUPPLY LLC – ABU DHABI",
  arabicName: "باك عرب لتوريد العمالة ذ.م.م",
  tagline: "Industrial Workforce Solutions · United Arab Emirates",
  domain: "https://www.pakarabmanpowersupply.ae",
  websiteDisplay: "pakarabmanpowersupply.ae",
  email: "info@pakarabmps.com",
  whatsapp: {
    display: "+971 55 384 2555",
    raw: "971553842555",
    url: "https://wa.me/971553842555",
  },
  telephone: {
    display: "+971 2 679 2576",
    tel: "tel:+97126792576",
  },
  additionalMobile: {
    display: "+971 56 699 5962",
    tel: "tel:+971566995962",
  },
  office: {
    label: "Abu Dhabi Head Office",
    address: "Office No. 05, M-Floor, Building C-06, Shabiya-12, Mussafah Commercial, P.O. Box: 133046, Abu Dhabi, UAE",
    city: "Abu Dhabi",
    district: "Shabiya-12, Mussafah",
    country: "United Arab Emirates",
    mapsUrl: "https://maps.app.goo.gl/kf37HP9V3XnApEXy6?g_st=aw",
    /**
     * Pin for the embedded Google map: the exact place the client's mapsUrl link opens
     * (Google labels that pin with the neighbouring building's name). Change here to move the pin site-wide.
     */
    mapsEmbedQuery: "بناية الدهيمي - 55 Ar Rasi St - Mohamed Bin Zayed City - ME12 - Abu Dhabi",
  },
  // Stored per client record; not publicly listed as a branch office pending client confirmation
  provisionalHistoricalAddress: {
    address: "Office No. 05, M-Floor, Building C-06, Shabiya-12, Mussafah Commercial, P.O. Box 133046, Abu Dhabi, UAE",
    poBox: "133046",
  },
  developer: {
    name: "Harsh Apex Digital Solutions",
    url: "https://harshapex.com.lk",
  },
  about: {
    heading: "Your Trusted Partner in Workforce Solutions",
    paragraphs: [
      "Pak Arab Manpower Supply LLC provides reliable and skilled manpower solutions for businesses across the United Arab Emirates. We work closely with our clients to understand their operational requirements and deliver workforce solutions tailored to their projects.",
      "Through careful candidate selection, structured workforce training, and ongoing operational support, our approach focuses on quality, efficiency, and professional workforce coordination across every stage of your project.",
    ],
    pillars: [
      {
        title: "Workforce Sourcing",
        description: "Access to a vetted pool of skilled and technical personnel matched to project specifications.",
      },
      {
        title: "Professional Staffing",
        description: "Reliable deployment of qualified tradesmen, technicians, and engineering support personnel.",
      },
      {
        title: "Employee Training",
        description: "Regular inductions and workforce readiness aligned with site safety and quality standards.",
      },
      {
        title: "Flexible Staffing",
        description: "Scalable short-term and long-term workforce arrangements adapted to changing project schedules.",
      },
      {
        title: "Operational Coordination",
        description: "Dedicated coordination covering payroll, benefits administration, and ongoing compliance support.",
      },
    ],
  },
  mission: {
    title: "Our Mission",
    text: "At Pak Arab Manpower Supply LLC, our mission is to bridge the gap between talent and opportunity by providing reliable, skilled and dedicated manpower solutions. We are committed to understanding the unique needs of our clients and delivering workforce solutions that drive their success while fostering growth and development for our employees. Through integrity, professionalism and excellence, we aim to be a trusted partner in the manpower supply industry.",
  },
  vision: {
    title: "Our Vision",
    text: "Our vision is to become a leading manpower supply company recognized for our exceptional service, innovative solutions and commitment to quality. We aspire to build lasting relationships with our clients and employees by consistently exceeding expectations and delivering value. By empowering individuals and businesses, we strive to contribute to the economic development and prosperity of the regions we serve.",
  },
  whyChooseUs: [
    {
      title: "Skilled Workforce",
      description: "Vetted technical and non-technical personnel across MEP, oil & gas, civil, and industrial trades.",
      icon: "Users",
    },
    {
      title: "Flexible Manpower Solutions",
      description: "Adaptable staffing structures tailored to project phases and shifting site demands.",
      icon: "SlidersHorizontal",
    },
    {
      title: "Workforce Training",
      description: "Thorough inductions and continuous skill alignment before and during site deployment.",
      icon: "GraduationCap",
    },
    {
      title: "Quality-Focused Operations",
      description: "Structured quality management procedures backed by independent QA/QC oversight.",
      icon: "ShieldCheck",
    },
    {
      title: "Client-Focused Approach",
      description: "Close coordination with project managers to understand exact technical and safety requirements.",
      icon: "Handshake",
    },
    {
      title: "Short-Term & Long-Term Support",
      description: "Reliable workforce coverage for shutdowns, turnarounds, and multi-year infrastructure contracts.",
      icon: "Clock",
    },
    {
      title: "Professional Coordination",
      description: "Streamlined payroll, benefits, and workforce administration to reduce client operational overhead.",
      icon: "ClipboardCheck",
    },
    {
      title: "Multiple Industrial Sectors",
      description: "Cross-sector capability spanning onshore and offshore oil & gas, civil construction, and MEP.",
      icon: "Layers",
    },
  ],
  qms: {
    title: "Quality Management System",
    intro: "Pak Arab Manpower Supply LLC is committed to providing the highest quality of services to its customers as per internationally acceptable standards. To consistently meet this commitment, Pak Arab Manpower Supply LLC operates an independent Department of Quality Control & Quality Assurance, fully supported by top management and employees at all levels.",
    pillars: [
      {
        step: "01",
        title: "Quality Manual",
        description: "Documented governance framework defining service standards, operational accountability, and compliance protocols.",
      },
      {
        step: "02",
        title: "Quality Assurance Procedure",
        description: "Standardized candidate screening, trade verification, and documentation checks prior to mobilization.",
      },
      {
        step: "03",
        title: "Implementation, Monitoring & Improvement",
        description: "Continuous tracking of workforce performance, client feedback, and corrective process enhancements.",
      },
      {
        step: "04",
        title: "Site Monitoring and Implementation",
        description: "Active on-site coordination to verify safety adherence, attendance, and operational productivity.",
      },
    ],
  },
} as const;
