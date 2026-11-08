import React, { useState } from 'react';
import { Truck, Store, MessageCircle, X } from 'lucide-react';
import { BRAND_CONFIG } from '../data/brandData';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#4A0E17] text-[#FAF7F2] text-[11px] sm:text-xs font-sans-ui tracking-[0.06em] py-2 px-4 relative border-b border-[#C5A880]/30 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left item */}
        <div className="hidden md:flex items-center gap-2 text-[#E5C388]">
          <Truck className="w-3.5 h-3.5 stroke-[1.8]" />
          <span>Pan-India Express Shipping Available</span>
        </div>

        {/* Center item */}
        <div className="flex-1 text-center font-medium">
          <span className="text-[#E5C388] font-semibold mr-1.5 uppercase tracking-wider">Gandhi Nagar Flagship:</span>
          <span>Near Laxmi Narayan Mandir, Jammu</span>
          <span className="mx-2 opacity-50 hidden sm:inline">•</span>
          <span className="hidden sm:inline text-[#E5C388]/90">Retail & Wholesale Inquiries Welcome</span>
        </div>

        {/* Right item */}
        <div className="flex items-center gap-4">
          <a
            href={`https://wa.me/${BRAND_CONFIG.contact.whatsappNumber}?text=Hi%20Sukam%20Sutra%2C%20I%20would%20like%20to%20inquire%20about%20your%20collections.`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 text-[#E5C388] hover:text-white transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 stroke-[1.8]" />
            <span>WhatsApp Concierge</span>
          </a>

          <button
            onClick={() => setIsVisible(false)}
            aria-label="Close Announcement"
            className="text-[#FAF7F2]/60 hover:text-white transition-colors p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}

