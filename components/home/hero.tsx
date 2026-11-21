"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Rocket } from "lucide-react";
import { m, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Container } from "@/components/shared/container";
import { ServiceIcon } from "@/components/shared/service-icon";
import { Magnetic } from "@/components/motion/magnetic";
import { usePrefersReducedMotion } from "@/components/motion/use-reduced-motion";
import { publicButtonClass } from "@/components/shared/public-button";
import { SectionChip } from "@/components/shared/section-chip";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { whyPoints } from "@/config/site";
import { MOTION_LEVEL } from "@/lib/motion";
import type { Service } from "@/lib/types";

export function Hero({
  services,
  whatsapp,
}: {
  services: Service[];
  whatsapp: string | null;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const motionEnabled = MOTION_LEVEL === "rich" && !reducedMotion;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, motionEnabled ? -24 : 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, motionEnabled ? 0.6 : 1]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, motionEnabled ? 40 : 0]);
  const blushY = useTransform(scrollYProgress, [0, 1], [0, motionEnabled ? -40 : 0]);

  return (
    <section ref={sectionRef} className="hero-section relative isolate overflow-hidden">
      <m.span aria-hidden="true" className="hero-grid-layer pointer-events-none absolute inset-0 z-0" style={{ y: gridY }} />
      <m.span aria-hidden="true" className="hero-blush-layer pointer-events-none absolute -right-20 top-0 z-0 size-96" style={{ y: blushY }} />
      <m.div className="relative z-10" style={{ y: contentY, opacity: contentOpacity }}>
      <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-24">
        <div className="relative z-10 min-w-0">
          <Reveal>
            <SectionChip className="mb-6">Full-stack marketing agency</SectionChip>
          </Reveal>
          <SplitHeading
            as="h1"
            text={"One agency.\nFour specialist teams.\nOne plan for your business."}
            highlight={{ start: 5, end: 10 }}
            delay={120}
            lineClassName="whitespace-normal lg:whitespace-nowrap"
            className="font-display text-[clamp(2.25rem,3.5vw,3.5rem)] font-semibold leading-[1.04] tracking-tight"
          />
          <Reveal delay={500}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
              Marketing, design, video and web, coordinated by one team so every part of your brand works together.
            </p>
          </Reveal>
          <Reveal delay={620}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <Link href="/contact" className={publicButtonClass({ size: "lg" })}>
                  Start a project
                  <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
                </Link>
              </Magnetic>
              {whatsapp ? (
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={publicButtonClass({ size: "lg", variant: "outline" })}>
                  Chat on WhatsApp
                </a>
              ) : (
                <Link href="/services" className={publicButtonClass({ size: "lg", variant: "outline" })}>See our services</Link>
              )}
            </div>
          </Reveal>
          <Reveal delay={720}>
            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-3">
              {whyPoints.slice(0, 3).map((point) => (
                <li key={point.title} className="inline-flex items-center gap-2 text-sm font-medium">
                  <Check aria-hidden="true" className="size-4 shrink-0 text-brand" strokeWidth={2} />
                  {point.title}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={1200} className="hero-flow-reveal overflow-visible">
          <div className="hero-flow relative isolate flex flex-col">
            <span aria-hidden="true" className="hero-flow-line" />
            {services.slice(0, 4).map((service, index) => (
              <div key={service.id} className="hero-flow-item relative pl-6">
                <span aria-hidden="true" className="hero-flow-dot" />
                <Link
                  href={`/services/${service.slug}`}
                  className={`hero-service-card group flex min-w-0 items-center gap-4 rounded-2xl border border-[rgb(11_11_11_/_0.1)] bg-white p-4 text-ink shadow-[var(--shadow-card)] transition-transform duration-300 hover:-translate-y-[3px] focus-visible:-translate-y-[3px] ${
                    index === 1 || index === 3 ? "lg:ml-8 lg:w-[calc(100%_-_2rem)]" : ""
                  }`}
                >
                  <span className="hero-service-icon flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand group-hover:bg-brand group-hover:text-white">
                    <ServiceIcon name={service.icon} className="size-6" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-lg font-semibold leading-tight">{service.title}</span>
                    <span className="hero-service-description mt-1 text-sm text-muted">{service.shortDesc}</span>
                  </span>
                  <span className="hero-service-arrow flex size-8 shrink-0 items-center justify-center rounded-full bg-ink/5 text-ink group-hover:bg-brand group-hover:text-white">
                    <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
                  </span>
                </Link>
              </div>
            ))}
            <div className="hero-flow-item relative pl-6">
              <span aria-hidden="true" className="hero-flow-dot" />
              <div className="hero-plan-card rounded-2xl border-t-[6px] border-t-brand bg-ink p-5 text-white">
                <div className="flex items-center gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
                    <Rocket aria-hidden="true" className="size-6" strokeWidth={1.75} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-lg font-semibold">One coordinated plan</span>
                    <span className="mt-1 block text-sm leading-snug text-white/70">
                      Strategy, creative and delivery under one roof.
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
      </m.div>
    </section>
  );
}
