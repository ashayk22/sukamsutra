import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { BRAND_CONFIG } from '../data/brandData';
import MagneticButton from './MagneticButton';

export default function WhatsAppFloat() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-auto">
      
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="relative mb-2.5 mr-1 bg-[#FAF7F2] text-[#1C1617] border border-[#C5A880]/60 shadow-xl p-3 rounded-md text-xs font-sans-ui max-w-[220px] transition-all duration-300">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-1 right-1 text-[#1C1617]/50 hover:text-[#4A0E17] p-0.5 cursor-pointer"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3 h-3" />
          </button>
          
          <span className="block font-semibold text-[#4A0E17] uppercase tracking-wider text-[10px] mb-0.5">
            Sukam Sutra Concierge
          </span>
          <p className="text-[11px] text-[#1C1617]/80 leading-snug">
            Need sizing advice or wholesale catalogue? Chat directly with us!
          </p>
        </div>
      )}

      {/* Main floating button with Magnetic feedback */}
      <MagneticButton strength={0.35}>
        <a
          href={`https://wa.me/${BRAND_CONFIG.contact.whatsappNumber}?text=Hi%20Sukam%20Sutra%2C%20I%20am%20chatting%20via%20your%20website%20concierge.`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Sukam Sutra on WhatsApp"
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#4A0E17] hover:bg-[#6E1624] text-[#FAF7F2] border-2 border-[#C5A880] shadow-[0_8px_30px_rgba(74,14,23,0.35)] hover:shadow-[0_12px_40px_rgba(74,14,23,0.5)] transition-all duration-300 hover:scale-105"
        >
          <MessageCircle className="w-6 h-6 text-[#E5C388] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
          
          {/* Subtle pulse ring */}
          <span className="absolute -inset-1 rounded-full border border-[#C5A880]/40 animate-ping pointer-events-none"></span>
        </a>
      </MagneticButton>

    </div>
  );
}
