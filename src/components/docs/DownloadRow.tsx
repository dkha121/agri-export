"use client";

import Link from "next/link";
import type { DocumentItem } from "@/content/types";
import { useI18n } from "@/i18n/client";
import { track } from "@/lib/analytics";
import { cn, formatBytes } from "@/lib/utils";
import { Download, FileText, Lock } from "../ui/icons";

export type DocumentRowData = DocumentItem & { sizeBytes?: number };

/**
 * DownloadRow (§6): document name + type + size + download.
 * Shows SAMPLE / REFERENCE where relevant (§7.7, §24) and file type/size (§19).
 */
export function DownloadRow({ doc, compact }: { doc: DocumentRowData; compact?: boolean }) {
  const { t, l, date } = useI18n();
  const r = t.downloads.row;
  const href = `/api/documents/${doc.id}`;
  const onRequest = doc.access === "on-request";
  return (
    <li className={cn("group flex items-center gap-4 border-b border-line last:border-b-0", compact ? "py-3" : "py-4")}>
      <span aria-hidden className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-ivory text-forest-700">
        {onRequest ? <Lock size={20} /> : <FileText size={20} />}
      </span>
      <div className="min-w-0 flex-1">
        <p className="flex flex-wrap items-center gap-2 text-[15px] font-semibold leading-6 text-ink">
          <span className="min-w-0">{doc.title}</span>
          {doc.sample && (
            <span className="rounded-sm border border-error/40 px-1.5 py-0.5 text-[10px] font-bold uppercase leading-3 tracking-[0.1em] text-error">
              {r.sample}
            </span>
          )}
        </p>
        <p className="mt-0.5 text-[13px] leading-5 text-muted">
          {t.downloads.types[doc.type] ?? doc.type} · PDF{r.english ? ` (${r.english})` : ""}
          {doc.sizeBytes ? ` · ${formatBytes(doc.sizeBytes)}` : ""} · {doc.version} · {r.updated} {date(doc.publishedAt)}
          {!doc.verified && <span className="ml-1">· {r.placeholder}</span>}
        </p>
      </div>
      {onRequest ? (
        <Link
          href={l(`/contact?topic=documents&doc=${encodeURIComponent(doc.id)}`)}
          className="inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-sm border border-green-500 px-3 text-[14px] font-semibold text-forest-700 hover:bg-green-50"
        >
          {r.requestAccess}
        </Link>
      ) : (
        <a
          href={href}
          download
          onClick={() => track(doc.type === "Specification" ? "spec_download" : "document_download", { id: doc.id, type: doc.type })}
          className="inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-sm border border-green-500 px-3 text-[14px] font-semibold text-forest-700 hover:bg-green-50"
        >
          <Download size={18} />
          <span className="max-sm:sr-only">{t.common.download}</span>
          <span className="sr-only">{doc.title} (PDF)</span>
        </a>
      )}
    </li>
  );
}
