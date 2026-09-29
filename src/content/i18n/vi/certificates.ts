import type { Certificate } from "../../types";
import type { DeepPartial } from "../types";

/** Vietnamese overlay for the Certificate Center (merged over /src/content/certificates.ts). */
export const certificatesVi: Record<string, DeepPartial<Certificate>> = {
  "haccp-daklak": {
    entity: "Nhà máy Chế biến Cà phê Buôn Ma Thuột",
    scope: "Làm sạch, phân loại, tách màu và đóng gói cà phê nhân và hồ tiêu đen",
    claimRule:
      "Chỉ được ghi “Cơ sở đạt chứng nhận HACCP” trên các trang cà phê và hồ tiêu được chế biến tại nhà máy này.",
  },
  "ra-coffee-group": {
    entity: "Nhóm nông hộ Đắk Lắk [tên nhóm] + Nhà máy Buôn Ma Thuột (CoC)",
    scope: "Cà phê Robusta từ nhóm nông hộ được chứng nhận; chứng nhận chuỗi cung ứng cho khâu xử lý",
    claimRule:
      "Chỉ công bố trên các lô bán dưới dạng hàng được chứng nhận, có hồ sơ giao dịch; không phải công bố cho toàn công ty. Việc sử dụng con dấu cần được phê duyệt.",
  },
  "halal-daklak": {
    scheme: "Chứng nhận Halal",
    entity: "Nhà máy Chế biến Cà phê Buôn Ma Thuột",
    scope: "Cà phê nhân và hồ tiêu đen",
    claimRule: "Hiển thị kèm tên tổ chức cấp và ngày hết hạn. Tự động ẩn công bố khi chứng nhận hết hạn.",
  },
  "brcgs-cashew": {
    entity: "Nhà máy Chế biến Điều Đồng Xoài",
    scope: "Chế biến, phân loại và hút chân không nhân điều sống và rang",
    claimRule: "Công bố xếp hạng và phạm vi đúng như trong danh bạ BRCGS. Sử dụng logo theo quy định logo của BRCGS.",
  },
  "iso22000-cashew": {
    entity: "Nhà máy Chế biến Điều Đồng Xoài",
    scope: "Hệ thống quản lý an toàn thực phẩm cho hoạt động chế biến nhân điều",
    claimRule: "“Đạt chứng nhận ISO 22000” chỉ áp dụng cho nhà máy điều.",
  },
  "kosher-cashew": {
    scheme: "Chứng nhận Kosher",
    entity: "Nhà máy Chế biến Điều Đồng Xoài",
    scope: "Nhân điều sống (nguyên hạt và nhân vỡ)",
    claimRule: "Thư chứng nhận theo danh mục sản phẩm; các dòng điều rang không thuộc phạm vi.",
  },
  "haccp-cantho": {
    entity: "Nhà máy Xay xát & Đóng gói Gạo Cần Thơ",
    scope: "Xay xát, tách màu và đóng gói gạo trắng và gạo thơm",
    claimRule: "Áp dụng cho gạo được đóng gói tại nhà máy Cần Thơ.",
  },
  "brcgs-rice": {
    entity: "Nhà máy Xay xát & Đóng gói Gạo Cần Thơ",
    scope: "Dây chuyền đóng gói gạo bán lẻ (1–5 kg)",
    claimRule: "Đã hết hạn — không được công bố trên trang sản phẩm hoặc tài liệu marketing cho đến khi được gia hạn.",
  },
  "globalgap-dragonfruit": {
    scheme: "GLOBALG.A.P. IFA (Phương án 2 – nhóm nhà sản xuất)",
    entity: "Nhóm sản xuất thanh long Bình Thuận [tên nhóm]",
    scope: "Thanh long — chỉ các nông trại thành viên có tên trong danh sách (GGN trên chứng nhận)",
    claimRule:
      "Sử dụng GGN và phạm vi chứng nhận; không ngụ ý rằng toàn bộ trái cây đều được chứng nhận. Nhãn GGN chỉ dùng cho sản phẩm đủ điều kiện.",
  },
  "organic-pepper": {
    entity: "Nhóm nông hộ trồng tiêu Gia Lai [tên nhóm]",
    scope: "Hồ tiêu đen — nhóm nông hộ hữu cơ và khâu xử lý",
    claimRule: "Đã hết hạn — công bố hữu cơ được gỡ bỏ cho đến khi chứng nhận gia hạn được tải lên.",
  },
};
