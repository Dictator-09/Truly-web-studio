"use client";

import { ReactLenis } from "lenis/react";
import React from "react";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ autoRaf: true, lerp: 0.08 }}>
      {children}
    </ReactLenis>
  );
}
