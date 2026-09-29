import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DownloadRow } from "@/components/docs/DownloadRow";
import { Media } from "@/components/media/Media";
import { ProductMobileBar, ProductRfqCard, ProductViewTracker, SpecDownloadButton } from "@/components/product/ProductActions";
import { ProductCard } from "@/components/product/ProductCard";
import { SeasonCalendar } from "@/components/product/SeasonCalendar";
import { SpecTable } from "@/components/product/SpecTable";
import { StickySectionNav } from "@/components/product/StickySectionNav";
import { CtaBand } from "@/components/sections/CtaBand";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight, Check, Info, MapPin } from "@/components/ui/icons";
import { Breadcrumb, IllustrativeBadge, StatusBadge, Tag } from "@/components/ui/primitives";
import { getI18n, pageMetadata } from "@/i18n/server";
import { getCountryOptions } from "@/lib/countries";
import { createDb, productHref } from "@/lib/data";
import { withFileSize } from "@/lib/document-meta";
import { SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return createDb("en")
    .getProducts()
    .map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/products/[category]/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { t, db } = await getI18n();
  const p = db.getProduct(slug);
  if (!p) return {};
  return pageMetadata({ title: t.product.metaTitle(p.name), description: t.product.metaDesc(p.shortDescription, p.crop), path: productHref(p) });
}

export default async function ProductDetailPage({ params }: PageProps<"/[locale]/products/[category]/[slug]">) {
  const { category: categorySlug, slug } = await params;
  const { t, l, db, date, locale } = await getI18n();
  const pt = t.product;
  const product = db.getProduct(slug);
  if (!product || product.category !== categorySlug) notFound();

  const category = db.getCategory(product.category)!;
  const origins = product.originIds.map((id) => db.getOrigin(id)).filter((o): o is NonNullable<typeof o> => Boolean(o));
  const certs = db.getCertificatesByIds(product.certificateIds);
  const claimable = certs.filter((c) => c.status !== "expired");
  const facility = db.getFacility(product.facilityId);
  const docIds = product.documentIds.includes(`spec-${product.slug}`) ? product.documentIds : [`spec-${product.slug}`, ...product.documentIds];
  const docs = withFileSize(db.getDocumentsByIds(docIds));
  const related = db
    .getProductsByCategory(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);
  const specRows = db.getSpecRows(product);
  const lowerCat = category.shortName.toLowerCase();

  const sections = (Object.keys(pt.sections) as (keyof typeof pt.sections)[]).map((id) => ({ id, label: pt.sections[id] }));

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    category: category.name,
    countryOfOrigin: { "@type": "Country", name: "Vietnam" },
    url: `${SITE_URL}${l(productHref(product))}`,
    inLanguage: locale,
    additionalProperty: specRows.filter((r) => r.value).map((r) => ({ "@type": "PropertyValue", name: r.label, value: r.value })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <ProductViewTracker slug={product.slug} category={product.category} />

      {/* Breadcrumb + product hero (§9.1) */}
      <section className="bg-ivory">
        <div className="container-x pb-12 pt-8 lg:pb-16 lg:pt-10">
          <Breadcrumb
            items={[
              { label: t.common.home, href: l("/") },
              { label: t.nav.products, href: l("/products") },
              { label: category.name, href: l(`/products/${category.slug}`) },
              { label: product.name },
            ]}
          />
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <Media image={product.image} className="aspect-[4/3] rounded-md" preload />
              {product.gallery.length > 0 && (
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {product.gallery.slice(0, 2).map((g) => (
                    <Media key={g.alt} image={g} className="aspect-[3/2] rounded-md" sizes="25vw" />
                  ))}
                </div>
              )}
            </div>
            <div className="lg:col-span-6">
              <p className="t-label text-green-500">{category.name}</p>
              <h1 className="t-h2 mt-3 lg:text-[48px] lg:leading-[54px]">{product.name}</h1>
              <p className="t-lead mt-4 text-muted">{product.shortDescription}</p>

              <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line">
                {[
                  [pt.facts.origin, t.products.cardOrigin(origins.map((o) => o.name).join(" · "))],
                  [pt.facts.crop, product.crop],
                  [pt.facts.processing, product.processing.join(" / ")],
                  [pt.facts.moq, product.moq ?? t.common.onRequest],
                ].map(([k, v]) => (
                  <div key={k} className="bg-white p-4">
                    <dt className="t-label text-muted">{k}</dt>
                    <dd className="mt-1.5 text-[15px] font-semibold leading-[22px]">{v}</dd>
                  </div>
                ))}
              </dl>

              {claimable.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={pt.certsAria}>
                  {claimable.map((c) => (
                    <li key={c.id}>
                      <Tag tone="green">
                        <Check size={13} /> {c.schemeShort}
                        {c.status === "renewal-pending" && <span className="font-normal text-muted">{pt.renewalPending}</span>}
                      </Tag>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={l(`/request-quote?product=${product.slug}`)} icon={<ArrowRight size={18} className="arrow-nudge" />}>
                  {t.common.requestQuote}
                </ButtonLink>
                <SpecDownloadButton slug={product.slug} />
              </div>
              <p className="mt-4 flex items-start gap-2 text-[13px] leading-5 text-muted">
                <Info size={16} className="mt-0.5 shrink-0" />
                {pt.priceNote}
              </p>
            </div>
          </div>
        </div>
      </section>

      <StickySectionNav sections={sections} />

      <div className="bg-ivory">
        <div className="container-x grid gap-12 py-14 lg:grid-cols-12 lg:gap-10 lg:py-16">
          <div className="space-y-16 lg:col-span-8 lg:space-y-20">
            {/* Overview */}
            <section id="overview" className="scroll-mt-36" aria-labelledby="h-overview">
              <h2 id="h-overview" className="t-h3">
                {pt.sections.overview}
              </h2>
              <p className="mt-4 max-w-[68ch] text-[17px] leading-7 text-ink/85">{product.overview}</p>
              {facility && (
                <p className="mt-4 text-[15px] text-muted">
                  {pt.processedAt}{" "}
                  <Link href={l("/capabilities")} className="font-semibold text-forest-700 underline underline-offset-4">
                    {facility.name}
                  </Link>
                  .
                </p>
              )}
            </section>

            {/* Specification */}
            <section id="specification" className="scroll-mt-36" aria-labelledby="h-spec">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <h2 id="h-spec" className="t-h3">
                  {pt.specTitle}
                </h2>
                <a href={`/api/documents/spec-${product.slug}`} className="inline-flex min-h-[44px] items-center text-[14px] font-semibold text-forest-700 underline underline-offset-4">
                  {t.common.downloadPdf}
                </a>
              </div>
              <SpecTable rows={specRows} caption={pt.specCaption(category.name)} verified={product.verified} />
              <p className="mt-4 text-[13.5px] leading-6 text-muted">
                {pt.specNote}{" "}
                <Link href={l(`/request-quote?product=${product.slug}`)} className="font-semibold text-forest-700 underline underline-offset-4">
                  {pt.sendOwnSpec}
                </Link>
                .
              </p>
            </section>

            {/* Origin + seasonality */}
            <section id="origin" className="scroll-mt-36" aria-labelledby="h-origin">
              <h2 id="h-origin" className="t-h3">
                {pt.originTitle}
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {origins.map((o) => (
                  <Link key={o.slug} href={l(`/origins/${o.slug}`)} className="group flex gap-4 rounded-md border border-line bg-white p-4 hover:border-green-500">
                    <Media image={o.image} className="aspect-square w-24 shrink-0 rounded-sm" showLabel={false} sizes="96px" />
                    <div className="min-w-0">
                      <p className="flex items-center gap-1.5 text-[16px] font-bold">
                        <MapPin size={16} className="text-green-500" /> {o.name}
                      </p>
                      <p className="mt-1 text-[13.5px] leading-5 text-muted">
                        {o.altitude} · {o.climate}
                      </p>
                      <span className="mt-2 inline-flex items-center gap-1 text-[13.5px] font-semibold text-forest-700">
                        {pt.originProfile} <ArrowRight size={14} className="arrow-nudge" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-8 rounded-md border border-line bg-white p-5 sm:p-6">
                <p className="mb-4 text-[15px] font-bold">{pt.calendar}</p>
                <SeasonCalendar values={product.seasonality} label={pt.calendarLabel(product.name)} />
              </div>
            </section>

            {/* Packaging */}
            <section id="packaging" className="scroll-mt-36" aria-labelledby="h-pack">
              <h2 id="h-pack" className="t-h3">
                {pt.packTitle}
              </h2>
              <div className="mt-6 overflow-hidden rounded-md border border-line bg-white">
                <table className="w-full text-left text-[14.5px]">
                  <thead className="bg-ivory text-[12px] uppercase tracking-[0.08em] text-muted max-md:sr-only">
                    <tr>
                      <th scope="col" className="px-5 py-3 font-bold">
                        {pt.packHead.format}
                      </th>
                      <th scope="col" className="px-5 py-3 font-bold">
                        {pt.packHead.net}
                      </th>
                      <th scope="col" className="px-5 py-3 font-bold">
                        {pt.packHead.material}
                      </th>
                      <th scope="col" className="px-5 py-3 font-bold">
                        {pt.packHead.loading}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.packings.map((p) => (
                      <tr key={p.id} className="border-t border-line max-md:flex max-md:flex-col max-md:gap-1 max-md:px-5 max-md:py-4">
                        <th scope="row" className="font-bold md:px-5 md:py-4">
                          {p.name}
                          {p.privateLabel && (
                            <Tag tone="gold" className="ml-2 align-middle">
                              {pt.privateLabel}
                            </Tag>
                          )}
                        </th>
                        <td className="md:px-5 md:py-4">
                          <span className="text-muted md:hidden">{pt.packHead.net}: </span>
                          {p.netWeight}
                        </td>
                        <td className="md:px-5 md:py-4">
                          <span className="text-muted md:hidden">{pt.packHead.material}: </span>
                          {p.material}
                        </td>
                        <td className="md:px-5 md:py-4">
                          <span className="text-muted md:hidden">{pt.packHead.loading}: </span>
                          {p.loading ?? t.common.onRequest}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-[13.5px] text-muted">{pt.packNote}</p>
            </section>

            {/* Quality / certification */}
            <section id="quality" className="scroll-mt-36" aria-labelledby="h-quality">
              <h2 id="h-quality" className="t-h3">
                {pt.qualityTitle}
              </h2>
              <ol className="mt-6 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-3">
                {db.ops.qcSteps.map((s, i) => (
                  <li key={s.id} className="bg-white p-4">
                    <span className="font-serif text-[15px] text-green-500">0{i + 1}</span>
                    <p className="mt-1 text-[14.5px] font-bold">{s.title}</p>
                    <p className="mt-1 text-[13px] leading-5 text-muted">{s.summary}</p>
                  </li>
                ))}
              </ol>

              <h3 className="mt-10 text-[18px] font-bold">{pt.certsTitle}</h3>
              {certs.length ? (
                <ul className="mt-4 divide-y divide-line rounded-md border border-line bg-white">
                  {certs.map((c) => (
                    <li key={c.id} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-[15px] font-bold">{c.scheme}</p>
                        <p className="text-[13.5px] text-muted">
                          {c.entity} · {pt.validTo(date(c.expires))}
                        </p>
                        {c.status === "expired" && <p className="mt-1 text-[13px] text-error">{pt.notClaimed}</p>}
                      </div>
                      <StatusBadge status={c.status} />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-[15px] text-muted">{pt.noCerts}</p>
              )}
              <p className="mt-4 text-[14px]">
                <Link href={l("/quality#certificates")} className="font-semibold text-forest-700 underline underline-offset-4">
                  {pt.certCenter}
                </Link>{" "}
                <span className="text-muted">{pt.certCenterNote}</span>
              </p>
            </section>

            {/* Logistics */}
            <section id="logistics" className="scroll-mt-36" aria-labelledby="h-log">
              <h2 id="h-log" className="t-h3">
                {pt.logisticsTitle}
              </h2>
              <dl className="mt-6 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2">
                <div className="bg-white p-5">
                  <dt className="t-label text-muted">{pt.loadingPorts}</dt>
                  <dd className="mt-2 text-[15px] font-semibold">{product.loadingPorts.join(" · ")}</dd>
                </div>
                <div className="bg-white p-5">
                  <dt className="t-label text-muted">{pt.incoterms}</dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {product.incoterms.map((term) => (
                      <Tag key={term}>{term}</Tag>
                    ))}
                  </dd>
                </div>
                <div className="bg-white p-5">
                  <dt className="t-label text-muted">{pt.containerLoading}</dt>
                  <dd className="mt-2 text-[15px] font-semibold">{product.packings.find((p) => p.loading)?.loading ?? t.common.onRequest}</dd>
                </div>
                <div className="bg-white p-5">
                  <dt className="t-label text-muted">{pt.leadTime}</dt>
                  <dd className="mt-2 text-[15px]">{db.ops.leadTimes.published ? "" : db.ops.leadTimes.note}</dd>
                </div>
              </dl>
              <h3 className="mt-8 text-[16px] font-bold">{pt.exportDocs}</h3>
              <ul className="mt-3 grid gap-x-8 gap-y-2 text-[14.5px] sm:grid-cols-2">
                {db.ops.exportDocuments.map((d) => (
                  <li key={d.name} className="flex gap-2">
                    <Check size={16} className="mt-1 shrink-0 text-green-500" />
                    <span>
                      {d.name}
                      {d.rule !== "always" && <span className="text-muted"> — {pt.docRule[d.rule]}</span>}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[13.5px] text-muted">
                {pt.docsNote}{" "}
                <Link href={l("/logistics")} className="font-semibold text-forest-700 underline underline-offset-4">
                  {pt.docsLink}
                </Link>
                .
              </p>
            </section>

            {/* Downloads */}
            <section id="downloads" className="scroll-mt-36" aria-labelledby="h-dl">
              <h2 id="h-dl" className="t-h3">
                {pt.downloadsTitle}
              </h2>
              <ul className="mt-4 rounded-md border border-line bg-white px-5">
                {docs.map((d) => (
                  <DownloadRow key={d.id} doc={d} />
                ))}
              </ul>
              <p className="mt-3 text-[13px] text-muted">
                {pt.moreDocs}{" "}
                <Link href={l("/downloads")} className="font-semibold text-forest-700 underline underline-offset-4">
                  {t.nav.downloads}
                </Link>
                .
              </p>
            </section>
          </div>

          {/* Sticky RFQ card (desktop) */}
          <aside className="hidden lg:col-span-4 lg:block" aria-label={pt.rfqAria}>
            <div className="sticky top-[140px] space-y-4">
              <ProductRfqCard slug={product.slug} name={product.name} moq={product.moq} countries={getCountryOptions(locale)} />
              <div className="flex items-center justify-between gap-3 rounded-md border border-line bg-white px-5 py-4 text-[13px]">
                <span className="text-muted">{pt.dataStatus}</span>
                <IllustrativeBadge verified={product.verified} label={pt.dataPending} />
              </div>
            </div>
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-line bg-ivory py-16 lg:py-20" aria-labelledby="related-title">
          <div className="container-x">
            <h2 id="related-title" className="t-h3 mb-8">
              {pt.related(lowerCat)}
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} condensed />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title={pt.ctaTitle(product.name)}
        body={pt.ctaBody}
        primary={{ label: t.common.requestQuote, href: l(`/request-quote?product=${product.slug}`) }}
        secondary={{ label: pt.askQuestion, href: l("/contact?topic=sourcing") }}
      />
      <ProductMobileBar slug={product.slug} />
    </>
  );
}
