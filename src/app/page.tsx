"use client";

import { FluidParticlesBackground } from "@/components/FluidParticlesBackground";
import { Navbar } from "@/components/Navbar";
import { InteractiveHero } from "@/components/InteractiveHero";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden selection:bg-white selection:text-black font-inter">
      {/* Background Layer (Subtle Dimmed Particles) */}
      <div className="fixed inset-0 z-0">
        <FluidParticlesBackground className="absolute inset-0 opacity-5 pointer-events-none" />
      </div>
      
      <div className="relative z-10 w-full flex flex-col">
        <Navbar />
        
        {/* Lando-Style Interactive Centerpiece */}
        <section className="relative w-full min-h-screen flex items-center justify-center pt-20">
           <InteractiveHero />
        </section>

        {/* Cinematic Metadata Footer */}
        <footer className="w-full px-20 pb-12 mt-auto">
          <div className="max-w-[1720px] mx-auto flex justify-between items-end border-t border-white/5 pt-12">
            <div className="flex flex-col gap-4">
              <span className="text-[9px] font-bold tracking-[0.6em] text-white/10 uppercase italic font-serif">Designed_for_Impact</span>
              <div className="flex gap-12 text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase">
                <span>Truly_Web // Studio</span>
                <span>Est. 2026</span>
              </div>
            </div>
            
            <div className="flex items-center gap-12">
              <div className="flex flex-col items-end gap-1">
                <span className="text-[9px] text-white/10 tracking-[0.4em] uppercase">Time_Index</span>
                <span className="text-[10px] text-white/40 tracking-[0.1em] font-mono uppercase">21:55:04_GMT</span>
              </div>
              <div className="w-[1px] h-8 bg-white/5" />
              <div className="flex flex-col items-end gap-1">
                <span className="text-[9px] text-white/10 tracking-[0.4em] uppercase">System_State</span>
                <span className="text-[10px] text-white/40 tracking-[0.1em] font-mono uppercase">Operational</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
