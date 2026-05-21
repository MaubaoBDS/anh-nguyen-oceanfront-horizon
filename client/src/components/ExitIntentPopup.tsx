import { useState, useEffect, useRef } from "react";
import { X, Gift, Phone } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { CONTACT } from "@/lib/constants";
import { fbLead, fbContact } from "@/lib/fbEvents";

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const submitLead = trpc.contact.submitLead.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      fbLead({ content_name: "Hà Sơn Tower - Exit-intent Popup" });
    },
    onError: () => setError("Có lỗi xảy ra, vui lòng thử lại."),
  });

  useEffect(() => {
    // Đã hiện rồi thì không hiện nữa trong session này
    const alreadyShown = sessionStorage.getItem("exitPopupShown");
    if (alreadyShown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !shown) {
        timerRef.current = setTimeout(() => {
          setIsOpen(true);
          setShown(true);
          sessionStorage.setItem("exitPopupShown", "1");
        }, 200);
      }
    };

    // Mobile: hiện sau 45 giây nếu chưa submit form
    const mobileTimer = setTimeout(() => {
      if (!shown && window.innerWidth < 768) {
        const alreadyShownNow = sessionStorage.getItem("exitPopupShown");
        if (!alreadyShownNow) {
          setIsOpen(true);
          setShown(true);
          sessionStorage.setItem("exitPopupShown", "1");
        }
      }
    }, 45000);

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(mobileTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [shown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) { setError("Vui lòng nhập họ tên."); return; }
    if (!phone.trim() || phone.length < 9) { setError("Vui lòng nhập số điện thoại hợp lệ."); return; }
    submitLead.mutate({ name: name.trim(), phone: phone.trim(), source: "popup", note: "Đăng ký qua Exit-intent Popup" });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={() => setIsOpen(false)}>
      <div
        className="relative bg-navy rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "popupIn 0.35s cubic-bezier(0.23,1,0.32,1)" }}
      >
        {/* Gold top bar */}
        <div className="h-1.5 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600" />

        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-white/50 hover:text-white transition-colors p-1 z-10"
          aria-label="Đóng"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          {!submitted ? (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center mx-auto mb-4">
                  <Gift className="text-gold" size={26} />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white mb-2">
                  Khoan đã! Nhận ưu đãi độc quyền
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Để lại số điện thoại — nhận ngay <span className="text-gold font-semibold">bảng giá chi tiết</span> và <span className="text-gold font-semibold">chính sách ưu đãi mới nhất</span> từ Hà Sơn Tower.
                </p>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-3 gap-3 mb-6 text-center">
                {[
                  { icon: "🎁", text: "Bảng giá độc quyền" },
                  { icon: "📋", text: "Mặt bằng căn hộ" },
                  { icon: "💰", text: "Chính sách vay" },
                ].map((b) => (
                  <div key={b.text} className="bg-white/5 rounded-lg p-2.5">
                    <div className="text-xl mb-1">{b.icon}</div>
                    <p className="text-white/80 text-xs">{b.text}</p>
                  </div>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Họ và tên *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-gold text-sm"
                />
                <input
                  type="tel"
                  placeholder="Số điện thoại *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-gold text-sm"
                />
                {error && <p className="text-red-400 text-xs">{error}</p>}
                <button
                  type="submit"
                  disabled={submitLead.isPending}
                  className="w-full btn-gold py-3.5 rounded-lg font-semibold text-sm disabled:opacity-60"
                >
                  {submitLead.isPending ? "Đang gửi..." : "Nhận Ưu Đãi Ngay"}
                </button>
              </form>

              <p className="text-center text-white/40 text-xs mt-3">
                Hoặc gọi ngay{" "}
                <a href={`tel:${CONTACT.phone}`} onClick={() => fbContact("phone")} className="text-gold underline">
                  {CONTACT.phoneFormatted}
                </a>
              </p>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✅</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-2">Cảm ơn bạn!</h3>
              <p className="text-white/70 text-sm mb-6">
                Chuyên viên tư vấn sẽ liên hệ với bạn trong vòng <span className="text-gold font-semibold">15 phút</span>.
              </p>
              <a
                href={`tel:${CONTACT.phone}`}
                className="inline-flex items-center gap-2 btn-gold px-6 py-3 rounded-lg font-semibold text-sm"
              >
                <Phone size={16} />
                Gọi ngay {CONTACT.phoneFormatted}
              </a>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes popupIn {
          from { opacity: 0; transform: scale(0.92) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
