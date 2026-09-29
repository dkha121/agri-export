import type { Metadata } from "next";
import { Suspense } from "react";
import { BuyerResourceCta } from "@/components/product/BuyerResourceCta";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductExplorer } from "@/components/product/ProductExplorer";
import { PageHero } from "@/components/sections/PageHero";
import { getI18n, pageMetadata } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return pageMetadata({ title: t.products.metaTitle, description: t.products.metaDesc, path: "/products" });
}

export default async function ProductsPage() {
  const { t, l, db } = await getI18n();
  const products = db.getProducts();
  const cards = Object.fromEntries(products.map((p) => [p.slug, <ProductCard key={p.slug} product={p} headingLevel="h2" />]));
  return (
    <>
      <PageHero
        breadcrumb={[{ label: t.common.home, href: l("/") }, { label: t.nav.products }]}
        kicker={t.products.kicker}
        title={t.products.title}
        intro={t.products.intro}
      />
      <section className="bg-ivory pb-20 lg:pb-28">
        <div className="container-x">
          <Suspense fallback={<div className="min-h-[600px]" aria-busy="true" />}>
            <ProductExplorer products={products} groups={db.getProductFacets(products, t.products.filterGroups)} cards={cards} />
          </Suspense>
        </div>
      </section>
      <BuyerResourceCta />
    </>
  );
}
