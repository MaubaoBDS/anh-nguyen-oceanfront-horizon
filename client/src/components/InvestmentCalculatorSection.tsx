import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { Calculator, Loader2 } from "lucide-react";

export default function InvestmentCalculatorSection() {
  const { ref, isInView } = useInView<HTMLElement>();
  const [loaded, setLoaded] = useState(false);

  return (
    <section
      id="investment-calculator"
      ref={ref}
      className="py-20 lg:py-28 bg-ivory"
    >
      <div className={`container section-fade-in ${isInView ? "visible" : ""}`}>
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-gold font-medium text-sm uppercase tracking-widest mb-3">
            Công cụ tài chính
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4">
            Bảng Tính Dòng Tiền Đầu Tư
          </h2>
          <div className="gold-divider mx-auto mb-6" />
          <p className="text-navy/60 max-w-2xl mx-auto text-base lg:text-lg">
            Mô phỏng bài toán kinh doanh thực tế – tính toán ROI, lợi nhuận
            ròng và thời gian hoàn vốn theo thông số căn hộ bạn quan tâm
          </p>
        </div>

        {/* Calculator Embed */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-navy/10 max-w-5xl mx-auto bg-white">
          {/* Loading placeholder */}
          {!loaded && (
            <div className="absolute inset-0 bg-white flex flex-col items-center justify-center z-10 min-h-[600px]">
              <div className="w-16 h-16 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center mb-4">
                <Loader2 size={28} className="text-gold animate-spin" />
              </div>
              <p className="text-navy/60 text-sm">Đang tải bảng tính...</p>
            </div>
          )}

          <iframe
            src="https://horizoncalc-dxyksgqb.manus.space"
            title="Bảng Tính Đầu Tư Nguyễn Horizon – Căn Hộ Nghỉ Dưỡng Dòng Tiền"
            className="w-full"
            style={{ height: "820px", minHeight: "600px", border: "none" }}
            allowFullScreen
            loading="lazy"
            onLoad={() => setLoaded(true)}
          />
        </div>

        {/* Note below */}
        <p className="text-center text-navy/40 text-xs mt-5 max-w-xl mx-auto">
          * Kết quả mô phỏng mang tính tham khảo. Liên hệ chuyên gia để nhận
          tư vấn chi tiết phù hợp với nhu cầu đầu tư của bạn.
        </p>
      </div>
    </section>
  );
}
