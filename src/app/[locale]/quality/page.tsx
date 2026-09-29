import type { Metadata } from "next";
import { DownloadRow } from "@/components/docs/DownloadRow";
import { Media } from "@/components/media/Media";
import { CertificateCenter } from "@/components/quality/CertificateCenter";
import { CertificationCard } from "@/components/quality/CertificationCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessFlow } from "@/components/sections/ProcessFlow";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { Check, Info } from "@/components/ui/icons";
import { Kicker, SectionHeader } from "@/components/ui/primitives";
import { getI18n, pageMetadata } from "@/i18n/server";
import { withFileSize } from "@/lib/document-meta";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return pageMetadata({ title: t.quality.metaTitle, description: t.quality.metaDesc, path: "/quality" });
}

export default async function QualityPage() {
  const { t, l, db } = await getI18n();
  const q = t.quality;
  const certs = db.getCertificates();
  const cards = Object.fromEntries(certs.map((c) => [c.id, <CertificationCard key={c.id} cert={c} showClaimRule />]));
  const productLabels = Object.fromEntries(db.getCategories().map((c) => [c.key, c.name]));
  const items = certs.map((c) => ({
    id: c.id,
    facility: db.getFacility(c.facilityId)?.shortName ?? c.entity.replace(/\s*\[.*?\]/g, "").trim(),
    products: c.products,
    scheme: c.schemeShort,
    status: c.status,
  }));
  const coas = withFileSize(db.getDocumentsByIds(["coa-sample-coffee", "coa-sample-rice", "coa-sample-cashew", "coa-sample-pepper"]));
  const qcSteps = db.ops.qcSteps;

  return (
    <>
      <PageHero
        breadcrumb={[{ label: t.common.home, href: l("/") }, { label: q.breadcrumb }]}
        kicker={q.kicker}
        title={q.title}
        intro={q.intro}
        image={{ kind: "factory", alt: q.heroAlt, caption: q.heroCaption }}
        actions={
          <>
            <ButtonLink href="#certificates">{q.certCenter}</ButtonLink>
            <ButtonLink href="#qc" variant="secondary">
              {q.qcFlow}
            </ButtonLink>
          </>
        }
      />

      {/* QC flow */}
      <section id="qc" className="section-y scroll-mt-24 bg-ivory" aria-labelledby="qc-title">
        <div className="container-x">
          <SectionHeader id="qc-title" kicker={q.qcKicker} title={q.qcTitle} intro={q.qcIntro} />
          <ProcessFlow steps={qcSteps} detailed />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {qcSteps.map((s, i) => (
              <article key={s.id} className="rounded-md border border-line bg-white p-6" data-reveal>
                <span className="font-serif text-[17px] text-green-500">0{i + 1}</span>
                <h3 className="mt-2 text-[18px] font-bold">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-6 text-muted">{s.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Laboratory */}
      <section id="laboratory" className="section-y scroll-mt-24 bg-sand" aria-labelledby="lab-title">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Kicker className="mb-4">{q.labKicker}</Kicker>
            <h2 id="lab-title" className="t-h2">
              {q.labTitle}
            </h2>
            <p className="t-lead mt-5 text-muted">{q.labLead}</p>
            <Media image={{ kind: "factory", alt: q.labImageAlt, caption: q.labImageCaption }} className="mt-8 aspect-[4/3] rounded-md" />
          </div>
          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-md border border-line bg-white">
              <table className="w-full text-left text-[15px]">
                <caption className="sr-only">{q.labCaption}</caption>
                <thead className="bg-ivory text-[12px] uppercase tracking-[0.08em] text-muted max-md:sr-only">
                  <tr>
                    <th scope="col" className="px-5 py-3">
                      {q.labHead.test}
                    </th>
                    <th scope="col" className="px-5 py-3">
                      {q.labHead.method}
                    </th>
                    <th scope="col" className="px-5 py-3">
                      {q.labHead.where}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {db.ops.labCapabilities.map((lab, i) => (
                    <tr key={lab.test} className="border-t border-line max-md:flex max-md:flex-col max-md:gap-0.5 max-md:px-5 max-md:py-4">
                      <th scope="row" className="font-bold md:px-5 md:py-4">
                        {lab.test}
                      </th>
                      <td className="text-muted md:px-5 md:py-4">{lab.method}</td>
                      <td className="md:px-5 md:py-4">
                        {/* first four tests run in-house (see content/operations.ts) */}
                        <span className={i < 4 ? "font-semibold text-forest-700" : ""}>{lab.where}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 flex items-start gap-2 text-[13.5px] text-muted">
              <Info size={16} className="mt-0.5 shrink-0" /> {q.labNote}
            </p>
          </div>
        </div>
      </section>

      {/* Certificate center */}
      <section id="certificates" className="section-y scroll-mt-24 bg-ivory" aria-labelledby="cert-title">
        <div className="container-x">
          <SectionHeader id="cert-title" kicker={q.certKicker} title={q.certTitle} intro={q.certIntro} />
          <CertificateCenter items={items} cards={cards} productLabels={productLabels} />
          <div className="mt-8 flex items-start gap-3 rounded-md border border-line bg-white p-5 text-[14px] leading-6">
            <Info size={18} className="mt-0.5 shrink-0 text-green-500" />
            <p>
              <strong>{q.claimBold}</strong> {q.claimText}
            </p>
          </div>
        </div>
      </section>

      {/* Traceability + sample COA */}
      <section className="section-y bg-sand" aria-labelledby="coa-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Kicker className="mb-4">{q.coaKicker}</Kicker>
            <h2 id="coa-title" className="t-h2">
              {q.coaTitle}
            </h2>
            <ul className="mt-6 space-y-3 text-[16px]">
              {q.coaPoints.map((p) => (
                <li key={p} className="flex gap-3">
                  <Check size={20} className="mt-0.5 shrink-0 text-green-500" /> {p}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <TextLink href={l("/supply-chain#traceability")}>{q.traceLink}</TextLink>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-md border border-line bg-white px-5 py-2">
              <p className="t-label pb-1 pt-4 text-muted">{q.coaListTitle}</p>
              <ul>
                {coas.map((d) => (
                  <DownloadRow key={d.id} doc={d} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title={q.ctaTitle}
        body={q.ctaBody}
        primary={{ label: q.ctaQa, href: l("/contact?topic=documents") }}
        secondary={{ label: t.nav.downloads, href: l("/downloads") }}
      />
    </>
  );
}
