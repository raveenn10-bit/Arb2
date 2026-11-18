"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  Menu,
  X,
  ArrowUpRight,
  MessageCircle,
} from "lucide-react";
import { COMPANY } from "@/data/company";
import { SERVICES } from "@/data/services";
import { buildQuickEnquiryUrl } from "@/lib/whatsapp";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Industries", href: "/industries" },
  { label: "Workforce", href: "/workforce" },
  { label: "Our Clients", href: "/clients" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setServicesOpen(false);
        setMobileOpen(false);
      }
    }
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Corporate Contact Bar */}
      <div className="bg-[#111315] text-white/90 border-b border-white/10 text-xs">
        <div className="container-wide flex flex-wrap items-center justify-between gap-2 py-2">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <span className="inline-flex items-center gap-1.5 text-white/80">
              <MapPin className="h-3.5 w-3.5 text-[#D40820]" aria-hidden="true" />
              <span>Abu Dhabi, UAE</span>
            </span>
            <a
              href={COMPANY.telephone.tel}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-[#D40820]" aria-hidden="true" />
              <span>{COMPANY.telephone.display}</span>
            </a>
            <a
              href={`mailto:${COMPANY.email}`}
              className="hidden sm:inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="h-3.5 w-3.5 text-[#D40820]" aria-hidden="true" />
              <span>{COMPANY.email}</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/quality"
              className="hidden md:inline-block text-white/75 hover:text-white transition-colors"
            >
              Quality &amp; Certifications
            </Link>
            <a
              href={buildQuickEnquiryUrl("General Manpower Enquiry")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-[#25D366] hover:text-white transition-colors"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              <span>WhatsApp: {COMPANY.whatsapp.display}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`w-full bg-white/95 backdrop-blur-md transition-shadow duration-200 border-b border-[#E5E7EB] ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div className="container-wide flex h-16 lg:h-[74px] items-center justify-between gap-4">
          {/* Brand Logo — Left */}
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0 group"
            aria-label={`${COMPANY.name} Home`}
          >
            <div className="relative h-10 w-10 sm:h-11 sm:w-11 shrink-0 overflow-hidden">
              <Image
                src="/images/brand/pak-arab-mark.png"
                alt="Pak Arab Manpower Supply LLC emblem"
                fill
                sizes="44px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-bold tracking-tight text-sm sm:text-base text-[#111315] group-hover:text-[#D40820] transition-colors">
                PAK ARAB MANPOWER
              </span>
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#667085]">
                Supply LLC · Abu Dhabi
              </span>
            </div>
          </Link>

          {/* Desktop Navigation — Right */}
          <nav aria-label="Main navigation" className="hidden xl:flex items-center gap-1">
            {NAV_LINKS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              if (item.hasDropdown) {
                return (
                  <div key={item.href} ref={dropdownRef} className="relative">
                    <button
                      type="button"
                      onClick={() => setServicesOpen((prev) => !prev)}
                      aria-expanded={servicesOpen}
                      aria-haspopup="true"
                      className={`inline-flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-md transition-colors min-h-[44px] ${
                        isActive
                          ? "text-[#D40820] bg-[#F5F6F8]"
                          : "text-[#111315] hover:text-[#D40820] hover:bg-[#F5F6F8]"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          servicesOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    {servicesOpen && (
                      <div
                        role="menu"
                        className="absolute left-0 top-full mt-2 w-80 rounded-lg border border-[#E5E7EB] bg-white p-2 shadow-xl"
                      >
                        <Link
                          href="/services"
                          role="menuitem"
                          className="block rounded-md px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#D40820] hover:bg-[#F5F6F8]"
                        >
                          View All Services →
                        </Link>
                        <div className="my-1 border-t border-[#E5E7EB]" />
                        {SERVICES.map((service) => (
                          <Link
                            key={service.slug}
                            href={`/services/${service.slug}`}
                            role="menuitem"
                            className="flex items-start gap-3 rounded-md px-3 py-2.5 text-sm hover:bg-[#F5F6F8] transition-colors"
                          >
                            <span className="text-xs font-bold text-[#D40820] mt-0.5">
                              {service.number}
                            </span>
                            <div>
                              <div className="font-semibold text-[#111315]">
                                {service.title}
                              </div>
                              <div className="text-xs text-[#667085] line-clamp-1">
                                {service.shortDescription}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-2 text-sm font-medium rounded-md transition-colors min-h-[44px] inline-flex items-center ${
                    isActive
                      ? "text-[#D40820] bg-[#F5F6F8]"
                      : "text-[#111315] hover:text-[#D40820] hover:bg-[#F5F6F8]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/#manpower-request"
              className="hidden md:inline-flex items-center gap-2 rounded-md bg-[#D40820] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#A40E21] transition-colors min-h-[44px]"
            >
              <span>Request Manpower</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              className="xl:hidden inline-flex items-center justify-center rounded-md border border-[#E5E7EB] p-2.5 text-[#111315] hover:bg-[#F5F6F8] min-h-[44px] min-w-[44px]"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          className="xl:hidden fixed inset-0 top-[97px] z-40 bg-white overflow-y-auto border-t border-[#E5E7EB]"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div className="container-wide py-6 flex flex-col gap-2">
            {NAV_LINKS.map((item) => {
              if (item.hasDropdown) {
                return (
                  <div key={item.href} className="border-b border-[#E5E7EB] pb-2">
                    <button
                      type="button"
                      onClick={() => setMobileServicesOpen((prev) => !prev)}
                      className="flex w-full items-center justify-between py-3 text-base font-semibold text-[#111315] min-h-[44px]"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${
                          mobileServicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {mobileServicesOpen && (
                      <div className="pl-4 flex flex-col gap-1 pb-2">
                        <Link
                          href="/services"
                          className="py-2 text-sm font-semibold text-[#D40820]"
                        >
                          All Services Overview
                        </Link>
                        {SERVICES.map((s) => (
                          <Link
                            key={s.slug}
                            href={`/services/${s.slug}`}
                            className="py-2 text-sm text-[#667085] hover:text-[#111315]"
                          >
                            {s.number}. {s.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="py-3 text-base font-semibold text-[#111315] border-b border-[#E5E7EB] min-h-[44px] flex items-center"
                >
                  {item.label}
                </Link>
              );
            })}

            <Link
              href="/quality"
              className="py-3 text-base font-semibold text-[#111315] border-b border-[#E5E7EB] min-h-[44px] flex items-center"
            >
              Quality &amp; Certifications
            </Link>
            <Link
              href="/careers"
              className="py-3 text-base font-semibold text-[#111315] border-b border-[#E5E7EB] min-h-[44px] flex items-center"
            >
              Careers &amp; Job Enquiries
            </Link>

            <div className="mt-4 flex flex-col gap-3">
              <Link
                href="/#manpower-request"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#D40820] px-5 py-3.5 text-sm font-semibold text-white min-h-[48px]"
              >
                <span>Request Manpower</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a
                href={buildQuickEnquiryUrl("Manpower Supply Enquiry")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-[#111315] min-h-[48px]"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp {COMPANY.whatsapp.display}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
