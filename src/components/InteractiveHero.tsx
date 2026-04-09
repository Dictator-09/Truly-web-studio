"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useTransform, useMotionValue, AnimatePresence, useVelocity } from "framer-motion";

/**
 * MagneticButton: High-fidelity tactical interaction
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

  // 1. Position Tracking
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { damping: 45, stiffness: 85 });
  const smoothY = useSpring(mouseY, { damping: 45, stiffness: 85 });

  // 2. Velocity & Elasticity
  const xVelocity = useVelocity(smoothX);
  const yVelocity = useVelocity(smoothY);

  const maskScaleX = useTransform(xVelocity, [-3, 3], [1.1, 1.1], { clamp: false });
  const maskScaleY = useTransform(yVelocity, [-3, 3], [0.9, 0.9], { clamp: false });

  // 3. 3D Parallax
  const rotateX = useTransform(smoothY, [0, 1], ["4deg", "-4deg"]);
  const rotateY = useTransform(smoothX, [0, 1], ["-4deg", "4deg"]);

  // 4. Transform for Mask Positioning
  const maskTranslateX = useTransform(smoothX, [0, 1], ["-50%", "50%"]);
  const maskTranslateY = useTransform(smoothY, [0, 1], ["-50%", "50%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <div className="relative w-full h-[85vh] bg-black overflow-hidden flex items-center justify-center perspective-2000">
      
      {/* DEFINITION: Organic Blob Mask */}
      <svg className="absolute w-0 h-0 invisible">
        <defs>
          <filter id="soften">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
          </filter>
          <mask id="blob-mask">
             <motion.path
                animate={{
                   d: isHovered 
                    ? [
                      "M442,279.5Q447,309,425.5,331Q404,353,380.5,368.5Q357,384,332,402Q307,420,278.5,420.5Q250,421,220,412.5Q190,404,163.5,389.5Q137,375,123.5,350.5Q110,326,93.5,298.5Q77,271,84.5,242.5Q92,214,111,192Q130,170,147,143.5Q164,117,192,109.5Q220,102,248,93Q276,84,307,85.5Q338,87,364,103.5Q390,120,411.5,142Q433,164,435,193.5Q437,223,439.5,251.25Q442,279.5,442,279.5Z",
                      "M445.5,275Q457,300,432,324.5Q407,349,383.5,364Q360,379,332,389.5Q304,400,276,406.5Q248,413,222.5,399.5Q197,386,174,370.5Q151,355,143.5,331.5Q136,308,119,286Q102,264,108.5,238.5Q115,213,118.5,185.5Q122,158,150.5,145.5Q179,133,205.5,119.5Q232,106,263,109Q294,112,323,122Q352,132,374,153.5Q396,175,417,196.5Q438,218,436,246.5Q434,275,445.5,275Z",
                      "M442,279.5Q447,309,425.5,331Q404,353,380.5,368.5Q357,384,332,402Q307,420,278.5,420.5Q250,421,220,412.5Q190,404,163.5,389.5Q137,375,123.5,350.5Q110,326,93.5,298.5Q77,271,84.5,242.5Q92,214,111,192Q130,170,147,143.5Q164,117,192,109.5Q220,102,248,93Q276,84,307,85.5Q338,87,364,103.5Q390,120,411.5,142Q433,164,435,193.5Q437,223,439.5,251.25Q442,279.5,442,279.5Z",
                    ]
                    : "M442,279.5Q442,279.5,442,279.5Q442,279.5,442,279.5Q442,279.5,442,279.5Q442,279.5,442,279.5Q442,279.5,442,279.5Q442,279.5,442,279.5Q442,279.5,442,279.5Q442,279.5,442,279.5Q442,279.5,442,279.5Q442,279.5,442,279.5Q442,279.5,442,279.5Q442,279.5,442,279.5Q442,279.5,442,279.5Q442,279.5,442,279.5Q442,279.5,442,279.5Q442,279.5,442,279.5Q442,279.5,442,279.5Q442,279.5,442,279.5Z" // Shrunk state
                }}
                transition={{
                   d: { repeat: Infinity, duration: 8, ease: "easeInOut" },
                   default: { type: "spring", damping: 30, stiffness: 200 }
                }}
                fill="white"
                filter="url(#soften)"
             />
          </mask>
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
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-polished.png"
            alt="Polished Studio"
            className="w-full h-full object-cover grayscale opacity-70 contrast-125 transition-all duration-1000 group-hover:opacity-60"
          />
        </div>

        {/* Layer 1: TECHNICAL REVEAL (SVG Masked) */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          style={{
            maskImage: "url(#blob-mask)",
            WebkitMaskImage: "url(#blob-mask)",
            maskType: "alpha",
          }}
          className="absolute inset-0 z-10 pointer-events-none"
        >
          {/* Positioned Mask Element */}
          <motion.div
            style={{
              x: maskTranslateX,
              y: maskTranslateY,
              scaleX: maskScaleX,
              scaleY: maskScaleY,
              width: "100%",
              height: "100%",
              position: "absolute"
            }}
          >
             <svg viewBox="0 0 500 500" className="w-[1200px] h-[1200px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fill-black">
                <rect width="100%" height="100%" mask="url(#blob-mask)" />
             </svg>
          </motion.div>

          <img
            src="/hero-technical.png"
            alt="Technical Blueprint"
            className="w-full h-full object-cover grayscale-0 saturate-[1.8] contrast-[1.8]"
          />
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(rgba(0,255,255,0.05)_50%,transparent_50%)] bg-[length:100%_4px]" />
        </motion.div>

        {/* HUD UI Layer (Fades on hover only) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{
                left: useTransform(smoothX, [0, 1], ["0%", "100%"]),
                top: useTransform(smoothY, [0, 1], ["0%", "100%"]),
                x: 80,
                y: 50,
              }}
              className="absolute z-50 pointer-events-none flex flex-col gap-3 font-mono"
            >
              <div className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 bg-white animate-pulse" />
                 <span className="text-[10px] text-white/50 tracking-[0.5em] font-bold uppercase transition-all whitespace-nowrap">
                   Technical_Audit // Active
                 </span>
              </div>
              <div className="h-[1px] w-48 bg-white/10" />
              <div className="flex gap-10 mt-1">
                 <div className="flex flex-col">
                   <span className="text-[8px] text-white/10 uppercase tracking-[0.4em]">Axis_X</span>
                   <motion.span className="text-[10px] text-white/40">{Math.floor(smoothX.get() * 1000)}</motion.span>
                 </div>
                 <div className="flex flex-col">
                   <span className="text-[8px] text-white/10 uppercase tracking-[0.4em]">Axis_Y</span>
                   <motion.span className="text-[10px] text-white/40">{Math.floor(smoothY.get() * 1000)}</motion.span>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Custom Central Cursor UI */}
        <motion.div 
           animate={{ 
             opacity: isHovered ? 1 : 0,
             scale: isHovered ? 1 : 0.5 
           }}
           style={{ 
             left: useTransform(smoothX, [0, 1], ["0%", "100%"]),
             top: useTransform(smoothY, [0, 1], ["0%", "100%"]),
             x: "-50%",
             y: "-50%"
           }}
           className="absolute z-50 pointer-events-none"
        >
           <div className="w-12 h-12 border border-white/15 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-sm">
              <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_15px_white]" />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-6px] border border-white/5 border-dashed rounded-full" 
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
            <MagneticButton className="h-20 px-16 group relative overflow-hidden rounded-full glass border border-white/5 text-[11px] font-black tracking-[0.6em] uppercase text-white hover:bg-white hover:text-black transition-all duration-1000 active:scale-95">
               <span className="relative z-10 transition-transform duration-700 group-hover:translate-x-2 inline-block italic">Begin_Session</span>
            </MagneticButton>
            
            <div className="flex items-end gap-16 mt-4">
               <div className="flex flex-col gap-1">
                  <span className="text-[8px] text-white/10 uppercase tracking-[0.4em] font-bold">Latency</span>
                  <span className="text-[10px] text-white/30 font-mono">0.02ms</span>
               </div>
               <div className="flex flex-col gap-1">
                  <span className="text-[8px] text-white/10 uppercase tracking-[0.4em] font-bold">Revision</span>
                  <span className="text-[10px] text-white/30 font-mono tracking-widest">v9.4.0</span>
               </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
