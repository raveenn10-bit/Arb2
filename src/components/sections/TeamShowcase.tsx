import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HardHat, ShieldCheck, Users } from "lucide-react";

const HIGHLIGHTS = [
  { icon: HardHat, label: "Branded, fully-kitted crews" },
  { icon: ShieldCheck, label: "HSE-ready from day one" },
  { icon: Users, label: "Supervised site teams" },
];

export function TeamShowcase() {
  return (
    <section className="relative overflow-hidden bg-[#111315] py-16 sm:py-24 text-white">
      {/* subtle brand glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-1/4 top-0 h-full w-2/3 rounded-full bg-[#D40820]/10 blur-3xl"
      />

      <div className="container-wide relative space-y-10 lg:space-y-14">
        {/* Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2.5">
              <span className="h-[2px] w-8 bg-[#D40820]" />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#D40820]">
                Our People On Site
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Pak Arab Crews. Ready for Every Site.
            </h2>
            <p className="text-base sm:text-lg text-white/75 leading-relaxed">
              Uniformed, equipped and coordinated teams deployed across UAE oil &amp; gas,
              refinery and industrial facilities, representing your project with the
              standards it demands.
            </p>
          </div>
          <Link
            href="/#manpower-request"
            className="inline-flex items-center gap-2 self-start lg:self-auto rounded-md bg-[#D40820] px-5 py-3 text-sm font-bold text-white hover:bg-[#A40E21] transition-colors min-h-[44px] shrink-0"
          >
            <span>Request a Crew</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Photo composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          <figure className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:min-h-[480px] overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            <Image
              src="/images/team/pak-arab-crew-blue.webp"
              alt="Pak Arab Manpower Supply crew in branded blue coveralls and hard hats at a UAE oil and gas facility"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />
            <figcaption className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
              <span className="inline-block rounded-full bg-[#D40820] px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
                Onshore Operations
              </span>
              <p className="mt-2 text-lg sm:text-2xl font-extrabold leading-tight">
                Operations &amp; maintenance teams
              </p>
            </figcaption>
          </figure>

          <div className="lg:col-span-5 flex flex-col gap-5 lg:gap-6">
            <figure className="relative aspect-[16/10] lg:aspect-auto lg:flex-1 lg:min-h-[280px] overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <Image
                src="/images/team/pak-arab-crew-red.webp"
                alt="Pak Arab Manpower Supply supervisors in red coveralls reviewing work plans at a refinery at sunset"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <span className="inline-block rounded-full bg-white/15 backdrop-blur-md border border-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
                  Site Supervision
                </span>
                <p className="mt-2 text-lg sm:text-xl font-extrabold leading-tight">
                  Field supervisors &amp; work planning
                </p>
              </figcaption>
            </figure>

            <ul className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
              {HIGHLIGHTS.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5"
                >
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#D40820]/10 text-[#D40820]">
                    <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold text-white/90">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
