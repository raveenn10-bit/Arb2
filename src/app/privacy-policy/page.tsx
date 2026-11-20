import type { Metadata } from "next";
import { COMPANY } from "@/data/company";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${COMPANY.name}, Abu Dhabi, United Arab Emirates.`,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal & Compliance"
        title="Privacy Policy"
        description={`How ${COMPANY.name} handles enquiry information shared through this website.`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy", href: "/privacy-policy" },
        ]}
      />

      <section className="py-16 sm:py-20 bg-white">
        <div className="container-wide max-w-4xl space-y-6 text-sm sm:text-base leading-relaxed text-slate">
          <div className="space-y-2">
            <h2 className="text-xl font-extrabold text-navy-900">
              1. Information Handling
            </h2>
            <p>
              This website operates as an informational corporate portal for{" "}
              {COMPANY.name}. Enquiry forms on this website format your entered project
              or career details locally in your browser and open a direct WhatsApp
              conversation with our team at {COMPANY.whatsapp.display}. No form
              submissions are stored in a website database.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-extrabold text-navy-900">
              2. Sensitive Documents
            </h2>
            <p>
              Applicants and clients are advised not to enter passport numbers,
              Emirates ID numbers, or confidential identity documents into website
              enquiry fields. Supporting documents may be shared directly via official
              email ({COMPANY.email}) or verified WhatsApp channels upon request.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-extrabold text-navy-900">
              3. External Links
            </h2>
            <p>
              Our site links to WhatsApp and Google Maps for direct communication and
              office directions. Interactions with those third-party services are
              governed by their respective privacy policies.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-extrabold text-navy-900">
              4. Contact Regarding Privacy
            </h2>
            <p>
              For questions regarding this policy, contact {COMPANY.name} at{" "}
              {COMPANY.email} or {COMPANY.office.address}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
