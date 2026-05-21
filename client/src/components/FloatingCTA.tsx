import { useState } from "react";
import { CONTACT } from "@/lib/constants";
import { Phone, MessageCircle, X, Send } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function FloatingCTA() {
  const [showQuickForm, setShowQuickForm] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitLead = trpc.contact.submitLead.useMutation({
    onSuccess: () => setSubmitted(true),
  });

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    submitLead.mutate({
      name: name.trim() || "Khách hàng",
      phone: phone.trim(),
      source: "popup",
      note: "Đăng ký qua Floating CTA",
    });
  };

  return (
    <>
      {/* Quick form popup */}
      {showQuickForm && (
        <div
          className="fixed bottom-28 right-4 sm:right-6 z-[100] w-72 bg-navy rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
          style={{ animation: "slideUp 0.3s cubic-bezier(0.23,1,0.32,1)" }}
        >
          <div className="h-1 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600" />
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-semibold text-sm">Đăng ký tư vấn miễn phí</h4>
              <button onClick={() => setShowQuickForm(false)} className="text-white/50 hover:text-white">
                <X size={16} />
              </button>
            </div>
            {!submitted ? (
              <form onSubmit={handleQuickSubmit} className="space-y-2.5">
                <input
                  type="text"
                  placeholder="Họ tên của bạn"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white placeholder-white/40 text-sm focus:outline-none focus:border-gold"
                />
                <input
                  type="tel"
                  placeholder="Số điện thoại *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white placeholder-white/40 text-sm focus:outline-none focus:border-gold"
                />
                <button
                  type="submit"
                  disabled={submitLead.isPending}
                  className="w-full btn-gold py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  <Send size={14} />
                  {submitLead.isPending ? "Đang gửi..." : "Nhận tư vấn ngay"}
                </button>
              </form>
            ) : (
              <div className="text-center py-3">
                <div className="text-3xl mb-2">✅</div>
                <p className="text-white font-semibold text-sm">Đã nhận thông tin!</p>
                <p className="text-white/60 text-xs mt-1">Chuyên viên liên hệ trong 15 phút</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating buttons */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-3 items-end">
        {/* Zalo */}
        <div className="flex items-center gap-2 group">
          <span className="bg-navy text-white text-xs px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg whitespace-nowrap border border-white/10">
            Chat Zalo
          </span>
          <a
            href={CONTACT.zalo}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-full bg-[#0068ff] hover:bg-[#0057d9] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
            aria-label="Chat Zalo"
          >
            <svg viewBox="0 0 48 48" width="26" height="26" fill="white">
              <path d="M24 4C12.95 4 4 12.95 4 24c0 3.67.99 7.1 2.71 10.06L4 44l10.26-2.68A19.93 19.93 0 0 0 24 44c11.05 0 20-8.95 20-20S35.05 4 24 4zm0 36c-3.18 0-6.15-.87-8.68-2.38l-.62-.37-6.09 1.59 1.62-5.93-.4-.64A15.93 15.93 0 0 1 8 24c0-8.82 7.18-16 16-16s16 7.18 16 16-7.18 16-16 16zm8.77-11.9c-.48-.24-2.84-1.4-3.28-1.56-.44-.16-.76-.24-1.08.24-.32.48-1.24 1.56-1.52 1.88-.28.32-.56.36-1.04.12-.48-.24-2.03-.75-3.87-2.39-1.43-1.27-2.4-2.85-2.68-3.33-.28-.48-.03-.74.21-.98.22-.22.48-.56.72-.84.24-.28.32-.48.48-.8.16-.32.08-.6-.04-.84-.12-.24-1.08-2.6-1.48-3.56-.39-.93-.79-.8-1.08-.82-.28-.01-.6-.02-.92-.02s-.84.12-1.28.6c-.44.48-1.68 1.64-1.68 4s1.72 4.64 1.96 4.96c.24.32 3.38 5.16 8.2 7.24 1.15.5 2.04.79 2.74 1.01 1.15.36 2.2.31 3.03.19.92-.14 2.84-1.16 3.24-2.28.4-1.12.4-2.08.28-2.28-.12-.2-.44-.32-.92-.56z"/>
            </svg>
          </a>
        </div>

        {/* Quick form toggle */}
        <div className="flex items-center gap-2 group">
          <span className="bg-navy text-white text-xs px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg whitespace-nowrap border border-white/10">
            Đăng ký tư vấn
          </span>
          <button
            onClick={() => setShowQuickForm(!showQuickForm)}
            className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
            aria-label="Đăng ký tư vấn"
          >
            <MessageCircle size={24} />
          </button>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-2 group">
          <span className="bg-navy text-white text-xs px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg whitespace-nowrap border border-white/10">
            {CONTACT.phoneFormatted}
          </span>
          <a
            href={`tel:${CONTACT.phone}`}
            className="w-14 h-14 rounded-full bg-gold hover:bg-amber-500 text-navy flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1 relative"
            aria-label="Gọi ngay"
          >
            <Phone size={24} />
            <span className="absolute inset-0 rounded-full bg-gold/40 animate-ping" />
          </a>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
