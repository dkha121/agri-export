# TrustVN — Vietnam agricultural export website

B2B website cho doanh nghiệp xuất khẩu nông sản Việt Nam, xây theo `agri-export-uiux-handoff.pdf` (v1.0). Conversion chính: **Request for Quote (RFQ)**.

> Tên công ty TrustVN, mã số và địa chỉ trụ sở do doanh nghiệp cung cấp; logo Owi Chewi ở `public/brand/`. Số liệu, chứng nhận, liên hệ và toàn bộ dữ liệu kinh doanh hiện là **placeholder minh họa** (`verified: false`). Phải thay bằng dữ liệu doanh nghiệp xác thực trước production (§1, §25).

## Chạy dự án

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build production (SSG)
npm start
```

Yêu cầu Node ≥ 20.9. Stack: Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS v4, Zod 4.

## Cấu trúc

```
src/
  app/                    Routes (§21.1) + API
    api/rfq/              POST — nhận RFQ (validate server, anti-spam, rate limit, upload)
    api/contact/          POST — form liên hệ
    api/documents/[id]/   GET  — sinh PDF tài liệu/spec sheet (SSG)
  components/             ~30 components (layout, ui, product, origin, rfq, forms, docs, quality…)
  content/                Dữ liệu (content model §20) — thay bằng CMS sau
  lib/                    data access, schema RFQ, bộ lọc, PDF writer, analytics
```

## Thay dữ liệu / ảnh thật

- **Dữ liệu**: sửa trong `src/content/*.ts`. Khi dữ liệu đã xác thực, đặt `verified: true` → nhãn "Illustrative" tự ẩn. Tắt banner preview: `company.previewNotice = false` trong `src/content/company.ts`.
- **Ảnh**: đặt file vào `public/images/...` rồi điền `src` cho `MediaAsset` tương ứng (vd. `image: { src: "/images/products/robusta-s16.jpg", alt: "...", kind: "product" }`). Không cần sửa component; chưa có `src` thì hiển thị placeholder có nhãn.
- **Spec theo ngành hàng**: `src/content/spec-schemas.ts` — mỗi category một schema riêng (§20.1).
- **Liên hệ, SLA phản hồi**: `company.responseSla` (để `null` = không hứa thời gian phản hồi, §16.2).

## Đa ngôn ngữ (EN / VI)

- Tiếng Anh (mặc định) ở URL gốc: `/products`. Tiếng Việt ở `/vi/products`. `src/proxy.ts` rewrite URL không tiền tố sang segment nội bộ `/en`, và redirect `/en/...` về URL gốc.
- Chữ giao diện: `src/i18n/dictionaries/en.ts` và `vi.ts` (cùng kiểu `Dict` — thiếu key là lỗi TypeScript).
- Nội dung (sản phẩm, vùng, nhà máy, chứng nhận, bài viết, số liệu…): dữ liệu gốc tiếng Anh ở `src/content/*.ts`; bản dịch dạng overlay ở `src/content/i18n/vi/*.ts` (chỉ chứa phần chữ; id, slug, số liệu, facets giữ nguyên).
- Server component đọc ngôn ngữ qua `getI18n()` (`next/root-params`); client component qua `useI18n()`.
- Nút chuyển ngôn ngữ giữ nguyên trang đang xem. Mỗi trang có `hreflang` + canonical; sitemap có đủ 2 ngôn ngữ.
- Tiêu đề trang VI dùng Noto Serif Display vì Instrument Serif không có glyph tiếng Việt.
- File PDF (spec sheet, chứng nhận, tóm tắt RFQ) giữ tiếng Anh — là chứng từ xuất khẩu; giá trị form gửi về server (quốc gia, đơn vị, loại hình…) cũng lưu bằng tiếng Anh, kèm trường `locale`.
- Thêm ngôn ngữ mới: thêm mã vào `locales` (`src/i18n/config.ts`) và `PREFIXED` (`src/proxy.ts`), tạo dictionary + overlay tương ứng.

## Backend (lớp mỏng)

- RFQ/Contact hiện lưu vào `./data/` (JSON + file upload + `audit.log`, đã git-ignore) — **chỉ dùng cho dev**.
- Production cần thay `src/lib/server/store.ts` bằng: email/CRM routing, object storage + quét virus cho file upload, audit log bền vững.
- Rate limit trong `src/lib/server/guard.ts` là in-memory (1 instance). Serverless/multi-instance → dùng Redis hoặc WAF. IP lấy từ `x-forwarded-for` nên phải chạy sau reverse proxy tin cậy.

## Analytics

Sự kiện được push vào `window.dataLayer`: `product_view`, `spec_download`, `document_download`, `rfq_start`, `rfq_step_complete`, `rfq_submit`, `rfq_complete`, `rfq_error`, `contact_submit`, `filter_change`, `origin_select`. Gắn GTM/GA4 để thu thập.

## Env

- `NEXT_PUBLIC_SITE_URL` — domain thật (canonical, sitemap, JSON-LD). Mặc định `https://www.example.com`.
