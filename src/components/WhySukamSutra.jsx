import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Building2, Truck, MessageCircle, ArrowRight } from 'lucide-react';
import { WHY_SUKAM_SUTRA, BRAND_CONFIG } from '../data/brandData';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function WhySukamSutra() {
  const sectionRef = useRef(null);
  const iconMap = {
    Sparkles: Sparkles,
    Building2: Building2,
    Truck: Truck,
    MessageCircle: MessageCircle,
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('static')) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.why-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.why-header',
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        '.why-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.why-grid',
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.why-banner',
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.why-banner',
            start: 'top 90%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="why-us" 
      ref={sectionRef}
      className="py-20 lg:py-28 bg-[#F5EFE6]/70 relative border-b border-[#C5A880]/20"
    >
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="why-header text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-2.5">
            <span className="w-5 h-[1px] bg-[#C5A880]"></span>
            <span className="text-[11px] font-sans-ui uppercase tracking-[0.28em] text-[#4A0E17] font-semibold">
              The Sukam Sutra Promise
            </span>
            <span className="w-5 h-[1px] bg-[#C5A880]"></span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-5xl text-[#1C1617] font-normal leading-tight mb-3">
            Why <span className="italic text-[#4A0E17]">Sukam Sutra</span>
          </h2>

          <p className="font-sans-ui text-xs sm:text-sm text-[#1C1617]/70 font-light leading-relaxed">
            Distinguished by an unwavering commitment to authentic craftsmanship, personalized styling, and dependable pan-India fulfillment.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="why-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {WHY_SUKAM_SUTRA.map((pillar) => {
            const IconComponent = iconMap[pillar.icon] || Sparkles;

            return (
              <div
                key={pillar.number}
                className="why-card group bg-[#FAF7F2] border border-[#C5A880]/30 p-7 sm:p-8 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(74,14,23,0.1)] hover:border-[#4A0E17]/40 relative will-change-transform"
              >
                {/* Top Number & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-editorial text-3xl sm:text-4xl text-[#C5A880] group-hover:text-[#4A0E17] font-light transition-colors duration-300">
                      {pillar.number}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#4A0E17]/6 flex items-center justify-center text-[#4A0E17] group-hover:bg-[#4A0E17] group-hover:text-[#FAF7F2] group-hover:scale-110 transition-all duration-300">
                      <IconComponent className="w-4 h-4 stroke-[1.8]" />
                    </div>
                  </div>

                  <span className="block text-[10px] uppercase font-sans-ui tracking-widest text-[#4A0E17] font-semibold mb-1">
                    {pillar.subtitle}
                  </span>

                  <h3 className="font-editorial text-xl sm:text-2xl text-[#1C1617] font-normal leading-snug mb-3 group-hover:text-[#4A0E17] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="font-sans-ui text-xs sm:text-[13px] text-[#1C1617]/70 font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                {/* Bottom line accent */}
                <div className="mt-6 pt-4 border-t border-[#C5A880]/20 flex items-center justify-between text-[11px] font-sans-ui uppercase tracking-widest text-[#C5A880] group-hover:text-[#4A0E17] transition-colors">
                  <span>Guaranteed Standards</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] group-hover:bg-[#4A0E17] transition-colors"></span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Concierge Banner */}
        <div className="why-banner mt-14 p-6 sm:p-8 bg-[#4A0E17] text-[#FAF7F2] border border-[#C5A880]/50 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#6E1624]/40 rounded-full blur-2xl pointer-events-none"></div>

          <div className="text-center sm:text-left relative z-10">
            <span className="text-[11px] font-sans-ui uppercase tracking-[0.2em] text-[#E5C388] font-semibold block mb-1">
              Have Specific Fabric or Sizing Questions?
            </span>
            <p className="font-editorial text-xl sm:text-2xl font-normal italic">
              Speak directly with our senior styling team in Jammu.
            </p>
          </div>

          <MagneticButton strength={0.2} className="relative z-10 flex-shrink-0">
            <a
              href={`https://wa.me/${BRAND_CONFIG.contact.whatsappNumber}?text=Hi%20Sukam%20Sutra%2C%20I%20would%20like%20to%20consult%20with%20a%20stylist.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#FAF7F2] hover:bg-white text-[#4A0E17] text-xs font-sans-ui uppercase tracking-widest font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#4A0E17]" />
              <span>Connect on WhatsApp</span>
            </a>
          </MagneticButton>
        </div>

      </div>

    </section>
  );
}
