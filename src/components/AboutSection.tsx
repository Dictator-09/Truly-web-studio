"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const AnimatedCounter = ({ value, label, suffix = "", isFloat = false }: { value: number, label: string, suffix?: string, isFloat?: boolean }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: 2.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        once: true
      },
      onUpdate: () => {
        if (!nodeRef.current) return;
        const displayValue = isFloat ? obj.val.toFixed(1) : Math.floor(obj.val);
        nodeRef.current.textContent = displayValue.toString() + suffix;
      }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center text-center p-12 lg:p-16 border-b md:border-b-0 md:border-r border-white/10 last:border-0 relative">
      <span 
        ref={nodeRef} 
        className="text-7xl md:text-8xl lg:text-[7rem] font-bold tracking-[-0.05em] text-white leading-none"
      >
        0
      </span>
      <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em] mt-6">{label}</span>
      
      {/* Corner crosshair accents for architectural feel */}
      <div className="absolute top-0 left-0 w-2 h-px bg-white/20" />
      <div className="absolute top-0 left-0 w-px h-2 bg-white/20" />
    </div>
  );
};

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reveal Huge Philosophy Text
    gsap.from(heroTextRef.current, {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: heroTextRef.current,
        start: "top 80%",
        once: true
      }
    });

    // Reveal Sub Paragraph
    gsap.from(paragraphRef.current, {
      opacity: 0,
      y: 30,
      duration: 1.2,
      delay: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: heroTextRef.current,
        start: "top 80%",
        once: true
      }
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="about" className="section-divider relative w-full bg-[#050505] py-64 px-10 md:px-20 lg:px-32">
      <div className="max-w-screen-2xl mx-auto">
        
        {/* Massive Vision Statement */}
        <div className="flex flex-col items-center text-center">
          <div ref={heroTextRef}>
             <span className="text-[11px] tracking-[0.6em] text-white/40 uppercase mb-12 block font-mono">
               [Philosophy]
             </span>
             <h2 className="text-5xl md:text-7xl lg:text-[6.5rem] font-bold tracking-[-0.05em] text-white leading-[0.9] max-w-6xl mx-auto">
               Bridging the gap between <span className="font-serif italic font-normal text-white/50">complex logic</span> and <span className="font-serif italic font-normal text-white/50">unrivaled aesthetics</span>.
             </h2>
          </div>

          <div
            ref={paragraphRef}
            className="mt-24 max-w-2xl"
          >
            <p className="text-lg lg:text-xl text-white/50 leading-relaxed font-light">
              Truly Web Studio is a boutique engineering firm dedicated to building high-performance digital infrastructure for the next generation of global industry.
            </p>
            
            <div className="mt-16 flex items-center justify-center gap-6">
               <span className="h-px w-12 bg-white/20" />
               <span className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase whitespace-nowrap">Est. 2026 — Global Studio</span>
               <span className="h-px w-12 bg-white/20" />
            </div>
          </div>
        </div>

        {/* Cinematic Stats Ribbon */}
        <div className="mt-64 border-y border-white/10 grid grid-cols-1 md:grid-cols-3 relative">
          {/* Subtle grid background noise/pattern could go here */}
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
