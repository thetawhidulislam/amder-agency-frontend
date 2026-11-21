"use client";

import { AnimatePresence, m } from "motion/react";
import { usePrefersReducedMotion } from "@/components/motion/use-reduced-motion";
import { MOTION_LEVEL } from "@/lib/motion";

export function PortfolioPageIndicator({ page, totalPages }: { page: number; totalPages: number }) {
  const reducedMotion = usePrefersReducedMotion();
  const staticMotion = reducedMotion;
  const label = `Page ${page} of ${totalPages}`;
  const minWidth = `Page ${totalPages} of ${totalPages}`.length;

  if (staticMotion) {
    return (
      <span className="text-muted tabular-nums" style={{ minWidth: `${minWidth}ch` }}>
        {label}
      </span>
    );
  }

  return (
    <span
      aria-live="polite"
      aria-atomic="true"
      className="relative inline-grid place-items-center text-muted tabular-nums"
      style={{ minWidth: `${minWidth}ch` }}
    >
      <AnimatePresence initial={false}>
        <m.span
          key={`${page}-${totalPages}`}
          className="col-start-1 row-start-1 whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: MOTION_LEVEL === "calm" ? 0.65 : 0.25 }}
          data-reveal=""
        >
          {label}
        </m.span>
      </AnimatePresence>
    </span>
  );
}
