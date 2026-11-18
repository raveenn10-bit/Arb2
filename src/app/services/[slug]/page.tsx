import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Check, MessageCircle, ArrowLeft } from "lucide-react";
import { SERVICES } from "@/data/services";
import { PageHero } from "@/components/ui/PageHero";
import { ManpowerRequestForm } from "@/components/forms/ManpowerRequestForm";
import { buildQuickEnquiryUrl } from "@/lib/whatsapp";
import { getServiceSchema } from "@/lib/seo";

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

  return {
    title: service.title,
    description: service.shortDescription,
    alternates: { canonical: `/services/${service.slug}` },
  };
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
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[#E5E7EB]">
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
              <h2 className="text-2xl font-extrabold text-[#111315]">
                Scope &amp; Operational Support
              </h2>
              <p className="text-base leading-relaxed text-[#667085]">
                {service.fullDescription}
              </p>
              <ul className="space-y-2.5 pt-2">
                {service.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm font-medium text-[#111315]"
                  >
                    <Check className="h-4 w-4 text-[#D40820] shrink-0 mt-1" />
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
                className="inline-flex items-center gap-2 rounded-md bg-[#25D366] px-5 py-3 text-sm font-bold text-[#111315] hover:bg-[#1fb858] transition-colors min-h-[44px]"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Direct WhatsApp Enquiry</span>
              </a>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-md border border-[#E5E7EB] px-5 py-3 text-sm font-semibold text-[#111315] hover:border-[#111315] min-h-[44px]"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>All Services</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-2xl font-extrabold text-[#111315]">
              Request {service.title}
            </h2>
            <p className="text-sm text-[#667085]">
              Submit your project requirements below to open a pre-formatted enquiry
              with our Abu Dhabi team on WhatsApp.
            </p>
            <ManpowerRequestForm />
          </div>
        </div>
      </section>
    </>
  );
}
