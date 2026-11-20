import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { ServiceIcon } from "@/components/shared/service-icon";
import { buttonClass } from "@/components/ui/button";
import { HeroArt } from "@/components/graphics/hero-art";
import { Reveal } from "@/components/motion/reveal";
import type { Service } from "@/lib/types";

export function Hero({ services, whatsapp }: { services: Service[]; whatsapp: string | null }) {
  return (
    <section className="flex min-h-[min(900px,calc(100svh-64px))] items-center py-20 sm:py-28 lg:py-32">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
        <div>
          <h1 className="max-w-4xl font-display text-[clamp(3rem,7.5vw,7rem)] font-semibold leading-[0.95] tracking-tighter">
            <Reveal as="span"><span className="block">One agency.</span></Reveal>
            <Reveal as="span" delay={80}><span className="block">Four specialist teams.</span></Reveal>
            <Reveal as="span" delay={160}><span className="block text-brand">One plan for your business.</span></Reveal>
          </h1>
          <Reveal delay={240}>
            <p className="mt-8 max-w-xl text-lg text-muted sm:text-xl">
              Marketing, design, video and web, coordinated by one team so every part of your brand works together.
            </p>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className={buttonClass({ size: "lg" })}>
                Start a project
                <ArrowUpRight aria-hidden="true" className="motion-arrow size-4" />
              </Link>
              {whatsapp ? (
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={buttonClass({ size: "lg", variant: "outline" })}>
                  Chat on WhatsApp
                </a>
              ) : (
                <Link href="/services" className={buttonClass({ size: "lg", variant: "outline" })}>See our services</Link>
              )}
            </div>
          </Reveal>
        </div>

        {services.length > 0 ? (
          <div className="relative isolate">
            <HeroArt />
            <Reveal delay={400}>
              <div className="relative z-10 border-t-4 border-brand bg-ink p-6 text-white sm:p-8">
                <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-white/70">Our services</h2>
                <ul className="mt-4 divide-y divide-white/15">
                  {services.map((s) => (
                    <li key={s.id}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="group service-row flex gap-4 py-4"
                      >
                        <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center bg-white/10">
                          <ServiceIcon name={s.icon} className="size-5 text-brand group-hover:text-white" />
                        </span>
                        <span>
                          <span className="block font-display text-xl font-semibold group-hover:text-brand">{s.title}</span>
                          <span className="mt-1 block max-w-sm text-sm text-white/70">{s.shortDesc}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
