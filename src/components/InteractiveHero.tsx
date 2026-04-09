"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { gsap } from "gsap";
import Image from "next/image";

export const InteractiveHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Framer Motion values for 3D Parallax Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

  // GSAP for Smoothed Mask Follow (LERP)
  useEffect(() => {
    if (!maskRef.current || !containerRef.current) return;

    // quickTo is highly optimized for 60fps tracking
    const xSetter = gsap.quickTo(maskRef.current, "--mask-x", { duration: 0.8, ease: "power3.out" });
    const ySetter = gsap.quickTo(maskRef.current, "--mask-y", { duration: 0.8, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;

      // Update GSAP Mask position (Percentage for CSS mask-image)
      xSetter((px / rect.width) * 100);
      ySetter((py / rect.height) * 100);

      // Update Parallax Tilt (Normalized -0.5 to 0.5)
      x.set((e.clientX - (rect.left + rect.width / 2)) / rect.width);
      y.set((e.clientY - (rect.top + rect.height / 2)) / rect.height);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center perspective-1000">
      <motion.div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ rotateX, rotateY }}
        className="relative w-[90%] aspect-video max-w-7xl rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] group h-fit"
      >
        {/* Layer 0: Polished Studio Exterior */}
        <div className="absolute inset-0 z-0">
          <img
            src="/Users/pratyaksh/.gemini/antigravity/brain/7095f083-9d6f-4a79-8546-115e398c833a/hero_polished_landscape_1775751477121.png"
            alt="Polished Studio"
            className="w-full h-full object-cover grayscale-[0.2] contrast-110"
          />
        </div>

        {/* Layer 1: Technical Blueprint Reveal (Masked) */}
        <div
          ref={maskRef}
          style={{
            maskImage: `radial-gradient(circle 250px at var(--mask-x, 50%) var(--mask-y, 50%), black 100%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle 250px at var(--mask-x, 50%) var(--mask-y, 50%), black 100%, transparent 100%)`,
          }}
          className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-500"
        >
          <img
            src="/Users/pratyaksh/.gemini/antigravity/brain/7095f083-9d6f-4a79-8546-115e398c833a/hero_technical_blueprint_1775751587086.png"
            alt="Technical Blueprint"
            className="w-full h-full object-cover"
          />
          
          {/* Scanning Line at Mask Edge (Optional Cinematic Detail) */}
          <div 
             className="absolute top-0 left-0 w-full h-full pointer-events-none mix-blend-screen opacity-20"
             style={{
               backgroundImage: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1) 50%, transparent 100%)',
               maskImage: 'inherit'
             }}
          />
        </div>

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
               Revision: v9.1.4
            </span>
          </div>
        </div>
      </motion.div>

      {/* Floating Technical Specs (Lando-style ambient UI) */}
      <div className="absolute top-32 left-32 flex flex-col gap-1 z-40 pointer-events-none">
          <span className="text-[9px] text-white/10 tracking-[0.5em] font-mono">X_COORD: {Math.floor(x.get() * 1000)}</span>
          <span className="text-[9px] text-white/10 tracking-[0.5em] font-mono">Y_COORD: {Math.floor(y.get() * 1000)}</span>
      </div>
    </div>
  );
};
