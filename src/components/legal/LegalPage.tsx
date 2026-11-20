import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight, CalendarDays } from "lucide-react";
import { getBreadcrumbSchema, getWebPageSchema, jsonLd } from "@/lib/seo";
import { formatLegalDate } from "@/data/legal";
import { LegalBackToTop, LegalTocDesktop, LegalTocMobile } from "./LegalToc";
import { PrintButton } from "./PrintButton";

export interface LegalSection {
  id: string;
  title: string;
  body: ReactNode;
}

interface LegalPageProps {
  path: string;
  title: string;
  description: string;
  eyebrow: string;
  effective: string;
  updated: string;
  intro: ReactNode;
  sections: LegalSection[];
  related: { label: string; href: string };
}

/** Shared layout for the Privacy Policy and Terms & Conditions pages: clean white document style. */
export function LegalPage({ path, title, description, eyebrow, effective, updated, intro, sections, related }: LegalPageProps) {
  const crumbs = [
    { name: "Home", url: "/" },
    { name: title, url: path },
  ];
  const toc = sections.map(({ id, title }) => ({ id, title }));

  return (
    // data-no-anim: legal text stays static (no site-wide heading/letter animations)
    <div className="legal-page bg-white" data-no-anim>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(getBreadcrumbSchema(crumbs)) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd({ ...getWebPageSchema({ path, name: title, description }), dateModified: updated, datePublished: effective }) }}
      />

      {/* Minimal page header */}
      <header className="border-b border-line bg-white">
        <div className="container-wide py-8 sm:py-12">
          <nav aria-label="Breadcrumb" className="legal-no-print">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate">
              <li>
                <Link href="/" className="inline-flex min-h-6 items-center hover:text-brand">Home</Link>
              </li>
              <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5" /></li>
              <li aria-current="page" className="font-medium text-navy-900">{title}</li>
            </ol>
          </nav>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-brand">{eyebrow}</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">{title}</h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate">{description}</p>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4 text-brand" aria-hidden="true" />
              Effective date: <time dateTime={effective} className="font-semibold text-navy-900">{formatLegalDate(effective)}</time>
            </span>
            <span>
              Last updated: <time dateTime={updated} className="font-semibold text-navy-900">{formatLegalDate(updated)}</time>
            </span>
            <PrintButton />
          </div>
        </div>
      </header>

      <div className="container-wide py-10 sm:py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] xl:grid-cols-[17.5rem_minmax(0,1fr)] xl:gap-16">
          <aside className="hidden lg:block">
            <LegalTocDesktop items={toc} />
          </aside>

          <article className="legal-prose min-w-0 max-w-3xl">
            <div className="lg:hidden mb-8">
              <LegalTocMobile items={toc} />
            </div>

            <div className="space-y-4 text-[0.975rem] leading-relaxed text-navy-900/85">{intro}</div>

            <ol className="mt-10 space-y-10">
              {sections.map((s, idx) => (
                <li key={s.id} className="list-none">
                  <section id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-28 border-t border-line pt-8">
                    <h2 id={`${s.id}-h`} className="flex gap-3 text-xl font-extrabold tracking-tight text-navy-900 sm:text-[1.375rem]">
                      <span className="tabular-nums text-brand">{idx + 1}.</span>
                      <span>{s.title}</span>
                    </h2>
                    <div className="legal-body mt-4 space-y-4 text-[0.975rem] leading-relaxed text-navy-900/85">{s.body}</div>
                  </section>
                </li>
              ))}
            </ol>

            <div className="legal-no-print mt-12 flex flex-col gap-3 rounded-lg border border-line bg-mist/60 p-5 text-sm sm:flex-row sm:items-center sm:justify-between">
              <p className="text-navy-900">
                Please also read our <Link href={related.href} className="font-semibold text-brand underline underline-offset-2 hover:text-brand-dark">{related.label}</Link>.
              </p>
              <a href="#top" className="inline-flex min-h-11 items-center font-semibold text-navy-900 hover:text-brand">Back to top ↑</a>
            </div>
          </article>
        </div>
      </div>

      <LegalBackToTop />
    </div>
  );
}

/* Small helpers for consistent legal typography */
export function Sub({ children }: { children: ReactNode }) {
  return <h3 className="pt-2 text-base font-bold text-navy-900">{children}</h3>;
}

export function List({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 marker:text-brand">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  );
}

export function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return <div className="rounded-md border-l-4 border-brand bg-mist/70 px-4 py-3 text-navy-900">{children}</div>;
}
