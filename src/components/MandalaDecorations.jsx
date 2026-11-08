import React from 'react';

export default function MandalaDecorations() {
  return (
    <>
      {/* Bottom Left Mandala */}
      <div className="absolute bottom-0 left-0 w-44 sm:w-56 md:w-64 lg:w-[280px] h-auto pointer-events-none select-none z-10 opacity-40 mix-blend-screen transition-opacity duration-700">
        <img
          src="/assets/decorations/mandala_left.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      {/* Bottom Right Beaded Floral Line */}
      <div className="absolute bottom-0 right-0 w-48 sm:w-60 md:w-72 lg:w-[320px] h-auto pointer-events-none select-none z-10 opacity-45 mix-blend-screen transition-opacity duration-700">
        <img
          src="/assets/decorations/mandala_right.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>
    </>
  );
}
