import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, Check } from "lucide-react";
import { SERVICES } from "@/data/services";
import { PageHero } from "@/components/ui/PageHero";
import { buildQuickEnquiryUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Pak Arab Manpower Supply LLC services: Manpower Supply, Workforce Support & Process, Oil & Gas, Civil & Construction, Mechanical & Electrical, and Travel & Transportation.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Industrial Manpower & Workforce Solutions"
        description="Structured staffing, technical trades, operational coordination, and workforce transportation tailored to UAE project requirements."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
        ]}
      />

      <section className="py-16 sm:py-20 bg-white">
        <div className="container-wide space-y-12">
          {SERVICES.map((service, idx) => (
            <div
              key={service.slug}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center rounded-xl border border-[#E5E7EB] p-6 sm:p-8 ${
                idx % 2 === 1 ? "bg-[#F5F6F8]" : "bg-white"
              }`}
            >
              <div
                className={`lg:col-span-5 relative aspect-[4/3] overflow-hidden rounded-lg border border-[#E5E7EB] ${
                  idx % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>

              <div className={`lg:col-span-7 space-y-4 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#D40820]">
                  Service {service.number}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111315]">
                  {service.title}
                </h2>
                <p className="text-base leading-relaxed text-[#667085]">
                  {service.fullDescription}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {service.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm font-medium text-[#111315]"
                    >
                      <Check className="h-4 w-4 text-[#D40820] shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3 pt-3">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 rounded-md bg-[#111315] px-5 py-3 text-sm font-semibold text-white hover:bg-[#D40820] transition-colors min-h-[44px]"
                  >
                    <span>View Service Details</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href={buildQuickEnquiryUrl(service.waTopic)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-[#25D366] px-5 py-3 text-sm font-semibold text-[#111315] hover:bg-[#1fb858] transition-colors min-h-[44px]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Request via WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
