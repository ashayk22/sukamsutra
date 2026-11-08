import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const [cursorText, setCursorText] = useState('');
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    // Respect reduced motion & touch screens
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasFinePointer || prefersReducedMotion) {
      setIsTouch(true);
      return;
    }

    setIsTouch(false);

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    // Fast 60fps setters with GSAP quickTo
    const xDot = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power2.out' });
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power2.out' });
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' });
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' });

    let active = false;

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      if (!active) {
        setIsVisible(true);
        active = true;
      }
      xDot(clientX);
      yDot(clientY);
      xRing(clientX);
      yRing(clientY);

      // Check if hovering an interactive element or custom data-cursor
      const target = e.target.closest('[data-cursor], a, button, input, select, textarea');
      if (target) {
        const customType = target.getAttribute('data-cursor');
        if (customType) {
          setCursorText(customType.toUpperCase());
          setIsHoveringLink(false);
        } else {
          setCursorText('');
          setIsHoveringLink(true);
        }
      } else {
        setCursorText('');
        setIsHoveringLink(false);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
      active = false;
    };

    const onMouseEnter = () => {
      setIsVisible(true);
      active = true;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* Precision Core Dot */}
      <div
        ref={cursorDotRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          cursorText
            ? 'w-1 h-1 bg-[#FAF7F2]'
            : isHoveringLink
            ? 'w-1.5 h-1.5 bg-[#4A0E17]'
            : 'w-2 h-2 bg-[#4A0E17]'
        }`}
      />

      {/* Luxury Trailing Ring & State Container */}
      <div
        ref={cursorRingRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          cursorText
            ? 'w-16 h-16 bg-[#4A0E17]/90 text-[#FAF7F2] border border-[#C5A880] shadow-[0_4px_20px_rgba(74,14,23,0.3)]'
            : isHoveringLink
            ? 'w-11 h-11 border border-[#4A0E17]/60 bg-[#4A0E17]/5 scale-110'
            : 'w-8 h-8 border border-[#C5A880]/70'
        }`}
      >
        {cursorText && (
          <span className="font-sans-ui text-[8px] uppercase tracking-[0.2em] font-medium select-none pointer-events-none">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}

