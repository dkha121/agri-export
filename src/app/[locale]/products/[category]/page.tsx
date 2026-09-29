import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { InsightCard } from "@/components/insights/InsightCard";
import { Media } from "@/components/media/Media";
import { BuyerResourceCta } from "@/components/product/BuyerResourceCta";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductExplorer } from "@/components/product/ProductExplorer";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";
import { Breadcrumb, Kicker } from "@/components/ui/primitives";
import { getI18n, pageMetadata } from "@/i18n/server";
import { createDb } from "@/lib/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return createDb("en")
    .getCategories()
    .map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/products/[category]">): Promise<Metadata> {
  const { category } = await params;
  const { t, db } = await getI18n();
  const c = db.getCategory(category);
  if (!c) return {};
  return pageMetadata({ title: t.category.metaTitle(c.name), description: c.intro, path: `/products/${c.slug}` });
}

export default async function CategoryPage({ params }: PageProps<"/[locale]/products/[category]">) {
  const { category: slug } = await params;
  const { t, l, db } = await getI18n();
  const category = db.getCategory(slug);
  if (!category) notFound();

  const products = db.getProductsByCategory(category.key);
  const cards = Object.fromEntries(products.map((p) => [p.slug, <ProductCard key={p.slug} product={p} headingLevel="h2" />]));
  const originList = [...new Set(products.flatMap((p) => p.originIds))].map((id) => db.getOrigin(id)).filter((o): o is NonNullable<typeof o> => Boolean(o));
  const related = db
    .getInsights()
    .filter((i) => i.relatedProducts.some((s) => products.some((p) => p.slug === s)))
    .slice(0, 2);
  const lower = category.shortName.toLowerCase();

  return (
    <>
      <section className="bg-ivory">
        <div className="container-x pb-14 pt-8 lg:pb-20 lg:pt-12">
          <Breadcrumb items={[{ label: t.common.home, href: l("/") }, { label: t.nav.products, href: l("/products") }, { label: category.name }]} />
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-6">
              <Kicker className="mb-5">{t.category.kicker(products.length)}</Kicker>
              <h1 className="t-h1">{category.name}</h1>
              <p className="t-lead mt-6 text-muted">{category.intro}</p>
              <dl className="mt-8 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-3">
                {category.buyingNotes.map((n) => (
                  <div key={n.label} className="bg-white p-4">
                    <dt className="t-label text-muted">{n.label}</dt>
                    <dd className="mt-1.5 text-[15px] font-semibold leading-6">{n.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-[14px] text-muted">
                {t.category.origins}{" "}
                {originList.map((o, i) => (
                  <span key={o.slug}>
                    {i > 0 && " · "}
                    <Link href={l(`/origins/${o.slug}`)} className="font-semibold text-forest-700 underline underline-offset-4">
                      {o.name}
                    </Link>
                  </span>
                ))}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={l(`/request-quote?category=${category.key}`)} icon={<ArrowRight size={18} className="arrow-nudge" />}>
                  {t.common.requestAQuote}
                </ButtonLink>
                <ButtonLink href="#products" variant="secondary">
                  {t.category.viewProducts}
                </ButtonLink>
              </div>
            </div>
            <div className="lg:col-span-6">
              <Media image={category.image} className="aspect-[4/3] rounded-md" preload />
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="scroll-mt-24 bg-ivory pb-20 lg:pb-28">
        <div className="container-x">
          <h2 className="t-h3 mb-8">{t.category.allOf(lower)}</h2>
          <Suspense fallback={<div className="min-h-[500px]" />}>
            <ProductExplorer products={products} groups={db.getProductFacets(products, t.products.filterGroups)} cards={cards} hiddenGroups={["category"]} />
          </Suspense>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-line bg-ivory py-16 lg:py-20" aria-labelledby="guides-title">
          <div className="container-x">
            <h2 id="guides-title" className="t-h3 mb-8">
              {t.category.guides(lower)}
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {related.map((i) => (
                <InsightCard key={i.slug} insight={i} />
              ))}
            </div>
          </div>
        </section>
      )}
      <BuyerResourceCta />
    </>
  );
}
