import { AMENITIES, IMAGES } from "@/lib/constants";
import { useInView } from "@/hooks/useInView";
import { Waves, Dumbbell, Baby, ShoppingBag, ShieldCheck, Car } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "waves": <Waves size={28} />,
  "dumbbell": <Dumbbell size={28} />,
  "baby": <Baby size={28} />,
  "shopping-bag": <ShoppingBag size={28} />,
  "shield-check": <ShieldCheck size={28} />,
  "car": <Car size={28} />,
};

export default function AmenitiesSection() {
  const { ref, isInView } = useInView<HTMLElement>();

  return (
    <section id="amenities" ref={ref} className="py-20 lg:py-28 bg-ivory">
      <div className={`container section-fade-in ${isInView ? "visible" : ""}`}>
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-gold font-medium text-sm uppercase tracking-widest mb-3">Tiện ích đồng bộ</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4">
            Sống Trọn Vẹn Mỗi Ngày
          </h2>
          <div className="gold-divider mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-base lg:text-lg">
            Hệ thống tiện ích nội khu đồng bộ, đáp ứng mọi nhu cầu sinh hoạt, giải trí và nghỉ dưỡng
          </p>
        </div>

        {/* Featured Images */}
        <div className="grid md:grid-cols-2 gap-6 mb-14">
          <div className="relative rounded-lg overflow-hidden shadow-xl group h-64 md:h-80">
            <img
              src={IMAGES.pool}
              alt="Bể bơi tầng thượng Hà Sơn Tower"
              loading="lazy"
              decoding="async"
              width={800}
              height={600}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="text-gold font-serif text-xl font-semibold">Bể bơi bốn mùa</p>
              <p className="text-white/80 text-sm">Tiêu chuẩn resort 5 sao</p>
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden shadow-xl group h-64 md:h-80">
            <img
              src={IMAGES.lobby}
              alt="Sảnh đón sang trọng Hà Sơn Tower"
              loading="lazy"
              decoding="async"
              width={800}
              height={600}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="text-gold font-serif text-xl font-semibold">Sảnh đón đẳng cấp</p>
              <p className="text-white/80 text-sm">Thiết kế sang trọng, ấn tượng</p>
            </div>
          </div>
        </div>

        {/* Amenities Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {AMENITIES.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-lg p-6 border border-border hover:border-gold/50 hover:shadow-lg transition-all duration-300 group flex items-start gap-4"
            >
              <div className="w-14 h-14 rounded-lg bg-navy/5 group-hover:bg-gold/10 flex items-center justify-center text-navy group-hover:text-gold transition-colors duration-300 flex-shrink-0">
                {iconMap[item.icon]}
              </div>
              <div>
                <h4 className="font-semibold text-navy text-base mb-1">{item.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
