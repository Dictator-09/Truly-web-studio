"use client";

import { FluidParticlesBackground } from "@/components/FluidParticlesBackground";
import { Navbar } from "@/components/Navbar";
import { InteractiveHero } from "@/components/InteractiveHero";
import { WorkSection } from "@/components/WorkSection";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactFooter } from "@/components/ContactFooter";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden selection:bg-white selection:text-black font-manrope">
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

        {/* Work / Projects Showcase */}
        <WorkSection />

        {/* Services Accordion */}
        <ServicesSection />

        {/* About Statement */}
        <AboutSection />

        {/* Contact & Footer */}
        <ContactFooter />
      </div>
    </main>
  );
}
