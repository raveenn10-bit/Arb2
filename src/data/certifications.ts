export interface CertificationItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: "iso-suite",
    name: "ISO 9001 · ISO 14001 · ISO 45001",
    subtitle: "Quality, Environmental & Occupational Health & Safety",
    description:
      "Structured management frameworks aligned with international standards for service quality, environmental responsibility, and workplace health and safety.",
    image: "/images/certifications/iso-badges.png",
    imageAlt: "ISO 9001, ISO 14001, and ISO 45001 certification emblems",
  },
  {
    id: "imcd-uscb",
    name: "IMCD ISO 9001:2015 · USCB (5169)",
    subtitle: "Quality Management Accreditation Reference",
    description:
      "Quality Management System compliance reference under IMCD ISO 9001:2015 and USCB Accreditation Services reference 5169.",
    image: "/images/certifications/imcd-uscb-badge.png",
    imageAlt: "IMCD ISO 9001:2015 and USCB 5169 accreditation emblem",
  },
  {
    id: "icv",
    name: "ICV — In-Country Value",
    subtitle: "UAE Economic Contribution Alignment",
    description:
      "Supporting UAE industrial localization and In-Country Value objectives across energy and infrastructure supply chains.",
    image: "/images/certifications/icv-badge.png",
    imageAlt: "In-Country Value ICV logo",
  },
];
