import type { Metadata } from "next";
import { Suspense } from "react";
import { RFQWizard } from "@/components/rfq/RFQWizard";
import { Breadcrumb, Kicker } from "@/components/ui/primitives";
import { company } from "@/content/company";
import { getI18n, pageMetadata } from "@/i18n/server";
import { getCountryOptions } from "@/lib/countries";
import { createDb } from "@/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return pageMetadata({ title: t.rfq.metaTitle, description: t.rfq.metaDesc, path: "/request-quote" });
}

export default async function RequestQuotePage() {
  const { t, l, db, locale } = await getI18n();
  const en = createDb("en");
  const products = db.getProducts().map((p) => ({
    slug: p.slug,
    name: p.name,
    nameEn: en.getProduct(p.slug)?.name ?? p.name,
    category: p.category,
    grades: p.rfqGrades ?? db.getCategory(p.category)?.rfqGrades ?? [],
    packings: p.packings.map((k) => `${k.name} · ${k.netWeight}`),
  }));
  const categories = db.getCategories().map((c) => ({ key: c.key, name: c.name }));

  return (
    <section className="bg-ivory">
      <div className="container-x pb-20 pt-8 lg:pb-28 lg:pt-12">
        <Breadcrumb items={[{ label: t.common.home, href: l("/") }, { label: t.rfq.metaTitle }]} />
        <div className="mb-10 max-w-[760px] lg:mb-14">
          <Kicker className="mb-4">{t.rfq.kicker}</Kicker>
          <h1 className="t-h1">{t.rfq.title}</h1>
          <p className="t-lead mt-5 text-muted">{t.rfq.intro}</p>
        </div>
        <Suspense fallback={<div className="min-h-[640px]" aria-busy="true" />}>
          <RFQWizard products={products} categories={categories} countries={getCountryOptions(locale)} brand={company.brand} responseSla={db.company.responseSla} />
        </Suspense>
      </div>
    </section>
  );
}
