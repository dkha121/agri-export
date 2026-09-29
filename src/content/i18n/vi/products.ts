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
const pp25: PackingVi = { name: "Bao PP dệt", netWeight: "25 kg", material: "PP có lót PE bên trong", loading: "≈ 25 MT / cont 20 ft" };
const pp50: PackingVi = { name: "Bao PP dệt", netWeight: "50 kg", material: "PP có lót PE bên trong", loading: "≈ 25 MT / cont 20 ft" };
const retailRice: PackingVi = {
  name: "Túi bán lẻ",
  netWeight: "1 / 2 / 5 kg",
  material: "PA/PE hút chân không hoặc màng ghép in",
  loading: "≈ 22 MT / cont 20 ft",
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
const fruitCarton: PackingVi = {
  name: "Thùng carton có lỗ thông gió",
  netWeight: "5 – 10 kg",
  material: "Carton sóng, lưới xốp bọc từng trái",
  loading: "≈ 20 pallet / container lạnh 40 ft",
};
const frozenCarton: PackingVi = {
  name: "Thùng carton hàng đông lạnh",
  netWeight: "10 kg (túi trong hút chân không)",
  material: "Túi PE bên trong + thùng carton ngoài",
  loading: "≈ 24 MT / container lạnh 40 ft",
};
const spiceCarton: PackingVi = { name: "Thùng carton", netWeight: "10 – 15 kg", material: "Carton sóng có lót PE", loading: "≈ 12–16 MT / cont 40 ft" };

const coffeePorts = ["Cát Lái (TP. Hồ Chí Minh)", "Cái Mép"];
const southPorts = ["Cát Lái (TP. Hồ Chí Minh)", "Cái Mép"];
const northPorts = ["Hải Phòng"];

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
    image: { alt: "Cà phê nhân Robusta Loại 1 Sàng 16", caption: "Ảnh cận sản phẩm – Robusta S16" },
    gallery: [
      { alt: "Hạt Robusta sàng 16 trên mặt sàng", caption: "Cận cảnh – kiểm tra cỡ sàng" },
      { alt: "Bao đay xếp chồng chờ đóng hàng", caption: "Đóng gói – bao đay 60 kg" },
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
    image: { alt: "Cà phê nhân Robusta Sàng 18 đánh bóng ướt", caption: "Ảnh cận sản phẩm – Robusta S18" },
    gallery: [{ alt: "Máy tách màu", caption: "Nhà máy – tách màu quang học" }],
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
    image: { alt: "Cà phê nhân Robusta Loại 2", caption: "Ảnh cận sản phẩm – Robusta L2 S13" },
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
    image: { alt: "Cà phê nhân Arabica chế biến ướt từ Cầu Đất", caption: "Ảnh cận sản phẩm – Arabica chế biến ướt" },
    gallery: [{ alt: "Cao nguyên Cầu Đất lúc bình minh", caption: "Vùng nguyên liệu – Cầu Đất" }],
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
    image: { alt: "Quả cà phê Robusta chín đỏ", caption: "Ảnh cận sản phẩm – tuyển chọn quả chín" },
  },

  // ------------------------------------------------------------------ RICE
  "st25-fragrant-rice": {
    name: "Gạo thơm ST25 – 5% tấm",
    shortDescription: "Gạo hạt dài thơm, dẻo từ giống lúa Sóc Trăng, xay mới theo từng đơn hàng.",
    overview:
      "ST25 trồng theo hợp đồng bao tiêu với các hợp tác xã Đồng bằng sông Cửu Long, xay xát sát thời điểm giao hàng để giữ mùi thơm. Lau bóng hai lần, phân loại theo chiều dài và tách màu. Cung cấp dạng bao lớn hoặc bao bì bán lẻ nhãn riêng.",
    crop: "Vụ Đông Xuân 2026",
    processing: ["Xay xát", "Lau bóng hai lần", "Tách màu"],
    grade: "5% tấm",
    spec: {
      variety: "ST25",
      milling: "Xát kỹ, lau bóng hai lần",
      cropYear: "Vụ Đông Xuân 2026",
      packing: "Bao PP 25 / 50 kg · túi bán lẻ 1–5 kg",
      shelfLife: "12 tháng (túi bán lẻ hút chân không)",
    },
    packings: [pp25, pp50, retailRice],
    loadingPorts: southPorts,
    moq: moq20,
    image: { alt: "Hạt gạo thơm ST25", caption: "Ảnh cận sản phẩm – hạt gạo ST25" },
    gallery: [{ alt: "Đóng gói gạo bán lẻ", caption: "Đóng gói – túi bán lẻ" }],
  },
  "jasmine-rice-5-broken": {
    name: "Gạo Jasmine – 5% tấm",
    shortDescription: "Gạo thơm hạt dài loại Jasmine cho nhà phân phối và dịch vụ ăn uống.",
    overview:
      "Các giống lúa thơm loại Jasmine (KDM / OM) từ An Giang và Đồng Tháp. Gạo thơm hạt dài ổn định cho kênh bán sỉ và dịch vụ ăn uống, xay xát và tách màu đạt 5% tấm.",
    crop: "Vụ Hè Thu 2026",
    processing: ["Xay xát", "Lau bóng", "Tách màu"],
    grade: "5% tấm",
    spec: {
      variety: "Jasmine (KDM / OM 18)",
      milling: "Xát kỹ, lau bóng",
      cropYear: "Vụ Hè Thu 2026",
      packing: "Bao PP 25 / 50 kg",
    },
    packings: [pp25, pp50],
    loadingPorts: southPorts,
    moq: moq20,
    image: { alt: "Hạt gạo Jasmine", caption: "Ảnh cận sản phẩm – gạo Jasmine" },
  },
  "glutinous-rice-10-broken": {
    name: "Gạo nếp – 10% tấm",
    shortDescription: "Gạo nếp hạt dài cho nhà sản xuất thực phẩm và kênh bán lẻ châu Á.",
    overview:
      "Gạo nếp hạt dài xay xát đạt 10% tấm, dùng cho nhà sản xuất bánh kẹo, món tráng miệng và kênh bán lẻ thực phẩm châu Á. Hạt trắng đục, tạp chất thấp.",
    crop: "Vụ Đông Xuân 2026",
    processing: ["Xay xát", "Tách màu"],
    grade: "10% tấm",
    spec: {
      variety: "Nếp hạt dài",
      milling: "Xát kỹ",
      cropYear: "Vụ Đông Xuân 2026",
      packing: "Bao PP 25 / 50 kg",
    },
    packings: [pp25, pp50],
    loadingPorts: southPorts,
    moq: moq20,
    image: { alt: "Hạt gạo nếp", caption: "Ảnh cận sản phẩm – gạo nếp" },
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
    image: { alt: "Hạt điều nhân trắng nguyên W320", caption: "Ảnh cận sản phẩm – nhân điều W320" },
    gallery: [{ alt: "Đóng gói hút chân không hạt điều", caption: "Đóng gói – thùng thiếc hút chân không" }],
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
    image: { alt: "Hạt điều nhân W240", caption: "Ảnh cận sản phẩm – nhân điều W240" },
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
    image: { alt: "Hạt điều nhân trắng vỡ đôi", caption: "Ảnh cận sản phẩm – nhân vỡ đôi WS" },
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
    image: { alt: "Tiêu đen 550 g/l", caption: "Ảnh cận sản phẩm – tiêu đen" },
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
    image: { alt: "Tiêu trắng 630 g/l", caption: "Ảnh cận sản phẩm – tiêu trắng" },
  },

  // ------------------------------------------------------------------ FRUITS
  "white-flesh-dragon-fruit": {
    name: "Thanh long ruột trắng – Tươi",
    shortDescription: "Thanh long Bình Thuận tươi, phân loại theo số trái và làm lạnh sơ bộ cho container lạnh.",
    overview:
      "Thanh long ruột trắng tươi (giống Bình Thuận) từ vùng trồng đã được cấp mã số. Rửa, phân loại theo trọng lượng và làm lạnh sơ bộ tại nhà đóng gói. Yêu cầu riêng của từng thị trường (ví dụ chiếu xạ hoặc xử lý hơi nước nóng) được xác nhận theo thị trường trước khi ký hợp đồng.",
    crop: "Vụ 2026",
    processing: ["Rửa tại nhà đóng gói", "Phân loại", "Làm lạnh sơ bộ"],
    spec: {
      variety: "Ruột trắng Bình Thuận (Hylocereus undatus)",
      sizeCount: "300 – 600 g / trái · 8–16 trái / thùng 5 kg",
      storageTemp: "5 – 8 °C",
      shelfLife: "25 – 30 ngày ở 5 °C",
      season: "Quanh năm, cao điểm tháng 5 – 8",
      treatment: "Tùy thị trường (VHT / chiếu xạ)",
      packing: "Thùng carton thông gió 5 kg",
    },
    packings: [fruitCarton],
    loadingPorts: ["Cát Lái (TP. Hồ Chí Minh)", "Tân Sơn Nhất (hàng không)"],
    moq: "1 × container lạnh 40 ft · hàng không từ 1 pallet",
    image: { alt: "Thanh long ruột trắng tươi", caption: "Ảnh cận sản phẩm – thanh long" },
    gallery: [{ alt: "Vườn thanh long", caption: "Vùng nguyên liệu – Bình Thuận" }],
  },
  "cat-chu-mango": {
    name: "Xoài Cát Chu – Tươi",
    shortDescription: "Xoài ngọt, ít xơ từ Đồng Tháp cho thị trường châu Á và Trung Đông.",
    overview:
      "Xoài Cát Chu từ các vườn tại Đồng Tháp, thu hoạch ở độ già xanh để vận chuyển đường biển. Điều kiện nhập khẩu và phương pháp xử lý khác nhau theo thị trường đích — xác nhận theo từng thị trường.",
    crop: "Vụ 2026",
    processing: ["Xử lý nước nóng", "Phân loại", "Làm lạnh sơ bộ"],
    spec: {
      variety: "Cát Chu",
      sizeCount: "250 – 400 g / trái",
      storageTemp: "10 – 13 °C",
      shelfLife: "18 – 21 ngày",
      season: "Tháng 3 – 6 (chính vụ), tháng 10 – 12 (nghịch vụ)",
      treatment: "Nước nóng / VHT tùy thị trường",
      packing: "Thùng carton 5 kg",
    },
    packings: [fruitCarton],
    loadingPorts: ["Cát Lái (TP. Hồ Chí Minh)"],
    moq: "1 × container lạnh 40 ft",
    image: { alt: "Xoài Cát Chu", caption: "Ảnh cận sản phẩm – xoài Cát Chu" },
  },
  "frozen-durian-ri6": {
    name: "Sầu riêng Ri6 đông lạnh – Nguyên trái & Múi",
    shortDescription: "Sầu riêng Ri6 cấp đông nhanh, nguyên trái hoặc múi đóng gói hút chân không.",
    overview:
      "Sầu riêng Ri6 thu hoạch khi đủ độ chín và cấp đông nhanh (tâm sản phẩm -35 °C) ở dạng nguyên trái hoặc múi đóng gói hút chân không. Phù hợp cho dịch vụ ăn uống và nhà sản xuất món tráng miệng.",
    crop: "Vụ 2026",
    processing: ["Cấp đông nhanh", "Đóng gói hút chân không (múi)"],
    spec: {
      variety: "Ri6",
      sizeCount: "Nguyên trái 2 – 4 kg · múi gói 400 g",
      storageTemp: "≤ -18 °C",
      shelfLife: "24 tháng ở trạng thái đông lạnh",
      season: "Quanh năm từ hàng tồn kho đông lạnh",
      treatment: "Cấp đông nhanh",
      packing: "Thùng carton ngoài 10 kg",
    },
    packings: [frozenCarton],
    loadingPorts: ["Cát Lái (TP. Hồ Chí Minh)"],
    moq: "1 × container lạnh 40 ft",
    image: { alt: "Múi sầu riêng đông lạnh", caption: "Ảnh cận sản phẩm – sầu riêng" },
  },

  // ------------------------------------------------------------------ SPICES
  "split-cassia-cinnamon": {
    name: "Quế chẻ",
    shortDescription: "Vỏ quế chẻ cạo vỏ, hàm lượng tinh dầu cao, dành cho nhà xay gia vị.",
    overview:
      "Vỏ quế từ cây 10–15 năm tuổi tại Yên Bái, được cạo vỏ, chẻ, phơi nắng và sấy lại trước khi đóng gói. Quy cách theo chiều dài, hàm lượng tinh dầu và độ ẩm.",
    crop: "Vụ Xuân 2026",
    processing: ["Cạo vỏ", "Phơi nắng", "Sấy lại"],
    spec: {
      form: "Chẻ, đã cạo vỏ",
      size: "30 – 45 cm, rộng 2 – 4 cm",
      processing: "Phơi nắng, cạo vỏ",
      packing: "Thùng carton 10 kg / bao PP",
      shelfLife: "24 tháng",
    },
    packings: [spiceCarton],
    loadingPorts: northPorts,
    moq: moq20,
    image: { alt: "Vỏ quế chẻ", caption: "Ảnh cận sản phẩm – quế chẻ" },
  },
  "star-anise-autumn": {
    name: "Hoa hồi – Vụ thu",
    shortDescription: "Hoa hồi nguyên cánh, màu nâu đỏ từ vụ chính tại Lạng Sơn.",
    overview:
      "Hoa hồi vụ thu từ Lạng Sơn: bông to, cánh đầy, hương thơm đậm. Phân loại theo tỷ lệ bông nguyên và phơi khô đến độ ẩm an toàn.",
    crop: "Vụ Thu 2026",
    processing: ["Phơi nắng", "Phân loại thủ công"],
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
    image: { alt: "Hoa hồi nguyên bông", caption: "Ảnh cận sản phẩm – hoa hồi" },
  },
};
