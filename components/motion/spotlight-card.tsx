"use client";

import { useEffect, useState, type PointerEvent, type ReactNode } from "react";
import { m } from "motion/react";
import { cn } from "@/lib/utils";
import { DURATION, EASE, MOTION_LEVEL } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/components/motion/use-reduced-motion";

export function SpotlightCard({
  children,
  className,
  contentClassName,
}: {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);

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
    event.currentTarget.style.setProperty("--mx", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - bounds.top}px`);
    setActive(true);
  };

  return (
    <div
      className={cn("relative", enabled && "group", className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setActive(false)}
    >
      {enabled ? (
        <m.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
          style={{
            background:
              "radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), rgb(225 29 39 / 0.08), transparent 80%)",
          }}
          animate={{ opacity: active ? 1 : 0 }}
          transition={{ duration: DURATION.hover, ease: EASE }}
          data-reveal=""
        />
      ) : null}
      <div className={cn("relative z-10", contentClassName)}>{children}</div>
    </div>
  );
}
