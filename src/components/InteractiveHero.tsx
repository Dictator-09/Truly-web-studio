"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useSpring,
  useTransform,
  useMotionValue,
  AnimatePresence,
  useMotionTemplate,
  MotionValue,
} from "framer-motion";
import { ContainerScroll } from "./ui/container-scroll-animation";

/* ------------------------------------------------------------------ */
/*  HeroContent — Same polished / wireframe dual‑layer                  */
/* ------------------------------------------------------------------ */
interface HeroContentProps {
  variant: "polished" | "wireframe";
  parallaxX?: MotionValue<number>;
  parallaxY?: MotionValue<number>;
}

const HeroContent = ({ variant, parallaxX, parallaxY }: HeroContentProps) => {
  const isWire = variant === "wireframe";

  return (
    <div
      className={`absolute inset-0 flex flex-col overflow-hidden ${
        isWire
          ? "bg-[#060609] bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:40px_40px]"
          : "bg-[#0c0c0f]"
      }`}
    >
      {/* Sub-nav */}
      <div className={`flex items-center justify-between px-8 py-4 border-b shrink-0 ${isWire ? "border-dashed border-white/[0.08]" : "border-white/[0.06]"}`}>
        <div className="flex items-center gap-3">
          {isWire
            ? <div className="w-4 h-4 border border-dashed border-white/20 rounded-sm" />
            : <div className="w-4 h-4 bg-white/80 rounded-sm" />}
          <span className={`text-[10px] tracking-[0.3em] uppercase font-semibold ${isWire ? "text-white/20" : "text-white/70"}`}>
            {isWire ? "[ LOGO ]" : "Truly Web"}
          </span>
        </div>
        <div className="flex items-center gap-6">
          {["Work", "Studio", "Contact"].map((l) => (
            <span key={l} className={`text-[9px] tracking-[0.2em] uppercase font-medium ${isWire ? "text-white/15" : "text-white/40"}`}>
              {isWire ? `[ ${l.toUpperCase()} ]` : l}
            </span>
          ))}
        </div>
      </div>

      {/* Hero body */}
      <div className="flex-1 flex flex-col lg:flex-row items-center gap-8 px-10 py-8 relative overflow-hidden">
        {/* Left: text */}
        <div className="flex-1 flex flex-col justify-center">
          {isWire && (
            <span className="absolute left-2 top-[30%] text-[6px] text-white/[0.12] font-mono tracking-widest -rotate-90 origin-left">
              SECTION::HERO
            </span>
          )}
          <div className="flex items-center gap-3 mb-4">
            <div className={`h-px w-8 ${isWire ? "border-t border-dashed border-white/10" : "bg-white/10"}`} />
            <span className={`text-[9px] tracking-[0.5em] uppercase font-semibold ${isWire ? "text-white/15" : "text-white/40"}`}>
              {isWire ? "// TAG_LINE" : "Design Studio — Est. 2026"}
            </span>
          </div>
          <h2
            className={`text-[clamp(32px,4.5vw,68px)] leading-[0.88] tracking-[-0.04em] font-light ${isWire ? "font-sans" : "font-serif italic"}`}
            style={isWire ? { WebkitTextStroke: "1px rgba(255,255,255,0.5)", color: "transparent" } : { color: "white" }}
          >
            The<br />Architect.
          </h2>
          <p className={`max-w-[320px] text-[11px] leading-[1.7] mt-4 ${isWire ? "text-white/[0.12] font-mono" : "text-white/35"}`}>
            {isWire
              ? "// p.body { max-width:320px; font-size:11px; line-height:1.7; }"
              : "Blending structure, logic, and material into digital spaces that speak."}
          </p>
          <div className="mt-6 flex items-center gap-5">
            <div className={`px-6 py-2 rounded-full border ${isWire ? "border-dashed border-white/[0.12]" : "border-white/[0.12]"}`}>
              <span className={`text-[9px] tracking-[0.3em] uppercase font-semibold ${isWire ? "text-white/15" : "text-white/50"}`}>
                {isWire ? "[ CTA ]" : "View Work"}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Cards */}
        <div className="flex-1 flex gap-3 h-full max-h-[220px]">
          {["/card-1.jpg", "/card-2.jpg", "/card-3.jpg"].map((src, i) => (
            <div key={i} className={`flex-1 rounded-lg overflow-hidden relative border ${isWire ? "border-dashed border-white/[0.08]" : "border-white/[0.04]"}`}>
              {isWire ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                  <svg width="100%" height="100%" className="absolute inset-0 opacity-[0.12]">
                    <line x1="0" y1="0" x2="100%" y2="100%" stroke="white" strokeWidth="1" />
                    <line x1="100%" y1="0" x2="0" y2="100%" stroke="white" strokeWidth="1" />
                  </svg>
                  <span className="text-[7px] text-white/30 font-mono">IMG_{String(i + 1).padStart(2, "0")}</span>
                </div>
              ) : (
                <>
                  <motion.img
                    src={src}
                    alt={`Project ${i+1}`}
                    className="w-full h-full object-cover scale-[1.1]"
                    style={{ x: parallaxX ?? 0, y: parallaxY ?? 0, filter: "brightness(0.7) contrast(1.05)" }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                    <span className="text-[8px] tracking-[0.3em] text-white/60 uppercase font-semibold">
                      {["Residential", "Interior", "Exterior"][i]}
                    </span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer strip */}
      <div className={`px-8 py-3 border-t shrink-0 ${isWire ? "border-dashed border-white/[0.08]" : "border-white/[0.04]"}`}>
        <div className="flex items-center justify-between">
          <span className={`text-[8px] tracking-[0.4em] uppercase font-semibold ${isWire ? "text-white/[0.10]" : "text-white/20"}`}>
            {isWire ? "// Featured Projects" : "Featured Projects"}
          </span>
          <span className={`text-[8px] tracking-[0.2em] uppercase ${isWire ? "text-white/[0.08] font-mono" : "text-white/15"}`}>
            {isWire ? "breakpoint: desktop / 1440px" : "See All →"}
          </span>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  InteractiveHero — ContainerScroll + wireframe hover reveal          */
/* ------------------------------------------------------------------ */
export const InteractiveHero = () => {
  const screenRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 220 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 220 });

  const parallaxX = useTransform(smoothX, [0, 1], [-12, 12]);
  const parallaxY = useTransform(smoothY, [0, 1], [-12, 12]);

  const posX = useTransform(smoothX, [0, 1], ["0%", "100%"]);
  const posY = useTransform(smoothY, [0, 1], ["0%", "100%"]);

  const maskImage = useMotionTemplate`radial-gradient(600px circle at ${posX} ${posY}, black 0%, black 40%, rgba(0,0,0,0.6) 58%, rgba(0,0,0,0.1) 75%, transparent 86%)`;
  const dimMask   = useMotionTemplate`radial-gradient(600px circle at ${posX} ${posY}, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.12) 52%, transparent 78%)`;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!screenRef.current) return;
    const rect = screenRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseEnter = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => setIsHovered(false), 1200);
  };

  return (
    <div className="w-full">
      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-10 bg-white/20" />
              <span className="text-[10px] tracking-[0.6em] uppercase font-mono text-white/50">[ Studio.2026 ]</span>
              <div className="h-px w-10 bg-white/20" />
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-bold tracking-[-0.05em] text-white leading-[0.88]">
              The <br />
              <span className="font-serif italic font-normal text-white/40">Architect.</span>
            </h1>
            <p className="mt-8 text-white/40 font-light text-base md:text-lg max-w-md leading-relaxed">
              Blending structure, advanced logic, and material into digital spaces that speak — architecture for the modern web.
            </p>
          </div>
        }
      >
        {/* The "screen" — hover interaction lives here */}
        <div
          ref={screenRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative w-full h-full overflow-hidden cursor-none"
        >
          {/* Layer 0: Polished (always visible) */}
          <HeroContent variant="polished" parallaxX={parallaxX} parallaxY={parallaxY} />

          {/* Dim overlay under cursor */}
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: isHovered ? 0.15 : 0.6, ease: "easeOut" }}
            style={{ background: dimMask }}
            className="absolute inset-0 z-[5] pointer-events-none will-change-transform"
          />

          {/* Layer 1: Wireframe (spotlight reveal) */}
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: isHovered ? 0.12 : 0.7, ease: "easeOut" }}
            style={{ maskImage, WebkitMaskImage: maskImage, maskRepeat: "no-repeat", maskSize: "100% 100%" }}
            className="absolute inset-0 z-10 pointer-events-none will-change-transform"
          >
            <HeroContent variant="wireframe" />
          </motion.div>

          {/* Technical cursor ring */}
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.15 }}
            style={{ left: posX, top: posY, x: "-50%", y: "-50%" }}
            className="absolute z-50 pointer-events-none mix-blend-difference"
          >
            <div className="w-10 h-10 border border-white/40 rounded-full flex items-center justify-center">
              <div className="w-1 h-1 bg-white rounded-full" />
            </div>
          </motion.div>

          {/* Cursor label */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                style={{ left: posX, top: posY, x: 32, y: 32 }}
                transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                className="absolute z-50 pointer-events-none"
              >
                <div className="border-l border-white/20 pl-2 py-0.5">
                  <span className="text-[8px] tracking-[0.3em] text-white/50 uppercase font-semibold block">Wireframe</span>
                  <span className="text-[6px] tracking-[0.15em] text-white/20 uppercase font-mono block">Structural View</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ContainerScroll>
    </div>
  );
};
