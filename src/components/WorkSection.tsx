"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SectionHeader } from "./SectionHeader";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}
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
  const imageContainerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    // Scroll reveal for the card itself
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 100,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 85%",
      }
    });

    // Parallax effect on the cinematic image container
    gsap.fromTo(imageContainerRef.current,
      { yPercent: -15, scale: 1.1 },
      {
        yPercent: 15,
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );
  }, { scope: cardRef });

  return (
    <div
      ref={cardRef}
      className="group relative w-full mb-32 lg:mb-64"
    >
      <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-24">
        {/* Project Number & Category */}
        <div className="flex flex-col lg:w-1/4">
          <div className="border-t border-white/20 pt-4 mb-8">
            <span className="text-[10px] tracking-[0.3em] font-bold text-white/40 uppercase font-mono block">
              0{index + 1}
            </span>
            <span className="text-[10px] tracking-[0.3em] font-medium text-white/20 uppercase font-sans mt-2 block">
              {project.category}
            </span>
          </div>
          
          <h3 className="text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.05]">
            {project.title}
          </h3>
          <p className="mt-8 text-white/50 leading-relaxed font-light text-[1.05rem] max-w-sm">
            {project.description}
          </p>
          
          <div className="mt-10 flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="text-[9px] uppercase tracking-[0.2em] font-mono px-4 py-2 border border-white/10 rounded-full text-white/40">
                {tag}
              </span>
            ))}
          </div>

          <button 
            className="mt-16 group/btn flex items-center gap-4 text-[10px] uppercase font-mono tracking-[0.3em] font-bold text-white/50 hover:text-white transition-all duration-300 cursor-pointer"
          >
            Explore Case
            <div className="flex items-center overflow-hidden w-16">
              <span className="h-px w-8 bg-current opacity-30 group-hover/btn:w-12 transition-all duration-300" />
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 -translate-x-4 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300"><polyline points="15 18 21 12 15 6"></polyline></svg>
            </div>
          </button>
        </div>

        {/* Cinematic Image Frame */}
        <div className="relative w-full lg:w-3/4 aspect-[16/10] overflow-hidden bg-[#111]">
          <div 
            ref={imageContainerRef}
            className="absolute -inset-10"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-1000 grayscale-[0.2] group-hover:grayscale-0"
            />
          </div>
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 pointer-events-none" />
          
          {/* Interaction hint */}
          <div 
            className="hidden lg:flex absolute inset-0 items-center justify-center pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          >
            <div className="px-8 py-4 bg-white text-black text-[10px] items-center justify-center font-bold uppercase tracking-[0.2em] backdrop-blur-md">
              Explore
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const WorkSection = () => {
  return (
    <section id="work" className="section-divider relative w-full bg-[#050505] py-40 px-10 md:px-20 lg:px-32">
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
