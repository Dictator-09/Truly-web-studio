"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useTransform, useMotionValue, AnimatePresence } from "framer-motion";
import Image from "next/image";

export const InteractiveHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse Coordinates (normalized 0-1)
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Smooth Springs for LERP trailing effect (Cinema-grade deceleration)
  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 120 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 120 });

  // 3D Parallax Tilt
  const rotateX = useTransform(smoothY, [0, 1], ["4deg", "-4deg"]);
  const rotateY = useTransform(smoothX, [0, 1], ["-4deg", "4deg"]);

  // Advanced Mask Transform (with Glow Edge)
  const maskPosition = useTransform(
    [smoothX, smoothY],
    ([x, y]) => {
      const posX = (x as number) * 100;
      const posY = (y as number) * 100;
      // Dual-gradient mask: One for the hard reveal, one for the soft glowing edge
      return `radial-gradient(circle 260px at ${posX}% ${posY}%, black 0%, black 98%, transparent 100%)`;
    }
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <div className="relative w-full h-[85vh] bg-black overflow-hidden flex items-center justify-center perspective-2000">
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ rotateX, rotateY }}
        whileHover={{ scale: 1.015 }}
        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        className="relative w-[92%] aspect-[21/9] max-w-7xl rounded-[40px] overflow-hidden border border-white/10 shadow-[0_0_120px_rgba(0,0,0,0.6)] group h-fit cursor-none"
      >
        {/* Layer 0: Polished Studio Exterior */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-polished.png"
            alt="Polished Studio"
            className="w-full h-full object-cover grayscale-[0.3] contrast-125 saturate-50 opacity-80"
          />
        </div>

        {/* Layer 1: Technical Blueprint Reveal (Masked) */}
        <motion.div
          style={{
            maskImage: maskPosition,
            WebkitMaskImage: maskPosition,
          }}
          className="absolute inset-0 z-10 pointer-events-none"
        >
          <img
            src="/hero-technical.png"
            alt="Technical Blueprint"
            className="w-full h-full object-cover contrast-150 saturate-150"
          />
          
          {/* Dynamic Scanline Overlay */}
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
        </motion.div>

        {/* Layer 2: Optical Glow Edge (Follows Cursor) */}
        <motion.div
           style={{
             left: useTransform(smoothX, [0, 1], ["0%", "100%"]),
             top: useTransform(smoothY, [0, 1], ["0%", "100%"]),
             x: "-50%",
             y: "-50%",
             opacity: isHovered ? 1 : 0
           }}
           className="absolute z-15 w-[520px] h-[520px] pointer-events-none transition-opacity duration-700"
        >
           <div className="w-full h-full rounded-full border border-white/10 shadow-[inset_0_0_50px_rgba(255,255,255,0.1),0_0_100px_rgba(0,0,0,1)] bg-[radial-gradient(circle,transparent_80%,rgba(255,255,255,0.05)_100%)]" />
        </motion.div>

        {/* CINEMATIC HUD (Lando-inspired technical metadata) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                left: useTransform(smoothX, [0, 1], ["0%", "100%"]),
                top: useTransform(smoothY, [0, 1], ["0%", "100%"]),
                x: 40,
                y: 40,
              }}
              className="absolute z-50 pointer-events-none flex flex-col gap-2 font-mono"
            >
              <div className="flex flex-col border-l border-white/20 pl-4 py-1">
                <span className="text-[10px] text-white/60 tracking-[0.4em] uppercase font-bold">Audit_Scan</span>
                <span className="text-[8px] text-white/20 tracking-[0.2em] font-mono leading-none mt-1">Status: Active_Vision</span>
              </div>
              
              <div className="flex gap-6 mt-2 ml-4">
                 <div className="flex flex-col">
                   <span className="text-[8px] text-white/10 uppercase tracking-widest">X:VAL</span>
                   <motion.span className="text-[10px] text-white/40">{Math.floor(smoothX.get() * 1000)}</motion.span>
                 </div>
                 <div className="flex flex-col">
                   <span className="text-[8px] text-white/10 uppercase tracking-widest">Y:VAL</span>
                   <motion.span className="text-[10px] text-white/40">{Math.floor(smoothY.get() * 1000)}</motion.span>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Custom Central Cursor UI */}
        <motion.div 
           style={{ 
             left: useTransform(smoothX, [0, 1], ["0%", "100%"]),
             top: useTransform(smoothY, [0, 1], ["0%", "100%"]),
             x: "-50%",
             y: "-50%",
             opacity: isHovered ? 1 : 0
           }}
           className="absolute z-50 pointer-events-none"
        >
           <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white shadow-[0_0_10px_white] rounded-full" />
              {/* Spinning technical detail */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-4px] border border-white/5 border-dashed rounded-full" 
              />
           </div>
        </motion.div>

        {/* Editorial Content Layer */}
        <div className="absolute inset-0 z-30 flex flex-col justify-end p-24 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col gap-6"
          >
             <div className="flex items-center gap-4">
               <span className="text-[9px] font-bold tracking-[1em] text-white/20 uppercase">System_Sync // 01</span>
               <div className="h-px w-32 bg-white/10" />
             </div>
             <h1 className="text-9xl font-medium tracking-tighter text-white font-serif italic leading-[0.8] drop-shadow-2xl">
               The Architect.
             </h1>
             <p className="max-w-md text-sm text-white/40 font-medium tracking-tight leading-relaxed mt-4">
                Revealing the technical infrastructure behind global visionaries. We build the digital backbone of visual excellence.
             </p>
          </motion.div>
          
          <div className="flex items-center gap-12 mt-4">
            <button className="h-16 px-12 glass rounded-full text-[11px] font-bold tracking-[0.4em] uppercase text-white hover:bg-white hover:text-black transition-all duration-700 active:scale-95 group">
              <span className="group-hover:translate-x-1 transition-transform inline-block">Execute_Deep_Audit</span>
            </button>
            <div className="flex flex-col gap-1">
               <span className="text-[9px] font-bold tracking-[0.4em] text-white/20 uppercase">Baseline</span>
               <span className="text-[10px] font-bold tracking-[0.2em] text-white/80 uppercase">Revision: v9.2.4</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
