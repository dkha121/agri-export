import type { Metadata } from "next";
import Link from "next/link";
import { Media } from "@/components/media/Media";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessFlow } from "@/components/sections/ProcessFlow";
import { TextLink } from "@/components/ui/Button";
import { Download } from "@/components/ui/icons";
import { Kicker, SectionHeader } from "@/components/ui/primitives";
import { getI18n, pageMetadata } from "@/i18n/server";
import { docHref } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return pageMetadata({ title: t.supply.metaTitle, description: t.supply.metaDesc, path: "/supply-chain" });
}

export default async function SupplyChainPage() {
  const { t, l, db } = await getI18n();
  const s = t.supply;
  return (
    <>
      <PageHero
        breadcrumb={[{ label: t.common.home, href: l("/") }, { label: t.nav.supplyChain }]}
        kicker={s.kicker}
        title={s.title}
        intro={s.intro}
        image={{ kind: "logistics", alt: s.heroAlt, caption: s.heroCaption }}
      />

      <section className="on-dark section-y bg-forest-900 text-white" aria-labelledby="flow-title">
        <div className="container-x">
          <SectionHeader id="flow-title" onDark kicker={s.flowKicker} title={s.flowTitle} />
          <ProcessFlow steps={db.ops.supplyChainSteps} onDark detailed />
        </div>
      </section>

      {/* Traceability methodology */}
      <section id="traceability" className="section-y scroll-mt-24 bg-ivory" aria-labelledby="trace-title">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Kicker className="mb-4">{s.traceKicker}</Kicker>
            <h2 id="trace-title" className="t-h2">
              {s.traceTitle}
            </h2>
            <p className="t-lead mt-5 text-muted">{s.traceLead}</p>
            <a href={docHref("traceability-methodology")} className="mt-8 inline-flex min-h-[44px] items-center gap-2 font-semibold text-forest-700 underline underline-offset-4">
              <Download size={18} /> {s.tracePdf}
            </a>
          </div>
          <div className="lg:col-span-7">
            <ol className="relative space-y-4 border-l border-line pl-8">
              {s.chain.map(([title, body], i) => (
                <li key={title} className="relative rounded-md border border-line bg-white p-5" data-reveal>
                  <span className="absolute -left-[45px] top-5 flex h-7 w-7 items-center justify-center rounded-full border border-green-500 bg-ivory text-[12px] font-bold text-forest-700">
                    {i + 1}
                  </span>
                  <p className="text-[16px] font-bold">{title}</p>
                  <p className="mt-1 text-[15px] leading-6 text-muted">{body}</p>
                </li>
              ))}
            </ol>
            <div className="mt-6 rounded-md bg-sand p-5 text-[14.5px] leading-6">
              <strong>{s.lookupBold}</strong> {s.lookupText}{" "}
              <Link href={l("/contact?topic=documents")} className="font-semibold text-forest-700 underline underline-offset-4">
                {s.lookupLink}
              </Link>{" "}
              {s.lookupEnd}
            </div>
          </div>
        </div>
      </section>

      <section className="section-y bg-sand" aria-labelledby="control-title">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
          <Media image={{ src: "/images/cashew/sack.jpg", kind: "human", alt: s.imageAlt, caption: s.imageCaption }} className="aspect-[4/3] rounded-md lg:col-span-6" />
          <div className="lg:col-span-6">
            <Kicker className="mb-4">{s.whyKicker}</Kicker>
            <h2 id="control-title" className="t-h2">
              {s.whyTitle}
            </h2>
            <ul className="mt-6 space-y-4 text-[16px] leading-7">
              {s.why.map(([b, text]) => (
                <li key={b}>
                  <strong>{b}</strong> {text}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <TextLink href={l("/logistics")}>{s.logisticsLink}</TextLink>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
