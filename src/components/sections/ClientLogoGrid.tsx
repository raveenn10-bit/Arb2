import Image from "next/image";
import { CLIENTS, type ClientLogo } from "@/data/clients";

interface ClientLogoGridProps {
  /** "marquee" = single continuously scrolling row; "wall" = static logo wall (all logos visible). */
  variant?: "marquee" | "wall";
}

function Logo({ client, decorative = false }: { client: ClientLogo; decorative?: boolean }) {
  return (
    <div className="relative h-16 w-40 sm:h-20 sm:w-52 lg:h-24 lg:w-60 shrink-0">
      <Image
        src={client.logo}
        alt={decorative ? "" : `${client.name} logo`}
        aria-hidden={decorative || undefined}
        fill
        sizes="(max-width: 640px) 160px, (max-width: 1024px) 208px, 240px"
        unoptimized /* serve the original full-resolution logo files as supplied */
        className="object-contain"
      />
    </div>
  );
}

export function ClientLogoGrid({ variant = "marquee" }: ClientLogoGridProps) {
  if (variant === "wall") {
    return (
      <div className="bg-white grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-8 gap-y-10 place-items-center">
        {CLIENTS.map((client) => (
          <Logo key={client.id} client={client} />
        ))}
      </div>
    );
  }

  return (
    <div
      className="client-marquee group relative w-full overflow-hidden bg-white py-4"
      aria-label="Our clients"
    >
      {/* soft white fade on both edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-24 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-24 bg-gradient-to-l from-white to-transparent" />

      <div className="client-marquee-track flex w-max items-center group-hover:[animation-play-state:paused]">
        {CLIENTS.map((client) => (
          <div key={client.id} className="pr-10 sm:pr-16"><Logo client={client} /></div>
        ))}
        {/* duplicate set for a seamless loop */}
        {CLIENTS.map((client) => (
          <div key={`${client.id}-dup`} className="pr-10 sm:pr-16"><Logo client={client} decorative /></div>
        ))}
      </div>
    </div>
  );
}
