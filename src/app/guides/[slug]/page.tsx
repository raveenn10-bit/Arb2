import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { pageMeta } from "@/lib/page-meta";
import { GUIDES, getGuide } from "@/data/guides";
import { SERVICES } from "@/data/services";
import { COMPANY } from "@/data/company";
import { PageHero } from "@/components/ui/PageHero";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { getFaqSchema } from "@/lib/seo";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  const base = pageMeta({ title: g.seoTitle, description: g.description, path: `/guides/${g.slug}`, keywords: g.keywords });
  return {
    ...base,
    title: { absolute: `${g.seoTitle} | Pak Arab` },
    openGraph: { ...base.openGraph, type: "article", publishedTime: g.published, modifiedTime: g.updated },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();

  const url = `${COMPANY.domain}/guides/${g.slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    description: g.description,
    image: `${COMPANY.domain}${g.image}`,
    datePublished: g.published,
    dateModified: g.updated,
    inLanguage: "en-AE",
    mainEntityOfPage: url,
    author: { "@id": `${COMPANY.domain}/#organization`, "@type": "Organization", name: COMPANY.name },
    publisher: { "@id": `${COMPANY.domain}/#organization`, "@type": "Organization", name: COMPANY.name },
  };
  const related = SERVICES.filter((s) => g.relatedServices.includes(s.slug));
  const updated = new Date(g.updated).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqSchema(g.faqs)) }} />
      <PageHero
        eyebrow={`Guide · ${g.readMinutes} min read`}
        title={g.title}
        description={g.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: g.title, href: `/guides/${g.slug}` },
        ]}
      />

      <article className="bg-white py-14 sm:py-20">
        <div className="container-wide grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-8">
            <p className="text-sm text-slate">
              By {COMPANY.name} · Updated <time dateTime={g.updated}>{updated}</time>
            </p>

            {/* Direct answer first (answer-engine friendly) */}
            <div className="rounded-xl border-l-4 border-brand bg-mist p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">Short answer</p>
              <p className="mt-2 text-base leading-relaxed text-navy-900 sm:text-lg">{g.summary}</p>
            </div>

            <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
              <Image src={g.image} alt={g.imageAlt} fill priority sizes="(max-width:1024px) 100vw, 66vw" className="object-cover" />
            </div>

            {g.sections.map((s) => (
              <section key={s.heading} className="space-y-4">
                <h2 className="text-2xl font-extrabold tracking-tight text-navy-900">{s.heading}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)} className="text-base leading-relaxed text-slate">{p}</p>
                ))}
                {s.bullets && (
                  <ul className="space-y-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-base text-navy-900">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-brand" aria-hidden="true" /> {b}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <section className="space-y-5">
              <h2 className="text-2xl font-extrabold tracking-tight text-navy-900">Frequently asked questions</h2>
              <FaqAccordion items={g.faqs} />
            </section>

            {g.sources && (
              <p className="text-sm text-slate">
                Source:{" "}
                {g.sources.map((s) => (
                  <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-brand">
                    {s.label}
                  </a>
                ))}
              </p>
            )}
          </div>

          <aside className="space-y-6 lg:col-span-4">
            <div className="rounded-xl bg-navy-900 p-6 text-white lg:sticky lg:top-28">
              <p className="text-lg font-extrabold">Need a crew mobilised?</p>
              <p className="mt-2 text-sm text-white/75">
                Tell us the trades, headcount and site. We typically mobilise within 24–72 hours.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <Link href="/contact" className="inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-md bg-brand px-5 text-sm font-bold hover:bg-brand-dark">
                  Request Manpower <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a href={COMPANY.whatsapp.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-md border border-white/20 px-5 text-sm font-bold hover:bg-white/10">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp {COMPANY.whatsapp.display}
                </a>
              </div>
              {related.length > 0 && (
                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-white/55">Related services</p>
                  <ul className="mt-3 space-y-2">
                    {related.map((s) => (
                      <li key={s.slug}>
                        <Link href={`/services/${s.slug}`} className="text-sm font-semibold hover:text-brand-light">
                          {s.title} manpower →
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
