import type { Metadata } from "next";
import { pageMeta } from "@/lib/page-meta";
import { PageHero } from "@/components/ui/PageHero";
import { WorkforceDirectory } from "@/components/sections/WorkforceDirectory";

export const metadata: Metadata = pageMeta({
  title: "62 Skilled Trades & Workforce Categories",
  description:
    "Browse 62 onshore/offshore MEP and Civil & Construction trades: welders, pipe fitters, riggers, electricians, scaffolders, masons, operators and more in the UAE.",
  path: "/workforce",
  keywords: ["welders supply UAE", "pipe fitters Abu Dhabi", "scaffolders manpower UAE", "skilled trades UAE"],
});

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
