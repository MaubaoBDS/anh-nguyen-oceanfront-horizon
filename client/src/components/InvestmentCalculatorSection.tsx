import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { Loader2 } from "lucide-react";

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
          <p className="text-gold font-medium text-sm uppercase tracking-widest mb-4">
            Công cụ đầu tư
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-navy leading-tight mb-5">
            Tính Dòng Tiền{" "}
            <em className="italic text-gold not-italic" style={{ fontStyle: "italic" }}>
              Cho Thuê
            </em>
          </h2>
          <p className="text-navy/60 max-w-xl mx-auto text-base lg:text-lg leading-relaxed">
            Ước tính dòng tiền cho thuê căn hộ AnhNguyen OceanFront Horizon dựa trên
            mức giá, tỷ lệ lấp đầy và chính sách vận hành thực tế tại Nha Trang.
          </p>
        </div>

        {/* Calculator Embed – no outer card border, just subtle shadow */}
        <div className="relative max-w-4xl mx-auto">
          {/* Loading placeholder */}
          {!loaded && (
            <div
              className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg"
              style={{ minHeight: "700px" }}
            >
              <div className="w-16 h-16 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center mb-4">
                <Loader2 size={28} className="text-gold animate-spin" />
              </div>
              <p className="text-navy/50 text-sm">Đang tải bảng tính...</p>
            </div>
          )}

          <iframe
            src="https://horizoncalc-dxyksgqb.manus.space"
            title="Bảng Tính Dòng Tiền Cho Thuê – AnhNguyen OceanFront Horizon"
            className="w-full rounded-2xl"
            style={{
              height: "900px",
              minHeight: "700px",
              border: "none",
              display: loaded ? "block" : "none",
              boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
            }}
            allowFullScreen
            loading="lazy"
            onLoad={() => setLoaded(true)}
          />
        </div>
      </div>
    </section>
  );
}
