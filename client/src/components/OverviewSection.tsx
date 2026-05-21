import { PROJECT, HIGHLIGHTS, IMAGES } from "@/lib/constants";
import { useInView } from "@/hooks/useInView";
import { MapPin, FileCheck, Route, Building2, Trees, TrendingUp } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "map-pin": <MapPin size={24} />,
  "file-check": <FileCheck size={24} />,
  "route": <Route size={24} />,
  "building-2": <Building2 size={24} />,
  "trees": <Trees size={24} />,
  "trending-up": <TrendingUp size={24} />,
};

export default function OverviewSection() {
  const { ref, isInView } = useInView<HTMLElement>();

  return (
    <section id="overview" ref={ref} className="py-20 lg:py-28 bg-ivory">
      <div className={`container section-fade-in ${isInView ? "visible" : ""}`}>
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-gold font-medium text-sm uppercase tracking-widest mb-3">Tổng quan dự án</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4">
            {PROJECT.name}
          </h2>
          <div className="gold-divider mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-base lg:text-lg">
            Chung cư cao cấp 25 tầng tại trung tâm hành chính mới Hoài Đức, kiến tạo chuẩn sống hiện đại phía Tây Hà Nội
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start mb-20">
          {/* Left - Image */}
          <div className="lg:col-span-2">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img
                src={IMAGES.building}
                alt="Phối cảnh tổng thể chung cư Hà Sơn Tower 25 tầng tại Hoài Đức"
                loading="lazy"
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy/80 to-transparent p-6">
                <p className="text-gold font-serif text-lg font-semibold">Sổ hồng vĩnh viễn</p>
                <p className="text-white/80 text-sm">Pháp lý minh bạch, an tâm đầu tư</p>
              </div>
            </div>
          </div>

          {/* Right - Info Table */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md border border-border overflow-hidden">
              <div className="bg-navy px-6 py-4">
                <h3 className="text-white font-serif text-xl font-semibold">Thông tin dự án</h3>
              </div>
              <div className="divide-y divide-border">
                {[
                  ["Tên dự án", PROJECT.name],
                  ["Chủ đầu tư", PROJECT.developer],
                  ["Đơn vị thi công", PROJECT.contractor],
                  ["Vị trí", PROJECT.location],
                  ["Quy mô", PROJECT.floors],
                  ["Tổng diện tích", PROJECT.totalArea],
                  ["Loại căn hộ", `${PROJECT.bedrooms}, diện tích ${PROJECT.apartmentArea}`],
                  ["Giá bán", PROJECT.pricePerM2],
                  ["Pháp lý", PROJECT.legal],
                ].map(([label, value]) => (
                  <div key={label} className="grid grid-cols-5 gap-4 px-6 py-3.5">
                    <span className="col-span-2 text-muted-foreground text-sm font-medium">{label}</span>
                    <span className="col-span-3 text-navy text-sm font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {HIGHLIGHTS.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-lg p-6 border border-border hover:border-gold/50 hover:shadow-lg transition-all duration-300 group"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-navy/5 group-hover:bg-gold/10 flex items-center justify-center text-navy group-hover:text-gold transition-colors duration-300 mb-4">
                {iconMap[item.icon]}
              </div>
              <h4 className="font-semibold text-navy text-base mb-2">{item.title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
