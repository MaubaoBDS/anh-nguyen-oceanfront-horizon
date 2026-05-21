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

- [ ] Cập nhật DB schema: thêm cột status, source, notes vào bảng leads
- [ ] Server router: thêm procedure getLeads, updateLeadStatus cho admin CRM
- [ ] Exit-intent Popup: hiện khi khách chuẩn bị thoát trang, thu thập số điện thoại
- [ ] Trang cảm ơn (ThankYou page): hiện sau khi submit form thành công
- [ ] Zalo Chat Widget: nút Zalo nổi cố định góc màn hình
- [ ] CRM mini: trang /admin/leads cho chủ dự án xem và quản lý danh sách lead
- [ ] Facebook Pixel: gắn tracking pixel vào index.html (cần FB Pixel ID)
- [ ] Google Tag Manager: gắn GTM vào index.html (cần GTM ID)
