"use client";

import { useEffect, useState, type PointerEvent, type ReactNode } from "react";
import { m, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";
import { DURATION, EASE, MOTION_LEVEL } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/components/motion/use-reduced-motion";

export function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const reducedMotion = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const rotateXValue = useMotionValue(0);
  const rotateYValue = useMotionValue(0);
  const rotateX = useSpring(rotateXValue, { stiffness: 220, damping: 24 });
  const rotateY = useSpring(rotateYValue, { stiffness: 220, damping: 24 });

  useEffect(() => {
    setEnabled(
      MOTION_LEVEL === "rich" &&
        !reducedMotion &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches
    );
  }, [reducedMotion]);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!enabled || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const normalizedY = (event.clientY - bounds.top) / bounds.height - 0.5;
    rotateXValue.set(-normalizedY * 8);
    rotateYValue.set(normalizedX * 8);
    setActive(true);
  };

  const reset = () => {
    rotateXValue.set(0);
    rotateYValue.set(0);
    setActive(false);
  };

  return (
    <div
      className={cn("relative h-full", className)}
      style={{ perspective: 900 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
    >
      {enabled ? (
        <m.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] border border-brand/20"
          style={{
            rotateX,
            rotateY,
            transformPerspective: 900,
            boxShadow: "0 24px 48px -16px rgb(11 11 11 / .22)",
            background: "transparent",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: active ? 1 : 0 }}
          transition={{ duration: DURATION.hover, ease: EASE }}
          data-reveal=""
        />
      ) : null}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
