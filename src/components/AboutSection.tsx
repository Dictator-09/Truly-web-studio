"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";

const AnimatedCounter = ({ value, label, suffix = "", isFloat = false }: { value: number, label: string, suffix?: string, isFloat?: boolean }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView || !nodeRef.current) return;
    const controls = animate(0, value, {
      duration: 2.5,
      ease: [0.23, 1, 0.32, 1],
      onUpdate(v) {
        if (nodeRef.current) {
          const displayValue = isFloat ? v.toFixed(1) : Math.floor(v);
          nodeRef.current.textContent = displayValue.toString() + suffix;
        }
      }
    });
    return () => controls.stop();
  }, [isInView, value, suffix, isFloat]);

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border-x border-white/[0.03]">
      <span 
        ref={nodeRef} 
        className="text-6xl md:text-8xl font-bold tracking-tighter text-white"
      >
        0
      </span>
      <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em] mt-4">{label}</span>
    </div>
  );
};

export const AboutSection = () => {
  return (
    <section id="about" className="relative w-full bg-[#050505] py-64 px-10 md:px-20 lg:px-32">
      <div className="max-w-screen-2xl mx-auto">
        
        {/* Massive Vision Statement */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          >
             <span className="text-[11px] tracking-[0.6em] text-white/20 uppercase mb-12 block">Philosophy</span>
             <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] max-w-5xl mx-auto">
               We bridge the gap between <span className="font-serif italic font-normal text-white/40">complex logic</span> and <span className="font-serif italic font-normal text-white/40">unrivaled aesthetics</span>.
             </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="mt-20 max-w-2xl"
          >
            <p className="text-lg lg:text-xl text-white/40 leading-relaxed font-light">
              Truly Web Studio is a boutique engineering firm dedicated to building high-performance digital infrastructure for the next generation of global industry.
            </p>
            
            <div className="mt-12 flex items-center justify-center gap-6">
              <span className="h-px w-12 bg-white/10" />
              <span className="text-[10px] font-mono tracking-[0.3em] text-white/20 uppercase whitespace-nowrap">Est. 2026 — Global Studio</span>
              <span className="h-px w-12 bg-white/10" />
            </div>
          </motion.div>
        </div>

        {/* Cinematic Stats Ribbon */}
        <div className="mt-64 border-y border-white/[0.05] grid grid-cols-1 md:grid-cols-3">
          <AnimatedCounter value={42} label="Systems Built" suffix="+" />
          <AnimatedCounter value={12} label="Annual Capacity" />
          <AnimatedCounter value={99.9} label="Performance Score" suffix="%" isFloat={true} />
        </div>

        {/* Location / Availability Strip */}
        <div className="mt-24 flex flex-col md:flex-row items-center justify-between text-[10px] font-mono tracking-[0.3em] text-white/10 uppercase gap-8">
           <span>Availability. [Q3_2026]</span>
           <div className="flex items-center gap-8">
              <span>Timezone. [GMT+5:30]</span>
              <span>Status. [Operational]</span>
           </div>
        </div>
      </div>
    </section>
  );
};
