import type { Category } from "./types";

export const categories: Category[] = [
  {
    key: "coffee",
    slug: "coffee",
    name: "Green Coffee",
    shortName: "Coffee",
    tagline: "Robusta and Arabica from the Central Highlands and Lam Dong.",
    intro:
      "Export-grade green coffee sorted by screen size and defect count, cleaned or wet-polished to buyer specification. Robusta from Dak Lak and Gia Lai; washed Arabica from the Cau Dat plateau.",
    image: {
      kind: "product",
      motif: "bean",
      alt: "Green robusta coffee beans, macro",
      caption: "Product macro – green robusta beans",
    },
    subcategories: ["Robusta", "Arabica", "Fine Robusta", "Specialty lots"],
    rfqGrades: ["Grade 1 · Screen 18", "Grade 1 · Screen 16", "Grade 2 · Screen 13", "Fine Robusta (honey / washed)"],
    buyingNotes: [
      { label: "Main harvest", value: "Nov – Jan" },
      { label: "Typical packing", value: "60 kg jute · bulk liner" },
      { label: "Load per 20 ft", value: "≈ 19.2 MT (bagged)" },
    ],
  },
  {
    key: "rice",
    slug: "rice",
    name: "Rice",
    shortName: "Rice",
    tagline: "Fragrant, long-grain and glutinous rice from the Mekong Delta.",
    intro:
      "Milled and sortexed long-grain, fragrant and glutinous rice from the Mekong Delta. Specified by variety, broken percentage and moisture, packed for distributors or private label.",
    image: {
      kind: "product",
      motif: "grain",
      alt: "Long-grain white rice, macro",
      caption: "Product macro – long-grain fragrant rice",
    },
    subcategories: ["Fragrant rice (ST varieties)", "Jasmine", "Long grain white", "Glutinous"],
    rfqGrades: ["5% broken", "10% broken", "15% broken", "100% whole grain (premium)"],
    buyingNotes: [
      { label: "Main crops", value: "Winter–spring · Summer–autumn" },
      { label: "Typical packing", value: "25 / 50 kg PP · 1–5 kg retail" },
      { label: "Load per 20 ft", value: "≈ 25 MT" },
    ],
  },
  {
    key: "cashew",
    slug: "cashew",
    name: "Cashew Kernels",
    shortName: "Cashew",
    tagline: "White whole and split kernels graded to AFI reference.",
    intro:
      "Cashew kernels processed, graded and vacuum-packed in Binh Phuoc. Whole and split grades referenced to AFI specifications, with optional roasted and salted lines.",
    image: {
      kind: "product",
      motif: "kernel",
      alt: "White whole cashew kernels, macro",
      caption: "Product macro – W320 cashew kernels",
    },
    subcategories: ["White wholes", "Splits & pieces", "Scorched", "Roasted"],
    rfqGrades: ["W180", "W240", "W320", "W450", "WS / LP"],
    buyingNotes: [
      { label: "Processing", value: "Year-round" },
      { label: "Typical packing", value: "Vacuum tin / bag 22.68 kg" },
      { label: "Load per 20 ft", value: "≈ 700 cartons" },
    ],
  },
  {
    key: "pepper",
    slug: "pepper",
    name: "Pepper",
    shortName: "Pepper",
    tagline: "Black and white pepper, cleaned or steam-sterilised.",
    intro:
      "Black and white pepper specified by bulk density (g/l), moisture and extraneous matter. Machine-cleaned or steam-sterilised (ASTA-style cleaning) for food-manufacturing buyers.",
    image: {
      kind: "product",
      motif: "peppercorn",
      alt: "Black peppercorns, macro",
      caption: "Product macro – black pepper 550 g/l",
    },
    subcategories: ["Black pepper", "White pepper", "Steam-sterilised", "Ground"],
    rfqGrades: ["500 g/l FAQ", "550 g/l", "570 g/l cleaned", "White 630 g/l", "ASTA-style cleaned"],
    buyingNotes: [
      { label: "Main harvest", value: "Feb – May" },
      { label: "Typical packing", value: "25 / 50 kg PP bags" },
      { label: "Load per 20 ft", value: "≈ 15–18 MT" },
    ],
  },
  {
    key: "fruits",
    slug: "fruits",
    name: "Fresh & Frozen Fruits",
    shortName: "Fruits",
    tagline: "Dragon fruit, mango and durian — fresh or frozen.",
    intro:
      "Fresh fruit packed from registered growing areas and packhouses, plus IQF frozen lines. Specified by variety, size/count, Brix and storage temperature. Import eligibility depends on commodity and destination.",
    image: {
      kind: "product",
      motif: "fruit",
      alt: "Fresh white-flesh dragon fruit",
      caption: "Product macro – white-flesh dragon fruit",
    },
    subcategories: ["Dragon fruit", "Mango", "Durian (frozen)", "Pomelo"],
    rfqGrades: ["Size by count (per carton)", "Premium / Class I", "Class II", "Frozen IQF"],
    buyingNotes: [
      { label: "Availability", value: "Seasonal — see calendar" },
      { label: "Typical packing", value: "Cartons, reefer" },
      { label: "Load per 40 ft RF", value: "≈ 20 pallets" },
    ],
  },
  {
    key: "spices",
    slug: "spices",
    name: "Spices",
    shortName: "Spices",
    tagline: "Cassia cinnamon and star anise from the northern mountains.",
    intro:
      "Cassia cinnamon and star anise from Yen Bai and Lang Son. Specified by form, length, volatile oil and moisture; available as whole, broken, cut or powder for spice processors.",
    image: {
      kind: "product",
      motif: "stick",
      alt: "Split cassia cinnamon bark",
      caption: "Product macro – split cassia",
    },
    subcategories: ["Cassia cinnamon", "Star anise", "Cassia powder"],
    rfqGrades: ["Split cassia 2–3% oil", "Tube / stick cassia", "Star anise — spring crop", "Star anise — autumn crop"],
    buyingNotes: [
      { label: "Main harvest", value: "Cassia: Mar–May · Anise: Aug–Oct" },
      { label: "Typical packing", value: "Cartons 10–15 kg · PP bags" },
      { label: "Load per 40 ft", value: "≈ 12–16 MT" },
    ],
  },
];
