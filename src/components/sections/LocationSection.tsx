import { MapPin, Phone, Mail, MessageCircle, Navigation, ArrowUpRight } from "lucide-react";
import { COMPANY } from "@/data/company";

const EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(COMPANY.office.mapsEmbedQuery)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

/** Live Google map. `tone` restyles the map to match the brand. */
export function MapFrame({ tone = "mono", className = "" }: { tone?: "mono" | "dark" | "none"; className?: string }) {
  const filter =
    tone === "mono"
      ? "[filter:grayscale(1)_contrast(1.05)_brightness(1.02)]"
      : tone === "dark"
        ? "[filter:invert(0.92)_hue-rotate(180deg)_grayscale(0.6)_contrast(0.95)]"
        : "";
  return (
    <iframe
      title="Pak Arab Manpower Supply LLC office location, Shabiya-12, Mussafah, Abu Dhabi"
      src={EMBED}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className={`h-full w-full border-0 ${filter} ${className}`}
    />
  );
}

const CONTACTS = [
  { icon: MessageCircle, label: "WhatsApp", value: COMPANY.whatsapp.display, href: COMPANY.whatsapp.url, ext: true, color: "text-[#25D366]" },
  { icon: Phone, label: "Telephone", value: COMPANY.telephone.display, href: COMPANY.telephone.tel, color: "text-brand" },
  { icon: Phone, label: "Mobile", value: COMPANY.additionalMobile.display, href: COMPANY.additionalMobile.tel, color: "text-brand" },
  { icon: Mail, label: "Email", value: COMPANY.email, href: `mailto:${COMPANY.email}`, color: "text-brand" },
];

function Directions({ dark = false }: { dark?: boolean }) {
  return (
    <a
      href={COMPANY.office.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-[3rem] items-center gap-2 rounded-md px-6 text-sm font-bold transition-colors ${
        dark ? "bg-brand text-white hover:bg-brand-dark" : "bg-navy-900 text-white hover:bg-brand"
      }`}
    >
      <Navigation className="h-4 w-4" aria-hidden="true" /> Get Directions
    </a>
  );
}

/* Office location: dark split with contact action tiles + dark-styled Google map */
export function LocationSection() {
  return (
    <section id="location" className="relative overflow-hidden bg-navy-950 py-16 text-white sm:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute -left-1/4 top-0 h-full w-2/3 rounded-full bg-brand/10 blur-3xl" />
      <div className="container-wide relative grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-5">
          <div className="inline-flex items-center gap-2.5">
            <span className="h-[2px] w-8 bg-brand" />
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-light">Visit Our Office</span>
          </div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">Abu Dhabi Head Office</h2>
          <p className="flex items-start gap-3 text-base text-white/80">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-brand-light" aria-hidden="true" />
            {COMPANY.office.address}
          </p>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {CONTACTS.map(({ icon: Icon, label, value, href, ext, color }) => (
              <li key={label} className={label === "Email" || label === "WhatsApp" ? "sm:col-span-2" : undefined}>
                <a
                  href={href}
                  {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex h-full items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4 transition-colors hover:border-brand-light/60 hover:bg-white/[0.07]"
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <Icon className={`h-5 w-5 ${color === "text-brand" ? "text-brand-light" : color}`} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.6875rem] font-bold uppercase tracking-wider text-white/55">{label}</span>
                    <span className="block break-words font-semibold text-white">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <Directions dark />
        </div>
        <div className="relative min-h-[22rem] overflow-hidden rounded-2xl border border-white/10 shadow-2xl ring-1 ring-brand/20 lg:col-span-7 lg:min-h-0">
          <MapFrame tone="dark" className="absolute inset-0" />
          <a
            href={COMPANY.office.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-navy-950/85 px-4 py-2 text-xs font-bold text-white backdrop-blur hover:bg-brand"
          >
            Open in Google Maps <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
