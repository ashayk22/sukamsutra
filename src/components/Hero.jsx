import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles, MapPin, Truck, ShieldCheck } from 'lucide-react';
import { BRAND_CONFIG } from '../data/brandData';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ onExploreClick, onStoryClick }) {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const heroImgTagRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('static')) {
      return;
    }

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Eyebrow Tag entrance
      tl.fromTo(
        '.hero-eyebrow',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.15 }
      )
      // 2. Staggered Headline with clip-path overflow reveals
      .fromTo(
        '.hero-title-line',
        { y: '115%', opacity: 0, rotateZ: isReducedMotion ? 0 : 2 },
        { y: '0%', opacity: 1, rotateZ: 0, duration: 1.15, stagger: 0.14, ease: 'power4.out' },
        '-=0.5'
      )
      // 3. Elegant Gold Flourish line draw
      .fromTo(
        '.hero-flourish',
        { scaleX: 0, opacity: 0, transformOrigin: 'left center' },
        { scaleX: 1, opacity: 1, duration: 0.85, ease: 'power2.out' },
        '-=0.5'
      )
      // 4. Narrative text fade & slide
      .fromTo(
        '.hero-desc',
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.85 },
        '-=0.5'
      )
      // 5. Actions & Buttons
      .fromTo(
        '.hero-actions',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.5'
      )
      // 6. Badges
      .fromTo(
        '.hero-badge-item',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.1 },
        '-=0.4'
      )
      // 7. Cinematic Campaign Image Reveal with Clipping Mask
      .fromTo(
        imageRef.current,
        { clipPath: isReducedMotion ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)', opacity: 0 },
        { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 1.45, ease: 'power3.inOut' },
        '-=1.4'
      )
      // 8. Image Inner Scale-down
      .fromTo(
        heroImgTagRef.current,
        { scale: isReducedMotion ? 1 : 1.18 },
        { scale: 1.0, duration: 1.75, ease: 'power2.out' },
        '-=1.35'
      )
      // 9. Floating Noor-e-Jammu Tag & Maison badge
      .fromTo(
        '.hero-floating-tag',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo(
        '.hero-maison-badge',
        { opacity: 0, scale: 0.92, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.75, ease: 'back.out(1.2)' },
        '-=0.6'
      );

      // Subtle parallax photography on scroll
      if (!isReducedMotion && heroRef.current && imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 9,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // Ambient gentle breathing zoom on hero image
        gsap.to(heroImgTagRef.current, {
          scale: 1.05,
          duration: 9,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 2,
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="home"
      ref={heroRef}
      className="relative min-h-[640px] lg:min-h-[700px] lg:max-h-[840px] bg-[#FAF7F2] overflow-hidden flex items-center border-b border-[#C5A880]/30"
    >
      {/* Decorative Warm Background Ornaments */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#C5A880]/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#4A0E17]/6 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Brand Headline (7 Cols on Desktop) */}
          <div ref={textRef} className="lg:col-span-7 flex flex-col items-start pr-0 lg:pr-6">
            
            {/* Eyebrow with location tag */}
            <div className="hero-eyebrow flex items-center gap-2.5 mb-4 sm:mb-5">
              <span className="w-6 h-[1px] bg-[#C5A880]"></span>
              <span className="font-sans-ui text-[11px] sm:text-xs uppercase tracking-[0.28em] text-[#4A0E17] font-semibold">
                Gandhi Nagar, Jammu • Pan-India Edit
              </span>
              <span className="w-6 h-[1px] bg-[#C5A880]"></span>
            </div>

            {/* Editorial Main Headline with Overflow-Hidden Mask Wrappers */}
            <h1 className="font-editorial text-[#1C1617] tracking-tight leading-[0.98] sm:leading-[0.94] mb-3">
              <span className="overflow-hidden block">
                <span className="hero-title-line block text-4xl sm:text-6xl lg:text-[72px] font-normal will-change-transform">
                  Elegance Woven
                </span>
              </span>
              <span className="overflow-hidden block mt-1 sm:mt-2">
                <span className="hero-title-line block text-4xl sm:text-6xl lg:text-[72px] italic font-normal text-[#4A0E17] will-change-transform">
                  Into Every Thread.
                </span>
              </span>
            </h1>

            {/* Subtle Calligraphic Gold Flourish */}
            <div className="hero-flourish w-48 sm:w-64 h-5 my-2">
              <svg viewBox="0 0 260 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path 
                  d="M 5 15 C 60 8, 120 4, 165 7 C 180 8, 185 16, 195 16 C 205 16, 225 10, 255 10" 
                  stroke="#C5A880" 
                  strokeWidth="1.4" 
                  strokeLinecap="round" 
                />
                <circle cx="165" cy="7" r="1.5" fill="#C5A880" />
              </svg>
            </div>

            {/* Editorial Narrative */}
            <p className="hero-desc font-sans-ui text-sm sm:text-base text-[#1C1617]/75 font-light leading-relaxed max-w-xl mb-7 sm:mb-9">
              Welcome to <strong className="font-medium text-[#1C1617]">SUKAM SUTRA</strong>, Jammu&apos;s premier destination for authentic Pakistani suits, designer ethnic ensembles, and festive couture. Handpicked mastercraft tailored for retail connoisseurs and wholesale boutique partners across India.
            </p>

            {/* Dual CTAs with Magnetic Feedback */}
            <div className="hero-actions flex flex-wrap items-center gap-3.5 sm:gap-4 mb-8 sm:mb-10 w-full sm:w-auto">
              
              {/* Primary: Deep Wine Button with Magnetic Pull */}
              <MagneticButton strength={0.22} className="w-full sm:w-auto">
                <a
                  href="#collections"
                  onClick={onExploreClick}
                  className="group relative inline-flex items-center justify-center gap-3 bg-[#4A0E17] hover:bg-[#6E1624] text-[#FAF7F2] px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-[13px] font-sans-ui uppercase tracking-[0.18em] font-medium transition-all shadow-[0_4px_20px_rgba(74,14,23,0.18)] hover:shadow-[0_8px_30px_rgba(74,14,23,0.32)] overflow-hidden w-full sm:w-auto"
                >
                  <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">Explore Collections</span>
                  <ArrowRight className="w-4 h-4 text-[#E5C388] relative z-10 transition-transform duration-300 group-hover:translate-x-1.5" />
                  <div className="absolute inset-0 bg-[#6E1624] translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0" />
                </a>
              </MagneticButton>

              {/* Secondary: Bordered Muted Gold with Magnetic Pull */}
              <MagneticButton strength={0.18} className="w-full sm:w-auto">
                <a
                  href="#story"
                  onClick={onStoryClick}
                  className="group inline-flex items-center justify-center gap-2.5 bg-transparent hover:bg-[#4A0E17]/6 border border-[#C5A880] text-[#1C1617] px-6 sm:px-7 py-3.5 sm:py-4 text-xs sm:text-[13px] font-sans-ui uppercase tracking-[0.18em] font-medium transition-all w-full sm:w-auto"
                >
                  <span>Discover Our Story</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] group-hover:bg-[#4A0E17] group-hover:scale-125 transition-all"></span>
                </a>
              </MagneticButton>

            </div>

            {/* Trust & Location Badges */}
            <div className="hero-badges border-t border-[#C5A880]/30 pt-5 sm:pt-6 w-full flex flex-wrap items-center gap-4 sm:gap-7 text-xs text-[#1C1617]/70 font-sans-ui">
              <div className="hero-badge-item flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#4A0E17]" />
                <span>Gandhi Nagar, Jammu</span>
              </div>
              <div className="hero-badge-item flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#4A0E17]" />
                <span>Pan-India Shipping</span>
              </div>
              <div className="hero-badge-item flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#4A0E17]" />
                <span>Retail & Wholesale</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Fashion Campaign Imagery (5 Cols on Desktop) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative arched frame */}
              <div className="absolute -inset-2.5 sm:-inset-3 border border-[#C5A880]/40 rounded-t-[140px] sm:rounded-t-[180px] rounded-b-md -z-10"></div>
              
              {/* Main Campaign Image Container with Clipping Reveal */}
              <div 
                ref={imageRef}
                data-cursor="explore"
                className="relative overflow-hidden rounded-t-[136px] sm:rounded-t-[176px] rounded-b-sm shadow-[0_20px_50px_rgba(74,14,23,0.14)] bg-[#F5EFE6] aspect-[4/5] sm:aspect-[3/4] cursor-pointer will-change-transform"
              >
                <img
                  ref={heroImgTagRef}
                  src="/images/hero/hero_campaign.jpg"
                  alt="SUKAM SUTRA Pakistani Designer Suit Campaign"
                  className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.02] will-change-transform"
                />

                {/* Subtle bottom gradient to ensure text readability without obscuring outfit */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/35 via-black/10 to-transparent pointer-events-none"></div>

                {/* Sleek Floating bottom tag on image */}
                <div className="hero-floating-tag absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 p-3 sm:p-3.5 bg-[#FAF7F2]/90 backdrop-blur-md border border-[#C5A880]/40 shadow-lg flex items-center justify-between transition-transform duration-300 hover:bg-[#FAF7F2]">
                  <div>
                    <span className="block text-[9px] sm:text-[10px] uppercase font-sans-ui tracking-[0.2em] text-[#4A0E17] font-semibold">
                      New Season Arrival
                    </span>
                    <span className="block font-editorial text-base sm:text-lg text-[#1C1617] font-normal leading-tight italic">
                      The Noor-e-Jammu Collection
                    </span>
                  </div>

                  <a 
                    href="#pakistani-suits" 
                    className="p-2 bg-[#4A0E17] text-[#FAF7F2] hover:bg-[#6E1624] transition-all duration-300 hover:scale-105 flex-shrink-0"
                    aria-label="View Collection"
                  >
                    <ArrowRight className="w-4 h-4 text-[#E5C388]" />
                  </a>
                </div>
              </div>

              {/* Floating Architectural Badge */}
              <div className="hero-maison-badge hidden sm:flex absolute -bottom-3 -left-3 lg:-left-4 bg-[#4A0E17] text-[#FAF7F2] px-4 py-2.5 shadow-xl border border-[#C5A880]/50 flex-col gap-0.5 z-20">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#E5C388] font-semibold">
                  Maison Jammu
                </span>
                <span className="font-editorial text-sm sm:text-base italic leading-tight">
                  Near Laxmi Narayan Mandir
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
