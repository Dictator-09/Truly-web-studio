"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring, useTransform, useMotionValue, AnimatePresence } from "framer-motion";

/**
 * MagneticButton: Re-tuned for snappiness
 */
const MagneticButton = ({ children, className }: { children: React.ReactNode; className: string }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Snappier button springs
  const springX = useSpring(x, { stiffness: 350, damping: 25 });
  const springY = useSpring(y, { stiffness: 350, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    x.set((clientX - (left + width / 2)) * 0.25);
    y.set((clientY - (top + height / 2)) * 0.25);
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

  // 1. Snappy Mouse Tracking
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // High Stiffness (300) + Moderate Damping (35) = Snappy & Responsive
  const smoothX = useSpring(mouseX, { damping: 35, stiffness: 300 });
  const smoothY = useSpring(mouseY, { damping: 35, stiffness: 300 });

  // 2. Parallax
  const rotateX = useTransform(smoothY, [0, 1], ["3deg", "-3deg"]);
  const rotateY = useTransform(smoothX, [0, 1], ["-3deg", "3deg"]);

  // 3. Optimized Mask Mapping (CSS Percentages)
  const maskLeft = useTransform(smoothX, [0, 1], ["-20%", "120%"]);
  const maskTop = useTransform(smoothY, [0, 1], ["-20%", "120%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  // High-performance SVG Blob as a data URI for the irregular shape
  // This avoids DOM filter overhead.
  const blobMaskUrl = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23000' d='M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.8C87.1,14.6,81.7,29.2,73.5,41.4C65.3,53.6,54.4,63.4,41.9,71.8C29.4,80.2,14.7,87.2,-0.4,87.9C-15.5,88.6,-31,83.1,-44.6,75.4C-58.2,67.7,-69.9,57.8,-77.8,45.4C-85.7,33,-89.8,18.1,-90.1,2.8C-90.4,-12.4,-86.9,-27.9,-79.3,-41.2C-71.7,-54.5,-60.1,-65.6,-46.8,-73.3C-33.5,-81.1,-18.4,-85.4,-2.1,-81.8C14.2,-78.2,28.4,-66.6,44.7,-76.4Z' transform='translate(100 100)' /%3E%3C/svg%3E")`;

  return (
    <div className="relative w-full h-[85vh] bg-black overflow-hidden flex items-center justify-center perspective-2000">
      
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ rotateX, rotateY }}
        whileHover={{ scale: 1.012 }}
        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
        className="relative w-[92%] aspect-[21/9] max-w-7xl rounded-[40px] overflow-hidden border border-white/5 shadow-[0_0_120px_rgba(0,0,0,0.8)] group h-fit cursor-none"
      >
        {/* Layer 0: MONOLITHIC EXTERIOR (Fixed) */}
        <div className="absolute inset-0 z-0 scale-105">
          <img
            src="/hero-polished.png"
            alt="Polished Studio"
            className="w-full h-full object-cover grayscale opacity-60 contrast-125 saturate-50"
          />
        </div>

        {/* Layer 1: TECHNICAL REVEAL (Snappy Irregular Mask) */}
        <motion.div
           animate={{ 
             opacity: isHovered ? 1 : 0,
             scale: isHovered ? 1 : 0.8
           }}
           transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
           style={{
             maskImage: blobMaskUrl,
             WebkitMaskImage: blobMaskUrl,
             maskRepeat: "no-repeat",
             maskSize: "600px 600px",
             WebkitMaskSize: "600px 600px",
             maskPosition: "center", // We'll move the container instead for better perf
           }}
           className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
        >
           {/* The mask container that moves snappy */}
           <motion.div
             style={{
               position: "absolute",
               inset: "-200%", // Oversize to allow movement
               maskImage: blobMaskUrl,
               WebkitMaskImage: blobMaskUrl,
               maskRepeat: "no-repeat",
               maskSize: "700px 700px",
               WebkitMaskSize: "700px 700px",
               maskPosition: useTransform([smoothX, smoothY], ([x, y]) => `${(x as number) * 100}% ${(y as number) * 100}%`),
             }}
             className="w-full h-full"
           >
              <img
                src="/hero-technical.png"
                alt="Technical Blueprint"
                className="w-full h-full object-cover contrast-[1.8] saturate-[1.8] scale-110"
              />
           </motion.div>
        </motion.div>

        {/* HUD UI Layer (Snappy Position) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              style={{ 
                left: useTransform(smoothX, [0, 1], ["0%", "100%"]), 
                top: useTransform(smoothY, [0, 1], ["0%", "100%"]), 
                x: 80, 
                y: 50 
              }}
              className="absolute z-50 pointer-events-none flex flex-col gap-2 font-mono"
            >
              <div className="flex items-center gap-3 border-l-2 border-white/30 pl-4 py-1">
                 <span className="text-[10px] text-white/70 tracking-[0.4em] font-black uppercase whitespace-nowrap italic">
                   System_Scan // Snappy_v9.5
                 </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Custom Snappy Cursor */}
        <motion.div 
           animate={{ opacity: isHovered ? 1 : 0 }}
           style={{ 
             left: useTransform(smoothX, [0, 1], ["0%", "100%"]), 
             top: useTransform(smoothY, [0, 1], ["0%", "100%"]), 
             x: "-50%", 
             y: "-50%" 
           }}
           className="absolute z-50 pointer-events-none"
        >
           <div className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-sm">
              <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]" />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-4px] border border-white/10 border-dashed rounded-full" 
              />
           </div>
        </motion.div>

        {/* Editorial Content */}
        <div className="absolute inset-0 z-30 flex flex-col justify-end p-28 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col gap-6"
          >
             <div className="flex items-center gap-6">
               <span className="text-[9px] font-black tracking-[1.4em] text-white/20 uppercase italic underline decoration-white/10 underline-offset-8">Studio_Vision</span>
               <div className="h-px w-32 bg-white/10" />
             </div>
             <h1 className="text-[11vw] font-medium tracking-tighter text-white font-serif italic leading-[0.7] mix-blend-difference">
               The Architect.
             </h1>
          </motion.div>
          
          <div className="flex items-center gap-16 mb-2">
            <MagneticButton className="h-20 px-16 rounded-full glass border border-white/5 text-[11px] font-black tracking-[0.6em] uppercase text-white hover:bg-white hover:text-black transition-all duration-700 active:scale-95 group relative overflow-hidden">
               <span className="relative z-10 italic">Begin_Audit</span>
            </MagneticButton>
            
            <div className="flex flex-col gap-1 mt-4">
               <span className="text-[8px] text-white/20 uppercase tracking-[0.4em] font-bold">Revision</span>
               <span className="text-[10px] text-white/40 font-mono tracking-widest">v9.5.0 // SNAPPY</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
