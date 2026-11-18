import type { Metadata } from "next";
import { pageMeta } from "@/lib/page-meta";
import { PageHero } from "@/components/ui/PageHero";
import { CareersForm } from "@/components/forms/CareersForm";
import { WORKFORCE_ROLES } from "@/data/workforce";

export const metadata: Metadata = pageMeta({
  title: "UAE Jobs – Skilled Trades Careers",
  description:
    "Looking for skilled trade jobs in the UAE? Send your trade, experience and CV to Pak Arab Manpower Supply LLC in Abu Dhabi via our quick WhatsApp job enquiry.",
  path: "/careers",
  keywords: ["jobs in UAE skilled trades", "manpower jobs Abu Dhabi", "welder jobs UAE"],
});

export default function CareersPage() {
  const mepCount = WORKFORCE_ROLES.filter((r) => r.division === "mep").length;
  const civilCount = WORKFORCE_ROLES.filter((r) => r.division === "civil").length;

  return (
    <>
      <PageHero
        eyebrow="Careers & Recruitment Enquiries"
        title="Submit Your Trade Profile"
        description="Skilled technicians, engineers, welders, and civil tradesmen can submit a general job enquiry via WhatsApp and attach their CV directly in chat."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Careers", href: "/careers" },
        ]}
      />

      <section className="py-16 sm:py-20 bg-white">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-2xl font-extrabold text-navy-900">
              How Job Enquiries Work
            </h2>
            <p className="text-base leading-relaxed text-slate">
              Pak Arab Manpower Supply LLC maintains a candidate pool across{" "}
              {mepCount} Onshore/Offshore MEP categories and {civilCount} Civil &amp;
              Construction trades. Submitting this form formats your experience summary
              for our recruitment team on WhatsApp.
            </p>
            <div className="rounded-xl border border-line bg-mist p-5 space-y-2 text-sm text-slate">
              <p className="font-bold text-navy-900">Important Notice for Applicants</p>
              <p>
                Do not enter passport numbers, Emirates ID numbers, or sensitive
                identity documents in this form. Once WhatsApp opens, you may attach your
                CV directly in the conversation.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <CareersForm />
          </div>
        </div>
      </section>
    </>
  );
}
