"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, useSpring, useTransform, useMotionValue, AnimatePresence, useVelocity } from "framer-motion";

/**
 * MagneticButton: A tactical wrapper that pulls towards the mouse
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
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Magnetic pull: Move 30% towards the cursor
    x.set((clientX - centerX) * 0.3);
    y.set((clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
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

  // 1. Mouse Coordinates
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // 2. Ultra-Viscous Springs (Liquid Feel)
  // Lower stiffness + higher damping = viscous momentum
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 80 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 80 });

  // 3. Velocity tracking for "Squash & Stretch"
  const xVelocity = useVelocity(smoothX);
  const yVelocity = useVelocity(smoothY);

  // Calculate "stretch" based on velocity
  const maskScaleX = useTransform(xVelocity, [-2, 2], [1.2, 1.2], { clamp: false });
  const maskScaleY = useTransform(yVelocity, [-2, 2], [0.8, 0.8], { clamp: false });

  // 4. MOTION TRANSFORMS
  const rotateX = useTransform(smoothY, [0, 1], ["5deg", "-5deg"]);
  const rotateY = useTransform(smoothX, [0, 1], ["-5deg", "5deg"]);

  const hudX = useTransform(smoothX, [0, 1], ["0%", "100%"]);
  const hudY = useTransform(smoothY, [0, 1], ["0%", "100%"]);

  // Mask Transform incorporating liquid distortion units (filter: liquid-distortion)
  const maskPosition = useTransform(
    [smoothX, smoothY],
    ([x, y]) => {
      const posX = (x as number) * 100;
      const posY = (y as number) * 100;
      return `radial-gradient(circle 280px at ${posX}% ${posY}%, black 0%, black 98%, transparent 100%)`;
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
      
      {/* SVG Liquid Displacement Filter Definition */}
      <svg className="hidden">
        <filter id="liquid-distortion">
          <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="30" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ rotateX, rotateY }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 1.8, ease: [0.23, 1, 0.32, 1] }}
        className="relative w-[92%] aspect-[21/9] max-w-7xl rounded-[40px] overflow-hidden border border-white/5 shadow-[0_0_150px_rgba(0,0,0,0.8)] group h-fit cursor-none"
      >
        {/* Layer 0: Deep Exterior */}
        <div className="absolute inset-0 z-0 scale-110">
          <img
            src="/hero-polished.png"
            alt="Polished Studio"
            className="w-full h-full object-cover grayscale-[0.4] contrast-150 saturate-0 opacity-60"
          />
        </div>

        {/* Layer 1: TECHNICAL REVEAL (Liquid Distortion applied here) */}
        <motion.div
          style={{
            maskImage: maskPosition,
            WebkitMaskImage: maskPosition,
            filter: isHovered ? "url(#liquid-distortion)" : "none"
          }}
          className="absolute inset-0 z-10 pointer-events-none transition-filter duration-1000"
        >
          <img
            src="/hero-technical.png"
            alt="Technical Blueprint"
            className="w-full h-full object-cover contrast-[1.8] saturate-[1.8]"
          />
          {/* Internal Scanlines */}
          <div className="absolute inset-0 opacity-30 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%),linear-gradient(90deg,rgba(0,255,255,0.05),rgba(255,0,255,0.02),rgba(0,255,255,0.05))] bg-[length:100%_4px,5px_100%]" />
        </motion.div>

        {/* Liquid Reveal Glow */}
        <motion.div
           style={{
             left: hudX,
             top: hudY,
             x: "-50%",
             y: "-50%",
             opacity: isHovered ? 0.8 : 0,
             scale: useTransform(xVelocity, [-1, 1], [0.9, 1.1]) // Velocity-based pulse
           }}
           className="absolute z-15 w-[600px] h-[600px] pointer-events-none transition-opacity duration-1000"
        >
           <div className="w-full h-full rounded-full border border-white/5 shadow-[inset_0_0_100px_rgba(255,255,255,0.05),0_0_200px_rgba(0,0,0,1)] bg-[radial-gradient(circle,transparent_85%,rgba(255,255,255,0.03)_100%)]" />
        </motion.div>

        {/* HUD UI Layer */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{ left: hudX, top: hudY, x: 60, y: 60 }}
              className="absolute z-50 pointer-events-none flex flex-col gap-3 font-mono"
            >
              <div className="flex flex-col border-l-2 border-white/30 pl-5 py-2">
                <span className="text-[11px] text-white/80 tracking-[0.5em] uppercase font-black italic">Truly_Scan.v3</span>
                <span className="text-[9px] text-white/30 tracking-[0.3em] font-mono leading-none mt-2 italic">Refraction: {isHovered ? "ENABLED" : "OFF"}</span>
              </div>
              
              <div className="flex gap-8 mt-1 ml-5">
                 <div className="flex flex-col gap-1">
                   <span className="text-[8px] text-white/20 uppercase tracking-[0.4em]">Coord_X</span>
                   <motion.span className="text-[11px] text-white/60 font-bold tracking-widest">{Math.floor(smoothX.get() * 1000)}</motion.span>
                 </div>
                 <div className="flex flex-col gap-1">
                   <span className="text-[8px] text-white/20 uppercase tracking-[0.4em]">Coord_Y</span>
                   <motion.span className="text-[11px] text-white/60 font-bold tracking-widest">{Math.floor(smoothY.get() * 1000)}</motion.span>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Weighted Cursor HUD */}
        <motion.div 
           style={{ 
             left: hudX,
             top: hudY,
             x: "-50%",
             y: "-50%",
             opacity: isHovered ? 1 : 0,
             scaleX: maskScaleX,
             scaleY: maskScaleY
           }}
           className="absolute z-50 pointer-events-none"
        >
           <div className="w-14 h-14 border-2 border-white/10 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-[2px]">
              <div className="w-2 h-2 bg-white shadow-[0_0_15px_white] rounded-full" />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-6px] border border-white/10 border-dashed rounded-full" 
              />
           </div>
        </motion.div>

        {/* Editorial Content */}
        <div className="absolute inset-0 z-30 flex flex-col justify-end p-24 gap-default">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col gap-4"
          >
             <div className="flex items-center gap-5">
               <span className="text-[10px] font-bold tracking-[1.2em] text-white/10 uppercase italic">Architectural_Visions</span>
               <div className="h-[1px] w-48 bg-white/5" />
             </div>
             <h1 className="text-[10vw] font-medium tracking-tighter text-white font-serif italic leading-[0.75] mix-blend-difference">
               The Architect.
             </h1>
          </motion.div>
          
          <div className="flex items-center gap-16 mt-12 mb-4">
            <MagneticButton className="h-20 px-16 glass rounded-full text-[12px] font-black tracking-[0.5em] uppercase text-white hover:bg-white hover:text-black transition-colors duration-1000 active:scale-90 group relative overflow-hidden">
               <span className="relative z-10 transition-transform duration-700 group-hover:translate-x-2 inline-block">Execute_Audit</span>
            </MagneticButton>
            
            <div className="flex flex-col gap-2">
               <div className="flex gap-3 h-1 w-24 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ x: ["-100%", "100%"] }} 
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-1/2 h-full bg-white/20" 
                  />
               </div>
               <span className="text-[9px] font-bold tracking-[0.5em] text-white/40 uppercase">System: Operational_v9.3</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
