"use client";

import Image from "next/image";
import { m } from "motion/react";
import { Reveal } from "@/components/motion/reveal";
import { usePrefersReducedMotion } from "@/components/motion/use-reduced-motion";
import { EASE, MOTION_LEVEL } from "@/lib/motion";

export function PortfolioCover({ src, alt }: { src: string; alt: string }) {
  const reducedMotion = usePrefersReducedMotion();
  const staticMotion = reducedMotion || MOTION_LEVEL === "calm";

  return (
    <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-3xl bg-white shadow-[var(--shadow-card)]">
      <Reveal variant="mask" duration={900} className="absolute inset-0">
        <m.div
          className="absolute inset-0"
          initial={staticMotion ? false : { scale: 1.06 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: staticMotion ? 0 : 1, ease: EASE }}
          data-reveal=""
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="(min-width: 1152px) 1100px, 100vw"
            className="object-cover"
          />
        </m.div>
      </Reveal>
    </div>
  );
}
