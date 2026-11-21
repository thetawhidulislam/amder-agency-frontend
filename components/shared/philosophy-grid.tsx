"use client";

import { m } from "motion/react";
import { usePrefersReducedMotion } from "@/components/motion/use-reduced-motion";
import { EASE, MOTION_LEVEL } from "@/lib/motion";

export function PhilosophyGrid({ items }: { items: { title: string; text: string }[] }) {
  const reducedMotion = usePrefersReducedMotion();
  const staticMotion = reducedMotion || MOTION_LEVEL === "calm";

  return (
    <dl className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
      {items.map((item, index) => {
        const delay = index * 0.1;

        return (
          <div key={item.title} className="relative pt-5">
            <m.span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px origin-left bg-line"
              initial={staticMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: staticMotion ? 0 : 0.6, ease: EASE, delay }}
              data-reveal=""
            />
            <m.span
              aria-hidden="true"
              className="absolute left-0 top-0 size-2 -translate-y-1/2 bg-brand"
              initial={staticMotion ? false : { scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 20,
                delay: staticMotion ? 0 : delay + 0.45,
              }}
              data-reveal=""
            />
            <m.div
              initial={staticMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: staticMotion ? 0 : 0.65,
                ease: EASE,
                delay: staticMotion ? 0 : delay + 0.6,
              }}
              data-reveal=""
            >
              <dt className="font-display text-2xl font-semibold">{item.title}</dt>
              <dd className="mt-2 max-w-sm text-muted">{item.text}</dd>
            </m.div>
          </div>
        );
      })}
    </dl>
  );
}
