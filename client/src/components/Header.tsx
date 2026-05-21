import { useState, useEffect } from "react";
import { NAV_ITEMS, CONTACT, PROJECT } from "@/lib/constants";
import { fbContact } from "@/lib/fbEvents";
import { Phone, Menu, X } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 lg:h-20">
        {/* Logo / Project Name */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gold flex items-center justify-center">
            <span className="text-navy font-serif font-bold text-sm">HS</span>
          </div>
          <span className="font-serif font-semibold text-white text-lg hidden sm:block">
            {PROJECT.name}
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="text-white/80 hover:text-gold text-sm font-medium transition-colors duration-200"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href={`tel:${CONTACT.phone}`}
            onClick={() => fbContact("phone")}
            className="btn-gold px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2"
          >
            <Phone size={14} />
            <span className="hidden sm:inline">{CONTACT.phoneFormatted}</span>
            <span className="sm:hidden">Gọi ngay</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-navy/98 backdrop-blur-md border-t border-white/10">
          <nav className="container py-4 flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-white/80 hover:text-gold text-left py-2 text-base font-medium transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
