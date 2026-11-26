import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, MessageCircle, ExternalLink, ShieldCheck, ArrowUp, BadgeCheck, ArrowRight } from "lucide-react";
import { COMPANY } from "@/data/company";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white border-t border-white/10">
      {/* large crimson logo-mark watermark (decorative) */}
      <div aria-hidden="true" className="footer-watermark pointer-events-none absolute -bottom-16 -right-10 h-[34rem] w-[30rem] sm:h-[42rem] sm:w-[38rem] lg:-bottom-24 lg:right-0" />

      {/* CTA band */}
      <div className="relative border-b border-white/10">
        <div className="container-wide flex flex-col gap-6 py-10 sm:py-12 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">Need a custom workforce for your project?</h2>
            <p className="mt-2 text-sm text-white/70 sm:text-base">Share your trade requirements and mobilisation schedule with our coordination team.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact#request-form" className="btn-glow inline-flex min-h-12 items-center gap-2 rounded-lg bg-brand px-6 text-sm font-bold text-white hover:bg-brand-dark transition-[background-color,box-shadow]">
              Request Manpower <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a href={COMPANY.whatsapp.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      <div className="container-wide relative pt-14 pb-10">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-8 pb-10 border-b border-white/10">
          {/* Col 1: Brand & Accreditations */}
          <div className="col-span-2 lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              {/* client-supplied white logo for the dark footer */}
              <Image
                src="/images/brand/pak-arab-logo-full-white.png"
                alt="Pak Arab Manpower Supply LLC logo"
                width={1080}
                height={1200}
                quality={90}
                sizes="56px"
                className="h-16 w-auto object-contain"
              />
              <div>
                <p className="text-base font-extrabold tracking-tight leading-tight">
                  PAK ARAB MANPOWER
                </p>
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-steel">
                  Supply LLC · Abu Dhabi, UAE
                </p>
              </div>
            </div>

            <p className="text-sm text-steel leading-relaxed">
              Licensed UAE industrial workforce partner delivering ADNOC-compliant, CICPA-eligible MEP, Civil, and Shutdown teams across all seven Emirates.
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-white/5 px-2.5 py-1 text-[0.6875rem] font-semibold text-white/90">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-light" />
                ICV Certified
              </span>
              <span className="inline-flex items-center rounded-md border border-white/15 bg-white/5 px-2.5 py-1 text-[0.6875rem] font-semibold text-white/90">
                ISO 9001 · 14001 · 45001
              </span>
              <span className="inline-flex items-center rounded-md border border-white/15 bg-white/5 px-2.5 py-1 text-[0.6875rem] font-semibold text-white/90">
                MOHRE &amp; WPS
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-white/5 px-2.5 py-1 text-[0.6875rem] font-semibold text-white/90">
                <BadgeCheck className="h-3.5 w-3.5 text-brand-light" />
                MOHRE Approved
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-white/5 px-2.5 py-1 text-[0.6875rem] font-semibold text-white/90">
                <BadgeCheck className="h-3.5 w-3.5 text-brand-light" />
                TAQA Approved
              </span>
            </div>

            <a
              href={COMPANY.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-[#25D366] hover:bg-[#1ebe5d] px-4 py-2.5 text-xs font-bold text-navy-950 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Desk: {COMPANY.whatsapp.display}
            </a>
          </div>

          {/* Col 2: Quick Links */}
          <div className="col-span-1 lg:col-span-2 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-brand-light">
              Navigation
            </h2>
            <ul className="space-y-2.5 text-sm text-line-strong">
              <li><Link href="/services" className="hover:text-white transition-colors">Manpower Services</Link></li>
              <li><Link href="/industries" className="hover:text-white transition-colors">Industries Served</Link></li>
              <li><Link href="/clients" className="hover:text-white transition-colors">Client Portfolio</Link></li>
              <li><Link href="/quality" className="hover:text-white transition-colors">Quality &amp; Certifications</Link></li>
              <li><Link href="/guides" className="hover:text-white transition-colors">Hiring Guides</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Request Manpower</Link></li>
            </ul>
          </div>

          {/* Col 3: Core Divisions */}
          <div className="col-span-1 lg:col-span-3 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-brand-light">
              Core Divisions
            </h2>
            <ul className="space-y-2.5 text-sm text-line-strong">
              <li><Link href="/services/manpower-supply" className="hover:text-white transition-colors">Manpower Supply Abu Dhabi</Link></li>
              <li><Link href="/services/oil-and-gas" className="hover:text-white transition-colors">Oil &amp; Gas Manpower</Link></li>
              <li><Link href="/services/civil-construction" className="hover:text-white transition-colors">Construction Labour Supply</Link></li>
              <li><Link href="/services/mechanical-electrical" className="hover:text-white transition-colors">Mechanical &amp; Electrical Crews</Link></li>
              <li><Link href="/services/workforce-support" className="hover:text-white transition-colors">Workforce Support &amp; Payroll</Link></li>
              <li><Link href="/services/travel-transportation" className="hover:text-white transition-colors">Workforce Transportation</Link></li>
            </ul>
          </div>

          {/* Col 4: Abu Dhabi Headquarters */}
          <div className="col-span-2 lg:col-span-3 pt-4 lg:pt-0 border-t border-white/10 lg:border-t-0 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-brand-light">
              Abu Dhabi Headquarters
            </h2>
            <div className="space-y-3 text-sm text-line-strong">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-brand-light shrink-0 mt-1" />
                <div>
                  <p className="leading-snug">{COMPANY.office.address}</p>
                  <a
                    href={COMPANY.office.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-brand-light hover:underline"
                  >
                    View on Google Maps
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              <a
                href={COMPANY.telephone.tel}
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4 text-steel shrink-0" />
                <span>{COMPANY.telephone.display}</span>
              </a>

              <a
                href={COMPANY.additionalMobile.tel}
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4 text-steel shrink-0" />
                <span>{COMPANY.additionalMobile.display}</span>
              </a>

              <a
                href={`mailto:${COMPANY.email}`}
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4 text-steel shrink-0" />
                <span>{COMPANY.email}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-sm text-steel">
          <p>© {new Date().getFullYear()} {COMPANY.siteName}. All rights reserved.</p>
          <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-6 gap-y-2 md:pr-20">
            <Link href="/privacy-policy" className="inline-flex min-h-11 items-center hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="inline-flex min-h-11 items-center hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
            <a
              href={COMPANY.developer.url}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-11 items-center hover:text-white transition-colors"
            >
              Developed by {COMPANY.developer.name}
            </a>
            <a
              href="#top"
              className="inline-flex min-h-11 items-center gap-1.5 rounded-md border border-white/15 px-3 text-white/85 hover:border-white/40 hover:text-white transition-colors"
            >
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
              Back to top
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
