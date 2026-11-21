import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Rocket } from "lucide-react";
import { Container } from "@/components/shared/container";
import { ServiceIcon } from "@/components/shared/service-icon";
import { publicButtonClass } from "@/components/shared/public-button";
import { SectionChip } from "@/components/shared/section-chip";
import { Reveal } from "@/components/motion/reveal";
import { whyPoints } from "@/config/site";
import type { Service } from "@/lib/types";

export function Hero({
  services,
  whatsapp,
}: {
  services: Service[];
  whatsapp: string | null;
}) {
  return (
    <section className="hero-section relative isolate overflow-hidden">
      <Container className="relative z-10 grid items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-24">
        <div className="relative z-10 min-w-0">
          <Reveal>
            <SectionChip className="mb-6">Full-stack marketing agency</SectionChip>
          </Reveal>
          <h1 className="font-display text-[clamp(2.25rem,3.5vw,3.5rem)] font-semibold leading-[1.04] tracking-tight">
            <Reveal as="span" className="motion-reveal-inline hero-headline-reveal">
              <span className="hero-headline-line-mask">
                <span className="hero-headline-line whitespace-normal lg:whitespace-nowrap">One agency.</span>
              </span>
              <span className="hero-headline-line-mask">
                <span className="hero-headline-line whitespace-normal lg:whitespace-nowrap">Four specialist teams.</span>
              </span>
              <span className="hero-headline-line-mask">
                <span className="hero-headline-line whitespace-normal text-brand lg:whitespace-nowrap">One plan for your business.</span>
              </span>
            </Reveal>
          </h1>
          <Reveal delay={320}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
              Marketing, design, video and web, coordinated by one team so every part of your brand works together.
            </p>
          </Reveal>
          <Reveal delay={420}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className={publicButtonClass({ size: "lg" })}>
                Start a project
                <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
              </Link>
              {whatsapp ? (
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={publicButtonClass({ size: "lg", variant: "outline" })}>
                  Chat on WhatsApp
                </a>
              ) : (
                <Link href="/services" className={publicButtonClass({ size: "lg", variant: "outline" })}>See our services</Link>
              )}
            </div>
          </Reveal>
          <Reveal delay={520}>
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

        <Reveal delay={420} className="hero-flow-reveal overflow-visible">
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
                  <span className="hero-service-icon flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                    <ServiceIcon name={service.icon} className="size-6" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-lg font-semibold leading-tight">{service.title}</span>
                    <span className="hero-service-description mt-1 text-sm text-muted">{service.shortDesc}</span>
                  </span>
                  <span className="hero-service-arrow flex size-8 shrink-0 items-center justify-center rounded-full bg-ink/5 text-ink transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
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
    </section>
  );
}
