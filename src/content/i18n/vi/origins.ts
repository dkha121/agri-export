import type { Origin } from "../../types";
import type { DeepPartial } from "../types";

/** Vietnamese overlay for sourcing regions (merged over /src/content/origins.ts). */
export const originsVi: Record<string, DeepPartial<Origin>> = {
  "central-highlands": {
    name: "Tây Nguyên",
    region: "Cao nguyên Tây Nguyên",
    provinces: ["Đắk Lắk", "Gia Lai", "Lâm Đồng (trước đây là Đắk Nông)"],
    crops: ["Cà phê Robusta", "Hồ tiêu đen", "Sầu riêng"],
    harvest: "Cà phê: tháng 11 – tháng 1 · Hồ tiêu: tháng 2 – tháng 5",
    climate: "Nhiệt đới gió mùa; mùa khô rõ rệt từ tháng 11 đến tháng 4",
    altitude: "400 – 800 m",
    soil: "Đất đỏ bazan (ferralsol), tầng đất dày, thoát nước tốt",
    processing: ["Chế biến khô (tự nhiên)", "Đánh bóng ướt", "Hồ tiêu làm sạch bằng máy"],
    summary:
      "Vùng trọng điểm cà phê Robusta của Việt Nam. Đất bazan và mùa khô rõ rệt cho hạt chắc, mùa thu hoạch tập trung và hiệu quả.",
    story:
      "Phần lớn cà phê tại đây do nông hộ nhỏ canh tác trên diện tích từ một đến ba hecta, thường trồng xen với hồ tiêu và sầu riêng. Các điểm thu mua gom cà phê quả tươi và cà phê khô từ các nhóm nông hộ trước khi chuyển về nhà máy chế biến — nơi mã lô được gán.",
    proof: [
      {
        title: "Thu mua qua nhóm nông hộ",
        body: "Cà phê được thu mua qua các nhóm nông hộ đã đăng ký; mỗi chuyến giao hàng được ghi nhận theo mã nhóm trước khi vào nhà máy.",
      },
      {
        title: "Phương pháp truy xuất nguồn gốc",
        body: "Mã lô liên kết container xuất khẩu với mẻ chế biến và các nhóm nông hộ cung ứng. Dữ liệu định vị lô đất có thể cung cấp cho khách hàng EU thuộc phạm vi áp dụng, khi đã được thu thập và phê duyệt.",
      },
    ],
    image: {
      alt: "Vườn cà phê trên đồi đất đỏ bazan tại Đắk Lắk",
      caption: "Ảnh flycam – vườn cà phê & hồ tiêu, Đắk Lắk",
    },
    gallery: [
      { alt: "Nông dân thu hoạch quả cà phê Robusta chín", caption: "Tư liệu – thu hoạch quả cà phê" },
      { alt: "Quả cà phê Robusta chín trên cành", caption: "Cận cảnh – quả cà phê chín" },
    ],
  },
  "lam-dong": {
    name: "Cao nguyên Lâm Đồng",
    region: "Cao nguyên Đà Lạt & Cầu Đất",
    provinces: ["Lâm Đồng"],
    crops: ["Cà phê Arabica", "Robusta chất lượng cao (Fine Robusta)"],
    harvest: "Arabica: tháng 10 – tháng 1",
    climate: "Khí hậu cao nguyên mát mẻ, nhiệt độ trung bình 18 – 22 °C",
    altitude: "1,300 – 1,650 m (Cầu Đất)",
    soil: "Đất núi lửa và đất ferralit đỏ vàng",
    processing: ["Chế biến ướt (washed)", "Honey", "Chế biến khô (natural)"],
    summary:
      "Vùng cao nguyên có độ cao lớn, cung cấp các lô Arabica chế biến ướt và Fine Robusta cho nhà rang xay cần tiêu chuẩn theo chất lượng tách.",
    story:
      "Cầu Đất trồng Arabica từ thời Pháp thuộc. Hiện nay các xưởng chế biến ướt quy mô nhỏ xử lý quả ngay trong ngày thu hái, và các lô được tách riêng theo cụm nông trại để thử nếm (cupping) và tuyển chọn.",
    proof: [
      {
        title: "Tách lô",
        body: "Các lô washed và honey được chế biến, lưu kho riêng theo cụm nông trại và được cupping trước khi chào hàng.",
      },
      {
        title: "Quy trình cupping",
        body: "Mẫu trước giao hàng được cupping đối chiếu với mẫu chuẩn đã duyệt. Phiếu cupping được cung cấp theo yêu cầu.",
      },
    ],
    image: {
      alt: "Vườn cà phê Arabica trên cao nguyên Cầu Đất",
      caption: "Phong cảnh – sườn đồi Arabica, Cầu Đất",
    },
    gallery: [
      { alt: "Bể lên men tại xưởng chế biến ướt", caption: "Xưởng chế biến ướt – lên men" },
      { alt: "Cà phê Arabica thóc chế biến ướt", caption: "Cận cảnh – cà phê thóc chế biến ướt" },
    ],
  },
  "mekong-delta": {
    name: "Đồng bằng sông Cửu Long",
    region: "Châu thổ sông Cửu Long",
    provinces: ["Cần Thơ (trước đây là Sóc Trăng)", "An Giang", "Đồng Tháp"],
    crops: ["Gạo thơm (ST25)", "Gạo Jasmine", "Xoài", "Bưởi"],
    harvest: "Lúa: tháng 2 – tháng 4 · tháng 6 – tháng 8 · Xoài: tháng 3 – tháng 6",
    climate: "Nhiệt đới; mùa mưa từ tháng 5 đến tháng 11",
    altitude: "0 – 5 m",
    soil: "Đất sét phù sa; nhiễm mặn ở các huyện ven biển",
    processing: ["Xay xát & đánh bóng", "Tách màu", "Nhà đóng gói trái cây tươi"],
    summary:
      "Vựa lúa của Việt Nam. Hai đến ba vụ mỗi năm cùng mạng lưới kênh rạch dày đặc giúp vùng này thuận lợi về logistics cho gạo và trái cây nhiệt đới.",
    story:
      "Lúa được thu mua dạng lúa tươi từ các hợp tác xã có hợp đồng và xay xát ngay sau thu hoạch để giữ hương thơm. Các giống ST được lai tạo tại Sóc Trăng nhằm tăng hương thơm và khả năng chịu mặn.",
    proof: [
      {
        title: "Sản xuất theo hợp đồng",
        body: "Giống lúa và lịch xuống giống được thống nhất với hợp tác xã trước mỗi vụ — đây là yếu tố bảo đảm độ thuần giống.",
      },
      {
        title: "Mã số vùng trồng",
        body: "Trái cây tươi xuất khẩu sử dụng mã số vùng trồng và mã số cơ sở đóng gói đã đăng ký khi thị trường nhập khẩu yêu cầu.",
      },
    ],
    image: {
      alt: "Ruộng lúa và kênh rạch tại Đồng bằng sông Cửu Long",
      caption: "Ảnh flycam – ruộng lúa & kênh rạch, Đồng bằng sông Cửu Long",
    },
    gallery: [
      { alt: "Nông dân thu hoạch lúa", caption: "Tư liệu – thu hoạch lúa" },
      { alt: "Cận cảnh hạt lúa", caption: "Cận cảnh – hạt lúa" },
    ],
  },
  "southeast-cashew-belt": {
    name: "Vùng điều Đông Nam Bộ",
    region: "Đồng Nai (trước đây là Bình Phước)",
    provinces: ["Đồng Nai (trước đây là Bình Phước)"],
    crops: ["Điều", "Hồ tiêu đen"],
    harvest: "Điều thô: tháng 2 – tháng 5 · Chế biến quanh năm",
    climate: "Nhiệt đới xavan, mùa khô kéo dài",
    altitude: "100 – 300 m",
    soil: "Đất xám và đất ferralit đỏ vàng",
    processing: ["Hấp & tách vỏ", "Bóc vỏ lụa", "Phân loại", "Hút chân không"],
    summary:
      "Cụm chế biến điều của Việt Nam. Hạt điều thô trong nước được phối trộn với RCN nhập khẩu; việc ghi nhãn xuất xứ tuân theo quy định của thị trường nhập khẩu.",
    story:
      "Nông dân Bình Phước cung cấp hạt điều thô (RCN) trong nước vào mùa khô. Nhân điều được tách vỏ, bóc vỏ lụa, phân loại và hút chân không ngay trong cụm, gần cảng Cát Lái và Cái Mép.",
    proof: [
      {
        title: "Công bố xuất xứ RCN",
        body: "Mỗi lô nhân điều công bố xuất xứ RCN (Việt Nam hoặc nhập khẩu) trên bản tiêu chuẩn kỹ thuật và COA — không bao giờ mặc định.",
      },
      {
        title: "Kiểm soát chế biến",
        body: "Độ ẩm, số hạt (count) và tỷ lệ bể được kiểm tra theo từng mẻ sản xuất trước khi hút chân không.",
      },
    ],
    image: {
      alt: "Vườn điều tại Bình Phước",
      caption: "Phong cảnh – vườn điều",
    },
    gallery: [
      { alt: "Dây chuyền phân loại nhân điều", caption: "Nhà máy – phân loại nhân điều" },
      { alt: "Nhân hạt điều", caption: "Cận cảnh – nhân điều W240" },
    ],
  },
  "binh-thuan-coast": {
    name: "Vùng ven biển Bình Thuận",
    region: "Duyên hải Nam Trung Bộ",
    provinces: ["Lâm Đồng (trước đây là Bình Thuận)"],
    crops: ["Thanh long ruột trắng", "Thanh long ruột đỏ"],
    harvest: "Quanh năm nhờ chong đèn; cao điểm tháng 5 – tháng 8",
    climate: "Khí hậu ven biển bán khô hạn, lượng mưa thấp nhất Việt Nam",
    altitude: "0 – 100 m",
    soil: "Đất thịt pha cát",
    processing: ["Rửa tại nhà đóng gói", "Phân loại theo size", "Đóng gói container lạnh"],
    summary:
      "Vùng trồng thanh long lớn nhất thế giới. Chong đèn ban đêm kéo dài thời gian ra hoa, giúp nguồn cung duy trì ngoài chính vụ.",
    story:
      "Nông dân dùng đèn điện để kích thích ra hoa trái vụ. Nhà đóng gói phân loại trái theo trọng lượng, ngoại quan và làm lạnh sơ bộ trước khi xếp vào container lạnh.",
    proof: [
      {
        title: "Chứng nhận nhóm sản xuất",
        body: "Các nhóm nông hộ được đánh giá theo phạm vi chứng nhận nêu trong Trung tâm Chứng nhận — chỉ các nhóm có tên trong danh sách mới thuộc phạm vi.",
      },
      {
        title: "Mã số đã đăng ký",
        body: "Mã số vùng trồng và mã số cơ sở đóng gói được liệt kê theo từng lô hàng khi thị trường nhập khẩu yêu cầu.",
      },
    ],
    image: {
      alt: "Vườn thanh long ven biển Bình Thuận",
      caption: "Ảnh flycam – hàng thanh long",
    },
    gallery: [
      { alt: "Công nhân thu hoạch thanh long", caption: "Tư liệu – thu hoạch" },
      { alt: "Trái thanh long", caption: "Cận cảnh – trái thanh long" },
    ],
  },
  "northern-mountains": {
    name: "Miền núi phía Bắc",
    region: "Yên Bái & Lạng Sơn",
    provinces: ["Lào Cai (trước đây là Yên Bái)", "Lạng Sơn"],
    crops: ["Quế", "Hồi"],
    harvest: "Quế: tháng 3 – tháng 5 · Hồi: tháng 8 – tháng 10",
    climate: "Cận nhiệt đới; mùa đông lạnh",
    altitude: "300 – 1,000 m",
    soil: "Đất feralit đồi núi",
    processing: ["Phơi nắng", "Cạo vỏ / chẻ", "Cắt & sàng"],
    summary:
      "Rừng quế và vườn hồi do cộng đồng vùng cao canh tác. Độ dày vỏ và hàm lượng tinh dầu phụ thuộc vào tuổi cây và thời điểm thu hoạch.",
    story:
      "Cây quế được khai thác sau 10–15 năm; vỏ được bóc, cạo và phơi nắng ngay tại thôn bản trước khi phân loại. Hồi có vụ xuân và vụ thu với ngoại quan khác nhau.",
    proof: [
      {
        title: "Điểm thu gom",
        body: "Người thu gom ghi nhận xã xuất xứ cho mỗi lần nhập hàng, nhờ đó lô gia vị có thể truy xuất đến cấp huyện.",
      },
      {
        title: "Kiểm soát độ ẩm",
        body: "Sấy lại và kiểm tra độ ẩm trước khi đóng gói giúp giảm nguy cơ nấm mốc trong quá trình vận chuyển đường biển.",
      },
    ],
    image: {
      alt: "Rừng quế trên sườn đồi tại Yên Bái",
      caption: "Phong cảnh – rừng quế, Yên Bái",
    },
    gallery: [
      { alt: "Người dân phơi vỏ quế", caption: "Tư liệu – phơi vỏ quế" },
      { alt: "Hoa hồi", caption: "Cận cảnh – hoa hồi" },
    ],
  },
};
