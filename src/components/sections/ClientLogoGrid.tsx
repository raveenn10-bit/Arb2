import Image from "next/image";
import { CLIENTS } from "@/data/clients";
import { MobileAutoTrack } from "@/components/animations/MobileAutoTrack";

export function ClientLogoGrid() {
  return (
    <MobileAutoTrack desktopGridClass="md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {CLIENTS.map((client) => (
        <div
          key={client.id}
          className="group min-w-[165px] sm:min-w-[190px] md:min-w-0 shrink-0 md:shrink snap-start flex flex-col items-center justify-between rounded-lg border border-[#E5E7EB] bg-white p-4 hover:border-[#D40820]/50 hover:shadow-md transition-all duration-200"
        >
          <div className="relative h-14 w-full flex items-center justify-center">
            <Image
              src={client.logo}
              alt={`${client.name} corporate logo`}
              fill
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 15vw"
              className="object-contain p-1 transition-transform duration-200 group-hover:scale-105"
            />
          </div>
          <div className="mt-3 pt-2.5 w-full border-t border-[#F5F6F8] text-center">
            <p className="text-xs font-bold text-[#111315] line-clamp-1">{client.name}</p>
            <p className="text-[11px] text-[#667085] line-clamp-1">{client.sector}</p>
          </div>
        </div>
      ))}
    </MobileAutoTrack>
  );
}
