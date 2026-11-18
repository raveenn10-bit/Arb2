import Image from "next/image";
import { CLIENTS, type ClientLogo } from "@/data/clients";

interface ClientLogoGridProps {
  /**
   * "marquee" = single continuously scrolling row (home page)
   * "rows"    = two auto-scrolling rows moving in opposite directions (clients page)
   * "wall"    = static logo wall (all logos visible)
   */
  variant?: "marquee" | "rows" | "wall";
}

/**
 * Logos are the client-supplied originals. next/image serves them resized for each tile
 * (up to 2x the displayed size, quality 90) so they stay crisp without shipping ~4.6 MB of source files.
 */
function Logo({ client, decorative = false, fluid = false }: { client: ClientLogo; decorative?: boolean; fluid?: boolean }) {
  return (
    <div
      className={`relative shrink-0 transition-transform duration-300 ease-out hover:scale-[1.04] ${
        fluid ? "h-16 w-full max-w-60 sm:h-20 lg:h-24" : "h-16 w-40 sm:h-20 sm:w-52 lg:h-24 lg:w-60"
      }`}
    >
      <Image
        src={client.logo}
        alt={decorative ? "" : `${client.name} logo`}
        aria-hidden={decorative || undefined}
        fill
        quality={90}
        sizes="(max-width: 640px) 160px, (max-width: 1024px) 208px, 240px"
        className="object-contain"
      />
    </div>
  );
}

export function ClientLogoGrid({ variant = "marquee" }: ClientLogoGridProps) {
  if (variant === "wall") {
    return (
      <ul className="grid grid-cols-2 place-items-center gap-x-6 gap-y-10 bg-white sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {CLIENTS.map((client) => (
          <li key={client.id} className="flex w-full justify-center">
            <Logo client={client} fluid />
          </li>
        ))}
      </ul>
    );
  }

  const half = Math.ceil(CLIENTS.length / 2);
  const rows = variant === "rows" ? [CLIENTS.slice(0, half), CLIENTS.slice(half)] : [CLIENTS];

  return (
    <div className="space-y-6 sm:space-y-8" role="region" aria-label="Client logos">
      {rows.map((row, r) => (
        <MarqueeRow key={r} clients={row} reverse={r === 1} />
      ))}
    </div>
  );
}

/** One seamless auto-scrolling row: the logo set is rendered twice and the track slides by half its width. */
function MarqueeRow({ clients, reverse = false }: { clients: ClientLogo[]; reverse?: boolean }) {
  return (
    <div className="client-marquee group relative w-full overflow-hidden bg-white py-2 sm:py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent sm:w-24" />
      <ul
        className={`client-marquee-track flex w-max items-center group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] ${
          reverse ? "client-marquee-reverse" : ""
        }`}
        style={{ animationDuration: `${Math.max(20, clients.length * 2.4)}s` }}
      >
        {clients.map((client) => (
          <li key={client.id} className="pr-10 sm:pr-16">
            <Logo client={client} />
          </li>
        ))}
        {clients.map((client) => (
          <li key={`${client.id}-dup`} className="client-marquee-dup pr-10 sm:pr-16" aria-hidden="true">
            <Logo client={client} decorative />
          </li>
        ))}
      </ul>
    </div>
  );
}
