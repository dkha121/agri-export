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
    image: { src: "/images/coffee/cherries-branch.jpg", kind: "origin", alt: "Ripening robusta cherries on a branch in the Central Highlands", focal: "50% 50%" },
    gallery: [
      { src: "/images/pepper/vine.jpg", kind: "product", motif: "peppercorn", alt: "Pepper vine with green berries, intercropped with coffee" },
      { src: "/images/coffee/cherries-cluster.jpg", kind: "product", motif: "cherry", alt: "Cluster of red and green coffee cherries" },
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
    image: { src: "/images/coffee/cherries-tree.jpg", kind: "origin", alt: "Arabica cherries ripening on the tree", focal: "50% 40%" },
    gallery: [
      { kind: "factory", alt: "Wet mill fermentation tanks", caption: "Wet mill – fermentation" },
      { src: "/images/coffee/beans-closeup.jpg", kind: "product", motif: "bean", alt: "Coffee beans, close-up" },
    ],
    verified: false,
  },
  {
    slug: "mekong-delta",
    name: "Mekong Delta",
    region: "Cuu Long river delta",
    provinces: ["Dong Thap (incl. former Tien Giang)", "Vinh Long", "Can Tho"],
    coordinates: [105.8, 10.2],
    crops: ["Cat Chu mango", "Keo mango", "Cat Hoa Loc mango"],
    harvest: "Main mango season: Mar – Jun · off-season: Oct – Dec",
    harvestMonths: [3, 4, 5, 6, 10, 11, 12],
    climate: "Tropical; rainy season May – Nov",
    altitude: "0 – 5 m",
    soil: "Alluvial clay along the Tien and Hau rivers",
    processing: ["Fresh intake & ripening", "Slicing", "Low-temperature drying", "Pouch packing"],
    summary:
      "Vietnam's fruit basket. Mango orchards along the Tien river supply the ripe fruit behind our soft dried mango and Owi Chewi packs.",
    story:
      "Mangoes are bought from contracted orchards and cooperatives in Dong Thap, ripened under control and processed within days of harvest. Orchard codes follow the fruit into each drying batch.",
    proof: [
      {
        title: "Contracted orchards",
        body: "Variety, spray records and harvest timing agreed with orchards before the season — the basis for consistent colour and sweetness.",
      },
      {
        title: "Batch traceability",
        body: "Each drying batch records the orchard codes and intake dates of the fresh fruit it came from.",
      },
    ],
    image: { src: "/images/hero/all-2.jpg", kind: "origin", alt: "Dried mango, cashews and spices on a table overlooking Mekong orchards", focal: "30% 60%" },
    gallery: [
      { src: "/images/mango/bowl-2.jpg", kind: "product", motif: "fruit", alt: "Bowl of soft dried mango slices" },
      { src: "/images/mango/closeup.jpg", kind: "product", motif: "fruit", alt: "Dried mango pieces, close-up" },
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
    image: { src: "/images/cashew/sack.jpg", kind: "origin", alt: "Cashew kernels spilling from a jute sack", focal: "40% 50%" },
    gallery: [
      { kind: "factory", alt: "Cashew grading line", caption: "Factory – kernel grading" },
      { src: "/images/cashew/bowl-blue.jpg", kind: "product", motif: "kernel", alt: "Cashew kernels in a bowl" },
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
    image: { src: "/images/mixed/anise-cinnamon-sticks.jpg", kind: "origin", alt: "Cassia cinnamon sticks and star anise from the northern mountains", focal: "50% 50%" },
    gallery: [
      { src: "/images/cinnamon/stack.jpg", kind: "product", motif: "stick", alt: "Stacked cassia cinnamon sticks" },
      { src: "/images/anise/pile.jpg", kind: "product", motif: "star", alt: "Whole star anise" },
    ],
    verified: false,
  },
];
