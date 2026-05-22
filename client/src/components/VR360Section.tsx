import { PROJECT } from "@/lib/constants";
import { useInView } from "@/hooks/useInView";
import { useState } from "react";
import { Play, Maximize2 } from "lucide-react";

export default function VR360Section() {
  const { ref, isInView } = useInView<HTMLElement>();
  const [loaded, setLoaded] = useState(false);

  return (
    <section id="vr360" ref={ref} className="py-20 lg:py-28 bg-navy text-white">
      <div className={`container section-fade-in ${isInView ? "visible" : ""}`}>
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-gold font-medium text-sm uppercase tracking-widest mb-3">Trải nghiệm thực tế</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Tour VR 360° Dự Án
          </h2>
          <div className="gold-divider mx-auto mb-6" />
          <p className="text-white/60 max-w-2xl mx-auto text-base lg:text-lg">
            Khám phá từng góc nhìn của {PROJECT.shortName} ngay tại nhà – từ căn hộ mẫu, hồ bơi đến view vịnh biển tuyệt đẹp
          </p>
        </div>

        {/* VR360 Embed */}
        <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10 max-w-5xl mx-auto">
          {/* Loading placeholder */}
          {!loaded && (
            <div className="absolute inset-0 bg-navy/80 flex flex-col items-center justify-center z-10">
              <div className="w-20 h-20 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center mb-4 animate-pulse">
                <Play size={32} className="text-gold ml-1" />
              </div>
              <p className="text-white/70 text-sm">Đang tải tour VR360...</p>
            </div>
          )}

          <iframe
            src={PROJECT.vr360}
            title="Tour VR360 AnhNguyen OceanFront Horizon Nha Trang"
            className="w-full"
            style={{ height: "500px", minHeight: "400px" }}
            allowFullScreen
            loading="lazy"
            onLoad={() => setLoaded(true)}
          />

          {/* Fullscreen hint */}
          <div className="absolute top-4 right-4 bg-navy/70 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2">
            <Maximize2 size={14} className="text-gold" />
            <span className="text-white/80 text-xs">Nhấn toàn màn hình để trải nghiệm tốt nhất</span>
          </div>
        </div>

        {/* CTA below VR */}
        <div className="text-center mt-10">
          <a
            href={PROJECT.vr360}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold px-8 py-3 rounded-md text-base font-semibold inline-flex items-center gap-2"
          >
            <Maximize2 size={18} />
            Mở Tour VR360 Toàn Màn Hình
          </a>
        </div>
      </div>
    </section>
  );
}
