import type { Metric } from "./types";

/**
 * Corporate identity & contacts. Company name, registration and head-office
 * address are supplied by the company; emails / phones are still placeholders.
 */
export const company = {
  brand: "TrustVN",
  brandShort: "TrustVN",
  /** Retail brand of the company (logo used in header / footer). */
  retailBrand: "Owi Chewi",
  logo: "/brand/owi-chewi.svg",
  legalName: "TrustVN",
  registration: "Enterprise code: Not yet available",
  tagline: "Vietnam Origin. Global Supply.",
  founded: 2008,
  headquarters: "17A1 Street 9, Tang Nhon Phu, Ho Chi Minh City, Vietnam",
  salesEmail: "export@example.com",
  phone: "+84 (0)28 0000 0000",
  whatsapp: "+84 900 000 000",
  hours: "Mon – Fri, 08:00 – 17:30 ICT (UTC+7)",
  /** Public response SLA. `null` = do not promise a response time (§16.2). */
  responseSla: null as string | null,
  /** Show the "illustrative data" preview banner until verified data is loaded. */
  previewNotice: true,
};

/** Trust strip (§7.2) — each metric has a data owner and production rule. */
export const trustMetrics: Metric[] = [
  {
    id: "markets",
    value: "35+",
    label: "Export markets",
    owner: "Sales / Export",
    definition: "Countries with shipped commercial orders (not target markets)",
    verified: false,
  },
  {
    id: "capacity",
    value: "74,000 MT",
    label: "Annual processing capacity",
    owner: "Operations",
    definition: "Nameplate, all facilities, per year",
    verified: false,
  },
  { id: "years", value: "18", label: "Years exporting", owner: "Corporate", definition: "Since 2008 (founded year)", verified: false },
  { id: "products", value: "6", label: "Product categories", owner: "Product", definition: "Categories with active export SKUs", verified: false },
];

export const contacts = [
  {
    team: "Coffee & Pepper desk",
    region: "Europe · Americas",
    name: "[Sales manager name]",
    email: "coffee@example.com",
    phone: "+84 900 000 001",
    languages: "English, German",
  },
  {
    team: "Cashew & Dried mango desk",
    region: "Asia · Middle East · Oceania",
    name: "[Sales manager name]",
    email: "cashew-mango@example.com",
    phone: "+84 900 000 002",
    languages: "English, Chinese",
  },
  {
    team: "Cinnamon & Star anise desk",
    region: "All markets",
    name: "[Sales manager name]",
    email: "spices@example.com",
    phone: "+84 900 000 003",
    languages: "English, Korean",
  },
  {
    team: "Quality & Compliance",
    region: "Supplier approval, audits, documents",
    name: "[QA manager name]",
    email: "qa@example.com",
    phone: "+84 900 000 004",
    languages: "English",
  },
];

export const offices = [
  { name: "Head office & export sales", address: company.headquarters, note: "Sales, QA/compliance, logistics" },
  { name: "Coffee processing plant", address: "[Verified address], Buon Ma Thuot, Dak Lak", note: "Visits by appointment" },
  { name: "Cashew processing plant", address: "[Verified address], Dong Xoai, Dong Nai", note: "Visits by appointment" },
  { name: "Dried fruit plant", address: "[Verified address], Cao Lanh, Dong Thap", note: "Visits by appointment" },
];

/** Global reach (Home). Split confirmed shipments vs target markets (§25 Markets). */
export const markets = [
  { region: "Europe", countries: ["Germany", "Netherlands", "Belgium", "Italy", "Spain", "Poland", "United Kingdom"], confirmed: true },
  { region: "North America", countries: ["United States", "Canada"], confirmed: true },
  { region: "East Asia", countries: ["Japan", "South Korea", "China", "Taiwan"], confirmed: true },
  { region: "Middle East", countries: ["UAE", "Saudi Arabia", "Türkiye"], confirmed: true },
  { region: "Oceania", countries: ["Australia", "New Zealand"], confirmed: true },
  { region: "Africa", countries: ["Ghana", "South Africa"], confirmed: false },
];

export const sustainabilityMetrics: (Metric & { scope: string; baseline?: string })[] = [
  {
    id: "traceable",
    value: "82%",
    label: "of coffee volume traceable to farmer group",
    period: "FY2026",
    scope: "Green coffee purchased at the Dak Lak plant",
    definition: "Volume with farmer-group ID recorded at intake ÷ total coffee intake",
    verified: false,
  },
  {
    id: "growers",
    value: "1,200",
    label: "partner growers in the farmer programme",
    period: "Crop 2025/26",
    scope: "Coffee & pepper, Dak Lak and Gia Lai",
    definition: "Registered growers who received training or inputs",
    verified: false,
  },
  {
    id: "energy",
    value: "−14%",
    label: "energy per tonne processed",
    period: "FY2026 vs FY2023 baseline",
    scope: "Dak Lak coffee plant",
    baseline: "FY2023",
    definition: "kWh per MT of green coffee output",
    verified: false,
  },
  {
    id: "packaging",
    value: "65%",
    label: "recyclable or certified packaging by weight",
    period: "FY2026",
    scope: "Export packing materials, all facilities",
    definition: "Mono-material PP/PE, jute and FSC cartons ÷ total packaging weight",
    verified: false,
  },
];
