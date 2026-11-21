"use client";

import { Check } from "lucide-react";
import { m } from "motion/react";
import { usePrefersReducedMotion } from "@/components/motion/use-reduced-motion";
import { DURATION, EASE, MOTION_LEVEL } from "@/lib/motion";

export function ServiceFeatureList({ features }: { features: string[] }) {
  const reducedMotion = usePrefersReducedMotion();
  const staticMotion = reducedMotion || MOTION_LEVEL === "calm";

  return (
    <m.ul
      className="mt-6 grid gap-x-4 gap-y-3 text-sm sm:grid-cols-2"
      initial={staticMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: staticMotion ? 0 : 0.04 },
        },
      }}
    >
      {features.map((feature) => (
        <m.li
          key={feature}
          variants={{
            hidden: { opacity: 0, y: 8 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{
            duration: staticMotion ? 0 : DURATION.reveal,
            ease: EASE,
          }}
          data-reveal=""
          className="flex items-start gap-2.5"
        >
          <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand/10">
            <Check aria-hidden="true" className="size-3.5 text-brand" strokeWidth={1.75} />
          </span>
          <span>{feature}</span>
        </m.li>
      ))}
    </m.ul>
  );
}
