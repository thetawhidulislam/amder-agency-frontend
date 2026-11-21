"use client";

import { useRef, useSyncExternalStore } from "react";
import { m, useScroll, useTransform } from "motion/react";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { SectionChip } from "@/components/shared/section-chip";
import { usePrefersReducedMotion } from "@/components/motion/use-reduced-motion";
import { EASE, MOTION_LEVEL } from "@/lib/motion";

function subscribeToTouch(callback: () => void) {
  const media = window.matchMedia("(hover: none)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getTouchSnapshot() {
  return window.matchMedia("(hover: none)").matches;
}

function getTouchServerSnapshot() {
  return false;
}

export function PageHeaderMotion({
  chip,
  title,
  intro,
}: {
  chip: string;
  title: string;
  intro: string;
}) {
  const headerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const isTouch = useSyncExternalStore(subscribeToTouch, getTouchSnapshot, getTouchServerSnapshot);
  const parallaxEnabled = MOTION_LEVEL === "rich" && !reducedMotion && !isTouch;
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start end", "end start"],
  });
  const blushY = useTransform(scrollYProgress, [0, 1], [0, parallaxEnabled ? -24 : 0]);

  return (
    <div ref={headerRef} className="page-header-motion relative">
      <m.div
        aria-hidden="true"
        className="page-header-blush pointer-events-none absolute inset-0"
        style={{ y: blushY }}
      />
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <Reveal variant="fade" className="mb-6">
          <SectionChip>{chip}</SectionChip>
        </Reveal>
        <div className="page-header-title relative">
          <SplitHeading
            as="h1"
            text={title}
            className="font-display text-[clamp(2.75rem,7vw,6rem)] font-semibold leading-[0.98] tracking-tighter text-balance"
          />
          <m.span
            aria-hidden="true"
            className="page-header-bar absolute"
            initial={reducedMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: reducedMotion ? 0 : 0.6,
              ease: EASE,
              delay: reducedMotion ? 0 : 0.45,
            }}
            data-reveal=""
          />
        </div>
        <Reveal variant="up" delay={120} className="mt-5">
          <p className="mx-auto max-w-3xl text-lg text-muted sm:text-xl">{intro}</p>
        </Reveal>
      </div>
    </div>
  );
}
