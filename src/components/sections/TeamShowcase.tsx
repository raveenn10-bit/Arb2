import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HardHat, ShieldCheck, Users } from "lucide-react";

const HIGHLIGHTS = [
  { icon: HardHat, label: "Branded, fully-kitted crews" },
  { icon: ShieldCheck, label: "HSE-ready from day one" },
  { icon: Users, label: "Supervised site teams" },
];

const BLUE = "/images/team/pak-arab-crew-lineup.webp";
const RED = "/images/team/pak-arab-supervisor-briefing.webp";
const BLUE_ALT = "Pak Arab Manpower Supply crew in branded navy coveralls and hard hats standing arms crossed at a UAE refinery";
const RED_ALT = "Pak Arab Manpower Supply site supervisor in a hi-vis jacket briefing his crew with a clipboard at a UAE plant";

function Kicker({ light = false }: { light?: boolean }) {
  return (
    <div className="inline-flex items-center gap-2.5">
      <span className="h-[2px] w-8 bg-brand" />
      <span className={`text-xs font-bold uppercase tracking-[0.18em] ${light ? "text-brand-light" : "text-brand"}`}>
        Our People On Site
      </span>
    </div>
  );
}

/* "Our People On Site": two expanding photo panels (hover widens a panel on desktop) */
const PANELS = [
  { src: BLUE, alt: BLUE_ALT, tag: "Onshore Operations", title: "Operations & maintenance teams", text: "Skilled, uniformed crews mobilised for plant operations, maintenance and shutdowns." },
  { src: RED, alt: RED_ALT, tag: "Site Supervision", title: "Field supervisors & work planning", text: "Experienced supervisors coordinating safe, on-schedule work at every site." },
];

export function TeamShowcase() {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-16 text-white sm:py-24">
      <div className="container-wide space-y-10">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <div className="flex justify-center"><Kicker light /></div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Pak Arab Crews. Ready for Every Site.
          </h2>
          <p className="text-base leading-relaxed text-white/75 sm:text-lg">
            Uniformed, equipped and coordinated teams deployed across UAE oil &amp; gas, refinery and industrial facilities.
          </p>
        </div>

        <div className="group/panels flex flex-col gap-4 lg:h-[34rem] lg:flex-row">
          {PANELS.map((p, i) => (
            <figure
              key={p.title}
              className={`group relative h-80 overflow-hidden rounded-2xl transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:h-96 lg:h-auto ${
                i === 0 ? "lg:flex-[1.7] lg:group-hover/panels:flex-1 lg:hover:!flex-[1.7]" : "lg:flex-1 lg:hover:flex-[1.7]"
              }`}
            >
              <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                <Image src={p.src} alt={p.alt} fill quality={90} sizes="(max-width:1024px) 100vw, 62vw" className="object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <span className="inline-block rounded-full bg-brand px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-wider">
                  {p.tag}
                </span>
                <p className="mt-3 font-display text-2xl font-extrabold leading-tight sm:text-3xl">{p.title}</p>
                <p className="mt-2 max-w-md text-sm text-white/80 sm:text-base">{p.text}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-6 rounded-xl border border-white/10 bg-white/[0.04] p-5 lg:flex-row lg:px-8">
          <ul className="flex flex-col gap-4 sm:flex-row sm:gap-8">
            {HIGHLIGHTS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2.5 text-sm font-semibold text-white/90 sm:text-base">
                <Icon className="h-5 w-5 text-brand-light" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
          <Link
            href="/#manpower-request"
            className="inline-flex min-h-[3rem] shrink-0 items-center gap-2 rounded-md bg-brand px-6 text-sm font-bold text-white hover:bg-brand-dark"
          >
            Request a Crew <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
