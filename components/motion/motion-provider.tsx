"use client";

import type { ReactNode } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import { MOTION_LEVEL } from "@/lib/motion";

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion={MOTION_LEVEL === "calm" ? "always" : "user"}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
