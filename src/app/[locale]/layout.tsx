import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope, Noto_Serif_Display } from "next/font/google";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { MotionObserver } from "@/components/layout/MotionObserver";
import { PreviewNotice } from "@/components/layout/PreviewNotice";
import { company } from "@/content/company";
import { I18nProvider } from "@/i18n/client";
import { isLocale, localizeHref, locales, ogLocale } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import { createDb, productHref } from "@/lib/data";
import { SITE_URL } from "@/lib/site";
import "../globals.css";

const serif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

// Instrument Serif (spec §5.2) has no Vietnamese glyphs (U+1EA0–1EF9). Vietnamese pages use
// Noto Serif Display, narrowed with its wdth axis to keep the same condensed editorial look.
const serifVi = Noto_Serif_Display({
  variable: "--font-noto-serif-display",
  subsets: ["latin", "latin-ext", "vietnamese"],
  style: ["normal", "italic"],
  axes: ["wdth"],
  display: "swap",
  preload: false,
});

// Manrope ships a Vietnamese subset.
const sans = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext", "vietnamese"],
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = dictionaries[locale];
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: `${company.brand} — ${t.meta.siteTitle}`, template: `%s · ${company.brand}` },
    description: t.meta.siteDescription,
    openGraph: { type: "website", siteName: company.brand, locale: ogLocale[locale] },
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#F7F5EF",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = dictionaries[locale];
  const db = createDb(locale);
  const megaMenu = db.getCategories().map((c) => ({
    key: c.key,
    name: c.name,
    href: localizeHref(locale, `/products/${c.slug}`),
    tagline: c.tagline,
    items: db
      .getProductsByCategory(c.key)
      .slice(0, 4)
      .map((p) => ({ label: p.name, href: localizeHref(locale, productHref(p)) })),
  }));

  return (
    <html lang={locale} className={`${serif.variable} ${serifVi.variable} ${sans.variable}`}>
      <body className="has-mobile-bar lg:pb-0">
        <I18nProvider locale={locale}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-forest-900 focus:px-4 focus:py-3 focus:text-white"
          >
            {t.common.skipToContent}
          </a>
          <PreviewNotice />
          <Header megaMenu={megaMenu} />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <MobileActionBar />
          <MotionObserver />
        </I18nProvider>
      </body>
    </html>
  );
}
