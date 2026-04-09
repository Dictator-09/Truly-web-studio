"use client";

import React from "react";
import { motion } from "framer-motion";

const MiniSiteLayout = ({ isWireframe = false }: { isWireframe?: boolean }) => {
  const borderColor = isWireframe ? "border-white/20 border-dashed" : "border-white/5";
  const bgColor = isWireframe ? "bg-transparent" : "bg-white/5";
  const textColor = isWireframe ? "bg-white/10" : "bg-white/40";

  return (
    <div className={`p-4 h-full flex flex-col gap-4 font-manrope ${isWireframe ? "text-white/20" : "text-white/40"}`}>
      {/* Mini Navbar */}
      <div className={`h-6 w-full rounded-md border ${borderColor} flex items-center px-4 justify-between transition-colors`}>
        <div className={`w-12 h-2 rounded-full ${textColor}`} />
        <div className="flex gap-2">
          <div className={`w-8 h-2 rounded-full ${textColor}`} />
          <div className={`w-8 h-2 rounded-full ${textColor}`} />
        </div>
      </div>

      {/* Mini Hero */}
      <div className={`h-24 w-full rounded-md border ${borderColor} ${bgColor} flex flex-col justify-center px-6 gap-2 transition-colors`}>
        <div className={`w-2/3 h-4 rounded-full ${textColor}`} />
        <div className={`w-1/2 h-2 rounded-full ${textColor}`} />
      </div>

      {/* Mini Grid */}
      <div className="grid grid-cols-3 gap-3 flex-1">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`rounded-md border ${borderColor} ${bgColor} flex flex-col p-3 gap-2 transition-colors`}>
            <div className={`w-full h-8 rounded-sm ${textColor}`} />
            <div className={`w-3/4 h-2 rounded-full ${textColor}`} />
            <div className={`w-1/2 h-2 rounded-full ${textColor}`} />
          </div>
        ))}
      </div>

      {/* Mini Footer */}
      <div className={`h-4 w-full rounded-md border ${borderColor} flex items-center px-4 transition-colors`}>
        <div className={`w-16 h-1 rounded-full ${textColor}`} />
      </div>
    </div>
  );
};

export const HeroBrowserMock = () => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-10, 10] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      className="relative w-full max-w-2xl aspect-[4/3] rounded-xl border border-white/10 bg-[#0a0a0a] shadow-2xl overflow-hidden group/browser"
    >
      {/* Browser Bar */}
      <div className="h-10 w-full border-b border-white/5 bg-white/[0.02] flex items-center px-4 justify-between">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-white/10" />
          <div className="w-3 h-3 rounded-full bg-white/10" />
          <div className="w-3 h-3 rounded-full bg-white/10" />
        </div>
        <div className="flex-1 max-w-[240px] h-6 bg-white/[0.03] rounded-md border border-white/5 flex items-center px-3">
          <span className="text-[10px] text-white/20 font-medium tracking-wider font-manrope truncate">
            truly.web/ux-audit
          </span>
        </div>
        <div className="w-12" />
      </div>

      {/* Browser Content */}
      <div className="relative h-full">
        {/* Layer 0: Finished */}
        <div className="absolute inset-0">
          <MiniSiteLayout isWireframe={false} />
        </div>

        {/* Layer 1: Wireframe with Scanline Reveal */}
        <motion.div
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          whileHover={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{
            duration: 0.6,
            ease: [0.23, 1, 0.32, 1]
          }}
          className="absolute inset-0 bg-[#0a0a0a] z-10"
          style={{
            backdropFilter: "blur(20px)",
          }}
        >
          <MiniSiteLayout isWireframe={true} />
        </motion.div>
      </div>

      {/* Atmospheric Reflection */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/[0.02] to-transparent z-20" />
    </motion.div>
  );
};
