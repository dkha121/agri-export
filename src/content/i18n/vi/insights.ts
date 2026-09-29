import type { Insight } from "../../types";
import type { DeepPartial } from "../types";

/*
 * Vietnamese overlay for the buyer resource center (src/content/insights.ts).
 * Body arrays mirror the English source block-for-block (same count, order and
 * `type`) so they merge by index. Slugs, dates, hrefs and image kinds are not
 * translated.
 */
export const insightsVi: Record<string, DeepPartial<Insight>> = {
  "vietnam-robusta-crop-outlook-2026-27": {
    title: "Triển vọng vụ Robusta Việt Nam 2026/27: người mua cần chuẩn bị gì",
    summary:
      "Tình hình ra hoa, lượng mưa và hành vi bán hàng của nông dân tại Tây Nguyên — cùng những tác động đến thời điểm ký hợp đồng và nguồn cung theo cỡ sàng.",
    reviewedBy: "Bộ phận cà phê · QA",
    cta: { label: "Tải thông số kỹ thuật Robusta S16" },
    image: { alt: "Quả cà phê Robusta đang chín trước vụ thu hoạch" },
    body: [
      {
        type: "p",
        text: "Vụ thu hoạch 2026/27 tại Tây Nguyên bắt đầu từ cuối tháng 10 ở các vùng thấp và đạt đỉnh từ tháng 11 đến tháng 1. Bài triển vọng này tổng hợp các quan sát thực địa của đội thu mua và những hàm ý đối với người mua đang lên kế hoạch cho các lô hàng giao từ Q4 2026 đến Q2 2027.",
      },
      { type: "h2", text: "Quan sát thực địa" },
      {
        type: "ul",
        items: [
          "Cà phê tại Đắk Lắk và Gia Lai ra hoa đồng đều sau khi được tưới kịp thời trong tháng 3–4.",
          "Lượng mưa mùa mưa xấp xỉ mức trung bình; quả cà phê phát triển khá đồng đều.",
          "Nông dân tiếp tục trồng xen sầu riêng và hồ tiêu, ảnh hưởng đến nguồn lao động vào thời điểm cao điểm thu hoạch.",
        ],
      },
      { type: "h2", text: "Tác động đến cỡ sàng" },
      {
        type: "p",
        text: "Quả cà phê phát triển đồng đều thường giúp tăng tỷ lệ hạt từ sàng 16 trở lên. Người mua cần S18 đánh bóng ướt vẫn nên đặt hàng sớm: các lô hạt lớn được phân tách tại nhà máy và sản lượng mỗi vụ có hạn.",
      },
      {
        type: "table",
        head: ["Hạng", "Triển vọng nguồn cung", "Khuyến nghị"],
        rows: [
          ["G1 S18", "Hạn chế", "Ký hợp đồng tháng 10–11 để giao tháng 12–2"],
          ["G1 S16", "Tốt", "Linh hoạt; đặt trước 4–6 tuần"],
          ["G2 S13", "Tốt", "Hợp đồng giao ngay hoặc hợp đồng cuốn chiếu"],
        ],
      },
      {
        type: "note",
        text: "Các số liệu và nhận định trong bài viết này chỉ mang tính minh họa cho bản xem trước của website và phải được thay thế bằng bản triển vọng đã được đội thu mua rà soát trước khi đăng tải.",
      },
      { type: "h2", text: "Danh mục cần chuẩn bị" },
      {
        type: "ul",
        items: [
          "Xác nhận mẫu chuẩn (type sample) trước vụ thu hoạch để có thể đối chiếu với mẫu trước giao hàng.",
          "Thống nhất giới hạn độ ẩm và yêu cầu đánh bóng trong hợp đồng.",
          "Với các lô hàng xuất sang EU, hãy xác nhận những thông tin thẩm định (due diligence) mà quý khách cần từ chúng tôi (xem bộ thông tin EUDR).",
        ],
      },
    ],
  },

  "robusta-screen-size-guide": {
    title: "Giải thích cỡ sàng Robusta: S13, S16, S18 và ý nghĩa đối với quá trình rang",
    summary:
      "Cách đo cỡ sàng, vì sao cỡ sàng quan trọng đối với độ đồng đều khi rang, và cách đọc bảng thông số kỹ thuật cà phê nhân.",
    reviewedBy: "Phòng thí nghiệm QA",
    cta: { label: "Xem các hạng Robusta" },
    image: { alt: "Hạt cà phê đồng đều kích cỡ" },
    body: [
      {
        type: "p",
        text: "Cỡ sàng là đường kính lỗ tròn mà hạt không lọt qua, tính theo đơn vị 1/64 inch. Hạt sàng 16 là hạt nằm lại trên sàng có lỗ 16/64 inch (6,35 mm).",
      },
      { type: "h2", text: "Vì sao người mua quy định cỡ sàng" },
      {
        type: "ul",
        items: [
          "Hạt đồng cỡ rang đều hơn — ít hạt nhỏ bị cháy xém.",
          "Cỡ sàng lớn hơn thường có mức giá cao hơn.",
          "Các nhà máy cà phê hòa tan quan tâm đến hiệu suất chiết và tỷ lệ lỗi hơn là kích cỡ hạt.",
        ],
      },
      { type: "h2", text: "Cách hiểu “90% trên sàng 16”" },
      {
        type: "p",
        text: "Thông số “Sàng 16+, tối thiểu 90% trên S16” nghĩa là ít nhất 90% khối lượng mẫu nằm lại trên sàng 16. 10% còn lại có thể lọt xuống các sàng nhỏ hơn nhưng không được thấp hơn dung sai đã quy định.",
      },
      {
        type: "table",
        head: ["Sàng", "Kích thước lỗ", "Mục đích sử dụng phổ biến"],
        rows: [
          ["S13", "5,16 mm", "Cà phê hòa tan, phối trộn giá tốt"],
          ["S16", "6,35 mm", "Rang phổ thông"],
          ["S18", "7,14 mm", "Cao cấp, espresso"],
        ],
      },
    ],
  },

  "documents-for-importing-spices-and-dried-mango": {
    title: "Nhập khẩu gia vị và xoài sấy Việt Nam: danh mục chứng từ cần kiểm tra",
    summary:
      "Những chứng từ nào đi kèm lô hàng quế, hoa hồi, hồ tiêu và xoài sấy — và những yêu cầu nào phụ thuộc vào thị trường đích của quý khách.",
    reviewedBy: "Bộ phận tuân thủ",
    cta: { label: "Liên hệ bộ phận xuất khẩu" },
    image: { alt: "Hoa hồi, thanh quế và hạt cà phê trên vải bố" },
    body: [
      {
        type: "p",
        text: "Gia vị và trái cây sấy là sản phẩm đã qua chế biến, nhưng các nước nhập khẩu vẫn quản lý chặt chẽ — về kiểm dịch thực vật, an toàn thực phẩm và ghi nhãn. Yêu cầu phụ thuộc vào sản phẩm và thị trường đích, vì vậy chúng tôi xác nhận bộ chứng từ cho từng hợp đồng.",
      },
      { type: "h2", text: "Kiểm tra yêu cầu của thị trường đích trước tiên" },
      {
        type: "ul",
        items: [
          "Liên minh châu Âu: áp dụng giới hạn dư lượng tối đa (MRL), quy định về chất nhiễm bẩn (ví dụ aflatoxin, ethylene oxide) và ghi nhãn; một số loại gia vị bị tăng cường kiểm tra chính thức.",
          "Hoa Kỳ: nhà nhập khẩu phải đăng ký cơ sở thực phẩm và thực hiện xác minh nhà cung cấp theo FSVP; quy định đối với sản phẩm thực vật được kiểm tra theo từng mặt hàng.",
          "Sản phẩm bán lẻ như xoài sấy Owi Chewi cần nhãn phù hợp quy định của thị trường đích — thành phần, chất gây dị ứng, thông tin dinh dưỡng và thông tin nhà nhập khẩu.",
        ],
      },
      { type: "h2", text: "Các chứng từ thường đi kèm lô hàng" },
      {
        type: "table",
        head: ["Chứng từ", "Khi nào"],
        rows: [
          ["Hóa đơn thương mại & phiếu đóng gói (packing list)", "Luôn luôn"],
          ["Giấy chứng nhận kiểm dịch thực vật", "Gia vị, khi thị trường đích yêu cầu"],
          ["Giấy chứng nhận xuất xứ (C/O)", "Khi đề nghị hưởng ưu đãi thuế quan"],
          ["Phiếu kết quả phân tích (COA)", "Theo từng lô — độ ẩm, vi sinh, chất nhiễm bẩn theo hợp đồng"],
        ],
      },
      {
        type: "note",
        text: "Hướng dẫn này chỉ là thông tin chung, không phải tư vấn pháp lý hay tư vấn về quy định. Nhà nhập khẩu vẫn chịu trách nhiệm xác minh các yêu cầu hiện hành với cơ quan có thẩm quyền.",
      },
    ],
  },

  "central-highlands-sourcing-profile": {
    title: "Hồ sơ vùng nguyên liệu Tây Nguyên: thổ nhưỡng, nông hộ nhỏ và tính mùa vụ",
    summary:
      "Vì sao đất bazan và mùa khô rõ rệt định hình Robusta Việt Nam — và nguồn cung từ nông hộ nhỏ được tổ chức thành các lô có thể truy xuất nguồn gốc như thế nào.",
    reviewedBy: "Đội thu mua",
    cta: { label: "Khám phá vùng nguyên liệu Tây Nguyên" },
    image: { alt: "Dây tiêu trồng xen cùng cà phê tại Tây Nguyên" },
    body: [
      {
        type: "p",
        text: "Cao nguyên Tây Nguyên nằm ở độ cao từ 400 đến 800 mét. Tầng đất đỏ bazan dày giữ nước tốt, và mùa khô từ tháng 11 đến tháng 4 khiến cả vụ thu hoạch lẫn thời kỳ ra hoa đều tập trung.",
      },
      { type: "h2", text: "Ai là người trồng cà phê" },
      {
        type: "p",
        text: "Phần lớn các nông hộ có diện tích từ một đến ba héc-ta. Nông dân bán cà phê quả khô hoặc cà phê nhân cho thương lái và các cơ sở chế biến; việc tổ chức họ thành các nhóm nông hộ có đăng ký chính là điều giúp truy xuất nguồn gốc đến cấp lô hàng.",
      },
      { type: "h2", text: "Chúng tôi ghi nhận những gì" },
      {
        type: "ul",
        items: [
          "Mã nhóm nông hộ tại mỗi lần nhập hàng",
          "Tọa độ địa lý của thửa đất khi đã được thu thập và phê duyệt",
          "Mẻ chế biến và mã lô xuất khẩu",
        ],
      },
    ],
  },

  "understanding-a-certificate-of-analysis": {
    title: "Hiểu về Phiếu kết quả phân tích (COA) cho nông sản",
    summary:
      "Một COA cần có những nội dung gì, cách kiểm tra năng lực công nhận của phòng thí nghiệm, và sự khác biệt giữa COA mẫu và COA của lô hàng.",
    reviewedBy: "Phòng thí nghiệm QA",
    cta: { label: "Tải COA mẫu" },
    image: { alt: "Mẫu nhân điều trong bát" },
    body: [
      {
        type: "p",
        text: "COA báo cáo kết quả thử nghiệm của một lô hàng cụ thể so với thông số kỹ thuật. COA mẫu chỉ thể hiện định dạng — không phải bằng chứng cho bất kỳ lô hàng nào.",
      },
      { type: "h2", text: "Những điểm cần kiểm tra" },
      {
        type: "ul",
        items: [
          "Mã lô trùng khớp với phiếu đóng gói (packing list) và ký mã hiệu trên container.",
          "Phương pháp thử và đơn vị đo được ghi rõ.",
          "Phòng thí nghiệm được công nhận (ISO/IEC 17025) cho các chỉ tiêu được liệt kê.",
          "Kết quả được so sánh với giới hạn đã thỏa thuận trong hợp đồng, không phải giới hạn chung chung.",
        ],
      },
      { type: "h3", text: "Độ ẩm và hoạt độ nước" },
      {
        type: "p",
        text: "Độ ẩm là tỷ lệ phần trăm nước tính theo khối lượng. Hoạt độ nước (aw) cho biết lượng nước đó sẵn có cho vi sinh vật phát triển đến mức nào — thường là chỉ số dự báo nguy cơ nấm mốc trong quá trình vận chuyển đường biển tốt hơn.",
      },
    ],
  },

  "eudr-timeline-update-coffee-buyers": {
    title: "Cập nhật lộ trình EUDR dành cho người mua cà phê",
    summary:
      "Các mốc áp dụng, những thông tin nhà vận hành phải thu thập, và những thông tin chúng tôi có thể cung cấp cho các lô cà phê thuộc phạm vi điều chỉnh.",
    reviewedBy: "Bộ phận tuân thủ · Pháp chế (đang chờ)",
    cta: { label: "Yêu cầu bộ thông tin EUDR" },
    image: { alt: "Cành cà phê với quả chín" },
    body: [
      {
        type: "p",
        text: "Theo Quy định chống phá rừng của EU (EUDR), cà phê là mặt hàng thuộc phạm vi điều chỉnh. Theo Ủy ban châu Âu, các nghĩa vụ áp dụng đối với nhà vận hành quy mô lớn và vừa từ ngày 30 tháng 12 năm 2026.",
      },
      { type: "h2", text: "Nhà vận hành cần những gì" },
      {
        type: "ul",
        items: [
          "Tọa độ địa lý của các thửa đất nơi sản xuất cà phê",
          "Bằng chứng cho thấy việc sản xuất không gây mất rừng sau ngày 31 tháng 12 năm 2020",
          "Bằng chứng tuân thủ pháp luật liên quan của quốc gia sản xuất",
        ],
      },
      { type: "h2", text: "Chúng tôi có thể cung cấp gì" },
      {
        type: "p",
        text: "Đối với các lô cà phê thu mua từ các nhóm nông hộ đã được lập bản đồ, chúng tôi có thể chia sẻ thông tin thẩm định (due diligence) đã được bộ phận pháp chế và vận hành phê duyệt. Chúng tôi không mô tả bất kỳ sản phẩm nào là “tuân thủ EUDR” — việc xác định tuân thủ thuộc về nhà vận hành.",
      },
      {
        type: "note",
        text: "Các cập nhật về quy định phải được bộ phận tuân thủ rà soát trước khi đăng tải. Vui lòng xem trang EUDR của Ủy ban châu Âu để biết các mốc thời gian chính thức hiện hành.",
      },
    ],
  },
};
