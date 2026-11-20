import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { WORKFORCE_ROLES } from "@/data/workforce";

// Curated, high-demand trades shown on the home page (all exist in the workforce directory)
const FEATURED = [
  "Piping Foreman",
  "Structural Supervisor",
  "Rigging Supervisor",
  "Multi Welder — GTAW/SMAW",
  "Welder — SMAW",
  "Piping & Structural Fitter",
  "Piping & Structural Fabricator",
  "Iron Workers",
  "Scaffolders",
  "Riggers",
  "Industrial Electrician",
  "Instrument Technician",
  "Painters — Brush & Spray",
  "Man-Lift Operators",
  "Steel Fixers",
  "Shuttering Carpenters",
  "Finishing Carpenters",
  "Ceramic Masons",
  "HVAC Technicians",
  "Plumbers",
  "Domestic Electricians",
  "Forklift Operators",
  "Heavy Duty Drivers",
];

const MOBILE_VISIBLE = 14;

export function TradesShowcase() {
  const total = WORKFORCE_ROLES.length;
  const mep = WORKFORCE_ROLES.filter((r) => r.division === "mep").length;
  const civil = total - mep;
  const featured = FEATURED.filter((t) => WORKFORCE_ROLES.some((r) => r.title === t));
  const remaining = total - featured.length;

  return (
    <section
      id="trades"
      className="relative overflow-hidden bg-navy-950 py-16 sm:py-24 text-white"
      aria-labelledby="trades-heading"
    >
      {/* subtle engineering grid + brand glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:3rem_3rem] [mask-image:radial-gradient(ellipse_at_top_left,black_30%,transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-1/4 -top-1/3 h-[140%] w-2/3 rounded-full bg-brand/10 blur-3xl"
      />

      <div className="container-wide relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Left: heading + CTA */}
        <div className="space-y-6 lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          <div className="inline-flex items-center gap-2.5">
            <span className="h-[2px] w-8 bg-brand" />
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-light">
              Workforce
            </span>
          </div>

          <h2
            id="trades-heading"
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase leading-[0.95] tracking-tight"
          >
            {total} Trades,
            <span className="block text-white/90">Ready to Mobilise</span>
          </h2>

          <p className="max-w-md text-base sm:text-lg leading-relaxed text-white/70">
            Welders, fitters, riggers, scaffolders, masons, carpenters, electricians,
            operators, drivers and site support, for short- and long-term contracts
            across the UAE.
          </p>

          <dl className="grid max-w-md grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10">
            <div className="bg-navy-950 p-4">
              <dt className="text-[0.6875rem] font-bold uppercase tracking-wider text-white/55">
                Onshore &amp; Offshore MEP
              </dt>
              <dd className="mt-1 font-display text-3xl font-extrabold">{mep}</dd>
            </div>
            <div className="bg-navy-950 p-4">
              <dt className="text-[0.6875rem] font-bold uppercase tracking-wider text-white/55">
                Civil &amp; Construction
              </dt>
              <dd className="mt-1 font-display text-3xl font-extrabold">{civil}</dd>
            </div>
          </dl>

          <Link
            href="/workforce"
            className="group inline-flex min-h-[3.25rem] items-center gap-3 rounded-md bg-brand px-7 text-sm font-extrabold uppercase tracking-[0.08em] text-white shadow-lg shadow-brand/20 transition-colors hover:bg-brand-dark"
          >
            <span>Browse All Trades</span>
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>

        {/* Right: trade chips */}
        <div className="lg:col-span-7">
          <ul className="trade-chips flex flex-wrap gap-2.5 sm:gap-3" aria-label="Featured trades">
            {featured.map((trade, i) => (
              <li
                key={trade}
                className={`${i >= MOBILE_VISIBLE ? "hidden sm:flex" : "flex"} items-center rounded-md border border-white/15 bg-white/[0.03] px-4 py-2.5 sm:px-5 sm:py-3 text-sm sm:text-base font-medium text-white/90 transition-colors hover:border-brand-light/70 hover:bg-brand/10 hover:text-white`}
              >
                {trade}
              </li>
            ))}
            <li className="flex">
              <Link
                href="/workforce"
                className="flex items-center gap-2 rounded-md border border-dashed border-brand-light/60 px-4 py-2.5 sm:px-5 sm:py-3 text-sm sm:text-base font-bold text-brand-light transition-colors hover:border-brand-light hover:bg-brand/10"
              >
                <span className="sm:hidden">+{total - MOBILE_VISIBLE} more trades</span>
                <span className="hidden sm:inline">+{remaining} more trades</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
