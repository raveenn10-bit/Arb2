import type { Metadata } from "next";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { COMPANY } from "@/data/company";
import { PageHero } from "@/components/ui/PageHero";
import { ManpowerRequestForm } from "@/components/forms/ManpowerRequestForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Pak Arab Manpower Supply LLC in Abu Dhabi, UAE — Office No. A03, Wurth Gulf Building, Plot No. 42, M14. WhatsApp +971 55 384 2555.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="Contact Pak Arab Manpower Supply LLC"
        description="Reach our Abu Dhabi coordination office by WhatsApp, telephone, email, or visit us at Wurth Gulf Building, Musaffah M14."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact Us", href: "/contact" },
        ]}
      />

      <section className="py-16 sm:py-20 bg-white">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-xl border border-[#E5E7EB] bg-[#F5F6F8] p-6 sm:p-8 space-y-5">
              <h2 className="text-xl font-extrabold text-[#111315]">
                {COMPANY.office.label}
              </h2>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#D40820] shrink-0 mt-0.5" />
                  <span className="text-[#111315] font-medium">
                    {COMPANY.office.address}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-[#25D366] shrink-0" />
                  <a
                    href={COMPANY.whatsapp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#111315] hover:text-[#D40820]"
                  >
                    WhatsApp: {COMPANY.whatsapp.display}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[#D40820] shrink-0" />
                  <a
                    href={COMPANY.telephone.tel}
                    className="font-medium text-[#111315] hover:text-[#D40820]"
                  >
                    Tel: {COMPANY.telephone.display}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[#D40820] shrink-0" />
                  <a
                    href={COMPANY.additionalMobile.tel}
                    className="font-medium text-[#111315] hover:text-[#D40820]"
                  >
                    Mobile: {COMPANY.additionalMobile.display}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-[#D40820] shrink-0" />
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="font-medium text-[#111315] hover:text-[#D40820]"
                  >
                    {COMPANY.email}
                  </a>
                </div>
              </div>

              <a
                href={COMPANY.office.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#111315] px-5 py-3 text-sm font-semibold text-white hover:bg-[#D40820] transition-colors min-h-[44px]"
              >
                <MapPin className="h-4 w-4" />
                <span>Open in Google Maps</span>
              </a>
            </div>

            <div className="rounded-xl overflow-hidden border border-[#E5E7EB] h-72">
              <iframe
                title="Pak Arab Manpower Supply LLC Abu Dhabi Location"
                src="https://maps.google.com/maps?q=Wurth+Gulf+Building+Plot+42+M14+Musaffah+Abu+Dhabi+UAE&t=&z=15&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-2xl font-extrabold text-[#111315]">
              Send a Manpower Enquiry
            </h2>
            <p className="text-sm text-[#667085]">
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
