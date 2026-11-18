import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { WorkforceDirectory } from "@/components/sections/WorkforceDirectory";

export const metadata: Metadata = {
  title: "Workforce Directory",
  description:
    "Search and filter Pak Arab Manpower Supply LLC's 62 active onshore/offshore MEP and Civil & Construction workforce categories in Abu Dhabi, UAE.",
  alternates: { canonical: "/workforce" },
};

export default function WorkforcePage() {
  return (
    <>
      <PageHero
        eyebrow="Workforce Categories"
        title="Interactive Workforce Directory"
        description="Search our Onshore & Offshore MEP and Civil & Construction manpower supply categories and request estimated crew quantities via WhatsApp."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Workforce Directory", href: "/workforce" },
        ]}
      />

      <section className="py-16 sm:py-20 bg-white">
        <div className="container-wide">
          <WorkforceDirectory />
        </div>
      </section>
    </>
  );
}
