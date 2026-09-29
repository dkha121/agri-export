import type { MetadataRoute } from "next";
import { localizeHref, locales } from "@/i18n/config";
import { createDb, productHref } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

/** Sitemap with an entry per locale and hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const db = createDb("en");
  const paths: { path: string; priority: number; lastModified?: string }[] = [
    ...["", "/products", "/origins", "/capabilities", "/quality", "/supply-chain", "/logistics", "/sustainability", "/insights", "/downloads", "/request-quote", "/contact"].map(
      (p) => ({ path: p || "/", priority: p === "" ? 1 : 0.8 }),
    ),
    ...db.getCategories().map((c) => ({ path: `/products/${c.slug}`, priority: 0.8 })),
    ...db.getProducts().map((p) => ({ path: productHref(p), priority: 0.9 })),
    ...db.getOrigins().map((o) => ({ path: `/origins/${o.slug}`, priority: 0.6 })),
    ...db.getInsights().map((i) => ({ path: `/insights/${i.slug}`, priority: 0.6, lastModified: i.publishedAt })),
  ];
  const languages = (path: string) => Object.fromEntries(locales.map((l) => [l === "vi" ? "vi-VN" : "en", `${SITE_URL}${localizeHref(l, path)}`]));

  return paths.flatMap(({ path, priority, lastModified }) =>
    locales.map((locale) => ({
      url: `${SITE_URL}${localizeHref(locale, path)}`,
      priority,
      lastModified,
      changeFrequency: "weekly" as const,
      alternates: { languages: languages(path) },
    })),
  );
}
