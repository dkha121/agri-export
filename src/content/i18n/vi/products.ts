import type { Packing, Product } from "../../types";
import type { DeepPartial } from "../types";

/*
 * Vietnamese overlay for src/content/products.ts.
 * Merged by index over the English source (see ../types.ts):
 *  - `packings` and `gallery` must keep the SAME length as the source so they
 *    merge element by element (ids / kind / motif stay from the source).
 *  - string arrays (processing, rfqGrades, loadingPorts) replace the source.
 *  - `spec` only carries string values; numbers and nulls stay from the source.
 */

type PackingVi = DeepPartial<Packing>;

const jute60: PackingVi = {
  name: "Bao đay",
  netWeight: "60 kg",
  material: "Bao đay mới, tùy chọn lót GrainPro",
  loading: "≈ 19.2 MT / cont 20 ft (320 bao)",
};
const bulkLiner: PackingVi = {
  name: "Hàng xá lót túi container",
  netWeight: "≈ 21 MT",
  material: "Túi lót PE đạt chuẩn thực phẩm",
  loading: "≈ 21 MT / cont 20 ft",
};
const bigBag: PackingVi = {
  name: "Bao jumbo (FIBC)",
  netWeight: "1000 kg",
  material: "PP dệt có túi lót trong",
  loading: "≈ 20 MT / cont 20 ft",
};
const cashewTin: PackingVi = {
  name: "Thùng thiếc hút chân không, 2 thùng/carton",
  netWeight: "2 × 11.34 kg (50 lb)",
  material: "Sắt tây, nạp khí CO₂",
  loading: "≈ 700 carton / cont 20 ft",
};
const cashewBag: PackingVi = {
  name: "Túi hút chân không, 2 túi/carton",
  netWeight: "2 × 11.34 kg (50 lb)",
  material: "Màng ghép PA/PE, nạp khí CO₂",
  loading: "≈ 700 carton / cont 20 ft",
};
const cashewRetail: PackingVi = {
  name: "Túi bán lẻ",
  netWeight: "200 g – 1 kg",
  material: "Túi đứng có khóa zip",
};
const pepperBag: PackingVi = { name: "Bao PP", netWeight: "25 / 50 kg", material: "PP có lót PE bên trong", loading: "≈ 16–18 MT / cont 20 ft" };
const spiceCarton: PackingVi = { name: "Thùng carton", netWeight: "10 – 15 kg", material: "Carton sóng có lót PE", loading: "≈ 12–16 MT / cont 40 ft" };
const spiceBag: PackingVi = { name: "Bao PP", netWeight: "20 – 25 kg", material: "PP có lót PE bên trong", loading: "≈ 12–14 MT / cont 40 ft" };
const powderBag: PackingVi = { name: "Bao giấy kraft", netWeight: "25 kg", material: "Giấy kraft nhiều lớp, lót PE bên trong", loading: "≈ 14 MT / cont 20 ft" };
const mangoCarton: PackingVi = {
  name: "Thùng carton hàng xá",
  netWeight: "10 kg (2 túi PE × 5 kg)",
  material: "Túi PE đạt chuẩn thực phẩm + thùng carton ngoài",
  loading: "≈ 8–10 MT / cont 20 ft",
};
const mangoPouch: PackingVi = {
  name: "Túi bán lẻ Owi Chewi",
  netWeight: "100 g / 250 g / 500 g",
  material: "Túi đứng có khóa zip, nạp khí nitơ",
  loading: "≈ 1.200 carton / cont 20 ft",
};

const coffeePorts = ["Cát Lái (TP. Hồ Chí Minh)", "Cái Mép"];
const southPorts = ["Cát Lái (TP. Hồ Chí Minh)", "Cái Mép"];
const northPorts = ["Hải Phòng", "Cát Lái (TP. Hồ Chí Minh)"];

const moq20 = "1 × cont 20 ft";

export const productsVi: Record<string, DeepPartial<Product>> = {
  // ------------------------------------------------------------------ COFFEE
  "robusta-grade-1-screen-16": {
    name: "Robusta Loại 1 – Sàng 16",
    shortDescription: "Robusta sạch, đánh bóng ướt, dành cho nhà rang và nhà máy cà phê hòa tan cần nền S16 ổn định.",
    overview:
      "Dòng robusta xuất khẩu chủ lực: cà phê chế biến khô từ các nhóm nông hộ tại Đắk Lắk và Gia Lai, được làm sạch, phân loại sàng 16 và tách màu. Cung cấp dạng làm sạch hoặc đánh bóng ướt. Chào hàng theo vụ và theo lô; mẫu trước giao hàng được duyệt đối chiếu với mẫu chuẩn (type sample) của quý khách.",
    crop: "2026/27",
    processing: ["Chế biến khô (tự nhiên)", "Làm sạch", "Đánh bóng ướt"],
    grade: "Loại 1",
    spec: {
      species: "Coffea canephora (Robusta)",
      grade: "Loại 1",
      screen: "16+ (tối thiểu 90% trên sàng 16)",
      processing: "Làm sạch / đánh bóng ướt",
      cropYear: "2026/27",
      packing: "Bao đay 60 kg · hàng xá lót túi",
    },
    packings: [jute60, bulkLiner, bigBag],
    loadingPorts: coffeePorts,
    moq: moq20,
    rfqGrades: ["Loại 1 · Sàng 16 · làm sạch", "Loại 1 · Sàng 16 · đánh bóng ướt", "Loại 1 · Sàng 16 · chứng nhận RA"],
    image: { alt: "Hạt cà phê phủ kín khung hình" },
    gallery: [
      { alt: "Quả cà phê robusta chín và xanh trên cành" },
      { alt: "Hạt cà phê trong muỗng xúc và bao đay" },
    ],
  },
  "robusta-grade-1-screen-18": {
    name: "Robusta Loại 1 – Sàng 18",
    shortDescription: "Robusta hạt lớn, đánh bóng ướt, dành cho phối trộn espresso và nhà rang cao cấp.",
    overview:
      "Robusta cỡ sàng cao nhất, tuyển chọn từ cùng chuỗi cung ứng Tây Nguyên với dòng S16. Đánh bóng ướt để cải thiện ngoại quan và tách màu hai lần nhằm giữ tỷ lệ hạt đen, vỡ ở mức thấp.",
    crop: "2026/27",
    processing: ["Chế biến khô (tự nhiên)", "Đánh bóng ướt", "Tách màu hai lần"],
    grade: "Loại 1",
    spec: {
      species: "Coffea canephora (Robusta)",
      grade: "Loại 1",
      screen: "18+ (tối thiểu 90% trên sàng 18)",
      processing: "Đánh bóng ướt, tách màu hai lần",
      cropYear: "2026/27",
      packing: "Bao đay 60 kg",
    },
    packings: [jute60, bulkLiner],
    loadingPorts: coffeePorts,
    moq: moq20,
    image: { alt: "Cận cảnh hạt cà phê cỡ lớn" },
    gallery: [{ alt: "Hạt cà phê nhìn từ trên xuống" }],
  },
  "robusta-grade-2-screen-13": {
    name: "Robusta Loại 2 – Sàng 13",
    shortDescription: "Robusta tối ưu chi phí cho cà phê hòa tan và phối trộn độn.",
    overview:
      "Robusta Loại 2 tiêu chuẩn với dung sai lỗi cao hơn, phù hợp chiết xuất cà phê hòa tan và các dòng phối trộn giá tốt. Cung cấp theo dạng FAQ hoặc theo quy cách của người mua.",
    crop: "2026/27",
    processing: ["Chế biến khô (tự nhiên)", "Làm sạch"],
    grade: "Loại 2",
    spec: {
      species: "Coffea canephora (Robusta)",
      grade: "Loại 2",
      screen: "13+ (tối thiểu 90% trên sàng 13)",
      processing: "Làm sạch",
      cropYear: "2026/27",
      packing: "Bao đay 60 kg · hàng xá lót túi",
    },
    packings: [jute60, bulkLiner],
    loadingPorts: coffeePorts,
    moq: moq20,
    image: { alt: "Hạt cà phê nhìn từ trên xuống" },
  },
  "arabica-cau-dat-washed": {
    name: "Arabica Cầu Đất – Chế biến ướt",
    shortDescription: "Arabica Catimor chế biến ướt từ độ cao 1500 m, tuyển chọn theo điểm cupping cho nhà rang specialty.",
    overview:
      "Arabica chế biến ướt hoàn toàn từ các cụm nông trại trên cao nguyên Cầu Đất, phơi trên giàn và xát vỏ trấu theo đơn hàng. Các lô được cupping và chào kèm khoảng điểm — điểm cuối cùng xác nhận trên mẫu trước giao hàng.",
    crop: "2026/27",
    processing: ["Chế biến ướt", "Phơi giàn"],
    grade: "Specialty",
    spec: {
      species: "Coffea arabica (Catimor)",
      grade: "Specialty / Premium",
      screen: "16+",
      processing: "Chế biến ướt hoàn toàn",
      cropYear: "2026/27",
      packing: "Bao đay 60 kg + GrainPro",
    },
    packings: [jute60],
    loadingPorts: coffeePorts,
    moq: "Từ 1 pallet (hàng lẻ LCL) · ưu tiên cont 20 ft",
    rfqGrades: ["Chế biến ướt · 84+ điểm", "Chế biến ướt · 82–84 điểm", "Chế biến mật ong (honey)", "Chế biến khô (natural)"],
    image: { alt: "Quả cà phê đang chín trên cây" },
    gallery: [{ alt: "Cành cà phê với quả chín" }],
  },
  "fine-robusta-honey": {
    name: "Fine Robusta – Chế biến mật ong",
    shortDescription: "Robusta tuyển quả chín đỏ, chế biến mật ong (honey) cho các dòng phối trộn chú trọng hương vị.",
    overview:
      "Quả chín hái tay, xát vỏ và phơi giữ lớp nhớt trên giàn. Hồ sơ hương vị robusta sạch và ngọt hơn, dành cho phối trộn specialty và espresso đơn nguồn gốc.",
    crop: "2026/27",
    processing: ["Chế biến mật ong (honey)", "Phơi giàn"],
    grade: "Fine Robusta",
    spec: {
      species: "Coffea canephora (Robusta)",
      grade: "Fine Robusta",
      screen: "16+",
      processing: "Chế biến mật ong (honey)",
      cropYear: "2026/27",
      packing: "Bao đay 60 kg + GrainPro",
    },
    packings: [jute60],
    loadingPorts: coffeePorts,
    moq: "Từ 1 pallet (hàng lẻ LCL)",
    image: { alt: "Chùm quả cà phê đỏ và xanh" },
  },

  // ------------------------------------------------------------------ CASHEW
  "cashew-kernels-w320": {
    name: "Hạt điều nhân W320",
    shortDescription: "Cấp nhân trắng nguyên được giao dịch nhiều nhất — dành cho nhà đóng gói snack và nhà bán lẻ.",
    overview:
      "Nhân trắng nguyên, 300–320 hạt/pound, phân loại theo tham chiếu AFI và đóng gói hút chân không trong thùng thiếc hoặc túi. Nguồn gốc điều thô (RCN) được khai báo cho từng lô.",
    crop: "Chế biến năm 2026",
    processing: ["Hấp & tách vỏ", "Bóc vỏ lụa", "Phân loại", "Đóng gói hút chân không"],
    grade: "W320",
    spec: {
      grade: "W320 (nhân trắng nguyên)",
      count: "300 – 320 hạt / lb",
      color: "Trắng / ngà nhạt",
      standard: "Tiêu chuẩn AFI (tham chiếu)",
      packing: "Thùng thiếc hoặc túi hút chân không, 2 × 11.34 kg",
      shelfLife: "12 tháng (hút chân không)",
    },
    packings: [cashewTin, cashewBag, cashewRetail],
    loadingPorts: southPorts,
    moq: "1 × cont 20 ft (≈ 700 carton)",
    image: { alt: "Nhân điều trắng trong rổ đan" },
    gallery: [
      { alt: "Nhân điều tràn ra từ bao đay" },
      { alt: "Nhân điều trong bát trắng" },
    ],
  },
  "cashew-kernels-w240": {
    name: "Hạt điều nhân W240",
    shortDescription: "Nhân trắng nguyên hạt lớn cho kênh bán lẻ cao cấp và quà tặng.",
    overview:
      "Nhân trắng nguyên cỡ lớn (220–240 hạt/pound), tuyển chọn cho các dòng snack cao cấp và quà tặng. Áp dụng cùng quy trình kiểm soát chế biến và đóng gói như W320.",
    crop: "Chế biến năm 2026",
    processing: ["Hấp & tách vỏ", "Bóc vỏ lụa", "Phân loại", "Đóng gói hút chân không"],
    grade: "W240",
    spec: {
      grade: "W240 (nhân trắng nguyên)",
      count: "220 – 240 hạt / lb",
      color: "Trắng / ngà nhạt",
      standard: "Tiêu chuẩn AFI (tham chiếu)",
      packing: "Thùng thiếc hoặc túi hút chân không, 2 × 11.34 kg",
      shelfLife: "12 tháng (hút chân không)",
    },
    packings: [cashewTin, cashewBag],
    loadingPorts: southPorts,
    moq: moq20,
    image: { alt: "Nhân điều trắng cỡ lớn trong bát" },
  },
  "cashew-splits-ws": {
    name: "Hạt điều nhân vỡ đôi WS",
    shortDescription: "Nhân trắng vỡ đôi cho ngành bánh, kẹo và nguyên liệu thực phẩm.",
    overview:
      "Nhân trắng tách đôi tự nhiên — lựa chọn tối ưu chi phí khi không yêu cầu ngoại quan nhân nguyên. Được ưa chuộng bởi các nhà sản xuất bánh, ngũ cốc và bánh kẹo.",
    crop: "Chế biến năm 2026",
    processing: ["Hấp & tách vỏ", "Bóc vỏ lụa", "Phân loại", "Đóng gói hút chân không"],
    grade: "WS",
    spec: {
      grade: "WS (nhân trắng vỡ đôi)",
      color: "Trắng / ngà nhạt",
      standard: "Tiêu chuẩn AFI (tham chiếu)",
      packing: "Túi hút chân không, 2 × 11.34 kg",
      shelfLife: "12 tháng (hút chân không)",
    },
    packings: [cashewBag],
    loadingPorts: southPorts,
    moq: moq20,
    image: { alt: "Nhân điều trong bát gỗ" },
  },

  // ------------------------------------------------------------------ PEPPER
  "black-pepper-550gl": {
    name: "Tiêu đen 550 g/l – Làm sạch",
    shortDescription: "Tiêu đen làm sạch bằng máy cho nhà xay và đóng gói gia vị.",
    overview:
      "Tiêu đen từ Gia Lai và Đắk Lắk, làm sạch bằng máy và phân loại đạt dung trọng 550 g/l. Có tùy chọn tiệt trùng bằng hơi nước cho người mua có giới hạn vi sinh.",
    crop: "2026",
    processing: ["Phơi nắng", "Làm sạch bằng máy", "Tiệt trùng hơi nước (tùy chọn)"],
    grade: "550 g/l",
    spec: {
      type: "Tiêu đen, nguyên hạt",
      processing: "Làm sạch bằng máy",
      micro: "Theo quy cách người mua (có tùy chọn tiệt trùng)",
      packing: "Bao PP 25 / 50 kg",
    },
    packings: [pepperBag, bigBag],
    loadingPorts: southPorts,
    moq: moq20,
    image: { alt: "Hạt tiêu đen trong muỗng bên cạnh bao đay" },
    gallery: [
      { alt: "Chùm tiêu xanh trên dây" },
      { alt: "Bàn tay cầm hạt tiêu đen khô" },
    ],
  },
  "white-pepper-630gl": {
    name: "Tiêu trắng 630 g/l",
    shortDescription: "Tiêu trắng rửa hai lần cho sản xuất nước sốt, gia vị và bán lẻ.",
    overview:
      "Tiêu trắng ngâm bóc vỏ và rửa hai lần, bề mặt sạch, màu sáng. Phân loại đạt 630 g/l và sấy đến độ ẩm thấp để ổn định khi vận chuyển đường biển.",
    crop: "2026",
    processing: ["Ngâm bóc vỏ", "Rửa hai lần", "Phơi nắng"],
    grade: "630 g/l",
    spec: {
      type: "Tiêu trắng, nguyên hạt",
      processing: "Rửa hai lần",
      micro: "Theo quy cách người mua",
      packing: "Bao PP 25 / 50 kg",
    },
    packings: [pepperBag],
    loadingPorts: southPorts,
    moq: moq20,
    image: { alt: "Hạt tiêu trong muỗng kim loại trên nền tối" },
  },

  // ------------------------------------------------------------------ CINNAMON
  "split-cassia-cinnamon": {
    name: "Quế chẻ",
    shortDescription: "Vỏ quế chẻ cạo vỏ, hàm lượng tinh dầu cao, dành cho nhà xay gia vị.",
    overview:
      "Vỏ quế từ cây 10–15 năm tuổi tại Yên Bái, được cạo vỏ, chẻ, phơi nắng và sấy lại trước khi đóng gói. Quy cách theo chiều dài, hàm lượng tinh dầu và độ ẩm.",
    crop: "Vụ Xuân 2026",
    processing: ["Cạo vỏ", "Phơi nắng", "Sấy lại"],
    grade: "Quế chẻ 2–3% tinh dầu",
    spec: {
      form: "Chẻ, đã cạo vỏ",
      size: "30 – 45 cm, rộng 2 – 4 cm",
      processing: "Phơi nắng, cạo vỏ",
      packing: "Thùng carton 10 kg / bao PP",
      shelfLife: "24 tháng",
    },
    packings: [spiceCarton, spiceBag],
    loadingPorts: northPorts,
    moq: moq20,
    image: { alt: "Đống vỏ quế" },
    gallery: [
      { alt: "Thanh quế xếp chồng" },
      { alt: "Thanh quế và hoa hồi trên mặt gỗ" },
    ],
  },
  "cassia-sticks-8cm": {
    name: "Quế ống – Cắt 8 cm",
    shortDescription: "Quế cuộn ống cắt 8 cm cho lọ gia vị bán lẻ và dịch vụ ăn uống.",
    overview:
      "Quế ống vỏ mỏng được cuộn và cắt đều 8 cm, làm sạch và phân loại theo đường kính. Phù hợp cho lọ gia vị bán lẻ, đồ uống nóng pha gia vị và dịch vụ ăn uống.",
    crop: "Vụ Xuân 2026",
    processing: ["Cuộn ống", "Cắt theo chiều dài", "Phơi nắng"],
    grade: "Quế ống 8 cm",
    spec: {
      form: "Dạng ống / thanh",
      size: "8 cm (±0.5 cm), Ø 0.8 – 1.2 cm",
      processing: "Cuộn ống, cắt, phơi nắng",
      packing: "Thùng carton 10 kg",
      shelfLife: "24 tháng",
    },
    packings: [spiceCarton],
    loadingPorts: northPorts,
    moq: "1 × cont 20 ft · có thể đóng ghép với hoa hồi",
    image: { alt: "Thanh quế cuộn cùng bột quế" },
  },
  "cassia-powder": {
    name: "Bột quế",
    shortDescription: "Bột quế xay mịn cho ngành bánh, hỗn hợp gia vị và bán lẻ.",
    overview:
      "Vỏ quế được làm sạch, sấy lại và xay theo cỡ lưới (mesh) người mua yêu cầu. Có tùy chọn tiệt trùng bằng hơi nước cho người mua có giới hạn vi sinh.",
    crop: "2026",
    processing: ["Xay", "Rây", "Tiệt trùng hơi nước (tùy chọn)"],
    grade: "Bột 60 mesh",
    spec: {
      form: "Dạng bột",
      size: "60 mesh (cỡ mesh khác theo yêu cầu)",
      processing: "Xay, rây",
      packing: "Bao giấy kraft 25 kg",
      shelfLife: "18 tháng",
    },
    packings: [powderBag],
    loadingPorts: northPorts,
    moq: "5 MT",
    image: { alt: "Thanh quế đặt trên bột quế" },
  },

  // ------------------------------------------------------------------ STAR ANISE
  "star-anise-autumn": {
    name: "Hoa hồi – Vụ thu",
    shortDescription: "Hoa hồi nguyên cánh, màu nâu đỏ từ vụ chính tại Lạng Sơn.",
    overview:
      "Hoa hồi vụ thu từ Lạng Sơn: bông to, cánh đầy, hương thơm đậm. Phân loại theo tỷ lệ bông nguyên và phơi khô đến độ ẩm an toàn.",
    crop: "Vụ Thu 2026",
    processing: ["Phơi nắng", "Phân loại thủ công"],
    grade: "Vụ thu ≥ 80% bông nguyên",
    spec: {
      form: "Bông nguyên",
      size: "≥ 2.5 cm, ≥ 80% bông nguyên",
      processing: "Phơi nắng, phân loại thủ công",
      packing: "Thùng carton 10 kg",
      shelfLife: "24 tháng",
    },
    packings: [spiceCarton],
    loadingPorts: northPorts,
    moq: moq20,
    image: { alt: "Hoa hồi nguyên bông chất đống trên bàn gỗ" },
    gallery: [
      { alt: "Hoa hồi nguyên bông, nhìn từ trên xuống" },
      { alt: "Một bông hoa hồi trên nền tối" },
    ],
  },
  "star-anise-spring": {
    name: "Hoa hồi – Vụ xuân",
    shortDescription: "Bông hồi vụ xuân nhỏ hơn, màu nhạt hơn — lựa chọn tối ưu chi phí cho xay bột và chiết xuất.",
    overview:
      "Hoa hồi vụ xuân có bông nhỏ hơn và tỷ lệ cánh gãy cao hơn. Rất phù hợp cho xay bột, chiết xuất tinh dầu và phối trộn gia vị.",
    crop: "Vụ Xuân 2026",
    processing: ["Phơi nắng", "Phân loại bằng máy"],
    grade: "Vụ xuân ≥ 70% bông nguyên",
    spec: {
      form: "Bông nguyên / cánh gãy",
      size: "≥ 2 cm, ≥ 70% bông nguyên",
      processing: "Phơi nắng, phân loại bằng máy",
      packing: "Bao PP 20 kg / thùng carton 10 kg",
      shelfLife: "24 tháng",
    },
    packings: [spiceBag, spiceCarton],
    loadingPorts: northPorts,
    moq: moq20,
    image: { alt: "Hoa hồi xếp trên nền tối" },
  },

  // ------------------------------------------------------------------ DRIED MANGO
  "soft-dried-mango-bulk": {
    name: "Xoài sấy dẻo – Lát hàng xá",
    shortDescription: "Xoài sấy dẻo cắt lát, đóng thùng carton hàng xá cho nhà đóng gói snack và dịch vụ ăn uống.",
    overview:
      "Xoài chín từ Đồng bằng sông Cửu Long được gọt vỏ, cắt lát và sấy nhẹ nhàng để đạt độ mềm dẻo. Đóng trong túi đạt chuẩn thực phẩm bên trong thùng carton 10 kg, phù hợp cho đóng gói lại, trail mix và dịch vụ ăn uống.",
    crop: "Vụ 2026",
    processing: ["Cắt lát", "Sấy nhiệt độ thấp", "Dò kim loại"],
    grade: "Dạng lát",
    spec: {
      variety: "Cát Chu / Keo (tùy nguồn hàng)",
      cut: "Lát dày 5 – 8 mm, dài 6 – 10 cm",
      sugar: "Ngâm đường mía (theo quy cách)",
      additives: "Axit citric; không phẩm màu nhân tạo",
      texture: "Mềm, dẻo",
      packing: "Thùng carton 10 kg (2 túi PE × 5 kg)",
      shelfLife: "12 tháng",
    },
    packings: [mangoCarton],
    loadingPorts: southPorts,
    moq: "1 × cont 20 ft · có thể ghép pallet",
    image: { alt: "Lát xoài sấy dẻo trên giấy nến" },
    gallery: [
      { alt: "Miếng xoài sấy, cận cảnh" },
      { alt: "Lát xoài sấy trên nền trắng" },
    ],
  },
  "owi-chewi-dried-mango": {
    name: "Xoài sấy dẻo Owi Chewi – Túi bán lẻ",
    shortDescription: "Thương hiệu Owi Chewi của chúng tôi: túi xoài sấy dẻo sẵn sàng lên kệ.",
    overview:
      "Owi Chewi là thương hiệu bán lẻ xoài sấy dẻo của chúng tôi, đóng trong túi đứng có khóa zip đóng mở nhiều lần. Cung cấp cho nhà phân phối và nhà bán lẻ dưới dạng hàng mang thương hiệu, hoặc làm nhãn riêng với cùng sản phẩm.",
    crop: "Vụ 2026",
    processing: ["Cắt lát", "Sấy nhiệt độ thấp", "Túi nạp khí nitơ"],
    grade: "Túi bán lẻ",
    spec: {
      variety: "Cát Chu / Keo (tùy nguồn hàng)",
      cut: "Dạng lát",
      sugar: "Ngọt nhẹ",
      additives: "Axit citric; không phẩm màu nhân tạo",
      texture: "Mềm, dẻo",
      packing: "Túi 100 g / 250 g / 500 g",
      shelfLife: "12 tháng",
    },
    packings: [mangoPouch, mangoCarton],
    loadingPorts: southPorts,
    moq: "200 carton · ghép nhiều cỡ túi",
    image: { alt: "Xoài sấy dẻo Owi Chewi trong bát" },
    gallery: [{ alt: "Bát xoài sấy dẻo cắt lát" }],
  },
  "low-sugar-dried-mango": {
    name: "Xoài sấy ít đường",
    shortDescription: "Xoài sấy giảm đường cho các dòng snack hướng đến sức khỏe.",
    overview:
      "Xoài sấy không bổ sung đường sucrose ngoài một lần ngâm nhẹ, giữ vị ngọt tự nhiên của trái. Được ưa chuộng bởi các nhà bán lẻ thực phẩm sức khỏe và nhà sản xuất ngũ cốc ăn sáng.",
    crop: "Vụ 2026",
    processing: ["Cắt lát", "Sấy nhiệt độ thấp"],
    grade: "Ít đường",
    spec: {
      variety: "Cát Chu / Keo (tùy nguồn hàng)",
      cut: "Dạng lát hoặc hạt lựu 10 × 10 mm",
      sugar: "Giảm đường (theo quy cách)",
      additives: "Không",
      texture: "Mềm, hơi chắc",
      packing: "Thùng carton 10 kg",
      shelfLife: "9 tháng",
    },
    packings: [mangoCarton],
    loadingPorts: southPorts,
    moq: "3 MT",
    image: { alt: "Lát xoài sấy trên nền trắng" },
  },
};
