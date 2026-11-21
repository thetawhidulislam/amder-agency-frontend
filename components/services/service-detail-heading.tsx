"use client";

import { m } from "motion/react";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { ServiceIcon } from "@/components/shared/service-icon";
import { usePrefersReducedMotion } from "@/components/motion/use-reduced-motion";
import { DURATION, EASE, MOTION_LEVEL } from "@/lib/motion";

export function ServiceDetailHeading({
  icon,
  title,
  description,
}: {
  icon?: string | null;
  title: string;
  description: string;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const simpleReveal = MOTION_LEVEL === "calm" && !reducedMotion;

  return (
    <>
      <m.div
        className="flex size-8 items-center justify-center"
        initial={
          reducedMotion
            ? false
            : simpleReveal
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.6 }
        }
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={
          simpleReveal
            ? { duration: DURATION.reveal, ease: EASE }
            : { type: "spring", stiffness: 280, damping: 22 }
        }
        data-reveal=""
      >
        <ServiceIcon name={icon} className="size-8 text-brand" />
      </m.div>
      <SplitHeading
        as="h1"
        text={title}
        className="before:mb-6 before:block before:h-1 before:w-12 before:bg-brand mt-5 font-display text-5xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-7xl"
      />
      <Reveal variant="up" className="mt-6 max-w-xl">
        <p className="text-xl text-muted">{description}</p>
      </Reveal>
    </>
  );
}
