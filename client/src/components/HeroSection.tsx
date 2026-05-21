import { IMAGES, PROJECT, CONTACT } from "@/lib/constants";
import { fbContact } from "@/lib/fbEvents";
import { Phone, ArrowDown } from "lucide-react";

export default function HeroSection() {
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.hero}
          alt="Phối cảnh chung cư cao cấp Hà Sơn Tower 25 tầng tại Trạm Trôi Hoài Đức Hà Nội"
          className="w-full h-full object-cover"
          fetchPriority="high"
          decoding="async"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-navy/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-navy/30" />
      </div>

      {/* Content */}
      <div className="relative container pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/40 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-gold text-sm font-medium">{PROJECT.status}</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            {PROJECT.name}
          </h1>
          <p className="text-gold font-serif text-xl sm:text-2xl font-semibold mb-3">
            {PROJECT.tagline}
          </p>
          <p className="text-white/70 text-base sm:text-lg mb-8 max-w-lg">
            {PROJECT.subTagline}
          </p>

          {/* Key Stats */}
          <div className="grid grid-cols-3 gap-4 mb-10 max-w-md">
            <div className="text-center">
              <p className="text-gold font-serif text-2xl sm:text-3xl font-bold">25</p>
              <p className="text-white/60 text-xs sm:text-sm mt-1">Tầng nổi</p>
            </div>
            <div className="text-center border-x border-white/20">
              <p className="text-gold font-serif text-2xl sm:text-3xl font-bold">65-98</p>
              <p className="text-white/60 text-xs sm:text-sm mt-1">m² / căn</p>
            </div>
            <div className="text-center">
              <p className="text-gold font-serif text-xl sm:text-2xl font-bold">Giá Thỏa Thuận</p>
              <p className="text-white/60 text-xs sm:text-sm mt-1">Liên hệ</p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a
              href={`tel:${CONTACT.phone}`}
              onClick={() => fbContact("phone")}
              className="btn-gold px-6 py-3 rounded-md text-base font-semibold flex items-center gap-2"
            >
              <Phone size={18} />
              Gọi ngay {CONTACT.phoneFormatted}
            </a>
            <button
              onClick={scrollToContact}
              className="px-6 py-3 rounded-md text-base font-semibold text-white border border-white/30 hover:border-gold hover:text-gold transition-colors duration-200"
            >
              Nhận tư vấn miễn phí
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="text-white/50" size={24} />
      </div>
    </section>
  );
}
