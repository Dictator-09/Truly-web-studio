"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

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

const ServiceCard = ({ service }: { service: typeof services[0] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className="group relative h-full bg-[#0a0a0a] border border-white/[0.03] p-12 lg:p-16 flex flex-col justify-between hover:bg-[#0e0e0e] transition-colors duration-700"
    >
      <div className="flex flex-col gap-8">
        <span className="text-[10px] font-mono tracking-widest text-[#555] group-hover:text-white/40 transition-colors">
          Capability_{service.id}
        </span>
        <h3 className="text-3xl lg:text-4xl font-bold text-white/70 group-hover:text-white transition-colors">
          {service.title}
        </h3>
        <p className="text-white/40 leading-relaxed font-light text-[0.9rem] lg:text-[1rem] max-w-sm">
          {service.desc}
        </p>
      </div>

      <div className="mt-16 pt-8 border-t border-white/[0.03] flex flex-col gap-4">
        <span className="text-[9px] uppercase tracking-[0.25em] text-white/20 font-bold">Focus Areas</span>
        <ul className="flex flex-col gap-2">
          {service.deliverables.map(item => (
            <li key={item} className="text-[11px] text-white/30 group-hover:text-white/60 transition-colors flex items-center gap-3">
              <span className="w-1 h-px bg-current opacity-30" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Gloss Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </motion.div>
  );
};

export const ServicesSection = () => {
  return (
    <section id="services" className="relative w-full bg-[#050505] py-40 px-10 md:px-20 lg:px-32">
      <div className="max-w-screen-2xl mx-auto">
        <SectionHeader 
          number="03" 
          title="Digital Capabilities"
          description="A rigorous technical framework across four key pillars of modern digital product engineering."
        />

        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
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
