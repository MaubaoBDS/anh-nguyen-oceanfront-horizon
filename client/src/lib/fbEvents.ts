/**
 * Facebook Pixel Custom Events helper
 * Pixel ID: 1575633650039698
 *
 * Sử dụng:
 *   import { fbLead, fbContact, fbViewContent } from "@/lib/fbEvents";
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Kích hoạt khi khách submit form liên hệ thành công */
export function fbLead(params?: { content_name?: string; content_category?: string }) {
  window.fbq?.("track", "Lead", {
    content_name: params?.content_name ?? "Hà Sơn Tower - Đăng ký tư vấn",
    content_category: params?.content_category ?? "Real Estate",
    currency: "VND",
  });
}

/** Kích hoạt khi khách nhấn nút Gọi ngay hoặc Chat Zalo */
export function fbContact(method: "phone" | "zalo" = "phone") {
  window.fbq?.("track", "Contact", {
    content_name: "Hà Sơn Tower",
    content_category: method === "zalo" ? "Zalo" : "Phone",
  });
}

/** Kích hoạt khi khách xem section Ưu đãi / Bảng giá */
export function fbViewContent(contentName: string) {
  window.fbq?.("track", "ViewContent", {
    content_name: contentName,
    content_category: "Real Estate",
    content_type: "product",
  });
}
