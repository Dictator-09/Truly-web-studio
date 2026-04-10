"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useSpring,
  useTransform,
  useMotionValue,
  AnimatePresence,
  useMotionTemplate,
} from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Shared "website" layout — rendered once polished, once as wireframe */
/* ------------------------------------------------------------------ */
interface HeroContentProps {
  variant: "polished" | "wireframe";
}

const HeroContent = ({ variant }: HeroContentProps) => {
  const isWire = variant === "wireframe";

  /* ---------- token shorthand ---------- */
  const text = isWire ? "text-white/30" : "text-white";
  const textMuted = isWire ? "text-white/15" : "text-white/50";
  const border = isWire ? "border-dashed border-white/20" : "border-white/10";
  const cardBg = isWire ? "bg-transparent" : "bg-white/[0.04]";
  const headlineStyle = isWire
    ? "text-transparent font-serif italic"
    : "text-white font-serif italic";
  const headlineStroke: React.CSSProperties = isWire
    ? { WebkitTextStroke: "1.5px rgba(255,255,255,0.25)", color: "transparent" }
    : {};

  /* wireframe grid overlay */
  const gridBg = isWire
    ? "bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"
    : "";

  return (
    <div className={`absolute inset-0 flex flex-col ${gridBg}`}>
      {/* ---- Inner sub-nav row ---- */}
      <div
        className={`flex items-center justify-between px-10 pt-8 pb-4 border-b ${border}`}
      >
        <span
          className={`text-[9px] tracking-[0.5em] uppercase font-bold ${textMuted}`}
        >
          {isWire ? "[ NAV ]" : "Truly Web"}
        </span>

        <div className={`flex gap-8 ${textMuted}`}>
          {["Collections", "Spaces", "About", "Journal", "Contact"].map(
            (l) => (
              <span
                key={l}
                className={`text-[9px] tracking-[0.25em] uppercase font-semibold ${
                  isWire ? "border-b border-dashed border-white/15 pb-0.5" : ""
                }`}
              >
                {isWire ? `[ ${l.substring(0, 4)} ]` : l}
              </span>
            )
          )}
        </div>
      </div>

      {/* ---- Main content area ---- */}
      <div className="flex-1 flex flex-col justify-center items-center px-10 relative">
        {/* Dimension annotations for wireframe */}
        {isWire && (
          <>
            <span className="absolute left-3 top-1/4 text-[7px] text-white/15 font-mono tracking-wider -rotate-90">
              H: 540px
            </span>
            <span className="absolute top-3 left-1/4 text-[7px] text-white/15 font-mono tracking-wider">
              W: 1280px
            </span>
          </>
        )}

        {/* Hero headline */}
        <div className="flex flex-col items-center gap-3 text-center">
          <span
            className={`text-[10px] tracking-[0.8em] uppercase font-bold ${textMuted}`}
          >
            {isWire ? "// HEADER_BLOCK" : "Architectural Design Studio"}
          </span>
          <h1
            className={`text-[9vw] leading-[0.85] tracking-tighter ${headlineStyle}`}
            style={headlineStroke}
          >
            The Architect.
          </h1>
          <p
            className={`max-w-md text-[11px] leading-relaxed tracking-wide ${textMuted} mt-2`}
          >
            {isWire
              ? "// body_copy { max-w: 420px; font: 11px/1.6; }"
              : "Blending structural aesthetics, design, and substance for the modern dwelling."}
          </p>
        </div>

        {/* CTA row */}
        <div className="mt-8 flex items-center gap-6">
          <div
            className={`px-8 py-3 rounded-full border ${border} ${
              isWire ? "border-dashed" : ""
            }`}
          >
            <span
              className={`text-[9px] tracking-[0.4em] uppercase font-bold ${
                isWire ? "text-white/20" : "text-white/60"
              }`}
            >
              {isWire ? "[ BTN ]" : "View Collections"}
            </span>
          </div>
          {isWire && (
            <span className="text-[7px] text-white/15 font-mono">
              ← CTA_PRIMARY
            </span>
          )}
        </div>
      </div>

      {/* ---- Bottom cards row ---- */}
      <div
        className={`flex gap-4 px-10 pb-8 pt-4 border-t ${border}`}
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`flex-1 aspect-[4/3] rounded-xl border ${border} ${cardBg} overflow-hidden relative`}
          >
            {isWire ? (
              /* Wireframe: cross-hatch + dimension label */
              <div className="absolute inset-0 flex items-center justify-center">
                {/* diagonal cross lines */}
                <div className="absolute inset-0 opacity-[0.08]">
                  <svg width="100%" height="100%" className="absolute inset-0">
                    <line
                      x1="0"
                      y1="0"
                      x2="100%"
                      y2="100%"
                      stroke="white"
                      strokeWidth="0.5"
                    />
                    <line
                      x1="100%"
                      y1="0"
                      x2="0"
                      y2="100%"
                      stroke="white"
                      strokeWidth="0.5"
                    />
                  </svg>
                </div>
                <span className="text-[8px] text-white/20 font-mono tracking-wider">
                  IMG_{i}
                </span>
              </div>
            ) : (
              /* Polished: background image */
              <img
                src="/bg-hero.webp"
                alt={`Project ${i}`}
                className="w-full h-full object-cover"
                style={{
                  objectPosition:
                    i === 1 ? "center" : i === 2 ? "left" : "right",
                  filter: "brightness(0.6) contrast(1.1)",
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* ---- Wireframe footer annotation ---- */}
      {isWire && (
        <div className="absolute bottom-2 right-4 text-[7px] text-white/10 font-mono tracking-wider">
          grid: 12-col / 40px gutter / max-w: 1280px
        </div>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Interactive Hero Container — Lando Norris-style radial reveal       */
/* ------------------------------------------------------------------ */
export const InteractiveHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  /* --- Mouse tracking (normalised 0→1) --- */
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  /* Lando-style inertia: heavy spring = the mask "chases" the cursor */
  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 200 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 200 });

  const posX = useTransform(smoothX, [0, 1], ["0%", "100%"]);
  const posY = useTransform(smoothY, [0, 1], ["0%", "100%"]);

  /* --- Radial mask for revealing the wireframe layer --- */
  const maskImage = useMotionTemplate`radial-gradient(380px circle at ${posX} ${posY}, black 0%, transparent 75%)`;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <div className="relative w-full min-h-[80vh] bg-black overflow-hidden flex items-center justify-center px-6 py-10 select-none">
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ scale: 0.97, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.23, 1, 0.32, 1] }}
        className="relative w-full max-w-6xl aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 cursor-none bg-[#0a0a0a]"
      >
        {/* ======== Layer 0: Polished site (always visible) ======== */}
        <HeroContent variant="polished" />

        {/* ======== Layer 1: Wireframe (revealed via radial mask) === */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{
            maskImage,
            WebkitMaskImage: maskImage,
            maskRepeat: "no-repeat",
            maskSize: "100% 100%",
          }}
          className="absolute inset-0 z-10 pointer-events-none will-change-transform bg-[#050508]"
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
          className="absolute z-50 pointer-events-none"
        >
          {/* Outer ring */}
          <div className="w-14 h-14 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <div className="w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,0.5)]" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-[-8px] border border-white/[0.06] border-dashed rounded-full"
            />
          </div>
        </motion.div>

        {/* ======== Cursor label (follows mouse, offset) ======== */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{
                left: posX,
                top: posY,
                x: 50,
                y: 50,
              }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="absolute z-50 pointer-events-none"
            >
              <div className="border-l border-white/30 pl-3 py-1">
                <span className="text-[9px] tracking-[0.35em] text-white/60 uppercase font-bold">
                  Wireframe
                </span>
                <p className="text-[7px] tracking-[0.2em] text-white/25 uppercase font-mono">
                  Structural_View
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
