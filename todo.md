# Project TODO

- [x] Landing page Hà Sơn Tower (Header, Hero, Overview, Location, Amenities, Promotions, Gallery, Contact, Footer)
- [x] Floating CTA buttons (phone, Zalo)
- [x] Contact form gửi lead qua Telegram Bot
- [x] Upgrade lên full-stack (web-db-user) với tRPC
- [x] Chuyển contact form sang tRPC procedure (contact.submitLead)
- [x] Vitest tests cho contact.submitLead
- [x] Database schema (users table) pushed
- [x] Thay đổi giá từ '6x triệu/m²' sang 'Giá liên hệ thỏa thuận'

## Hệ thống không bỏ sót khách hàng

- [x] Cập nhật DB schema: thêm cột status, source, notes vào bảng leads
- [x] Server router: thêm procedure getLeads, updateLeadStatus cho admin CRM
- [x] Exit-intent Popup: hiện khi khách chuẩn bị thoát trang, thu thập số điện thoại
- [x] Trang cảm ơn (ThankYou page): hiện sau khi submit form thành công
- [x] Zalo Chat Widget: nút Zalo nổi cố định góc màn hình
- [x] CRM mini: trang /admin/leads cho chủ dự án xem và quản lý danh sách lead
- [x] Facebook Pixel: gắn tracking pixel vào index.html (ID: 1575633650039698)
- [x] Google Tag Manager: placeholder GTM-XXXXXXX đã gắn vào index.html (cần GTM ID thật để kích hoạt)

## Facebook Custom Events

- [x] Sự kiện Lead: kích hoạt khi khách submit form liên hệ thành công
- [x] Sự kiện Contact: kích hoạt khi khách nhấn nút Gọi ngay hoặc Zalo
- [x] Sự kiện ViewContent: kích hoạt khi khách cuộn đến section Ưu đãi

## OceanFront Horizon Landing Page

- [x] Clone từ nền tảng Hà Sơn Tower
- [x] Upload 15 ảnh dự án lên CDN (manus-storage)
- [x] constants.ts: thông tin dự án OceanFront Horizon đầy đủ
- [x] HeroSection: ảnh hero, tagline, stats (415 căn, 38–72m², Sổ Hồng)
- [x] OverviewSection: thông tin dự án, bảng thông số, highlights
- [x] LocationSection: vị trí Trần Phú Nha Trang, kết nối tiện ích
- [x] AmenitiesSection: Sky Galaxy Pool, Infinity Cascade, Vertical Forest
- [x] PromotionsSection: chính sách thanh toán, vay ngân hàng, nội thất
- [x] VR360Section: iframe nhúng https://tav.vn/oceanfront/
- [x] GallerySection: 14 ảnh thực tế dự án
- [x] ContactSection: form lead (tên, SĐT, nội dung, ngân sách)
- [x] Header: logo OFH, navigation, hotline
- [x] Footer: thông tin liên hệ MSH Group
- [x] FloatingCTA: nút Zalo + Gọi ngay cố định góc màn hình
- [x] ExitIntentPopup: popup khi khách chuẩn bị thoát
- [x] Telegram Bot: gửi lead đến Chat ID 5454158215 (đã test OK)
- [x] Facebook Custom Events: Lead, Contact, ViewContent
- [x] SEO meta tags: title, description, OG tags cho OceanFront Horizon
- [ ] Thêm Facebook Pixel ID thật cho OFH (khi có)
- [ ] Gắn domain riêng cho OFH (khi có)
