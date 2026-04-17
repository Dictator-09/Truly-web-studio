"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SectionHeader } from "./SectionHeader";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const services = [
  { 
    id: "01", 
    title: "Web Engineering", 
    desc: "Architecting high-performance digital ecosystems with Next.js, Headless CMS, and robust API integrations.",
    deliverables: ["Custom Apps", "Enterprise Platforms", "Architecture Design"]
  },
  { 
    id: "02", 
    title: "AI & Logic", 
    desc: "Integrating state-of-the-art LLMs and neural logic into your core products to enable predictive agency and smarter workflows.",
    deliverables: ["Neural Engines", "Cognitive Automations", "Logic Mapping"]
  },
  { 
    id: "03", 
    title: "User Experience", 
    desc: "Meticulous design systems that prioritize typography, rhythm, and spatial clarity over superficial decoration.",
    deliverables: ["System Design", "Interactive Prototypes", "Visual Strategy"]
  },
  { 
    id: "04", 
    title: "Scalable Infrastructure", 
    desc: "Cloud-native solutions designed for high availability and blazingly fast global delivery of your digital assets.",
    deliverables: ["Edge Deployment", "Database Engineering", "Security Audits"]
  },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 60,
      scale: 0.97,
      duration: 0.9,
      delay: index * 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 88%",
      }
    });
  }, { scope: cardRef });

  return (
    <div
      ref={cardRef}
      className="group relative h-full bg-[#050505] p-12 lg:p-16 flex flex-col justify-between hover:bg-[#0a0a0a] transition-colors duration-700"
    >
      <div className="flex flex-col gap-8">
        <span className="text-[10px] font-mono tracking-widest text-white/30 group-hover:text-white/50 transition-colors">
          [{service.id}]
        </span>
        <h3 className="text-3xl lg:text-4xl font-bold tracking-tight text-white/80 group-hover:text-white transition-colors">
          {service.title}
        </h3>
        <p className="text-white/40 leading-relaxed font-light text-[1.05rem] max-w-sm mt-4">
          {service.desc}
        </p>
      </div>

      <div className="mt-24 flex flex-col gap-6">
        <span className="text-[9px] uppercase tracking-[0.3em] font-mono text-white/20">Focus Areas</span>
        <ul className="flex flex-col gap-3">
          {service.deliverables.map(item => (
            <li key={item} className="text-[11px] font-medium tracking-wide text-white/40 group-hover:text-white/70 transition-colors flex items-center gap-4">
              <span className="w-1 h-px bg-current opacity-30" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const ServicesSection = () => {
  return (
    <section id="services" className="section-divider relative w-full bg-[#050505] py-40 px-10 md:px-20 lg:px-32">
      <div className="max-w-screen-2xl mx-auto">
        <SectionHeader 
          number="03" 
          title="Digital Capabilities"
          description="A rigorous technical framework across four key pillars of modern digital product engineering."
        />

        <div className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 p-px">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
        
        {/* Capability Matrix Indicator */}
        <div className="mt-16 flex items-center justify-center gap-24 opacity-10 py-12 border-y border-white/5">
           {["ISO_CORE", "SEC_ARCH", "UI_ENGINE", "AI_LOGIC"].map(label => (
             <span key={label} className="text-[8px] font-mono tracking-[0.5em] text-white whitespace-nowrap">{label}</span>
           ))}
        </div>
      </div>
    </section>
  );
};
