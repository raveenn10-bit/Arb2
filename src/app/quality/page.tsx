import type { Metadata } from "next";
import { pageMeta } from "@/lib/page-meta";
import Image from "next/image";
import { COMPANY } from "@/data/company";
import { CERTIFICATIONS } from "@/data/certifications";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = pageMeta({
  title: "ISO Certified Quality & HSE Standards",
  description:
    "Pak Arab Manpower operates under ISO 9001, ISO 14001 and ISO 45001 frameworks with IMCD/USCB accreditation and ICV alignment for safe, compliant UAE workforce.",
  path: "/quality",
  keywords: ["ISO certified manpower company UAE", "HSE manpower Abu Dhabi", "ICV manpower supplier"],
});

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
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
              Independent Quality Control &amp; Assurance
            </h2>
            <p className="text-base leading-relaxed text-slate">
              {COMPANY.qms.intro}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {COMPANY.qms.pillars.map((pillar) => (
                <div
                  key={pillar.step}
                  className="rounded-lg border border-line bg-mist p-5 space-y-2"
                >
                  <span className="text-xs font-extrabold text-brand">
                    PILLAR {pillar.step}
                  </span>
                  <h3 className="text-base font-bold text-navy-900">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-[4/3] overflow-hidden rounded-xl border border-line">
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

      <section className="py-16 sm:py-20 bg-mist border-t border-line">
        <div className="container-wide space-y-10">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
              Standards &amp; Accreditations
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
              Certifications &amp; Compliance References
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.id}
                className="rounded-xl bg-white border border-line p-6 space-y-4"
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
                <div className="space-y-1.5 border-t border-line pt-4">
                  <h3 className="text-base font-bold text-navy-900">{cert.name}</h3>
                  <p className="text-xs font-semibold text-brand">{cert.subtitle}</p>
                  <p className="text-sm text-slate leading-relaxed pt-1">
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
