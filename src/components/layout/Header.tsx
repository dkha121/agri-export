"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useId, useRef, useState } from "react";
import { useI18n } from "@/i18n/client";
import { type Locale, localeNames, localeShort, locales, splitLocale, switchLocaleHref } from "@/i18n/config";
import { cn, docHref } from "@/lib/utils";
import { buttonClass } from "../ui/Button";
import { ArrowRight, Check, ChevronDown, Close, Download, Globe, Menu } from "../ui/icons";
import { Logo } from "./Logo";

export interface MegaMenuCategory {
  key: string;
  name: string;
  href: string;
  tagline: string;
  items: { label: string; href: string }[];
}

interface NavItem {
  key: string;
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
}

/**
 * Global header (§4.1, §6): 80px, 68px after scroll, sticky. Products opens a
 * mega-menu; Capabilities a small dropdown. Mobile/tablet uses a drawer.
 * All menus are keyboard operable (Enter/Space to open, Esc to close).
 */
export function Header({ megaMenu }: { megaMenu: MegaMenuCategory[] }) {
  const { t, l } = useI18n();
  const pathname = usePathname();
  const path = splitLocale(pathname).path;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mainNav: NavItem[] = [
    { key: "products", label: t.nav.products, href: l("/products") },
    { key: "origins", label: t.nav.origins, href: l("/origins") },
    {
      key: "capabilities",
      label: t.nav.capabilities,
      href: l("/capabilities"),
      children: [
        { key: "factory", label: t.nav.factory, href: l("/capabilities"), description: t.nav.factoryDesc },
        { key: "supply", label: t.nav.supplyChain, href: l("/supply-chain"), description: t.nav.supplyChainDesc },
        { key: "logistics", label: t.nav.logistics, href: l("/logistics"), description: t.nav.logisticsDesc },
      ],
    },
    { key: "quality", label: t.nav.quality, href: l("/quality") },
    { key: "sustainability", label: t.nav.sustainability, href: l("/sustainability") },
    { key: "insights", label: t.nav.insights, href: l("/insights") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync UI with route change
    setOpen(null);
    setDrawer(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const trigger = document.getElementById(`nav-trigger-${open}`);
        setOpen(null);
        trigger?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const hoverOpen = (key: string | null) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpen(key), key ? 120 : 200);
  };

  const isActive = (href: string) => {
    const target = splitLocale(href).path;
    return target === "/" ? path === "/" : path.startsWith(target);
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300",
          scrolled || open ? "border-line bg-ivory/95 shadow-[0_1px_0_rgba(16,42,36,0.02)] backdrop-blur-md" : "border-transparent bg-ivory",
        )}
      >
        <div ref={navRef} onMouseLeave={() => hoverOpen(null)}>
          <div className={cn("container-x flex items-center justify-between gap-4 transition-[height] duration-300", scrolled ? "h-[68px]" : "h-[68px] lg:h-[80px]")}>
            <Logo />

            <nav aria-label={t.nav.main} className="hidden lg:block">
              <ul className="flex items-center">
                {mainNav.map((item) => {
                  const hasMenu = item.key === "products" || item.children;
                  if (!hasMenu) {
                    return (
                      <li key={item.key}>
                        <Link
                          href={item.href}
                          aria-current={isActive(item.href) ? "page" : undefined}
                          onMouseEnter={() => hoverOpen(null)}
                          className={cn(
                            "relative flex h-11 items-center whitespace-nowrap px-2.5 text-[14px] font-semibold text-ink/85 hover:text-forest-700 xl:px-4 xl:text-[14.5px]",
                            isActive(item.href) && "text-forest-700 after:absolute after:inset-x-2.5 after:bottom-1 after:h-0.5 after:bg-gold-500 xl:after:inset-x-4",
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  }
                  return (
                    <li key={item.key} onMouseEnter={() => hoverOpen(item.key)} className="relative">
                      <button
                        id={`nav-trigger-${item.key}`}
                        type="button"
                        aria-expanded={open === item.key}
                        aria-controls={`nav-panel-${item.key}`}
                        onClick={() => setOpen(open === item.key ? null : item.key)}
                        className={cn(
                          "relative flex h-11 items-center gap-1 whitespace-nowrap px-2.5 text-[14px] font-semibold text-ink/85 hover:text-forest-700 xl:px-4 xl:text-[14.5px]",
                          (isActive(item.href) || open === item.key) && "text-forest-700",
                          isActive(item.href) && "after:absolute after:inset-x-2.5 after:bottom-1 after:h-0.5 after:bg-gold-500 xl:after:inset-x-4",
                        )}
                      >
                        {item.label}
                        <ChevronDown size={16} className={cn("transition-transform", open === item.key && "rotate-180")} />
                      </button>
                      {item.children && open === item.key && <Dropdown id={`nav-panel-${item.key}`} items={item.children} />}
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <Suspense fallback={null}>
                <LanguageSwitch className="hidden lg:flex" />
              </Suspense>
              <Link href={l("/request-quote")} className={buttonClass("primary", "sm", "max-md:hidden lg:min-h-[44px]")}>
                {t.common.requestQuote}
              </Link>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-forest-900 hover:bg-green-50 lg:hidden"
                aria-label={t.nav.openMenu}
                aria-expanded={drawer}
                aria-controls="mobile-drawer"
                onClick={() => setDrawer(true)}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>

          {open === "products" && <MegaMenu megaMenu={megaMenu} />}
        </div>
      </header>
      {drawer && <MobileDrawer onClose={() => setDrawer(false)} isActive={isActive} mainNav={mainNav} megaMenu={megaMenu} />}
    </>
  );
}

function Dropdown({ id, items }: { id: string; items: NavItem[] }) {
  return (
    <div id={id} className="anim-fade absolute left-0 top-full z-50 mt-2 w-[320px] rounded-md border border-line bg-white p-2 shadow-soft">
      <ul>
        {items.map((c) => (
          <li key={c.key}>
            <Link href={c.href} className="group block rounded-sm px-4 py-3 hover:bg-ivory">
              <span className="flex items-center justify-between text-[15px] font-semibold text-ink">
                {c.label}
                <ArrowRight size={16} className="arrow-nudge text-green-500" />
              </span>
              {c.description && <span className="t-small mt-0.5 block text-muted">{c.description}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MegaMenu({ megaMenu }: { megaMenu: MegaMenuCategory[] }) {
  const { t, l } = useI18n();
  return (
    <div id="nav-panel-products" className="anim-fade absolute inset-x-0 top-full border-y border-line bg-white shadow-soft">
      <div className="container-x grid grid-cols-12 gap-6 py-10">
        <div className="col-span-9 grid grid-cols-3 gap-x-6 gap-y-8">
          {megaMenu.map((cat) => (
            <div key={cat.key}>
              <Link href={cat.href} className="group inline-flex items-center gap-2 font-serif text-[22px] leading-7 text-forest-900 hover:text-forest-700">
                {cat.name}
                <ArrowRight size={16} className="arrow-nudge text-green-500" />
              </Link>
              <p className="t-small mt-1 text-muted">{cat.tagline}</p>
              <ul className="mt-3 space-y-0.5">
                {cat.items.map((p) => (
                  <li key={p.href}>
                    <Link href={p.href} className="block rounded-sm py-1 text-[14px] leading-5 text-ink/80 hover:text-forest-700 hover:underline">
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <aside className="col-span-3 flex flex-col justify-between rounded-md bg-forest-900 p-6 text-white">
          <div>
            <p className="t-label text-gold-500">{t.nav.buyerResources}</p>
            <p className="mt-3 font-serif text-[24px] leading-8">{t.nav.megaPitch}</p>
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <Link href={l("/products")} className={buttonClass("gold", "sm", "w-full")}>
              {t.nav.viewAllProducts}
            </Link>
            <a href={docHref("catalog-2026")} className={buttonClass("on-dark", "sm", "w-full")}>
              <Download size={16} /> {t.nav.catalogPdf}
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}

/** Real locale switch — keeps the visitor on the same page (§19 locale routing). */
function useLocaleLinks() {
  const pathname = usePathname();
  const params = useSearchParams();
  const qs = params.toString();
  return (target: Locale) => switchLocaleHref(pathname, target, qs ? `?${qs}` : "");
}

function LanguageSwitch({ className }: { className?: string }) {
  const { t, locale } = useI18n();
  const [open, setOpen] = useState(false);
  const id = useId();
  const hrefFor = useLocaleLinks();
  return (
    <div className={cn("relative", className)} onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setOpen(false)}>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
        className="flex h-11 items-center gap-1.5 rounded-sm px-2.5 text-[14px] font-bold text-ink/85 hover:bg-green-50"
      >
        <Globe size={18} />
        {localeShort[locale]}
        <span className="sr-only">— {t.nav.changeLanguage}</span>
      </button>
      {open && (
        <ul id={id} className="anim-fade absolute right-0 top-full mt-2 w-52 rounded-md border border-line bg-white p-2 shadow-soft">
          {locales.map((lc) => (
            <li key={lc}>
              <Link
                href={hrefFor(lc)}
                hrefLang={lc}
                lang={lc}
                aria-current={lc === locale ? "true" : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex min-h-[44px] items-center justify-between rounded-sm px-3 text-[14.5px] hover:bg-ivory",
                  lc === locale ? "font-bold text-forest-700" : "text-ink",
                )}
              >
                {localeNames[lc]}
                {lc === locale && <Check size={16} />}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function MobileLanguageLinks() {
  const { locale } = useI18n();
  const hrefFor = useLocaleLinks();
  return (
    <div className="flex gap-2">
      {locales.map((lc) => (
        <Link
          key={lc}
          href={hrefFor(lc)}
          hrefLang={lc}
          lang={lc}
          aria-current={lc === locale ? "true" : undefined}
          className={cn(
            "flex min-h-[44px] flex-1 items-center justify-center rounded-sm border text-[14.5px] font-semibold",
            lc === locale ? "border-forest-700 bg-forest-700 text-white" : "border-line bg-white text-ink",
          )}
        >
          {localeNames[lc]}
        </Link>
      ))}
    </div>
  );
}

function MobileDrawer({
  onClose,
  isActive,
  mainNav,
  megaMenu,
}: {
  onClose: () => void;
  isActive: (href: string) => boolean;
  mainNav: NavItem[];
  megaMenu: MegaMenuCategory[];
}) {
  const { t, l } = useI18n();
  const panelRef = useRef<HTMLDivElement>(null);
  const [productsOpen, setProductsOpen] = useState(false);

  const trap = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const opener = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", trap);
    panelRef.current?.querySelector<HTMLElement>("button")?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", trap);
      opener?.focus();
    };
  }, [trap]);

  const links = [
    ...mainNav.filter((n) => n.key !== "products" && n.key !== "capabilities"),
    { key: "capabilities", label: t.nav.capabilities, href: l("/capabilities") },
    { key: "supply", label: t.nav.supplyChain, href: l("/supply-chain") },
    { key: "logistics", label: t.nav.logistics, href: l("/logistics") },
    { key: "downloads", label: t.nav.downloads, href: l("/downloads") },
    { key: "contact", label: t.nav.contact, href: l("/contact") },
  ];

  return (
    <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label={t.nav.menu} id="mobile-drawer">
      <div className="anim-fade absolute inset-0 bg-forest-900/50" onClick={onClose} aria-hidden />
      <div ref={panelRef} className="anim-drawer absolute inset-y-0 right-0 flex w-full max-w-[420px] flex-col bg-ivory">
        <div className="flex h-[68px] items-center justify-between border-b border-line px-5">
          <span className="t-label text-muted">{t.nav.menu}</span>
          <button type="button" onClick={onClose} className="inline-flex h-11 w-11 items-center justify-center rounded-sm hover:bg-green-50" aria-label={t.nav.closeMenu}>
            <Close size={24} />
          </button>
        </div>
        <nav aria-label={t.nav.mobile} className="flex-1 overflow-y-auto px-5 py-4">
          <ul className="divide-y divide-line">
            <li>
              <button
                type="button"
                aria-expanded={productsOpen}
                onClick={() => setProductsOpen((v) => !v)}
                className="flex min-h-[56px] w-full items-center justify-between text-left text-[18px] font-semibold"
              >
                {t.nav.products}
                <ChevronDown className={cn("transition-transform", productsOpen && "rotate-180")} />
              </button>
              {productsOpen && (
                <ul className="pb-3">
                  <li>
                    <Link href={l("/products")} className="flex min-h-[44px] items-center text-[15px] font-semibold text-forest-700">
                      {t.nav.allProducts}
                    </Link>
                  </li>
                  {megaMenu.map((c) => (
                    <li key={c.key}>
                      <Link href={c.href} className="flex min-h-[44px] items-center text-[15px] text-ink/85">
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            {links.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn("flex min-h-[56px] items-center text-[18px] font-semibold", isActive(item.href) && "text-forest-700")}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-3 border-t border-line p-5">
          <p className="flex items-center gap-2 text-[13px] font-semibold text-muted">
            <Globe size={16} /> {t.nav.language}
          </p>
          <Suspense fallback={null}>
            <MobileLanguageLinks />
          </Suspense>
          <Link href={l("/request-quote")} className={buttonClass("primary", "md", "w-full")}>
            {t.common.requestQuote}
          </Link>
        </div>
      </div>
    </div>
  );
}
