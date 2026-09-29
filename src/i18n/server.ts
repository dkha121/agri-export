import "server-only";
import type { Metadata } from "next";
import { locale as rootLocale } from "next/root-params";
import { createDb } from "@/lib/data";
import { SITE_URL } from "@/lib/site";
import { type Locale, defaultLocale, isLocale, localizeHref, locales, ogLocale } from "./config";
import { dictionaries } from "./dictionaries";
import { formatDate } from "./format";

/**
 * Server-side i18n context. Reads the locale root param (app/[locale]) so any
 * Server Component can localise without prop drilling.
 */
export async function getI18n() {
  const raw = await rootLocale();
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  return {
    locale,
    t: dictionaries[locale],
    /** Localise an internal href. */
    l: (href: string) => localizeHref(locale, href),
    db: createDb(locale),
    date: (iso: string) => formatDate(iso, locale),
  };
}

export type I18n = Awaited<ReturnType<typeof getI18n>>;

/** Page metadata with canonical + hreflang alternates for every locale. */
export async function pageMetadata({ title, description, path, noindex }: { title?: string; description?: string; path: string; noindex?: boolean }): Promise<Metadata> {
  const { locale } = await getI18n();
  const languages = Object.fromEntries(locales.map((l) => [l === "vi" ? "vi-VN" : "en", localizeHref(l, path)]));
  // Omit undefined keys so the layout's default title/description still apply.
  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    alternates: { canonical: localizeHref(locale, path), languages: { ...languages, "x-default": path } },
    openGraph: {
      locale: ogLocale[locale],
      url: `${SITE_URL}${localizeHref(locale, path)}`,
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
    },
    ...(noindex ? { robots: { index: false } } : {}),
  };
}
