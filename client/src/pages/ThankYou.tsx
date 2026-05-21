import { useEffect } from "react";
import { Link } from "wouter";
import { CheckCircle, Phone, Home, Calendar } from "lucide-react";
import { CONTACT, PROJECT } from "@/lib/constants";

export default function ThankYou() {
  // Scroll to top khi vào trang
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-navy flex flex-col items-center justify-center px-4 py-16">
      {/* Gold top bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600" />

      <div className="max-w-lg w-full text-center">
        {/* Success icon */}
        <div className="w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-400/50 flex items-center justify-center mx-auto mb-8"
          style={{ animation: "scaleIn 0.5s cubic-bezier(0.23,1,0.32,1)" }}>
          <CheckCircle className="text-green-400" size={48} />
        </div>

        {/* Heading */}
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
          Cảm ơn bạn đã quan tâm!
        </h1>
        <p className="text-white/70 text-base sm:text-lg mb-2">
          Thông tin của bạn đã được ghi nhận thành công.
        </p>
        <p className="text-gold font-semibold text-lg mb-10">
          Chuyên viên sẽ liên hệ trong vòng 15 phút!
        </p>

        {/* What happens next */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-left">
          <h3 className="text-white font-semibold mb-4 text-center">Bước tiếp theo</h3>
          <div className="space-y-4">
            {[
              {
                icon: <Phone size={18} className="text-gold" />,
                title: "Chuyên viên gọi điện tư vấn",
                desc: "Trong vòng 15 phút, chuyên viên sẽ liên hệ để tư vấn chi tiết về dự án.",
              },
              {
                icon: <Calendar size={18} className="text-gold" />,
                title: "Đặt lịch tham quan thực tế",
                desc: "Bạn sẽ được mời tham quan căn hộ mẫu và khu vực dự án hoàn toàn miễn phí.",
              },
              {
                icon: <Home size={18} className="text-gold" />,
                title: "Nhận bảng giá & chính sách ưu đãi",
                desc: "Nhận đầy đủ bảng giá, mặt bằng căn hộ và chính sách thanh toán linh hoạt.",
              },
            ].map((step, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  {step.icon}
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{step.title}</p>
                  <p className="text-white/60 text-xs mt-0.5 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={`tel:${CONTACT.phone}`}
            className="btn-gold px-8 py-3.5 rounded-lg font-semibold flex items-center justify-center gap-2"
          >
            <Phone size={18} />
            Gọi ngay {CONTACT.phoneFormatted}
          </a>
          <Link
            href="/"
            className="px-8 py-3.5 rounded-lg font-semibold text-white border border-white/20 hover:border-gold hover:text-gold transition-colors flex items-center justify-center gap-2"
          >
            <Home size={18} />
            Về trang chủ
          </Link>
        </div>

        <p className="text-white/30 text-xs mt-8">
          {PROJECT.name} — {PROJECT.location}
        </p>
      </div>

      <style>{`
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.5); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
