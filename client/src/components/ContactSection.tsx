import { useState } from "react";
import { CONTACT, FORM_OPTIONS, PROJECT } from "@/lib/constants";
import { useInView } from "@/hooks/useInView";
import { Phone, Mail, MessageCircle, User, CheckCircle } from "lucide-react";

export default function ContactSection() {
  const { ref, isInView } = useInView<HTMLElement>();
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    interest: "",
    budget: "",
    note: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setFormState("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok && data.ok) {
        setFormState("success");
        setFormData({ name: "", phone: "", interest: "", budget: "", note: "" });
      } else {
        setFormState("error");
      }
    } catch (err) {
      console.error("Contact submit failed:", err);
      setFormState("error");
    }
  };

  return (
    <section id="contact" ref={ref} className="py-20 lg:py-28 bg-white">
      <div className={`container section-fade-in ${isInView ? "visible" : ""}`}>
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-gold font-medium text-sm uppercase tracking-widest mb-3">Liên hệ tư vấn</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4">
            Đăng Ký Nhận Thông Tin
          </h2>
          <div className="gold-divider mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-base lg:text-lg">
            Để lại thông tin để được tư vấn chi tiết về dự án {PROJECT.name}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            {formState === "success" ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-10 text-center">
                <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                <h3 className="font-serif text-2xl font-bold text-navy mb-2">Đăng ký thành công!</h3>
                <p className="text-muted-foreground mb-6">
                  Chúng tôi sẽ liên hệ bạn trong thời gian sớm nhất. Hoặc gọi ngay hotline để được tư vấn ngay.
                </p>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="btn-gold inline-flex items-center gap-2 px-6 py-3 rounded-md text-base font-semibold"
                >
                  <Phone size={18} />
                  Gọi {CONTACT.phoneFormatted}
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nhập họ và tên"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-ivory focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Nhập số điện thoại"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-ivory focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors text-sm"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">Nội dung quan tâm</label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-ivory focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors text-sm"
                    >
                      <option value="">-- Chọn nội dung --</option>
                      {FORM_OPTIONS.interests.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">Ngân sách dự kiến</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-ivory focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors text-sm"
                    >
                      <option value="">-- Chọn ngân sách --</option>
                      {FORM_OPTIONS.budgets.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">Ghi chú thêm</label>
                  <textarea
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    placeholder="Nhập yêu cầu hoặc câu hỏi của bạn..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-ivory focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formState === "loading"}
                  className="btn-gold w-full py-4 rounded-lg text-base font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {formState === "loading" ? "Đang gửi..." : "Gửi thông tin đăng ký"}
                </button>

                {formState === "error" && (
                  <p className="text-red-500 text-sm text-center">
                    Có lỗi xảy ra. Vui lòng gọi hotline {CONTACT.phoneFormatted} để được hỗ trợ.
                  </p>
                )}
              </form>
            )}
          </div>

          {/* Agent Info */}
          <div className="lg:col-span-2">
            <div className="bg-navy rounded-xl p-8 text-white sticky top-24">
              {/* Avatar */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                <img
                  src={CONTACT.avatar}
                  alt={`${CONTACT.name} - ${CONTACT.title} - Tư vấn dự án Hà Sơn Tower`}
                  loading="lazy"
                  className="w-20 h-20 rounded-full object-cover object-top border-2 border-gold shadow-md"
                />
                <div>
                  <h4 className="font-serif text-lg font-semibold text-white">{CONTACT.name}</h4>
                  <p className="text-gold text-sm">{CONTACT.title}</p>
                  <p className="text-white/60 text-xs mt-0.5">{CONTACT.company}</p>
                </div>
              </div>

              <p className="text-white/70 text-sm mb-6">{CONTACT.experience}</p>

              {/* Contact Methods */}
              <div className="space-y-4">
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-3 hover:bg-gold/20 transition-colors group"
                >
                  <Phone size={18} className="text-gold" />
                  <div>
                    <p className="text-white text-sm font-medium group-hover:text-gold transition-colors">{CONTACT.phoneFormatted}</p>
                    <p className="text-white/50 text-xs">Gọi trực tiếp</p>
                  </div>
                </a>

                <a
                  href={CONTACT.zalo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-3 hover:bg-gold/20 transition-colors group"
                >
                  <MessageCircle size={18} className="text-gold" />
                  <div>
                    <p className="text-white text-sm font-medium group-hover:text-gold transition-colors">Chat Zalo</p>
                    <p className="text-white/50 text-xs">Tư vấn qua Zalo</p>
                  </div>
                </a>

                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-3 hover:bg-gold/20 transition-colors group"
                >
                  <Mail size={18} className="text-gold" />
                  <div>
                    <p className="text-white text-sm font-medium group-hover:text-gold transition-colors">{CONTACT.email}</p>
                    <p className="text-white/50 text-xs">Gửi email</p>
                  </div>
                </a>
              </div>

              {/* Quick CTA */}
              <a
                href={`tel:${CONTACT.phone}`}
                className="btn-gold w-full mt-6 py-3.5 rounded-lg text-center text-base font-semibold flex items-center justify-center gap-2"
              >
                <Phone size={18} />
                Gọi ngay
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
