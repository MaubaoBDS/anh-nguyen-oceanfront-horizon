# 📋 Bàn Giao Dự Án — Hà Sơn Tower Landing Page

> **Cập nhật lần cuối:** 21/05/2026  
> **Người bàn giao:** Manus AI  
> **Trạng thái:** Production — Đang hoạt động tại [hasontowergelex.com](https://hasontowergelex.com)

---

## 1. Tổng Quan Dự Án

Landing page bất động sản hạng sang cho dự án **Hà Sơn Tower** — chung cư cao cấp 25 tầng tại Trạm Trôi, Hoài Đức, Hà Nội. Trang được xây dựng trên nền tảng **Manus Webdev** (React 19 + Tailwind 4 + Express 4 + tRPC 11 + MySQL).

### Thông tin liên hệ chủ dự án

| Trường | Giá trị |
|---|---|
| Chuyên viên tư vấn | Mậu Bảo |
| Chức vụ | Giám Đốc Dự Án — Sàn MSH Group |
| Hotline | 0933.235.444 |
| Email | maubao19982@gmail.com |
| Zalo | https://zalo.me/0933235444 |

---

## 2. Trạng Thái Triển Khai

| Hạng mục | Trạng thái | Ghi chú |
|---|---|---|
| Landing page | ✅ Live | Đầy đủ 8 sections |
| Database (MySQL) | ✅ Active | Bảng `users` + `leads` |
| Telegram Bot | ✅ Active | Thông báo lead mới tức thì |
| Facebook Pixel | ✅ Active | ID: 1575633650039698 |
| Custom Events FB | ✅ Active | Lead, Contact, ViewContent |
| CRM Admin | ✅ Live | `/admin/leads` |
| Domain | ✅ Verified | hasontowergelex.com |
| Google Search Console | ✅ Verified | Sitemap đã submit |
| Google Tag Manager | ⚠️ Placeholder | Cần GTM ID thật (GTM-XXXXXXX) |
| Google Ads Conversion | ❌ Chưa có | Cần setup khi chạy Google Ads |

---

## 3. Kiến Trúc Kỹ Thuật

### Stack công nghệ

```
Frontend:  React 19 + Tailwind CSS 4 + Framer Motion + Wouter (routing)
Backend:   Express 4 + tRPC 11 (type-safe API)
Database:  MySQL/TiDB qua Drizzle ORM
Auth:      Manus OAuth (cho trang admin)
Hosting:   Manus Webdev Platform
```

### Cấu trúc thư mục quan trọng

```
ha-son-tower-webdev/
├── client/
│   ├── index.html              ← Facebook Pixel, GTM, SEO meta tags
│   └── src/
│       ├── components/
│       │   ├── Header.tsx          ← Navigation + nút gọi điện
│       │   ├── HeroSection.tsx     ← Hero banner chính
│       │   ├── OverviewSection.tsx ← Tổng quan dự án
│       │   ├── LocationSection.tsx ← Google Maps nhúng
│       │   ├── AmenitiesSection.tsx← Tiện ích
│       │   ├── PromotionsSection.tsx← Ưu đãi + ViewContent event
│       │   ├── GallerySection.tsx  ← Thư viện ảnh
│       │   ├── ContactSection.tsx  ← Form liên hệ chính
│       │   ├── Footer.tsx          ← Footer
│       │   ├── FloatingCTA.tsx     ← Nút nổi: Zalo, Quick Form, Gọi
│       │   └── ExitIntentPopup.tsx ← Popup khi khách sắp thoát
│       ├── pages/
│       │   ├── Home.tsx            ← Trang chủ (lazy load sections)
│       │   ├── ThankYou.tsx        ← Trang /cam-on sau submit form
│       │   ├── AdminLeads.tsx      ← CRM tại /admin/leads
│       │   └── NotFound.tsx        ← Trang 404
│       └── lib/
│           ├── constants.ts        ← ⭐ Toàn bộ nội dung/data dự án
│           ├── fbEvents.ts         ← Facebook Pixel custom events helper
│           └── trpc.ts             ← tRPC client
├── server/
│   ├── routers.ts              ← API: submitLead, getLeads, updateLeadStatus
│   ├── db.ts                   ← Database helpers
│   └── telegram.ts             ← Telegram Bot helper
├── drizzle/
│   └── schema.ts               ← DB schema: users + leads
├── client/public/
│   ├── sitemap.xml             ← SEO sitemap (7 URLs)
│   └── robots.txt              ← SEO robots
├── todo.md                     ← Danh sách tasks (tất cả đã hoàn thành)
└── HANDOVER.md                 ← File này
```

---

## 4. Các Tính Năng Đã Implement

### 4.1 Landing Page (8 Sections)

| Section | ID | Mô tả |
|---|---|---|
| Header | — | Navigation cố định, nút gọi điện |
| Hero | — | Banner chính, badge "Sắp mở bán", stats, 2 CTA |
| Tổng quan | `#overview` | Highlights dự án, thông số kỹ thuật |
| Vị trí | `#location` | Google Maps nhúng Trạm Trôi, Hoài Đức |
| Tiện ích | `#amenities` | 6 tiện ích với icon |
| Ưu đãi | `#promotions` | 3 chính sách + ViewContent tracking |
| Hình ảnh | `#gallery` | 8 ảnh (hero, building, pool, lobby, garden, map, 2 mặt bằng) |
| Liên hệ | `#contact` | Form đăng ký → DB + Telegram + Lead event |

### 4.2 Hệ Thống Thu Thập Lead

Mỗi khi khách điền form, hệ thống thực hiện đồng thời 3 việc:

1. **Lưu vào database** với đầy đủ thông tin: tên, SĐT, nội dung quan tâm, ngân sách, ghi chú, nguồn (source), thời gian.
2. **Gửi Telegram** thông báo tức thì đến nhóm/chat của chủ dự án.
3. **Kích hoạt Facebook Pixel** sự kiện `Lead` để tối ưu quảng cáo.

### 4.3 Facebook Pixel Tracking

File: `client/src/lib/fbEvents.ts`

| Sự kiện | Kích hoạt khi | Component |
|---|---|---|
| `PageView` | Mỗi lần vào trang | Tự động (index.html) |
| `Lead` | Submit form thành công | ContactSection, FloatingCTA, ExitIntentPopup |
| `Contact` | Nhấn Gọi ngay / Zalo | Header, Hero, ContactSection, FloatingCTA, Footer, ExitIntentPopup |
| `ViewContent` | Cuộn đến section Ưu đãi | PromotionsSection |

### 4.4 CRM Admin

Truy cập: `hasontowergelex.com/admin/leads`  
Yêu cầu: Đăng nhập bằng tài khoản Manus của chủ dự án.

Chức năng:
- Xem danh sách toàn bộ lead với thông tin đầy đủ
- Filter theo trạng thái: Mới, Đang liên hệ, Quan tâm, Đã chốt, Không quan tâm
- Cập nhật trạng thái từng lead
- Ghi chú nội bộ cho từng lead
- Tự động refresh mỗi 30 giây

---

## 5. Cấu Hình Cần Biết

### 5.1 Thay đổi nội dung dự án

**Tất cả nội dung** (tên, SĐT, địa chỉ, giá, tiện ích, ưu đãi...) đều nằm trong một file duy nhất:

```
client/src/lib/constants.ts
```

Chỉ cần sửa file này là toàn bộ website cập nhật theo.

### 5.2 Thay đổi ảnh

Ảnh được lưu trên Manus Storage (CDN). Để thay ảnh mới:
1. Upload ảnh mới bằng lệnh: `manus-upload-file --webdev path/to/image.jpg`
2. Copy URL trả về vào `IMAGES` trong `constants.ts`

### 5.3 Telegram Bot

Cấu hình trong `server/telegram.ts`. Token và Chat ID đã được hardcode từ repository gốc. Nếu cần thay đổi, sửa trực tiếp file này.

### 5.4 Facebook Pixel

Pixel ID `1575633650039698` nằm trong `client/index.html` dòng ~196. Đây là Pixel thuộc Business Manager công ty.

### 5.5 Google Tag Manager (Chưa kích hoạt)

Trong `client/index.html` có placeholder `GTM-XXXXXXX`. Khi có GTM ID thật, thay vào 2 chỗ trong file này.

---

## 6. Việc Còn Lại Cần Làm

### Ưu tiên cao

- [ ] **Google Ads Conversion Tracking**: Khi bắt đầu chạy Google Ads, cần lấy Conversion ID + Label từ Google Ads Manager và gắn vào website. Thông báo cho developer để thêm vào.
- [ ] **Google Tag Manager**: Nếu muốn quản lý tracking tập trung, tạo GTM container và thay `GTM-XXXXXXX` trong `client/index.html`.

### Ưu tiên thấp (cải thiện sau)

- [ ] **A/B Testing**: Thử nghiệm các phiên bản headline/CTA khác nhau để tối ưu tỷ lệ chuyển đổi.
- [ ] **Live Chat**: Tích hợp chat trực tiếp (Tawk.to hoặc Zalo OA widget chính thức).
- [ ] **Video Hero**: Thay ảnh hero bằng video ngắn phối cảnh dự án nếu có.

---

## 7. Quy Trình Vận Hành Hàng Ngày

```
Sáng: Kiểm tra Telegram → có lead mới không?
       ↓
       Vào /admin/leads → xem chi tiết, cập nhật trạng thái
       ↓
       Gọi lại khách trong vòng 15–30 phút (tỷ lệ chốt cao nhất)

Tuần: Kiểm tra Facebook Events Manager → xem số Lead, Contact events
      Kiểm tra Google Search Console → xem traffic organic
```

---

## 8. Thông Tin Kỹ Thuật Cho Developer

### Chạy local

```bash
cd ha-son-tower-webdev
pnpm install
pnpm dev          # Chạy dev server tại http://localhost:3000
pnpm test         # Chạy 6 vitest tests
pnpm build        # Build production
```

### Database Schema

```sql
-- Bảng leads (chính)
CREATE TABLE leads (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  phone       VARCHAR(50)  NOT NULL,
  interest    VARCHAR(255),
  budget      VARCHAR(100),
  note        TEXT,
  source      VARCHAR(100) DEFAULT 'website',
  status      VARCHAR(50)  DEFAULT 'new',
  admin_note  TEXT,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### API Endpoints (tRPC)

| Procedure | Type | Mô tả |
|---|---|---|
| `contact.submitLead` | mutation | Tạo lead mới (public) |
| `contact.getLeads` | query | Lấy danh sách lead (protected) |
| `contact.updateLeadStatus` | mutation | Cập nhật trạng thái lead (protected) |
| `auth.me` | query | Lấy thông tin user đăng nhập |
| `auth.logout` | mutation | Đăng xuất |

### Môi trường Production

- **Platform:** Manus Webdev
- **Domain chính:** hasontowergelex.com
- **Domain phụ:** hasontower-goaegecg.manus.space
- **Database:** MySQL/TiDB (managed by Manus)
- **Storage:** Manus S3-compatible storage (`/manus-storage/`)

---

## 9. Lịch Sử Checkpoint

| Version | Ngày | Nội dung |
|---|---|---|
| `48f0fa64` | 21/05/2026 | Copy toàn bộ code từ GitHub gốc, 6/6 tests pass |
| `a63093c4` | 21/05/2026 | Upload ảnh profile, sitemap 7 URLs, SEO meta tags |
| `859a4851` | 21/05/2026 | Thêm 2 ảnh mặt bằng vào Gallery |
| `6c833adb` | 21/05/2026 | Tối ưu PageSpeed: font, LCP, lazy load, CLS |
| `52b2a079` | 21/05/2026 | Exit-intent popup, ThankYou page, Floating CTA, CRM, Pixel |
| `962db9e3` | 21/05/2026 | Facebook Pixel ID đầu tiên |
| `579b762c` | 21/05/2026 | Đổi Pixel ID sang 1575633650039698 (BM công ty) |
| `e3ae2e99` | 21/05/2026 | Cập nhật todo.md hoàn thành |
| `c901a1c7` | 21/05/2026 | Thêm Facebook Custom Events (Lead, Contact, ViewContent) |
| `33aeb8f5` | 21/05/2026 | Đổi badge "Sắp mở bán" |

---

*File này được tạo tự động bởi Manus AI. Cập nhật thủ công khi có thay đổi lớn.*
