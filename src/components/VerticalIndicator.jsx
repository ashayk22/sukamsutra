import React from 'react';

export default function VerticalIndicator({ activeIndex = 0, onSelect }) {
  const items = ['01', '02', '03', '04'];

  return (
    <div className="relative flex flex-col items-end select-none">
      {/* Continuous vertical track line */}
      <div
        className="absolute right-[5px] top-[10px] bottom-[10px] pointer-events-none"
        style={{
          width: '1px',
          background: 'linear-gradient(to bottom, rgba(223,189,135,0.7) 0%, rgba(223,189,135,0.2) 100%)',
        }}
      />

      {items.map((num, idx) => {
        const isActive = idx === activeIndex;
        return (
          <button
            key={num}
            onClick={() => onSelect && onSelect(idx)}
            className="group flex items-center gap-3.5 cursor-pointer py-3.5 transition-all duration-300"
            aria-label={`Collection ${num}`}
          >
            <span
              className={`font-sans-ui text-[11px] font-medium tracking-widest transition-colors duration-300 ${
                isActive
                  ? 'text-[#fbf7f0]'
                  : 'text-[#fbf7f0]/35 group-hover:text-[#fbf7f0]/75'
              }`}
            >
              {num}
            </span>

            {/* Indicator Dot */}
            <div className="relative flex items-center justify-center w-[11px] h-[11px]">
              {isActive ? (
                <div
                  className="w-[9px] h-[9px] rounded-full shadow-[0_0_10px_#dfbd87,0_0_4px_#fbf7f0]"
                  style={{
                    background: 'radial-gradient(circle, #fff9ea 20%, #dfbd87 80%, #b8862d 100%)',
                  }}
                />
              ) : (
                <div className="w-[3px] h-[3px] rounded-full bg-[#dfbd87]/30 group-hover:bg-[#dfbd87]/70 transition-colors" />
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
