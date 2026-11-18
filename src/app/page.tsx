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
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Bus,
  Check,
} from "lucide-react";
import { COMPANY } from "@/data/company";
import { SERVICES, INDUSTRIES } from "@/data/services";
import { CERTIFICATIONS } from "@/data/certifications";
import { HeroSection } from "@/components/sections/HeroSection";
import { WorkforceDirectory } from "@/components/sections/WorkforceDirectory";
import { ClientLogoGrid } from "@/components/sections/ClientLogoGrid";
import { ManpowerRequestForm } from "@/components/forms/ManpowerRequestForm";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { GsapReveal } from "@/components/animations/GsapReveal";
import { MobileAutoTrack } from "@/components/animations/MobileAutoTrack";
import { VantaNetBackground } from "@/components/animations/VantaNetBackground";
import { buildQuickEnquiryUrl } from "@/lib/whatsapp";

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

  return (
    <>
      {/* 2. Cinematic Industrial Hero */}
      <HeroSection />

      {/* 3. About Pak Arab */}
      <section id="about-company" className="py-16 sm:py-24 bg-white">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <GsapReveal className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2.5">
              <span className="h-[2px] w-8 bg-[#D40820]" />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#D40820]">
                About Pak Arab Manpower Supply LLC
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111315]">
              {COMPANY.about.heading}
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-[#667085]">
              {COMPANY.about.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {COMPANY.about.pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="flex items-start gap-2.5 rounded-lg border border-[#E5E7EB] bg-[#F5F6F8] p-3.5"
                >
                  <Check className="h-4 w-4 text-[#D40820] shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <div className="text-sm font-bold text-[#111315]">{pillar.title}</div>
                    <div className="text-xs text-[#667085] mt-0.5">{pillar.description}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-md bg-[#111315] px-5 py-3 text-sm font-semibold text-white hover:bg-[#D40820] transition-colors min-h-[44px]"
              >
                <span>Explore Our Company</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </GsapReveal>

          <GsapReveal delay={0.12} className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-[#E5E7EB] shadow-lg">
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

      {/* 4. Mission & Vision (Upper-section priority per client request) */}
      <section className="py-16 sm:py-20 bg-[#F5F6F8] border-y border-[#E5E7EB]">
        <div className="container-wide space-y-10">
          <GsapReveal className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#D40820]">
              Core Values &amp; Direction
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111315]">
              Our Mission &amp; Vision
            </h2>
          </GsapReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <GsapReveal className="rounded-xl bg-white border border-[#E5E7EB] p-7 sm:p-9 relative overflow-hidden">
              <div className="absolute top-0 left-0 h-1.5 w-full bg-[#D40820]" />
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#D40820]/10 text-[#D40820] mb-5">
                <Target className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#111315] mb-3">
                {COMPANY.mission.title}
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-[#667085]">
                {COMPANY.mission.text}
              </p>
            </GsapReveal>

            <GsapReveal
              delay={0.1}
              className="rounded-xl bg-[#1C2025] text-white border border-white/10 p-7 sm:p-9 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 h-1.5 w-full bg-white/30" />
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 text-white mb-5">
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
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#D40820]">
                What We Deliver
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111315]">
                Comprehensive Manpower Services
              </h2>
              <p className="text-base text-[#667085]">
                Structured workforce solutions tailored to UAE industrial, energy, civil,
                and engineering projects.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#D40820] hover:text-[#A40E21] shrink-0"
            >
              <span>View All Service Details</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </GsapReveal>

          <MobileAutoTrack desktopGridClass="md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {SERVICES.map((service) => (
              <div
                key={service.slug}
                className="group min-w-[290px] sm:min-w-[320px] md:min-w-0 shrink-0 md:shrink snap-start flex flex-col rounded-xl border border-[#E5E7EB] bg-white overflow-hidden hover:border-[#D40820]/60 hover:shadow-lg transition-all duration-200"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#111315]">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 rounded bg-[#111315]/90 px-2.5 py-1 text-xs font-bold text-white">
                    {service.number}
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-extrabold text-[#111315] group-hover:text-[#D40820] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#667085]">
                      {service.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between gap-3">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[#111315] hover:text-[#D40820] min-h-[40px]"
                    >
                      <span>Explore Service</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    <a
                      href={buildQuickEnquiryUrl(service.waTopic)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md bg-[#F5F6F8] hover:bg-[#25D366] px-3 py-2 text-xs font-semibold text-[#111315] transition-colors min-h-[40px]"
                    >
                      <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Enquire</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </MobileAutoTrack>
        </div>
      </section>

      {/* 6. Industries We Serve */}
      <section className="py-16 sm:py-24 bg-[#111315] text-white">
        <div className="container-wide space-y-12">
          <GsapReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#D40820]">
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
              className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-[#D40820] transition-colors shrink-0"
            >
              <span>Explore Industries</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </GsapReveal>

          <MobileAutoTrack desktopGridClass="md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {INDUSTRIES.map((industry) => (
              <div
                key={industry.id}
                className="group relative min-w-[270px] sm:min-w-[300px] md:min-w-0 shrink-0 md:shrink snap-start aspect-[4/5] md:aspect-[4/3] rounded-xl overflow-hidden border border-white/10"
              >
                <Image
                  src={industry.image}
                  alt={industry.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111315] via-[#111315]/55 to-transparent" />
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#D40820]">
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
            ))}
          </MobileAutoTrack>
        </div>
      </section>

      {/* 7. Travel & Transportation (Dedicated Client-Requested Section) */}
      <section className="py-16 sm:py-20 bg-[#F5F6F8] border-b border-[#E5E7EB]">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <GsapReveal className="lg:col-span-6 relative aspect-[4/3] overflow-hidden rounded-xl border border-[#E5E7EB]">
            <Image
              src={travelService.image}
              alt={travelService.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </GsapReveal>

          <GsapReveal delay={0.1} className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-white border border-[#E5E7EB] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#111315]">
              <Bus className="h-4 w-4 text-[#D40820]" aria-hidden="true" />
              <span>Workforce Logistics</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111315]">
              Travel &amp; Transportation Support
            </h2>
            <p className="text-base leading-relaxed text-[#667085]">
              {travelService.fullDescription}
            </p>
            <ul className="space-y-2.5">
              {travelService.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2.5 text-sm font-medium text-[#111315]">
                  <Check className="h-4 w-4 text-[#D40820] shrink-0" aria-hidden="true" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/services/travel-transportation"
                className="inline-flex items-center gap-2 rounded-md bg-[#111315] px-5 py-3 text-sm font-semibold text-white hover:bg-[#D40820] transition-colors min-h-[44px]"
              >
                <span>Explore Travel &amp; Transportation</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={buildQuickEnquiryUrl("Workforce Travel & Transportation Support")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-[#25D366] px-5 py-3 text-sm font-semibold text-[#111315] hover:bg-[#1fb858] transition-colors min-h-[44px]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>Request Logistics Support</span>
              </a>
            </div>
          </GsapReveal>
        </div>
      </section>

      {/* 8. Interactive Workforce Directory */}
      <section id="workforce-directory" className="py-16 sm:py-24 bg-white">
        <div className="container-wide space-y-10">
          <GsapReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#D40820]">
                Workforce Categories
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111315]">
                Interactive Workforce Directory
              </h2>
              <p className="text-base text-[#667085]">
                Browse our Onshore &amp; Offshore MEP and Civil &amp; Construction supply
                categories, select quantities, and enquire directly via WhatsApp.
              </p>
            </div>
            <Link
              href="/workforce"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#D40820] hover:text-[#A40E21] shrink-0"
            >
              <span>Open Full Directory Page</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </GsapReveal>

          <WorkforceDirectory />
        </div>
      </section>

      {/* 9. Why Choose Pak Arab */}
      <section className="py-16 sm:py-24 bg-[#F5F6F8] border-y border-[#E5E7EB]">
        <div className="container-wide space-y-12">
          <GsapReveal className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#D40820]">
              Operational Standards
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111315]">
              Why Choose Pak Arab Manpower Supply LLC
            </h2>
          </GsapReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {COMPANY.whyChooseUs.map((item) => {
              const Icon = WHY_ICONS[item.icon] || Users;
              return (
                <div
                  key={item.title}
                  className="rounded-xl bg-white border border-[#E5E7EB] p-6 hover:border-[#D40820]/60 transition-colors"
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#D40820]/10 text-[#D40820] mb-4">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-extrabold text-[#111315] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#667085] leading-relaxed">
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
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#D40820]">
              Quality Assurance &amp; HSE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111315]">
              {COMPANY.qms.title}
            </h2>
            <p className="text-base leading-relaxed text-[#667085]">
              {COMPANY.qms.intro}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {COMPANY.qms.pillars.map((pillar) => (
                <div
                  key={pillar.step}
                  className="rounded-lg border border-[#E5E7EB] bg-[#F5F6F8] p-4 space-y-1.5"
                >
                  <span className="text-xs font-extrabold text-[#D40820]">
                    {pillar.step}
                  </span>
                  <h3 className="text-sm font-bold text-[#111315]">{pillar.title}</h3>
                  <p className="text-xs text-[#667085] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
            <div>
              <Link
                href="/quality"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#D40820] hover:text-[#A40E21]"
              >
                <span>View Quality &amp; Accreditations</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </GsapReveal>

          <GsapReveal delay={0.12} className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-[#E5E7EB]">
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
      <section className="py-12 sm:py-16 bg-[#F5F6F8] border-y border-[#E5E7EB]">
        <div className="container-wide space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#D40820]">
                Standards &amp; Compliance
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111315] mt-1">
                Certifications &amp; Accreditations
              </h2>
            </div>
            <Link
              href="/quality"
              className="text-sm font-semibold text-[#111315] hover:text-[#D40820]"
            >
              Details &amp; Documentation →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.id}
                className="flex items-center gap-4 rounded-xl bg-white border border-[#E5E7EB] p-5"
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
                  <h3 className="text-sm font-bold text-[#111315]">{cert.name}</h3>
                  <p className="text-xs text-[#667085] mt-1">{cert.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Our Valued Clients (26 Logos) */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container-wide space-y-10">
          <GsapReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#D40820]">
                Client Portfolio
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111315]">
                Companies We Have Supplied Manpower To
              </h2>
              <p className="text-base text-[#667085]">
                Supporting major UAE energy, EPC, infrastructure, and industrial
                organizations with skilled technical and civil personnel.
              </p>
            </div>
            <Link
              href="/clients"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#D40820] hover:text-[#A40E21] shrink-0"
            >
              <span>View All 26 Clients</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </GsapReveal>

          <ClientLogoGrid />
        </div>
      </section>

      {/* 13. Manpower Request CTA (with Vanta.js NET dark industrial backdrop) */}
      <section
        id="manpower-request"
        className="relative py-16 sm:py-24 bg-[#111315] overflow-hidden"
      >
        <VantaNetBackground />
        <div className="container-wide relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-5 text-white space-y-5">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#D40820]">
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
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#D40820]">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111315]">
              Answers for Project &amp; HR Teams
            </h2>
          </GsapReveal>
          <FaqAccordion />
        </div>
      </section>

      {/* 15. Contact & Google Maps */}
      <section className="py-16 sm:py-20 bg-[#F5F6F8] border-t border-[#E5E7EB]">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 rounded-xl bg-white border border-[#E5E7EB] p-7 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#D40820]">
                Visit Our Office
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111315]">
                Abu Dhabi Head Office
              </h2>
              <div className="space-y-4 pt-2 text-sm text-[#667085]">
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
                    className="font-semibold text-[#111315] hover:text-[#D40820]"
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
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={COMPANY.office.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-[#111315] px-5 py-3 text-sm font-semibold text-white hover:bg-[#D40820] transition-colors min-h-[44px]"
              >
                <MapPin className="h-4 w-4" aria-hidden="true" />
                <span>Get Directions</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-[#E5E7EB] px-5 py-3 text-sm font-semibold text-[#111315] hover:border-[#111315] min-h-[44px]"
              >
                <span>Contact Page</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 rounded-xl overflow-hidden border border-[#E5E7EB] bg-white min-h-[340px]">
            <iframe
              title="Pak Arab Manpower Supply LLC Office Location Map"
              src="https://maps.google.com/maps?q=Wurth+Gulf+Building+Plot+42+M14+Musaffah+Abu+Dhabi+UAE&t=&z=15&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full min-h-[340px] border-0"
            />
          </div>
        </div>
      </section>
    </>
  );
}
