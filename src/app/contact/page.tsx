import type { Metadata } from "next";
import { MapFrame } from "@/components/sections/LocationSection";
import { pageMeta } from "@/lib/page-meta";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { COMPANY } from "@/data/company";
import { PageHero } from "@/components/ui/PageHero";
import { ManpowerRequestForm } from "@/components/forms/ManpowerRequestForm";

export const metadata: Metadata = pageMeta({
  title: "Contact & Request Manpower – Abu Dhabi",
  description:
    "Request manpower or contact Pak Arab Manpower Supply LLC, Office 05, Building C-06, Shabiya-12, Mussafah, Abu Dhabi. WhatsApp +971 55 384 2555 · Tel +971 2 679 2576.",
  path: "/contact",
  keywords: ["request manpower Abu Dhabi", "manpower supply contact UAE"],
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="Contact Pak Arab Manpower Supply LLC"
        description="Reach our Abu Dhabi coordination office by WhatsApp, telephone, email, or visit us at Building C-06, Shabiya-12, Mussafah."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact Us", href: "/contact" },
        ]}
      />

      <section className="py-16 sm:py-20 bg-white">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-xl border border-line bg-mist p-6 sm:p-8 space-y-5">
              <h2 className="text-xl font-extrabold text-navy-900">
                {COMPANY.office.label}
              </h2>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                  <span className="text-navy-900 font-medium">
                    {COMPANY.office.address}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-[#25D366] shrink-0" />
                  <a
                    href={COMPANY.whatsapp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-navy-900 hover:text-brand"
                  >
                    WhatsApp: {COMPANY.whatsapp.display}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-brand shrink-0" />
                  <a
                    href={COMPANY.telephone.tel}
                    className="font-medium text-navy-900 hover:text-brand"
                  >
                    Tel: {COMPANY.telephone.display}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-brand shrink-0" />
                  <a
                    href={COMPANY.additionalMobile.tel}
                    className="font-medium text-navy-900 hover:text-brand"
                  >
                    Mobile: {COMPANY.additionalMobile.display}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-brand shrink-0" />
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="font-medium text-navy-900 hover:text-brand"
                  >
                    {COMPANY.email}
                  </a>
                </div>
              </div>

              <a
                href={COMPANY.office.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-navy-900 px-5 py-3 text-sm font-semibold text-white hover:bg-brand transition-colors min-h-[2.75rem]"
              >
                <MapPin className="h-4 w-4" />
                <span>Open in Google Maps</span>
              </a>
            </div>

            <div className="rounded-xl overflow-hidden border border-line h-72">
              <MapFrame tone="dark" />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-2xl font-extrabold text-navy-900">
              Send a Manpower Enquiry
            </h2>
            <p className="text-sm text-slate">
              Fill in your project details below to open a pre-formatted enquiry on
              WhatsApp ({COMPANY.whatsapp.display}).
            </p>
            <ManpowerRequestForm />
          </div>
        </div>
      </section>
    </>
  );
}
