import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ValueChain } from "@/components/home/ValueChain";
import { InsightCard } from "@/components/insights/InsightCard";
import { Media } from "@/components/media/Media";
import { OriginMap } from "@/components/origin/OriginMap";
import { CategoryCard } from "@/components/product/CategoryCard";
import { ProductCard } from "@/components/product/ProductCard";
import { SpecTable } from "@/components/product/SpecTable";
import { CertificationCard } from "@/components/quality/CertificationCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { ArrowRight, Check, Download, MapPin } from "@/components/ui/icons";
import { IllustrativeBadge, Kicker, MetricBlock, SectionHeader } from "@/components/ui/primitives";
import { getI18n, pageMetadata } from "@/i18n/server";
import { productHref } from "@/lib/data";
import { getOriginPins } from "@/lib/origin-pins";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return pageMetadata({ description: t.meta.siteDescription, path: "/" });
}

export default async function HomePage() {
  const i18n = await getI18n();
  const { t, l, db } = i18n;
  const h = t.home;
  const categories = db.getCategories();
  const featured = db.getProduct("robusta-grade-1-screen-16")!;
  // Hero card: Owi Chewi dried mango (matches the hero photo).
  const heroOffer = db.getProduct("owi-chewi-dried-mango")!;
  const moreFeatured = db.getFeaturedProducts().filter((p) => p.slug !== featured.slug).slice(0, 3);
  const validCerts = db.getCertificates().filter((c) => c.status === "valid");
  const facility = db.getFacilities()[0];
  const insights = db.getInsights().slice(0, 3);
  const company = db.company;

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.brand,
    legalName: company.legalName,
    url: SITE_URL,
    email: company.salesEmail,
    telephone: company.phone,
    foundingDate: String(company.founded),
    address: { "@type": "PostalAddress", addressCountry: "VN", addressLocality: "Ho Chi Minh City" },
  };

  const qualityHrefs = [l("/products"), l("/quality#qc"), l("/quality#certificates"), l("/supply-chain#traceability"), "/api/documents/coa-sample-coffee"];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />

      {/* 7.1 HERO — 55/45, no carousel, not full-screen */}
      <section className="bg-ivory">
        <div className="container-x grid items-center gap-10 pb-16 pt-10 lg:min-h-[680px] lg:grid-cols-12 lg:gap-12 lg:pb-20 lg:pt-12 2xl:min-h-[740px]">
          <div className="lg:col-span-7 xl:pr-6">
            <Kicker className="mb-6">{h.kicker}</Kicker>
            <h1 className="t-h1 text-ink">
              {h.h1a}
              <br />
              <span className="italic text-forest-700">{h.h1b}</span>
            </h1>
            <p className="t-lead mt-7 max-w-[34ch] text-muted sm:max-w-[46ch]">{h.lead}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={l("/products")} icon={<ArrowRight size={18} className="arrow-nudge" />}>
                {h.explore}
              </ButtonLink>
              <ButtonLink href={l("/request-quote")} variant="secondary">
                {t.common.requestAQuote}
              </ButtonLink>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-6 text-[14px] font-semibold text-ink/80" aria-label={h.categoriesAria}>
              {categories.map((c) => (
                <li key={c.key}>
                  <Link href={l(`/products/${c.slug}`)} className="inline-flex min-h-[32px] items-center hover:text-forest-700 hover:underline">
                    {c.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative lg:col-span-5">
            <Media
              image={{ src: "/images/hero/all-1.jpg", kind: "human", alt: h.heroImageAlt, caption: h.heroImageCaption, focal: "38% 62%" }}
              className="aspect-[4/5] max-h-[620px] w-full rounded-md sm:aspect-[5/4] lg:aspect-[4/5]"
              preload
              labelPosition="top"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
            <div className="absolute -bottom-6 left-4 right-4 rounded-md border border-line bg-white p-4 shadow-soft sm:left-auto sm:right-6 sm:w-[300px] lg:-left-10 lg:right-auto">
              <p className="t-label text-green-500">{h.currentOffer(heroOffer.crop)}</p>
              <p className="mt-1.5 text-[16px] font-bold leading-6">{heroOffer.name}</p>
              <p className="mt-1 flex items-center gap-1.5 text-[13px] text-muted">
                <MapPin size={14} className="text-green-500" /> {t.products.cardOrigin(db.getOrigin(heroOffer.originIds[0])?.name ?? "")}
              </p>
              <Link href={l(productHref(heroOffer))} className="group mt-2 inline-flex min-h-[36px] items-center gap-1.5 text-[14px] font-semibold text-forest-700">
                {t.common.viewSpec} <ArrowRight size={16} className="arrow-nudge" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7.2 TRUST STRIP — verified metrics only in production */}
      <section className="on-dark bg-forest-900 text-white" aria-label={h.factsAria}>
        <div className="container-x py-14 lg:py-16">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {db.trustMetrics.map((m) => (
              <MetricBlock key={m.id} metric={m} onDark />
            ))}
          </div>
          <div className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-6 md:flex-row md:items-center md:justify-between">
            <ul className="flex flex-wrap gap-2" aria-label={h.validCertsAria}>
              {[...new Set(validCerts.map((c) => c.schemeShort))].map((s) => (
                <li key={s} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1 text-[12.5px] font-semibold text-white/85">
                  <Check size={14} className="text-gold-500" /> {s}
                </li>
              ))}
            </ul>
            <TextLink href={l("/quality#certificates")} onDark className="shrink-0 text-[14px]">
              {h.scopeLink}
            </TextLink>
          </div>
        </div>
      </section>

      {/* 7.3 PRODUCT CATEGORIES */}
      <section className="section-y bg-ivory" aria-labelledby="cat-title">
        <div className="container-x">
          <SectionHeader id="cat-title" kicker={h.catKicker} title={h.catTitle} intro={h.catIntro} action={<TextLink href={l("/products")}>{h.viewAll}</TextLink>} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {categories.map((c, i) => (
              <div key={c.key} data-reveal style={{ "--reveal-delay": `${(i % 3) * 60}ms` } as CSSProperties}>
                <CategoryCard category={c} count={db.getProductsByCategory(c.key).length} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7.4 VIETNAM ORIGINS MAP — signature asset */}
      <section className="section-y bg-sand" aria-labelledby="map-heading">
        <div className="container-x">
          <SectionHeader id="map-heading" kicker={h.mapKicker} title={h.mapTitle} intro={h.mapIntro} action={<TextLink href={l("/origins")}>{h.allOrigins}</TextLink>} />
          <OriginMap origins={getOriginPins(i18n)} />
        </div>
      </section>

      {/* 7.5 FEATURED PRODUCT — technical preview (bridge to product proof) */}
      <section className="section-y bg-ivory" aria-labelledby="featured-title">
        <div className="container-x">
          <SectionHeader id="featured-title" kicker={h.featKicker} title={h.featTitle} />
          <div className="grid gap-8 overflow-hidden rounded-md border border-line bg-white lg:grid-cols-12 lg:gap-0" data-reveal>
            <div className="lg:col-span-5">
              <Media image={featured.image} className="aspect-[4/3] h-full lg:aspect-auto" sizes="(min-width: 1024px) 40vw, 100vw" />
            </div>
            <div className="p-6 sm:p-8 lg:col-span-7 lg:p-10">
              <p className="t-label text-green-500">{h.featLabel(featured.grade ?? "")}</p>
              <h3 className="t-h3 mt-2">{featured.name}</h3>
              <p className="mt-3 max-w-[60ch] text-[15px] leading-6 text-muted">{featured.shortDescription}</p>
              <div className="mt-6">
                <SpecTable
                  rows={db.getSpecRows(featured).filter((r) => ["grade", "screen", "moistureMax", "processing", "packing", "cropYear"].includes(r.key))}
                  caption={h.techPreview}
                  verified={featured.verified}
                  compact
                />
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={l(productHref(featured))} icon={<ArrowRight size={18} className="arrow-nudge" />}>
                  {h.fullSpec}
                </ButtonLink>
                <ButtonLink href={l(`/request-quote?product=${featured.slug}`)} variant="secondary">
                  {t.common.requestQuote}
                </ButtonLink>
              </div>
            </div>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {moreFeatured.map((p) => (
              <div key={p.slug} data-reveal>
                <ProductCard product={p} condensed />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7.6 FARM → PORT VALUE CHAIN — dark */}
      <section className="on-dark section-y bg-forest-900 text-white" aria-labelledby="chain-title">
        <div className="container-x">
          <SectionHeader id="chain-title" onDark kicker={h.chainKicker} title={h.chainTitle} intro={h.chainIntro} />
          <ValueChain steps={db.ops.valueChain} />
        </div>
      </section>

      {/* 7.7 QUALITY & CERTIFICATION */}
      <section className="section-y bg-ivory" aria-labelledby="quality-title">
        <div className="container-x">
          <SectionHeader id="quality-title" kicker={h.qualityKicker} title={h.qualityTitle} action={<TextLink href={l("/quality")}>{h.qualityLink}</TextLink>} />
          <div className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {h.qualityBlocks.map((b, i) => (
              <div key={b.t} className="flex flex-col bg-white p-6" data-reveal style={{ "--reveal-delay": `${i * 50}ms` } as CSSProperties}>
                <span className="font-serif text-[15px] text-green-500">0{i + 1}</span>
                <h3 className="mt-3 text-[18px] font-bold">{b.t}</h3>
                <p className="mt-2 flex-1 text-[14.5px] leading-6 text-muted">{b.b}</p>
                {qualityHrefs[i].startsWith("/api/") ? (
                  <a href={qualityHrefs[i]} className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-[14px] font-semibold text-forest-700 hover:underline">
                    <Download size={16} /> {b.l}
                  </a>
                ) : (
                  <TextLink href={qualityHrefs[i]} className="mt-4 text-[14px]">
                    {b.l}
                  </TextLink>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {validCerts.slice(0, 3).map((c) => (
              <CertificationCard key={c.id} cert={c} />
            ))}
          </div>
        </div>
      </section>

      {/* 7.8 PROCESSING CAPABILITY */}
      <section className="section-y bg-sand" aria-labelledby="cap-title">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-6" data-reveal>
            <Media image={facility.image} className="aspect-[4/3] rounded-md" />
          </div>
          <div className="lg:col-span-6">
            <Kicker className="mb-4">{h.capKicker}</Kicker>
            <h2 id="cap-title" className="t-h2">
              {h.capTitle}
            </h2>
            <p className="t-lead mt-5 text-muted">{h.capLead}</p>
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-forest-900/15 pt-8">
              {facility.metrics.map((m) => (
                <MetricBlock key={m.id} metric={m} showDefinition />
              ))}
            </div>
            <p className="mt-6 text-[13px] text-muted">{h.capMetricsFor(facility.name)}</p>
            <div className="mt-8">
              <ButtonLink href={l("/capabilities")} variant="secondary" icon={<ArrowRight size={18} className="arrow-nudge" />}>
                {h.capCta}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* GLOBAL REACH */}
      <section className="section-y bg-ivory" aria-labelledby="reach-title">
        <div className="container-x">
          <SectionHeader id="reach-title" kicker={h.reachKicker} title={h.reachTitle} intro={h.reachIntro} action={<IllustrativeBadge />} />
          <div className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {db.markets.map((m) => (
              <div key={m.region} className="bg-white p-6 lg:p-7">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-[18px] font-bold">{m.region}</h3>
                  <span className={m.confirmed ? "text-[12px] font-bold text-success" : "text-[12px] font-bold text-muted"}>{m.confirmed ? h.shipped : h.target}</span>
                </div>
                <p className="mt-3 text-[14.5px] leading-6 text-muted">{m.countries.join(" · ")}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[14px] text-muted">
            {h.loadingPorts}{" "}
            <Link href={l("/logistics")} className="font-semibold text-forest-700 underline underline-offset-4">
              {h.logisticsLink}
            </Link>
          </p>
        </div>
      </section>

      {/* TRACEABILITY */}
      <section className="on-dark section-y bg-forest-700 text-white" aria-labelledby="trace-title">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <Kicker onDark className="mb-4">
              {h.traceKicker}
            </Kicker>
            <h2 id="trace-title" className="t-h2 text-white">
              {h.traceTitle}
            </h2>
            <p className="t-lead mt-5 text-white/75">{h.traceLead}</p>
            <div className="mt-8">
              <TextLink href={l("/supply-chain#traceability")} onDark>
                {h.traceLink}
              </TextLink>
            </div>
          </div>
          <div className="lg:col-span-7" data-reveal>
            <div className="rounded-md border border-white/15 bg-forest-900 p-6 sm:p-8">
              <p className="t-label text-white/60">{h.exampleLot}</p>
              <p className="mt-3 break-all font-mono text-[26px] font-semibold tracking-[0.06em] text-gold-500 sm:text-[34px]">VN-DL-2627-0412-C</p>
              <dl className="mt-6 grid gap-px overflow-hidden rounded-sm bg-white/10 sm:grid-cols-5">
                {["VN", "DL", "2627", "0412", "C"].map((k, i) => (
                  <div key={k} className="bg-forest-900 p-3">
                    <dt className="font-mono text-[15px] font-semibold text-white">{k}</dt>
                    <dd className="mt-1 text-[12.5px] leading-[18px] text-white/65">{h.lotParts[i]}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-[12px] text-white/50">{h.lotNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* SUSTAINABILITY */}
      <section className="section-y bg-ivory" aria-labelledby="sus-title">
        <div className="container-x">
          <SectionHeader id="sus-title" kicker={h.susKicker} title={h.susTitle} action={<TextLink href={l("/sustainability")}>{h.susLink}</TextLink>} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {db.sustainabilityMetrics.map((m) => (
              <div key={m.id} className="flex flex-col rounded-md border border-line bg-white p-6" data-reveal>
                <span className="font-serif text-[48px] leading-none text-forest-700">{m.value}</span>
                <p className="mt-3 text-[15px] font-semibold leading-6">{m.label}</p>
                <p className="mt-3 text-[13px] leading-5 text-muted">
                  {m.period} · {m.scope}
                </p>
                <IllustrativeBadge verified={m.verified} className="mt-4 self-start" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSIGHTS */}
      <section className="section-y border-t border-line bg-ivory" aria-labelledby="insights-title">
        <div className="container-x">
          <SectionHeader id="insights-title" kicker={h.insKicker} title={h.insTitle} action={<TextLink href={l("/insights")}>{h.insLink}</TextLink>} />
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {insights.map((i) => (
              <InsightCard key={i.slug} insight={i} />
            ))}
          </div>
        </div>
      </section>

      {/* 7.9 FINAL CTA */}
      <CtaBand secondary={{ label: t.cta.catalogue, href: l("/downloads") }} />
    </>
  );
}
