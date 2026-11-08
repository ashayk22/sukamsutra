import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, MapPin, Scissors, HeartHandshake } from 'lucide-react';
import { BRAND_CONFIG } from '../data/brandData';

gsap.registerPlugin(ScrollTrigger);

export default function BrandStory() {
  const storyRef = useRef(null);
  const sealRef = useRef(null);
  const mainImgRef = useRef(null);
  const detailImgRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('static')) {
      return;
    }
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // 1. Primary photo curtain clip reveal
      gsap.fromTo(
        mainImgRef.current,
        { clipPath: isReducedMotion ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)', opacity: 0 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 1.35,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: mainImgRef.current,
            start: 'top 80%',
          },
        }
      );

      // 2. Secondary detail image offset slide
      if (detailImgRef.current) {
        gsap.fromTo(
          detailImgRef.current,
          { opacity: 0, y: 35, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: detailImgRef.current,
              start: 'top 88%',
            },
          }
        );

        // Parallax scrub on detail card
        if (!isReducedMotion) {
          gsap.to(detailImgRef.current, {
            yPercent: -14,
            ease: 'none',
            scrollTrigger: {
              trigger: storyRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          });
        }
      }

      // 3. Continuous gentle rotation on Est. Jammu seal scrubbed with scroll
      if (sealRef.current && !isReducedMotion) {
        gsap.to(sealRef.current, {
          rotate: 180,
          ease: 'none',
          scrollTrigger: {
            trigger: storyRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      // 4. Headline and text reveals
      const textTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.story-content-col',
          start: 'top 78%',
        },
      });

      textTl
        .fromTo(
          '.story-eyebrow',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
        )
        .fromTo(
          '.story-title-line',
          { y: '110%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 1, ease: 'power4.out' },
          '-=0.4'
        )
        .fromTo(
          '.story-paragraph',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.14, ease: 'power2.out' },
          '-=0.5'
        )
        .fromTo(
          '.story-hallmark',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out' },
          '-=0.4'
        );
    }, storyRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="story" 
      ref={storyRef}
      className="py-20 lg:py-28 bg-[#FAF7F2] relative border-b border-[#C5A880]/20 overflow-hidden"
    >
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#4A0E17]/4 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Story Collage (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Primary craft portrait */}
              <div 
                ref={mainImgRef}
                data-cursor="artisan"
                className="relative aspect-[4/5] overflow-hidden border border-[#C5A880]/40 shadow-xl bg-[#F5EFE6] cursor-pointer will-change-transform"
              >
                <img
                  src="/images/brand/craft_story.jpg"
                  alt="SUKAM SUTRA Craftsmanship"
                  className="w-full h-full object-cover object-center filter brightness-[0.97] transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                <div className="absolute bottom-5 left-5 right-5 text-[#FAF7F2]">
                  <span className="text-[10px] font-sans-ui uppercase tracking-widest text-[#E5C388] font-semibold block mb-1">
                    Atelier Jammu
                  </span>
                  <span className="font-editorial text-xl italic font-normal">
                    Hand-embroidery & Fabric Mastery
                  </span>
                </div>
              </div>

              {/* Offset secondary detail image */}
              <div 
                ref={detailImgRef}
                data-cursor="detail"
                className="hidden sm:block absolute -bottom-8 -right-8 w-48 h-56 border-2 border-[#FAF7F2] shadow-2xl overflow-hidden bg-[#F5EFE6] cursor-pointer will-change-transform"
              >
                <img
                  src="/images/brand/embroidery_detail.jpg"
                  alt="Embroidery close-up"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-110"
                />
              </div>

              {/* Stamp motif with scrubbed rotation */}
              <div 
                ref={sealRef}
                className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-[#4A0E17] text-[#FAF7F2] p-2 flex flex-col items-center justify-center text-center shadow-lg border border-[#C5A880] will-change-transform"
              >
                <span className="text-[8px] font-sans-ui uppercase tracking-widest text-[#E5C388]">Est.</span>
                <span className="font-editorial text-sm font-semibold tracking-wider">JAMMU</span>
                <span className="text-[7.5px] font-sans-ui tracking-wider opacity-80">HAUTE ETHNIC</span>
              </div>

            </div>
          </div>

          {/* Right Column: Editorial Narrative (7 cols) */}
          <div className="story-content-col lg:col-span-7 flex flex-col items-start pl-0 lg:pl-6">
            
            <div className="story-eyebrow flex items-center gap-2 mb-3">
              <span className="w-5 h-[1px] bg-[#C5A880]"></span>
              <span className="text-[11px] font-sans-ui uppercase tracking-[0.28em] text-[#4A0E17] font-semibold">
                Our Heritage & Vision
              </span>
              <span className="w-5 h-[1px] bg-[#C5A880]"></span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-[#1C1617] font-normal leading-[1.05] mb-6 overflow-hidden">
              <span className="story-title-line block will-change-transform">
                Tradition, <span className="italic text-[#4A0E17]">Reimagined.</span>
              </span>
            </h2>

            {/* Flourish divider */}
            <div className="w-40 h-4 mb-6">
              <svg viewBox="0 0 200 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <line x1="0" y1="8" x2="190" y2="8" stroke="#C5A880" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="95" cy="8" r="3" fill="#4A0E17" stroke="#C5A880" strokeWidth="1" />
              </svg>
            </div>

            <div className="space-y-4 font-sans-ui text-sm sm:text-base text-[#1C1617]/75 font-light leading-relaxed max-w-xl mb-8">
              <p className="story-paragraph">
                Rooted in the timeless cultural tapestry of Jammu, <strong className="font-medium text-[#1C1617]">SUKAM SUTRA</strong> was conceived with a singular devotion: bringing the pinnacle of subcontinent ethnic couture to women who seek graceful distinction.
              </p>
              
              <p className="story-paragraph">
                From our flagship boutique located near the historic Laxmi Narayan Mandir in Gandhi Nagar, we curate authentic Pakistani suits celebrated for their intricate resham work, ethereal organza dupattas, and bespoke cutwork hemlines. Each textile is personally selected from master weaving clusters and renowned design houses.
              </p>

              <p className="story-paragraph">
                We believe that traditional clothing should neither compromise on comfort nor settle for generic mass production. Whether you are dressing for an intimate family ceremony or preparing your bridal trousseau, our collections honor ancestral artisanship through contemporary silhouettes.
              </p>
            </div>

            {/* Key brand hallmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl border-t border-[#C5A880]/30 pt-6">
              <div className="story-hallmark flex items-start gap-3 p-3 rounded-sm transition-all duration-300 hover:bg-[#F5EFE6]">
                <Scissors className="w-5 h-5 text-[#4A0E17] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-sans-ui text-xs font-semibold uppercase tracking-wider text-[#1C1617]">
                    Bespoke Custom Stitching
                  </h4>
                  <p className="font-sans-ui text-xs text-[#1C1617]/65 font-light mt-0.5">
                    Tailored perfection with personalized measurement consultations.
                  </p>
                </div>
              </div>

              <div className="story-hallmark flex items-start gap-3 p-3 rounded-sm transition-all duration-300 hover:bg-[#F5EFE6]">
                <HeartHandshake className="w-5 h-5 text-[#4A0E17] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-sans-ui text-xs font-semibold uppercase tracking-wider text-[#1C1617]">
                    Retail & Wholesale Hub
                  </h4>
                  <p className="font-sans-ui text-xs text-[#1C1617]/65 font-light mt-0.5">
                    Trusted partner for individual connoisseurs and multi-city boutique owners.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}
