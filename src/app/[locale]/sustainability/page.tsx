import type { Metadata } from "next";
import Link from "next/link";
import { DownloadRow } from "@/components/docs/DownloadRow";
import { Media } from "@/components/media/Media";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Check, Info } from "@/components/ui/icons";
import { IllustrativeBadge, Kicker, SectionHeader } from "@/components/ui/primitives";
import { getI18n, pageMetadata } from "@/i18n/server";
import { withFileSize } from "@/lib/document-meta";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return pageMetadata({ title: t.sustainability.metaTitle, description: t.sustainability.metaDesc, path: "/sustainability" });
}

export default async function SustainabilityPage() {
  const { t, l, db } = await getI18n();
  const s = t.sustainability;
  const docs = withFileSize(db.getDocumentsByIds(["responsible-sourcing-policy", "traceability-methodology", "eudr-information-pack"]));
  return (
    <>
      <PageHero
        breadcrumb={[{ label: t.common.home, href: l("/") }, { label: t.nav.sustainability }]}
        kicker={s.kicker}
        title={s.title}
        intro={s.intro}
        image={{ src: "/images/coffee/cherries-cluster.jpg", kind: "origin", alt: s.heroAlt, caption: s.heroCaption, focal: "50% 45%" }}
      />

      <section className="section-y bg-ivory" aria-labelledby="metrics-title">
        <div className="container-x">
          <SectionHeader id="metrics-title" kicker={s.metricsKicker} title={s.metricsTitle} />
          <div className="grid gap-5 md:grid-cols-2">
            {db.sustainabilityMetrics.map((m) => (
              <article
                key={m.id}
                className="grid gap-6 rounded-md border border-line bg-white p-6 sm:grid-cols-[160px_minmax(0,1fr)] md:grid-cols-1 lg:grid-cols-[160px_minmax(0,1fr)] lg:p-8"
                data-reveal
              >
                <div>
                  <p className="font-serif text-[56px] leading-none text-forest-700">{m.value}</p>
                  <IllustrativeBadge verified={m.verified} className="mt-3" />
                </div>
                <div>
                  <h3 className="text-[18px] font-bold leading-6">{m.label}</h3>
                  <dl className="mt-4 space-y-2 text-[14px] leading-5">
                    <div className="flex gap-2">
                      <dt className="w-24 shrink-0 text-muted">{s.period}</dt>
                      <dd className="font-semibold">{m.period}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="w-24 shrink-0 text-muted">{s.scope}</dt>
                      <dd className="font-semibold">{m.scope}</dd>
                    </div>
                    {m.baseline && (
                      <div className="flex gap-2">
                        <dt className="w-24 shrink-0 text-muted">{s.baseline}</dt>
                        <dd className="font-semibold">{m.baseline}</dd>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <dt className="w-24 shrink-0 text-muted">{s.method}</dt>
                      <dd>{m.definition}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-sand" aria-labelledby="prog-title">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <Media image={{ src: "/images/pepper/vine.jpg", kind: "human", alt: s.progImageAlt, caption: s.progImageCaption, focal: "50% 40%" }} className="aspect-[4/3] rounded-md lg:col-span-6" />
          <div className="lg:col-span-6">
            <Kicker className="mb-4">{s.progKicker}</Kicker>
            <h2 id="prog-title" className="t-h2">
              {s.progTitle}
            </h2>
            <p className="t-lead mt-5 text-muted">{s.progLead}</p>
            <ul className="mt-6 space-y-3 text-[16px]">
              {s.progPoints.map((p) => (
                <li key={p} className="flex gap-3">
                  <Check size={20} className="mt-0.5 shrink-0 text-green-500" /> {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-y bg-ivory" aria-labelledby="eudr-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Kicker className="mb-4">{s.eudrKicker}</Kicker>
            <h2 id="eudr-title" className="t-h2">
              {s.eudrTitle}
            </h2>
            <p className="t-lead mt-5 text-muted">{s.eudrLead}</p>
            <p className="mt-5 text-[15px]">
              <Link href={l("/insights/eudr-timeline-update-coffee-buyers")} className="font-semibold text-forest-700 underline underline-offset-4">
                {s.eudrLink}
              </Link>
            </p>
          </div>
          <div className="lg:col-span-6">
            <div className="rounded-md border border-line bg-white px-5 py-2">
              <ul>
                {docs.map((d) => (
                  <DownloadRow key={d.id} doc={d} />
                ))}
              </ul>
            </div>
            <p className="mt-4 flex items-start gap-2 text-[13.5px] text-muted">
              <Info size={16} className="mt-0.5 shrink-0" /> {s.avoidNote}
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title={s.ctaTitle}
        body={s.ctaBody}
        primary={{ label: s.ctaContact, href: l("/contact?topic=documents") }}
        secondary={{ label: s.ctaRfq, href: l("/request-quote") }}
      />
    </>
  );
}
