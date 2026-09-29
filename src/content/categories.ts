import type { Category } from "./types";

export const categories: Category[] = [
  {
    key: "coffee",
    slug: "coffee",
    name: "Coffee",
    shortName: "Coffee",
    tagline: "Robusta and Arabica from the Central Highlands and Lam Dong.",
    intro:
      "Export-grade coffee sorted by screen size and defect count, cleaned or wet-polished to buyer specification. Robusta from Dak Lak and Gia Lai; washed Arabica from the Cau Dat plateau.",
    image: { src: "/images/coffee/beans-closeup.jpg", kind: "product", motif: "bean", alt: "Close-up of coffee beans", focal: "50% 45%" },
    subcategories: ["Robusta", "Arabica", "Fine Robusta", "Specialty lots"],
    rfqGrades: ["Grade 1 · Screen 18", "Grade 1 · Screen 16", "Grade 2 · Screen 13", "Fine Robusta (honey / washed)"],
    buyingNotes: [
      { label: "Main harvest", value: "Nov – Jan" },
      { label: "Typical packing", value: "60 kg jute · bulk liner" },
      { label: "Load per 20 ft", value: "≈ 19.2 MT (bagged)" },
    ],
  },
  {
    key: "cashew",
    slug: "cashew",
    name: "Cashew Kernels",
    shortName: "Cashew",
    tagline: "White whole and split kernels graded to AFI reference.",
    intro:
      "Cashew kernels processed, graded and vacuum-packed in the southeast cashew belt. Whole and split grades referenced to AFI specifications, with optional roasted and salted lines.",
    image: { src: "/images/cashew/bowl-red.jpg", kind: "product", motif: "kernel", alt: "Cashew kernels in a bowl", focal: "50% 60%" },
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
    image: { src: "/images/pepper/bowl-anise.jpg", kind: "product", motif: "peppercorn", alt: "Black peppercorns in a wooden dish", focal: "35% 50%" },
    subcategories: ["Black pepper", "White pepper", "Steam-sterilised", "Ground"],
    rfqGrades: ["500 g/l FAQ", "550 g/l", "570 g/l cleaned", "White 630 g/l", "ASTA-style cleaned"],
    buyingNotes: [
      { label: "Main harvest", value: "Feb – May" },
      { label: "Typical packing", value: "25 / 50 kg PP bags" },
      { label: "Load per 20 ft", value: "≈ 15–18 MT" },
    ],
  },
  {
    key: "cinnamon",
    slug: "cinnamon",
    name: "Cassia Cinnamon",
    shortName: "Cinnamon",
    tagline: "Split, stick and ground cassia from Yen Bai.",
    intro:
      "Vietnamese cassia (Cinnamomum cassia) from 10–15-year-old trees in the northern mountains. Specified by form, length, volatile oil and moisture — split, tube/stick, broken or powder.",
    image: { src: "/images/cinnamon/stack.jpg", kind: "product", motif: "stick", alt: "Stacked cassia cinnamon sticks", focal: "50% 50%" },
    subcategories: ["Split cassia", "Stick / tube cassia", "Broken cassia", "Cassia powder"],
    rfqGrades: ["Split cassia 2–3% oil", "Stick cassia 8 cm", "Tube cassia 30–40 cm", "Cassia powder 60 mesh"],
    buyingNotes: [
      { label: "Main harvest", value: "Mar – May · Aug – Oct" },
      { label: "Typical packing", value: "Cartons 10–15 kg · PP bags" },
      { label: "Load per 40 ft", value: "≈ 12–16 MT" },
    ],
  },
  {
    key: "anise",
    slug: "star-anise",
    name: "Star Anise",
    shortName: "Star anise",
    tagline: "Whole and broken star anise from Lang Son.",
    intro:
      "Star anise (Illicium verum) from Lang Son, with a spring and an autumn crop. Graded by proportion of whole stars, size and colour, sun-dried to safe moisture for sea freight.",
    image: { src: "/images/anise/top-view.jpg", kind: "product", motif: "star", alt: "Whole star anise, top view", focal: "50% 50%" },
    subcategories: ["Autumn crop", "Spring crop", "Broken / FAQ", "Star anise powder"],
    rfqGrades: ["Autumn crop · ≥ 80% whole", "Spring crop · ≥ 70% whole", "Broken / FAQ", "Star anise powder"],
    buyingNotes: [
      { label: "Main harvest", value: "Autumn: Aug – Oct · Spring: Feb – Apr" },
      { label: "Typical packing", value: "Cartons 10 kg · PP bags 20 kg" },
      { label: "Load per 40 ft", value: "≈ 10–12 MT" },
    ],
  },
  {
    key: "mango",
    slug: "dried-mango",
    name: "Soft Dried Mango",
    shortName: "Dried mango",
    tagline: "Chewy dried mango slices — bulk and Owi Chewi retail packs.",
    intro:
      "Soft dried mango from Mekong Delta mangoes, sliced, gently dried and packed for snack brands, food service and retail. Available in bulk cartons or as Owi Chewi retail pouches and private label.",
    image: { src: "/images/mango/bowl-2.jpg", kind: "product", motif: "fruit", alt: "Bowl of soft dried mango slices", focal: "50% 50%" },
    subcategories: ["Soft dried mango", "Low-sugar", "Bulk for food service", "Retail / private label"],
    rfqGrades: ["Soft dried mango · slices", "Low-sugar dried mango", "Dried mango · dices", "Owi Chewi retail pouch"],
    buyingNotes: [
      { label: "Fresh mango season", value: "Mar – Jun (main)" },
      { label: "Typical packing", value: "10 kg cartons · 100–500 g pouches" },
      { label: "Load per 20 ft", value: "≈ 8–10 MT (cartons)" },
    ],
  },
];
