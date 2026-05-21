// Hà Sơn Tower Landing Page - Constants & Data

export const CONTACT = {
  name: "Mậu Bảo",
  title: "Giám Đốc Dự Án",
  company: "Sàn MSH Group",
  phone: "0933235444",
  phoneFormatted: "0933.235.444",
  email: "maubao19982@gmail.com",
  zalo: "https://zalo.me/0933235444",
  avatar: "/manus-storage/profile-avatar_32317a8e.webp",
  experience: "10+ năm kinh nghiệm tư vấn BĐS",
} as const;

export const IMAGES = {
  hero: "https://d2xsxph8kpxj0f.cloudfront.net/310519663541088664/Q52BQ62R4zTHBhYrx7v7o3/hero-ha-son-tower-QwWz2fT5zyFemmp79jrBG6.webp",
  pool: "https://d2xsxph8kpxj0f.cloudfront.net/310519663541088664/Q52BQ62R4zTHBhYrx7v7o3/amenity-pool-EKgrqiCbB8wgF4GiCsLm92.webp",
  lobby: "https://d2xsxph8kpxj0f.cloudfront.net/310519663541088664/Q52BQ62R4zTHBhYrx7v7o3/lobby-interior-jZUtGvDvptoGjQhCw8mxLR.webp",
  garden: "https://d2xsxph8kpxj0f.cloudfront.net/310519663541088664/Q52BQ62R4zTHBhYrx7v7o3/garden-amenity-8G5htWPETEncNDJCnWVWC8.webp",
  locationMap: "https://datxanhmb.vn/wp-content/uploads/2025/08/gelex-tower-tram-troi-vi-tri.jpg",
  building: "https://datxanhmb.vn/wp-content/uploads/2025/08/gelex-tower-tram-troi.jpg",
  matBangTang1: "/manus-storage/mat-bang-tang-1_c14c2e3a.webp",
  matBangTongThe: "/manus-storage/mat-bang-tong-the_b745a291.webp",
} as const;

export const PROJECT = {
  name: "Hà Sơn Tower",
  developer: "Công ty CP Đầu tư Thương mại Hà Sơn",
  contractor: "Hòa Bình Group",
  location: "Lô đất E1, khu Đồng Gạc, thị trấn Trạm Trôi, huyện Hoài Đức, Hà Nội",
  totalArea: "6.156 m²",
  buildDensity: "48%",
  productType: "Căn hộ chung cư cao cấp",
  legal: "Sổ hồng vĩnh viễn",
  style: "Hiện đại",
  apartmentArea: "65 – 98 m²",
  bedrooms: "2 – 3 phòng ngủ",
  pricePerM2: "Giá liên hệ thỏa thuận",
  totalUnits: "~300 căn hộ",
  floors: "25 tầng nổi + 2 tầng hầm",
  commercial: "3 tầng thương mại dịch vụ",
  tagline: "Kiến Tạo Chuẩn Sống Mới Phía Tây Hà Nội",
  subTagline: "Căn hộ cao cấp tại trung tâm hành chính mới Hoài Đức",
  status: "Sắp mở bán",
} as const;

export const SEO = {
  title: "Hà Sơn Tower - Căn Hộ Cao Cấp Trạm Trôi, Hoài Đức",
  description: "Hà Sơn Tower - Chung cư cao cấp 25 tầng tại Trạm Trôi, Hoài Đức. Sổ hồng vĩnh viễn, căn hộ 2-3PN diện tích 65-98m². Liên hệ 0933.235.444",
} as const;

export const HIGHLIGHTS = [
  { icon: "map-pin", title: "Vị trí vàng", desc: "Mặt đường Quốc lộ 32, trung tâm hành chính mới Hoài Đức" },
  { icon: "file-check", title: "Pháp lý minh bạch", desc: "Sổ hồng vĩnh viễn, chủ đầu tư uy tín" },
  { icon: "route", title: "Kết nối đa chiều", desc: "Liền kề Vành đai 3.5, QL70, Đại lộ Thăng Long" },
  { icon: "building-2", title: "Thiết kế hiện đại", desc: "25 tầng, 2 block A-B, nội thất cao cấp bàn giao" },
  { icon: "trees", title: "Tiện ích đồng bộ", desc: "Bể bơi, gym, spa, khu vui chơi, TTTM ngay tầng đế" },
  { icon: "trending-up", title: "Tiềm năng tăng giá", desc: "Hạ tầng phía Tây bùng nổ, Hoài Đức lên quận 2025" },
] as const;

export const PROMOTIONS = [
  {
    title: "Hỗ trợ vay 70%",
    description: "Ngân hàng hỗ trợ vay tối đa 70% giá trị căn hộ, miễn lãi suất 0% trong 12 tháng đầu",
  },
  {
    title: "Thanh toán linh hoạt",
    description: "Tiến độ thanh toán chia 6-7 đợt theo tiến độ thi công, giảm áp lực tài chính",
  },
  {
    title: "Quà tặng đặt mua sớm",
    description: "Gói nội thất cao cấp, voucher quà tặng hấp dẫn, miễn phí 1 năm phí quản lý",
  },
] as const;

export const INFRASTRUCTURE = [
  { name: "Sân bay Nội Bài", distance: "35 phút", status: "Hoạt động" },
  { name: "Hồ Hoàn Kiếm", distance: "14 km", status: "Hoạt động" },
  { name: "Bến xe Mỹ Đình", distance: "10 phút", status: "Hoạt động" },
  { name: "SVĐ Mỹ Đình", distance: "10 phút", status: "Hoạt động" },
  { name: "Big C Thăng Long", distance: "15 phút", status: "Hoạt động" },
  { name: "Vành đai 3.5", distance: "Liền kề", status: "Đang thi công" },
  { name: "Đại lộ Thăng Long", distance: "5 phút", status: "Hoạt động" },
  { name: "Quốc lộ 32", distance: "Mặt đường", status: "Hoạt động" },
] as const;

export const AMENITIES = [
  { icon: "waves", title: "Bể bơi bốn mùa", desc: "Bể bơi trong nhà tiêu chuẩn resort" },
  { icon: "dumbbell", title: "Gym & Spa", desc: "Phòng tập hiện đại, spa thư giãn" },
  { icon: "baby", title: "Khu vui chơi trẻ em", desc: "Không gian vui chơi an toàn, sáng tạo" },
  { icon: "shopping-bag", title: "Trung tâm thương mại", desc: "3 tầng TTTM ngay tầng đế tòa nhà" },
  { icon: "shield-check", title: "An ninh 24/7", desc: "Camera giám sát, bảo vệ chuyên nghiệp" },
  { icon: "car", title: "Hầm để xe thông minh", desc: "2 tầng hầm rộng rãi, thang máy hiện đại" },
] as const;

export const GALLERY = [
  { src: IMAGES.hero, alt: "Phối cảnh tổng thể Hà Sơn Tower" },
  { src: IMAGES.building, alt: "Tòa nhà Hà Sơn Tower" },
  { src: IMAGES.pool, alt: "Bể bơi tầng thượng Hà Sơn Tower" },
  { src: IMAGES.lobby, alt: "Sảnh đón sang trọng Hà Sơn Tower" },
  { src: IMAGES.garden, alt: "Khu vườn và sân chơi trẻ em" },
  { src: IMAGES.locationMap, alt: "Bản đồ vị trí Hà Sơn Tower" },
  { src: IMAGES.matBangTang1, alt: "Mặt bằng tầng 1 Hà Sơn Tower" },
  { src: IMAGES.matBangTongThe, alt: "Mặt bằng tổng thể tầng 4,6,8,9,11,13,14,16,18,19,21 Hà Sơn Tower" },
] as const;

export const NAV_ITEMS = [
  { label: "Tổng quan", href: "#overview" },
  { label: "Vị trí", href: "#location" },
  { label: "Tiện ích", href: "#amenities" },
  { label: "Ưu đãi", href: "#promotions" },
  { label: "Hình ảnh", href: "#gallery" },
  { label: "Liên hệ", href: "#contact" },
] as const;

export const FORM_OPTIONS = {
  interests: [
    { value: "bang-gia", label: "Nhận bảng giá" },
    { value: "tham-quan", label: "Đặt lịch tham quan" },
    { value: "dau-tu", label: "Tư vấn đầu tư" },
    { value: "uu-dai", label: "Chính sách ưu đãi" },
    { value: "khac", label: "Nội dung khác" },
  ],
  budgets: [
    { value: "duoi-2-ty", label: "Dưới 2 tỷ" },
    { value: "2-3-ty", label: "2 - 3 tỷ" },
    { value: "3-4-ty", label: "3 - 4 tỷ" },
    { value: "4-5-ty", label: "4 - 5 tỷ" },
    { value: "tren-5-ty", label: "Trên 5 tỷ" },
  ],
} as const;
