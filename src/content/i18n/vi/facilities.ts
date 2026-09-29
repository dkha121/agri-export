import type { Facility } from "../../types";
import type { DeepPartial } from "../types";

/** Vietnamese overlay for facilities (merged over /src/content/facilities.ts). */
export const facilitiesVi: Record<string, DeepPartial<Facility>> = {
  "dak-lak-coffee-plant": {
    name: "Nhà máy Chế biến Cà phê Buôn Ma Thuột",
    shortName: "Nhà máy cà phê · Đắk Lắk",
    type: "Chế biến cà phê nhân & hồ tiêu",
    address: "[Địa chỉ xác thực], Buôn Ma Thuột, Đắk Lắk, Việt Nam",
    province: "Đắk Lắk",
    portDistance: "≈ 350 km đến Cát Lái / Cái Mép",
    metrics: [
      { label: "Diện tích nhà máy", definition: "Chỉ tính diện tích khuôn viên của nhà máy này" },
      { label: "Công suất năm", definition: "Cà phê nhân, công suất thiết kế, mỗi năm" },
      { label: "Dây chuyền chế biến", definition: "Số dây chuyền làm sạch / phân loại đã đưa vào vận hành" },
      { label: "Kho", definition: "Sức chứa hàng bao, nhiệt độ thường" },
    ],
    processes: [
      { title: "Tiếp nhận & lấy mẫu", body: "Lấy mẫu kiểm tra độ ẩm và lỗi trên từng xe hàng trước khi dỡ." },
      { title: "Làm sạch & tách đá", body: "Máy sàng sơ bộ, máy tách đá và nam châm loại bỏ tạp chất." },
      { title: "Phân loại theo sàng", body: "Tách tỷ trọng và phân cỡ sàng theo tiêu chuẩn của khách hàng (S13–S18)." },
      { title: "Phân loại quang học", body: "Máy tách màu loại bỏ hạt đen, hạt vỡ và hạt biến màu." },
      { title: "Đánh bóng (tùy chọn)", body: "Đánh bóng ướt cho khách hàng có yêu cầu." },
      { title: "Đóng bao & xếp hàng", body: "Đóng bao đay hoặc đóng xá bằng túi lót container, kèm ký mã hiệu lô và hồ sơ kẹp chì." },
    ],
    equipment: ["Máy tách màu", "Bàn tách tỷ trọng", "Máy phân loại sàng", "Máy đo độ ẩm", "Hệ thống đóng xá container bằng túi lót"],
    image: { alt: "Dây chuyền chế biến cà phê với máy tách màu", caption: "Nhà máy – dây chuyền phân loại & tách màu" },
    gallery: [
      { alt: "Hạt cà phê trong muỗng xúc và bao đay" },
      { alt: "Xếp bao đay vào container", caption: "Đóng hàng – container 20 ft" },
    ],
  },
  "binh-phuoc-cashew-plant": {
    name: "Nhà máy Chế biến Điều Đồng Xoài",
    shortName: "Nhà máy điều · Đồng Nai",
    type: "Tách vỏ, bóc vỏ lụa & phân loại hạt điều",
    address: "[Địa chỉ xác thực], Đồng Xoài, Đồng Nai, Việt Nam",
    province: "Đồng Nai (trước đây là Bình Phước)",
    portDistance: "≈ 110 km đến Cát Lái",
    metrics: [
      { label: "Diện tích nhà máy", definition: "Chỉ tính diện tích khuôn viên của nhà máy này" },
      { label: "Công suất năm", definition: "Sản lượng nhân điều, mỗi năm" },
      { label: "Dây chuyền chế biến", definition: "Số dây chuyền tách vỏ + bóc vỏ lụa đã đưa vào vận hành" },
      { label: "Kho lạnh", definition: "Dải nhiệt độ bảo quản nhân điều" },
    ],
    processes: [
      { title: "Tiếp nhận RCN", body: "Kiểm tra tỷ lệ thu hồi nhân (KOR) và độ ẩm cho từng lô hạt điều thô." },
      { title: "Hấp & tách vỏ", body: "Dây chuyền tách vỏ tự động với quá trình hấp được kiểm soát." },
      { title: "Sấy & bóc vỏ lụa", body: "Sấy nhân đến độ ẩm mục tiêu, sau đó bóc vỏ lụa." },
      { title: "Phân loại", body: "Phân loại theo kích cỡ và màu sắc từ W180 – W450 và nhân vỡ." },
      { title: "Dò kim loại", body: "Mọi thùng carton đều đi qua máy dò kim loại đã hiệu chuẩn." },
      { title: "Hút chân không", body: "Đóng lon hoặc túi, nạp khí CO₂, in mã lô." },
    ],
    equipment: ["Máy tách vỏ tự động", "Dây chuyền bóc vỏ lụa", "Máy phân loại quang học", "Máy dò kim loại", "Máy hút chân không"],
    image: { alt: "Bàn phân loại nhân điều", caption: "Nhà máy – phân loại nhân điều" },
    gallery: [
      { alt: "Nhân điều trắng đã phân loại" },
      { alt: "Kho lạnh", caption: "Kho lạnh – nhân điều" },
    ],
  },
  "dong-thap-fruit-plant": {
    name: "Nhà máy Chế biến Trái cây Sấy Đồng Tháp",
    shortName: "Nhà máy trái cây sấy · Đồng Tháp",
    type: "Ủ chín, cắt lát, sấy & đóng gói xoài",
    address: "[Địa chỉ xác thực], Cao Lãnh, Đồng Tháp, Việt Nam",
    province: "Đồng Tháp",
    portDistance: "≈ 150 km đến Cát Lái",
    metrics: [
      { label: "Diện tích nhà máy", definition: "Chỉ tính diện tích khuôn viên của nhà máy này" },
      { label: "Công suất năm", definition: "Xoài sấy thành phẩm, mỗi năm" },
      { label: "Dây chuyền sấy", definition: "Số dây chuyền cắt lát + sấy đã đưa vào vận hành" },
      { label: "Kho thành phẩm", definition: "Kho kiểm soát nhiệt độ cho sản phẩm đã đóng gói" },
    ],
    processes: [
      { title: "Tiếp nhận trái tươi", body: "Kiểm tra độ Brix, độ chín và khuyết tật trên từng chuyến hàng từ vườn." },
      { title: "Ủ chín & rửa", body: "Ủ chín có kiểm soát, rửa và khử trùng trước khi gọt vỏ." },
      { title: "Gọt vỏ & cắt lát", body: "Gọt vỏ và cắt lát thủ công theo độ dày quy định." },
      { title: "Ngâm đường & sấy", body: "Ngâm nhẹ trong syrup (theo quy cách) và sấy nhiệt độ thấp đến độ ẩm mục tiêu." },
      { title: "Kiểm tra", body: "Kiểm tra độ ẩm và hoạt độ nước, dò kim loại trên từng gói." },
      { title: "Đóng gói", body: "Thùng carton hàng xá hoặc túi Owi Chewi / nhãn riêng, in mã lô." },
    ],
    equipment: ["Phòng ủ chín", "Bàn cắt lát", "Hầm sấy khí nóng", "Máy đo hoạt độ nước", "Máy dò kim loại", "Máy chiết rót & hàn miệng túi"],
    image: { alt: "Hầm sấy xoài", caption: "Nhà máy – hầm sấy" },
    gallery: [
      { alt: "Xoài sấy dẻo Owi Chewi" },
      { alt: "Dây chuyền đóng túi", caption: "Đóng gói – túi Owi Chewi" },
    ],
  },
};
