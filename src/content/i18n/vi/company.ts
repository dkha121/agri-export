import type { company, trustMetrics, contacts, offices, markets, sustainabilityMetrics } from "../../company";
import type { DeepPartial } from "../types";

/** Vietnamese overlay for corporate identity & contacts (merged over /src/content/company.ts). */
export const companyVi: {
  company?: DeepPartial<typeof company>;
  trustMetrics?: DeepPartial<typeof trustMetrics>;
  contacts?: DeepPartial<typeof contacts>;
  offices?: DeepPartial<typeof offices>;
  markets?: DeepPartial<typeof markets>;
  sustainabilityMetrics?: DeepPartial<typeof sustainabilityMetrics>;
} = {
  company: {
    legalName: "TrustVN",
    registration: "Mã số doanh nghiệp: Chưa có",
    tagline: "Vietnam Origin. Global Supply.",
    headquarters: "17A1 Đường 9, Tăng Nhơn Phú, TP. Hồ Chí Minh, Việt Nam",
    hours: "Thứ Hai – Thứ Sáu, 08:00 – 17:30 (giờ Việt Nam, UTC+7)",
  },
  trustMetrics: [
    {
      label: "Thị trường xuất khẩu",
      owner: "Kinh doanh / Xuất khẩu",
      definition: "Số quốc gia đã giao đơn hàng thương mại (không tính thị trường mục tiêu)",
    },
    {
      label: "Công suất chế biến hằng năm",
      owner: "Vận hành",
      definition: "Công suất thiết kế, tất cả nhà máy, mỗi năm",
    },
    { label: "Năm xuất khẩu", owner: "Công ty", definition: "Từ năm 2008 (năm thành lập)" },
    { label: "Nhóm sản phẩm", owner: "Sản phẩm", definition: "Nhóm sản phẩm có mã hàng xuất khẩu đang hoạt động" },
  ],
  contacts: [
    {
      team: "Bộ phận Cà phê & Hồ tiêu",
      region: "Châu Âu · Châu Mỹ",
      name: "[Tên quản lý kinh doanh]",
      languages: "Tiếng Anh, tiếng Đức",
    },
    {
      team: "Bộ phận Điều & Xoài sấy",
      region: "Châu Á · Trung Đông · Châu Đại Dương",
      name: "[Tên quản lý kinh doanh]",
      languages: "Tiếng Anh, tiếng Trung",
    },
    {
      team: "Bộ phận Quế & Hoa hồi",
      region: "Tất cả thị trường",
      name: "[Tên quản lý kinh doanh]",
      languages: "Tiếng Anh, tiếng Hàn",
    },
    {
      team: "Chất lượng & Tuân thủ",
      region: "Phê duyệt nhà cung cấp, đánh giá (audit), hồ sơ",
      name: "[Tên trưởng phòng QA]",
      languages: "Tiếng Anh",
    },
  ],
  offices: [
    {
      name: "Trụ sở chính & kinh doanh xuất khẩu",
      address: "17A1 Đường 9, Tăng Nhơn Phú, TP. Hồ Chí Minh, Việt Nam",
      note: "Kinh doanh, QA/tuân thủ, logistics",
    },
    { name: "Nhà máy chế biến cà phê", address: "[Địa chỉ xác thực], Buôn Ma Thuột, Đắk Lắk", note: "Tham quan theo lịch hẹn" },
    { name: "Nhà máy chế biến điều", address: "[Địa chỉ xác thực], Đồng Xoài, Đồng Nai", note: "Tham quan theo lịch hẹn" },
    { name: "Nhà máy trái cây sấy", address: "[Địa chỉ xác thực], Cao Lãnh, Đồng Tháp", note: "Tham quan theo lịch hẹn" },
  ],
  markets: [
    { region: "Châu Âu", countries: ["Đức", "Hà Lan", "Bỉ", "Ý", "Tây Ban Nha", "Ba Lan", "Vương quốc Anh"] },
    { region: "Bắc Mỹ", countries: ["Hoa Kỳ", "Canada"] },
    { region: "Đông Á", countries: ["Nhật Bản", "Hàn Quốc", "Trung Quốc", "Đài Loan"] },
    { region: "Trung Đông", countries: ["UAE", "Ả Rập Xê Út", "Thổ Nhĩ Kỳ"] },
    { region: "Châu Đại Dương", countries: ["Úc", "New Zealand"] },
    { region: "Châu Phi", countries: ["Ghana", "Nam Phi"] },
  ],
  sustainabilityMetrics: [
    {
      label: "sản lượng cà phê truy xuất được đến nhóm nông hộ",
      period: "Năm tài chính 2026",
      scope: "Cà phê nhân thu mua tại nhà máy Đắk Lắk",
      definition: "Sản lượng có ghi nhận mã nhóm nông hộ khi tiếp nhận ÷ tổng sản lượng cà phê tiếp nhận",
    },
    {
      label: "nông hộ đối tác trong chương trình nông hộ",
      period: "Niên vụ 2025/26",
      scope: "Cà phê & hồ tiêu, Đắk Lắk và Gia Lai",
      definition: "Nông hộ đã đăng ký và được tập huấn hoặc hỗ trợ vật tư đầu vào",
    },
    {
      label: "năng lượng trên mỗi tấn chế biến",
      period: "Năm tài chính 2026 so với năm cơ sở 2023",
      scope: "Nhà máy cà phê Đắk Lắk",
      baseline: "Năm tài chính 2023",
      definition: "kWh trên mỗi MT cà phê nhân thành phẩm",
    },
    {
      label: "bao bì có thể tái chế hoặc được chứng nhận, tính theo khối lượng",
      period: "Năm tài chính 2026",
      scope: "Vật liệu đóng gói xuất khẩu, tất cả nhà máy",
      definition: "PP/PE đơn vật liệu, bao đay và thùng carton FSC ÷ tổng khối lượng bao bì",
    },
  ],
};
