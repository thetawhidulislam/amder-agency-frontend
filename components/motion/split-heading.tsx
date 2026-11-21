"use client";

import { m } from "motion/react";
import { DURATION, EASE, MOTION_LEVEL } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/components/motion/use-reduced-motion";

type HeadingTag = "h1" | "h2";

export function SplitHeading({
  as = "h2",
  text,
  className,
  lineClassName = "",
  highlight,
  delay = 0,
}: {
  as?: HeadingTag;
  text: string;
  className?: string;
  lineClassName?: string;
  highlight?: { start: number; end: number };
  delay?: number;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const Heading = as === "h1" ? m.h1 : m.h2;
  const lines = text.split("\n");
  const isStatic = reducedMotion;
  const isCalm = MOTION_LEVEL === "calm";
  let wordOffset = 0;

  return (
    <Heading aria-label={text.replace(/\s+/g, " ").trim()} className={className} data-reveal="">
      {lines.map((line, lineIndex) => {
        const words = line.trim().split(/\s+/).filter(Boolean);
        const firstWordIndex = wordOffset;
        wordOffset += words.length;

        return (
          <span key={lineIndex} aria-hidden="true" className={`block ${lineClassName}`}>
            {words.map((word, wordIndex) => {
              const index = firstWordIndex + wordIndex;
              const highlighted = highlight && index >= highlight.start && index < highlight.end;
              const spacingClass = wordIndex < words.length - 1 ? "mr-[0.22em]" : "";

              return isStatic ? (
                <span key={`${lineIndex}-${wordIndex}`} className={`${spacingClass} ${highlighted ? "text-brand" : ""}`}>
                  {word}
                </span>
              ) : (
                <span
                  key={`${lineIndex}-${wordIndex}`}
                  className={`${spacingClass} inline-block overflow-hidden align-bottom`}
                >
                  <m.span
                    initial={isCalm ? { opacity: 0 } : { y: "110%", opacity: 0 }}
                    whileInView={isCalm ? { opacity: 1 } : { y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{
                      duration: DURATION.reveal,
                      ease: EASE,
                      delay: delay / 1000 + index * 0.04,
                    }}
                    className={highlighted ? "text-brand" : ""}
                    data-reveal=""
                    aria-hidden="true"
                  >
                    {word}
                  </m.span>
                </span>
              );
            })}
          </span>
        );
      })}
    </Heading>
  );
}
