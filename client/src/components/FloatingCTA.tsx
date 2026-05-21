import { CONTACT } from "@/lib/constants";
import { Phone, MessageCircle } from "lucide-react";

export default function FloatingCTA() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Zalo */}
      <a
        href={CONTACT.zalo}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
        aria-label="Chat Zalo"
      >
        <MessageCircle size={24} />
      </a>

      {/* Phone */}
      <a
        href={`tel:${CONTACT.phone}`}
        className="w-14 h-14 rounded-full bg-gold hover:bg-gold-dark text-navy flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1 relative"
        aria-label="Gọi ngay"
      >
        <Phone size={24} />
        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-gold/40 animate-ping" />
      </a>
    </div>
  );
}
