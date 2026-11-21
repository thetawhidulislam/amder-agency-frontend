"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import { usePrefersReducedMotion } from "@/components/motion/use-reduced-motion";
import { MOTION_LEVEL } from "@/lib/motion";

export function WhyRings() {
  const ringsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ringsRef, { amount: 0.1 });
  const reducedMotion = usePrefersReducedMotion();
  const isPlaying = inView && MOTION_LEVEL === "rich" && !reducedMotion;

  return (
    <div
      ref={ringsRef}
      className="why-rings absolute inset-0"
      style={{ animationPlayState: isPlaying ? "running" : "paused" }}
    >
      <span className="absolute left-1/2 top-1/2 size-[160px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
      <span className="absolute left-1/2 top-1/2 size-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
      <span className="absolute left-1/2 top-1/2 size-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
    </div>
  );
}
