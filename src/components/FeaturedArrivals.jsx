import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, Heart, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import { FEATURED_PRODUCTS, BRAND_CONFIG } from '../data/brandData';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedArrivals({ 
  onQuickView, 
  activeFilter = 'All', 
  setActiveFilter,
  wishlist = [],
  onToggleWishlist 
}) {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const categories = ['All', 'Pakistani Suits', 'Festive Wear', 'Everyday Ethnic'];

  const filteredProducts = activeFilter === 'All'
    ? FEATURED_PRODUCTS
    : FEATURED_PRODUCTS.filter(p => p.category === activeFilter);

  // Animate grid cards when filter changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('static')) {
      return;
    }

    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.featured-product-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 18, scale: 0.98 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.55, 
          stagger: 0.06, 
          ease: 'power2.out',
          overwrite: 'auto'
        }
      );
    }
  }, [activeFilter]);

  // Initial scroll-triggered reveal
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('static')) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.featured-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.featured-header',
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        '.wholesale-banner',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.wholesale-banner',
            start: 'top 90%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleHeartClick = (e, productId) => {
    e.stopPropagation();
    const btn = e.currentTarget;
    gsap.timeline()
      .to(btn, { scale: 1.35, duration: 0.15, ease: 'power2.out' })
      .to(btn, { scale: 1, duration: 0.45, ease: 'elastic.out(1, 0.4)' });

    if (onToggleWishlist) onToggleWishlist(productId);
  };

  return (
    <section 
      id="featured" 
      ref={sectionRef} 
      className="py-20 lg:py-28 bg-[#F5EFE6]/50 relative border-b border-[#C5A880]/20"
    >
      
      {/* Header & Category Filters */}
      <div className="featured-header max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 mb-2.5">
            <span className="w-5 h-[1px] bg-[#C5A880]"></span>
            <span className="text-[11px] font-sans-ui uppercase tracking-[0.28em] text-[#4A0E17] font-semibold">
              Curated Lookbook
            </span>
            <span className="w-5 h-[1px] bg-[#C5A880]"></span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-5xl text-[#1C1617] font-normal leading-tight mb-3">
            Featured <span className="italic text-[#4A0E17]">Arrivals</span>
          </h2>

          <p className="font-sans-ui text-xs sm:text-sm text-[#1C1617]/70 font-light leading-relaxed">
            A spotlight on our finest Pakistani salwar suits, hand-embroidered silhouettes, and celebration wear. Available for immediate dispatch across India.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter && setActiveFilter(cat)}
              className={`px-5 py-2.5 text-xs font-sans-ui uppercase tracking-widest transition-all cursor-pointer border relative ${
                activeFilter === cat
                  ? 'bg-[#4A0E17] text-[#FAF7F2] border-[#4A0E17] shadow-sm font-medium'
                  : 'bg-[#FAF7F2] text-[#1C1617]/75 border-[#C5A880]/30 hover:border-[#4A0E17] hover:text-[#4A0E17]'
              }`}
            >
              <span>{cat}</span>
              {activeFilter === cat && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#E5C388]"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          
          {filteredProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id);

            return (
              <div 
                key={product.id}
                className="featured-product-card group bg-[#FAF7F2] border border-[#C5A880]/30 transition-all duration-500 hover:shadow-[0_20px_45px_rgba(74,14,23,0.12)] hover:border-[#4A0E17]/40 flex flex-col justify-between"
              >
                {/* Image Area with Two-Image Hover Reveal */}
                <div 
                  data-cursor="view"
                  className="relative aspect-[3/4] overflow-hidden bg-[#F5EFE6] cursor-pointer"
                  onClick={() => onQuickView && onQuickView(product)}
                >
                  
                  {/* Base Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-0"
                  />

                  {/* Hover Detail Image */}
                  <img
                    src={product.hoverImage}
                    alt={`${product.name} detail`}
                    className="absolute inset-0 w-full h-full object-cover object-top opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-105"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 items-start z-10 transition-transform duration-300 group-hover:translate-x-0.5">
                    <span className="bg-[#4A0E17] text-[#FAF7F2] text-[9.5px] font-sans-ui uppercase tracking-widest px-2.5 py-1 font-semibold shadow-sm">
                      {product.tag}
                    </span>
                    <span className="bg-[#FAF7F2]/90 backdrop-blur-xs text-[#1C1617] text-[9px] font-sans-ui uppercase tracking-widest px-2 py-0.5 border border-[#C5A880]/40">
                      {product.category}
                    </span>
                  </div>

                  {/* Wishlist Button with Heartbeat Feedback */}
                  <button
                    onClick={(e) => handleHeartClick(e, product.id)}
                    className="absolute top-3.5 right-3.5 p-2 bg-[#FAF7F2]/90 backdrop-blur-xs rounded-full text-[#1C1617] hover:text-[#4A0E17] transition-all z-10 shadow-sm cursor-pointer"
                    aria-label="Save to Wishlist"
                  >
                    <Heart className={`w-4 h-4 transition-colors ${isWishlisted ? 'fill-[#4A0E17] text-[#4A0E17]' : 'stroke-[1.8]'}`} />
                  </button>

                  {/* Hover Action Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-center justify-center gap-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickView && onQuickView(product);
                      }}
                      className="px-4 py-2 bg-[#FAF7F2] hover:bg-white text-[#1C1617] text-xs font-sans-ui uppercase tracking-wider font-medium flex items-center gap-1.5 shadow-md transition-all cursor-pointer hover:shadow-lg active:scale-95"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#4A0E17]" />
                      <span>Quick View</span>
                    </button>

                    <a
                      href={`https://wa.me/${BRAND_CONFIG.contact.whatsappNumber}?text=Hi%20Sukam%20Sutra%2C%20I%20am%20inquiring%20about%20the%20${encodeURIComponent(product.name)}%20(${product.category}).`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-4 py-2 bg-[#4A0E17] hover:bg-[#6E1624] text-[#FAF7F2] text-xs font-sans-ui uppercase tracking-wider font-medium flex items-center gap-1.5 shadow-md transition-all hover:shadow-lg active:scale-95"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#E5C388]" />
                      <span>Inquire</span>
                    </a>
                  </div>

                </div>

                {/* Details Section */}
                <div className="p-5 flex flex-col justify-between flex-1">
                  
                  <div>
                    <h3 className="font-editorial text-xl sm:text-2xl text-[#1C1617] font-normal leading-snug mb-1 group-hover:text-[#4A0E17] transition-colors">
                      {product.name}
                    </h3>
                    
                    <p className="font-sans-ui text-xs text-[#C5A880] font-medium tracking-wide mb-2.5">
                      {product.craft}
                    </p>

                    <p className="font-sans-ui text-xs text-[#1C1617]/70 font-light line-clamp-2 leading-relaxed mb-4">
                      {product.description}
                    </p>
                  </div>

                  <div className="border-t border-[#C5A880]/20 pt-3.5 flex items-center justify-between">
                    <div>
                      <span className="block text-[10px] uppercase font-sans-ui tracking-wider text-[#1C1617]/50 font-medium">
                        Pricing / Availability
                      </span>
                      <span className="font-sans-ui text-xs font-semibold text-[#4A0E17] tracking-wide">
                        {product.pricePlaceholder}
                      </span>
                    </div>

                    <button
                      onClick={() => onQuickView && onQuickView(product)}
                      className="text-xs font-sans-ui uppercase tracking-widest text-[#4A0E17] hover:text-[#6E1624] font-medium flex items-center gap-1 transition-colors group/link cursor-pointer"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3 h-3 text-[#C5A880] transition-transform duration-300 group-hover/link:translate-x-1.5" />
                    </button>
                  </div>

                </div>

              </div>
            );
          })}

        </div>

        {/* Wholesale & Custom Stitching Note */}
        <div className="wholesale-banner mt-14 p-6 sm:p-8 bg-[#FAF7F2] border border-[#C5A880]/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm hover:border-[#4A0E17]/40 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#4A0E17]/10 flex items-center justify-center flex-shrink-0 text-[#4A0E17]">
              <Sparkles className="w-6 h-6 text-[#4A0E17]" />
            </div>
            <div>
              <h4 className="font-editorial text-xl sm:text-2xl text-[#1C1617] font-normal leading-tight">
                Wholesale Volume Orders & Custom Tailoring
              </h4>
              <p className="font-sans-ui text-xs sm:text-sm text-[#1C1617]/70 font-light mt-0.5">
                We supply premier boutiques across India with authentic Pakistani designer suits and custom bridal trousseau sets.
              </p>
            </div>
          </div>

          <MagneticButton strength={0.2}>
            <a
              href={`https://wa.me/${BRAND_CONFIG.contact.whatsappNumber}?text=Hi%20Sukam%20Sutra%2C%20I%20am%20interested%20in%20a%20Wholesale%20Catalogue%20for%20my%20boutique.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 px-6 py-3 bg-[#4A0E17] hover:bg-[#6E1624] text-[#FAF7F2] text-xs font-sans-ui uppercase tracking-widest font-medium transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#E5C388]" />
              <span>Inquire Wholesale</span>
            </a>
          </MagneticButton>
        </div>

      </div>

    </section>
  );
}
