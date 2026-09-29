import type { CategoryKey } from "../../types";

/** Vietnamese spec-field labels (category → key → label/help). */
export const specLabelsVi: Record<CategoryKey, Record<string, { label: string; help?: string }>> = {
  coffee: {
    species: { label: "Loài" },
    grade: { label: "Loại" },
    screen: { label: "Cỡ sàng", help: "Giữ lại trên sàng, đơn vị 1/64 inch" },
    moistureMax: { label: "Độ ẩm" },
    foreignMatterMax: { label: "Tạp chất" },
    blackBrokenMax: { label: "Hạt đen & vỡ" },
    processing: { label: "Chế biến" },
    cropYear: { label: "Niên vụ" },
    packing: { label: "Đóng gói" },
    shelfLife: { label: "Hạn sử dụng" },
  },
  rice: {
    variety: { label: "Giống" },
    brokenMax: { label: "Tỷ lệ tấm" },
    moistureMax: { label: "Độ ẩm" },
    grainLength: { label: "Chiều dài hạt trung bình" },
    chalkyMax: { label: "Hạt bạc bụng" },
    purity: { label: "Độ thuần giống" },
    milling: { label: "Mức độ xát" },
    cropYear: { label: "Vụ" },
    packing: { label: "Đóng gói" },
    shelfLife: { label: "Hạn sử dụng" },
  },
  cashew: {
    grade: { label: "Cấp hạt" },
    count: { label: "Số hạt", help: "Số nhân trên mỗi pound" },
    moistureMax: { label: "Độ ẩm" },
    brokenMax: { label: "Hạt vỡ / cấp thấp hơn" },
    color: { label: "Màu sắc" },
    standard: { label: "Tiêu chuẩn phân loại" },
    packing: { label: "Đóng gói" },
    shelfLife: { label: "Hạn sử dụng" },
  },
  pepper: {
    type: { label: "Chủng loại" },
    density: { label: "Dung trọng" },
    moistureMax: { label: "Độ ẩm" },
    extraneousMax: { label: "Tạp chất" },
    lightBerriesMax: { label: "Hạt lép" },
    processing: { label: "Chế biến" },
    micro: { label: "Vi sinh" },
    packing: { label: "Đóng gói" },
  },
  fruits: {
    variety: { label: "Giống" },
    sizeCount: { label: "Kích cỡ / số trái" },
    brixMin: { label: "Độ Brix" },
    storageTemp: { label: "Nhiệt độ bảo quản" },
    shelfLife: { label: "Thời hạn bảo quản" },
    season: { label: "Mùa vụ" },
    treatment: { label: "Xử lý sau thu hoạch" },
    packing: { label: "Đóng gói" },
  },
  spices: {
    form: { label: "Dạng" },
    size: { label: "Chiều dài / kích cỡ" },
    moistureMax: { label: "Độ ẩm" },
    oilContent: { label: "Tinh dầu" },
    admixtureMax: { label: "Tạp chất" },
    processing: { label: "Chế biến" },
    packing: { label: "Đóng gói" },
    shelfLife: { label: "Hạn sử dụng" },
  },
};

/** Labels for canonical (English) filter facet values. */
export const facetLabelsVi: Record<string, string> = {
  // grade / size
  "Grade 1": "Loại 1",
  "Grade 2": "Loại 2",
  Specialty: "Đặc sản (Specialty)",
  "5% broken": "5% tấm",
  "10% broken": "10% tấm",
  "WS / Pieces": "WS / mảnh",
  // packaging
  "Jute bag": "Bao đay",
  "Bulk liner": "Túi lót container (bulk)",
  "PP bag": "Bao PP",
  "Retail / private label": "Bao lẻ / nhãn riêng",
  "Vacuum tin": "Thùng thiếc hút chân không",
  "Vacuum bag": "Túi hút chân không",
  Carton: "Thùng carton",
  "Frozen carton": "Thùng carton đông lạnh",
  // availability
  "Year-round": "Quanh năm",
  Seasonal: "Theo mùa",
};
