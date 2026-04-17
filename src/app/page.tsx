"use client";

import { FluidParticlesBackground } from "@/components/FluidParticlesBackground";
import { Navbar } from "@/components/Navbar";
import { InteractiveHero } from "@/components/InteractiveHero";
import { WorkSection } from "@/components/WorkSection";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactFooter } from "@/components/ContactFooter";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#050505] overflow-x-hidden selection:bg-white selection:text-black">
      {/* Background Layer (Subtle Dimmed Particles) */}
      <div className="fixed inset-0 z-0">
        <FluidParticlesBackground className="absolute inset-0 opacity-5 pointer-events-none" />
      </div>
      
      <div className="relative z-10 w-full flex flex-col">
        <Navbar />
        
        {/* Hero — ContainerScroll controls its own height */}
        <section className="relative w-full overflow-hidden">
          <InteractiveHero />
        </section>

        {/* Work / Projects Showcase */}
        <WorkSection />

        {/* Services */}
        <ServicesSection />

        {/* About Statement */}
        <AboutSection />

        {/* Contact & Footer */}
        <ContactFooter />
      </div>
    </main>
  );
}

