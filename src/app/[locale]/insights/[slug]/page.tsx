import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InsightCard } from "@/components/insights/InsightCard";
import { Media } from "@/components/media/Media";
import { ProductCard } from "@/components/product/ProductCard";
import { buttonClass } from "@/components/ui/Button";
import { ArrowRight, Info } from "@/components/ui/icons";
import { Breadcrumb } from "@/components/ui/primitives";
import { company } from "@/content/company";
import type { InsightBlock } from "@/content/types";
import { getI18n, pageMetadata } from "@/i18n/server";
import { createDb } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return createDb("en")
    .getInsights()
    .map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { db } = await getI18n();
  const i = db.getInsight(slug);
  if (!i) return {};
  const meta = await pageMetadata({ title: i.title, description: i.summary, path: `/insights/${i.slug}` });
  return { ...meta, openGraph: { ...meta.openGraph, type: "article", publishedTime: i.publishedAt } };
}

function Block({ block }: { block: InsightBlock }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "h2":
      return <h2>{block.text}</h2>;
    case "h3":
      return <h3>{block.text}</h3>;
    case "ul":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-md border border-line bg-white">
          <table className="w-full text-left text-[15px]">
            <thead className="bg-ivory text-[12px] uppercase tracking-[0.08em] text-muted">
              <tr>
                {block.head.map((h) => (
                  <th key={h} scope="col" className="px-4 py-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((r) => (
                <tr key={r.join("|")} className="border-t border-line">
                  {r.map((c, i) =>
                    i === 0 ? (
                      <th key={c} scope="row" className="px-4 py-3 font-semibold">
                        {c}
                      </th>
                    ) : (
                      <td key={c + i} className="px-4 py-3">
                        {c}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "note":
      return (
        <div className="flex items-start gap-3 rounded-md border border-gold-500/50 bg-gold-500/10 p-4 text-[15px] leading-6">
          <Info size={18} className="mt-0.5 shrink-0" />
          <span>{block.text}</span>
        </div>
      );
  }
}

export default async function InsightPage({ params }: PageProps<"/[locale]/insights/[slug]">) {
  const { slug } = await params;
  const { t, l, db, date, locale } = await getI18n();
  const it = t.insights;
  const insight = db.getInsight(slug);
  if (!insight) notFound();
  const products = insight.relatedProducts.map((s) => db.getProduct(s)).filter((p): p is NonNullable<typeof p> => Boolean(p));
  const more = db
    .getInsights()
    .filter((i) => i.slug !== insight.slug)
    .slice(0, 3);
  const isDownload = insight.cta.href.startsWith("/api/");

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title,
    description: insight.summary,
    datePublished: insight.publishedAt,
    inLanguage: locale,
    publisher: { "@type": "Organization", name: company.brand },
    mainEntityOfPage: `${SITE_URL}${l(`/insights/${insight.slug}`)}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <article className="bg-ivory">
        <header className="container-x pt-8 lg:pt-12">
          <Breadcrumb items={[{ label: t.common.home, href: l("/") }, { label: t.nav.insights, href: l("/insights") }, { label: it.pillars[insight.pillar] }]} />
          <div className="max-w-[860px]">
            <p className="t-label text-green-500">{it.pillars[insight.pillar]}</p>
            <h1 className="t-h1 mt-4 lg:text-[60px] lg:leading-[64px]">{insight.title}</h1>
            <p className="t-lead mt-6 text-muted">{insight.summary}</p>
            <p className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-[14px] text-muted">
              <time dateTime={insight.publishedAt}>{date(insight.publishedAt)}</time>
              <span aria-hidden>·</span>
              <span>{t.common.minRead(insight.readingMinutes)}</span>
              {insight.reviewedBy && (
                <>
                  <span aria-hidden>·</span>
                  <span>{it.reviewedBy(insight.reviewedBy)}</span>
                </>
              )}
            </p>
          </div>
          <Media image={insight.image} className="mt-10 aspect-[21/9] rounded-md" preload sizes="100vw" />
        </header>

        <div className="container-x grid gap-12 py-14 lg:grid-cols-12 lg:py-20">
          <div className="prose-body max-w-[70ch] text-[17px] leading-[30px] text-ink/90 lg:col-span-8">
            {insight.body.map((b, i) => (
              <Block key={i} block={b} />
            ))}
          </div>
          <aside className="lg:col-span-4">
            <div className="space-y-6 lg:sticky lg:top-[100px]">
              <div className="rounded-md bg-forest-900 p-6 text-white">
                <p className="t-label text-gold-500">{it.nextStep}</p>
                <p className="mt-2 text-[17px] font-bold leading-6">{insight.cta.label}</p>
                {isDownload ? (
                  <a href={insight.cta.href} className={buttonClass("gold", "sm", "mt-5 w-full")}>
                    {t.common.download}
                  </a>
                ) : (
                  <Link href={l(insight.cta.href)} className={buttonClass("gold", "sm", "mt-5 w-full")}>
                    {it.continue}
                  </Link>
                )}
                <Link href={l("/contact?topic=sourcing")} className="mt-3 flex min-h-[44px] items-center justify-center text-[14px] font-semibold text-white underline underline-offset-4">
                  {it.askSourcing}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </article>

      {products.length > 0 && (
        <section className="border-t border-line bg-ivory py-16" aria-labelledby="rel-prod">
          <div className="container-x">
            <h2 id="rel-prod" className="t-h3 mb-8">
              {it.relatedProducts}
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.slice(0, 3).map((p) => (
                <ProductCard key={p.slug} product={p} condensed />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-line bg-sand py-16" aria-labelledby="more-title">
        <div className="container-x">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 id="more-title" className="t-h3">
              {it.more}
            </h2>
            <Link href={l("/insights")} className="group inline-flex min-h-[44px] items-center gap-2 font-semibold text-forest-700">
              {t.home.insLink} <ArrowRight size={18} className="arrow-nudge" />
            </Link>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {more.map((i) => (
              <InsightCard key={i.slug} insight={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
