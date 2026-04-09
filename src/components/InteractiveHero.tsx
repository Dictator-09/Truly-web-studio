"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import Image from "next/image";

export const InteractiveHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse Coordinates (normalized 0-1)
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Smooth Springs for LERP trailing effect
  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 150 });
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 150 });

  // 3D Parallax Tilt (Calculated from smooth springs)
  const rotateX = useTransform(smoothY, [0, 1], ["3deg", "-3deg"]);
  const rotateY = useTransform(smoothX, [0, 1], ["-3deg", "3deg"]);

  // Mask Transform
  const maskPosition = useTransform(
    [smoothX, smoothY],
    ([x, y]) => {
      // Convert normalized 0-1 to percentage
      const posX = (x as number) * 100;
      const posY = (y as number) * 100;
      return `radial-gradient(circle 250px at ${posX}% ${posY}%, black 100%, transparent 100%)`;
    }
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Normalize coordinates to 0-1
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center perspective-1000">
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ rotateX, rotateY }}
        className="relative w-[90%] aspect-video max-w-7xl rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] group h-fit cursor-none"
      >
        {/* Layer 0: Polished Studio Exterior */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-polished.png"
            alt="Polished Studio"
            className="w-full h-full object-cover grayscale-[0.2] contrast-110"
          />
        </div>

        {/* Layer 1: Technical Blueprint Reveal (Masked) */}
        <motion.div
          style={{
            maskImage: maskPosition,
            WebkitMaskImage: maskPosition,
          }}
          className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-500"
        >
          <img
            src="/hero-technical.png"
            alt="Technical Blueprint"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Custom Cinematic Cursor (Lando-style addition) */}
        <motion.div 
           style={{ 
             left: useTransform(smoothX, [0, 1], ["0%", "100%"]),
             top: useTransform(smoothY, [0, 1], ["0%", "100%"]),
             x: "-50%",
             y: "-50%"
           }}
           className="absolute z-50 pointer-events-none"
        >
           <div className="w-4 h-4 border border-white/40 rounded-full flex items-center justify-center">
              <div className="w-1 h-1 bg-white rounded-full" />
           </div>
        </motion.div>

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 pointer-events-none z-20 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        
        {/* Editorial Content */}
        <div className="absolute inset-0 z-30 flex flex-col justify-end p-20 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col gap-4"
          >
             <span className="text-[10px] font-bold tracking-[0.8em] text-white/40 uppercase">
                Digital_Craftsmanship // Studio_Core
             </span>
             <h1 className="text-8xl font-medium tracking-tight text-white font-serif italic">
               The Architect.
             </h1>
          </motion.div>
          
          <div className="flex items-center gap-12">
            <button className="h-14 px-10 glass rounded-full text-[11px] font-bold tracking-[0.3em] uppercase text-white hover:bg-white hover:text-black transition-all duration-500 active:scale-95">
              Begin_Audit
            </button>
            <div className="h-px w-24 bg-white/20" />
            <span className="text-[10px] font-bold tracking-[0.4em] text-white/20 uppercase">
               Revision: v9.1.5
            </span>
          </div>
        </div>
      </motion.div>

      {/* Floating Technical Specs */}
      <div className="absolute top-32 left-32 flex flex-col gap-1 z-40 pointer-events-none">
          <motion.span className="text-[9px] text-white/10 tracking-[0.5em] font-mono">
            SYNC_STATE: {isHovered ? "REVEAL_ACTIVE" : "IDLE"}
          </motion.span>
      </div>
    </div>
  );
};
