import Link from "next/link";
import type { CSSProperties } from "react";
import { Container } from "@/components/shared/container";
import { ServiceIcon } from "@/components/shared/service-icon";
import { buttonClass } from "@/components/ui/button";
import type { Service } from "@/lib/types";

const line = (i: number) => ({ "--i": i }) as CSSProperties;

export function Hero({ services, whatsapp }: { services: Service[]; whatsapp: string | null }) {
  return (
    <section className="py-16 sm:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
        <div>
          <h1 className="max-w-4xl font-display text-4xl font-semibold leading-[0.94] tracking-tight sm:text-5xl lg:text-5xl">
            <span className="rise block" style={line(0)}>One agency.</span>
            <span className="rise block" style={line(1)}>Four specialist teams.</span>
            <span className="rise block text-brand" style={line(2)}>One plan for your business.</span>
          </h1>
          <p className="rise mt-8 max-w-xl text-lg text-muted sm:text-xl" style={line(3)}>
            Marketing, design, video and web, coordinated by one team so every part of your brand works together.
          </p>
          <div className="rise mt-10 flex flex-wrap gap-3" style={line(4)}>
            <Link href="/contact" className={buttonClass({ size: "lg" })}>Start a project</Link>
            {whatsapp ? (
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={buttonClass({ size: "lg", variant: "outline" })}>
                Chat on WhatsApp
              </a>
            ) : (
              <Link href="/services" className={buttonClass({ size: "lg", variant: "outline" })}>See our services</Link>
            )}
          </div>
        </div>

        {services.length > 0 ? (
          <div className="theme-dark border-t-4 border-brand bg-page p-6 text-fg sm:p-8">
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-muted">Our services</h2>
            <ul className="mt-4 divide-y divide-line">
              {services.map((s) => (
                <li key={s.id}>
                  <Link href={`/services/${s.slug}`} className="group flex gap-4 py-5">
                    <ServiceIcon name={s.icon} className="mt-1 size-5 shrink-0 text-brand" />
                    <span>
                      <span className="block font-display text-xl font-semibold group-hover:text-brand">{s.title}</span>
                      <span className="mt-1 block max-w-sm text-sm text-muted">{s.shortDesc}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
