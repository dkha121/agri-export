import type { Product } from "@/content/types";

/** Pure filter helpers — safe to import in client components. */

export type ActiveFilters = Record<string, string[]>;

const match: Record<string, (p: Product, v: string) => boolean> = {
  category: (p, v) => p.category === v,
  origin: (p, v) => p.originIds.includes(v),
  processing: (p, v) => (p.facets.processing ?? p.processing).includes(v),
  grade: (p, v) => p.facets.grade === v,
  certification: (p, v) => p.facets.certifications.includes(v),
  packaging: (p, v) => p.facets.packaging.includes(v),
  availability: (p, v) => p.facets.availability === v,
};

/** OR within a group, AND across groups. */
export function filterProducts<T extends Product>(list: T[], filters: ActiveFilters): T[] {
  return list.filter((p) =>
    Object.entries(filters).every(([key, values]) => !values.length || !match[key] || values.some((v) => match[key](p, v))),
  );
}

export const FILTER_KEYS = Object.keys(match);

export function parseFilters(params: URLSearchParams): ActiveFilters {
  const out: ActiveFilters = {};
  for (const key of FILTER_KEYS) {
    const raw = params.get(key);
    if (raw) out[key] = raw.split(",").filter(Boolean);
  }
  return out;
}
