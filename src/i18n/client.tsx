"use client";

import { type ReactNode, createContext, useContext } from "react";
import { type Locale, defaultLocale, localizeHref } from "./config";
import { dictionaries } from "./dictionaries";
import { formatDate } from "./format";

const LocaleContext = createContext<Locale>(defaultLocale);

export function I18nProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

/** Client-side i18n: dictionary, href localiser and date formatter for the current locale. */
export function useI18n() {
  const locale = useContext(LocaleContext);
  return {
    locale,
    t: dictionaries[locale],
    l: (href: string) => localizeHref(locale, href),
    date: (iso: string) => formatDate(iso, locale),
  };
}
