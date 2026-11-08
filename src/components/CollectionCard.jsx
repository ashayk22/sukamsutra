import React from 'react';

export default function CollectionCard({ title, image, href, isActive, onClick, className = '' }) {
  return (
    <a
      href={href || '#'}
      onClick={onClick}
      className={`${className} group relative block flex-shrink-0 overflow-hidden cursor-pointer select-none
        transition-all duration-300 ease-out
        hover:-translate-y-2 hover:shadow-[0_18px_36px_rgba(0,0,0,0.9),0_0_20px_rgba(223,189,135,0.25)]
        ${isActive ? 'ring-1 ring-[#dfbd87] shadow-[0_0_20px_rgba(223,189,135,0.35)]' : ''}
      `}
      style={{
        width: 'clamp(170px, 14.5vw, 212px)',
        height: 'clamp(195px, 16.5vw, 238px)',
        borderRadius: 'clamp(85px, 7.25vw, 106px) clamp(85px, 7.25vw, 106px) 4px 4px',
        border: '1px solid rgba(223, 189, 135, 0.55)',
      }}
    >
      {/* Background photo */}
      <div
        className="absolute inset-0 w-full h-full bg-[#180a0e] overflow-hidden"
        style={{ borderRadius: 'inherit' }}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent group-hover:from-black/95 transition-opacity duration-300"
        style={{ borderRadius: 'inherit' }}
      />

      {/* Footer */}
      <div className="absolute inset-x-0 bottom-0 px-3.5 pb-3.5 z-10">
        {/* Tiny gold rosette motif matching reference */}
        <div className="flex justify-center mb-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
          <img
            src="/assets/brand/rosette_gold.png"
            alt=""
            className="w-[16px] h-auto object-contain filter drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]"
          />
        </div>

        {/* Title + arrow */}
        <div className="flex items-center justify-between text-[#fbf7f0]">
          <span
            className="font-sans-ui font-medium tracking-[0.03em] leading-none text-[#fbf7f0]/95 group-hover:text-white transition-colors truncate pr-1"
            style={{ fontSize: 11.5 }}
          >
            {title}
          </span>
          <svg
            className="flex-shrink-0 text-[#fbf7f0]/85 group-hover:translate-x-0.5 group-hover:text-white transition-transform duration-300"
            style={{ width: 13, height: 13 }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </div>
      </div>
    </a>
  );
}
