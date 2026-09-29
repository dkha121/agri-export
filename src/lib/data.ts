/**
 * Data access layer. Pages read content only through a locale-bound `Db`
 * (see `createDb`) so the static content modules can later be swapped for a
 * headless CMS without touching UI components (§20, §21). Localised content
 * is the canonical English data merged with the locale overlay.
 */
import { categories as baseCategories } from "@/content/categories";
import { certificates as baseCertificates } from "@/content/certificates";
import * as baseCompany from "@/content/company";
import { buildDocuments } from "@/content/documents";
import { facilities as baseFacilities } from "@/content/facilities";
import { overlays } from "@/content/i18n";
import { deepMerge } from "@/content/i18n/types";
import { insights as baseInsights } from "@/content/insights";
import * as baseOps from "@/content/operations";
import { origins as baseOrigins } from "@/content/origins";
import { products as baseProducts } from "@/content/products";
import { cardSpecKeys, specSchemas } from "@/content/spec-schemas";
import type { CategoryKey, Product, SpecField, SpecValue } from "@/content/types";
import type { Locale } from "@/i18n/config";

export interface SpecRow {
  key: string;
  label: string;
  value: string | null;
  help?: string;
}

export interface FilterGroup {
  key: string;
  label: string;
  options: { value: string; label: string; count: number }[];
}

export const productHref = (p: Pick<Product, "category" | "slug">) => `/products/${p.category}/${p.slug}`;

export function formatSpecValue(field: SpecField, value: SpecValue): string | null {
  if (value === null || value === undefined || value === "") return null;
  const prefix = field.prefix && typeof value === "number" ? `${field.prefix} ` : "";
  const unit = field.unit && typeof value === "number" ? (field.unit === "%" ? "%" : ` ${field.unit}`) : "";
  return `${prefix}${value}${unit}`;
}

const uniq = <T,>(arr: T[]) => [...new Set(arr)];

function build(locale: Locale) {
  const ov = overlays[locale];

  const categories = baseCategories.map((c) => deepMerge(c, ov.categories?.[c.key]));
  // Keep canonical (English) processing values as filter facets.
  const products = baseProducts.map((p) => {
    const merged = deepMerge(p, ov.products?.[p.slug]);
    return { ...merged, facets: { ...p.facets, processing: p.processing } };
  });
  const origins = baseOrigins.map((o) => deepMerge(o, ov.origins?.[o.slug]));
  const facilities = baseFacilities.map((f) => deepMerge(f, ov.facilities?.[f.id]));
  const certificates = baseCertificates.map((c) => deepMerge(c, ov.certificates?.[c.id]));
  const insights = baseInsights
    .map((i) => deepMerge(i, ov.insights?.[i.slug]))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const documents = buildDocuments(products, certificates, ov.docStrings);

  const oc = ov.company ?? {};
  const company = {
    company: deepMerge(baseCompany.company, oc.company),
    trustMetrics: deepMerge(baseCompany.trustMetrics, oc.trustMetrics),
    contacts: deepMerge(baseCompany.contacts, oc.contacts),
    offices: deepMerge(baseCompany.offices, oc.offices),
    markets: deepMerge(baseCompany.markets, oc.markets),
    sustainabilityMetrics: deepMerge(baseCompany.sustainabilityMetrics, oc.sustainabilityMetrics),
  };
  const oo = ov.operations ?? {};
  const ops = {
    valueChain: deepMerge(baseOps.valueChain, oo.valueChain),
    supplyChainSteps: deepMerge(baseOps.supplyChainSteps, oo.supplyChainSteps),
    qcSteps: deepMerge(baseOps.qcSteps, oo.qcSteps),
    labCapabilities: deepMerge(baseOps.labCapabilities, oo.labCapabilities),
    shippingModes: deepMerge(baseOps.shippingModes, oo.shippingModes),
    containerLoading: deepMerge(baseOps.containerLoading, oo.containerLoading),
    ports: deepMerge(baseOps.ports, oo.ports),
    incoterms: deepMerge(baseOps.incoterms, oo.incoterms),
    exportDocuments: deepMerge(baseOps.exportDocuments, oo.exportDocuments),
    leadTimes: deepMerge(baseOps.leadTimes, oo.leadTimes),
  };

  const schemas = Object.fromEntries(
    (Object.keys(specSchemas) as CategoryKey[]).map((k) => [
      k,
      specSchemas[k].map((f) => ({ ...f, ...(ov.specLabels?.[k]?.[f.key] ?? {}) })),
    ]),
  ) as Record<CategoryKey, SpecField[]>;

  // Map canonical processing values → localised labels (derived from product pairs).
  const processingLabels: Record<string, string> = {};
  baseProducts.forEach((p, i) => p.processing.forEach((v, j) => (processingLabels[v] = products[i].processing[j] ?? v)));
  const facetLabel = (v: string) => processingLabels[v] ?? ov.facetLabels?.[v] ?? v;

  return { categories, products, origins, facilities, certificates, insights, documents, company, ops, schemas, facetLabel };
}

export type Db = ReturnType<typeof createDb>;

const cache = new Map<Locale, ReturnType<typeof makeDb>>();

export function createDb(locale: Locale) {
  if (!cache.has(locale)) cache.set(locale, makeDb(locale));
  return cache.get(locale)!;
}

function makeDb(locale: Locale) {
  const d = build(locale);

  const getSpecRows = (product: Product): SpecRow[] =>
    d.schemas[product.category].map((field) => ({
      key: field.key,
      label: field.label,
      help: field.help,
      value: formatSpecValue(field, product.spec[field.key] ?? null),
    }));

  return {
    locale,
    ...d.company,
    ops: d.ops,
    getCategories: () => d.categories,
    getCategory: (slug: string) => d.categories.find((c) => c.slug === slug || c.key === slug),
    getProducts: () => d.products,
    getProduct: (slug: string) => d.products.find((p) => p.slug === slug),
    getProductsByCategory: (key: CategoryKey) => d.products.filter((p) => p.category === key),
    getFeaturedProducts: () => d.products.filter((p) => p.featured),
    getProductsByOrigin: (originSlug: string) => d.products.filter((p) => p.originIds.includes(originSlug)),
    getOrigins: () => d.origins,
    getOrigin: (slug: string) => d.origins.find((o) => o.slug === slug),
    getFacilities: () => d.facilities,
    getFacility: (id?: string) => d.facilities.find((f) => f.id === id),
    getCertificates: () => d.certificates,
    getCertificatesByIds: (ids: string[]) => d.certificates.filter((c) => ids.includes(c.id)),
    /** Only non-expired certificates may be claimed publicly (§12.1 claim rule). */
    getClaimableCertificates: (ids: string[]) => d.certificates.filter((c) => ids.includes(c.id) && c.status !== "expired"),
    getDocuments: () => d.documents,
    getDocument: (id: string) => d.documents.find((x) => x.id === id),
    getDocumentsByIds: (ids: string[]) =>
      ids.map((id) => d.documents.find((x) => x.id === id)).filter((x): x is NonNullable<typeof x> => Boolean(x)),
    getInsights: () => d.insights,
    getInsight: (slug: string) => d.insights.find((i) => i.slug === slug),
    getSpecRows,
    getCardSpecRows: (product: Product) => getSpecRows(product).filter((r) => cardSpecKeys[product.category].includes(r.key)),
    facetLabel: d.facetLabel,
    getProductFacets: (list: Product[], labels: Record<string, string>): FilterGroup[] => {
      const count = (pred: (p: Product) => boolean) => list.filter(pred).length;
      const originOptions = d.origins
        .map((o) => ({ value: o.slug, label: o.name, count: count((p) => p.originIds.includes(o.slug)) }))
        .filter((o) => o.count > 0);
      const processing = uniq(list.flatMap((p) => p.facets.processing ?? [])).sort();
      const grades = uniq(list.map((p) => p.facets.grade).filter(Boolean) as string[]);
      const certs = uniq(list.flatMap((p) => p.facets.certifications)).sort();
      const packaging = uniq(list.flatMap((p) => p.facets.packaging)).sort();
      const availability = uniq(list.map((p) => p.facets.availability).filter(Boolean) as string[]);
      const opt = (v: string, n: number) => ({ value: v, label: d.facetLabel(v), count: n });
      return [
        {
          key: "category",
          label: labels.category,
          options: d.categories.map((c) => ({ value: c.key, label: c.shortName, count: count((p) => p.category === c.key) })),
        },
        { key: "origin", label: labels.origin, options: originOptions },
        { key: "processing", label: labels.processing, options: processing.map((v) => opt(v, count((p) => (p.facets.processing ?? []).includes(v)))) },
        { key: "grade", label: labels.grade, options: grades.map((v) => opt(v, count((p) => p.facets.grade === v))) },
        { key: "certification", label: labels.certification, options: certs.map((v) => opt(v, count((p) => p.facets.certifications.includes(v)))) },
        { key: "packaging", label: labels.packaging, options: packaging.map((v) => opt(v, count((p) => p.facets.packaging.includes(v)))) },
        { key: "availability", label: labels.availability, options: availability.map((v) => opt(v, count((p) => p.facets.availability === v))) },
      ].filter((g) => g.options.length > 0);
    },
  };
}
