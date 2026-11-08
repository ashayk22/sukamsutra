import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, MessageSquare, ArrowUpRight, ExternalLink } from 'lucide-react';
import InstagramIcon from './icons/InstagramIcon';
import { INSTAGRAM_POSTS, BRAND_CONFIG } from '../data/brandData';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function InstagramGallery() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('static')) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.insta-header',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.insta-header',
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        '.insta-post-card',
        { opacity: 0, y: 35, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.insta-grid',
            start: 'top 82%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="gallery" 
      ref={sectionRef}
      className="py-20 lg:py-28 bg-[#FAF7F2] relative border-b border-[#C5A880]/20"
    >
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Follow CTA */}
        <div className="insta-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 border-b border-[#C5A880]/30 pb-6">
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <InstagramIcon className="w-4 h-4 text-[#C5A880]" />
              <span className="text-[11px] font-sans-ui uppercase tracking-[0.28em] text-[#4A0E17] font-semibold">
                Social Lookbook
              </span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-5xl text-[#1C1617] font-normal leading-tight">
              Follow Us on <span className="italic text-[#4A0E17]">Instagram</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <MagneticButton strength={0.2}>
              <a
                href={BRAND_CONFIG.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#4A0E17] hover:bg-[#6E1624] text-[#FAF7F2] text-xs font-sans-ui uppercase tracking-widest font-semibold transition-all shadow-md hover:shadow-lg group"
              >
                <InstagramIcon className="w-4 h-4 text-[#E5C388]" />
                <span>Follow {BRAND_CONFIG.instagram.handle}</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </MagneticButton>
          </div>

        </div>

        {/* 6-Item Aesthetic Instagram Feed Grid */}
        <div className="insta-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href={BRAND_CONFIG.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="insta"
              className="insta-post-card group relative aspect-square overflow-hidden bg-[#F5EFE6] border border-[#C5A880]/30 shadow-xs block cursor-pointer will-change-transform"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover object-center filter brightness-[0.98] transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Hover Dark Wine Overlay with Instagram Metadata */}
              <div className="absolute inset-0 bg-[#4A0E17]/85 backdrop-blur-xs p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 text-[#FAF7F2]">
                <div className="flex items-center justify-between">
                  <InstagramIcon className="w-4 h-4 text-[#E5C388]" />
                  <ExternalLink className="w-3.5 h-3.5 text-[#FAF7F2]/70" />
                </div>

                <div className="text-center">
                  <p className="font-editorial text-sm italic font-normal line-clamp-2 leading-tight mb-2">
                    {post.title}
                  </p>
                  <div className="flex items-center justify-center gap-3 text-[11px] font-sans-ui text-[#E5C388]">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3 fill-[#E5C388]" />
                      <span>{post.likes}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      <span>{post.comments}</span>
                    </span>
                  </div>
                </div>

                <div className="text-[9.5px] uppercase font-sans-ui tracking-wider text-center text-[#FAF7F2]/70">
                  View On Instagram
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Micro note */}
        <div className="mt-8 text-center text-xs font-sans-ui text-[#1C1617]/60 font-light">
          Tag <strong className="font-medium text-[#4A0E17]">#SukamSutra</strong> and <strong className="font-medium text-[#4A0E17]">@sukam.sutra</strong> to be featured on our social lookbook.
        </div>

      </div>

    </section>
  );
}
