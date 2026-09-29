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
    image: { alt: "Quả cà phê Robusta đang chín trên cành tại Tây Nguyên" },
    gallery: [
      { alt: "Dây tiêu với chùm quả xanh, trồng xen cùng cà phê" },
      { alt: "Chùm quả cà phê đỏ và xanh" },
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
    image: { alt: "Quả cà phê Arabica đang chín trên cây" },
    gallery: [
      { alt: "Bể lên men tại xưởng chế biến ướt", caption: "Xưởng chế biến ướt – lên men" },
      { alt: "Cận cảnh hạt cà phê" },
    ],
  },
  "mekong-delta": {
    name: "Đồng bằng sông Cửu Long",
    region: "Châu thổ sông Cửu Long",
    provinces: ["Đồng Tháp (gồm cả Tiền Giang trước đây)", "Vĩnh Long", "Cần Thơ"],
    crops: ["Xoài Cát Chu", "Xoài Keo", "Xoài Cát Hòa Lộc"],
    harvest: "Xoài chính vụ: tháng 3 – tháng 6 · nghịch vụ: tháng 10 – tháng 12",
    climate: "Nhiệt đới; mùa mưa từ tháng 5 đến tháng 11",
    altitude: "0 – 5 m",
    soil: "Đất sét phù sa ven sông Tiền và sông Hậu",
    processing: ["Tiếp nhận trái tươi & ủ chín", "Cắt lát", "Sấy nhiệt độ thấp", "Đóng túi"],
    summary:
      "Vựa trái cây của Việt Nam. Các vườn xoài dọc sông Tiền cung cấp trái chín làm nguyên liệu cho xoài sấy dẻo và các sản phẩm Owi Chewi của chúng tôi.",
    story:
      "Xoài được thu mua từ các vườn và hợp tác xã có hợp đồng tại Đồng Tháp, ủ chín có kiểm soát và chế biến trong vòng vài ngày sau thu hoạch. Mã số vườn trồng được theo dõi xuyên suốt đến từng mẻ sấy.",
    proof: [
      {
        title: "Vườn trồng theo hợp đồng",
        body: "Giống, nhật ký phun thuốc và thời điểm thu hoạch được thống nhất với nhà vườn trước mỗi vụ — nền tảng cho màu sắc và độ ngọt đồng đều.",
      },
      {
        title: "Truy xuất theo mẻ",
        body: "Mỗi mẻ sấy ghi nhận mã số vườn trồng và ngày tiếp nhận của lô trái tươi đầu vào.",
      },
    ],
    image: { alt: "Xoài sấy, hạt điều và gia vị trên bàn nhìn ra vườn cây miền Tây" },
    gallery: [
      { alt: "Bát xoài sấy dẻo cắt lát" },
      { alt: "Miếng xoài sấy, cận cảnh" },
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
    image: { alt: "Nhân điều tràn ra từ bao đay" },
    gallery: [
      { alt: "Dây chuyền phân loại nhân điều", caption: "Nhà máy – phân loại nhân điều" },
      { alt: "Nhân điều trong bát" },
    ],
  },
  "northern-mountains": {
    name: "Miền núi phía Bắc",
    region: "Yên Bái & Lạng Sơn",
    provinces: ["Lào Cai (trước đây là Yên Bái)", "Lạng Sơn"],
    crops: ["Quế", "Hoa hồi"],
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
    image: { alt: "Thanh quế và hoa hồi từ vùng núi phía Bắc" },
    gallery: [
      { alt: "Thanh quế xếp chồng" },
      { alt: "Hoa hồi nguyên bông" },
    ],
  },
};
