import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Navigation, Clock, Phone, MessageCircle, Store, ExternalLink } from 'lucide-react';
import { BRAND_CONFIG } from '../data/brandData';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function StoreLocator() {
  const sectionRef = useRef(null);
  const storeImgRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('static')) {
      return;
    }
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.store-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.store-header',
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        storeImgRef.current,
        { clipPath: isReducedMotion ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)', opacity: 0 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 1.25,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: storeImgRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.store-info-pane',
        { opacity: 0, x: 25 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.store-info-pane',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="store" 
      ref={sectionRef}
      className="py-20 lg:py-28 bg-[#F5EFE6]/60 relative border-b border-[#C5A880]/20"
    >
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="store-header text-center max-w-2xl mx-auto mb-14 lg:mb-16">
          <div className="flex items-center justify-center gap-2 mb-2.5">
            <Store className="w-4 h-4 text-[#C5A880]" />
            <span className="text-[11px] font-sans-ui uppercase tracking-[0.28em] text-[#4A0E17] font-semibold">
              Flagship Destination
            </span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-5xl text-[#1C1617] font-normal leading-tight mb-3">
            Visit Our <span className="italic text-[#4A0E17]">Jammu Store</span>
          </h2>

          <p className="font-sans-ui text-xs sm:text-sm text-[#1C1617]/70 font-light leading-relaxed">
            Experience our handpicked collections in person. Located in the heart of Gandhi Nagar, our boutique offers private styling consultations for retail shoppers and wholesale partners.
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-[#FAF7F2] border border-[#C5A880]/40 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Store Visual & Badges (5 cols) */}
          <div 
            ref={storeImgRef}
            data-cursor="boutique"
            className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto min-h-[320px] bg-[#F5EFE6] overflow-hidden cursor-pointer will-change-transform"
          >
            <img
              src="/images/store/store_jammu.jpg"
              alt="SUKAM SUTRA Gandhi Nagar Jammu Store"
              className="w-full h-full object-cover object-center filter brightness-[0.97] transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"></div>

            <div className="absolute bottom-6 left-6 right-6 text-[#FAF7F2]">
              <span className="text-[10px] font-sans-ui uppercase tracking-widest text-[#E5C388] font-semibold block mb-1">
                Gandhi Nagar Boutique
              </span>
              <p className="font-editorial text-2xl font-normal italic leading-snug">
                Step inside SUKAM SUTRA
              </p>
              <p className="text-xs text-[#FAF7F2]/80 font-sans-ui font-light mt-1">
                Personalized fittings & fabric consultations available daily.
              </p>
            </div>
          </div>

          {/* Right Column: Location, Hours, Directions & Inquiries (7 cols) */}
          <div className="store-info-pane lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
            
            <div>
              {/* Address Card */}
              <div className="flex items-start gap-4 mb-7 pb-6 border-b border-[#C5A880]/30">
                <div className="w-10 h-10 rounded-full bg-[#4A0E17]/8 flex items-center justify-center text-[#4A0E17] flex-shrink-0 mt-1">
                  <MapPin className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div>
                  <span className="block text-[11px] font-sans-ui uppercase tracking-widest text-[#C5A880] font-semibold mb-1">
                    Store Address
                  </span>
                  <h3 className="font-editorial text-2xl text-[#1C1617] font-normal leading-snug">
                    {BRAND_CONFIG.name}
                  </h3>
                  <p className="font-sans-ui text-sm text-[#1C1617]/80 font-light mt-1 leading-relaxed">
                    {BRAND_CONFIG.address}
                  </p>
                  <p className="font-sans-ui text-xs text-[#4A0E17] font-medium mt-1">
                    Landmark: {BRAND_CONFIG.landmark}
                  </p>
                </div>
              </div>

              {/* Hours & Contact Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {/* Store Hours */}
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#4A0E17] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[11px] font-sans-ui uppercase tracking-wider text-[#1C1617]/50 font-medium">
                      Store Hours
                    </span>
                    <p className="font-sans-ui text-xs text-[#1C1617]/85 font-normal mt-0.5 leading-relaxed">
                      Mon – Sat: 11:00 AM – 8:30 PM<br />
                      Sunday: By Appointment
                    </p>
                  </div>
                </div>

                {/* Direct Contact */}
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#4A0E17] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[11px] font-sans-ui uppercase tracking-wider text-[#1C1617]/50 font-medium">
                      Store Concierge
                    </span>
                    <p className="font-sans-ui text-xs text-[#1C1617]/85 font-normal mt-0.5 leading-relaxed">
                      Phone: {BRAND_CONFIG.contact.phoneDisplay}<br />
                      WhatsApp: Instant Inquiries
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 border-t border-[#C5A880]/30 pt-6">
              
              {/* Google Maps Directions */}
              <MagneticButton strength={0.2} className="w-full sm:w-auto">
                <a
                  href={BRAND_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#4A0E17] hover:bg-[#6E1624] text-[#FAF7F2] px-6 py-3 text-xs font-sans-ui uppercase tracking-widest font-semibold transition-all shadow-md hover:shadow-lg group w-full sm:w-auto"
                >
                  <Navigation className="w-4 h-4 text-[#E5C388] transition-transform duration-300 group-hover:rotate-45" />
                  <span>Get Directions (Google Maps)</span>
                </a>
              </MagneticButton>

              {/* WhatsApp Appointment */}
              <MagneticButton strength={0.16} className="w-full sm:w-auto">
                <a
                  href={`https://wa.me/${BRAND_CONFIG.contact.whatsappNumber}?text=Hi%20Sukam%20Sutra%2C%20I%20would%20like%20to%20plan%20a%20visit%20to%20your%20Gandhi%20Nagar%20store%20in%20Jammu.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-[#C5A880] hover:bg-[#4A0E17]/6 text-[#1C1617] px-6 py-3 text-xs font-sans-ui uppercase tracking-widest font-medium transition-all w-full sm:w-auto"
                >
                  <MessageCircle className="w-4 h-4 text-[#4A0E17]" />
                  <span>Book Store Visit</span>
                </a>
              </MagneticButton>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
