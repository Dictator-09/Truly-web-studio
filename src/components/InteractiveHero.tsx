"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring, useTransform, useMotionValue, AnimatePresence, useMotionTemplate } from "framer-motion";

/**
 * Design Engineered Magnetic Button
 * Philosophy: Tactile feedback compounds into a feeling of craft.
 */
const MagneticButton = ({ children, className }: { children: React.ReactNode; className: string }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Custom easement: Starts fast, settles elegantly
  const springConfig = { stiffness: 450, damping: 30 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    x.set((clientX - (left + width / 2)) * 0.2);
    y.set((clientY - (top + height / 2)) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0); y.set(0);
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }} // Emil Principle: Buttons must feel responsive to press
      style={{ 
        x: springX, 
        y: springY,
        transition: "transform 0.2s cubic-bezier(0.23, 1, 0.32, 1)"
      }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

export const InteractiveHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 1. Precise Mouse Tracking (0 to 1)
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Emil Principle: Match motion to mood. Snappy for technical tools.
  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 450 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 450 });

  // 2. HUD & Cursor Progress (Percent mapping)
  const posX = useTransform(smoothX, [0, 1], ["0%", "100%"]);
  const posY = useTransform(smoothY, [0, 1], ["0%", "100%"]);

  // 3. Hyper-Stable CSS Masking
  // Replaces container transforms to prevent clipping at edges.
  const maskImage = useMotionTemplate`radial-gradient(450px circle at ${posX} ${posY}, black 0%, transparent 80%)`;
  const inverseMaskImage = useMotionTemplate`radial-gradient(450px circle at ${posX} ${posY}, transparent 0%, black 80%)`;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <div className="relative w-full h-[85vh] bg-black overflow-hidden flex items-center justify-center p-6 select-none">
      
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
        className="relative w-full aspect-[3/2] max-w-5xl rounded-[40px] overflow-hidden border border-white/10 shadow-3xl group cursor-none bg-black"
      >
        {/* Layer 0: THE DESIGN (Base Mockup) */}
        <motion.div 
          style={{
            maskImage: isHovered ? inverseMaskImage : "none",
            WebkitMaskImage: isHovered ? inverseMaskImage : "none",
            maskRepeat: "no-repeat",
            maskSize: "100% 100%",
          }}
          className="absolute inset-0 z-0"
        >
          <img
            src="/web-polished.png"
            alt="Polished Mockup"
            className="w-full h-full object-cover object-top opacity-70 contrast-125 transition-opacity duration-700 group-hover:opacity-85"
          />
        </motion.div>

        {/* Layer 1: THE SKELETON (Reveal Wireframe) */}
        {/* Fixed position layer with dynamic CSS mask positioning */}
        <motion.div
           animate={{ 
             opacity: isHovered ? 1 : 0
           }}
           transition={{ 
             duration: 0.25, 
             ease: [0.23, 1, 0.32, 1] 
           }}
           style={{
             maskImage: maskImage,
             WebkitMaskImage: maskImage,
             maskRepeat: "no-repeat",
             maskSize: "100% 100%",
           }}
           className="absolute inset-0 z-10 pointer-events-none will-change-transform"
        >
          <img
            src="/web-wireframe.png"
            alt="Architecture Wireframe"
            className="w-full h-full object-cover object-top grayscale contrast-[1.6] brightness-110"
          />
        </motion.div>

        {/* Floating HUD Label Removed */}


        {/* The Technical Cursor */}
        <motion.div 
           animate={{ opacity: isHovered ? 1 : 0 }}
           style={{ 
             left: posX, 
             top: posY, 
             x: "-50%", 
             y: "-50%" 
           }}
           className="absolute z-50 pointer-events-none"
        >
           <div className="w-16 h-16 border border-amber-500/40 rounded-full flex items-center justify-center bg-amber-500/5 backdrop-blur-xl shadow-2xl">
              <div className="w-3 h-3 bg-amber-400 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.6)]" />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-10px] border border-white/5 border-dashed rounded-full" 
              />
           </div>
        </motion.div>

        {/* HUD Elements: Corners - Removed as per request */}


        {/* CTA Section: Bottom Aligned */}
        <div className="absolute inset-x-0 bottom-10 px-12 z-40 flex justify-between items-end pointer-events-none">
          <div className="w-px h-px pointer-events-none" /> {/* Placeholder for removed CTA */}

          
          <div className="flex flex-col items-end gap-2 text-white/10 pointer-events-none">
             <div className="h-px w-24 bg-white/5" />
             <span className="text-[8px] tracking-[0.6em] font-serif italic">Est. 2026 // Studio</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
