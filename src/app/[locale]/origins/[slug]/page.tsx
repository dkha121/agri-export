import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Media } from "@/components/media/Media";
import { ProductCard } from "@/components/product/ProductCard";
import { SeasonCalendar } from "@/components/product/SeasonCalendar";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight, Check } from "@/components/ui/icons";
import { IllustrativeBadge, SectionHeader } from "@/components/ui/primitives";
import { getI18n, pageMetadata } from "@/i18n/server";
import { createDb } from "@/lib/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return createDb("en")
    .getOrigins()
    .map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/origins/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { t, db } = await getI18n();
  const o = db.getOrigin(slug);
  if (!o) return {};
  return pageMetadata({ title: t.origins.detail.metaTitle(o.name), description: o.summary, path: `/origins/${o.slug}` });
}

export default async function OriginDetailPage({ params }: PageProps<"/[locale]/origins/[slug]">) {
  const { slug } = await params;
  const { t, l, db } = await getI18n();
  const d = t.origins.detail;
  const origin = db.getOrigin(slug);
  if (!origin) notFound();
  const products = db.getProductsByOrigin(origin.slug);
  const others = db.getOrigins().filter((o) => o.slug !== origin.slug);
  const months = Array.from({ length: 12 }, (_, i) => (origin.harvestMonths.includes(i + 1) ? 2 : 0));

  return (
    <>
      <PageHero
        breadcrumb={[{ label: t.common.home, href: l("/") }, { label: t.nav.origins, href: l("/origins") }, { label: origin.name }]}
        kicker={origin.region}
        title={origin.name}
        intro={origin.summary}
        image={origin.image}
        actions={
          <>
            <ButtonLink href="#products" icon={<ArrowRight size={18} className="arrow-nudge" />}>
              {d.productsBtn}
            </ButtonLink>
            <ButtonLink href={l("/request-quote")} variant="secondary">
              {t.common.requestAQuote}
            </ButtonLink>
          </>
        }
      />

      {/* Geography / crop / harvest / processing (§10 origin detail module) */}
      <section className="bg-ivory pb-16 lg:pb-24" aria-labelledby="facts-title">
        <div className="container-x">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 id="facts-title" className="t-h3">
              {d.glance}
            </h2>
            <IllustrativeBadge verified={origin.verified} />
          </div>
          <dl className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {[
              [d.facts.provinces, origin.provinces.join(", ")],
              [d.facts.altitude, origin.altitude],
              [d.facts.climate, origin.climate],
              [d.facts.soil, origin.soil],
              [d.facts.crops, origin.crops.join(", ")],
              [d.facts.processing, origin.processing.join(", ")],
            ].map(([k, v]) => (
              <div key={k} className="bg-white p-6">
                <dt className="t-label text-muted">{k}</dt>
                <dd className="mt-2 text-[16px] font-semibold leading-6">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 rounded-md border border-line bg-white p-6">
            <p className="mb-1 text-[16px] font-bold">{d.calendar}</p>
            <p className="mb-5 text-[14px] text-muted">{origin.harvest}</p>
            <SeasonCalendar values={months} label={d.calendarLabel(origin.name)} />
          </div>
        </div>
      </section>

      {/* Story + proof */}
      <section className="section-y bg-sand" aria-labelledby="proof-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader id="proof-title" kicker={d.howKicker} title={d.howTitle} intro={origin.story} />
          </div>
          <div className="grid gap-5 lg:col-span-7">
            {origin.proof.map((p) => (
              <div key={p.title} className="rounded-md border border-line bg-white p-6" data-reveal>
                <p className="flex items-center gap-2 text-[17px] font-bold">
                  <Check size={18} className="text-green-500" /> {p.title}
                </p>
                <p className="mt-2 text-[15px] leading-6 text-muted">{p.body}</p>
              </div>
            ))}
            <div className="grid grid-cols-2 gap-4">
              {origin.gallery.map((g) => (
                <Media key={g.alt} image={g} className="aspect-[4/3] rounded-md" sizes="(min-width: 1024px) 25vw, 50vw" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="section-y scroll-mt-24 bg-ivory" aria-labelledby="origin-products-title">
        <div className="container-x">
          <SectionHeader id="origin-products-title" kicker={d.linked} title={d.productsFrom(origin.name)} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-ivory py-14" aria-labelledby="other-origins">
        <div className="container-x">
          <h2 id="other-origins" className="t-label mb-5 text-muted">
            {d.others}
          </h2>
          <ul className="flex flex-wrap gap-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={l(`/origins/${o.slug}`)} className="inline-flex min-h-[44px] items-center rounded-full border border-line bg-white px-4 text-[14px] font-semibold hover:border-green-500">
                  {o.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title={d.ctaTitle(origin.name)} body={d.ctaBody} />
    </>
  );
}
