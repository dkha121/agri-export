import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { InsightCard } from "@/components/insights/InsightCard";
import { InsightFilter } from "@/components/insights/InsightFilter";
import { Media } from "@/components/media/Media";
import { PageHero } from "@/components/sections/PageHero";
import { ArrowRight } from "@/components/ui/icons";
import type { InsightPillar } from "@/content/types";
import { getI18n, pageMetadata } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return pageMetadata({ title: t.insights.metaTitle, description: t.insights.metaDesc, path: "/insights" });
}

const PILLARS: InsightPillar[] = ["Crop outlook", "Product education", "Import guide", "Origin insight", "Quality guide", "Market update"];

export default async function InsightsPage() {
  const { t, l, db, date } = await getI18n();
  const it = t.insights;
  const insights = db.getInsights();
  const lead = insights[0];
  const cards = Object.fromEntries(insights.map((i) => [i.slug, <InsightCard key={i.slug} insight={i} />]));

  return (
    <>
      <PageHero breadcrumb={[{ label: t.common.home, href: l("/") }, { label: t.nav.insights }]} kicker={it.kicker} title={it.title} intro={it.intro} />

      {/* Featured */}
      <section className="bg-ivory pb-16" aria-labelledby="lead-title">
        <div className="container-x">
          <article className="group relative grid overflow-hidden rounded-md border border-line bg-white lg:grid-cols-2">
            <Media image={lead.image} className="aspect-[16/10] lg:aspect-auto lg:min-h-[420px]" zoom />
            <div className="flex flex-col justify-center p-6 sm:p-10">
              <p className="text-[13px] text-muted">
                <span className="t-label text-green-500">{it.pillars[lead.pillar]}</span> · <time dateTime={lead.publishedAt}>{date(lead.publishedAt)}</time> ·{" "}
                {t.common.minRead(lead.readingMinutes)}
              </p>
              <h2 id="lead-title" className="t-h2 mt-4">
                <Link href={l(`/insights/${lead.slug}`)} className="after:absolute after:inset-0 hover:underline hover:decoration-1 hover:underline-offset-8">
                  {lead.title}
                </Link>
              </h2>
              <p className="t-lead mt-4 text-muted">{lead.summary}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-semibold text-forest-700">
                {it.readOutlook} <ArrowRight size={18} className="arrow-nudge" />
              </span>
            </div>
          </article>
        </div>
      </section>

      <section className="border-t border-line bg-ivory py-16 lg:py-20" aria-labelledby="all-title">
        <div className="container-x">
          <h2 id="all-title" className="t-h3 mb-6">
            {it.all}
          </h2>
          <Suspense fallback={null}>
            <InsightFilter items={insights.map((i) => ({ slug: i.slug, pillar: i.pillar }))} pillars={PILLARS} cards={cards} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
