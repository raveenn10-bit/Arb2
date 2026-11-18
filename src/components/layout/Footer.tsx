import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, MessageCircle, ExternalLink, ShieldCheck } from "lucide-react";
import { COMPANY } from "@/data/company";

export function Footer() {
  return (
    <footer className="bg-[#0A0B0D] text-white border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-8 pb-10 border-b border-white/10">
          {/* Col 1: Brand & Accreditations */}
          <div className="col-span-2 lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-md p-1.5 shadow-sm">
                <Image
                  src="/images/logo-pak-arab.png"
                  alt="Pak Arab Manpower Supply LLC logo"
                  width={42}
                  height={42}
                  className="h-9 w-auto object-contain"
                />
              </div>
              <div>
                <p className="text-base font-extrabold tracking-tight leading-tight">
                  PAK ARAB MANPOWER
                </p>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9CA3AF]">
                  Supply LLC · Abu Dhabi, UAE
                </p>
              </div>
            </div>

            <p className="text-sm text-[#9CA3AF] leading-relaxed">
              Licensed UAE industrial workforce partner delivering ADNOC-compliant, CICPA-eligible MEP, Civil, and Shutdown teams across all seven Emirates.
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-white/90">
                <ShieldCheck className="h-3.5 w-3.5 text-[#D40820]" />
                ICV Certified
              </span>
              <span className="inline-flex items-center rounded-md border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-white/90">
                ISO 9001 · 14001 · 45001
              </span>
              <span className="inline-flex items-center rounded-md border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-white/90">
                MOHRE &amp; WPS
              </span>
            </div>

            <a
              href={COMPANY.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-[#25D366] hover:bg-[#1ebe5d] px-4 py-2.5 text-xs font-bold text-[#0A0B0D] transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Desk: {COMPANY.whatsapp.display}
            </a>
          </div>

          {/* Col 2: Quick Links */}
          <div className="col-span-1 lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#D40820]">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm text-[#D1D5DB]">
              <li><Link href="#services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="#workforce" className="hover:text-white transition-colors">Workforce Directory</Link></li>
              <li><Link href="#industries" className="hover:text-white transition-colors">Industries Served</Link></li>
              <li><Link href="#clients" className="hover:text-white transition-colors">Client Portfolio</Link></li>
              <li><Link href="#faq" className="hover:text-white transition-colors">UAE Manpower FAQ</Link></li>
              <li><Link href="#contact" className="hover:text-white transition-colors">Request Manpower</Link></li>
            </ul>
          </div>

          {/* Col 3: Core Divisions */}
          <div className="col-span-1 lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#D40820]">
              Core Divisions
            </h3>
            <ul className="space-y-2.5 text-sm text-[#D1D5DB]">
              <li>Onshore &amp; Offshore MEP (26 Trades)</li>
              <li>Civil &amp; Infrastructure (36 Trades)</li>
              <li>Oil &amp; Gas Shutdown Teams</li>
              <li>Heavy Equipment &amp; Fleet Logistics</li>
              <li>ADNOC &amp; CICPA Pass Mobilization</li>
            </ul>
          </div>

          {/* Col 4: Abu Dhabi Headquarters */}
          <div className="col-span-2 lg:col-span-3 pt-4 lg:pt-0 border-t border-white/10 lg:border-t-0 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#D40820]">
              Abu Dhabi Headquarters
            </h3>
            <div className="space-y-3 text-sm text-[#D1D5DB]">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#D40820] shrink-0 mt-1" />
                <div>
                  <p className="leading-snug">{COMPANY.office.address}</p>
                  <a
                    href={COMPANY.office.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-[#D40820] hover:underline"
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
                <Phone className="h-4 w-4 text-[#9CA3AF] shrink-0" />
                <span>{COMPANY.telephone.display}</span>
              </a>

              <a
                href={COMPANY.additionalMobile.tel}
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4 text-[#9CA3AF] shrink-0" />
                <span>{COMPANY.additionalMobile.display}</span>
              </a>

              <a
                href={`mailto:${COMPANY.email}`}
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4 text-[#9CA3AF] shrink-0" />
                <span>{COMPANY.email}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9CA3AF]">
          <p>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</p>
          <p>Abu Dhabi, United Arab Emirates · 24–72h Rapid Mobilization</p>
        </div>
      </div>
    </footer>
  );
}
