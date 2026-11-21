"use client";

import { useEffect, useState, type PointerEvent, type ReactNode } from "react";
import { m, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";
import { MOTION_LEVEL } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/components/motion/use-reduced-motion";

export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const reducedMotion = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const xValue = useMotionValue(0);
  const yValue = useMotionValue(0);
  const x = useSpring(xValue, { stiffness: 280, damping: 22 });
  const y = useSpring(yValue, { stiffness: 280, damping: 22 });

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
    const offsetX = ((event.clientX - (bounds.left + bounds.width / 2)) / bounds.width) * 16;
    const offsetY = ((event.clientY - (bounds.top + bounds.height / 2)) / bounds.height) * 16;
    xValue.set(Math.max(-8, Math.min(8, offsetX)));
    yValue.set(Math.max(-8, Math.min(8, offsetY)));
  };

  return (
    <m.div
      className={cn("inline-flex", className)}
      data-reveal=""
      style={{ x, y }}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        xValue.set(0);
        yValue.set(0);
      }}
    >
      {children}
    </m.div>
  );
}
