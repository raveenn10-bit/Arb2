import type { Metadata } from "next";
import { pageMeta } from "@/lib/page-meta";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ClientLogoGrid } from "@/components/sections/ClientLogoGrid";

export const metadata: Metadata = pageMeta({
  title: "Our Clients – 26 UAE Energy & EPC Firms",
  description:
    "See the 26 UAE energy, EPC, construction and industrial companies, including ADNOC, NPCC, Lamprell and Al Jaber, that Pak Arab Manpower has supplied workforce to.",
  path: "/clients",
  keywords: ["Pak Arab Manpower clients", "ADNOC manpower supplier", "EPC manpower UAE"],
});

export default function ClientsPage() {
  return (
    <>
      <PageHero
        eyebrow="Client Portfolio"
        title="Companies We Supply Manpower To"
        description="A portfolio of 26 leading UAE energy, construction, fabrication, and industrial companies supported by Pak Arab Manpower Supply LLC."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Our Clients", href: "/clients" },
        ]}
      />

      <section className="py-16 sm:py-20 bg-white">
        <div className="container-wide space-y-10">
          <ClientLogoGrid variant="rows" />

          <div className="rounded-xl bg-mist border border-line p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <h2 className="text-xl font-extrabold text-navy-900">
                Need Manpower Support for Your Next UAE Project?
              </h2>
              <p className="text-sm text-slate">
                Share your trade categories, crew size, and site location with our Abu Dhabi team.
              </p>
            </div>
            <Link
              href="/#manpower-request"
              className="inline-flex items-center gap-2 rounded-md bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark transition-colors shrink-0 min-h-[2.75rem]"
            >
              <span>Request Manpower</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
