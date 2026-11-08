import React from 'react';
import { MapPin, Phone, Mail, MessageCircle, ArrowRight, Truck, Store } from 'lucide-react';
import InstagramIcon from './icons/InstagramIcon';
import { BRAND_CONFIG, COLLECTIONS } from '../data/brandData';

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#2E060D] text-[#FAF7F2] pt-16 sm:pt-20 pb-12 border-t-2 border-[#C5A880]/40">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-[#C5A880]/20">
          
          {/* Brand Manifesto & Address (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-6">
            
            <a href="#home" className="flex flex-col items-start mb-4">
              <span className="font-editorial text-3xl sm:text-4xl tracking-[0.2em] text-[#FAF7F2] uppercase leading-none font-normal">
                {BRAND_CONFIG.name}
              </span>
              <span className="font-sans-ui text-[10px] tracking-[0.34em] text-[#E5C388] uppercase mt-1">
                Jammu • Haute Ethnic
              </span>
            </a>

            <p className="font-sans-ui text-xs sm:text-sm text-[#FAF7F2]/75 font-light leading-relaxed max-w-sm mb-6">
              A boutique Indian fashion maison crafting and curating authentic Pakistani suits, designer ethnic wear, and festive heirlooms. Available for retail connoisseurs and wholesale partners with pan-India delivery.
            </p>

            {/* Jammu Flagship Micro Card */}
            <div className="bg-[#4A0E17]/60 border border-[#C5A880]/30 p-4 w-full max-w-md mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#E5C388] flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="block font-semibold text-[#E5C388] uppercase tracking-wider text-[10px]">
                    Flagship Boutique
                  </span>
                  <p className="text-[#FAF7F2]/90 font-light mt-0.5 leading-relaxed">
                    {BRAND_CONFIG.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Link */}
            <a
              href={BRAND_CONFIG.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-sans-ui text-[#E5C388] hover:text-white transition-colors uppercase tracking-wider font-semibold"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Follow {BRAND_CONFIG.instagram.handle}</span>
            </a>

          </div>

          {/* Quick Navigation Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-editorial text-lg text-[#E5C388] uppercase tracking-wider mb-4 font-normal">
              Explore
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs font-sans-ui font-light text-[#FAF7F2]/80">
              <li>
                <a href="#home" className="hover:text-[#E5C388] transition-colors">Home</a>
              </li>
              <li>
                <a href="#collections" className="hover:text-[#E5C388] transition-colors">All Collections</a>
              </li>
              <li>
                <a href="#featured" className="hover:text-[#E5C388] transition-colors">Featured Arrivals</a>
              </li>
              <li>
                <a href="#story" className="hover:text-[#E5C388] transition-colors">Brand Story</a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-[#E5C388] transition-colors">Why Sukam Sutra</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#E5C388] transition-colors">Instagram Gallery</a>
              </li>
              <li>
                <a href="#store" className="hover:text-[#E5C388] transition-colors">Visit Jammu Store</a>
              </li>
            </ul>
          </div>

          {/* Specialities & Collections (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-editorial text-lg text-[#E5C388] uppercase tracking-wider mb-4 font-normal">
              Specialities
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs font-sans-ui font-light text-[#FAF7F2]/80">
              {COLLECTIONS.map((c) => (
                <li key={c.id}>
                  <a href={`#${c.id}`} className="hover:text-[#E5C388] transition-colors">
                    {c.title}
                  </a>
                </li>
              ))}
              <li className="pt-2 border-t border-[#C5A880]/15">
                <a href="#store" className="text-[#E5C388] hover:underline font-medium">
                  Wholesale Inquiries
                </a>
              </li>
              <li>
                <a href="#store" className="text-[#E5C388] hover:underline font-medium">
                  Custom Stitching
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Inquiries (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-editorial text-lg text-[#E5C388] uppercase tracking-wider mb-4 font-normal">
              Direct Inquiries
            </h4>
            
            <div className="flex flex-col gap-3.5 text-xs font-sans-ui text-[#FAF7F2]/80 font-light mb-6">
              <div className="flex items-start gap-2.5">
                <Store className="w-4 h-4 text-[#E5C388] flex-shrink-0 mt-0.5" />
                <span>Gandhi Nagar, Jammu, J&K</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#E5C388] flex-shrink-0 mt-0.5" />
                <span>{BRAND_CONFIG.contact.phoneDisplay}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-[#E5C388] flex-shrink-0 mt-0.5" />
                <span>Pan-India Doorstep Delivery</span>
              </div>
            </div>

            {/* Direct WhatsApp CTA Button */}
            <a
              href={`https://wa.me/${BRAND_CONFIG.contact.whatsappNumber}?text=Hi%20Sukam%20Sutra%2C%20I%20am%20inquiring%20via%20your%20website%20footer.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#E5C388] hover:bg-[#FAF7F2] text-[#2E060D] py-3 text-center text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4 text-[#2E060D]" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>

        </div>

        {/* Bottom Micro Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans-ui text-[#FAF7F2]/60 font-light">
          <div>
            © {new Date().getFullYear()} {BRAND_CONFIG.name}. Gandhi Nagar, Jammu. All rights reserved.
          </div>

          <div className="flex items-center gap-6 text-[11px] uppercase tracking-widest">
            <span>Pakistani Suits</span>
            <span className="opacity-40">•</span>
            <span>Retail & Wholesale</span>
            <span className="opacity-40">•</span>
            <span>Pan-India Shipping</span>
          </div>
        </div>

      </div>

    </footer>
  );
}
