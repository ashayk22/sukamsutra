import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { FEATURED_PRODUCTS, COLLECTIONS } from '../data/brandData';

export default function SearchModal({ isOpen, onClose, onSelectProduct }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredProducts = query.trim() === ''
    ? []
    : FEATURED_PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.fabric.toLowerCase().includes(query.toLowerCase()) ||
        p.craft.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#FAF7F2] border border-[#C5A880]/50 shadow-2xl p-6 sm:p-8 z-10">
        
        {/* Header & Input */}
        <div className="flex items-center justify-between border-b border-[#C5A880]/30 pb-4 mb-6">
          <div className="flex items-center gap-3 flex-1 mr-4">
            <Search className="w-5 h-5 text-[#C5A880]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Pakistani suits, velvet, organza, festive wear..."
              className="w-full bg-transparent font-editorial text-lg sm:text-2xl text-[#1C1617] placeholder:text-[#1C1617]/40 outline-none"
            />
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#1C1617]/60 hover:text-[#4A0E17] transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Suggested Quick Filters */}
        {query.trim() === '' && (
          <div>
            <span className="block text-[11px] font-sans-ui uppercase tracking-widest text-[#C5A880] font-semibold mb-3">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-2 mb-6">
              {['Pakistani Suits', 'Velvet Kalidar', 'Organza Dupatta', 'Sharara', 'Chanderi Silk', 'Festive Wear'].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3 py-1.5 bg-[#F5EFE6] hover:bg-[#4A0E17] hover:text-[#FAF7F2] text-[#1C1617] text-xs font-sans-ui border border-[#C5A880]/30 transition-all cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>

            <div className="border-t border-[#C5A880]/20 pt-4">
              <span className="block text-[11px] font-sans-ui uppercase tracking-widest text-[#C5A880] font-semibold mb-2">
                Browse by Category
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-sans-ui">
                {COLLECTIONS.map((c) => (
                  <a
                    key={c.id}
                    href={`#${c.id}`}
                    onClick={onClose}
                    className="p-2.5 bg-[#F5EFE6]/60 hover:bg-[#F5EFE6] text-[#1C1617] border border-[#C5A880]/20 flex items-center justify-between"
                  >
                    <span>{c.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results List */}
        {query.trim() !== '' && (
          <div className="max-h-96 overflow-y-auto pr-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-10">
                <p className="font-editorial text-xl italic text-[#1C1617]/60">
                  No matching designs found for &ldquo;{query}&rdquo;
                </p>
                <p className="font-sans-ui text-xs text-[#1C1617]/50 mt-1">
                  Try searching for &quot;Pakistani&quot;, &quot;Velvet&quot;, or &quot;Organza&quot;, or inquire on WhatsApp.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onSelectProduct(p);
                      onClose();
                    }}
                    className="p-3 bg-[#F5EFE6]/60 hover:bg-[#F5EFE6] border border-[#C5A880]/30 flex items-center gap-4 cursor-pointer transition-all"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-14 h-16 object-cover object-top border border-[#C5A880]/40 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-sans-ui uppercase tracking-wider text-[#C5A880] block font-semibold">
                        {p.category}
                      </span>
                      <h4 className="font-editorial text-lg text-[#1C1617] font-normal truncate">
                        {p.name}
                      </h4>
                      <p className="font-sans-ui text-xs text-[#1C1617]/60 truncate font-light">
                        {p.fabric}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#4A0E17] flex-shrink-0" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

