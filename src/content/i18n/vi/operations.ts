import type {
  valueChain,
  supplyChainSteps,
  qcSteps,
  labCapabilities,
  shippingModes,
  containerLoading,
  ports,
  incoterms,
  exportDocuments,
  leadTimes,
} from "../../operations";
import type { DeepPartial } from "../types";

/** Vietnamese overlay for process & logistics content (merged over /src/content/operations.ts). */
export const operationsVi: {
  valueChain?: DeepPartial<typeof valueChain>;
  supplyChainSteps?: DeepPartial<typeof supplyChainSteps>;
  qcSteps?: DeepPartial<typeof qcSteps>;
  labCapabilities?: DeepPartial<typeof labCapabilities>;
  shippingModes?: DeepPartial<typeof shippingModes>;
  containerLoading?: DeepPartial<typeof containerLoading>;
  ports?: DeepPartial<typeof ports>;
  incoterms?: DeepPartial<typeof incoterms>;
  exportDocuments?: DeepPartial<typeof exportDocuments>;
  leadTimes?: DeepPartial<typeof leadTimes>;
} = {
  valueChain: [
    { title: "Nông trại", summary: "Các nhóm nông hộ tại vùng nguyên liệu đã đăng ký cung cấp cà phê quả, hồ tiêu, hạt điều, gia vị và xoài." },
    { title: "Chế biến", summary: "Làm sạch, xay xát, tách vỏ và phân loại tại các nhà máy của chúng tôi." },
    { title: "QC", summary: "Kiểm tra cảm quan, vật lý và phòng thí nghiệm khi tiếp nhận, trong quá trình và trước khi xuất lô." },
    { title: "Đóng gói", summary: "Đóng gói theo yêu cầu khách hàng, ký mã hiệu lô và nhãn riêng khi cần." },
    { title: "Cảng", summary: "Đóng container kèm hồ sơ kẹp chì, sau đó xuất qua Cát Lái, Cái Mép hoặc Hải Phòng." },
    { title: "Khách hàng", summary: "Bộ chứng từ được phát hành theo hợp đồng; mẫu trước giao hàng khớp với hàng khi đến." },
  ],
  supplyChainSteps: [
    {
      title: "Nông trại",
      summary: "Các nhóm nông hộ và hợp tác xã đã đăng ký tại sáu vùng nguyên liệu.",
      points: ["Cấp mã nhóm nông hộ", "Định vị lô đất khi đã thu thập", "Tập huấn thực hành nông nghiệp tốt"],
    },
    {
      title: "Thu gom",
      summary: "Điểm thu gom cân, lấy mẫu và ghi nhận từng chuyến giao hàng.",
      points: ["Trọng lượng & độ ẩm khi tiếp nhận", "Chuyến hàng liên kết với mã nhóm", "Lô không đạt được trả lại, không phối trộn"],
    },
    {
      title: "Chế biến",
      summary: "Làm sạch, phân loại và tách màu theo tiêu chuẩn kỹ thuật trong hợp đồng.",
      points: ["Số mẻ chế biến", "Ghi nhận dây chuyền và ca sản xuất", "Dò kim loại khi áp dụng"],
    },
    {
      title: "QC",
      summary: "Kiểm tra vật lý và phòng thí nghiệm trước khi xuất mẻ.",
      points: ["Độ ẩm, cỡ sàng, lỗi", "Kiểm nghiệm theo kế hoạch của từng sản phẩm", "Trạng thái giữ lại & cho xuất"],
    },
    {
      title: "Đóng gói",
      summary: "Quy cách đóng gói và ký mã hiệu theo thỏa thuận trong hợp đồng.",
      points: ["Mã lô trên từng đơn vị", "Phê duyệt thiết kế nhãn riêng", "Tạo packing list"],
    },
    {
      title: "Kho",
      summary: "Bảo quản ở nhiệt độ thường, kho điều hòa hoặc kho lạnh tùy sản phẩm.",
      points: ["FIFO theo lô", "Nhật ký nhiệt độ cho chuỗi lạnh", "Hồ sơ hun trùng khi có yêu cầu"],
    },
    {
      title: "Cảng",
      summary: "Đóng container, hồ sơ kẹp chì và thông quan xuất khẩu.",
      points: ["Số container & số seal", "Gửi ảnh đóng hàng cho khách hàng", "B/L và chứng từ xuất khẩu"],
    },
  ],
  qcSteps: [
    {
      title: "Đầu vào",
      summary: "Mọi chuyến hàng đều được lấy mẫu trước khi dỡ.",
      detail:
        "Độ ẩm, mùi, lỗi nhìn thấy được và tạp chất được kiểm tra khi hàng đến. Chuyến hàng không đạt bị từ chối ngay tại cổng và được ghi nhận theo nhà cung cấp.",
      points: ["Chỉ số máy đo độ ẩm", "Sàng lọc cảm quan", "Mã nhà cung cấp / nhóm"],
    },
    {
      title: "Vật lý",
      summary: "Phân tích hạng, kích cỡ và lỗi theo tiêu chuẩn.",
      detail:
        "Phân tích sàng đối với cà phê, số hạt trên pound đối với điều, dung trọng đối với hồ tiêu, tỷ lệ bông nguyên đối với hoa hồi, hàm lượng tinh dầu đối với quế, độ ẩm và hoạt độ nước đối với xoài sấy — theo đúng phương pháp nêu trong bản tiêu chuẩn kỹ thuật.",
      points: ["Cỡ sàng / số hạt / dung trọng", "Tỷ lệ lỗi & hạt vỡ", "Màu sắc"],
    },
    {
      title: "QC trong sản xuất",
      summary: "Kiểm tra trên dây chuyền trong quá trình làm sạch, tách màu và đóng gói.",
      detail:
        "Công nhân vận hành lấy mẫu theo tần suất quy định trên từng dây chuyền. Máy dò kim loại và máy tách màu được kiểm tra xác nhận khi khởi động và mỗi ca.",
      points: ["Lấy mẫu mỗi 30–60 phút", "Kiểm tra xác nhận máy dò kim loại", "Kiểm tra vệ sinh dây chuyền"],
    },
    {
      title: "Phòng thí nghiệm",
      summary: "Phòng thí nghiệm nội bộ + phòng thí nghiệm bên thứ ba được công nhận.",
      detail:
        "Các phân tích thường quy về độ ẩm, hoạt độ nước và chỉ tiêu vật lý được thực hiện nội bộ. Aflatoxin, dư lượng thuốc bảo vệ thực vật và vi sinh được kiểm nghiệm tại phòng thí nghiệm đạt ISO/IEC 17025 theo kế hoạch kiểm nghiệm sản phẩm hoặc yêu cầu của khách hàng.",
      points: [
        "Độ ẩm & hoạt độ nước",
        "Aflatoxin / OTA (bên thứ ba)",
        "Dư lượng thuốc BVTV (bên thứ ba)",
        "Vi sinh (bên thứ ba)",
      ],
    },
    {
      title: "Thành phẩm",
      summary: "Cho xuất lô đối chiếu với tiêu chuẩn trong hợp đồng.",
      detail:
        "Mẫu gộp được lấy từ mỗi lô thành phẩm. Lô hàng chỉ được cho xuất khi mọi kết quả nằm trong tiêu chuẩn; mẫu lưu được giữ trong 12 tháng.",
      points: ["Mẫu gộp của lô", "Ký duyệt cho xuất", "Lưu mẫu 12 tháng"],
    },
    {
      title: "Trước giao hàng",
      summary: "Mẫu trước giao hàng và giám định độc lập.",
      detail:
        "Mẫu trước giao hàng được gửi để khách hàng phê duyệt khi có yêu cầu. Khách hàng có thể chỉ định đơn vị giám định độc lập (ví dụ SGS, Bureau Veritas, Intertek, Cafecontrol).",
      points: ["Gửi PSS cho khách hàng", "Giám định bên thứ ba (tùy chọn)", "Giám sát đóng hàng"],
    },
  ],
  labCapabilities: [
    { test: "Độ ẩm", method: "Tủ sấy / máy đo đã hiệu chuẩn", where: "Nội bộ" },
    { test: "Hoạt độ nước (aw)", method: "Máy đo hoạt độ nước", where: "Nội bộ" },
    { test: "Cỡ sàng / số hạt / dung trọng", method: "Sàng tiêu chuẩn, đếm hạt, g/l", where: "Nội bộ" },
    { test: "Đếm lỗi & thử nếm", method: "Bàn phân loại / phòng cupping", where: "Nội bộ (cà phê)" },
    { test: "Aflatoxin B1 / tổng, OTA", method: "HPLC", where: "Phòng thí nghiệm bên thứ ba được công nhận" },
    {
      test: "Dư lượng thuốc bảo vệ thực vật",
      method: "LC-MS/MS, GC-MS/MS đa dư lượng",
      where: "Phòng thí nghiệm bên thứ ba được công nhận",
    },
    {
      test: "Vi sinh",
      method: "Tổng vi sinh vật hiếu khí (TPC), nấm men & nấm mốc, Salmonella, E. coli",
      where: "Phòng thí nghiệm bên thứ ba được công nhận",
    },
    { test: "Kim loại nặng", method: "ICP-MS", where: "Phòng thí nghiệm bên thứ ba được công nhận" },
  ],
  shippingModes: [
    {
      title: "Hàng nguyên container",
      body: "Tiêu chuẩn cho mọi mặt hàng khô. Cont 20 ft cho cà phê, điều, hồ tiêu và xoài sấy; cont 40 ft cho quế và hoa hồi.",
    },
    {
      title: "Hàng lẻ (ghép container)",
      body: "Áp dụng cho các lô cà phê đặc sản và đơn hàng thử qua đơn vị gom hàng từ Cát Lái.",
    },
    {
      title: "Container ghép hàng",
      body: "Quế, hoa hồi và hồ tiêu có thể đóng ghép chung một container cho người mua cần khối lượng nhỏ hơn của từng mặt hàng.",
    },
    {
      title: "Đường hàng không",
      body: "Hàng mẫu và đơn hàng nhỏ gấp, ví dụ thùng bán lẻ Owi Chewi, qua sân bay Tân Sơn Nhất (SGN).",
    },
  ],
  containerLoading: [
    { product: "Cà phê nhân, bao đay 60 kg", c20: "≈ 19.2 MT (320 bao)", c40: "—", note: "Đóng xá túi lót ≈ 21 MT / cont 20 ft" },
    {
      product: "Nhân điều, thùng carton hút chân không",
      c20: "≈ 700 carton (15.9 MT)",
      c40: "≈ 1,400 carton",
      note: "2 × 11.34 kg mỗi carton",
    },
    { product: "Hồ tiêu đen, bao PP 25 / 50 kg", c20: "≈ 16 – 18 MT", c40: "≈ 26 MT", note: "Tùy theo dung trọng" },
    { product: "Quế, thùng carton / bao", c20: "≈ 7 MT", c40: "≈ 12 – 16 MT", note: "Giới hạn theo thể tích" },
    { product: "Hoa hồi, thùng carton / bao", c20: "≈ 5 MT", c40: "≈ 10 – 12 MT", note: "Giới hạn theo thể tích" },
    { product: "Xoài sấy, thùng carton 10 kg", c20: "≈ 8 – 10 MT", c40: "≈ 18 – 20 MT", note: "Nhiệt độ thường; tránh nguồn nhiệt" },
  ],
  ports: [
    { city: "TP. Hồ Chí Minh", use: "Cảng chính cho cà phê, điều, hồ tiêu và xoài sấy" },
    {
      city: "TP. Hồ Chí Minh (trước đây là Bà Rịa – Vũng Tàu)",
      use: "Cảng nước sâu cho các tuyến mainline đi thẳng châu Âu & Mỹ",
    },
    { city: "Hải Phòng", use: "Gia vị miền Bắc (quế, hồi)" },
  ],
  incoterms: [
    {
      name: "Giao hàng lên tàu",
      body: "Chúng tôi giao hàng đã xếp lên tàu tại cảng Việt Nam; người mua thu xếp cước vận chuyển.",
    },
    {
      name: "Tiền hàng và cước phí",
      body: "Chúng tôi đặt cước đến cảng đích; rủi ro chuyển giao khi hàng được xếp lên tàu.",
    },
    {
      name: "Tiền hàng, bảo hiểm và cước phí",
      body: "Như CFR, cộng thêm bảo hiểm hàng hóa mức tối thiểu đến cảng đích.",
    },
    {
      name: "Giao tại nơi đến",
      body: "Áp dụng cho một số lô cà phê đặc sản, thông qua đối tác giao nhận.",
    },
  ],
  exportDocuments: [
    { name: "Hóa đơn thương mại", note: "Mọi lô hàng" },
    { name: "Phiếu đóng gói (packing list)", note: "Mã lô, trọng lượng, ký mã hiệu" },
    { name: "Vận đơn (B/L)", note: "Bản gốc, điện giao hàng (telex release) hoặc giấy gửi hàng đường biển (sea waybill)" },
    {
      name: "Giấy chứng nhận xuất xứ (CO)",
      note: "Form EUR.1 / EVFTA, Form E, CPTPP, v.v. — tùy thị trường nhập khẩu & yêu cầu hưởng ưu đãi",
    },
    {
      name: "Giấy chứng nhận kiểm dịch thực vật",
      note: "Chỉ áp dụng cho sản phẩm thực vật; yêu cầu tùy thuộc vào mặt hàng VÀ thị trường nhập khẩu",
    },
    { name: "Phiếu kết quả phân tích (COA)", note: "Theo từng lô; phòng thí nghiệm nội bộ hoặc bên thứ ba" },
    { name: "Giấy chứng nhận hun trùng", note: "Chỉ khi thị trường nhập khẩu hoặc hợp đồng yêu cầu" },
    { name: "Giấy chứng nhận vệ sinh / chất lượng", note: "Tùy thị trường nhập khẩu (ví dụ một số thị trường châu Á)" },
    { name: "Giám định trọng lượng & chất lượng", note: "Đơn vị giám định độc lập do khách hàng chỉ định" },
  ],
  leadTimes: {
    note: "Thời gian giao hàng được xác nhận trong từng báo giá, dựa trên tồn kho, thời vụ và lịch tàu.",
  },
};
