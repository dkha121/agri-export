import type { Metadata } from "next";
import Link from "next/link";
import { Media } from "@/components/media/Media";
import { CertificationCard } from "@/components/quality/CertificationCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessFlow } from "@/components/sections/ProcessFlow";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { Check, MapPin } from "@/components/ui/icons";
import { IllustrativeBadge, Kicker, MetricBlock, SectionHeader } from "@/components/ui/primitives";
import { Tabs } from "@/components/ui/Tabs";
import { getI18n, pageMetadata } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return pageMetadata({ title: t.capabilities.metaTitle, description: t.capabilities.metaDesc, path: "/capabilities" });
}

export default async function CapabilitiesPage() {
  const { t, l, db } = await getI18n();
  const c = t.capabilities;
  const facilities = db.getFacilities();

  return (
    <>
      <PageHero
        breadcrumb={[{ label: t.common.home, href: l("/") }, { label: t.nav.capabilities }]}
        kicker={c.kicker}
        title={c.title}
        intro={c.intro}
        image={{ kind: "factory", alt: c.heroAlt, caption: c.heroCaption }}
        actions={
          <>
            <ButtonLink href="#facilities">{c.explore}</ButtonLink>
            <ButtonLink href={l("/contact?topic=visit")} variant="secondary">
              {c.visit}
            </ButtonLink>
          </>
        }
      />

      {/* Verified metrics — group level */}
      <section className="on-dark bg-forest-900 text-white" aria-labelledby="metrics-title">
        <div className="container-x py-16 lg:py-20">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <h2 id="metrics-title" className="t-h3 text-white">
              {c.capacityTitle}
            </h2>
            <IllustrativeBadge onDark label={c.pendingMetrics} />
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {facilities.map((f) => {
              const cap = f.metrics.find((m) => m.id === "capacity")!;
              return (
                <div key={f.id} className="border-t border-white/15 pt-6">
                  <p className="t-label text-gold-500">{f.shortName}</p>
                  <MetricBlock metric={cap} onDark showDefinition className="mt-4" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Facility tour with facility filter */}
      <section id="facilities" className="section-y scroll-mt-24 bg-ivory" aria-labelledby="fac-title">
        <div className="container-x">
          <SectionHeader id="fac-title" kicker={c.tourKicker} title={c.tourTitle} intro={c.tourIntro} />
          <Tabs
            label={c.facilitiesLabel}
            items={facilities.map((f) => ({
              id: f.id,
              label: f.shortName,
              content: (
                <div className="space-y-12">
                  <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                    <div className="lg:col-span-7">
                      <Media image={f.image} className="aspect-[16/10] rounded-md" />
                      <div className="mt-3 grid grid-cols-2 gap-3">
                        {f.gallery.map((g) => (
                          <Media key={g.alt} image={g} className="aspect-[3/2] rounded-md" sizes="30vw" />
                        ))}
                      </div>
                    </div>
                    <div className="lg:col-span-5">
                      <p className="t-label text-green-500">{f.type}</p>
                      <h3 className="t-h3 mt-2">{f.name}</h3>
                      <p className="mt-3 flex items-start gap-2 text-[15px] text-muted">
                        <MapPin size={18} className="mt-1 shrink-0 text-green-500" />
                        <span>
                          {f.address}
                          {f.portDistance && <span className="block">{f.portDistance}</span>}
                        </span>
                      </p>
                      <p className="mt-3 text-[15px]">
                        {c.productsLabel}{" "}
                        {f.products.map((k, i) => (
                          <span key={k}>
                            {i > 0 && ", "}
                            <Link href={l(`/products/${k}`)} className="font-semibold text-forest-700 underline underline-offset-4">
                              {db.getCategory(k)?.shortName}
                            </Link>
                          </span>
                        ))}
                      </p>
                      <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-6">
                        {f.metrics.map((m) => (
                          <MetricBlock key={m.id} metric={m} showDefinition />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="t-h4 mb-8">{c.flow}</h4>
                    <ProcessFlow steps={f.processes.map((p, i) => ({ id: `${f.id}-${i}`, title: p.title, summary: p.body }))} />
                  </div>

                  <div className="grid gap-8 lg:grid-cols-12">
                    <div className="lg:col-span-4">
                      <h4 className="t-h4">{c.equipment}</h4>
                      <ul className="mt-4 space-y-2">
                        {f.equipment.map((e) => (
                          <li key={e} className="flex gap-2 text-[15px]">
                            <Check size={18} className="mt-0.5 shrink-0 text-green-500" /> {e}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="lg:col-span-8">
                      <h4 className="t-h4">{c.certsFor}</h4>
                      <div className="mt-4 grid gap-4 md:grid-cols-2">
                        {db.getCertificatesByIds(f.certificateIds).map((cert) => (
                          <CertificationCard key={cert.id} cert={cert} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ),
            }))}
          />
        </div>
      </section>

      {/* Lab / QC */}
      <section className="section-y bg-sand" aria-labelledby="lab-title">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Kicker className="mb-4">{c.labKicker}</Kicker>
            <h2 id="lab-title" className="t-h2">
              {c.labTitle}
            </h2>
            <p className="t-lead mt-5 text-muted">{c.labLead(db.ops.qcSteps.length)}</p>
            <div className="mt-8">
              <TextLink href={l("/quality")}>{c.labLink}</TextLink>
            </div>
          </div>
          <div className="lg:col-span-7">
            <Media image={{ kind: "factory", alt: c.labImageAlt, caption: c.labImageCaption }} className="aspect-[16/9] rounded-md" />
            <ul className="mt-6 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2">
              {db.ops.labCapabilities.slice(0, 6).map((lab) => (
                <li key={lab.test} className="bg-white p-4">
                  <p className="text-[15px] font-bold">{lab.test}</p>
                  <p className="text-[13px] text-muted">
                    {lab.method} · {lab.where}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Warehouse & logistics */}
      <section className="section-y bg-ivory" aria-labelledby="wh-title">
        <div className="container-x">
          <SectionHeader id="wh-title" kicker={c.whKicker} title={c.whTitle} intro={c.whIntro} action={<TextLink href={l("/logistics")}>{c.whLink}</TextLink>} />
          <div className="grid gap-8 lg:grid-cols-12">
            <Media image={{ kind: "logistics", alt: c.whImageAlt, caption: c.whImageCaption }} className="aspect-[4/3] rounded-md lg:col-span-5" />
            <div className="overflow-hidden rounded-md border border-line bg-white lg:col-span-7">
              <table className="w-full text-left text-[14.5px]">
                <caption className="border-b border-line bg-ivory px-5 py-3 text-left">
                  <span className="t-label text-muted">{c.loadingCaption}</span>
                </caption>
                <thead className="text-[12px] uppercase tracking-[0.08em] text-muted max-sm:sr-only">
                  <tr>
                    <th scope="col" className="px-5 py-3">
                      {c.loadingHead.product}
                    </th>
                    <th scope="col" className="px-5 py-3">
                      {c.loadingHead.c20}
                    </th>
                    <th scope="col" className="px-5 py-3">
                      {c.loadingHead.c40}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {db.ops.containerLoading.map((row) => (
                    <tr key={row.product} className="border-t border-line max-sm:flex max-sm:flex-col max-sm:px-5 max-sm:py-3">
                      <th scope="row" className="font-semibold sm:px-5 sm:py-3">
                        {row.product}
                        <span className="block text-[12.5px] font-normal text-muted">{row.note}</span>
                      </th>
                      <td className="sm:px-5 sm:py-3">
                        <span className="text-muted sm:hidden">20 ft: </span>
                        {row.c20}
                      </td>
                      <td className="sm:px-5 sm:py-3">
                        <span className="text-muted sm:hidden">40 ft: </span>
                        {row.c40}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <CtaBand title={c.ctaTitle} body={c.ctaBody} secondary={{ label: c.ctaVisit, href: l("/contact?topic=visit") }} />
    </>
  );
}
