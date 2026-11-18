import type { Metadata } from "next";
import Image from "next/image";
import { COMPANY } from "@/data/company";
import { CERTIFICATIONS } from "@/data/certifications";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Quality & Certifications",
  description:
    "Pak Arab Manpower Supply LLC Quality Management System (QMS), ISO 9001, ISO 14001, ISO 45001, IMCD/USCB, and ICV compliance standards.",
  alternates: { canonical: "/quality" },
};

export default function QualityPage() {
  return (
    <>
      <PageHero
        eyebrow="Quality & Compliance"
        title={COMPANY.qms.title}
        description="Committed to delivering reliable workforce services supported by structured quality assurance, site monitoring, and international management standards."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Quality & Certifications", href: "/quality" },
        ]}
      />

      <section className="py-16 sm:py-20 bg-white">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111315]">
              Independent Quality Control &amp; Assurance
            </h2>
            <p className="text-base leading-relaxed text-[#667085]">
              {COMPANY.qms.intro}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {COMPANY.qms.pillars.map((pillar) => (
                <div
                  key={pillar.step}
                  className="rounded-lg border border-[#E5E7EB] bg-[#F5F6F8] p-5 space-y-2"
                >
                  <span className="text-xs font-extrabold text-[#D40820]">
                    PILLAR {pillar.step}
                  </span>
                  <h3 className="text-base font-bold text-[#111315]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#667085] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-[4/3] overflow-hidden rounded-xl border border-[#E5E7EB]">
            <Image
              src="/images/services/quality-hse-inspection.webp"
              alt="Quality assurance and HSE inspection at an Abu Dhabi industrial site"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-[#F5F6F8] border-t border-[#E5E7EB]">
        <div className="container-wide space-y-10">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#D40820]">
              Standards &amp; Accreditations
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111315]">
              Certifications &amp; Compliance References
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.id}
                className="rounded-xl bg-white border border-[#E5E7EB] p-6 space-y-4"
              >
                <div className="relative h-24 w-full">
                  <Image
                    src={cert.image}
                    alt={cert.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain"
                  />
                </div>
                <div className="space-y-1.5 border-t border-[#E5E7EB] pt-4">
                  <h3 className="text-base font-bold text-[#111315]">{cert.name}</h3>
                  <p className="text-xs font-semibold text-[#D40820]">{cert.subtitle}</p>
                  <p className="text-sm text-[#667085] leading-relaxed pt-1">
                    {cert.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
