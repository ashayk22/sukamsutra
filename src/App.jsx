import React, { useState } from 'react';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CollectionsSection from './components/CollectionsSection';
import FeaturedArrivals from './components/FeaturedArrivals';
import ProductModal from './components/ProductModal';
import BrandStory from './components/BrandStory';
import WhySukamSutra from './components/WhySukamSutra';
import InstagramGallery from './components/InstagramGallery';
import StoreLocator from './components/StoreLocator';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import SearchModal from './components/SearchModal';
import CustomCursor from './components/CustomCursor';
import SmoothScroll from './components/SmoothScroll';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');
  const [wishlist, setWishlist] = useState(['ss-001']); // Initial sample wishlisted item

  const handleToggleWishlist = (productId) => {
    setWishlist((prev) => 
      prev.includes(productId) 
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectCollection = (categoryName) => {
    setActiveCategoryFilter(categoryName);
    const featuredElem = document.getElementById('featured');
    if (featuredElem) {
      featuredElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isAnyModalOpen = !!selectedProduct || isSearchOpen;

  return (
    <SmoothScroll isModalOpen={isAnyModalOpen}>
      <div className="min-h-screen bg-[#FAF7F2] text-[#1C1617] font-sans-ui selection:bg-[#4A0E17] selection:text-[#FAF7F2] relative">
        
        {/* Luxury Custom Cursor (Desktop Only) */}
        <CustomCursor />

        {/* 1. Top Announcement Bar */}
        <AnnouncementBar />

        {/* 2. Luxury Sticky Navbar */}
        <Navbar 
          onOpenSearch={() => setIsSearchOpen(true)}
          wishlistCount={wishlist.length}
        />

        {/* Main Sections */}
        <main>
          {/* 3. Section A: Cinematic Hero */}
          <Hero 
            onExploreClick={() => {
              const elem = document.getElementById('collections');
              if (elem) elem.scrollIntoView({ behavior: 'smooth' });
            }}
            onStoryClick={() => {
              const elem = document.getElementById('story');
              if (elem) elem.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* 4. Section B: Shop Collections */}
          <CollectionsSection onSelectCollection={handleSelectCollection} />

          {/* 5. Section C: Featured Arrivals */}
          <FeaturedArrivals 
            activeFilter={activeCategoryFilter}
            setActiveFilter={setActiveCategoryFilter}
            onQuickView={(prod) => setSelectedProduct(prod)}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
          />

          {/* 6. Section D: Brand Story ("Tradition, Reimagined.") */}
          <BrandStory />

          {/* 7. Section E: Why Sukam Sutra */}
          <WhySukamSutra />

          {/* 8. Section F: Instagram Gallery (@sukam.sutra) */}
          <InstagramGallery />

          {/* 9. Section G: Visit Our Store (Gandhi Nagar, Jammu) */}
          <StoreLocator />
        </main>

        {/* 10. Section H: Footer */}
        <Footer />

        {/* Floating WhatsApp Concierge Button */}
        <WhatsAppFloat />

        {/* Interactive Product Quick View Modal */}
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            isWishlisted={wishlist.includes(selectedProduct.id)}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {/* Interactive Search Modal */}
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelectProduct={(prod) => setSelectedProduct(prod)}
        />

      </div>
    </SmoothScroll>
  );
}
