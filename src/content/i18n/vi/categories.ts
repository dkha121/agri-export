import type { Category, CategoryKey } from "../../types";
import type { DeepPartial } from "../types";

/*
 * Vietnamese overlay for src/content/categories.ts.
 * `buyingNotes` keeps the SAME length as the source so it merges by index;
 * string arrays (subcategories, rfqGrades) replace the source arrays.
 */
export const categoriesVi: Record<CategoryKey, DeepPartial<Category>> = {
  coffee: {
    name: "Cà phê",
    shortName: "Cà phê",
    tagline: "Robusta và Arabica từ Tây Nguyên và Lâm Đồng.",
    intro:
      "Cà phê nhân xuất khẩu phân loại theo cỡ sàng và số lỗi, làm sạch hoặc đánh bóng ướt theo quy cách của người mua. Robusta từ Đắk Lắk và Gia Lai; Arabica chế biến ướt từ cao nguyên Cầu Đất.",
    image: { alt: "Cận cảnh hạt cà phê" },
    subcategories: ["Robusta", "Arabica", "Fine Robusta", "Lô specialty"],
    rfqGrades: ["Loại 1 · Sàng 18", "Loại 1 · Sàng 16", "Loại 2 · Sàng 13", "Fine Robusta (honey / chế biến ướt)"],
    buyingNotes: [
      { label: "Vụ thu hoạch chính", value: "Tháng 11 – tháng 1" },
      { label: "Đóng gói phổ biến", value: "Bao đay 60 kg · hàng xá lót túi" },
      { label: "Tải trọng / cont 20 ft", value: "≈ 19.2 MT (đóng bao)" },
    ],
  },
  cashew: {
    name: "Hạt điều nhân",
    shortName: "Hạt điều",
    tagline: "Nhân trắng nguyên và vỡ đôi, phân loại theo tham chiếu AFI.",
    intro:
      "Hạt điều nhân được chế biến, phân loại và đóng gói hút chân không tại vùng điều Đông Nam Bộ. Các cấp nhân nguyên và vỡ đôi theo tham chiếu tiêu chuẩn AFI, có tùy chọn dòng rang và rang muối.",
    image: { alt: "Nhân điều trong bát" },
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
    shortName: "Tiêu",
    tagline: "Tiêu đen và tiêu trắng, làm sạch hoặc tiệt trùng hơi nước.",
    intro:
      "Tiêu đen và tiêu trắng quy cách theo dung trọng (g/l), độ ẩm và tạp chất. Làm sạch bằng máy hoặc tiệt trùng hơi nước (làm sạch theo kiểu ASTA) cho người mua trong ngành chế biến thực phẩm.",
    image: { alt: "Hạt tiêu đen trong khay gỗ" },
    subcategories: ["Tiêu đen", "Tiêu trắng", "Tiệt trùng hơi nước", "Tiêu xay"],
    rfqGrades: ["500 g/l FAQ", "550 g/l", "570 g/l làm sạch", "Tiêu trắng 630 g/l", "Làm sạch theo kiểu ASTA"],
    buyingNotes: [
      { label: "Vụ thu hoạch chính", value: "Tháng 2 – tháng 5" },
      { label: "Đóng gói phổ biến", value: "Bao PP 25 / 50 kg" },
      { label: "Tải trọng / cont 20 ft", value: "≈ 15–18 MT" },
    ],
  },
  cinnamon: {
    name: "Quế",
    shortName: "Quế",
    tagline: "Quế chẻ, quế ống và bột quế từ Yên Bái.",
    intro:
      "Quế Việt Nam (Cinnamomum cassia) từ cây 10–15 năm tuổi ở vùng núi phía Bắc. Quy cách theo dạng, chiều dài, hàm lượng tinh dầu và độ ẩm — quế chẻ, quế ống/thanh, quế vụn hoặc bột quế.",
    image: { alt: "Thanh quế xếp chồng" },
    subcategories: ["Quế chẻ", "Quế ống / quế thanh", "Quế vụn", "Bột quế"],
    rfqGrades: ["Quế chẻ 2–3% tinh dầu", "Quế thanh 8 cm", "Quế ống 30–40 cm", "Bột quế 60 mesh"],
    buyingNotes: [
      { label: "Vụ thu hoạch chính", value: "Tháng 3 – 5 · tháng 8 – 10" },
      { label: "Đóng gói phổ biến", value: "Thùng carton 10–15 kg · bao PP" },
      { label: "Tải trọng / cont 40 ft", value: "≈ 12–16 MT" },
    ],
  },
  anise: {
    name: "Hoa hồi",
    shortName: "Hồi",
    tagline: "Hoa hồi nguyên bông và cánh gãy từ Lạng Sơn.",
    intro:
      "Hoa hồi (Illicium verum) từ Lạng Sơn, với vụ xuân và vụ thu. Phân loại theo tỷ lệ bông nguyên, kích cỡ và màu sắc, phơi nắng đến độ ẩm an toàn cho vận chuyển đường biển.",
    image: { alt: "Hoa hồi nguyên bông, nhìn từ trên xuống" },
    subcategories: ["Vụ thu", "Vụ xuân", "Cánh gãy / FAQ", "Bột hồi"],
    rfqGrades: ["Vụ thu · ≥ 80% bông nguyên", "Vụ xuân · ≥ 70% bông nguyên", "Cánh gãy / FAQ", "Bột hồi"],
    buyingNotes: [
      { label: "Vụ thu hoạch chính", value: "Vụ thu: tháng 8 – 10 · Vụ xuân: tháng 2 – 4" },
      { label: "Đóng gói phổ biến", value: "Thùng carton 10 kg · bao PP 20 kg" },
      { label: "Tải trọng / cont 40 ft", value: "≈ 10–12 MT" },
    ],
  },
  mango: {
    name: "Xoài sấy dẻo",
    shortName: "Xoài sấy",
    tagline: "Xoài sấy dẻo cắt lát — hàng xá và túi bán lẻ Owi Chewi.",
    intro:
      "Xoài sấy dẻo làm từ xoài Đồng bằng sông Cửu Long, cắt lát, sấy nhẹ và đóng gói cho các thương hiệu snack, dịch vụ ăn uống và bán lẻ. Cung cấp dạng thùng carton hàng xá, túi bán lẻ Owi Chewi hoặc nhãn riêng.",
    image: { alt: "Bát xoài sấy dẻo" },
    subcategories: ["Xoài sấy dẻo", "Ít đường", "Hàng xá cho dịch vụ ăn uống", "Bán lẻ / nhãn riêng"],
    rfqGrades: ["Xoài sấy dẻo · dạng lát", "Xoài sấy ít đường", "Xoài sấy · hạt lựu", "Túi bán lẻ Owi Chewi"],
    buyingNotes: [
      { label: "Mùa xoài tươi", value: "Tháng 3 – 6 (vụ chính)" },
      { label: "Đóng gói phổ biến", value: "Thùng carton 10 kg · túi 100–500 g" },
      { label: "Tải trọng / cont 20 ft", value: "≈ 8–10 MT (thùng carton)" },
    ],
  },
};
