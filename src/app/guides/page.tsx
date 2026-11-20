import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { pageMeta } from "@/lib/page-meta";
import { GUIDES } from "@/data/guides";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = pageMeta({
  title: "Manpower Hiring Guides for UAE Contractors",
  description:
    "Practical guides for UAE contractors on hiring oil & gas, construction and MEP manpower: choosing a supplier, CICPA site access and manpower supply vs recruitment.",
  path: "/guides",
  keywords: ["manpower hiring guide UAE", "how to hire manpower Abu Dhabi", "manpower supply guide"],
});

export default function GuidesPage() {
  return (
    <>
      <PageHero
        eyebrow="Guides"
        title="Manpower Hiring Guides"
        description="Straight answers for contractors and plant operators hiring skilled manpower in Abu Dhabi and across the UAE."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
        ]}
      />
      <section className="bg-white py-16 sm:py-20">
        <div className="container-wide grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {GUIDES.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-line bg-white transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[16/9]">
                <Image src={g.image} alt={g.imageAlt} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {g.readMinutes} min read
                </span>
                <h2 className="text-lg font-extrabold leading-snug text-navy-900 group-hover:text-brand">{g.title}</h2>
                <p className="text-sm leading-relaxed text-slate line-clamp-3">{g.description}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-navy-900">
                  Read guide <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
