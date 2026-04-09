"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useTransform, useMotionValue, AnimatePresence } from "framer-motion";

/**
 * MagneticButton: Tactile magnetic interaction
 */
const MagneticButton = ({ children, className }: { children: React.ReactNode; className: string }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    x.set((clientX - (left + width / 2)) * 0.35);
    y.set((clientY - (top + height / 2)) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0); y.set(0);
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

export const InteractiveHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 1. Mouse Coordinates (Normalized)
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // 2. Viscous Springs
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 80 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 80 });

  // 3. MOTION TRANSFORMS
  const rotateX = useTransform(smoothY, [0, 1], ["4deg", "-4deg"]);
  const rotateY = useTransform(smoothX, [0, 1], ["-4deg", "4deg"]);

  // Mask Position (Percentages)
  const maskX = useTransform(smoothX, [0, 1], ["0%", "100%"]);
  const maskY = useTransform(smoothY, [0, 1], ["0%", "100%"]);

  // Organic Mask Strategy (CSS Gradient + SVG Displacement Filter)
  const maskImage = useTransform(
    [smoothX, smoothY],
    ([x, y]) => {
      const px = (x as number) * 100;
      const py = (y as number) * 100;
      // The 'filter: url(#liquid-distortion)' applied to the DIV will make this 'irregular'
      return `radial-gradient(circle 280px at ${px}% ${py}%, black 0%, black 90%, transparent 100%)`;
    }
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <div className="relative w-full h-[85vh] bg-black overflow-hidden flex items-center justify-center perspective-2000">
      
      {/* SVG FILTERS: Create the 'Irregular' Blob & Liquid feel */}
      <svg className="absolute w-0 h-0 hidden">
        <defs>
          <filter id="liquid-distortion">
            {/* Creates organic irregularity on the edges of any container it's applied to */}
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" seed="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="50" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ rotateX, rotateY }}
        whileHover={{ scale: 1.015 }}
        transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
        className="relative w-[92%] aspect-[21/9] max-w-7xl rounded-[44px] overflow-hidden border border-white/5 shadow-[0_0_120px_rgba(0,0,0,0.8)] group h-fit cursor-none"
      >
        {/* Layer 0: MONOLITHIC EXTERIOR */}
        <div className="absolute inset-0 z-0 scale-105">
          <img
            src="/hero-polished.png"
            alt="Polished Studio"
            className="w-full h-full object-cover grayscale opacity-70 contrast-125 saturate-50 transition-all duration-1000 group-hover:opacity-60"
          />
        </div>

        {/* Layer 1: TECHNICAL REVEAL (Masked + Distorted for Irregularity) */}
        <motion.div
           style={{
             maskImage: maskImage,
             WebkitMaskImage: maskImage,
             filter: isHovered ? "url(#liquid-distortion)" : "none",
             opacity: isHovered ? 1 : 0
           }}
           className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-700"
        >
          <img
            src="/hero-technical.png"
            alt="Technical Blueprint"
            className="w-full h-full object-cover contrast-[1.8] saturate-[1.8]"
          />
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(0,255,255,0.05)_50%,transparent_50%)] bg-[length:100%_4px]" />
        </motion.div>

        {/* HUD UI Layer (Fades on hover) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              style={{ left: maskX, top: maskY, x: 80, y: 50 }}
              className="absolute z-50 pointer-events-none flex flex-col gap-3 font-mono"
            >
              <div className="border-l-2 border-white/20 pl-4 py-1">
                 <span className="text-[10px] text-white/60 tracking-[0.5em] font-bold uppercase transition-all whitespace-nowrap">
                   Audit_Vision // Irregular_Scan
                 </span>
              </div>
              <div className="flex gap-10 mt-1 ml-4 text-[9px] text-white/20 uppercase tracking-[0.4em]">
                 <span>X: {Math.floor(smoothX.get() * 1000)}</span>
                 <span>Y: {Math.floor(smoothY.get() * 1000)}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Custom Central Cursor UI */}
        <motion.div 
           animate={{ 
             opacity: isHovered ? 1 : 0,
             scale: isHovered ? 1 : 0 
           }}
           style={{ left: maskX, top: maskY, x: "-50%", y: "-50%" }}
           className="absolute z-50 pointer-events-none"
        >
           <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-sm">
              <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_15px_white]" />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-6px] border border-white/10 border-dashed rounded-full" 
              />
           </div>
        </motion.div>

        {/* Editorial Content */}
        <div className="absolute inset-0 z-30 flex flex-col justify-end p-28 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col gap-6"
          >
             <div className="flex items-center gap-6">
               <span className="text-[9px] font-black tracking-[1.4em] text-white/10 uppercase italic">Digital_Boutique</span>
               <div className="h-px w-40 bg-white/5" />
             </div>
             <h1 className="text-[11vw] font-medium tracking-tighter text-white font-serif italic leading-[0.7] mix-blend-screen drop-shadow-2xl">
               The Architect.
             </h1>
          </motion.div>
          
          <div className="flex items-center gap-16 mb-2">
            <MagneticButton className="h-20 px-16 rounded-full glass border border-white/5 text-[11px] font-black tracking-[0.6em] uppercase text-white hover:bg-white hover:text-black transition-all duration-1000 active:scale-95 group relative overflow-hidden">
               <span className="relative z-10 group-hover:translate-x-2 transition-transform inline-block italic">Begin_Session</span>
            </MagneticButton>
            
            <div className="flex flex-col gap-1 mt-4">
               <span className="text-[8px] text-white/10 uppercase tracking-[0.4em] font-bold">Revision</span>
               <span className="text-[10px] text-white/30 font-mono tracking-widest">v9.4.2 // ORGANIC</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
