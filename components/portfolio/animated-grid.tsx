"use client";

import type { ReactNode } from "react";
import { Children } from "react";
import { m } from "motion/react";
import { usePrefersReducedMotion } from "@/components/motion/use-reduced-motion";
import { cn } from "@/lib/utils";
import { DURATION, EASE, MOTION_LEVEL } from "@/lib/motion";

export function AnimatedGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const simpleReveal = MOTION_LEVEL === "calm" && !reducedMotion;
  const items = Children.toArray(children);

  return (
    <m.div
      className={cn(className)}
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: {},
      }}
      data-reveal=""
    >
      {items.map((item, index) => (
        <m.div
          key={index}
          className="h-full min-w-0"
          variants={{
            hidden: simpleReveal ? { opacity: 0 } : { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{
            duration: reducedMotion ? 0 : DURATION.reveal,
            ease: EASE,
            delay: reducedMotion ? 0 : Math.min(index, 7) * 0.06,
          }}
          data-reveal=""
        >
          {item}
        </m.div>
      ))}
    </m.div>
  );
}
