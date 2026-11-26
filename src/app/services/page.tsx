import type { Metadata } from "next";
import { pageMeta } from "@/lib/page-meta";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, Check } from "lucide-react";
import { SERVICES } from "@/data/services";
import { PageHero } from "@/components/ui/PageHero";
import { buildQuickEnquiryUrl } from "@/lib/whatsapp";

export const metadata: Metadata = pageMeta({
  title: "Manpower Supply Services in the UAE",
  description:
    "Manpower supply, workforce support, Oil & Gas, Civil & Construction, Mechanical & Electrical and workforce transport services in Abu Dhabi and across the UAE.",
  path: "/services",
  keywords: ["manpower supply services UAE", "labour supply Abu Dhabi", "industrial staffing UAE"],
});

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

      {/* sticky service quick-nav (chips) */}
      <nav aria-label="Services on this page" className="sticky top-16 lg:top-[4.625rem] z-30 border-b border-line bg-white/90 backdrop-blur-md">
        <div className="container-wide">
          <ul className="flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {SERVICES.map((s) => (
              <li key={s.slug} className="shrink-0">
                <a
                  href={`#${s.slug}`}
                  className="group inline-flex min-h-10 items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-mist px-4 text-xs font-semibold text-navy-900 transition-colors hover:border-brand hover:bg-brand hover:text-white"
                >
                  <span className="tabular-nums text-brand group-hover:text-white">{s.number}</span>
                  <span aria-hidden="true">·</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <section className="py-16 sm:py-20 bg-white">
        <div className="container-wide space-y-12">
          {SERVICES.map((service, idx) => (
            <div
              key={service.slug}
              id={service.slug}
              className={`scroll-mt-36 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center rounded-xl border border-line p-6 sm:p-8 ${
                idx % 2 === 1 ? "bg-mist" : "bg-white"
              }`}
            >
              <div
                className={`lg:col-span-5 relative aspect-[4/3] overflow-hidden rounded-lg border border-line ${
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
                <span className="text-xs font-extrabold uppercase tracking-widest text-brand">
                  Service {service.number}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
                  {service.title}
                </h2>
                <p className="text-base leading-relaxed text-slate">
                  {service.fullDescription}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {service.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm font-medium text-navy-900"
                    >
                      <Check className="h-4 w-4 text-brand shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3 pt-3">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 rounded-md bg-navy-900 px-5 py-3 text-sm font-semibold text-white hover:bg-brand transition-colors min-h-[2.75rem]"
                  >
                    <span>View Service Details</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href={buildQuickEnquiryUrl(service.waTopic)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-[#25D366] px-5 py-3 text-sm font-semibold text-navy-900 hover:bg-[#1fb858] transition-colors min-h-[2.75rem]"
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
