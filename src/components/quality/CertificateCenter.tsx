"use client";

import { type ReactNode, useMemo, useState } from "react";
import type { CertificateStatus } from "@/content/types";
import { useI18n } from "@/i18n/client";
import { cn } from "@/lib/utils";

export interface CertFilterItem {
  id: string;
  facility: string;
  products: string[];
  scheme: string;
  status: CertificateStatus;
}

const STATUSES: CertificateStatus[] = ["valid", "renewal-pending", "expired"];

/**
 * Certificate center filter (§12.1): Facility · Product · Scheme · Status.
 * Cards are server-rendered and passed in by id.
 */
export function CertificateCenter({
  items,
  cards,
  productLabels,
}: {
  items: CertFilterItem[];
  cards: Record<string, ReactNode>;
  productLabels: Record<string, string>;
}) {
  const { t } = useI18n();
  const f = t.quality.filters;
  const [facility, setFacility] = useState("");
  const [product, setProduct] = useState("");
  const [scheme, setScheme] = useState("");
  const [status, setStatus] = useState<"" | CertificateStatus>("");

  const facilities = useMemo(() => [...new Set(items.map((i) => i.facility))], [items]);
  const schemes = useMemo(() => [...new Set(items.map((i) => i.scheme))], [items]);
  const productKeys = useMemo(() => [...new Set(items.flatMap((i) => i.products))], [items]);

  const results = items.filter(
    (i) => (!facility || i.facility === facility) && (!product || i.products.includes(product)) && (!scheme || i.scheme === scheme) && (!status || i.status === status),
  );
  const any = facility || product || scheme || status;

  const select = (id: string, label: string, value: string, set: (v: string) => void, options: { value: string; label: string }[]) => (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-semibold">
        {label}
      </label>
      <select id={id} value={value} onChange={(e) => set(e.target.value)} className="h-[48px] w-full rounded-sm border border-line bg-white px-3 text-[15px]">
        <option value="">{t.common.all}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div>
      <div className="grid gap-4 rounded-md border border-line bg-white p-5 sm:grid-cols-2 lg:grid-cols-4">
        {select("cf-facility", f.facility, facility, setFacility, facilities.map((f) => ({ value: f, label: f })))}
        {select("cf-product", f.product, product, setProduct, productKeys.map((p) => ({ value: p, label: productLabels[p] ?? p })))}
        {select("cf-scheme", f.scheme, scheme, setScheme, schemes.map((s) => ({ value: s, label: s })))}
        {select("cf-status", f.status, status, (v) => setStatus(v as CertificateStatus | ""), STATUSES.map((s) => ({ value: s, label: t.common.status[s] })))}
      </div>
      <div className="mb-6 mt-5 flex items-center justify-between gap-4">
        <p className="text-[15px] text-muted" aria-live="polite">
          {f.count(results.length, items.length)}
        </p>
        <button
          type="button"
          onClick={() => {
            setFacility("");
            setProduct("");
            setScheme("");
            setStatus("");
          }}
          className={cn("min-h-[44px] text-[14px] font-semibold text-forest-700 underline underline-offset-4", !any && "invisible")}
        >
          {f.reset}
        </button>
      </div>
      {results.length ? (
        <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {results.map((r) => (
            <li key={r.id}>{cards[r.id]}</li>
          ))}
        </ul>
      ) : (
        <p className="rounded-md border border-dashed border-line bg-white p-8 text-center text-muted">{f.empty}</p>
      )}
    </div>
  );
}
