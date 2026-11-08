import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { X, MessageCircle, Truck, ShieldCheck, Heart, Sparkles, Check } from 'lucide-react';
import { BRAND_CONFIG } from '../data/brandData';
import MagneticButton from './MagneticButton';

export default function ProductModal({ product, onClose, isWishlisted, onToggleWishlist }) {
  const [activeImage, setActiveImage] = useState(0);
  const modalBoxRef = useRef(null);
  const backdropRef = useRef(null);
  const activeImgRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    // Entrance animation
    if (backdropRef.current && modalBoxRef.current) {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: 'power2.out' }
      );
      gsap.fromTo(
        modalBoxRef.current,
        { opacity: 0, scale: 0.94, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'power3.out' }
      );
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  // Thumbnail transition
  const handleSelectImage = (idx) => {
    if (idx === activeImage) return;
    if (activeImgRef.current) {
      gsap.fromTo(
        activeImgRef.current,
        { opacity: 0.6, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' }
      );
    }
    setActiveImage(idx);
  };

  if (!product) return null;

  const images = [product.image, product.hoverImage].filter(Boolean);

  const whatsappInquiryUrl = `https://wa.me/${BRAND_CONFIG.contact.whatsappNumber}?text=Hi%20Sukam%20Sutra%20Team%2C%20I%20would%20like%20to%20inquire%20about%20the%20${encodeURIComponent(product.name)}%20(SKU%3A%20${product.id}).%20Please%20share%20price%2C%20sizing%2C%20and%20availability%20details.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
      
      {/* Backdrop */}
      <div 
        ref={backdropRef}
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity cursor-pointer"
      />

      {/* Modal Container */}
      <div 
        ref={modalBoxRef}
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#FAF7F2] border border-[#C5A880]/50 shadow-2xl overflow-y-auto z-10 will-change-transform"
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-[#FAF7F2]/90 hover:bg-[#4A0E17] hover:text-[#FAF7F2] text-[#1C1617] rounded-full transition-all duration-300 z-20 shadow-md cursor-pointer hover:rotate-90"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 stroke-[2]" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 p-6 sm:p-8">
          
          {/* Left Column: Product Imagery (6 cols) */}
          <div className="md:col-span-6 flex flex-col gap-3">
            {/* Main Active Image */}
            <div className="relative aspect-[3/4] bg-[#F5EFE6] overflow-hidden border border-[#C5A880]/30 shadow-sm">
              <img
                ref={activeImgRef}
                src={images[activeImage] || product.image}
                alt={product.name}
                className="w-full h-full object-cover object-top will-change-transform"
              />
              <span className="absolute top-3 left-3 bg-[#4A0E17] text-[#FAF7F2] text-[9.5px] font-sans-ui uppercase tracking-widest px-2.5 py-1 font-semibold">
                {product.tag}
              </span>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2.5">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectImage(idx)}
                    className={`relative w-20 h-24 overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImage === idx ? 'border-[#4A0E17] shadow-sm scale-102' : 'border-[#C5A880]/40 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover object-top" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Specifications & Inquire Actions (6 cols) */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
              {/* Category & Collection */}
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[11px] font-sans-ui uppercase tracking-[0.2em] text-[#C5A880] font-semibold">
                  {product.category}
                </span>
                <span className="text-[#C5A880]">•</span>
                <span className="text-[11px] font-sans-ui uppercase tracking-[0.15em] text-[#1C1617]/60">
                  SUKAM SUTRA Atelier
                </span>
              </div>

              {/* Title */}
              <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-[#1C1617] font-normal leading-tight mb-2">
                {product.name}
              </h2>

              {/* Price / Availability Tag */}
              <div className="inline-block bg-[#4A0E17]/6 border border-[#C5A880]/40 px-3 py-1.5 mb-4">
                <span className="font-sans-ui text-xs font-semibold text-[#4A0E17] uppercase tracking-wider">
                  {product.pricePlaceholder}
                </span>
                <span className="text-[11px] text-[#1C1617]/70 font-light ml-2">
                  (Retail & Wholesale)
                </span>
              </div>

              {/* Description */}
              <p className="font-sans-ui text-xs sm:text-sm text-[#1C1617]/75 font-light leading-relaxed mb-5">
                {product.description}
              </p>

              {/* Fabric & Craft Meta */}
              <div className="bg-[#F5EFE6] border border-[#C5A880]/30 p-4 mb-5 flex flex-col gap-2.5">
                <div className="flex items-start justify-between text-xs">
                  <span className="font-sans-ui text-[#1C1617]/60 uppercase tracking-wider text-[10px]">Fabric:</span>
                  <span className="font-sans-ui text-[#1C1617] font-medium text-right max-w-[200px]">{product.fabric}</span>
                </div>
                <div className="border-t border-[#C5A880]/20 pt-2 flex items-start justify-between text-xs">
                  <span className="font-sans-ui text-[#1C1617]/60 uppercase tracking-wider text-[10px]">Craftsmanship:</span>
                  <span className="font-sans-ui text-[#1C1617] font-medium text-right max-w-[200px]">{product.craft}</span>
                </div>
                <div className="border-t border-[#C5A880]/20 pt-2 flex items-start justify-between text-xs">
                  <span className="font-sans-ui text-[#1C1617]/60 uppercase tracking-wider text-[10px]">Palette:</span>
                  <span className="font-sans-ui text-[#1C1617] font-medium text-right">{product.color}</span>
                </div>
              </div>

              {/* Key Features */}
              {product.features && (
                <div className="mb-6">
                  <span className="block text-[11px] font-sans-ui uppercase tracking-wider text-[#4A0E17] font-semibold mb-2">
                    Ensemble Highlights:
                  </span>
                  <ul className="flex flex-col gap-1.5 text-xs text-[#1C1617]/75 font-light">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#C5A880] flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="border-t border-[#C5A880]/30 pt-5 flex flex-col gap-3">
              <MagneticButton strength={0.18} className="w-full">
                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#4A0E17] hover:bg-[#6E1624] text-[#FAF7F2] py-3.5 text-center text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-[#E5C388]" />
                  <span>Inquire on WhatsApp</span>
                </a>
              </MagneticButton>

              <div className="flex items-center justify-between text-[11px] text-[#1C1617]/60 font-sans-ui">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#4A0E17]" />
                  <span>Pan-India Doorstep Dispatch</span>
                </span>
                
                <button
                  onClick={() => onToggleWishlist && onToggleWishlist(product.id)}
                  className="flex items-center gap-1 text-[#4A0E17] hover:underline cursor-pointer"
                >
                  <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-[#4A0E17]' : ''}`} />
                  <span>{isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
