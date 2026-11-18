import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getBreadcrumbSchema } from "@/lib/seo";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbs: { label: string; href: string }[];
}

export function PageHero({ eyebrow, title, description, breadcrumbs }: PageHeroProps) {
  const schema = getBreadcrumbSchema(
    breadcrumbs.map((b) => ({ name: b.label, url: b.href }))
  );

  return (
    <section className="bg-[#111315] text-white border-b border-white/10 py-14 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="container-wide space-y-4">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-white/65">
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <span key={crumb.href} className="inline-flex items-center gap-1.5">
                {idx > 0 && <ChevronRight className="h-3.5 w-3.5 text-white/40" />}
                {isLast ? (
                  <span className="text-white font-medium">{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} className="hover:text-white transition-colors">
                    {crumb.label}
                  </Link>
                )}
              </span>
            );
          })}
        </nav>

        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D40820]">
            {eyebrow}
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-white/80 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
