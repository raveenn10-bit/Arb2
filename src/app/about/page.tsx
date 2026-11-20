import type { Metadata } from "next";
import { pageMeta } from "@/lib/page-meta";
import Image from "next/image";
import Link from "next/link";
import { Target, Eye, Check, ArrowRight } from "lucide-react";
import { COMPANY } from "@/data/company";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = pageMeta({
  title: "About Our Abu Dhabi Manpower Company",
  description:
    "Pak Arab Manpower Supply LLC is an Abu Dhabi manpower supply company in Shabiya-12, Mussafah delivering vetted, skilled industrial workforce across all 7 UAE emirates.",
  path: "/about",
  keywords: ["manpower company Abu Dhabi", "about Pak Arab Manpower", "manpower supply company Musaffah"],
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About The Company"
        title={COMPANY.about.heading}
        description="Providing reliable, skilled, and coordinated industrial manpower solutions across Abu Dhabi and the United Arab Emirates."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
        ]}
      />

      <section className="py-16 sm:py-20 bg-white">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
              {COMPANY.name}
            </h2>
            {COMPANY.about.paragraphs.map((p, idx) => (
              <p key={idx} className="text-base leading-relaxed text-slate">
                {p}
              </p>
            ))}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
              {COMPANY.about.pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="rounded-lg border border-line bg-mist p-4 space-y-1"
                >
                  <div className="flex items-center gap-2 font-bold text-sm text-navy-900">
                    <Check className="h-4 w-4 text-brand" />
                    <span>{pillar.title}</span>
                  </div>
                  <p className="text-xs text-slate leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-[4/3] overflow-hidden rounded-xl border border-line">
            <Image
              src="/images/workforce/workforce-coordination.webp"
              alt="Pak Arab Manpower Supply LLC workforce coordination team"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-mist border-t border-line">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-xl bg-white border border-line p-8 space-y-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand/10 text-brand">
              <Target className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-navy-900">
              {COMPANY.mission.title}
            </h2>
            <p className="text-base leading-relaxed text-slate">
              {COMPANY.mission.text}
            </p>
          </div>

          <div className="rounded-xl bg-navy-800 text-white p-8 space-y-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 text-white">
              <Eye className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-extrabold">{COMPANY.vision.title}</h2>
            <p className="text-base leading-relaxed text-white/80">
              {COMPANY.vision.text}
            </p>
          </div>
        </div>

        <div className="container-wide mt-10 flex flex-wrap gap-4">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-md bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark transition-colors min-h-[2.75rem]"
          >
            <span>Explore Our Services</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/workforce"
            className="inline-flex items-center gap-2 rounded-md border border-navy-900 px-5 py-3 text-sm font-semibold text-navy-900 hover:bg-navy-900 hover:text-white transition-colors min-h-[2.75rem]"
          >
            <span>Browse Workforce Directory</span>
          </Link>
        </div>
      </section>
    </>
  );
}
