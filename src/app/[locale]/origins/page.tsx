import type { Metadata } from "next";
import Link from "next/link";
import { Media } from "@/components/media/Media";
import { OriginMap } from "@/components/origin/OriginMap";
import { ProductCard } from "@/components/product/ProductCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ArrowRight } from "@/components/ui/icons";
import { IllustrativeBadge, Kicker, SectionHeader } from "@/components/ui/primitives";
import { getI18n, pageMetadata } from "@/i18n/server";
import { getOriginPins } from "@/lib/origin-pins";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return pageMetadata({ title: t.origins.metaTitle, description: t.origins.metaDesc, path: "/origins" });
}

export default async function OriginsPage() {
  const i18n = await getI18n();
  const { t, l, db } = i18n;
  const o = t.origins;
  const origins = db.getOrigins();
  return (
    <>
      <PageHero breadcrumb={[{ label: t.common.home, href: l("/") }, { label: t.nav.origins }]} kicker={o.kicker} title={o.title} intro={o.intro} />

      {/* Interactive map */}
      <section className="bg-sand py-16 lg:py-24" aria-labelledby="map-title-origins">
        <div className="container-x">
          <h2 id="map-title-origins" className="sr-only">
            {o.mapSr}
          </h2>
          <OriginMap origins={getOriginPins(i18n)} />
        </div>
      </section>

      {/* Origin cards */}
      <section className="section-y bg-ivory" aria-labelledby="origin-cards-title">
        <div className="container-x">
          <SectionHeader id="origin-cards-title" kicker={o.regionsKicker} title={o.profiles} />
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {origins.map((origin) => (
              <li key={origin.slug} data-reveal>
                <Link href={l(`/origins/${origin.slug}`)} className="group flex h-full flex-col overflow-hidden rounded-md border border-line bg-white hover:shadow-soft">
                  <Media image={origin.image} className="aspect-[3/2]" zoom sizes="(min-width: 1024px) 33vw, 100vw" />
                  <div className="flex flex-1 flex-col p-6">
                    <p className="t-label text-green-500">{origin.region}</p>
                    <h3 className="mt-2 font-serif text-[28px] leading-8">{origin.name}</h3>
                    <p className="mt-3 text-[15px] leading-6 text-muted">{origin.summary}</p>
                    <dl className="mt-5 space-y-2 border-t border-line pt-4 text-[14px]">
                      <div className="flex justify-between gap-4">
                        <dt className="text-muted">{o.crops}</dt>
                        <dd className="text-right font-semibold">{origin.crops.join(", ")}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-muted">{o.harvest}</dt>
                        <dd className="text-right font-semibold">{origin.harvest}</dd>
                      </div>
                    </dl>
                    <span className="mt-auto inline-flex items-center gap-2 pt-5 font-semibold text-forest-700">
                      {o.profile} <ArrowRight size={18} className="arrow-nudge" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Farmer / landscape story */}
      <section className="on-dark bg-forest-900 text-white" aria-labelledby="story-title">
        <div className="grid lg:grid-cols-2">
          <Media image={{ kind: "human", alt: o.storyImageAlt, caption: o.storyImageCaption }} className="aspect-[4/3] lg:aspect-auto lg:min-h-[560px]" />
          <div className="flex items-center">
            <div className="px-[var(--gutter)] py-16 lg:max-w-[640px] lg:px-16 lg:py-24">
              <Kicker onDark className="mb-5">
                {o.storyKicker}
              </Kicker>
              <h2 id="story-title" className="t-h2 text-white">
                {o.storyTitle}
              </h2>
              <p className="t-lead mt-6 text-white/75">{o.storyBody}</p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href={l("/supply-chain#traceability")} className="group inline-flex min-h-[44px] items-center gap-2 font-semibold text-white hover:underline">
                  {t.home.traceLink} <ArrowRight size={18} className="arrow-nudge text-gold-500" />
                </Link>
                <IllustrativeBadge onDark label={o.storyPlaceholder} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products by origin */}
      <section className="section-y bg-ivory" aria-labelledby="by-origin-title">
        <div className="container-x">
          <SectionHeader id="by-origin-title" kicker={o.byKicker} title={o.byTitle} />
          <div className="space-y-14">
            {origins.map((origin) => {
              const products = db.getProductsByOrigin(origin.slug);
              if (!products.length) return null;
              return (
                <div key={origin.slug}>
                  <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3 border-b border-line pb-3">
                    <h3 className="text-[20px] font-bold">{origin.name}</h3>
                    <Link href={l(`/origins/${origin.slug}`)} className="text-[14px] font-semibold text-forest-700 underline underline-offset-4">
                      {o.countProfile(products.length)}
                    </Link>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {products.slice(0, 3).map((p) => (
                      <ProductCard key={p.slug} product={p} condensed headingLevel="h3" />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand title={o.ctaTitle} body={o.ctaBody} />
    </>
  );
}
