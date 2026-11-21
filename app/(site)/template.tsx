"use client";

import type { ReactNode } from "react";
import { m } from "motion/react";
import { EASE, MOTION_LEVEL } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/components/motion/use-reduced-motion";

export default function SiteTemplate({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();
  const isCalm = MOTION_LEVEL === "calm";
  const initial = reducedMotion ? false : isCalm ? { opacity: 0 } : { opacity: 0, y: 12 };
  const animate = isCalm ? { opacity: 1 } : { opacity: 1, y: 0 };

  return (
    <m.div
      initial={initial}
      animate={animate}
      transition={{ duration: reducedMotion ? 0 : 0.35, ease: EASE }}
      data-reveal=""
    >
      {children}
    </m.div>
  );
}
