"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
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
      {/* Main Navigation Bar */}
      <div
        className={`w-full bg-white/95 backdrop-blur-md transition-shadow duration-200 border-b border-line ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div className="container-wide flex h-16 lg:h-[4.625rem] items-center justify-between gap-4">
          {/* Brand Logo — Left */}
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0 group"
          >
            <div className="relative h-10 w-10 sm:h-11 sm:w-11 shrink-0 overflow-hidden">
              <Image
                src="/images/brand/pak-arab-mark.png"
                alt=""
                fill
                sizes="44px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-bold tracking-tight text-sm sm:text-base text-navy-900 group-hover:text-brand transition-colors">
                PAK ARAB MANPOWER
              </span>
              <span className="text-[0.6875rem] font-semibold tracking-wider uppercase text-slate">
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
                      className={`inline-flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-md transition-colors min-h-[2.75rem] ${
                        isActive
                          ? "text-brand bg-mist"
                          : "text-navy-900 hover:text-brand hover:bg-mist"
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
                        className="absolute left-0 top-full mt-2 w-80 rounded-lg border border-line bg-white p-2 shadow-xl"
                      >
                        <Link
                          href="/services"
                          role="menuitem"
                          className="block rounded-md px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-brand hover:bg-mist"
                        >
                          View All Services →
                        </Link>
                        <div className="my-1 border-t border-line" />
                        {SERVICES.map((service) => (
                          <Link
                            key={service.slug}
                            href={`/services/${service.slug}`}
                            role="menuitem"
                            className="flex items-start gap-3 rounded-md px-3 py-2.5 text-sm hover:bg-mist transition-colors"
                          >
                            <span className="text-xs font-bold text-brand mt-0.5">
                              {service.number}
                            </span>
                            <div>
                              <div className="font-semibold text-navy-900">
                                {service.title}
                              </div>
                              <div className="text-xs text-slate line-clamp-1">
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
                  className={`px-3.5 py-2 text-sm font-medium rounded-md transition-colors min-h-[2.75rem] inline-flex items-center ${
                    isActive
                      ? "text-brand bg-mist"
                      : "text-navy-900 hover:text-brand hover:bg-mist"
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
              className="hidden md:inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark transition-colors min-h-[2.75rem]"
            >
              <span>Request Manpower</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              className="xl:hidden inline-flex items-center justify-center rounded-md border border-line p-2.5 text-navy-900 hover:bg-mist min-h-[2.75rem] min-w-[2.75rem]"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          className="xl:hidden fixed inset-0 top-16 lg:top-[4.625rem] z-40 bg-white overflow-y-auto border-t border-line"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div className="container-wide py-6 flex flex-col gap-2">
            {NAV_LINKS.map((item) => {
              if (item.hasDropdown) {
                return (
                  <div key={item.href} className="border-b border-line pb-2">
                    <button
                      type="button"
                      onClick={() => setMobileServicesOpen((prev) => !prev)}
                      className="flex w-full items-center justify-between py-3 text-base font-semibold text-navy-900 min-h-[2.75rem]"
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
                          className="py-2 text-sm font-semibold text-brand"
                        >
                          All Services Overview
                        </Link>
                        {SERVICES.map((s) => (
                          <Link
                            key={s.slug}
                            href={`/services/${s.slug}`}
                            className="py-2 text-sm text-slate hover:text-navy-900"
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
                  className="py-3 text-base font-semibold text-navy-900 border-b border-line min-h-[2.75rem] flex items-center"
                >
                  {item.label}
                </Link>
              );
            })}

            <Link
              href="/quality"
              className="py-3 text-base font-semibold text-navy-900 border-b border-line min-h-[2.75rem] flex items-center"
            >
              Quality &amp; Certifications
            </Link>
            <Link
              href="/careers"
              className="py-3 text-base font-semibold text-navy-900 border-b border-line min-h-[2.75rem] flex items-center"
            >
              Careers &amp; Job Enquiries
            </Link>

            <div className="mt-4 flex flex-col gap-3">
              <Link
                href="/#manpower-request"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand px-5 py-3.5 text-sm font-semibold text-white min-h-[3rem]"
              >
                <span>Request Manpower</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a
                href={buildQuickEnquiryUrl("Manpower Supply Enquiry")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-navy-900 min-h-[3rem]"
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
