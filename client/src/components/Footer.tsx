import { PROJECT, CONTACT, NAV_ITEMS } from "@/lib/constants";
import { fbContact } from "@/lib/fbEvents";
import { Phone, Mail, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy text-white py-12 lg:py-16">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-10 mb-10 pb-10 border-b border-white/10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded bg-gold flex items-center justify-center">
                <span className="text-navy font-serif font-bold text-base">OFH</span>
              </div>
              <span className="font-serif font-bold text-xl text-white">{PROJECT.name}</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              {PROJECT.subTagline}. {PROJECT.location}
            </p>
            <p className="text-white/40 text-xs">
              Chủ đầu tư: {PROJECT.developer}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold font-semibold text-sm uppercase tracking-wider mb-4">Liên kết nhanh</h4>
            <nav className="space-y-2.5">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block text-white/60 hover:text-gold text-sm transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold font-semibold text-sm uppercase tracking-wider mb-4">Liên hệ tư vấn</h4>
            <div className="space-y-3">
              <a href={`tel:${CONTACT.phone}`} onClick={() => fbContact("phone")} className="flex items-center gap-3 text-white/60 hover:text-gold text-sm transition-colors">
                <Phone size={16} />
                {CONTACT.phoneFormatted}
              </a>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 text-white/60 hover:text-gold text-sm transition-colors">
                <Mail size={16} />
                {CONTACT.email}
              </a>
              <a href={CONTACT.zalo} target="_blank" rel="noopener noreferrer" onClick={() => fbContact("zalo")} className="flex items-center gap-3 text-white/60 hover:text-gold text-sm transition-colors">
                <MessageCircle size={16} />
                Chat Zalo
              </a>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-white/40 text-xs">
                {CONTACT.name} - {CONTACT.title}
              </p>
              <p className="text-white/40 text-xs">{CONTACT.company}</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-white/40 text-xs">
            &copy; {new Date().getFullYear()} {PROJECT.name}. Thông tin tham khảo, không phải cam kết pháp lý.
          </p>
        </div>
      </div>
    </footer>
  );
}
