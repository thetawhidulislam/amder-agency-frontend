"use client";

import { m, useScroll, useSpring } from "motion/react";
import { MOTION_LEVEL } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/components/motion/use-reduced-motion";

export function ScrollProgress() {
  const reducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  if (MOTION_LEVEL === "calm" || reducedMotion) return null;

  return (
    <m.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-brand"
      data-reveal=""
      style={{ scaleX: progress, transformOrigin: "left" }}
    />
  );
}
