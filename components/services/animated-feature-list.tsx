"use client";

import { Check } from "lucide-react";
import { m } from "motion/react";
import { usePrefersReducedMotion } from "@/components/motion/use-reduced-motion";
import { DURATION, EASE, MOTION_LEVEL } from "@/lib/motion";

export function AnimatedFeatureList({ features }: { features: string[] }) {
  const reducedMotion = usePrefersReducedMotion();
  const simpleReveal = MOTION_LEVEL === "calm" && !reducedMotion;

  return (
    <m.ul
      className="mt-5 border-t border-line"
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.05 } },
      }}
      data-reveal=""
    >
      {features.map((feature) => (
        <m.li
          key={feature}
          className="flex gap-3 border-b border-line py-3.5"
          variants={{
            hidden: simpleReveal ? { opacity: 0 } : { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: reducedMotion ? 0 : DURATION.reveal, ease: EASE }}
          data-reveal=""
        >
          <m.span
            className="mt-1 flex size-4 shrink-0 items-center justify-center"
            variants={{
              hidden: { scale: simpleReveal ? 1 : 0 },
              visible: { scale: 1 },
            }}
            transition={
              simpleReveal || reducedMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 320, damping: 20, delay: 0.12 }
            }
            data-reveal=""
          >
            <Check aria-hidden="true" className="size-4 text-brand" strokeWidth={1.75} />
          </m.span>
          {feature}
        </m.li>
      ))}
    </m.ul>
  );
}
