import type { Locale } from "@/i18n/config";
import type { company, contacts, markets, offices, sustainabilityMetrics, trustMetrics } from "../company";
import { type DocStrings, docStringsEn, docStringsVi } from "../documents";
import type {
  containerLoading,
  exportDocuments,
  incoterms,
  labCapabilities,
  leadTimes,
  ports,
  qcSteps,
  shippingModes,
  supplyChainSteps,
  valueChain,
} from "../operations";
import type { Category, CategoryKey, Certificate, Facility, Insight, Origin, Product } from "../types";
import type { DeepPartial } from "./types";
import { categoriesVi } from "./vi/categories";
import { certificatesVi } from "./vi/certificates";
import { companyVi } from "./vi/company";
import { facilitiesVi } from "./vi/facilities";
import { insightsVi } from "./vi/insights";
import { facetLabelsVi, specLabelsVi } from "./vi/labels";
import { operationsVi } from "./vi/operations";
import { originsVi } from "./vi/origins";
import { productsVi } from "./vi/products";

export interface ContentOverlay {
  products?: Record<string, DeepPartial<Product>>;
  categories?: Partial<Record<CategoryKey, DeepPartial<Category>>>;
  origins?: Record<string, DeepPartial<Origin>>;
  facilities?: Record<string, DeepPartial<Facility>>;
  certificates?: Record<string, DeepPartial<Certificate>>;
  insights?: Record<string, DeepPartial<Insight>>;
  company?: {
    company?: DeepPartial<typeof company>;
    trustMetrics?: DeepPartial<typeof trustMetrics>;
    contacts?: DeepPartial<typeof contacts>;
    offices?: DeepPartial<typeof offices>;
    markets?: DeepPartial<typeof markets>;
    sustainabilityMetrics?: DeepPartial<typeof sustainabilityMetrics>;
  };
  operations?: {
    valueChain?: DeepPartial<typeof valueChain>;
    supplyChainSteps?: DeepPartial<typeof supplyChainSteps>;
    qcSteps?: DeepPartial<typeof qcSteps>;
    labCapabilities?: DeepPartial<typeof labCapabilities>;
    shippingModes?: DeepPartial<typeof shippingModes>;
    containerLoading?: DeepPartial<typeof containerLoading>;
    ports?: DeepPartial<typeof ports>;
    incoterms?: DeepPartial<typeof incoterms>;
    exportDocuments?: DeepPartial<typeof exportDocuments>;
    leadTimes?: DeepPartial<typeof leadTimes>;
  };
  specLabels?: Partial<Record<CategoryKey, Record<string, { label: string; help?: string }>>>;
  facetLabels?: Record<string, string>;
  docStrings: DocStrings;
}

export const overlays: Record<Locale, ContentOverlay> = {
  en: { docStrings: docStringsEn },
  vi: {
    products: productsVi,
    categories: categoriesVi,
    origins: originsVi,
    facilities: facilitiesVi,
    certificates: certificatesVi,
    insights: insightsVi,
    company: companyVi,
    operations: operationsVi,
    specLabels: specLabelsVi,
    facetLabels: facetLabelsVi,
    docStrings: docStringsVi,
  },
};
