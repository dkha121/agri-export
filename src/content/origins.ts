import type { Origin } from "./types";

/**
 * Sourcing regions. Pins on the origin map are rendered ONLY from this list
 * (§7.4: "Pin chỉ hiển thị vùng sourcing thật").
 * Province names follow the 2025 administrative merger; former names are
 * kept in brackets because buyers still recognise them.
 */
export const origins: Origin[] = [
  {
    slug: "central-highlands",
    name: "Central Highlands",
    region: "Tay Nguyen plateau",
    provinces: ["Dak Lak", "Gia Lai", "Lam Dong (former Dak Nong)"],
    coordinates: [108.05, 12.67],
    crops: ["Robusta coffee", "Black pepper", "Durian"],
    harvest: "Coffee: Nov – Jan · Pepper: Feb – May",
    harvestMonths: [1, 2, 3, 4, 5, 11, 12],
    climate: "Tropical monsoon; distinct dry season Nov – Apr",
    altitude: "400 – 800 m",
    soil: "Red basalt (ferralsol), deep and well-drained",
    processing: ["Natural (dry) processed", "Wet-polished", "Machine-cleaned pepper"],
    summary:
      "Vietnam's robusta heartland. Basalt soils and a sharp dry season give dense beans and an efficient, concentrated harvest.",
    story:
      "Most coffee here is grown by smallholders on one to three hectares, often intercropped with pepper and durian. Collection points aggregate cherry and dried coffee from farmer groups before it reaches the processing plant, which is where lot identity is assigned.",
    proof: [
      {
        title: "Farmer-group sourcing",
        body: "Coffee is purchased through registered farmer groups; each delivery is recorded against the group ID before it enters the plant.",
      },
      {
        title: "Traceability methodology",
        body: "Lot codes link export containers back to processing batches and the farmer groups that supplied them. Geolocation of plots is available for in-scope EU buyers where collected and approved.",
      },
    ],
    image: {
      kind: "origin",
      alt: "Coffee farms on red basalt hills in Dak Lak",
      caption: "Aerial – coffee & pepper farms, Dak Lak",
    },
    gallery: [
      { kind: "human", alt: "Farmer harvesting ripe robusta cherries", caption: "Documentary – cherry harvest" },
      { kind: "product", motif: "cherry", alt: "Ripe robusta coffee cherries on the branch", caption: "Macro – ripe cherries" },
    ],
    verified: false,
  },
  {
    slug: "lam-dong",
    name: "Lam Dong Highlands",
    region: "Da Lat & Cau Dat plateau",
    provinces: ["Lam Dong"],
    coordinates: [108.45, 11.85],
    crops: ["Arabica coffee", "Fine Robusta"],
    harvest: "Arabica: Oct – Jan",
    harvestMonths: [1, 10, 11, 12],
    climate: "Cool highland climate, 18 – 22 °C average",
    altitude: "1,300 – 1,650 m (Cau Dat)",
    soil: "Volcanic and red-yellow ferralsol",
    processing: ["Washed", "Honey", "Natural"],
    summary:
      "Higher-altitude plateau producing washed Arabica and fine Robusta lots for roasters that need cup-driven specifications.",
    story:
      "Cau Dat has grown Arabica since the colonial era. Today small wet-mills process cherry the same day it is picked, and lots are kept separate by farm cluster for cupping and selection.",
    proof: [
      {
        title: "Lot separation",
        body: "Washed and honey lots are processed and stored separately by farm cluster and cupped before offer.",
      },
      {
        title: "Cupping protocol",
        body: "Pre-shipment samples are cupped against the approved type sample. Cupping forms available on request.",
      },
    ],
    image: {
      kind: "origin",
      alt: "Arabica farms on the Cau Dat plateau",
      caption: "Landscape – Arabica slopes, Cau Dat",
    },
    gallery: [
      { kind: "factory", alt: "Wet mill fermentation tanks", caption: "Wet mill – fermentation" },
      { kind: "product", motif: "bean", alt: "Washed Arabica parchment", caption: "Macro – washed parchment" },
    ],
    verified: false,
  },
  {
    slug: "mekong-delta",
    name: "Mekong Delta",
    region: "Cuu Long river delta",
    provinces: ["Can Tho (former Soc Trang)", "An Giang", "Dong Thap"],
    coordinates: [105.8, 9.9],
    crops: ["Fragrant rice (ST25)", "Jasmine rice", "Mango", "Pomelo"],
    harvest: "Rice: Feb – Apr · Jun – Aug · Mango: Mar – Jun",
    harvestMonths: [2, 3, 4, 5, 6, 7, 8],
    climate: "Tropical; rainy season May – Nov",
    altitude: "0 – 5 m",
    soil: "Alluvial clay; saline-affected in coastal districts",
    processing: ["Milled & polished", "Colour sorted", "Fresh packhouse"],
    summary:
      "Vietnam's rice bowl. Two to three crops per year and a dense canal network make it the logistics-friendly origin for rice and tropical fruit.",
    story:
      "Rice is bought as paddy from contracted cooperatives and milled close to harvest to protect aroma. ST varieties were bred in Soc Trang for fragrance and tolerance to salinity.",
    proof: [
      {
        title: "Contract farming",
        body: "Seed variety and planting calendar agreed with cooperatives before each crop — this is what protects varietal purity.",
      },
      {
        title: "Growing-area codes",
        body: "Fresh fruit exports use registered growing-area and packhouse codes where the destination market requires them.",
      },
    ],
    image: {
      kind: "origin",
      alt: "Rice paddies and canals in the Mekong Delta",
      caption: "Aerial – rice paddies & canals, Mekong Delta",
    },
    gallery: [
      { kind: "human", alt: "Farmers harvesting rice", caption: "Documentary – rice harvest" },
      { kind: "product", motif: "grain", alt: "Paddy rice close-up", caption: "Macro – paddy" },
    ],
    verified: false,
  },
  {
    slug: "southeast-cashew-belt",
    name: "Southeast Cashew Belt",
    region: "Dong Nai (former Binh Phuoc)",
    provinces: ["Dong Nai (former Binh Phuoc)"],
    coordinates: [106.9, 11.55],
    crops: ["Cashew", "Black pepper"],
    harvest: "Raw cashew: Feb – May · Processing year-round",
    harvestMonths: [2, 3, 4, 5],
    climate: "Tropical savanna, long dry season",
    altitude: "100 – 300 m",
    soil: "Grey and red-yellow ferralsol",
    processing: ["Steamed & shelled", "Peeled", "Graded", "Vacuum packed"],
    summary:
      "Vietnam's cashew processing cluster. Domestic raw nuts are blended with imported RCN; origin labelling follows the buyer market's rules.",
    story:
      "Binh Phuoc growers supply domestic raw cashew nut (RCN) during the dry season. Kernels are shelled, peeled, graded and vacuum-packed in the same cluster, close to Cat Lai and Cai Mep ports.",
    proof: [
      {
        title: "RCN origin disclosure",
        body: "Kernel lots declare RCN origin (Vietnam or imported) on the specification and COA — never assumed.",
      },
      {
        title: "Processing control",
        body: "Moisture, count and broken percentage checked per production batch before vacuum packing.",
      },
    ],
    image: {
      kind: "origin",
      alt: "Cashew orchards in Binh Phuoc",
      caption: "Landscape – cashew orchards",
    },
    gallery: [
      { kind: "factory", alt: "Cashew grading line", caption: "Factory – kernel grading" },
      { kind: "product", motif: "kernel", alt: "Cashew kernels", caption: "Macro – W240 kernels" },
    ],
    verified: false,
  },
  {
    slug: "binh-thuan-coast",
    name: "Binh Thuan Coast",
    region: "South-central coast",
    provinces: ["Lam Dong (former Binh Thuan)"],
    coordinates: [107.95, 11.05],
    crops: ["White-flesh dragon fruit", "Red-flesh dragon fruit"],
    harvest: "Year-round with lighting; peak May – Aug",
    harvestMonths: [4, 5, 6, 7, 8, 9],
    climate: "Semi-arid coastal, lowest rainfall in Vietnam",
    altitude: "0 – 100 m",
    soil: "Sandy loam",
    processing: ["Packhouse washing", "Grading by count", "Reefer packing"],
    summary:
      "The world's largest dragon fruit cluster. Night lighting extends flowering so supply continues outside the natural season.",
    story:
      "Growers use electric lighting to trigger off-season flowering. Packhouses grade fruit by weight and appearance and pre-cool it before reefer loading.",
    proof: [
      {
        title: "Producer-group certification",
        body: "Farm groups are audited under the certificate scope shown in the Certificate Center — only the listed groups are covered.",
      },
      {
        title: "Registered codes",
        body: "Growing-area and packhouse codes are listed per shipment where required by the destination.",
      },
    ],
    image: {
      kind: "origin",
      alt: "Dragon fruit farms on the Binh Thuan coast",
      caption: "Aerial – dragon fruit rows",
    },
    gallery: [
      { kind: "human", alt: "Worker harvesting dragon fruit", caption: "Documentary – harvest" },
      { kind: "product", motif: "fruit", alt: "Dragon fruit", caption: "Macro – dragon fruit" },
    ],
    verified: false,
  },
  {
    slug: "northern-mountains",
    name: "Northern Mountains",
    region: "Yen Bai & Lang Son",
    provinces: ["Lao Cai (former Yen Bai)", "Lang Son"],
    coordinates: [104.75, 21.85],
    crops: ["Cassia cinnamon", "Star anise"],
    harvest: "Cassia: Mar – May · Star anise: Aug – Oct",
    harvestMonths: [3, 4, 5, 8, 9, 10],
    climate: "Subtropical; cool winters",
    altitude: "300 – 1,000 m",
    soil: "Feralitic hillside soils",
    processing: ["Sun-dried", "Scraped / split", "Cut & sifted"],
    summary:
      "Cassia forests and star anise groves farmed by upland communities. Bark thickness and oil content are set by tree age and harvest timing.",
    story:
      "Cassia trees are harvested after 10–15 years; bark is peeled, scraped and sun-dried in the village before grading. Star anise has a spring and an autumn crop with different appearance.",
    proof: [
      {
        title: "Collection points",
        body: "Collectors record commune of origin for each intake so spice lots can be traced to the district level.",
      },
      {
        title: "Moisture control",
        body: "Re-drying and moisture checks before packing reduce mould risk during sea freight.",
      },
    ],
    image: {
      kind: "origin",
      alt: "Cassia forest on hillsides in Yen Bai",
      caption: "Landscape – cassia forest, Yen Bai",
    },
    gallery: [
      { kind: "human", alt: "Villager drying cassia bark", caption: "Documentary – drying bark" },
      { kind: "product", motif: "star", alt: "Star anise", caption: "Macro – star anise" },
    ],
    verified: false,
  },
];
