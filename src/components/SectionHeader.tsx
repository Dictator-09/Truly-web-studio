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
      <div className="flex flex-col gap-8">
        <div className={`flex items-center gap-4 ${align === "center" ? "justify-center" : "justify-start"}`}>
          <span className="h-[1px] w-8 bg-white/20" />
          <span className="text-[10px] tracking-[0.3em] text-white/40 font-medium uppercase font-sans">
            {number} / {title.split(" ")[0]}
          </span>
        </div>
        
        <div className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12`}>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.04em] text-white leading-[0.95] max-w-4xl">
            {title}
          </h2>
          
          {description && (
            <p className="max-w-xs text-[0.95rem] text-white/50 leading-[1.6] font-normal mb-2 lg:text-right">
              {description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
