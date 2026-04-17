"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "FinTwin Simulator",
    category: "Financial Technology",
    image: "/images/work/fintwin.png",
    tags: ["React", "WebGL", "Zustand"],
    description: "A precision-engineered simulation engine for complex financial forecasting and asset dualization."
  },
  {
    id: 2,
    title: "NagarSeva",
    category: "Civic Infrastructure",
    image: "/images/work/nagarseva.png",
    tags: ["Next.js", "GraphQL", "PostGIS"],
    description: "Transforming civic engagement through a modular architecture for municipal governance and issue resolution."
  },
  {
    id: 3,
    title: "VODKA Engine",
    category: "Artificial Intelligence",
    image: "/images/work/vodka.png",
    tags: ["Python", "LLM", "ChromaDB"],
    description: "A high-performance neural architecture designed for contextual memory and proactive agentic reasoning."
  }
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
      className="group relative w-full mb-32 lg:mb-64"
    >
      <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-24">
        {/* Project Number & Category */}
        <div className="flex flex-col gap-4 lg:w-1/4">
          <span className="text-[10px] tracking-[0.3em] font-medium text-white/30 uppercase">
            0{index + 1} / {project.category}
          </span>
          <h3 className="text-4xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
            {project.title}
          </h3>
          <p className="mt-4 text-white/50 leading-relaxed font-light text-[0.95rem] max-w-xs">
            {project.description}
          </p>
          
          <div className="mt-8 flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 border border-white/10 rounded-full text-white/40">
                {tag}
              </span>
            ))}
          </div>

          <motion.button 
            whileHover={{ x: 10 }}
            className="mt-12 flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] font-bold text-white group-hover:text-white/100 text-white/60 transition-colors"
          >
            View Case Study
            <span className="h-px w-8 bg-current opacity-30" />
          </motion.button>
        </div>

        {/* Cinematic Image Frame */}
        <div className="relative w-full lg:w-3/4 aspect-[16/10] overflow-hidden bg-[#111]">
          <motion.div 
            style={{ y: smoothY }}
            className="absolute -inset-10"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-1000 grayscale-[0.2] group-hover:grayscale-0"
            />
          </motion.div>
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 pointer-events-none" />
          
          {/* Interaction hint */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="hidden lg:flex absolute inset-0 items-center justify-center pointer-events-none z-10"
          >
            <div className="px-8 py-4 bg-white text-black text-[10px] items-center justify-center font-bold uppercase tracking-[0.2em] backdrop-blur-md">
              Explore
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export const WorkSection = () => {
  return (
    <section id="work" className="relative w-full bg-[#050505] py-40 px-10 md:px-20 lg:px-32">
      <div className="max-w-screen-2xl mx-auto">
        <SectionHeader 
          number="02" 
          title="Curated Showcase"
          description="A selection of high-fidelity logic systems and digital ecosystems engineered for professional scalability."
        />

        <div className="mt-32">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Institutional Footer */}
        <div className="pt-20 border-t border-white/10 flex flex-col md:flex-row justify-between gap-8 items-end">
          <h4 className="text-[120px] font-bold tracking-[-0.06em] text-white/[0.03] leading-none select-none">
            Archives
          </h4>
          <div className="flex flex-col items-end gap-2 text-right">
            <span className="text-[10px] tracking-[0.4em] text-white/20 uppercase">Global Commissions</span>
            <span className="text-6xl font-light tracking-tighter text-white/40 leading-none">42+</span>
          </div>
        </div>
      </div>
    </section>
  );
};
