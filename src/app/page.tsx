"use client";

import { FluidParticlesBackground } from "@/components/FluidParticlesBackground";
import { Navbar } from "@/components/Navbar";
import { HeroBrowserMock } from "@/components/HeroBrowserMock";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden selection:bg-white selection:text-black">
      <Navbar />

      <FluidParticlesBackground className="fixed inset-0" />

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-8 z-10">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-4">
              <h1 className="text-6xl md:text-8xl font-extrabold text-white tracking-[-0.04em] leading-[0.9] font-manrope">
                We Build <br />
                <span className="text-white/40">the Web.</span>
              </h1>
              <p className="max-w-md text-lg text-white/40 font-medium leading-relaxed tracking-wide font-manrope">
                Truly Web is a boutique digital studio architecture. We build high-precision web instruments for elite businesses that demand visual excellence.
              </p>
            </div>

            <div className="flex items-center gap-6">
              <button className="h-14 px-10 bg-white text-black font-bold text-[11px] uppercase tracking-[0.2em] rounded-full hover:bg-zinc-200 transition-all duration-300 font-manrope">
                Start a Project
              </button>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/20">Studio_Availability</span>
                <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-green-500/60">Currently_Open</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="flex justify-center"
          >
            <HeroBrowserMock />
          </motion.div>

        </div>
      </section>
    </main>
  );
}
