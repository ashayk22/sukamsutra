import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { COLLECTIONS, BRAND_CONFIG } from '../data/brandData';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function CollectionsSection({ onSelectCollection }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('static')) {
      return;
    }
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // 1. Header reveal
      gsap.fromTo(
        '.coll-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.coll-header',
            start: 'top 85%',
          },
        }
      );

      // 2. Collection Cards entrance with stagger
      gsap.fromTo(
        '.coll-card',
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 1.05,
          stagger: 0.16,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.coll-grid',
            start: 'top 80%',
          },
        }
      );

      // 3. Subtle Parallax on collection images
      if (!isReducedMotion) {
        gsap.utils.toArray('.coll-parallax-img').forEach((img) => {
          gsap.fromTo(
            img,
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: 'none',
              scrollTrigger: {
                trigger: img.closest('.coll-card'),
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="collections" 
      ref={sectionRef} 
      className="py-20 lg:py-28 bg-[#FAF7F2] relative border-b border-[#C5A880]/20"
    >
      
      {/* Section Header */}
      <div className="coll-header max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 lg:mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#C5A880]/30 pb-8">
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-[1px] bg-[#C5A880]"></span>
              <span className="text-[11px] font-sans-ui uppercase tracking-[0.26em] text-[#4A0E17] font-semibold">
                Curated Categories
              </span>
            </div>
            
            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-[#1C1617] font-normal leading-tight">
              Shop The <span className="italic text-[#4A0E17]">Collections</span>
            </h2>
          </div>

          <p className="font-sans-ui text-sm text-[#1C1617]/70 font-light max-w-md leading-relaxed">
            From signature Pakistani lawn suits to majestic festive velvets, each edit is thoughtfully curated for graceful statement dressing.
          </p>

        </div>
      </div>

      {/* Editorial Asymmetric Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="coll-grid grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Card 1: Pakistani Suits (Primary Hero Feature - 7 cols) */}
          <div 
            id="pakistani-suits"
            data-cursor="view"
            className="coll-card md:col-span-7 group relative overflow-hidden bg-[#F5EFE6] border border-[#C5A880]/40 transition-all duration-500 hover:shadow-[0_20px_45px_rgba(74,14,23,0.14)] hover:border-[#4A0E17]/40 flex flex-col"
          >
            <div className="relative flex-1 min-h-[360px] sm:min-h-[440px] overflow-hidden">
              <img
                src={COLLECTIONS[0].image}
                alt={COLLECTIONS[0].title}
                className="coll-parallax-img w-full h-[115%] object-cover object-center filter brightness-[0.96] transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-500 group-hover:from-black/90"></div>
              
              {/* Badge */}
              <div className="absolute top-4 left-4 bg-[#FAF7F2]/90 backdrop-blur-sm border border-[#C5A880]/40 px-3 py-1 transition-transform duration-300 group-hover:translate-x-1">
                <span className="text-[10px] uppercase tracking-[0.2em] font-sans-ui font-semibold text-[#4A0E17]">
                  {COLLECTIONS[0].tag}
                </span>
              </div>

              {/* Items Count */}
              <div className="absolute top-4 right-4 text-xs font-sans-ui tracking-wider text-[#FAF7F2]/90">
                {COLLECTIONS[0].itemsCount}
              </div>

              {/* Overlay Content */}
              <div className="absolute bottom-6 left-6 right-6 text-[#FAF7F2] transition-transform duration-500 group-hover:-translate-y-1">
                <h3 className="font-editorial text-3xl sm:text-4xl text-[#FAF7F2] font-normal italic mb-1.5 leading-tight transition-colors duration-300 group-hover:text-[#E5C388]">
                  {COLLECTIONS[0].title}
                </h3>
                <p className="font-sans-ui text-xs sm:text-sm text-[#FAF7F2]/85 font-light max-w-lg mb-3">
                  {COLLECTIONS[0].subtitle}
                </p>
                <a
                  href={`https://wa.me/${BRAND_CONFIG.contact.whatsappNumber}?text=Hi%20Sukam%20Sutra%2C%20I%20would%20like%20to%20see%20the%20Pakistani%20Suits%20catalog.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-sans-ui uppercase tracking-widest text-[#E5C388] hover:text-white transition-colors group/btn"
                >
                  <span>Request Full Catalog</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                </a>
              </div>
            </div>

            {/* Bottom details card */}
            <div className="p-5 sm:p-6 bg-[#FAF7F2] border-t border-[#C5A880]/30 flex items-center justify-between gap-4">
              <p className="font-sans-ui text-xs text-[#1C1617]/70 font-light pr-2">
                {COLLECTIONS[0].description}
              </p>
              <MagneticButton strength={0.2} className="flex-shrink-0">
                <a
                  href="#featured"
                  onClick={() => onSelectCollection && onSelectCollection('Pakistani Suits')}
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#4A0E17] hover:bg-[#6E1624] text-[#FAF7F2] text-[11px] font-sans-ui uppercase tracking-[0.16em] font-medium transition-all shadow-sm hover:shadow whitespace-nowrap group/btn"
                >
                  <span>View Items</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#E5C388] transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
              </MagneticButton>
            </div>
          </div>

          {/* Card 2: Festive Wear (5 cols) */}
          <div 
            id="festive-wear"
            data-cursor="view"
            className="coll-card md:col-span-5 group relative overflow-hidden bg-[#F5EFE6] border border-[#C5A880]/40 transition-all duration-500 hover:shadow-[0_20px_45px_rgba(74,14,23,0.14)] hover:border-[#4A0E17]/40 flex flex-col"
          >
            <div className="relative flex-1 min-h-[360px] sm:min-h-[440px] overflow-hidden">
              <img
                src={COLLECTIONS[1].image}
                alt={COLLECTIONS[1].title}
                className="coll-parallax-img w-full h-[115%] object-cover object-center filter brightness-[0.96] transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-500 group-hover:from-black/90"></div>

              {/* Badge */}
              <div className="absolute top-4 left-4 bg-[#FAF7F2]/90 backdrop-blur-sm border border-[#C5A880]/40 px-3 py-1 transition-transform duration-300 group-hover:translate-x-1">
                <span className="text-[10px] uppercase tracking-[0.2em] font-sans-ui font-semibold text-[#4A0E17]">
                  {COLLECTIONS[1].tag}
                </span>
              </div>

              {/* Overlay Content */}
              <div className="absolute bottom-6 left-6 right-6 text-[#FAF7F2] transition-transform duration-500 group-hover:-translate-y-1">
                <span className="text-[11px] font-sans-ui text-[#E5C388] uppercase tracking-widest block mb-1">
                  {COLLECTIONS[1].itemsCount}
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl text-[#FAF7F2] font-normal italic mb-1.5 leading-tight transition-colors duration-300 group-hover:text-[#E5C388]">
                  {COLLECTIONS[1].title}
                </h3>
                <p className="font-sans-ui text-xs text-[#FAF7F2]/80 font-light mb-3 line-clamp-2">
                  {COLLECTIONS[1].subtitle}
                </p>
                <a
                  href="#featured"
                  onClick={() => onSelectCollection && onSelectCollection('Festive Wear')}
                  className="inline-flex items-center gap-1.5 text-xs font-sans-ui uppercase tracking-widest text-[#E5C388] hover:text-white transition-colors group/btn"
                >
                  <span>Explore Festive Edit</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                </a>
              </div>
            </div>

            <div className="p-5 sm:p-6 bg-[#FAF7F2] border-t border-[#C5A880]/30 flex items-center justify-between gap-4">
              <p className="font-sans-ui text-xs text-[#1C1617]/70 font-light pr-2">
                {COLLECTIONS[1].description}
              </p>
              <MagneticButton strength={0.2} className="flex-shrink-0">
                <a
                  href="#featured"
                  onClick={() => onSelectCollection && onSelectCollection('Festive Wear')}
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#4A0E17] hover:bg-[#6E1624] text-[#FAF7F2] text-[11px] font-sans-ui uppercase tracking-[0.16em] font-medium transition-all shadow-sm hover:shadow whitespace-nowrap group/btn"
                >
                  <span>View Items</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#E5C388] transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
              </MagneticButton>
            </div>
          </div>

          {/* Card 3: Everyday Ethnic (5 cols) */}
          <div 
            id="everyday-ethnic"
            data-cursor="view"
            className="coll-card md:col-span-5 group relative overflow-hidden bg-[#F5EFE6] border border-[#C5A880]/40 transition-all duration-500 hover:shadow-[0_20px_45px_rgba(74,14,23,0.14)] hover:border-[#4A0E17]/40 flex flex-col"
          >
            <div className="relative flex-1 min-h-[360px] sm:min-h-[440px] overflow-hidden">
              <img
                src={COLLECTIONS[2].image}
                alt={COLLECTIONS[2].title}
                className="coll-parallax-img w-full h-[115%] object-cover object-center filter brightness-[0.96] transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-500 group-hover:from-black/90"></div>

              {/* Badge */}
              <div className="absolute top-4 left-4 bg-[#FAF7F2]/90 backdrop-blur-sm border border-[#C5A880]/40 px-3 py-1 transition-transform duration-300 group-hover:translate-x-1">
                <span className="text-[10px] uppercase tracking-[0.2em] font-sans-ui font-semibold text-[#4A0E17]">
                  {COLLECTIONS[2].tag}
                </span>
              </div>

              {/* Overlay Content */}
              <div className="absolute bottom-6 left-6 right-6 text-[#FAF7F2] transition-transform duration-500 group-hover:-translate-y-1">
                <span className="text-[11px] font-sans-ui text-[#E5C388] uppercase tracking-widest block mb-1">
                  {COLLECTIONS[2].itemsCount}
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl text-[#FAF7F2] font-normal italic mb-1.5 leading-tight transition-colors duration-300 group-hover:text-[#E5C388]">
                  {COLLECTIONS[2].title}
                </h3>
                <p className="font-sans-ui text-xs text-[#FAF7F2]/80 font-light mb-3 line-clamp-2">
                  {COLLECTIONS[2].subtitle}
                </p>
                <a
                  href="#featured"
                  onClick={() => onSelectCollection && onSelectCollection('Everyday Ethnic')}
                  className="inline-flex items-center gap-1.5 text-xs font-sans-ui uppercase tracking-widest text-[#E5C388] hover:text-white transition-colors group/btn"
                >
                  <span>Explore Daily Edit</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                </a>
              </div>
            </div>

            <div className="p-5 sm:p-6 bg-[#FAF7F2] border-t border-[#C5A880]/30 flex items-center justify-between gap-4">
              <p className="font-sans-ui text-xs text-[#1C1617]/70 font-light pr-2">
                {COLLECTIONS[2].description}
              </p>
              <MagneticButton strength={0.2} className="flex-shrink-0">
                <a
                  href="#featured"
                  onClick={() => onSelectCollection && onSelectCollection('Everyday Ethnic')}
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#4A0E17] hover:bg-[#6E1624] text-[#FAF7F2] text-[11px] font-sans-ui uppercase tracking-[0.16em] font-medium transition-all shadow-sm hover:shadow whitespace-nowrap group/btn"
                >
                  <span>View Items</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#E5C388] transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
              </MagneticButton>
            </div>
          </div>

          {/* Card 4: New Arrivals (7 cols) */}
          <div 
            id="new-arrivals"
            data-cursor="view"
            className="coll-card md:col-span-7 group relative overflow-hidden bg-[#F5EFE6] border border-[#C5A880]/40 transition-all duration-500 hover:shadow-[0_20px_45px_rgba(74,14,23,0.14)] hover:border-[#4A0E17]/40 flex flex-col"
          >
            <div className="relative flex-1 min-h-[360px] sm:min-h-[440px] overflow-hidden">
              <img
                src={COLLECTIONS[3].image}
                alt={COLLECTIONS[3].title}
                className="coll-parallax-img w-full h-[115%] object-cover object-center filter brightness-[0.96] transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-500 group-hover:from-black/90"></div>

              {/* Badge */}
              <div className="absolute top-4 left-4 bg-[#FAF7F2]/90 backdrop-blur-sm border border-[#C5A880]/40 px-3 py-1 transition-transform duration-300 group-hover:translate-x-1">
                <span className="text-[10px] uppercase tracking-[0.2em] font-sans-ui font-semibold text-[#4A0E17]">
                  {COLLECTIONS[3].tag}
                </span>
              </div>

              {/* Overlay Content */}
              <div className="absolute bottom-6 left-6 right-6 text-[#FAF7F2] transition-transform duration-500 group-hover:-translate-y-1">
                <span className="text-[11px] font-sans-ui text-[#E5C388] uppercase tracking-widest block mb-1">
                  Updated Weekly • {COLLECTIONS[3].itemsCount}
                </span>
                <h3 className="font-editorial text-3xl sm:text-4xl text-[#FAF7F2] font-normal italic mb-1.5 leading-tight transition-colors duration-300 group-hover:text-[#E5C388]">
                  {COLLECTIONS[3].title}
                </h3>
                <p className="font-sans-ui text-xs sm:text-sm text-[#FAF7F2]/85 font-light max-w-lg mb-3">
                  {COLLECTIONS[3].subtitle}
                </p>
                <a
                  href="#featured"
                  onClick={() => onSelectCollection && onSelectCollection('All')}
                  className="inline-flex items-center gap-2 text-xs font-sans-ui uppercase tracking-widest text-[#E5C388] hover:text-white transition-colors group/btn"
                >
                  <span>Discover Latest Runway</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                </a>
              </div>
            </div>

            <div className="p-5 sm:p-6 bg-[#FAF7F2] border-t border-[#C5A880]/30 flex items-center justify-between gap-4">
              <p className="font-sans-ui text-xs text-[#1C1617]/70 font-light pr-2">
                {COLLECTIONS[3].description}
              </p>
              <MagneticButton strength={0.2} className="flex-shrink-0">
                <a
                  href="#featured"
                  onClick={() => onSelectCollection && onSelectCollection('All')}
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#4A0E17] hover:bg-[#6E1624] text-[#FAF7F2] text-[11px] font-sans-ui uppercase tracking-[0.16em] font-medium transition-all shadow-sm hover:shadow whitespace-nowrap group/btn"
                >
                  <span>View Items</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#E5C388] transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
              </MagneticButton>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
