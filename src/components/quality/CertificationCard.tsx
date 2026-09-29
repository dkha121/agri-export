import type { Certificate } from "@/content/types";
import { getI18n } from "@/i18n/server";
import { External, FileText, Shield } from "../ui/icons";
import { IllustrativeBadge, StatusBadge } from "../ui/primitives";

/**
 * CertificationCard (§6, §12.1): scheme + entity/facility + scope + validity
 * + status + link to proof. Never a bare logo.
 */
export async function CertificationCard({ cert, showClaimRule }: { cert: Certificate; showClaimRule?: boolean }) {
  const { t, db, date } = await getI18n();
  const c = t.quality.card;
  const facility = db.getFacility(cert.facilityId);
  return (
    <article className="flex h-full flex-col rounded-md border border-line bg-white p-6">
      <div className="flex items-start justify-between gap-3">
        <span aria-hidden className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-forest-900 text-gold-500">
          <Shield size={22} />
        </span>
        <StatusBadge status={cert.status} />
      </div>
      <h3 className="mt-5 text-[18px] font-bold leading-6">{cert.scheme}</h3>
      <dl className="mt-4 space-y-3 text-[14px] leading-[21px]">
        <div>
          <dt className="t-label text-muted">{c.entity}</dt>
          <dd className="mt-1 font-semibold">{facility?.name ?? cert.entity}</dd>
        </div>
        <div>
          <dt className="t-label text-muted">{c.scope}</dt>
          <dd className="mt-1">{cert.scope}</dd>
        </div>
        <div>
          <dt className="t-label text-muted">{c.valid}</dt>
          <dd className="mt-1 font-semibold">
            {date(cert.issued)} – {date(cert.expires)}
          </dd>
        </div>
        {cert.number && (
          <div>
            <dt className="t-label text-muted">{c.number}</dt>
            <dd className="mt-1 font-mono text-[13px]">{cert.number}</dd>
          </div>
        )}
        {showClaimRule && (
          <div className="rounded-sm bg-ivory p-3">
            <dt className="t-label text-muted">{c.claim}</dt>
            <dd className="mt-1 text-[13px]">{cert.claimRule}</dd>
          </div>
        )}
      </dl>
      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-5">
        {cert.documentId && (
          <a href={`/api/documents/${cert.documentId}`} className="inline-flex min-h-[44px] items-center gap-1.5 text-[14px] font-semibold text-forest-700 hover:underline">
            <FileText size={16} /> {c.pdf}
          </a>
        )}
        {cert.verificationUrl && (
          <a
            href={cert.verificationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-1.5 text-[14px] font-semibold text-forest-700 hover:underline"
          >
            {c.verify} <External size={15} />
            <span className="sr-only">{t.common.opensNewTab}</span>
          </a>
        )}
        <IllustrativeBadge verified={cert.verified} className="ml-auto" />
      </div>
    </article>
  );
}
