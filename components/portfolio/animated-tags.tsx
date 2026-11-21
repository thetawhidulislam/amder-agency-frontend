"use client";

import { m } from "motion/react";
import { usePrefersReducedMotion } from "@/components/motion/use-reduced-motion";
import { MOTION_LEVEL } from "@/lib/motion";

export function AnimatedTags({ tags }: { tags: string[] }) {
  const reducedMotion = usePrefersReducedMotion();
  const simpleReveal = MOTION_LEVEL === "calm" && !reducedMotion;

  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <m.li
          key={tag}
          className="rounded-full border border-line bg-white px-3 py-1 text-sm text-muted"
          initial={
            reducedMotion
              ? false
              : simpleReveal
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.8 }
          }
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            type: simpleReveal || reducedMotion ? "tween" : "spring",
            duration: simpleReveal ? 0.65 : reducedMotion ? 0 : undefined,
            delay: reducedMotion ? 0 : index * 0.05,
          }}
          data-reveal=""
        >
          {tag}
        </m.li>
      ))}
    </ul>
  );
}
