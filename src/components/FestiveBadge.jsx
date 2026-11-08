import React from 'react';

export default function FestiveBadge() {
  return (
    <div className="flex flex-col items-start select-none group cursor-pointer">
      {/* 8-petal gold rosette motif */}
      <div className="mb-3 transition-transform duration-500 group-hover:rotate-45">
        <img
          src="/assets/brand/rosette_gold.png"
          alt=""
          className="w-[28px] h-auto object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] opacity-95"
        />
      </div>

      {/* "Festive Collection" — italic Cormorant Garamond */}
      <div
        className="font-editorial italic text-[#fbf7f0] tracking-normal"
        style={{
          fontSize: 'clamp(28px, 2.4vw, 36px)',
          lineHeight: 1.05,
          marginBottom: 12,
        }}
      >
        <span className="block font-normal">Festive</span>
        <span className="block font-normal">Collection</span>
      </div>

      {/* "Now Live →" */}
      <div
        className="flex items-center gap-2 font-sans-ui font-medium text-[#dfbd87] group-hover:text-[#f3caa1] transition-colors"
        style={{ fontSize: 12.5, letterSpacing: '0.04em' }}
      >
        <span>Now Live</span>
        <svg
          style={{ width: 14, height: 14 }}
          className="transition-transform duration-300 group-hover:translate-x-1"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </div>
    </div>
  );
}
