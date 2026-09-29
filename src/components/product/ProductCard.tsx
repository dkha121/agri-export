import Link from "next/link";
import type { Product } from "@/content/types";
import { getI18n } from "@/i18n/server";
import { productHref } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Media } from "../media/Media";
import { ArrowRight, MapPin } from "../ui/icons";

/**
 * ProductCard (§6): image + product + 3 spec rows + text CTA.
 * No price and no add-to-cart — this is B2B, sales runs through RFQ.
 */
export async function ProductCard({ product, headingLevel = "h3", condensed }: { product: Product; headingLevel?: "h2" | "h3"; condensed?: boolean }) {
  const { t, l, db } = await getI18n();
  const category = db.getCategory(product.category);
  const origin = product.originIds.map((id) => db.getOrigin(id)?.name).filter(Boolean).join(" · ");
  const rows = db.getCardSpecRows(product);
  const H = headingLevel;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-md border border-line bg-white transition-shadow duration-300 hover:shadow-soft">
      <Media image={product.image} className="aspect-[4/3]" sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" zoom showLabel={!condensed} />
      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <p className="t-label text-green-500">{category?.name}</p>
        <H className="mt-2 text-[19px] font-bold leading-6 text-ink">
          <Link href={l(productHref(product))} className="after:absolute after:inset-0 after:content-[''] focus-visible:shadow-none focus-visible:outline-none">
            {product.name}
          </Link>
        </H>
        <p className="mt-2 flex items-center gap-1.5 text-[13.5px] text-muted">
          <MapPin size={15} className="shrink-0 text-green-500" />
          {t.products.cardOrigin(origin)}
        </p>
        <dl className={cn("mt-4 divide-y divide-line border-y border-line text-[14px]", condensed && "mt-3")}>
          {rows.map((r) => (
            <div key={r.key} className="flex items-baseline justify-between gap-4 py-2">
              <dt className="text-muted">{r.label}</dt>
              <dd className={cn("text-right font-semibold", r.value ? "text-ink" : "text-error")}>{r.value ?? t.common.pending}</dd>
            </div>
          ))}
        </dl>
        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[15px] font-semibold text-forest-700">
          {t.common.viewSpecification}
          <ArrowRight size={18} className="arrow-nudge" />
        </span>
      </div>
      {/* Visible focus ring for the stretched link */}
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-md ring-gold-500 ring-offset-2 group-has-[a:focus-visible]:ring-2" />
    </article>
  );
}
