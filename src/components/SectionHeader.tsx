"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

interface SectionHeaderProps {
  number: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export const SectionHeader = ({ number, title, description, align = "left" }: SectionHeaderProps) => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className={`mb-32 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
        
        {/* Editorial Watermark */}
        <div className={`lg:col-span-3 flex items-center gap-4 border-t border-white/20 pt-4 ${align === "center" ? "justify-center border-none pt-0" : "justify-start"}`}>
          <span className="text-[10px] tracking-[0.3em] text-white/90 font-bold uppercase font-mono">
            [{number}]
          </span>
          <span className="text-[10px] tracking-[0.3em] text-white/30 uppercase font-sans">
            {title.split(" ")[0]}
          </span>
        </div>
        
        {/* Title & Description Structure */}
        <div className={`lg:col-span-9 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-12 pb-4`}>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.05em] text-white leading-[0.85] max-w-4xl">
            {title}
          </h2>
          
          {description && (
            <p className="max-w-xs text-[1.1rem] text-white/50 leading-relaxed font-light mb-2 lg:text-right">
              {description}
            </p>
          )}
        </div>
        
      </div>
    </motion.div>
  );
};
