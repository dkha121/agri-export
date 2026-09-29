"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useI18n } from "@/i18n/client";
import { track } from "@/lib/analytics";
import type { CountryOption } from "@/lib/countries";
import { QUANTITY_UNITS } from "@/lib/rfq-schema";
import { buttonClass } from "../ui/Button";
import { Download } from "../ui/icons";

/** Fires the product_view analytics event (§21, §24). */
export function ProductViewTracker({ slug, category }: { slug: string; category: string }) {
  const { locale } = useI18n();
  useEffect(() => {
    track("product_view", { slug, category, locale });
  }, [slug, category, locale]);
  return null;
}

export function SpecDownloadButton({ slug, className, variant = "secondary" }: { slug: string; className?: string; variant?: "secondary" | "on-dark" }) {
  const { t } = useI18n();
  return (
    <a href={`/api/documents/spec-${slug}`} download onClick={() => track("spec_download", { slug })} className={buttonClass(variant, "md", className)}>
      <Download size={18} /> {t.product.downloadSpec}
    </a>
  );
}

/**
 * Compact RFQ card (§9.3): product preselected + quantity + destination.
 * Plain GET form → works without JS; values prefill the RFQ wizard.
 */
export function ProductRfqCard({ slug, name, moq, countries }: { slug: string; name: string; moq?: string; countries: CountryOption[] }) {
  const { t, l } = useI18n();
  const c = t.product.rfqCard;
  return (
    <form action={l("/request-quote")} method="get" className="rounded-md border border-line bg-white p-6 shadow-soft" aria-labelledby="rfq-card-title">
      <input type="hidden" name="product" value={slug} />
      <p id="rfq-card-title" className="t-label text-green-500">
        {c.title}
      </p>
      <p className="mt-2 text-[17px] font-bold leading-6">{name}</p>
      {moq && (
        <p className="mt-1 text-[13px] text-muted">
          {c.moq} {moq}
        </p>
      )}
      <div className="mt-5 grid grid-cols-[1fr_auto] gap-2">
        <div>
          <label htmlFor="rfq-qty" className="mb-1.5 block text-[13px] font-semibold">
            {c.quantity}
          </label>
          <input id="rfq-qty" name="qty" type="number" min="0" step="any" inputMode="decimal" className="h-[48px] w-full rounded-sm border border-line bg-white px-3 text-[15px]" />
        </div>
        <div>
          <label htmlFor="rfq-unit" className="mb-1.5 block text-[13px] font-semibold">
            {c.unit}
          </label>
          <select id="rfq-unit" name="unit" className="h-[48px] rounded-sm border border-line bg-white px-2 text-[14px]" defaultValue="MT">
            {QUANTITY_UNITS.map((u) => (
              <option key={u} value={u}>
                {t.rfq.options.units[u] ?? u}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-3">
        <label htmlFor="rfq-country" className="mb-1.5 block text-[13px] font-semibold">
          {c.country}
        </label>
        <select id="rfq-country" name="country" defaultValue="" className="h-[48px] w-full rounded-sm border border-line bg-white px-3 text-[15px]">
          <option value="">{c.selectCountry}</option>
          {countries.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className={buttonClass("primary", "md", "mt-5 w-full")} onClick={() => track("rfq_start", { source: "product_card", slug })}>
        {c.submit}
      </button>
      <p className="mt-3 text-center text-[12.5px] text-muted">{c.note}</p>
    </form>
  );
}

/** Mobile bottom action bar: "Request Quote / Download Spec" (§9.3, §18). */
export function ProductMobileBar({ slug }: { slug: string }) {
  const { t, l } = useI18n();
  return (
    <div
      data-print-hidden
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ivory/95 px-4 py-3 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto flex max-w-[640px] gap-3">
        <a
          href={`/api/documents/spec-${slug}`}
          download
          onClick={() => track("spec_download", { slug, source: "mobile_bar" })}
          className={buttonClass("secondary", "sm", "flex-1")}
        >
          <Download size={16} /> {t.mobileBar.spec}
        </a>
        <Link
          href={l(`/request-quote?product=${slug}`)}
          onClick={() => track("rfq_start", { source: "mobile_bar", slug })}
          className={buttonClass("primary", "sm", "flex-[1.6]")}
        >
          {t.common.requestQuote}
        </Link>
      </div>
    </div>
  );
}
