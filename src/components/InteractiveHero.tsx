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

/* ------------------------------------------------------------------ */
/*  HeroContent — A premium mini-website rendered in two modes          */
/* ------------------------------------------------------------------ */
interface HeroContentProps {
  variant: "polished" | "wireframe";
  parallaxX?: MotionValue<number>;
  parallaxY?: MotionValue<number>;
}

const cardImages = ["/card-1.jpg", "/card-2.jpg", "/card-3.jpg"];
const cardLabels = ["Residential", "Interior", "Exterior"];

const HeroContent = ({ variant, parallaxX, parallaxY }: HeroContentProps) => {
  const isWire = variant === "wireframe";

  return (
    <div
      className={`absolute inset-0 flex flex-col ${
        isWire
          ? "bg-[#060609] bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:40px_40px]"
          : "bg-[#0c0c0f]"
      }`}
    >
      {/* ======== Sub-nav ======== */}
      <div
        className={`flex items-center justify-between px-8 py-5 border-b ${isWire ? "border-dashed border-white/[0.08]" : "border-white/[0.06]"
          }`}
      >
        {/* Left: brand */}
        <div className="flex items-center gap-3">
          {isWire ? (
            <div className="w-5 h-5 border border-dashed border-white/20 rounded-sm" />
          ) : (
            <div className="w-5 h-5 bg-white/80 rounded-sm" />
          )}
          <span
            className={`text-[10px] tracking-[0.3em] uppercase font-semibold ${isWire ? "text-white/20" : "text-white/70"
              }`}
          >
            {isWire ? "[ LOGO ]" : "Truly Web"}
          </span>
        </div>

        {/* Right: links */}
        <div className="flex items-center gap-6">
          {["Work", "Studio", "Contact"].map((l) => (
            <span
              key={l}
              className={`text-[9px] tracking-[0.2em] uppercase font-medium ${isWire
                  ? "text-white/15 border-b border-dashed border-white/10 pb-px"
                  : "text-white/40"
                }`}
            >
              {isWire ? `[ ${l.toUpperCase()} ]` : l}
            </span>
          ))}
        </div>
      </div>

      {/* ======== Hero body ======== */}
      <div className="flex-1 flex flex-col justify-center px-12 relative">
        {/* Wireframe annotations */}
        {isWire && (
          <>
            <span className="absolute left-2 top-[30%] text-[6px] text-white/[0.12] font-mono tracking-widest -rotate-90 origin-left">
              SECTION::HERO
            </span>
            <div className="absolute top-4 right-8 flex flex-col items-end gap-1">
              <span className="text-[6px] text-white/[0.12] font-mono">
                viewport: 1440×900
              </span>
              <span className="text-[6px] text-white/[0.12] font-mono">
                grid: 12-col
              </span>
            </div>
          </>
        )}

        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-5">
          <div
            className={`h-px w-10 ${isWire ? "bg-white/[0.08] border-t border-dashed border-white/10" : "bg-white/10"
              }`}
          />
          <span
            className={`text-[9px] tracking-[0.6em] uppercase font-semibold ${isWire ? "text-white/15" : "text-white/40"
              }`}
          >
            {isWire ? "// TAG_LINE" : "Design Studio — Est. 2026"}
          </span>
        </div>

        {/* Headline */}
        <h2
          className={`text-[clamp(42px,6vw,80px)] leading-[0.9] tracking-[-0.03em] font-light ${isWire ? "font-sans" : "font-serif italic"
            }`}
          style={
            isWire
              ? {
                WebkitTextStroke: "1px rgba(255,255,255,0.5)",
                color: "transparent",
              }
              : { color: "white" }
          }
        >
          {isWire ? (
            <>
              The
              <br />
              Architect.
            </>
          ) : (
            <>
              The
              <br />
              Architect.
            </>
          )}
        </h2>

        {/* Description */}
        <p
          className={`max-w-[340px] text-[11px] leading-[1.7] tracking-[0.01em] mt-5 ${isWire ? "text-white/[0.12] font-mono" : "text-white/35"
            }`}
        >
          {isWire
            ? "// p.body { max-width: 340px; font-size: 11px; line-height: 1.7; opacity: 0.35; }"
            : "Blending structure, light, and material into spaces that speak — architecture for the way you live."}
        </p>

        {/* CTA */}
        <div className="mt-7 flex items-center gap-5">
          <div
            className={`px-7 py-2.5 rounded-full border ${isWire
                ? "border-dashed border-white/[0.12]"
                : "border-white/[0.12] hover:border-white/25"
              } transition-colors`}
          >
            <span
              className={`text-[9px] tracking-[0.3em] uppercase font-semibold ${isWire ? "text-white/15" : "text-white/50"
                }`}
            >
              {isWire ? "[ CTA ]" : "View Work"}
            </span>
          </div>
          {isWire && (
            <span className="text-[6px] text-white/[0.08] font-mono">
              ← btn.primary
            </span>
          )}
        </div>
      </div>

      {/* ======== Bottom portfolio strip ======== */}
      <div
        className={`px-8 pb-6 pt-4 border-t ${isWire ? "border-dashed border-white/[0.08]" : "border-white/[0.06]"
          }`}
      >
        {/* Section header */}
        <div className="flex items-center justify-between mb-4">
          <span
            className={`text-[8px] tracking-[0.5em] uppercase font-semibold ${isWire ? "text-white/[0.12]" : "text-white/25"
              }`}
          >
            {isWire ? "// GALLERY_BLOCK" : "Featured Projects"}
          </span>
          <span
            className={`text-[8px] tracking-[0.2em] uppercase ${isWire ? "text-white/[0.1] font-mono" : "text-white/20"
              }`}
          >
            {isWire ? "03_ITEMS" : "See All →"}
          </span>
        </div>

        {/* Cards */}
        <div className="flex gap-3">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.15, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className={`flex-1 aspect-[3/2] rounded-lg overflow-hidden relative border ${isWire
                  ? "border-dashed border-white/[0.08]"
                  : "border-white/[0.04]"
                }`}
            >
              {isWire ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  {/* Cross-hatch */}
                  <svg
                    width="100%"
                    height="100%"
                    className="absolute inset-0 opacity-[0.15]"
                  >
                    <line x1="0" y1="0" x2="100%" y2="100%" stroke="white" strokeWidth="1" />
                    <line x1="100%" y1="0" x2="0" y2="100%" stroke="white" strokeWidth="1" />
                  </svg>
                  <span className="text-[7px] text-white/30 font-mono tracking-wider">
                    IMG_{String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[6px] text-white/[0.08] font-mono">
                    {`${360 * (i + 1)}×${240 * (i + 1)}`}
                  </span>
                </div>
              ) : (
                <>
                  <motion.img
                    src={cardImages[i]}
                    alt={cardLabels[i]}
                    className="w-full h-full object-cover origin-center scale-[1.12]"
                    style={{ 
                      x: parallaxX ? parallaxX : 0, 
                      y: parallaxY ? parallaxY : 0,
                      filter: "brightness(0.7) contrast(1.05)" 
                    }}
                  />
                  {/* Card label overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                    <span className="text-[8px] tracking-[0.3em] text-white/60 uppercase font-semibold">
                      {cardLabels[i]}
                    </span>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* ======== Wireframe footer annotation ======== */}
      {isWire && (
        <div className="absolute bottom-1.5 left-8 flex items-center gap-4">
          <span className="text-[6px] text-white/[0.08] font-mono tracking-wider">
            breakpoint: desktop / 1440px
          </span>
          <div className="h-px w-8 bg-white/[0.05]" />
          <span className="text-[6px] text-white/[0.08] font-mono tracking-wider">
            framework: next.js 16 / tailwind
          </span>
        </div>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Interactive Hero — Large reveal, persistent hover, Lando feel       */
/* ------------------------------------------------------------------ */
export const InteractiveHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  /* --- Mouse tracking (normalised 0→1) --- */
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  /* Snappy spring — fast response, slight weight */
  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 220 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 220 });

  /* Parallax offsets for the polished cards */
  const parallaxX = useTransform(smoothX, [0, 1], [-15, 15]);
  const parallaxY = useTransform(smoothY, [0, 1], [-15, 15]);

  const posX = useTransform(smoothX, [0, 1], ["0%", "100%"]);
  const posY = useTransform(smoothY, [0, 1], ["0%", "100%"]);

  /* Sharp-edged 700px spotlight — hard reveal with tight feather */
  const maskImage = useMotionTemplate`radial-gradient(700px circle at ${posX} ${posY}, black 0%, black 45%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.1) 78%, transparent 88%)`;

  /* Inverse dimming mask — polished layer gets darker under cursor */
  const dimMask = useMotionTemplate`radial-gradient(700px circle at ${posX} ${posY}, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 55%, transparent 80%)`;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseEnter = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    /* Persist the reveal for 1.2s after leaving — feels intentional */
    hoverTimeout.current = setTimeout(() => {
      setIsHovered(false);
    }, 1200);
  };

  return (
    <div className="relative w-full min-h-[80vh] bg-black overflow-hidden flex items-center justify-center px-6 py-10 select-none">
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.23, 1, 0.32, 1] }}
        className="relative w-full max-w-[1100px] aspect-[16/10] rounded-2xl overflow-hidden border border-white/[0.06] cursor-none"
      >
        {/* ======== Layer 0: Polished site (always visible) ======== */}
        <HeroContent variant="polished" parallaxX={parallaxX} parallaxY={parallaxY} />

        {/* ======== Dim overlay — darkens polished layer under cursor for contrast ======== */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: isHovered ? 0.15 : 0.6, ease: "easeOut" }}
          style={{
            background: dimMask,
          }}
          className="absolute inset-0 z-[5] pointer-events-none will-change-transform"
        />

        {/* ======== Layer 1: Wireframe (sharp radial spotlight reveal) ======== */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: isHovered ? 0.12 : 0.7, ease: "easeOut" }}
          style={{
            maskImage,
            WebkitMaskImage: maskImage,
            maskRepeat: "no-repeat",
            maskSize: "100% 100%",
          }}
          className="absolute inset-0 z-10 pointer-events-none will-change-transform"
        >
          <HeroContent variant="wireframe" />
        </motion.div>

        {/* ======== Technical Cursor ======== */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.15 }}
          style={{
            left: posX,
            top: posY,
            x: "-50%",
            y: "-50%",
          }}
          className="absolute z-50 pointer-events-none mix-blend-difference"
        >
          <div className="w-12 h-12 border border-white/30 rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </div>
        </motion.div>

        {/* ======== Cursor label ======== */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              style={{
                left: posX,
                top: posY,
                x: 40,
                y: 40,
              }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="absolute z-50 pointer-events-none"
            >
              <div className="border-l border-white/20 pl-2.5 py-0.5">
                <span className="text-[8px] tracking-[0.3em] text-white/50 uppercase font-semibold block">
                  Wireframe
                </span>
                <span className="text-[6px] tracking-[0.15em] text-white/20 uppercase font-mono block">
                  Structural View
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
