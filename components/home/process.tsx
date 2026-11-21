"use client";

import {
  CircleCheck,
  Compass,
  PenTool,
  Rocket,
  Search,
  TrendingUp,
} from "lucide-react";
import { m } from "motion/react";
import { Container, Section, SectionHeading } from "@/components/shared/container";
import { usePrefersReducedMotion } from "@/components/motion/use-reduced-motion";
import { processSteps } from "@/config/site";
import { DURATION, EASE } from "@/lib/motion";

const processIcons = [Search, Compass, PenTool, CircleCheck, Rocket, TrendingUp];

function ProcessStep({
  step,
  index,
  reducedMotion,
}: {
  step: (typeof processSteps)[number];
  index: number;
  reducedMotion: boolean;
}) {
  const Icon = processIcons[index];

  return (
    <m.li
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      animate={reducedMotion ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reducedMotion ? 0 : DURATION.reveal,
        ease: EASE,
        delay: reducedMotion ? 0 : index * 0.08,
      }}
      className="min-w-0"
    >
      <article
        tabIndex={0}
        className="process-step group flex h-full min-w-0 items-center gap-3 rounded-3xl border border-white/10 bg-[#161616] p-4 text-left transition-colors duration-250 hover:border-brand/50 focus-visible:border-brand/50 md:flex-col md:gap-0 md:p-7 md:text-center"
      >
        <div className="relative w-fit shrink-0">
          <span className="flex size-[70px] items-center justify-center rounded-full border border-white/15 p-[6px] md:size-[102px]">
            <span className="flex size-14 items-center justify-center rounded-full bg-white text-brand motion-safe:transition-[transform,background-color,color] motion-safe:duration-250 motion-safe:group-hover:-translate-y-1 motion-safe:group-focus-visible:-translate-y-1 group-hover:bg-brand group-hover:text-white group-focus-visible:bg-brand group-focus-visible:text-white md:size-[88px]">
              <Icon aria-hidden="true" className="size-6 md:size-8" strokeWidth={1.75} />
            </span>
          </span>
          <m.span
            initial={reducedMotion ? false : { scale: 0 }}
            whileInView={reducedMotion ? undefined : { scale: 1 }}
            animate={reducedMotion ? { scale: 1 } : undefined}
            viewport={{ once: true, amount: 0.2 }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 280, damping: 22, delay: 0.15 }
            }
            className="process-number absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-brand text-[10px] font-semibold text-white transition-colors duration-250 group-hover:bg-white group-hover:text-brand group-focus-visible:bg-white group-focus-visible:text-brand md:size-6 md:text-xs"
          >
            {String(index + 1).padStart(2, "0")}
            <span
              aria-hidden="true"
              className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rotate-45 bg-brand transition-colors duration-250 group-hover:bg-white group-focus-visible:bg-white"
            />
          </m.span>
        </div>
        <div className="min-w-0 md:mt-5">
          <h3 className="font-display text-base font-semibold leading-5 text-white md:text-xl md:leading-7">
            {step.title}
          </h3>
          <p className="mt-1 text-sm leading-5 text-white/65 md:mt-2 md:text-[15px] md:leading-6 lg:min-h-[3rem] lg:max-w-[19rem]">
            {step.text}
          </p>
        </div>
      </article>
    </m.li>
  );
}

export function Process() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <Section className="theme-dark bg-ink py-16 text-white lg:py-20">
      <Container>
        <SectionHeading
          title="How a project runs"
          intro="Six steps from first conversation to delivery, the same way every time."
          className="max-w-full"
          titleClassName="lg:text-[2.75rem]"
          align="center"
          chip="How it works"
          chipTone="dark"
        />
        <ol className="process-steps mt-10 grid auto-rows-fr items-stretch grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 lg:mt-14 lg:grid-cols-3 lg:[&>li:nth-child(3n+2)]:-translate-y-10">
          {processSteps.map((step, index) => (
            <ProcessStep
              key={step.title}
              step={step}
              index={index}
              reducedMotion={reducedMotion}
            />
          ))}
        </ol>
      </Container>
    </Section>
  );
}
