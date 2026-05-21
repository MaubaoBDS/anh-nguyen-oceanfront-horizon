import { useEffect } from "react";
import { PROMOTIONS, CONTACT } from "@/lib/constants";
import { useInView } from "@/hooks/useInView";
import { fbViewContent, fbContact } from "@/lib/fbEvents";
import { Gift, Percent, CreditCard, Phone } from "lucide-react";

const promoIcons = [<Percent size={24} />, <CreditCard size={24} />, <Gift size={24} />];

export default function PromotionsSection() {
  const { ref, isInView } = useInView<HTMLElement>();

  useEffect(() => {
    if (isInView) {
      fbViewContent("Hà Sơn Tower - Ưu đãi & Chính sách giá");
    }
  }, [isInView]);

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="promotions" ref={ref} className="py-20 lg:py-28 bg-gradient-to-br from-navy via-navy-light to-navy relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />

      <div className={`container relative section-fade-in ${isInView ? "visible" : ""}`}>
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-gold font-medium text-sm uppercase tracking-widest mb-3">Chính sách ưu đãi</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Ưu Đãi Hấp Dẫn
          </h2>
          <div className="gold-divider mx-auto mb-6" />
          <p className="text-white/60 max-w-2xl mx-auto text-base lg:text-lg">
            Chính sách thanh toán linh hoạt, hỗ trợ tài chính tối đa cho khách hàng
          </p>
        </div>

        {/* Promotions Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {PROMOTIONS.map((promo, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:border-gold/40 hover:bg-white/10 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-gold/20 flex items-center justify-center text-gold mb-5">
                {promoIcons[i]}
              </div>
              <h3 className="text-white font-semibold text-lg mb-3">{promo.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{promo.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-white/60 text-sm mb-5">Liên hệ ngay để nhận bảng giá chi tiết và chính sách mới nhất</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={scrollToContact}
              className="btn-gold px-8 py-3.5 rounded-md text-base font-semibold"
            >
              Nhận bảng giá ngay
            </button>
            <a
              href={`tel:${CONTACT.phone}`}
              onClick={() => fbContact("phone")}
              className="px-8 py-3.5 rounded-md text-base font-semibold text-white border border-white/30 hover:border-gold hover:text-gold transition-colors duration-200 flex items-center gap-2"
            >
              <Phone size={18} />
              {CONTACT.phoneFormatted}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
