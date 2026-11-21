"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { m } from "motion/react";
import { usePrefersReducedMotion } from "@/components/motion/use-reduced-motion";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

function isVisibleEnough(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
  const visibleWidth = Math.max(0, Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0));

  return visibleHeight * visibleWidth >= rect.width * rect.height * 0.2;
}

export function ImageReveal({
  children,
  className,
  duration = 800,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
}) {
  const revealRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = revealRef.current;
    setMounted(true);
    if (reducedMotion || (element && isVisibleEnough(element))) setVisible(true);

    const timeout = window.setTimeout(() => setVisible(true), 2500);
    return () => window.clearTimeout(timeout);
  }, [reducedMotion]);

  return (
    <m.div
      ref={revealRef}
      initial={false}
      animate={reducedMotion || visible ? "visible" : undefined}
      whileInView={mounted && !reducedMotion ? "visible" : undefined}
      onViewportEnter={() => setVisible(true)}
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
      }}
      className={cn("absolute inset-0 overflow-hidden", className)}
    >
      <m.div
        initial={false}
        animate={mounted && !reducedMotion && !visible ? "hidden" : "visible"}
        variants={{
          hidden: { clipPath: "inset(0 0 100% 0)" },
          visible: { clipPath: "inset(0)" },
        }}
        transition={{ duration: mounted && !reducedMotion && visible ? duration / 1000 : 0, ease: EASE }}
        className="absolute inset-0 overflow-hidden"
      >
        {children}
      </m.div>
    </m.div>
  );
}
