import type { Category, CategoryKey } from "../../types";
import type { DeepPartial } from "../types";

/*
 * Vietnamese overlay for src/content/categories.ts.
 * `buyingNotes` keeps the SAME length as the source so it merges by index;
 * string arrays (subcategories, rfqGrades) replace the source arrays.
 */
export const categoriesVi: Record<CategoryKey, DeepPartial<Category>> = {
  coffee: {
    name: "Cà phê nhân",
    shortName: "Cà phê",
    tagline: "Robusta và Arabica từ Tây Nguyên và Lâm Đồng.",
    intro:
      "Cà phê nhân xuất khẩu phân loại theo cỡ sàng và số lỗi, làm sạch hoặc đánh bóng ướt theo quy cách của người mua. Robusta từ Đắk Lắk và Gia Lai; Arabica chế biến ướt từ cao nguyên Cầu Đất.",
    image: {
      alt: "Cà phê nhân Robusta, ảnh cận",
      caption: "Ảnh cận sản phẩm – cà phê nhân Robusta",
    },
    subcategories: ["Robusta", "Arabica", "Fine Robusta", "Lô specialty"],
    rfqGrades: ["Loại 1 · Sàng 18", "Loại 1 · Sàng 16", "Loại 2 · Sàng 13", "Fine Robusta (honey / chế biến ướt)"],
    buyingNotes: [
      { label: "Vụ thu hoạch chính", value: "Tháng 11 – tháng 1" },
      { label: "Đóng gói phổ biến", value: "Bao đay 60 kg · hàng xá lót túi" },
      { label: "Tải trọng / cont 20 ft", value: "≈ 19.2 MT (đóng bao)" },
    ],
  },
  rice: {
    name: "Gạo",
    shortName: "Gạo",
    tagline: "Gạo thơm, gạo hạt dài và gạo nếp từ Đồng bằng sông Cửu Long.",
    intro:
      "Gạo hạt dài, gạo thơm và gạo nếp từ Đồng bằng sông Cửu Long, đã xay xát và tách màu. Quy cách theo giống, tỷ lệ tấm và độ ẩm; đóng gói cho nhà phân phối hoặc nhãn riêng.",
    image: {
      alt: "Gạo trắng hạt dài, ảnh cận",
      caption: "Ảnh cận sản phẩm – gạo thơm hạt dài",
    },
    subcategories: ["Gạo thơm (giống ST)", "Jasmine", "Gạo trắng hạt dài", "Gạo nếp"],
    rfqGrades: ["5% tấm", "10% tấm", "15% tấm", "100% nguyên hạt (cao cấp)"],
    buyingNotes: [
      { label: "Vụ chính", value: "Đông Xuân · Hè Thu" },
      { label: "Đóng gói phổ biến", value: "Bao PP 25 / 50 kg · túi bán lẻ 1–5 kg" },
      { label: "Tải trọng / cont 20 ft", value: "≈ 25 MT" },
    ],
  },
  cashew: {
    name: "Hạt điều nhân",
    shortName: "Hạt điều",
    tagline: "Nhân trắng nguyên và vỡ đôi, phân loại theo tham chiếu AFI.",
    intro:
      "Hạt điều nhân được chế biến, phân loại và đóng gói hút chân không tại Bình Phước. Các cấp nhân nguyên và vỡ đôi theo tham chiếu tiêu chuẩn AFI, có tùy chọn dòng rang và rang muối.",
    image: {
      alt: "Hạt điều nhân trắng nguyên, ảnh cận",
      caption: "Ảnh cận sản phẩm – nhân điều W320",
    },
    subcategories: ["Nhân trắng nguyên", "Nhân vỡ đôi & mảnh", "Nhân vàng (scorched)", "Điều rang"],
    rfqGrades: ["W180", "W240", "W320", "W450", "WS / LP"],
    buyingNotes: [
      { label: "Chế biến", value: "Quanh năm" },
      { label: "Đóng gói phổ biến", value: "Thùng thiếc / túi hút chân không 22.68 kg" },
      { label: "Tải trọng / cont 20 ft", value: "≈ 700 carton" },
    ],
  },
  pepper: {
    name: "Hồ tiêu",
    shortName: "Hồ tiêu",
    tagline: "Tiêu đen và tiêu trắng, làm sạch hoặc tiệt trùng hơi nước.",
    intro:
      "Tiêu đen và tiêu trắng quy cách theo dung trọng (g/l), độ ẩm và tạp chất. Làm sạch bằng máy hoặc tiệt trùng hơi nước (làm sạch theo kiểu ASTA) cho người mua trong ngành chế biến thực phẩm.",
    image: {
      alt: "Hạt tiêu đen, ảnh cận",
      caption: "Ảnh cận sản phẩm – tiêu đen 550 g/l",
    },
    subcategories: ["Tiêu đen", "Tiêu trắng", "Tiệt trùng hơi nước", "Tiêu xay"],
    rfqGrades: ["500 g/l FAQ", "550 g/l", "570 g/l làm sạch", "Tiêu trắng 630 g/l", "Làm sạch theo kiểu ASTA"],
    buyingNotes: [
      { label: "Vụ thu hoạch chính", value: "Tháng 2 – tháng 5" },
      { label: "Đóng gói phổ biến", value: "Bao PP 25 / 50 kg" },
      { label: "Tải trọng / cont 20 ft", value: "≈ 15–18 MT" },
    ],
  },
  fruits: {
    name: "Trái cây tươi & đông lạnh",
    shortName: "Trái cây",
    tagline: "Thanh long, xoài và sầu riêng — tươi hoặc đông lạnh.",
    intro:
      "Trái cây tươi đóng gói từ vùng trồng và nhà đóng gói đã được cấp mã số, cùng các dòng cấp đông IQF. Quy cách theo giống, kích cỡ/số trái, độ Brix và nhiệt độ bảo quản. Điều kiện nhập khẩu tùy thuộc mặt hàng và thị trường đích.",
    image: {
      alt: "Thanh long ruột trắng tươi",
      caption: "Ảnh cận sản phẩm – thanh long ruột trắng",
    },
    subcategories: ["Thanh long", "Xoài", "Sầu riêng (đông lạnh)", "Bưởi"],
    rfqGrades: ["Kích cỡ theo số trái (mỗi thùng)", "Premium / Loại I", "Loại II", "Đông lạnh IQF"],
    buyingNotes: [
      { label: "Nguồn hàng", value: "Theo mùa — xem lịch mùa vụ" },
      { label: "Đóng gói phổ biến", value: "Thùng carton, container lạnh" },
      { label: "Tải trọng / container lạnh 40 ft", value: "≈ 20 pallet" },
    ],
  },
  spices: {
    name: "Gia vị",
    shortName: "Gia vị",
    tagline: "Quế và hoa hồi từ vùng núi phía Bắc.",
    intro:
      "Quế và hoa hồi từ Yên Bái và Lạng Sơn. Quy cách theo dạng, chiều dài, hàm lượng tinh dầu và độ ẩm; cung cấp dạng nguyên, vỡ, cắt khúc hoặc bột cho nhà chế biến gia vị.",
    image: {
      alt: "Vỏ quế chẻ",
      caption: "Ảnh cận sản phẩm – quế chẻ",
    },
    subcategories: ["Quế", "Hoa hồi", "Bột quế"],
    rfqGrades: ["Quế chẻ 2–3% tinh dầu", "Quế ống / quế thanh", "Hoa hồi — vụ xuân", "Hoa hồi — vụ thu"],
    buyingNotes: [
      { label: "Vụ thu hoạch chính", value: "Quế: tháng 3–5 · Hồi: tháng 8–10" },
      { label: "Đóng gói phổ biến", value: "Thùng carton 10–15 kg · bao PP" },
      { label: "Tải trọng / cont 40 ft", value: "≈ 12–16 MT" },
    ],
  },
};
