/**
 * Process content: value chain, QC flow, logistics IA (§7.6, §12, §13).
 * Operational facts (ports, incoterms, lead times) are data, not UI copy.
 */

export interface Step {
  id: string;
  title: string;
  summary: string;
  detail?: string;
  points?: string[];
}

/** Home §7.6 — Farm → Buyer (6 steps). */
export const valueChain: Step[] = [
  { id: "farm", title: "Farm", summary: "Farmer groups in registered sourcing regions supply cherry, paddy, nuts and fruit." },
  { id: "process", title: "Process", summary: "Cleaning, milling, shelling and sorting in our own facilities." },
  { id: "qc", title: "QC", summary: "Physical and lab checks at intake, in-process and before release." },
  { id: "pack", title: "Pack", summary: "Buyer-specified packing, lot marks and private label where required." },
  { id: "port", title: "Port", summary: "Container stuffing with seal records, then Cat Lai, Cai Mep or Hai Phong." },
  { id: "buyer", title: "Buyer", summary: "Documents released per contract; pre-shipment sample matches arrival." },
];

/** Supply chain page §13 — Farm → Port (7 steps). */
export const supplyChainSteps: Step[] = [
  {
    id: "farm",
    title: "Farm",
    summary: "Registered farmer groups and cooperatives in six sourcing regions.",
    points: ["Farmer group ID assigned", "Plot geolocation where collected", "Good agricultural practice training"],
  },
  {
    id: "collect",
    title: "Collect",
    summary: "Collection points weigh, sample and record each delivery.",
    points: ["Weight & moisture at intake", "Delivery linked to group ID", "Rejected lots returned, not blended"],
  },
  {
    id: "process",
    title: "Process",
    summary: "Cleaning, grading and sorting to the contracted specification.",
    points: ["Processing batch number", "Line and shift recorded", "Metal detection where applicable"],
  },
  {
    id: "qc",
    title: "QC",
    summary: "Physical and laboratory checks before a batch is released.",
    points: ["Moisture, screen, defects", "Lab tests per product plan", "Hold & release status"],
  },
  {
    id: "pack",
    title: "Pack",
    summary: "Packing formats and marks as agreed in the contract.",
    points: ["Lot code on every unit", "Private label artwork approval", "Packing list generated"],
  },
  {
    id: "warehouse",
    title: "Warehouse",
    summary: "Ambient, conditioned or cold storage depending on product.",
    points: ["FIFO by lot", "Temperature log for cold chain", "Fumigation records where required"],
  },
  {
    id: "port",
    title: "Port",
    summary: "Container stuffing, seal records and export clearance.",
    points: ["Container & seal number", "Stuffing photos to buyer", "B/L and export docs"],
  },
];

/** Quality page §12 — 6 control points. */
export const qcSteps: Step[] = [
  {
    id: "incoming",
    title: "Incoming",
    summary: "Every delivery sampled before unloading.",
    detail: "Moisture, smell, visible defects and foreign matter are checked on arrival. Non-conforming deliveries are rejected at the gate and recorded against the supplier.",
    points: ["Moisture meter reading", "Sensory screening", "Supplier / group ID"],
  },
  {
    id: "physical",
    title: "Physical",
    summary: "Grade, size and defect analysis to spec.",
    detail: "Screen analysis for coffee, broken % and grain length for rice, count per pound for cashew, bulk density for pepper — using the same methods stated on the specification.",
    points: ["Screen / count / density", "Defect & broken %", "Colour"],
  },
  {
    id: "process-qc",
    title: "Process QC",
    summary: "In-line checks during cleaning, sorting and packing.",
    detail: "Operators sample at defined intervals on each line. Metal detectors and sorters are verified at start-up and every shift.",
    points: ["Sampling every 30–60 min", "Metal detector verification", "Line hygiene checks"],
  },
  {
    id: "lab",
    title: "Lab",
    summary: "In-house lab + accredited third-party labs.",
    detail: "Routine moisture, water activity and physical analysis run in-house. Aflatoxin, pesticide residues and microbiology are tested at ISO/IEC 17025-accredited labs according to the product testing plan or buyer requirement.",
    points: ["Moisture & water activity", "Aflatoxin / OTA (3rd party)", "Pesticide residues (3rd party)", "Microbiology (3rd party)"],
  },
  {
    id: "final",
    title: "Final",
    summary: "Batch release against the contracted spec.",
    detail: "A composite sample is drawn from each finished lot. The lot is only released when all results are within specification; retained samples are kept for 12 months.",
    points: ["Composite lot sample", "Release sign-off", "Retained sample 12 months"],
  },
  {
    id: "pre-ship",
    title: "Pre-ship",
    summary: "Pre-shipment sample and independent inspection.",
    detail: "Pre-shipment samples are sent for buyer approval on request. Independent inspection (e.g. SGS, Bureau Veritas, Intertek, Cafecontrol) can be nominated by the buyer.",
    points: ["PSS to buyer", "3rd-party inspection optional", "Stuffing supervision"],
  },
];

export const labCapabilities = [
  { test: "Moisture content", method: "Oven / calibrated meters", where: "In-house" },
  { test: "Water activity (aw)", method: "Water activity meter", where: "In-house" },
  { test: "Screen / count / density", method: "Standard sieves, count, g/l", where: "In-house" },
  { test: "Defect count & cup test", method: "Grading table / cupping lab", where: "In-house (coffee)" },
  { test: "Aflatoxin B1 / total, OTA", method: "HPLC", where: "Accredited 3rd-party lab" },
  { test: "Pesticide residues", method: "LC-MS/MS, GC-MS/MS multi-residue", where: "Accredited 3rd-party lab" },
  { test: "Microbiology", method: "TPC, yeast & mould, Salmonella, E. coli", where: "Accredited 3rd-party lab" },
  { test: "Heavy metals", method: "ICP-MS", where: "Accredited 3rd-party lab" },
];

/* ------------------------------------------------------------------ LOGISTICS */

export const shippingModes = [
  { mode: "FCL", title: "Full container load", body: "Standard for all dry commodities. 20 ft for coffee, rice, cashew; 40 ft for spices and light cargo." },
  { mode: "LCL", title: "Less than container load", body: "Available for specialty coffee lots and trial orders via consolidators from Cat Lai." },
  { mode: "Reefer", title: "Refrigerated container", body: "40 ft reefer for fresh and frozen fruit with temperature set-point and data logger." },
  { mode: "Air", title: "Air freight", body: "Fresh fruit samples and urgent small orders via Tan Son Nhat (SGN)." },
];

export const containerLoading = [
  { product: "Green coffee, 60 kg jute", c20: "≈ 19.2 MT (320 bags)", c40: "—", note: "Bulk liner ≈ 21 MT / 20 ft" },
  { product: "Rice, 25 / 50 kg PP", c20: "≈ 25 MT", c40: "—", note: "Retail packs ≈ 22 MT / 20 ft" },
  { product: "Cashew kernels, vacuum cartons", c20: "≈ 700 cartons (15.9 MT)", c40: "≈ 1,400 cartons", note: "2 × 11.34 kg per carton" },
  { product: "Black pepper, 25 / 50 kg PP", c20: "≈ 16 – 18 MT", c40: "≈ 26 MT", note: "Depends on density" },
  { product: "Spices, cartons", c20: "≈ 7 MT", c40: "≈ 12 – 16 MT", note: "Volume-limited" },
  { product: "Fresh fruit, cartons", c20: "—", c40: "≈ 20 pallets (RF)", note: "Set-point per product" },
];

export const ports = [
  { name: "Cat Lai", city: "Ho Chi Minh City", code: "VNCLI", use: "Main port for coffee, rice, cashew, pepper and reefers" },
  { name: "Cai Mep", city: "Ho Chi Minh City (former Ba Ria–Vung Tau)", code: "VNCMT", use: "Deep-water port for direct mainline services to Europe & US" },
  { name: "Hai Phong", city: "Hai Phong", code: "VNHPH", use: "Northern spices (cassia, star anise)" },
];

export const incoterms = [
  { code: "FOB", name: "Free On Board", body: "We deliver loaded on board at the Vietnamese port; buyer arranges freight." },
  { code: "CFR", name: "Cost and Freight", body: "We book freight to the destination port; risk passes at loading." },
  { code: "CIF", name: "Cost, Insurance & Freight", body: "As CFR plus minimum cargo insurance to destination." },
  { code: "DAP", name: "Delivered At Place", body: "Selected specialty coffee lots, via forwarding partners." },
];

export type DocRule = "always" | "product" | "market" | "request";

export const exportDocuments: { name: string; rule: DocRule; note: string }[] = [
  { name: "Commercial invoice", rule: "always", note: "Every shipment" },
  { name: "Packing list", rule: "always", note: "Lot codes, weights, marks" },
  { name: "Bill of lading", rule: "always", note: "Original, telex release or sea waybill" },
  { name: "Certificate of origin (CO)", rule: "market", note: "Form EUR.1 / EVFTA, Form E, CPTPP, etc. — per destination & preference claim" },
  { name: "Phytosanitary certificate", rule: "product", note: "Plant products only; requirements depend on commodity AND destination" },
  { name: "Certificate of analysis (COA)", rule: "request", note: "Per lot; in-house or 3rd-party lab" },
  { name: "Fumigation certificate", rule: "market", note: "Only when required by destination or contract" },
  { name: "Health / quality certificate", rule: "market", note: "Destination-specific (e.g. some Asian markets)" },
  { name: "Weight & quality inspection", rule: "request", note: "Independent inspector nominated by buyer" },
];

export const leadTimes = {
  /** Only published when operationally reliable (§13.1) — otherwise confirmed per quotation. */
  published: false,
  note: "Lead time is confirmed on each quotation based on stock, crop timing and vessel schedule.",
};
