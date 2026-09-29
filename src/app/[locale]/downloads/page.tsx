import type { Metadata } from "next";
import Link from "next/link";
import { DocumentLibrary } from "@/components/docs/DocumentLibrary";
import { PageHero } from "@/components/sections/PageHero";
import { buttonClass } from "@/components/ui/Button";
import { Check, Info, Lock } from "@/components/ui/icons";
import { Kicker } from "@/components/ui/primitives";
import { getI18n, pageMetadata } from "@/i18n/server";
import { withFileSize } from "@/lib/document-meta";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return pageMetadata({ title: t.downloads.metaTitle, description: t.downloads.metaDesc, path: "/downloads" });
}

type PackStatus = "available" | "request" | "conditional";
const STATUS_CLS: Record<PackStatus, string> = {
  available: "bg-white text-success ring-1 ring-inset ring-success/40",
  request: "bg-sand text-ink",
  conditional: "bg-gold-500/20 text-forest-900",
};

/** §17.1 EU buyer pack — status + target per row (labels come from the dictionary). */
const EU_META: { status: PackStatus; href?: string }[] = [
  { status: "available", href: "#library" },
  { status: "available", href: "/quality#certificates" },
  { status: "available", href: "/api/documents/traceability-methodology" },
  { status: "available", href: "/api/documents/coa-sample-coffee" },
  { status: "conditional" },
  { status: "request", href: "/contact?topic=eudr" },
];
/** §17.2 USA buyer pack */
const US_META: { status: PackStatus; href?: string }[] = [
  { status: "available", href: "/api/documents/company-profile" },
  { status: "available", href: "#library" },
  { status: "request", href: "/contact?topic=fsvp" },
  { status: "available", href: "/quality#certificates" },
  { status: "conditional", href: "https://direct.aphis.usda.gov/plant-imports/how-to-import" },
];

function Pack({
  title,
  subtitle,
  rows,
  cta,
  statusLabels,
  newTab,
}: {
  title: string;
  subtitle: string;
  rows: { module: string; doc: string; status: PackStatus; href?: string }[];
  cta: { label: string; href: string };
  statusLabels: Record<PackStatus, string>;
  newTab: string;
}) {
  return (
    <div className="flex flex-col rounded-md border border-line bg-white">
      <div className="border-b border-line p-6">
        <h3 className="t-h3">{title}</h3>
        <p className="mt-2 text-[15px] text-muted">{subtitle}</p>
      </div>
      <ul className="flex-1 divide-y divide-line">
        {rows.map((r) => {
          const external = r.href?.startsWith("http");
          const inner = (
            <>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-bold">{r.module}</span>
                <span className="block text-[13.5px] leading-5 text-muted">{r.doc}</span>
              </span>
              <span className={cn("shrink-0 rounded-full px-2.5 py-1 text-[11.5px] font-bold", STATUS_CLS[r.status])}>{statusLabels[r.status]}</span>
            </>
          );
          return (
            <li key={r.module}>
              {r.href ? (
                <a href={r.href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="flex min-h-[64px] items-center gap-4 px-6 py-4 hover:bg-ivory">
                  {inner}
                  {external && <span className="sr-only">{newTab}</span>}
                </a>
              ) : (
                <div className="flex min-h-[64px] items-center gap-4 px-6 py-4">{inner}</div>
              )}
            </li>
          );
        })}
      </ul>
      <div className="border-t border-line p-6">
        <Link href={cta.href} className={buttonClass("primary", "md", "w-full")}>
          <Lock size={18} /> {cta.label}
        </Link>
      </div>
    </div>
  );
}

export default async function DownloadsPage() {
  const { t, l, db } = await getI18n();
  const d = t.downloads;
  const docs = withFileSize(db.getDocuments());
  const categoryOfProduct = Object.fromEntries(db.getProducts().map((p) => [p.slug, p.category]));
  const categories = db.getCategories().map((c) => ({ key: c.key, name: c.name }));
  const localHref = (h?: string) => (h && h.startsWith("/") && !h.startsWith("/api/") ? l(h) : h);
  const rows = (labels: string[][], meta: { status: PackStatus; href?: string }[]) =>
    labels.map(([module, doc], i) => ({ module, doc, status: meta[i].status, href: localHref(meta[i].href) }));

  return (
    <>
      <PageHero breadcrumb={[{ label: t.common.home, href: l("/") }, { label: d.breadcrumb }]} kicker={d.kicker} title={d.title} intro={d.intro} />

      {/* Buyer packs (§17) */}
      <section className="bg-ivory pb-16 lg:pb-24" aria-labelledby="packs-title">
        <div className="container-x">
          <div className="mb-8 max-w-[760px]">
            <Kicker className="mb-4">{d.packsKicker}</Kicker>
            <h2 id="packs-title" className="t-h2">
              {d.packsTitle}
            </h2>
            <p className="t-lead mt-4 text-muted">{d.packsLead}</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <Pack
              title={d.eu.title}
              subtitle={d.eu.subtitle}
              rows={rows(d.eu.rows, EU_META)}
              cta={{ label: d.eu.cta, href: l("/contact?topic=eudr") }}
              statusLabels={d.packStatus}
              newTab={t.common.opensNewTab}
            />
            <Pack
              title={d.us.title}
              subtitle={d.us.subtitle}
              rows={rows(d.us.rows, US_META)}
              cta={{ label: d.us.cta, href: l("/contact?topic=fsvp") }}
              statusLabels={d.packStatus}
              newTab={t.common.opensNewTab}
            />
          </div>
          <p className="mt-5 flex items-start gap-2 text-[13.5px] text-muted">
            <Info size={16} className="mt-0.5 shrink-0" />
            {d.packNote}
          </p>
        </div>
      </section>

      {/* Library */}
      <section id="library" className="scroll-mt-24 border-t border-line bg-ivory py-16 lg:py-24" aria-labelledby="lib-title">
        <div className="container-x">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 id="lib-title" className="t-h2">
              {d.library}
            </h2>
            <ul className="flex flex-wrap gap-x-5 gap-y-1 text-[13.5px] text-muted">
              <li className="flex items-center gap-1.5">
                <Check size={15} className="text-green-500" /> {d.libPdf}
              </li>
              <li className="flex items-center gap-1.5">
                <Lock size={15} className="text-green-500" /> {d.libRequest}
              </li>
            </ul>
          </div>
          <DocumentLibrary docs={docs} categoryOfProduct={categoryOfProduct} categories={categories} />
        </div>
      </section>
    </>
  );
}
