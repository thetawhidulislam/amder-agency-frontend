"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { m, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { SplitHeading } from "@/components/motion/split-heading";
import { usePrefersReducedMotion } from "@/components/motion/use-reduced-motion";
import { MOTION_LEVEL } from "@/lib/motion";

export function CtaBand({ whatsapp, title = "Let's build, promote and grow, together." }: { whatsapp: string | null; title?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const motionEnabled = MOTION_LEVEL === "rich" && !reducedMotion;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const circleOneY = useTransform(scrollYProgress, [0, 1], [0, motionEnabled ? -30 : 0]);
  const circleTwoY = useTransform(scrollYProgress, [0, 1], [0, motionEnabled ? 30 : 0]);

  return (
    <section ref={sectionRef} className="bg-ink pt-20 sm:pt-24 lg:pt-28">
      <Reveal variant="scale" className="overflow-visible">
        <Container>
          <div className="cta-card relative isolate overflow-hidden rounded-3xl bg-brand p-8 sm:p-12 lg:p-16">
            <m.span aria-hidden="true" className="pointer-events-none absolute -right-20 -top-28 size-80 rounded-full bg-brand-dark/60" style={{ y: circleOneY }} />
            <m.span aria-hidden="true" className="pointer-events-none absolute -bottom-48 right-16 size-80 rounded-full bg-brand-dark/60" style={{ y: circleTwoY }} />
            <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div className="max-w-3xl">
                <SplitHeading
                  as="h2"
                  text={title}
                  className="font-display text-[clamp(2rem,4.5vw,4rem)] font-semibold leading-[1.05] tracking-tight text-white text-balance"
                />
                <p className="mt-4 max-w-2xl text-lg text-white/85">
                  Tell us about your business and we will plan the next step with you.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Magnetic>
                  <Link
                    href="/contact"
                    className="public-button inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 font-medium text-ink sm:px-8"
                  >
                    Start a project
                    <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
                  </Link>
                </Magnetic>
                {whatsapp ? (
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="public-button inline-flex h-12 items-center justify-center rounded-xl border border-white/50 px-6 font-medium text-white hover:bg-white/10 sm:px-8"
                  >
                    Chat on WhatsApp
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </Container>
      </Reveal>
    </section>
  );
}
