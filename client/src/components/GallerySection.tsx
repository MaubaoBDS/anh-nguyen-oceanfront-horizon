import { useState, useEffect } from "react";
import { GALLERY } from "@/lib/constants";
import { useInView } from "@/hooks/useInView";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function GallerySection() {
  const { ref, isInView } = useInView<HTMLElement>();
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
      if (event.key === "ArrowRight" && lightbox !== null) {
        setLightbox((lightbox + 1) % GALLERY.length);
      }
      if (event.key === "ArrowLeft" && lightbox !== null) {
        setLightbox((lightbox - 1 + GALLERY.length) % GALLERY.length);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox]);

  return (
    <section id="gallery" ref={ref} className="py-20 lg:py-28 bg-ivory">
      <div className={`container section-fade-in ${isInView ? "visible" : ""}`}>
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-gold font-medium text-sm uppercase tracking-widest mb-3">Thư viện hình ảnh</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4">
            Hình Ảnh Dự Án
          </h2>
          <div className="gold-divider mx-auto mb-6" />
        </div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GALLERY.map((item, i) => (
            <button
              key={i}
              onClick={() => setLightbox(i)}
              className="relative rounded-lg overflow-hidden shadow-md group aspect-[4/3]"
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/30 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium">
                  Xem ảnh
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2 z-10"
            aria-label="Đóng"
          >
            <X size={28} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox - 1 + GALLERY.length) % GALLERY.length);
            }}
            className="absolute left-4 text-white/70 hover:text-white p-2 z-10"
            aria-label="Ảnh trước"
          >
            <ChevronLeft size={32} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox + 1) % GALLERY.length);
            }}
            className="absolute right-4 text-white/70 hover:text-white p-2 z-10"
            aria-label="Ảnh sau"
          >
            <ChevronRight size={32} />
          </button>

          <img
            src={GALLERY[lightbox].src}
            alt={GALLERY[lightbox].alt}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            {GALLERY[lightbox].alt} ({lightbox + 1}/{GALLERY.length})
          </p>
        </div>
      )}
    </section>
  );
}
