import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Alert, Container, Globe, MapPin } from "@/components/ui/icons";
import { SectionHeader, Tag } from "@/components/ui/primitives";
import { getI18n, pageMetadata } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return pageMetadata({ title: t.logistics.metaTitle, description: t.logistics.metaDesc, path: "/logistics" });
}

const RULE_TONE = { always: "green", product: "gold", market: "gold", request: "neutral" } as const;
const JOURNEY_ICONS = [<MapPin key="o" size={22} />, <Container key="f" size={22} />, <Container key="p" size={22} />, <Globe key="d" size={22} />];

export default async function LogisticsPage() {
  const { t, l, db } = await getI18n();
  const g = t.logistics;
  const ops = db.ops;
  const cl = t.capabilities.loadingHead;
  return (
    <>
      <PageHero
        breadcrumb={[{ label: t.common.home, href: l("/") }, { label: t.nav.capabilities, href: l("/capabilities") }, { label: t.nav.logistics }]}
        kicker={g.kicker}
        title={g.title}
        intro={g.intro}
      />

      {/* Shipment journey */}
      <section className="on-dark bg-forest-900 text-white" aria-labelledby="journey-title">
        <div className="container-x py-16 lg:py-20">
          <h2 id="journey-title" className="t-label mb-8 text-gold-500">
            {g.journey}
          </h2>
          <ol className="grid gap-6 md:grid-cols-4" data-reveal>
            {g.journeySteps.map(([title, body], i, arr) => (
              <li key={title} className="relative flex items-start gap-4 md:flex-col">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold-500 text-gold-500">{JOURNEY_ICONS[i]}</span>
                {i < arr.length - 1 && <span aria-hidden className="chain-progress absolute left-12 right-0 top-6 hidden h-px bg-gold-500/60 md:block" />}
                <div>
                  <p className="text-[18px] font-bold">{title}</p>
                  <p className="mt-1 text-[14.5px] text-white/70">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Shipping modes */}
      <section className="section-y bg-ivory" aria-labelledby="modes-title">
        <div className="container-x">
          <SectionHeader id="modes-title" kicker={g.modesKicker} title={g.modesTitle} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ops.shippingModes.map((m) => (
              <div key={m.mode} className="rounded-md border border-line bg-white p-6">
                <p className="font-serif text-[36px] leading-none text-forest-700">{m.mode}</p>
                <p className="mt-3 text-[16px] font-bold">{m.title}</p>
                <p className="mt-2 text-[14.5px] leading-6 text-muted">{m.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 overflow-hidden rounded-md border border-line bg-white">
            <table className="w-full text-left text-[15px]">
              <caption className="border-b border-line bg-ivory px-5 py-3 text-left">
                <span className="t-label text-muted">{g.loadingCaption}</span>
              </caption>
              <thead className="text-[12px] uppercase tracking-[0.08em] text-muted max-md:sr-only">
                <tr>
                  <th scope="col" className="px-5 py-3">
                    {cl.product}
                  </th>
                  <th scope="col" className="px-5 py-3">
                    {cl.c20}
                  </th>
                  <th scope="col" className="px-5 py-3">
                    {cl.c40}
                  </th>
                  <th scope="col" className="px-5 py-3">
                    {cl.note}
                  </th>
                </tr>
              </thead>
              <tbody>
                {ops.containerLoading.map((c) => (
                  <tr key={c.product} className="border-t border-line max-md:flex max-md:flex-col max-md:gap-0.5 max-md:px-5 max-md:py-4">
                    <th scope="row" className="font-bold md:px-5 md:py-4">
                      {c.product}
                    </th>
                    <td className="md:px-5 md:py-4">
                      <span className="text-muted md:hidden">20 ft: </span>
                      {c.c20}
                    </td>
                    <td className="md:px-5 md:py-4">
                      <span className="text-muted md:hidden">40 ft: </span>
                      {c.c40}
                    </td>
                    <td className="text-muted md:px-5 md:py-4">{c.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Ports + incoterms */}
      <section className="section-y bg-sand" aria-labelledby="ports-title">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader id="ports-title" kicker={g.portsKicker} title={g.portsTitle} />
            <ul className="space-y-4">
              {ops.ports.map((p) => (
                <li key={p.code} className="rounded-md border border-line bg-white p-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="text-[18px] font-bold">{p.name}</p>
                    <span className="font-mono text-[13px] text-muted">{p.code}</span>
                  </div>
                  <p className="text-[14px] text-muted">{p.city}</p>
                  <p className="mt-2 text-[15px]">{p.use}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeader kicker={g.incKicker} title={g.incTitle} />
            <ul className="space-y-4">
              {ops.incoterms.map((term) => (
                <li key={term.code} className="flex gap-5 rounded-md border border-line bg-white p-5">
                  <span className="font-serif text-[30px] leading-none text-forest-700">{term.code}</span>
                  <div>
                    <p className="text-[16px] font-bold">{term.name}</p>
                    <p className="mt-1 text-[14.5px] leading-6 text-muted">{term.body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[13.5px] text-muted">{g.incNote}</p>
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="section-y bg-ivory" aria-labelledby="docs-title">
        <div className="container-x">
          <SectionHeader id="docs-title" kicker={g.docsKicker} title={g.docsTitle} intro={g.docsIntro} />
          <div className="overflow-hidden rounded-md border border-line bg-white">
            <ul className="divide-y divide-line">
              {ops.exportDocuments.map((d) => (
                <li key={d.name} className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[16px] font-bold">{d.name}</p>
                    <p className="text-[14px] text-muted">{d.note}</p>
                  </div>
                  <Tag tone={RULE_TONE[d.rule]} className="self-start sm:self-center">
                    {g.rules[d.rule]}
                  </Tag>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 flex items-start gap-3 rounded-md border border-gold-500/50 bg-gold-500/10 p-5 text-[14.5px] leading-6">
            <Alert size={20} className="mt-0.5 shrink-0 text-forest-900" />
            <p>
              <strong>{g.importantBold}</strong> {g.importantText}
            </p>
          </div>
          <div className="mt-6 rounded-md border border-line bg-white p-5">
            <p className="text-[16px] font-bold">{g.leadTime}</p>
            <p className="mt-1 text-[15px] text-muted">{ops.leadTimes.note}</p>
          </div>
        </div>
      </section>

      <CtaBand body={g.ctaBody} />
    </>
  );
}
