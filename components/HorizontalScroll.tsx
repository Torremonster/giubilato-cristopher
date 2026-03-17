"use client";
import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Slide {
  id: number;
  label: string;
  content: React.ReactNode;
}

interface HorizontalScrollProps {
  slides: Slide[];
}

export default function HorizontalScroll({ slides }: HorizontalScrollProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const scrollLock = useRef(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const goTo = useCallback(
    (next: number) => {
      if (next < 0 || next >= slides.length || scrollLock.current) return;
      scrollLock.current = true;
      setDirection(next > current ? 1 : -1);
      setCurrent(next);
      setTimeout(() => { scrollLock.current = false; }, 800);
    },
    [current, slides.length]
  );

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (e.deltaY > 30) goTo(current + 1);
      else if (e.deltaY < -30) goTo(current - 1);
    },
    [current, goTo]
  );

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStart.current) return;
      const dx = e.changedTouches[0].clientX - touchStart.current.x;
      const dy = e.changedTouches[0].clientY - touchStart.current.y;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);
      // Require a minimum swipe of 40px and mostly horizontal or vertical
      if (Math.max(absDx, absDy) < 40) return;
      if (absDy >= absDx) {
        // Vertical swipe: up = next, down = prev
        if (dy < 0) goTo(current + 1);
        else goTo(current - 1);
      } else {
        // Horizontal swipe: left = next, right = prev
        if (dx < 0) goTo(current + 1);
        else goTo(current - 1);
      }
      touchStart.current = null;
    },
    [current, goTo]
  );

  // Depth-based transition: moving forward/backward along the grid
  const variants = {
    enter: (dir: number) => ({
      scale: dir > 0 ? 0.3 : 2.5,
      opacity: 0,
      filter: dir > 0 ? "blur(8px)" : "blur(4px)",
    }),
    center: {
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: (dir: number) => ({
      scale: dir > 0 ? 2.5 : 0.3,
      opacity: 0,
      filter: dir > 0 ? "blur(4px)" : "blur(8px)",
    }),
  };

  return (
    <div className="relative w-full h-screen overflow-hidden touch-none" onWheel={handleWheel} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-0 flex items-center justify-center"
          style={{ perspective: "1000px" }}
        >
          {slides[current].content}
        </motion.div>
      </AnimatePresence>

      {/* Back arrow */}
      {current > 0 && (
        <button
          onClick={() => goTo(current - 1)}
          className="absolute left-4 bottom-6 z-50 group"
          aria-label="Indietro"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-black drop-shadow-[0_0_8px_rgba(255,230,0,0.4)] group-hover:text-yellow-400 transition-colors duration-300">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {/* Forward arrow */}
      {current < slides.length - 1 && (
        <button
          onClick={() => goTo(current + 1)}
          className="absolute right-4 bottom-6 z-50 group"
          aria-label="Avanti"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-black drop-shadow-[0_0_8px_rgba(255,230,0,0.4)] group-hover:text-yellow-400 transition-colors duration-300">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

    </div>
  );
}
