import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { INDUSTRIES } from "@/data/services";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "Industrial manpower supply across Oil & Gas, Civil & Construction, Mechanical Engineering, Electrical Engineering, Industrial & MEP, and Onshore/Offshore UAE operations.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industry Coverage"
        title="Industries We Serve Across the UAE"
        description="Providing skilled technical and civil manpower across onshore and offshore industrial sectors in Abu Dhabi and the wider Emirates."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
        ]}
      />

      <section className="py-16 sm:py-20 bg-white">
        <div className="container-wide grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES.map((industry) => (
            <div
              key={industry.id}
              className="rounded-xl border border-[#E5E7EB] bg-white overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={industry.image}
                  alt={industry.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D40820]">
                    {industry.subtitle}
                  </span>
                  <h2 className="text-xl font-extrabold text-[#111315] mt-1">
                    {industry.title}
                  </h2>
                  <p className="text-sm text-[#667085] leading-relaxed mt-2">
                    {industry.description}
                  </p>
                </div>
                <div className="pt-4">
                  <Link
                    href="/workforce"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#111315] hover:text-[#D40820]"
                  >
                    <span>View Related Trades</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
