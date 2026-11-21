"use client";

import type { CSSProperties } from "react";
import { m } from "motion/react";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/motion/reveal";
import { usePrefersReducedMotion } from "@/components/motion/use-reduced-motion";
import { industries } from "@/config/site";
import { DURATION, EASE, MOTION_LEVEL } from "@/lib/motion";

const industryGroups: { name: string; index: number }[][] = [];
industries.forEach((name, index) => {
  const groupIndex = Math.min(index, 5);
  industryGroups[groupIndex] ??= [];
  industryGroups[groupIndex].push({ name, index });
});

function IndustryWord({
  word,
  index,
  reducedMotion,
  isCalm,
}: {
  word: string;
  index: number;
  reducedMotion: boolean;
  isCalm: boolean;
}) {
  return (
    <span className="industry-word-clip">
      {reducedMotion ? (
        word
      ) : (
        <m.span
          initial={isCalm ? { opacity: 0 } : { y: "110%", opacity: 0 }}
          whileInView={isCalm ? { opacity: 1 } : { y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: DURATION.reveal, ease: EASE, delay: index * 0.04 }}
          data-reveal=""
          aria-hidden="true"
        >
          {word}
        </m.span>
      )}
    </span>
  );
}

export function Industries() {
  const reducedMotion = usePrefersReducedMotion();
  const isCalm = MOTION_LEVEL === "calm";
  const staticUnderline = reducedMotion || isCalm;
  let wordOffset = 3;
  const sentenceLabel = `We work with ${industryGroups
    .map((group) => group.map(({ name }, groupIndex) => `${groupIndex > 0 ? ", " : ""}${name}`).join(""))
    .join("")}.`;

  return (
    <section className="relative isolate border-y border-line bg-surface py-12 sm:py-16 lg:py-20">
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 size-full" preserveAspectRatio="none">
        <defs>
          <pattern id="industry-dot-pattern" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#0B0B0B" fillOpacity="0.1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#industry-dot-pattern)" />
      </svg>
      <Container className="relative z-10">
        <Reveal variant="up">
          <p
            aria-label={sentenceLabel}
            className="max-w-4xl font-display text-2xl font-medium leading-snug tracking-tight text-balance sm:text-4xl"
          >
            <IndustryWord word="We" index={0} reducedMotion={reducedMotion} isCalm={isCalm} />{" "}
            <IndustryWord word="work" index={1} reducedMotion={reducedMotion} isCalm={isCalm} />{" "}
            <IndustryWord word="with" index={2} reducedMotion={reducedMotion} isCalm={isCalm} />{" "}
            {industryGroups.map((group) => (
              <span key={group[0].index} className="industry-group">
                {group.map(({ name, index }) => {
                  const words = name.split(" ");
                  const startWord = wordOffset;
                  wordOffset += words.length;
                  const underlineDelay = (wordOffset - 1) * 40 + 650 + index * 100;

                  return (
                    <span
                      key={index}
                      className={`industry-highlight${staticUnderline ? " industry-highlight-static" : ""}`}
                      style={{
                        "--industry-delay": `${underlineDelay}ms`,
                      } as CSSProperties}
                    >
                      {index > 0 ? ", " : null}
                      {words.map((word, wordIndex) => {
                        const currentIndex = startWord + wordIndex;
                        return (
                          <span key={`${index}-${wordIndex}`}>
                            <IndustryWord
                              word={word}
                              index={currentIndex}
                              reducedMotion={reducedMotion}
                              isCalm={isCalm}
                            />
                            {wordIndex < words.length - 1 ? " " : null}
                          </span>
                        );
                      })}
                    </span>
                  );
                })}
              </span>
            ))}
            .
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
