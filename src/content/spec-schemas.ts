import type { CategoryKey, SpecField } from "./types";

/**
 * Category-specific specification schemas (§9.2, §20.1).
 * The frontend renders spec rows from this ordered config — one schema per
 * category instead of a single rigid table.
 */
const spiceSchema: SpecField[] = [
  { key: "form", label: "Form" },
  { key: "size", label: "Length / size" },
  { key: "moistureMax", label: "Moisture", unit: "%", prefix: "≤" },
  { key: "oilContent", label: "Volatile oil", unit: "%", prefix: "≥" },
  { key: "admixtureMax", label: "Admixture", unit: "%", prefix: "≤" },
  { key: "processing", label: "Processing" },
  { key: "packing", label: "Packing" },
  { key: "shelfLife", label: "Shelf life" },
];

export const specSchemas: Record<CategoryKey, SpecField[]> = {
  coffee: [
    { key: "species", label: "Species" },
    { key: "grade", label: "Grade" },
    { key: "screen", label: "Screen size", help: "Retained on sieve, 1/64 inch" },
    { key: "moistureMax", label: "Moisture", unit: "%", prefix: "≤" },
    { key: "foreignMatterMax", label: "Foreign matter", unit: "%", prefix: "≤" },
    { key: "blackBrokenMax", label: "Black & broken", unit: "%", prefix: "≤" },
    { key: "processing", label: "Processing" },
    { key: "cropYear", label: "Crop" },
    { key: "packing", label: "Packing" },
    { key: "shelfLife", label: "Shelf life" },
  ],
  cashew: [
    { key: "grade", label: "Grade" },
    { key: "count", label: "Count", help: "Kernels per pound" },
    { key: "moistureMax", label: "Moisture", unit: "%", prefix: "≤" },
    { key: "brokenMax", label: "Broken / lower grade", unit: "%", prefix: "≤" },
    { key: "color", label: "Colour" },
    { key: "standard", label: "Grading reference" },
    { key: "packing", label: "Packing" },
    { key: "shelfLife", label: "Shelf life" },
  ],
  pepper: [
    { key: "type", label: "Type" },
    { key: "density", label: "Bulk density", unit: "g/l", prefix: "≥" },
    { key: "moistureMax", label: "Moisture", unit: "%", prefix: "≤" },
    { key: "extraneousMax", label: "Extraneous matter", unit: "%", prefix: "≤" },
    { key: "lightBerriesMax", label: "Light berries", unit: "%", prefix: "≤" },
    { key: "processing", label: "Processing" },
    { key: "micro", label: "Microbiology" },
    { key: "packing", label: "Packing" },
  ],
  cinnamon: spiceSchema,
  anise: spiceSchema,
  mango: [
    { key: "variety", label: "Mango variety" },
    { key: "cut", label: "Cut / slice" },
    { key: "moistureMax", label: "Moisture", unit: "%", prefix: "≤" },
    { key: "waterActivityMax", label: "Water activity (aw)", prefix: "≤" },
    { key: "sugar", label: "Added sugar" },
    { key: "additives", label: "Additives / preservatives" },
    { key: "texture", label: "Texture" },
    { key: "packing", label: "Packing" },
    { key: "shelfLife", label: "Shelf life" },
  ],
};

/** The three spec rows previewed on product cards, per category. */
export const cardSpecKeys: Record<CategoryKey, string[]> = {
  coffee: ["grade", "screen", "moistureMax"],
  cashew: ["grade", "count", "moistureMax"],
  pepper: ["density", "moistureMax", "processing"],
  cinnamon: ["form", "size", "oilContent"],
  anise: ["form", "size", "moistureMax"],
  mango: ["cut", "moistureMax", "sugar"],
};
