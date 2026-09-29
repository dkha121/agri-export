import Link from "next/link";
import type { Category } from "@/content/types";
import { getI18n } from "@/i18n/server";
import { Media } from "../media/Media";
import { ArrowRight } from "../ui/icons";

/**
 * CategoryCard (§6, §7.3): image-dominant (~70–75% of card), label/origin.
 * Hover scales the image to 1.03 and reveals subcategories + "Explore".
 * Subcategories are also visible on touch / keyboard focus (no hover-only info).
 */
export async function CategoryCard({ category, count }: { category: Category; count: number }) {
  const { t, l, locale } = await getI18n();
  const explore = locale === "vi" ? `Khám phá ${category.shortName.toLowerCase()}` : `Explore ${category.shortName.toLowerCase()}`;
  return (
    <Link
      href={l(`/products/${category.slug}`)}
      className="group relative block overflow-hidden rounded-md bg-forest-900 text-white"
      aria-label={`${category.name} — ${t.common.products(count)}`}
    >
      <Media image={category.image} className="aspect-[4/5] sm:aspect-[5/6]" sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" zoom showLabel={false} />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest-900 from-15% via-forest-900/75 via-45% to-forest-900/0" />
      <div className="absolute inset-x-0 bottom-0 p-6 lg:p-7">
        <p className="t-label text-gold-500">{t.common.products(count)}</p>
        <h3 className="mt-2 font-serif text-[32px] leading-[36px]">{category.name}</h3>
        <p className="mt-2 max-w-[34ch] text-[14.5px] leading-6 text-white/80">{category.tagline}</p>
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] max-lg:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <ul className="flex flex-wrap gap-1.5 pt-4">
              {category.subcategories.map((s) => (
                <li key={s} className="rounded-full border border-white/25 px-2.5 py-1 text-[12px] font-semibold">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <span className="mt-5 inline-flex items-center gap-2 text-[15px] font-semibold text-white">
          {explore}
          <ArrowRight size={18} className="arrow-nudge" />
        </span>
      </div>
    </Link>
  );
}
