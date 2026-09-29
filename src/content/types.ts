/**
 * Content model (handoff §20). Every business fact rendered by the UI comes
 * from these entities — pages never hard-code products, certificates,
 * capacities, ports or markets.
 *
 * `verified: false` marks illustrative data that must be replaced with
 * company-verified data before production (§1, §23, §25).
 */

export type CategoryKey = "coffee" | "rice" | "cashew" | "pepper" | "fruits" | "spices";

export type ImageKind = "origin" | "product" | "factory" | "human" | "logistics";

/** Shape hint used by the placeholder artwork for product macro shots. */
export type Motif = "bean" | "cherry" | "grain" | "kernel" | "peppercorn" | "fruit" | "stick" | "star" | "leaf";

export interface MediaAsset {
  /** Real photo path/URL. When empty the UI renders a labelled placeholder. */
  src?: string;
  alt: string;
  kind: ImageKind;
  motif?: Motif;
  /** Short art-direction note shown on placeholders, e.g. "Aerial – coffee farms, Dak Lak". */
  caption?: string;
  /** Focal point for editorial crops (object-position). */
  focal?: string;
}

export interface Category {
  key: CategoryKey;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  intro: string;
  image: MediaAsset;
  subcategories: string[];
  /** Grade / spec options offered in RFQ step 2 when a product has none. */
  rfqGrades: string[];
  buyingNotes: { label: string; value: string }[];
}

export type SpecValue = string | number | null;

export interface SpecField {
  key: string;
  label: string;
  unit?: string;
  /** Prefix such as "≤" / "≥" for limits. */
  prefix?: string;
  help?: string;
}

export interface Packing {
  id: string;
  name: string;
  netWeight: string;
  material: string;
  /** Loading per container, e.g. "19.2 MT / 20 ft". */
  loading?: string;
  privateLabel?: boolean;
}

export interface Product {
  slug: string;
  category: CategoryKey;
  name: string;
  shortDescription: string;
  overview: string;
  originIds: string[];
  crop: string;
  processing: string[];
  grade?: string;
  /** Category-specific specification (rendered through specSchemas). */
  spec: Record<string, SpecValue>;
  /** Filter facets */
  facets: {
    /** Canonical (English) processing values — filled by the data layer. */
    processing?: string[];
    grade?: string;
    certifications: string[];
    packaging: string[];
    availability?: string;
  };
  packings: Packing[];
  /** 12 values, Jan–Dec: 0 = off-season, 1 = available, 2 = peak harvest */
  seasonality: number[];
  certificateIds: string[];
  documentIds: string[];
  facilityId?: string;
  loadingPorts: string[];
  incoterms: string[];
  moq?: string;
  rfqGrades?: string[];
  featured?: boolean;
  image: MediaAsset;
  gallery: MediaAsset[];
  verified: boolean;
}

export interface Origin {
  slug: string;
  name: string;
  region: string;
  provinces: string[];
  /** [lon, lat] */
  coordinates: [number, number];
  crops: string[];
  harvest: string;
  harvestMonths: number[];
  climate: string;
  altitude: string;
  soil: string;
  processing: string[];
  summary: string;
  story: string;
  proof: { title: string; body: string }[];
  image: MediaAsset;
  gallery: MediaAsset[];
  verified: boolean;
}

export interface Metric {
  id: string;
  value: string;
  label: string;
  definition?: string;
  owner?: string;
  period?: string;
  verified: boolean;
}

export interface Facility {
  id: string;
  name: string;
  shortName: string;
  type: string;
  address: string;
  province: string;
  portDistance?: string;
  products: CategoryKey[];
  metrics: Metric[];
  processes: { title: string; body: string }[];
  equipment: string[];
  certificateIds: string[];
  image: MediaAsset;
  gallery: MediaAsset[];
  verified: boolean;
}

export type CertificateStatus = "valid" | "renewal-pending" | "expired";

export interface Certificate {
  id: string;
  scheme: string;
  schemeShort: string;
  entity: string;
  facilityId?: string;
  scope: string;
  products: CategoryKey[];
  number?: string;
  issued: string;
  expires: string;
  status: CertificateStatus;
  documentId?: string;
  verificationUrl?: string;
  claimRule: string;
  verified: boolean;
}

export type DocumentType =
  | "Specification"
  | "Certificate"
  | "Sample COA"
  | "Catalog"
  | "Buyer guide"
  | "Policy"
  | "Company profile";

export interface DocumentItem {
  id: string;
  type: DocumentType;
  title: string;
  description?: string;
  productSlugs: string[];
  facilityId?: string;
  locale: string;
  version: string;
  publishedAt: string;
  /** Watermarked reference-only document. */
  sample?: boolean;
  access: "public" | "on-request";
  verified: boolean;
}

export type InsightPillar =
  | "Crop outlook"
  | "Product education"
  | "Import guide"
  | "Origin insight"
  | "Quality guide"
  | "Market update";

export type InsightBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "note"; text: string };

export interface Insight {
  slug: string;
  title: string;
  pillar: InsightPillar;
  summary: string;
  body: InsightBlock[];
  relatedProducts: string[];
  publishedAt: string;
  readingMinutes: number;
  reviewedBy?: string;
  cta: { label: string; href: string };
  image: MediaAsset;
}
