/**
 * Locale routing (§19 "English default for international buyer; optional
 * locale routing"). English lives at the unprefixed URL (/products); other
 * locales are prefixed (/vi/products). `src/proxy.ts` rewrites unprefixed
 * requests to the internal /en segment.
 */
export const locales = ["en", "vi"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = { en: "English", vi: "Tiếng Việt" };
export const localeShort: Record<Locale, string> = { en: "EN", vi: "VI" };
export const ogLocale: Record<Locale, string> = { en: "en_GB", vi: "vi_VN" };

export const isLocale = (value: string | undefined | null): value is Locale => !!value && (locales as readonly string[]).includes(value);

/** Prefix an internal path with the locale ("/products" → "/vi/products"). API routes, anchors and external URLs pass through. */
export function localizeHref(locale: Locale, href: string): string {
  if (!href.startsWith("/") || href.startsWith("/api/") || href.startsWith("//")) return href;
  if (locale === defaultLocale) return href;
  if (href === "/") return `/${locale}`;
  if (href.startsWith("/?") || href.startsWith("/#")) return `/${locale}${href.slice(1)}`;
  return `/${locale}${href}`;
}

/** Split a browser pathname into locale + locale-less path. */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  const seg = pathname.split("/")[1];
  if (isLocale(seg) && seg !== defaultLocale) {
    const rest = pathname.slice(seg.length + 1);
    return { locale: seg, path: rest || "/" };
  }
  return { locale: defaultLocale, path: pathname || "/" };
}

/** Same page in another locale. */
export function switchLocaleHref(pathname: string, target: Locale, search = ""): string {
  const { path } = splitLocale(pathname);
  return localizeHref(target, path) + search;
}
