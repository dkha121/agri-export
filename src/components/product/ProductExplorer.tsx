"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Product } from "@/content/types";
import type { FilterGroup } from "@/lib/data";
import { useI18n } from "@/i18n/client";
import { track } from "@/lib/analytics";
import { type ActiveFilters, filterProducts, parseFilters } from "@/lib/filters";
import { Button, buttonClass } from "../ui/Button";
import { ChevronDown, Close, Filter } from "../ui/icons";

type SortKey = "featured" | "az" | "category";
const SORTS: SortKey[] = ["featured", "az", "category"];

/**
 * Catalog filter + results (§8). Filter state is synced to URL query params
 * so buyers can share a filtered view (§21). Desktop: sticky left sidebar.
 * Mobile/tablet: filter drawer (bottom sheet) with live result count.
 */
export function ProductExplorer({
  products,
  groups,
  cards,
  hiddenGroups = [],
}: {
  products: Product[];
  groups: FilterGroup[];
  /** Server-rendered ProductCards keyed by slug. */
  cards: Record<string, ReactNode>;
  hiddenGroups?: string[];
}) {
  const { t, l, locale } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [sheetOpen, setSheetOpen] = useState(false);

  const filters = useMemo(() => parseFilters(new URLSearchParams(params.toString())), [params]);
  const sort = (params.get("sort") as SortKey) || "featured";
  const visibleGroups = groups.filter((g) => !hiddenGroups.includes(g.key));

  const results = useMemo(() => {
    const list = filterProducts(products, filters);
    if (sort === "az") return [...list].sort((a, b) => a.name.localeCompare(b.name, locale));
    if (sort === "category") return [...list].sort((a, b) => a.category.localeCompare(b.category));
    return [...list].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  }, [products, filters, sort, locale]);

  const activeCount = Object.values(filters).reduce((n, v) => n + v.length, 0);

  const update = useCallback(
    (next: ActiveFilters, nextSort = sort) => {
      const sp = new URLSearchParams();
      for (const [k, v] of Object.entries(next)) if (v.length) sp.set(k, v.join(","));
      if (nextSort !== "featured") sp.set("sort", nextSort);
      const qs = sp.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, sort],
  );

  const toggle = (key: string, value: string) => {
    const current = filters[key] ?? [];
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    update({ ...filters, [key]: next });
    track("filter_change", { key, value, on: !current.includes(value) });
  };

  const clearAll = () => update({});

  const labelFor = (key: string, value: string) =>
    groups.find((g) => g.key === key)?.options.find((o) => o.value === value)?.label ?? value;

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
      {/* Sidebar (desktop) */}
      <aside className="hidden lg:col-span-3 lg:block" aria-label={t.products.filtersAria}>
        <div className="sticky top-[92px] max-h-[calc(100vh-110px)] overflow-y-auto pb-6 pr-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="t-label text-ink">{t.products.filterProducts}</h2>
            {activeCount > 0 && (
              <button type="button" onClick={clearAll} className="min-h-[36px] text-[13px] font-semibold text-forest-700 underline underline-offset-2">
                {t.products.clearAll}
              </button>
            )}
          </div>
          <FilterGroups groups={visibleGroups} filters={filters} onToggle={toggle} idPrefix="d" />
        </div>
      </aside>

      {/* Results */}
      <div className="lg:col-span-9">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
          <p className="text-[15px] text-muted" aria-live="polite">
            <strong className="text-ink">{results.length}</strong> {t.common.products(results.length).replace(/^\d+\s*/, "")}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              className={buttonClass("secondary", "sm", "lg:hidden")}
              aria-haspopup="dialog"
            >
              <Filter size={18} /> {t.products.filters}
              {activeCount ? ` (${activeCount})` : ""}
            </button>
            <label htmlFor="sort" className="sr-only">
              {t.products.sortLabel}
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => update(filters, e.target.value as SortKey)}
              className="min-h-[44px] rounded-sm border border-line bg-white px-3 pr-8 text-[14px] font-semibold"
            >
              {SORTS.map((s) => (
                <option key={s} value={s}>
                  {t.products.sortPrefix} {t.products.sort[s]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {activeCount > 0 && (
          <ul className="mb-6 flex flex-wrap gap-2" aria-label={t.products.activeFilters}>
            {Object.entries(filters).flatMap(([key, values]) =>
              values.map((v) => (
                <li key={`${key}-${v}`}>
                  <button
                    type="button"
                    onClick={() => toggle(key, v)}
                    className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full border border-green-500/40 bg-green-50 pl-3 pr-2 text-[13px] font-semibold text-forest-700 hover:border-green-500"
                  >
                    {labelFor(key, v)}
                    <Close size={14} />
                    <span className="sr-only">{t.products.removeFilter}</span>
                  </button>
                </li>
              )),
            )}
          </ul>
        )}

        {results.length ? (
          <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 lg:gap-6">
            {results.map((p) => (
              <li key={p.slug}>{cards[p.slug]}</li>
            ))}
          </ul>
        ) : (
          <div className="rounded-md border border-dashed border-line bg-white p-10 text-center">
            <p className="text-[18px] font-bold">{t.products.emptyTitle}</p>
            <p className="mx-auto mt-2 max-w-md text-[15px] text-muted">
              {t.products.emptyBody}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button variant="secondary" size="sm" onClick={clearAll}>
                {t.products.clearFilters}
              </Button>
              <Link href={l("/request-quote")} className={buttonClass("primary", "sm")}>
                {t.products.sendSpec}
              </Link>
            </div>
          </div>
        )}
      </div>

      {sheetOpen && (
        <FilterSheet onClose={() => setSheetOpen(false)} count={results.length} onClear={clearAll}>
          <FilterGroups groups={visibleGroups} filters={filters} onToggle={toggle} idPrefix="m" />
        </FilterSheet>
      )}
    </div>
  );
}

function FilterGroups({
  groups,
  filters,
  onToggle,
  idPrefix,
}: {
  groups: FilterGroup[];
  filters: ActiveFilters;
  onToggle: (key: string, value: string) => void;
  idPrefix: string;
}) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {groups.map((g, gi) => (
        <details key={g.key} open={gi < 4 || (filters[g.key]?.length ?? 0) > 0} className="group/d py-2">
          <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between text-[14.5px] font-bold [&::-webkit-details-marker]:hidden">
            {g.label}
            <ChevronDown size={18} aria-hidden className="text-muted transition-transform group-open/d:rotate-180" />
          </summary>
          <fieldset className="pb-2">
            <legend className="sr-only">{g.label}</legend>
            {g.options.map((o) => {
              const id = `${idPrefix}-${g.key}-${o.value}`.replace(/\s+/g, "-");
              const checked = filters[g.key]?.includes(o.value) ?? false;
              return (
                <div key={o.value} className="flex min-h-[40px] items-center gap-3">
                  <input
                    id={id}
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggle(g.key, o.value)}
                    className="h-[18px] w-[18px] shrink-0 cursor-pointer rounded-[3px] accent-forest-700"
                  />
                  <label htmlFor={id} className="flex flex-1 cursor-pointer items-center justify-between gap-2 py-2 text-[14.5px]">
                    <span>{o.label}</span>
                    <span className="text-[12.5px] text-muted">{o.count}</span>
                  </label>
                </div>
              );
            })}
          </fieldset>
        </details>
      ))}
    </div>
  );
}

function FilterSheet({ children, onClose, count, onClear }: { children: ReactNode; onClose: () => void; count: number; onClear: () => void }) {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.querySelector<HTMLElement>("button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && ref.current) {
        const f = ref.current.querySelectorAll<HTMLElement>("button, input, summary");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] lg:hidden" role="dialog" aria-modal="true" aria-labelledby="filter-sheet-title">
      <div className="anim-fade absolute inset-0 bg-forest-900/50" onClick={onClose} aria-hidden />
      <div ref={ref} className="anim-sheet absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col rounded-t-md bg-ivory">
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <h2 id="filter-sheet-title" className="text-[17px] font-bold">
            {t.products.filters}
          </h2>
          <button type="button" onClick={onClose} aria-label={t.products.closeFilters} className="inline-flex h-11 w-11 items-center justify-center rounded-sm hover:bg-green-50">
            <Close size={22} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-2">{children}</div>
        <div className="flex gap-3 border-t border-line p-4" style={{ paddingBottom: "max(16px, env(safe-area-inset-bottom))" }}>
          <Button variant="secondary" size="sm" className="flex-1" onClick={onClear}>
            {t.products.clearAll}
          </Button>
          <Button size="sm" className="flex-[1.6]" onClick={onClose}>
            {t.products.show(count)}
          </Button>
        </div>
      </div>
    </div>
  );
}
