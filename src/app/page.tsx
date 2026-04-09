"use client";

import React from 'react';
import { FluidParticlesBackground } from "@/components/FluidParticlesBackground";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <main className="relative h-screen bg-black overflow-hidden selection:bg-white selection:text-black">
      <Navbar />

      <FluidParticlesBackground className="h-full w-full">
      </FluidParticlesBackground>
    </main>
  );
}
