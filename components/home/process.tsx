"use client";

import { useRef } from "react";
import {
  CircleCheck,
  Compass,
  PenTool,
  Rocket,
  Search,
  TrendingUp,
} from "lucide-react";
import { m, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { Container, Section, SectionHeading } from "@/components/shared/container";
import { usePrefersReducedMotion } from "@/components/motion/use-reduced-motion";
import { processSteps } from "@/config/site";
import { DURATION, EASE, MOTION_LEVEL } from "@/lib/motion";

const processIcons = [Search, Compass, PenTool, CircleCheck, Rocket, TrendingUp];

function ProcessStep({
  step,
  index,
  progress,
  motionEnabled,
  revealEnabled,
}: {
  step: (typeof processSteps)[number];
  index: number;
  progress: MotionValue<number>;
  motionEnabled: boolean;
  revealEnabled: boolean;
}) {
  const Icon = processIcons[index];
  const threshold = (index + 1) / processSteps.length;
  const borderColor = useTransform(
    progress,
    [Math.max(0, threshold - 0.04), threshold],
    ["rgb(255 255 255 / 0.1)", "rgb(225 29 39 / 0.5)"]
  );
  const iconBackground = useTransform(
    progress,
    [Math.max(0, threshold - 0.04), threshold],
    ["#ffffff", "#e11d27"]
  );
  const iconColor = useTransform(
    progress,
    [Math.max(0, threshold - 0.04), threshold],
    ["#e11d27", "#ffffff"]
  );
  const numberScale = useSpring(
    useTransform(progress, [Math.max(0, threshold - 0.08), threshold], [0, 1]),
    { stiffness: 280, damping: 22 }
  );

  return (
    <m.li
      initial={
        revealEnabled
          ? motionEnabled
            ? { opacity: 0, y: 24 }
            : { opacity: 0 }
          : false
      }
      whileInView={revealEnabled ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: revealEnabled ? DURATION.reveal : 0,
        ease: EASE,
        delay: revealEnabled ? index * 0.08 : 0,
      }}
      data-reveal=""
      className="min-w-0"
    >
      <m.article
        className={`process-step rounded-3xl border border-white/10 bg-[#161616] p-8 text-center ${
          index % 3 === 1 ? "process-step-offset" : ""
        }`}
        style={{ borderColor: motionEnabled ? borderColor : undefined }}
      >
        <div className="process-icon-wrap relative mx-auto w-fit">
          <span className="process-icon-ring flex size-[114px] items-center justify-center rounded-full border border-white/15 p-2">
            <m.span
              className="flex size-full items-center justify-center rounded-full"
              style={{
                backgroundColor: motionEnabled ? iconBackground : "#ffffff",
                color: motionEnabled ? iconColor : "#e11d27",
              }}
            >
              <Icon aria-hidden="true" className="size-10" strokeWidth={1.75} />
            </m.span>
          </span>
          <m.span
            className="process-number absolute -right-1 -top-1 flex size-7 items-center justify-center rounded-full bg-brand text-xs font-semibold text-white"
            style={motionEnabled ? { scale: numberScale } : undefined}
            data-reveal=""
          >
            {String(index + 1).padStart(2, "0")}
            <span aria-hidden="true" className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rotate-45 bg-brand" />
          </m.span>
        </div>
        <h3 className="mt-6 font-display text-xl font-semibold text-white">{step.title}</h3>
        <p className="mx-auto mt-3 max-w-sm text-white/65">{step.text}</p>
      </m.article>
    </m.li>
  );
}

export function Process() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const motionEnabled = MOTION_LEVEL === "rich" && !reducedMotion;
  const revealEnabled = !reducedMotion;
  const { scrollYProgress } = useScroll({
    target: stepsRef,
    offset: ["start 75%", "end 40%"],
  });

  return (
    <Section className="theme-dark bg-ink text-white">
      <Container>
        <SectionHeading
          title="How a project runs"
          intro="Six steps from first conversation to delivery, the same way every time."
          align="center"
          chip="How it works"
          chipTone="dark"
        />
        <div ref={stepsRef} className="process-progress relative mt-14">
          {motionEnabled ? (
            <m.span
              aria-hidden="true"
              className="process-progress-line"
              style={{ scaleX: scrollYProgress, scaleY: scrollYProgress }}
            />
          ) : null}
          <ol className="process-steps grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step, index) => (
              <ProcessStep
                key={step.title}
                step={step}
                index={index}
                progress={scrollYProgress}
                motionEnabled={motionEnabled}
                revealEnabled={revealEnabled}
              />
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
