import { INFRASTRUCTURE, IMAGES, PROJECT } from "@/lib/constants";
import { useInView } from "@/hooks/useInView";
import { MapPin, Clock, CheckCircle } from "lucide-react";

export default function LocationSection() {
  const { ref, isInView } = useInView<HTMLElement>();

  return (
    <section id="location" ref={ref} className="py-20 lg:py-28 bg-navy text-white">
      <div className={`container section-fade-in ${isInView ? "visible" : ""}`}>
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-gold font-medium text-sm uppercase tracking-widest mb-3">Vị trí chiến lược</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Tọa Sơn – Nghinh Hải
          </h2>
          <div className="gold-divider mx-auto mb-6" />
          <p className="text-white/60 max-w-2xl mx-auto text-base lg:text-lg">
            Tựa lưng núi đá Cảnh Long, mặt tiền đường Trần Phú – trục huyết mạch đắt giá nhất Nha Trang, nhìn thẳng ra vịnh biển đẹp nhất thế giới
          </p>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Bird view Image */}
          <div className="relative rounded-lg overflow-hidden shadow-2xl">
            <img
              src={IMAGES.birdView1}
              alt="Vị trí dự án AnhNguyen OceanFront Horizon nhìn từ flycam – mặt tiền vịnh Nha Trang"
              loading="lazy"
              decoding="async"
              width={800}
              height={500}
              className="w-full h-auto object-cover"
            />
            <div className="absolute top-4 left-4 bg-navy/90 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center gap-2">
              <MapPin size={16} className="text-gold" />
              <span className="text-white text-sm font-medium">Đường Trần Phú, Nha Trang</span>
            </div>
          </div>

          {/* Infrastructure List */}
          <div>
            <h3 className="font-serif text-2xl font-semibold text-white mb-6">
              Kết nối tiện ích xung quanh
            </h3>
            <div className="space-y-4">
              {INFRASTRUCTURE.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-white/5 rounded-lg px-5 py-4 border border-white/10 hover:border-gold/30 transition-colors duration-200"
                >
                  <div className="flex-shrink-0">
                    <CheckCircle size={20} className="text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">{item.name}</p>
                    <p className="text-white/50 text-xs">{item.status}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-gold">
                    <Clock size={14} />
                    <span className="text-sm font-semibold">{item.distance}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 bg-gold/10 border border-gold/30 rounded-lg">
              <p className="text-gold font-semibold text-sm mb-1">Địa chỉ dự án</p>
              <p className="text-white/80 text-sm">{PROJECT.location}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
