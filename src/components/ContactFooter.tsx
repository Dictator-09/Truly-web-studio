"use client";

import React from "react";
import { motion } from "framer-motion";

export const ContactFooter = () => {
  return (
    <footer className="relative w-full bg-[#050505] pt-64 pb-20 px-10 md:px-20 lg:px-32 overflow-hidden border-t border-white/[0.03]">
      
      <div className="max-w-screen-2xl mx-auto">
        
        {/* Massive Institutional Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="flex-1"
          >
            <span className="text-[11px] tracking-[0.6em] text-white/20 uppercase mb-12 block">Inquiries</span>
            <h2 className="text-5xl md:text-8xl lg:text-[10rem] font-bold tracking-[-0.05em] text-white leading-[0.85] select-none">
              Let's create <br />
              <span className="font-serif italic font-normal text-white/25">Extraordinary</span>
            </h2>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1, delay: 0.5 }}
             className="flex flex-col items-start lg:items-end gap-12"
          >
             <p className="text-lg text-white/30 max-w-xs lg:text-right font-light leading-relaxed">
               Currently accepting commissions for Q4 2026. Limited availability for enterprise logic systems.
             </p>
             
             <a 
               href="mailto:hello@trulyweb.studio"
               className="group relative px-10 py-5 border border-white/20 text-white text-[11px] font-bold uppercase tracking-[0.3em] overflow-hidden hover:border-white transition-colors duration-500"
             >
               <span className="relative z-10">Start Project</span>
               <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]" />
               <style jsx>{`
                 a:hover span { color: black; }
               `}</style>
             </a>
          </motion.div>
        </div>

        {/* Global Network Strip */}
        <div className="mt-40 grid grid-cols-1 md:grid-cols-4 gap-12 py-16 border-y border-white/[0.05]">
          <div className="flex flex-col gap-4">
            <span className="text-[9px] tracking-[0.3em] text-white/10 uppercase">Studio</span>
            <span className="text-white/40 text-[13px] font-light">New Delhi, IN<br/>Vasant Kunj, DL 110070</span>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-[9px] tracking-[0.3em] text-white/10 uppercase">Connect</span>
            <div className="flex flex-col gap-2">
               <a href="#" className="text-white/40 text-[13px] font-light hover:text-white transition-colors">LinkedIn</a>
               <a href="#" className="text-white/40 text-[13px] font-light hover:text-white transition-colors">Twitter / X</a>
               <a href="#" className="text-white/40 text-[13px] font-light hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-[9px] tracking-[0.3em] text-white/10 uppercase">Legal</span>
            <div className="flex flex-col gap-2">
               <a href="#" className="text-white/40 text-[13px] font-light hover:text-white transition-colors">Privacy Policy</a>
               <a href="#" className="text-white/40 text-[13px] font-light hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
          <div className="flex flex-col gap-4 items-start md:items-end">
             <span className="text-[9px] tracking-[0.3em] text-white/10 uppercase">Local Time</span>
             <span className="text-white/40 text-4xl font-light tracking-tighter">19:51</span>
          </div>
        </div>

        {/* Closing Strip */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-8">
           <span className="text-[9px] tracking-[0.4em] text-white/5 uppercase">© 2026 Truly Web Studio — Engineering Human Experiences.</span>
           <div className="flex items-center gap-3">
              <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] tracking-[0.4em] text-white/20 uppercase font-mono">System Status. Optimal</span>
           </div>
        </div>

      </div>

      {/* Background Watermark */}
      <h3 className="absolute -bottom-20 left-10 text-[20vw] font-bold text-white/[0.01] tracking-tighter select-none pointer-events-none">
        TRULY
      </h3>
    </footer>
  );
};
