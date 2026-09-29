import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Info } from "@/components/ui/icons";
import { getI18n, pageMetadata } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return pageMetadata({ title: t.privacy.metaTitle, path: "/privacy", noindex: true });
}

/** Draft privacy notice — must be reviewed by legal for target markets before launch (§24 Legal/privacy). */
export default async function PrivacyPage() {
  const { t, l, db } = await getI18n();
  const p = t.privacy;
  const company = db.company;
  return (
    <>
      <PageHero breadcrumb={[{ label: t.common.home, href: l("/") }, { label: p.title }]} title={p.title} intro={p.intro} />
      <section className="bg-ivory pb-24">
        <div className="container-x">
          <div className="mb-10 flex max-w-[70ch] items-start gap-3 rounded-md border border-gold-500/50 bg-gold-500/10 p-5 text-[15px] leading-6">
            <Info size={20} className="mt-0.5 shrink-0" />
            <p>
              <strong>{p.draftBold}</strong> {p.draftText}
            </p>
          </div>
          <div className="prose-body max-w-[70ch] text-[17px] leading-[30px]">
            <h2>{p.whoTitle}</h2>
            <p>
              {company.legalName} (“{company.brand}”), {company.headquarters}. {company.salesEmail}
            </p>
            <h2>{p.collectTitle}</h2>
            <ul>
              {p.collect.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <h2>{p.whyTitle}</h2>
            <p>{p.why}</p>
            <h2>{p.shareTitle}</h2>
            <p>{p.share}</p>
            <h2>{p.keepTitle}</h2>
            <p>{p.keep}</p>
            <h2>{p.rightsTitle}</h2>
            <p>{p.rights(company.salesEmail)}</p>
          </div>
        </div>
      </section>
    </>
  );
}
