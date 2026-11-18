import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Check, MessageCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { SERVICES } from "@/data/services";
import { PageHero } from "@/components/ui/PageHero";
import { ManpowerRequestForm } from "@/components/forms/ManpowerRequestForm";
import { buildQuickEnquiryUrl } from "@/lib/whatsapp";
import { getServiceSchema } from "@/lib/seo";
import { pageMeta } from "@/lib/page-meta";

const SERVICE_SEO: Record<string, { title: string; description: string; keywords: string[] }> = {
  "manpower-supply": {
    title: "Manpower Supply Company in Abu Dhabi, UAE",
    description:
      "Skilled and unskilled manpower supply in Abu Dhabi and all 7 UAE emirates: vetted technicians, tradesmen and labour for short- and long-term industrial projects.",
    keywords: ["manpower supply Abu Dhabi", "manpower supply company UAE", "labour supply UAE"],
  },
  "workforce-support": {
    title: "Workforce Support, Payroll & Compliance UAE",
    description:
      "Outsourced workforce support in the UAE: inductions, training, payroll, benefits administration and compliance coordination for your site personnel.",
    keywords: ["workforce management UAE", "payroll outsourcing manpower", "manpower compliance UAE"],
  },
  "oil-and-gas": {
    title: "Oil & Gas Manpower Supply in UAE",
    description:
      "ADNOC-compliant, CICPA-eligible oil & gas manpower in the UAE: welders, pipe fitters, riggers, safety officers and shutdown crews for onshore and offshore sites.",
    keywords: ["oil and gas manpower UAE", "ADNOC manpower supply", "shutdown manpower Abu Dhabi", "offshore manpower UAE"],
  },
  "civil-construction": {
    title: "Construction Labour Supply in Abu Dhabi, UAE",
    description:
      "Civil & construction manpower in the UAE: masons, carpenters, steel fixers, plumbers, HVAC technicians, operators and site support for infrastructure projects.",
    keywords: ["construction labour supply Abu Dhabi", "civil manpower UAE", "construction workers supply UAE"],
  },
  "mechanical-electrical": {
    title: "Mechanical & Electrical Manpower in UAE",
    description:
      "Mechanical & electrical manpower supply in the UAE: fabricators, millwrights, industrial electricians, instrument technicians and MEP crews for industrial sites.",
    keywords: ["electrical manpower supply UAE", "mechanical manpower UAE", "MEP manpower Abu Dhabi"],
  },
  "travel-transportation": {
    title: "Workforce Transportation Services in UAE",
    description:
      "Staff and workforce transportation in the UAE: daily site commuting, shift-aligned crew movement and point-to-point logistics for project teams.",
    keywords: ["workforce transportation UAE", "staff transport Abu Dhabi", "labour transport services UAE"],
  },
};

export async function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found" };

  const seo = SERVICE_SEO[service.slug];
  return pageMeta({
    title: seo?.title ?? `${service.title} Services in UAE`,
    description: seo?.description ?? service.shortDescription,
    path: `/services/${service.slug}`,
    keywords: seo?.keywords,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const serviceSchema = getServiceSchema(
    service.title,
    service.fullDescription,
    service.slug
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <PageHero
        eyebrow={`Service ${service.number}`}
        title={service.title}
        description={service.shortDescription}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title, href: `/services/${service.slug}` },
        ]}
      />

      <section className="py-16 sm:py-20 bg-white">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-6 space-y-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line">
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold text-navy-900">
                Scope &amp; Operational Support
              </h2>
              <p className="text-base leading-relaxed text-slate">
                {service.fullDescription}
              </p>
              <ul className="space-y-2.5 pt-2">
                {service.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm font-medium text-navy-900"
                  >
                    <Check className="h-4 w-4 text-brand shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={buildQuickEnquiryUrl(service.waTopic)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-[#25D366] px-5 py-3 text-sm font-bold text-navy-900 hover:bg-[#1fb858] transition-colors min-h-[44px]"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Direct WhatsApp Enquiry</span>
              </a>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 text-sm font-semibold text-navy-900 hover:border-navy-900 min-h-[44px]"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>All Services</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-2xl font-extrabold text-navy-900">
              Request {service.title}
            </h2>
            <p className="text-sm text-slate">
              Submit your project requirements below to open a pre-formatted enquiry
              with our Abu Dhabi team on WhatsApp.
            </p>
            <ManpowerRequestForm />
          </div>
        </div>
      </section>

      {/* Related services — internal linking */}
      <section className="py-14 sm:py-16 bg-mist border-t border-line">
        <div className="container-wide space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-navy-900">
            Other Manpower Services in the UAE
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {SERVICES.filter((s) => s.slug !== service.slug).map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group rounded-xl border border-line bg-white p-5 hover:border-brand/60 hover:shadow-md transition-all"
              >
                <span className="text-xs font-bold text-brand">Service {s.number}</span>
                <h3 className="mt-1 text-base font-extrabold text-navy-900 group-hover:text-brand transition-colors">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-slate line-clamp-3">{s.shortDescription}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-navy-900">
                  Learn more <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
