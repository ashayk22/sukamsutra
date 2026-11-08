import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { 
  Search, 
  Heart, 
  Menu, 
  X, 
  ChevronDown, 
  Store, 
  MessageCircle,
  ExternalLink 
} from 'lucide-react';
import { BRAND_CONFIG, COLLECTIONS } from '../data/brandData';
import MagneticButton from './MagneticButton';

export default function Navbar({ onOpenSearch, wishlistCount = 0 }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collectionsDropdown, setCollectionsDropdown] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const headerRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Scroll detection & active section detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 35);

      const sections = ['store', 'gallery', 'why-us', 'story', 'featured', 'collections', 'home'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Entrance animation for header
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('static')) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out' }
      );
    });

    return () => ctx.revert();
  }, []);

  // Animate mobile drawer when opened
  useEffect(() => {
    if (mobileMenuOpen && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );

      const items = mobileMenuRef.current.querySelectorAll('.mobile-nav-item');
      gsap.fromTo(
        items,
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out', delay: 0.05 }
      );
    }
  }, [mobileMenuOpen]);

  return (
    <header 
      ref={headerRef}
      className={`sticky top-0 z-40 w-full transition-all duration-500 will-change-transform ${
        isScrolled 
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-[0_4px_24px_rgba(74,14,23,0.06)] border-b border-[#C5A880]/30 py-3' 
          : 'bg-[#FAF7F2] border-b border-[#C5A880]/20 py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Mobile Menu Trigger & Store Pill */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-[#1C1617] hover:text-[#4A0E17] transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 stroke-[1.8]" /> : <Menu className="w-6 h-6 stroke-[1.8]" />}
          </button>

          <a 
            href="#store" 
            className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-sans-ui uppercase tracking-wider text-[#4A0E17] bg-[#4A0E17]/6 hover:bg-[#4A0E17]/10 px-2.5 py-1 rounded-sm border border-[#C5A880]/30 transition-all group"
          >
            <Store className="w-3 h-3 text-[#C5A880] transition-transform duration-300 group-hover:scale-110" />
            <span>Gandhi Nagar, Jammu</span>
          </a>
        </div>

        {/* Center: Brand Wordmark & Insignia */}
        <div className="text-center flex flex-col items-center">
          <a href="#home" className="group flex flex-col items-center text-decoration-none">
            {/* Small floral motif */}
            <div className="flex items-center justify-center gap-1.5 mb-0.5 opacity-80 group-hover:opacity-100 transition-opacity">
              <span className="w-4 h-[1px] bg-[#C5A880]"></span>
              <svg className="w-2.5 h-2.5 text-[#C5A880] transition-transform duration-500 group-hover:rotate-45" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span className="w-4 h-[1px] bg-[#C5A880]"></span>
            </div>

            <span className={`font-editorial font-medium tracking-[0.22em] text-[#1C1617] group-hover:text-[#4A0E17] transition-all duration-300 uppercase leading-tight ${
              isScrolled ? 'text-2xl sm:text-[28px]' : 'text-2xl sm:text-3xl lg:text-[34px]'
            }`}>
              SUKAM SUTRA
            </span>

            <span className="font-sans-ui text-[9px] sm:text-[10px] font-medium tracking-[0.32em] text-[#C5A880] uppercase -mt-0.5 transition-opacity duration-300">
              Jammu • Haute Ethnic
            </span>
          </a>
        </div>

        {/* Right: Actions (Search, Wishlist, WhatsApp, Instagram) */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          <button
            onClick={onOpenSearch}
            className="p-1.5 text-[#1C1617]/80 hover:text-[#4A0E17] transition-all hover:scale-110 cursor-pointer"
            aria-label="Search Collection"
          >
            <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[1.8]" />
          </button>

          <a
            href="#featured"
            className="relative p-1.5 text-[#1C1617]/80 hover:text-[#4A0E17] transition-all hover:scale-110"
            aria-label="Wishlist"
          >
            <Heart className="w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[1.8]" />
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#4A0E17] text-[#FAF7F2] text-[9px] rounded-full flex items-center justify-center font-bold animate-pulse">
                {wishlistCount}
              </span>
            )}
          </a>

          <MagneticButton strength={0.25} className="hidden md:inline-block">
            <a
              href={`https://wa.me/${BRAND_CONFIG.contact.whatsappNumber}?text=Hi%20Sukam%20Sutra%2C%20I%20am%20visiting%20your%20website%20and%20would%20like%20to%20inquire%20about%20your%20Pakistani%20Suits%20and%20Ethnic%20Wear.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#4A0E17] hover:bg-[#6E1624] text-[#FAF7F2] text-xs font-sans-ui font-medium px-3.5 py-1.5 tracking-wider uppercase transition-all shadow-sm hover:shadow-md"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#E5C388]" />
              <span>Inquire</span>
            </a>
          </MagneticButton>
        </div>

      </div>

      {/* Desktop Main Navigation Links */}
      <nav className={`hidden lg:block border-t border-[#C5A880]/15 transition-all duration-300 ${
        isScrolled ? 'mt-2 pt-2' : 'mt-3 pt-2.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-8 xl:gap-11 text-xs uppercase tracking-[0.16em] font-sans-ui font-medium text-[#1C1617]/85">
          
          <a 
            href="#home" 
            className={`py-1 relative transition-colors ${
              activeSection === 'home' ? 'text-[#4A0E17] font-semibold' : 'hover:text-[#4A0E17]'
            }`}
          >
            <span>Home</span>
            <span className={`absolute bottom-0 left-0 h-[1.5px] bg-[#C5A880] transition-all duration-300 ${
              activeSection === 'home' ? 'w-full' : 'w-0'
            }`}></span>
          </a>

          {/* Collections with Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setCollectionsDropdown(true)}
            onMouseLeave={() => setCollectionsDropdown(false)}
          >
            <a 
              href="#collections" 
              className={`inline-flex items-center gap-1 py-1 transition-colors ${
                activeSection === 'collections' ? 'text-[#4A0E17] font-semibold' : 'hover:text-[#4A0E17]'
              }`}
            >
              <span>Collections</span>
              <ChevronDown className={`w-3 h-3 text-[#C5A880] transition-transform duration-300 ${collectionsDropdown ? 'rotate-180' : ''}`} />
            </a>
            <span className={`absolute bottom-0 left-0 h-[1.5px] bg-[#C5A880] transition-all duration-300 ${
              activeSection === 'collections' ? 'w-full' : 'w-0'
            }`}></span>

            <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-64 z-50 transition-all duration-300 ${
              collectionsDropdown ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}>
              <div className="bg-[#FAF7F2] border border-[#C5A880]/40 shadow-xl p-3 flex flex-col gap-1.5 backdrop-blur-md">
                {COLLECTIONS.map((col) => (
                  <a
                    key={col.id}
                    href={`#${col.id}`}
                    className="px-3 py-2 text-[11px] uppercase tracking-wider text-[#1C1617] hover:bg-[#4A0E17]/6 hover:text-[#4A0E17] transition-all flex items-center justify-between group/drop"
                    onClick={() => setCollectionsDropdown(false)}
                  >
                    <span className="transition-transform duration-200 group-hover/drop:translate-x-1">{col.title}</span>
                    <span className="text-[10px] text-[#C5A880] font-normal tracking-normal">{col.itemsCount}</span>
                  </a>
                ))}
                <div className="border-t border-[#C5A880]/20 pt-2 mt-1">
                  <a
                    href="#wholesale"
                    className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-[#4A0E17] font-semibold flex items-center justify-between hover:bg-[#4A0E17]/6 transition-colors"
                    onClick={() => setCollectionsDropdown(false)}
                  >
                    <span>Retail & Wholesale</span>
                    <span className="text-[9px] bg-[#4A0E17]/10 text-[#4A0E17] px-1.5 py-0.5 rounded">Pan-India</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <a 
            href="#featured" 
            className={`py-1 relative transition-colors ${
              activeSection === 'featured' ? 'text-[#4A0E17] font-semibold' : 'hover:text-[#4A0E17]'
            }`}
          >
            <span>Featured Arrivals</span>
            <span className={`absolute bottom-0 left-0 h-[1.5px] bg-[#C5A880] transition-all duration-300 ${
              activeSection === 'featured' ? 'w-full' : 'w-0'
            }`}></span>
          </a>

          <a 
            href="#story" 
            className={`py-1 relative transition-colors ${
              activeSection === 'story' ? 'text-[#4A0E17] font-semibold' : 'hover:text-[#4A0E17]'
            }`}
          >
            <span>Brand Story</span>
            <span className={`absolute bottom-0 left-0 h-[1.5px] bg-[#C5A880] transition-all duration-300 ${
              activeSection === 'story' ? 'w-full' : 'w-0'
            }`}></span>
          </a>

          <a 
            href="#why-us" 
            className={`py-1 relative transition-colors ${
              activeSection === 'why-us' ? 'text-[#4A0E17] font-semibold' : 'hover:text-[#4A0E17]'
            }`}
          >
            <span>Why Sukam Sutra</span>
            <span className={`absolute bottom-0 left-0 h-[1.5px] bg-[#C5A880] transition-all duration-300 ${
              activeSection === 'why-us' ? 'w-full' : 'w-0'
            }`}></span>
          </a>

          <a 
            href="#gallery" 
            className={`py-1 relative transition-colors ${
              activeSection === 'gallery' ? 'text-[#4A0E17] font-semibold' : 'hover:text-[#4A0E17]'
            }`}
          >
            <span>Instagram</span>
            <span className={`absolute bottom-0 left-0 h-[1.5px] bg-[#C5A880] transition-all duration-300 ${
              activeSection === 'gallery' ? 'w-full' : 'w-0'
            }`}></span>
          </a>

          <a 
            href="#store" 
            className={`py-1 text-[#4A0E17] font-semibold flex items-center gap-1.5 relative transition-colors group`}
          >
            <span>Jammu Flagship</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#4A0E17] animate-ping opacity-75"></span>
            <span className={`absolute bottom-0 left-0 h-[1.5px] bg-[#4A0E17] transition-all duration-300 ${
              activeSection === 'store' ? 'w-full' : 'w-0'
            }`}></span>
          </a>

        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="lg:hidden fixed inset-x-0 top-[100%] bg-[#FAF7F2] border-b border-[#C5A880]/30 shadow-2xl px-6 py-6 flex flex-col gap-4 max-h-[80vh] overflow-y-auto z-50"
        >
          <div className="mobile-nav-item border-b border-[#C5A880]/20 pb-3">
            <span className="text-[11px] font-sans-ui uppercase tracking-widest text-[#C5A880] block mb-2 font-semibold">
              Browse Collections
            </span>
            <div className="flex flex-col gap-2 pl-2">
              {COLLECTIONS.map((c) => (
                <a
                  key={c.id}
                  href={`#${c.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-sans-ui text-[#1C1617] hover:text-[#4A0E17] py-1 transition-colors"
                >
                  {c.title}
                </a>
              ))}
            </div>
          </div>

          <a
            href="#featured"
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-nav-item text-sm font-sans-ui uppercase tracking-wider text-[#1C1617] hover:text-[#4A0E17] py-1 border-b border-[#C5A880]/15 transition-colors"
          >
            Featured Arrivals
          </a>

          <a
            href="#story"
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-nav-item text-sm font-sans-ui uppercase tracking-wider text-[#1C1617] hover:text-[#4A0E17] py-1 border-b border-[#C5A880]/15 transition-colors"
          >
            Brand Story
          </a>

          <a
            href="#why-us"
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-nav-item text-sm font-sans-ui uppercase tracking-wider text-[#1C1617] hover:text-[#4A0E17] py-1 border-b border-[#C5A880]/15 transition-colors"
          >
            Why Sukam Sutra
          </a>

          <a
            href="#gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-nav-item text-sm font-sans-ui uppercase tracking-wider text-[#1C1617] hover:text-[#4A0E17] py-1 border-b border-[#C5A880]/15 transition-colors"
          >
            Instagram Gallery (@sukam.sutra)
          </a>

          <a
            href="#store"
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-nav-item text-sm font-sans-ui uppercase tracking-wider text-[#4A0E17] font-semibold py-1 border-b border-[#C5A880]/15 flex items-center justify-between"
          >
            <span>Visit Jammu Store</span>
            <Store className="w-4 h-4 text-[#C5A880]" />
          </a>

          {/* Quick contact buttons in drawer */}
          <div className="mobile-nav-item pt-2 flex flex-col gap-2">
            <a
              href={`https://wa.me/${BRAND_CONFIG.contact.whatsappNumber}?text=Hi%20Sukam%20Sutra%2C%20I%20am%20interested%20in%20visiting%20your%20Jammu%20store%20or%20ordering%20ethnic%20wear.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#4A0E17] text-[#FAF7F2] py-2.5 text-center text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-[#E5C388]" />
              <span>WhatsApp Inquiry</span>
            </a>

            <a
              href={BRAND_CONFIG.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full border border-[#C5A880] text-[#1C1617] py-2.5 text-center text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2"
            >
              <span>Follow @sukam.sutra</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#C5A880]" />
            </a>
          </div>

        </div>
      )}
    </header>
  );
}
