import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Target,
  Eye,
  Users,
  SlidersHorizontal,
  GraduationCap,
  ShieldCheck,
  Handshake,
  Clock,
  ClipboardCheck,
  Layers,
  MessageCircle,
  Bus,
  Check,
} from "lucide-react";
import { COMPANY } from "@/data/company";
import { SERVICES, INDUSTRIES } from "@/data/services";
import { CERTIFICATIONS } from "@/data/certifications";
import { HeroSection } from "@/components/sections/HeroSection";
import { SiteStory3D } from "@/components/three/SiteStory3D";
import { KineticMarquee } from "@/components/fx/KineticMarquee";
import { StatsBand } from "@/components/fx/StatsBand";
import { TiltCard } from "@/components/fx/TiltCard";
import { ClientLogoGrid } from "@/components/sections/ClientLogoGrid";
import { CLIENTS } from "@/data/clients";
import { TeamShowcase } from "@/components/sections/TeamShowcase";
import { TradesShowcase } from "@/components/sections/TradesShowcase";
import { LocationSection } from "@/components/sections/LocationSection";
import { ManpowerRequestForm } from "@/components/forms/ManpowerRequestForm";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { GsapReveal } from "@/components/animations/GsapReveal";
import { MobileAutoTrack } from "@/components/animations/MobileAutoTrack";
import { VantaNetBackground } from "@/components/animations/VantaNetBackground";
import { buildQuickEnquiryUrl } from "@/lib/whatsapp";
import { getFaqSchema, getWebPageSchema, jsonLd } from "@/lib/seo";

const WHY_ICONS: Record<string, typeof Users> = {
  Users,
  SlidersHorizontal,
  GraduationCap,
  ShieldCheck,
  Handshake,
  Clock,
  ClipboardCheck,
  Layers,
};

export default function HomePage() {
  const travelService = SERVICES.find((s) => s.slug === "travel-transportation")!;

  const faqSchema = getFaqSchema();
  const pageSchema = getWebPageSchema({
    path: "/",
    name: `${COMPANY.siteName} | Manpower Supply Company UAE`,
    description:
      "Skilled industrial manpower supply in Abu Dhabi and across all 7 UAE emirates for Oil & Gas, MEP, Civil & Construction, Mechanical and Electrical projects.",
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(pageSchema) }} />
      {/* 2. Cinematic Industrial Hero */}
      <HeroSection />
      <KineticMarquee />

      {/* 3. About Pak Arab */}
      <section id="about-company" className="py-16 sm:py-24 bg-white">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <GsapReveal className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2.5">
              <span className="h-[2px] w-8 bg-brand" />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
                About Pak Arab Manpower Supply LLC
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-navy-900">
              {COMPANY.about.heading}
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-slate">
              {COMPANY.about.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {COMPANY.about.pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="flex items-start gap-2.5 rounded-lg border border-line bg-mist p-3.5"
                >
                  <Check className="h-4 w-4 text-brand shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <div className="text-sm font-bold text-navy-900">{pillar.title}</div>
                    <div className="text-xs text-slate mt-0.5">{pillar.description}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-md bg-navy-900 px-5 py-3 text-sm font-semibold text-white hover:bg-brand transition-colors min-h-[2.75rem]"
              >
                <span>Explore Our Company</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </GsapReveal>

          <GsapReveal delay={0.12} className="lg:col-span-6">
            {/* Borderless image that fades softly into the white section (see .image-edge-fade) */}
            <div data-no-anim className="image-edge-fade relative aspect-[4/3] w-full">
              <Image
                src="/images/services/manpower-briefing.webp"
                alt="Pak Arab workforce coordination briefing at an Abu Dhabi industrial site"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </GsapReveal>
        </div>
      </section>

      {/* 3b. Our Teams On Site (client-supplied branded crew photos) */}
      {/* Real figures only, taken from the site's own data */}
      <section aria-label="Pak Arab Manpower at a glance" className="relative bg-navy-900 py-14 sm:py-20">
        <div className="container-wide">
          <StatsBand
            stats={[
              { value: CLIENTS.length, suffix: "+", label: "Clients served" },
              { value: SERVICES.length, label: "Core services" },
              { value: INDUSTRIES.length, label: "Industries" },
              { value: 7, label: "Emirates covered" },
            ]}
          />
        </div>
      </section>

      <SiteStory3D />

      <TeamShowcase />

      {/* 4. Mission & Vision (Upper-section priority per client request) */}
      <section className="py-16 sm:py-20 bg-mist border-y border-line">
        <div className="container-wide space-y-10">
          <GsapReveal className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
              Core Values &amp; Direction
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-navy-900">
              Our Mission &amp; Vision
            </h2>
          </GsapReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <GsapReveal className="rounded-xl bg-white border border-line p-7 sm:p-9 relative overflow-hidden">
              <div className="absolute top-0 left-0 h-1.5 w-full bg-brand" />
              <div className="icon-pulse relative inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand/10 text-brand mb-5">
                <Target className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-extrabold text-navy-900 mb-3">
                {COMPANY.mission.title}
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-slate">
                {COMPANY.mission.text}
              </p>
            </GsapReveal>

            <GsapReveal
              delay={0.1}
              className="rounded-xl bg-navy-800 text-white border border-white/10 p-7 sm:p-9 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 h-1.5 w-full bg-white/30" />
              <div className="icon-pulse relative inline-flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 text-white mb-5">
                <Eye className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-3">
                {COMPANY.vision.title}
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-white/80">
                {COMPANY.vision.text}
              </p>
            </GsapReveal>
          </div>
        </div>
      </section>

      {/* 5. Our Services */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container-wide space-y-12">
          <GsapReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
                What We Deliver
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-navy-900">
                Comprehensive Manpower Services
              </h2>
              <p className="text-base text-slate">
                Structured workforce solutions tailored to UAE industrial, energy, civil,
                and engineering projects.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand hover:text-brand-dark shrink-0"
            >
              <span>View All Service Details</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </GsapReveal>

          <MobileAutoTrack desktopGridClass="md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {SERVICES.map((service) => (
              <TiltCard key={service.slug} className="min-w-[18.125rem] sm:min-w-[20rem] md:min-w-0 shrink-0 md:shrink snap-start">
              <div
                className="group h-full flex flex-col rounded-2xl border border-line bg-white overflow-hidden hover:border-brand/60 transition-colors duration-200"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-navy-900">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 rounded bg-navy-900/90 px-2.5 py-1 text-xs font-bold text-white">
                    {service.number}
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-extrabold text-navy-900 group-hover:text-brand transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate">
                      {service.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-line flex items-center justify-between gap-3">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-navy-900 hover:text-brand min-h-[2.5rem]"
                    >
                      <span>Explore Service</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    <a
                      href={buildQuickEnquiryUrl(service.waTopic)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md bg-mist hover:bg-[#25D366] px-3 py-2 text-xs font-semibold text-navy-900 transition-colors min-h-[2.5rem]"
                    >
                      <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Enquire</span>
                    </a>
                  </div>
                </div>
              </div>
              </TiltCard>
            ))}
          </MobileAutoTrack>
        </div>
      </section>

      {/* 6. Industries We Serve */}
      <section className="py-16 sm:py-24 bg-navy-900 text-white">
        <div className="container-wide space-y-12">
          <GsapReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-light">
                Sectors We Support
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Industries We Serve Across the UAE
              </h2>
              <p className="text-base text-white/75">
                Dedicated onshore and offshore manpower coverage across energy, civil
                infrastructure, and industrial engineering.
              </p>
            </div>
            <Link
              href="/industries"
              className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-brand transition-colors shrink-0"
            >
              <span>Explore Industries</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </GsapReveal>

          <MobileAutoTrack desktopGridClass="md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {INDUSTRIES.map((industry) => (
              <TiltCard key={industry.id} max={12} className="min-w-[16.875rem] sm:min-w-[18.75rem] md:min-w-0 shrink-0 md:shrink snap-start">
              <div
                className="group relative aspect-[4/5] md:aspect-[4/3] rounded-2xl overflow-hidden border border-white/10"
              >
                <Image
                  src={industry.image}
                  alt={industry.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/55 to-transparent" />
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <p className="text-[0.6875rem] font-bold uppercase tracking-wider text-brand">
                    {industry.subtitle}
                  </p>
                  <h3 className="text-lg font-extrabold text-white mt-0.5">
                    {industry.title}
                  </h3>
                  <p className="text-xs text-white/75 mt-1 line-clamp-2">
                    {industry.description}
                  </p>
                </div>
              </div>
              </TiltCard>
            ))}
          </MobileAutoTrack>
        </div>
      </section>

      {/* 7. Travel & Transportation (Dedicated Client-Requested Section) */}
      <section className="py-16 sm:py-20 bg-mist border-b border-line">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <GsapReveal className="lg:col-span-6 relative aspect-[4/3] overflow-hidden rounded-xl border border-line">
            <Image
              src={travelService.image}
              alt={travelService.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </GsapReveal>

          <GsapReveal delay={0.1} className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-white border border-line px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-navy-900">
              <Bus className="h-4 w-4 text-brand" aria-hidden="true" />
              <span>Workforce Logistics</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-navy-900">
              Travel &amp; Transportation Support
            </h2>
            <p className="text-base leading-relaxed text-slate">
              {travelService.fullDescription}
            </p>
            <ul className="space-y-2.5">
              {travelService.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2.5 text-sm font-medium text-navy-900">
                  <Check className="h-4 w-4 text-brand shrink-0" aria-hidden="true" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/services/travel-transportation"
                className="inline-flex items-center gap-2 rounded-md bg-navy-900 px-5 py-3 text-sm font-semibold text-white hover:bg-brand transition-colors min-h-[2.75rem]"
              >
                <span>Explore Travel &amp; Transportation</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={buildQuickEnquiryUrl("Workforce Travel & Transportation Support")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-[#25D366] px-5 py-3 text-sm font-semibold text-navy-900 hover:bg-[#1fb858] transition-colors min-h-[2.75rem]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>Request Logistics Support</span>
              </a>
            </div>
          </GsapReveal>
        </div>
      </section>

      {/* 8. Trades Ready to Mobilise */}
      <TradesShowcase />

      {/* 9. Why Choose Pak Arab */}
      <section className="py-16 sm:py-24 bg-mist border-y border-line">
        <div className="container-wide space-y-12">
          <GsapReveal className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
              Operational Standards
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-navy-900">
              Why Choose Pak Arab Manpower Supply LLC
            </h2>
          </GsapReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {COMPANY.whyChooseUs.map((item) => {
              const Icon = WHY_ICONS[item.icon] || Users;
              return (
                <div
                  key={item.title}
                  className="rounded-xl bg-white border border-line p-6 hover:border-brand/60 transition-colors"
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand/10 text-brand mb-4">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-extrabold text-navy-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. Quality Management System */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <GsapReveal className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
              Quality Assurance &amp; HSE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-navy-900">
              {COMPANY.qms.title}
            </h2>
            <p className="text-base leading-relaxed text-slate">
              {COMPANY.qms.intro}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {COMPANY.qms.pillars.map((pillar) => (
                <div
                  key={pillar.step}
                  className="rounded-lg border border-line bg-mist p-4 space-y-1.5"
                >
                  <span className="text-xs font-extrabold text-brand">
                    {pillar.step}
                  </span>
                  <h3 className="text-sm font-bold text-navy-900">{pillar.title}</h3>
                  <p className="text-xs text-slate leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
            <div>
              <Link
                href="/quality"
                className="inline-flex items-center gap-2 text-sm font-bold text-brand hover:text-brand-dark"
              >
                <span>View Quality &amp; Accreditations</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </GsapReveal>

          <GsapReveal delay={0.12} className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-line">
              <Image
                src="/images/services/quality-hse-inspection.webp"
                alt="HSE safety officer and quality engineer inspecting industrial site compliance"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </GsapReveal>
        </div>
      </section>

      {/* 11. Compact Certifications & Accreditations */}
      <section className="py-12 sm:py-16 bg-mist border-y border-line">
        <div className="container-wide space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
                Standards &amp; Compliance
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 mt-1">
                Certifications &amp; Accreditations
              </h2>
            </div>
            <Link
              href="/quality"
              className="text-sm font-semibold text-navy-900 hover:text-brand"
            >
              Details &amp; Documentation →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.id}
                className="flex items-center gap-4 rounded-xl bg-white border border-line p-5"
              >
                <div className="relative h-16 w-24 shrink-0">
                  <Image
                    src={cert.image}
                    alt={cert.imageAlt}
                    fill
                    sizes="96px"
                    className="object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-navy-900">{cert.name}</h3>
                  <p className="text-xs text-slate mt-1">{cert.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Our Valued Clients */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container-wide space-y-10">
          <GsapReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
                Client Portfolio
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-navy-900">
                Companies We Have Supplied Manpower To
              </h2>
              <p className="text-base text-slate">
                Supporting major UAE energy, EPC, infrastructure, and industrial
                organizations with skilled technical and civil personnel.
              </p>
            </div>
            <Link
              href="/clients"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand hover:text-brand-dark shrink-0"
            >
              <span>View All {CLIENTS.length} Clients</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </GsapReveal>

          <ClientLogoGrid />
        </div>
      </section>

      {/* 13. Manpower Request CTA (with Vanta.js NET dark industrial backdrop) */}
      <section
        id="manpower-request"
        className="relative py-16 sm:py-24 bg-navy-900 overflow-hidden"
      >
        <VantaNetBackground />
        <div className="container-wide relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-5 text-white space-y-5">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-light">
              Direct WhatsApp Coordination
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Request Manpower for Your Project
            </h2>
            <p className="text-base leading-relaxed text-white/80">
              Complete the project requirements form to generate a structured enquiry
              directly to our Abu Dhabi coordination team on WhatsApp (
              {COMPANY.whatsapp.display}).
            </p>
            <div className="rounded-xl border border-white/15 bg-white/5 p-5 space-y-3 text-sm text-white/85">
              <div className="font-bold text-white">Direct Contact Channels</div>
              <p>WhatsApp: {COMPANY.whatsapp.display}</p>
              <p>Telephone: {COMPANY.telephone.display}</p>
              <p>Email: {COMPANY.email}</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ManpowerRequestForm />
          </div>
        </div>
      </section>

      {/* 14. FAQ */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container-wide space-y-10">
          <GsapReveal className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-navy-900">
              Answers for Project &amp; HR Teams
            </h2>
          </GsapReveal>
          <FaqAccordion />
        </div>
      </section>

      {/* 15. Office Location & Google Map */}
      <LocationSection />
    </>
  );
}
