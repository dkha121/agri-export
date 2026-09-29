import type { Certificate, DocumentItem, Product } from "./types";

/*
 * Document library (§20 Document entity). Files are generated on demand from
 * this metadata (see /api/documents/[id]) so every download is labelled
 * SAMPLE / PLACEHOLDER until the verified PDF is uploaded.
 * Built per locale so titles follow the page language (files stay English).
 */

export interface DocStrings {
  specTitle: (productName: string) => string;
  specDesc: string;
  certTitle: (scheme: string, entity: string) => string;
  coaTitle: (label: string) => string;
  coaDesc: string;
  coaLabels: Record<"coffee" | "cashew" | "pepper" | "spices" | "mango", string>;
  general: Record<string, { title: string; description?: string }>;
}

export const docStringsEn: DocStrings = {
  specTitle: (n) => `${n} — Product specification`,
  specDesc: "Technical data sheet generated from the product record.",
  certTitle: (s, e) => `${s} certificate — ${e}`,
  coaTitle: (l) => `${l} — Sample Certificate of Analysis`,
  coaDesc: "Reference-only COA layout. Real COAs are issued per lot.",
  coaLabels: { coffee: "Green coffee", cashew: "Cashew kernels", pepper: "Black pepper", spices: "Cinnamon & star anise", mango: "Soft dried mango" },
  general: {
    "catalog-2026": { title: "Product catalogue 2026/27", description: "All categories, grades and packing formats in one PDF." },
    "company-profile": {
      title: "Company profile & supplier questionnaire",
      description: "Legal entity, facilities, certifications and contacts for supplier onboarding.",
    },
    "guide-import-documents": {
      title: "Export documents by product & destination",
      description: "Which documents accompany each shipment — invoice to phytosanitary.",
    },
    "guide-incoterms": { title: "Incoterms® 2020 — what we quote and why" },
    "traceability-methodology": { title: "Traceability methodology", description: "How lot codes link containers to batches and farmer groups." },
    "responsible-sourcing-policy": { title: "Responsible sourcing policy" },
    "eudr-information-pack": {
      title: "EUDR information pack (coffee)",
      description: "Due-diligence information for in-scope EU operators. Released after legal approval.",
    },
    "food-safety-pack": {
      title: "Food safety documentation pack (FSVP support)",
      description: "HACCP plan summary, hazard analysis overview and recall procedure for importer verification.",
    },
  },
};

export const docStringsVi: DocStrings = {
  specTitle: (n) => `${n} — Bảng thông số kỹ thuật`,
  specDesc: "Bảng dữ liệu kỹ thuật tạo từ hồ sơ sản phẩm (file PDF bằng tiếng Anh).",
  certTitle: (s, e) => `Chứng nhận ${s} — ${e}`,
  coaTitle: (l) => `${l} — Phiếu kết quả phân tích (COA) mẫu`,
  coaDesc: "Mẫu COA chỉ để tham khảo bố cục. COA thật được cấp theo từng lô.",
  coaLabels: { coffee: "Cà phê nhân", cashew: "Hạt điều nhân", pepper: "Tiêu đen", spices: "Quế & hồi", mango: "Xoài sấy dẻo" },
  general: {
    "catalog-2026": { title: "Catalogue sản phẩm 2026/27", description: "Toàn bộ ngành hàng, cấp hạt và quy cách đóng gói trong một file PDF." },
    "company-profile": {
      title: "Hồ sơ năng lực & bảng câu hỏi nhà cung cấp",
      description: "Pháp nhân, nhà máy, chứng nhận và đầu mối liên hệ phục vụ đánh giá nhà cung cấp.",
    },
    "guide-import-documents": {
      title: "Bộ chứng từ xuất khẩu theo sản phẩm & thị trường",
      description: "Chứng từ đi kèm mỗi lô hàng — từ hóa đơn đến kiểm dịch thực vật.",
    },
    "guide-incoterms": { title: "Incoterms® 2020 — điều kiện chúng tôi báo giá và lý do" },
    "traceability-methodology": { title: "Phương pháp truy xuất nguồn gốc", description: "Cách mã lô liên kết container với mẻ chế biến và nhóm nông hộ." },
    "responsible-sourcing-policy": { title: "Chính sách thu mua có trách nhiệm" },
    "eudr-information-pack": {
      title: "Bộ thông tin EUDR (cà phê)",
      description: "Thông tin thẩm định cho doanh nghiệp EU thuộc phạm vi áp dụng. Chỉ cung cấp sau khi pháp chế phê duyệt.",
    },
    "food-safety-pack": {
      title: "Bộ hồ sơ an toàn thực phẩm (hỗ trợ FSVP)",
      description: "Tóm tắt kế hoạch HACCP, phân tích mối nguy và quy trình thu hồi phục vụ nhà nhập khẩu thẩm tra.",
    },
  },
};

const GENERAL_META: Omit<DocumentItem, "title" | "description">[] = [
  { id: "catalog-2026", type: "Catalog", productSlugs: [], locale: "EN", version: "2026.2", publishedAt: "2026-09-01", access: "public", verified: false },
  { id: "company-profile", type: "Company profile", productSlugs: [], locale: "EN", version: "2026.1", publishedAt: "2026-06-10", access: "public", verified: false },
  { id: "guide-import-documents", type: "Buyer guide", productSlugs: [], locale: "EN", version: "v1.2", publishedAt: "2026-07-22", access: "public", verified: false },
  { id: "guide-incoterms", type: "Buyer guide", productSlugs: [], locale: "EN", version: "v1.0", publishedAt: "2026-05-05", access: "public", verified: false },
  { id: "traceability-methodology", type: "Policy", productSlugs: [], locale: "EN", version: "v1.0", publishedAt: "2026-04-18", access: "public", verified: false },
  { id: "responsible-sourcing-policy", type: "Policy", productSlugs: [], locale: "EN", version: "v2.0", publishedAt: "2026-03-01", access: "public", verified: false },
  { id: "eudr-information-pack", type: "Policy", productSlugs: [], locale: "EN", version: "Draft", publishedAt: "2026-09-10", access: "on-request", verified: false },
  { id: "food-safety-pack", type: "Policy", productSlugs: [], locale: "EN", version: "2026.1", publishedAt: "2026-06-30", access: "on-request", verified: false },
];

export function buildDocuments(products: Product[], certificates: Certificate[], s: DocStrings): DocumentItem[] {
  const general: DocumentItem[] = GENERAL_META.map((g) => ({
    ...g,
    ...s.general[g.id],
    productSlugs: g.id === "eudr-information-pack" ? products.filter((p) => p.category === "coffee").map((p) => p.slug) : g.productSlugs,
  }));

  const specSheets: DocumentItem[] = products.map((p) => ({
    id: `spec-${p.slug}`,
    type: "Specification",
    title: s.specTitle(p.name),
    description: s.specDesc,
    productSlugs: [p.slug],
    facilityId: p.facilityId,
    locale: "EN",
    version: "v1.0",
    publishedAt: "2026-09-15",
    access: "public",
    verified: false,
  }));

  const coaCategories: Record<keyof DocStrings["coaLabels"], string[]> = {
    coffee: ["coffee"],
    cashew: ["cashew"],
    pepper: ["pepper"],
    spices: ["cinnamon", "anise"],
    mango: ["mango"],
  };
  const sampleCoas: DocumentItem[] = (Object.keys(coaCategories) as (keyof typeof coaCategories)[]).map((key) => ({
    id: `coa-sample-${key}`,
    type: "Sample COA",
    title: s.coaTitle(s.coaLabels[key]),
    description: s.coaDesc,
    productSlugs: products.filter((p) => coaCategories[key].includes(p.category)).map((p) => p.slug),
    locale: "EN",
    version: "Reference",
    publishedAt: "2026-08-01",
    sample: true,
    access: "public",
    verified: false,
  }));

  const certificateDocs: DocumentItem[] = certificates
    .filter((c) => c.documentId)
    .map((c) => ({
      id: c.documentId!,
      type: "Certificate",
      title: s.certTitle(c.schemeShort, c.entity),
      description: c.scope,
      productSlugs: products.filter((p) => p.certificateIds.includes(c.id)).map((p) => p.slug),
      facilityId: c.facilityId,
      locale: "EN",
      version: c.issued.slice(0, 4),
      publishedAt: c.issued,
      access: "public",
      verified: false,
    }));

  return [...general, ...specSheets, ...sampleCoas, ...certificateDocs];
}
