import type { ReactNode } from "react";
import { company } from "@/content/company";
import { getI18n } from "@/i18n/server";
import { ButtonLink } from "../ui/Button";
import { ArrowRight } from "../ui/icons";

/**
 * Final RFQ CTA (§7.9). Copy defaults to the spec; pages may pass contextual
 * copy and actions (hrefs already localised). Never promises a response time
 * unless a real SLA exists (§16.2).
 */
export async function CtaBand({
  title,
  body,
  primary,
  secondary,
  aside,
}: {
  title?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  aside?: ReactNode;
}) {
  const { t, l } = await getI18n();
  const p = primary ?? { label: t.cta.start, href: l("/request-quote") };
  return (
    <section className="on-dark relative overflow-hidden bg-forest-700 text-white" aria-labelledby="cta-title">
      <svg aria-hidden className="absolute -right-24 -top-24 h-[420px] w-[420px] text-white/[0.04]" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="98" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="100" cy="100" r="42" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
      <div className="container-x relative grid gap-10 py-20 lg:grid-cols-12 lg:items-end lg:py-28">
        <div className="lg:col-span-8" data-reveal>
          <h2 id="cta-title" className="t-h2 text-white">
            {title ?? t.cta.title}
          </h2>
          <p className="t-lead mt-5 max-w-[56ch] text-white/75">{body ?? t.cta.body}</p>
          {company.responseSla && <p className="mt-3 text-[14px] text-gold-500">{company.responseSla}</p>}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-stretch">
          <ButtonLink href={p.href} variant="gold" icon={<ArrowRight size={18} className="arrow-nudge" />}>
            {p.label}
          </ButtonLink>
          {secondary && (
            <ButtonLink href={secondary.href} variant="on-dark">
              {secondary.label}
            </ButtonLink>
          )}
          {aside}
        </div>
      </div>
    </section>
  );
}
