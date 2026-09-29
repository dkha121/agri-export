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
      { alt: "Kho cà phê đóng bao", caption: "Kho – các lô hàng đóng bao" },
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
      { alt: "Phòng đóng gói hút chân không", caption: "Đóng gói – thùng hút chân không" },
      { alt: "Kho lạnh", caption: "Kho lạnh – nhân điều" },
    ],
  },
  "can-tho-rice-mill": {
    name: "Nhà máy Xay xát & Đóng gói Gạo Cần Thơ",
    shortName: "Nhà máy gạo · Cần Thơ",
    type: "Xay xát, tách màu & đóng gói gạo",
    address: "[Địa chỉ xác thực], Cần Thơ, Việt Nam",
    province: "Cần Thơ",
    portDistance: "≈ 170 km đến Cát Lái · có thể vận chuyển bằng sà lan đường sông",
    metrics: [
      { label: "Diện tích nhà máy", definition: "Chỉ tính diện tích khuôn viên của nhà máy này" },
      { label: "Công suất năm", definition: "Gạo thành phẩm, mỗi năm" },
      { label: "Dây chuyền xay xát", definition: "Số dây chuyền xay xát + tách màu đã đưa vào vận hành" },
      { label: "Kho", definition: "Sức chứa lúa + gạo thành phẩm" },
    ],
    processes: [
      { title: "Tiếp nhận lúa", body: "Kiểm tra độ ẩm, giống và độ thuần theo từng sà lan." },
      { title: "Sấy", body: "Sấy có kiểm soát đến độ ẩm bảo quản an toàn." },
      { title: "Bóc vỏ & xát trắng", body: "Xay xát đến mức độ đánh bóng theo tiêu chuẩn." },
      { title: "Phân loại", body: "Phân loại theo chiều dài hạt và tách màu để đạt tỷ lệ tấm mục tiêu." },
      { title: "Đóng gói", body: "Bao 25–50 kg hoặc túi bán lẻ 1–5 kg / nhãn riêng." },
    ],
    equipment: ["Máy sấy", "Máy xát trắng & đánh bóng", "Máy phân loại chiều dài hạt", "Máy tách màu", "Máy đóng gói cân tự động"],
    image: { alt: "Dây chuyền đánh bóng gạo", caption: "Nhà máy – xay xát & đánh bóng" },
    gallery: [
      { alt: "Dây chuyền đóng gói gạo bán lẻ", caption: "Đóng gói – nhãn riêng" },
      { alt: "Sà lan chở lúa trên sông", caption: "Logistics – sà lan đường sông" },
    ],
  },
};
